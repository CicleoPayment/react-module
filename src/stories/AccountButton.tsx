import React, { useEffect, useState } from 'react';
import { ethers } from "ethers"
import AccountBlock from '../components/AccountBlock';

type User = {
    name: string;
};

export const Page: React.FC = () => {
    return (
        <div>
            <AccountBlock chainId={250} subManagerId={4} />
        </div>
    );
};
