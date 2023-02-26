import React, { useEffect, useState } from 'react';
import {ethers} from "ethers"
 import { PaymentButton } from '..';

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
            <PaymentButton subManagerId={2} subscriptionId={1} signer={signer} />
        </div>
  );
};
