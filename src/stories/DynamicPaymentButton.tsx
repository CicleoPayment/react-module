import React, { useEffect, useState } from 'react';
import {ethers, BigNumber} from "ethers"
import { DynamicPaymentButton } from '..';

type User = {
  name: string;
};

export const Page: React.FC = () => {
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | undefined>()
    
    const getSigner = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner() 

        setSigner(signer)
    }

    useEffect(() => {
        getSigner()
    }, [])
    

    return (
        <div>
            <DynamicPaymentButton chainId={250} subManagerId={4} name="Te" price={BigNumber.from("1000000")} />
        </div>
    );
};
