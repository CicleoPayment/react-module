import React, { useEffect, useRef, useState, useContext } from "react";
import { providers, Contract, ContractInterface, BigNumber, ethers } from "ethers";
import {
    CicleoSubscriptionFactory,
    CicleoSubscriptionFactory__factory,
    CicleoSubscriptionManager,
    CicleoSubscriptionManager__factory,
    ERC20,
    ERC20__factory,
} from "@context/Types";
import axios from "axios";

type Contracts = {
    SubscriptionFactory: (signer: providers.JsonRpcSigner) => Promise<CicleoSubscriptionFactory>;
    ERC20: (signer: providers.JsonRpcSigner, address: string, forceReload?:boolean) => Promise<ERC20>;
    SubscriptionManager: (signer: providers.JsonRpcSigner, address: string, forceReload?:boolean) => Promise<CicleoSubscriptionManager>;
}

interface IError {
    code: number;
}

interface ISavedContract {
    [key: string]: Contract;
}

let config: any


const getConfig = async (networkId: number) => {
    if (config == undefined) {
        const resp = await axios.get("https://backend.cicleo.io/chain")
        config = resp.data;
    }

    return config[networkId];
};

const reduceAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(address.length - 4);
};

let savedContract: ISavedContract = {};

const isGoodNetwork = async(chainId: number) => {
    return await getConfig(chainId) != null;
};

const openOceanIface = new ethers.utils.Interface([
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "contract IERC20",
                name: "srcToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "contract IERC20",
                name: "dstToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "dstReceiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "spentAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "returnAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "minReturnAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "guaranteedAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "referrer",
                type: "address",
            },
        ],
        name: "Swapped",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
        type: "event",
    },
    {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "token",
                type: "address",
            },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "rescueFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IOpenOceanCaller",
                name: "caller",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "contract IERC20",
                        name: "srcToken",
                        type: "address",
                    },
                    {
                        internalType: "contract IERC20",
                        name: "dstToken",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "srcReceiver",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "dstReceiver",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "minReturnAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "guaranteedAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "flags",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "referrer",
                        type: "address",
                    },
                    {
                        internalType: "bytes",
                        name: "permit",
                        type: "bytes",
                    },
                ],
                internalType: "struct OpenOceanExchange.SwapDescription",
                name: "desc",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "target",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "gasLimit",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                internalType: "struct IOpenOceanCaller.CallDescription[]",
                name: "calls",
                type: "tuple[]",
            },
        ],
        name: "swap",
        outputs: [
            {
                internalType: "uint256",
                name: "returnAmount",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]);

const doTx = async (func: () => any, nameTx: string, callback?: any) => {
    if (callback == undefined) callback = () => {};
    let tx, claimToast: any;
    let _error
    try {
        tx = await func();
        console.log(nameTx + " is Pending...")
    } catch (error: any) {
        console.log(error);
        _error = "An error occured !";

        if (error.reason != undefined) {
            _error = error.reason;
        }

        if (
            error.error != undefined &&
            error.error.data != undefined &&
            error.error.data.message != undefined
        ) {
            _error = error.error.data.message;
        }

        if (
            _error ==
                "execution reverted: ERC20: transfer amount exceeds balance" ||
                _error ==
                "execution reverted: BEP20: transfer amount exceeds balance"
        ) {
            _error = "Insufficient funds";
        }

        console.log('ifnerifi')
        
        
        
    }

    console.log(_error)
    
    if (_error != null) {
        throw new Error(_error);
    }

    await callback();

    const result = await tx.wait();

    console.log(nameTx + " is Completed!")

    return result;
};

const formatNumber = (number: any, decimals: number) => {
    if (typeof number === "object") {
        return number.toNumber().toFixed(decimals || 2);
    } else if (typeof number === "number") {
        return number.toFixed(decimals || 2);
    } else {
        return number;
    }
};

let cachedContracts: any = {
    SF: {},
    ERC20: {},
    SM: {}
}

const Contracts: Contracts = {
    SubscriptionFactory: async (signer: providers.JsonRpcSigner) => {
        const { chainId } = await signer.provider.getNetwork()

        if (cachedContracts["SF"][chainId] == undefined) {
            cachedContracts["SF"][chainId] = CicleoSubscriptionFactory__factory.connect(
                (await getConfig(chainId)).subscriptionFactoryAddress || "0x0",
                signer
            );
        }
        return cachedContracts["SF"][chainId];
    },
    ERC20: async (signer: providers.JsonRpcSigner, address: string, force?: boolean) => {
        if (cachedContracts["ERC20"][address] == null || force) {
            cachedContracts["ERC20"][address] = ERC20__factory.connect(
                address,
                signer
            );
        }
        return cachedContracts["ERC20"][address];
    },
    SubscriptionManager: async (signer: providers.JsonRpcSigner, address: string, force?: boolean) => {
        if (cachedContracts["SM"][address] == null || force) {
            cachedContracts["SM"][address] = CicleoSubscriptionManager__factory.connect(
                address,
                signer
            );
        }
        return cachedContracts["SM"][address];
    },
};

export { Contracts, isGoodNetwork, doTx, reduceAddress, formatNumber, openOceanIface }
