import React, { useState } from "react";
import { ManageAccount } from "..";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ManageAccount> = {
    title: "Manage Account",
    component: ManageAccount,
    argTypes: {
        chainId: {
            control: { type: "number", min: 1 },
            name: "Chain ID of the Subscription Manager",
        },
        subManagerId: {
            control: { type: "number", min: 1 },
            name: "ID of the Subscription Manager",
        },
    },
};

export default meta;
type Story = StoryObj<typeof ManageAccount>;

export const Primary: Story = {
    args: {
        chainId: 250,
        subManagerId: 4,
    },
};
