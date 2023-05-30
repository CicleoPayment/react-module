import React, { useState } from "react";
import { SubscriptionDynamicButton } from "..";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SubscriptionDynamicButton> = {
    title: "Subscription Dynamic Button",
    component: SubscriptionDynamicButton,
    argTypes: {
        chainId: {
            control: { type: "number", min: 1 },
            name: "Chain ID of the Subscription Manager",
        },
        subManagerId: {
            control: { type: "number", min: 1 },
            name: "ID of the Subscription Manager",
        },
        price: {
            control: { type: "number", min: 1 },
            name: "Price in wei in the value of the Subscription Manager",
        },
        name: {
            control: { type: "text" },
            name: "Name of the subscription",
        },
        referral: {
            control: { type: "text" },
            name: "Referral address",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SubscriptionDynamicButton>;

export const Primary: Story = {
    args: {
        chainId: 250,
        subManagerId: 4,
        price: "1000000",
        name: "Subscription Dynamic",
    },
};
