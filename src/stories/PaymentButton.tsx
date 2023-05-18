import React, { useEffect, useState } from 'react';
import { ethers } from "ethers"
import { PaymentButton } from '..';

export const Page: React.FC = () => {
    return (
        <div>
            <PaymentButton chainId={250} subManagerId={1} subscriptionId={1} />
        </div>
    );
};
