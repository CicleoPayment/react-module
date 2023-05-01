import React, { useEffect, useState } from 'react';
import { ethers } from "ethers"
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

        provider.on("accountsChanged", (accounts) => {
            getSigner()
        })

        const signer = provider.getSigner()

        setSigner(signer)
    }

    useEffect(() => {
        getSigner()
    }, [])


    return (
        <div>
            <PaymentButton config={{ 56: 3, 250: 2 }} subscriptionId={2} />
        </div>
    );
};
