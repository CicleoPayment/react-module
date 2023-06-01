import React, { useState } from "react";
import { SubscriptionButton } from "..";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SubscriptionButton> = {
    title: "Subscription Button",
    component: SubscriptionButton,
    argTypes: {
        chainId: {
            control: { type: "number", min: 1 },
            name: "Chain ID of the Subscription Manager",
        },
        subManagerId: {
            control: { type: "number", min: 1 },
            name: "ID of the Subscription Manager",
        },
        subscriptionId: {
            control: { type: "number", min: 1 },
            name: "ID of the Subscription",
        },
        referral: {
            control: { type: "text" },
            name: "Referral address",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionButton>;

export const Primary: Story = {
    args: {
        chainId: 56,
        subManagerId: 8,
        subscriptionId: 1,
    },
};
