import { abi } from "./abi.json";
import { useAccount, useReadContract } from 'wagmi';

const CONTRACT_ADDRESSES = {
    80002: "0xc1201A262aD48b0EaF44421E13eB22c0a8ab4368", // Polygon Mumbai
    534351: "0x5c59052D1853145DDe9bc462b61302C252FCc5df", // Scroll Testnet
    84532: "0xC80a7FDd3A63fc5666213a5a0fE5a3681369DE70", // Base Testnet
    25925: "0xff23b48Cd4A045eD210435FaDF54352C09F985c8", // Bitkub Testnet
    545: "0xff23b48Cd4A045eD210435FaDF54352C09F985c8", // Flow Testnet
    296: "0x6A5ABe9DECccB57170d9C43A3a5028aa9104AC41", // Hedera Testnet
};



export const useGetAllWaitingAmount = () => {
    const { chain } = useAccount();
    const result = useReadContract({
        abi,
        address: chain ? CONTRACT_ADDRESSES[chain.id] : undefined,
        functionName: 'getAllWaitingAmount',

    })

    console.log(result.data)

    return result.data
};

export const useGetUserQueuePositions = (user: string) => {
    const { chain } = useAccount();
    const result = useReadContract({
        abi,
        address: chain ? CONTRACT_ADDRESSES[chain.id] : undefined,
        functionName: 'getUserQueuePositions',
        args: [user],

    })

    console.log(result.data)

    return result.data
};