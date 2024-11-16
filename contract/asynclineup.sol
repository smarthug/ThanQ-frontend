// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BoothQueue is ERC721, Ownable {
    uint256 public tokenIdCounter = 1;
    uint256 public boothCounter;

    struct Booth {
        uint256 nextInLine; //next person in queue
        uint256 nextAvailableId; //count for queue for joining
        uint256 nextPostponed; //next person in postponed queue
        uint256 endPointPostponed; // count for postponed queue
        address currentProcessing; // current processing address
        mapping(uint256 => address) queue;
        mapping(address => uint256) waiting; //for checking if the person is waiting at this booth
        mapping(uint256 => address) postponed; // postponed queue
        address operator; //operator for this booth
        string name; // booth name
        string baseURI; // each booth has thier own baseURI
    }

    mapping(uint256 => Booth) public booths; //mapping for all booth
    mapping(uint256 => mapping(address => uint256)) public userTokens; // boothId => user => tokenId
    mapping(address => uint256[]) public userBooths; //user's waiting booths list
    mapping(address => bool) public processingUser; // checking if the user is processing at booth
    
    event DebugWaitingValue(uint256 waitingValue);
    event Enqueued(uint256 indexed boothId, address indexed user, uint256 tokenId);
    event NextInLine(uint256 indexed boothId, address indexed user);
    event Delayed(address indexed user, uint256 indexed boothId);

    constructor(address initialOwner) ERC721("ThanQueue", "THQ") Ownable(initialOwner) {
        transferOwnership(initialOwner);
    }

    // Owner register the operator and metadata for each booth
    function registerBooth(string memory name, string memory baseURI) public {
        Booth storage booth = booths[boothCounter++];
        booth.nextAvailableId = 1;
        booth.nextInLine = 1;
        booth.operator = msg.sender;
        booth.name = name;
        booth.baseURI = baseURI;        
    }

     function getBoothWaiting(uint256 boothId) public view returns (uint256) {
        Booth storage booth = booths[boothId];
        return booth.waiting[msg.sender];
        
    }


     // Joining queue and minting NFT
    function joinQueue(uint256 boothId) public returns (uint256) {
        Booth storage booth = booths[boothId];
        require(booth.nextAvailableId > 0, "Booth does not exist");
        emit DebugWaitingValue(booth.waiting[msg.sender]);  // 현재 값을 확인하는 이벤트

        require(booth.waiting[msg.sender] < 1, "Already in queue for this booth");

        uint256 currentId = booth.nextAvailableId;
        booth.queue[currentId] = msg.sender;
        booth.waiting[msg.sender] = currentId;
        userTokens[boothId][msg.sender] = tokenIdCounter;
        booth.currentProcessing = msg.sender;

        uint256 tokenId = tokenIdCounter;
        _mint(msg.sender, tokenId);

        emit Enqueued(boothId, msg.sender, tokenId);

        userBooths[msg.sender].push(boothId);
        tokenIdCounter += 1;
        booth.nextAvailableId += 1;

        return tokenId;
    }


     // Call next person & postpone
    function callNext(uint256 boothId) public {
        Booth storage booth = booths[boothId];
        address prevUser = booth.queue[booth.nextInLine];
        require(msg.sender == booth.operator, "Caller is not the operator");

        // if there is person in the postponed queue and process
        if (booth.postponed[booth.nextPostponed] != address(0) && !processingUser[booth.postponed[booth.nextPostponed]]) {
            address postponedUser = booth.postponed[booth.nextPostponed];
            emit NextInLine(boothId, postponedUser);
            booth.currentProcessing = postponedUser;
            delete booth.postponed[booth.nextPostponed];
            processingUser[postponedUser] = true;
            booth.nextPostponed += 1;
            processingUser[prevUser] = false;
            return;
        }

        address currentUser = booth.queue[booth.nextInLine];
        //if there is no person in the postponed queue, call next person in the queue
        if (processingUser[currentUser]) {
            // if the next person is processing at other booth, put in the postponed queue
            booth.postponed[booth.endPointPostponed] = currentUser;
            emit Delayed(currentUser, boothId);
            booth.currentProcessing = address(0);
            booth.endPointPostponed += 1;
            booth.nextInLine += 1;
        } else {
            // if the next person is not processing, call the person
            processingUser[prevUser] = false;
            processingUser[currentUser] = true;
            booth.waiting[booth.queue[booth.nextInLine-1]] = 0;
            delete booth.queue[booth.nextInLine-1];
            booth.currentProcessing = currentUser;
            emit NextInLine(boothId, currentUser);
            booth.nextInLine += 1;
        }
        
         //get all the amount of queue& current processing address
    function getAllWaitingAmount() public view returns (uint256[] memory, address[] memory, address[] memory) {
        uint256[] memory waitingAmounts = new uint256[](boothCounter);
        address[] memory currentProcessingAddresses = new address[](boothCounter);
        address[] memory nextInLineAddresses = new address[](boothCounter);

        for (uint256 i = 0; i < boothCounter; i++) {
            Booth storage booth = booths[i];
            
            uint256 queueWaiting = booth.nextAvailableId - booth.nextInLine;
            uint256 postponedWaiting = booth.endPointPostponed - booth.nextPostponed;
            
            waitingAmounts[i] = queueWaiting + postponedWaiting;
            currentProcessingAddresses[i] = booth.currentProcessing;

            // 다음 처리할 주소를 결정: postponed queue가 있으면 해당 주소, 아니면 nextInLine의 주소
            if (booth.postponed[booth.nextPostponed] != address(0)) {
                nextInLineAddresses[i] = booth.postponed[booth.nextPostponed];
            } else {
                nextInLineAddresses[i] = booth.queue[booth.nextInLine];
            }
        }

        return (waitingAmounts, currentProcessingAddresses, nextInLineAddresses);
    }

    //users can get thier own queue positions
    function getUserQueuePositions(address user) public view returns (uint256[] memory) {
        uint256[] memory queuePositions = new uint256[](boothCounter);

        for (uint256 i = 0; i < boothCounter; i++) {
            Booth storage booth = booths[i];

            uint256 userWaitingNumber = booth.waiting[user];
            if (userWaitingNumber > 0) { // 사용자가 대기 중인 경우
                uint256 positionInQueue = (userWaitingNumber - booth.nextInLine) + 
                                        (booth.endPointPostponed - booth.nextPostponed);
                queuePositions[i] = positionInQueue;
            } else {
                queuePositions[i] = 0; // 사용자가 대기 중이지 않은 경우
            }
        }

        return queuePositions;
    }

    
    // 토큰 URI 설정
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        address owner = ownerOf(tokenId);
        uint256 boothId;
        
        // 사용자 별 보유한 부스 ID 확인
        for (uint256 i = 0; i < userBooths[owner].length; i++) {
            if (userTokens[userBooths[owner][i]][owner] == tokenId) {
                boothId = userBooths[owner][i];
                break;
            }
        }

        Booth storage booth = booths[boothId];
        return string(abi.encodePacked(booth.baseURI, uint2str(tokenId), ".json"));
    }

    // uint256을 string으로 변환하는 함수
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
