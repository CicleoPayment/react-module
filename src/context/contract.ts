import React, { useEffect, useRef, useState, useContext } from "react";
import { providers, Contract, ContractInterface, BigNumber } from "ethers";
import config from "./config";
import {
    SubscriptionFactory,
    SubscriptionFactory__factory,
    SubscriptionManager,
    SubscriptionManager__factory,
    ERC20,
    ERC20__factory,
} from "@context/Types";

type Contracts = {
    SubscriptionFactory: (signer: providers.JsonRpcSigner) => Promise<SubscriptionFactory>;
    ERC20: (signer: providers.JsonRpcSigner, address: string, forceReload?:boolean) => Promise<ERC20>;
    SubscriptionManager: (signer: providers.JsonRpcSigner, address: string, forceReload?:boolean) => Promise<SubscriptionManager>;
}

interface IError {
    code: number;
}

interface ISavedContract {
    [key: string]: Contract;
}


const getConfig = (networkId: number) => {
    switch (networkId) {
        case 97:
            return config.bscTest;
        default:
            return null;
    }
};

const reduceAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(address.length - 4);
};

let savedContract: ISavedContract = {};

const isGoodNetwork = (chainId: number) => {
    return getConfig(chainId) != null;
};

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
            cachedContracts["SF"][chainId] = SubscriptionFactory__factory.connect(
                getConfig(chainId)?.subscriptionFactoryAddress || "0x0",
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
            cachedContracts["SM"][address] = SubscriptionManager__factory.connect(
                address,
                signer
            );
        }
        return cachedContracts["SM"][address];
    },
};

export { Contracts, isGoodNetwork, doTx }
