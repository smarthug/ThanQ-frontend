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
}
