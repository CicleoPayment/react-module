import React, { useEffect, useState } from 'react';
import { ethers } from "ethers"
import { PaymentButton } from '..';

export const Page: React.FC = () => {
    return (
        <div>
            <PaymentButton chainId={250} subManagerId={4} subscriptionId={2} />
        </div>
    );
};
