import React, { FC } from "react";

type SubscriptionPart = {
    subscription: any;
    symbol: string;
};

const SubscriptionPart: FC<SubscriptionPart> = ({
    subscription,
    symbol,
}) => {
    if (subscription.isCancelled) {
        return (
            
            <div className="cap-grow cap-flex cap-flex-col cap-px-4 cap-py-4 cap-space-y-2">
                <span className=" cap-font-semibold">
                    
                    Your canceled subscription
                </span>
                <div className="cap-divider !cap-mt-0 !cap-mb-0 "></div>
                <div className="cap-flex cap-flex-col cap-px-0">
                    <span className="cap-font-bold cap-text-xl">
                        {subscription.name} Package
                    </span>
                    <span className="cap-text-sm cap-text-gray-500">
                        {subscription.price} {symbol} per month
                    </span>
                </div>

                <button
                    type="button"
                    className="focus:cap-outline-none cap-text-white cap-bg-red-700 hover:cap-bg-red-800 focus:cap-ring-4 focus:cap-ring-red-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-red-600 dark:hover:cap-bg-red-700 dark:focus:cap-ring-red-900"
                >
                    Renew my subscription
                </button>
            </div>
        );
    }

    return (
        <div className=" cap-flex cap-flex-col cap-space-y-3">
            <div className="cap-flex cap-flex-col cap-items-center">
                <span className="cap-text-xl cap-font-bold cap-text-center cap-pl-4">
                    Your current subscription
                </span>
                <div className="cap-divider !cap-mt-0 !cap-mb-0"></div>
            </div>
            <div className="cap-space-y-3 cap-pl-4 cap-justify-center cap-flex cap-flex-col">
                <div className="cap-flex cap-w-full cap-justify-between">
                    <div className="cap-flex cap-flex-col cap-px-0">
                        <span className="cap-font-semibold cap-text-md">
                            {subscription.name}
                        </span>
                        <span className="cap-text-sm cap-text-gray-500">
                            {subscription.price} {subscription.symbol} per month
                        </span>
                    </div>

                    <div className="cap-flex cap-flex-col cap-px-0 cap-items-end">
                        <span className="cap-font-semibold cap-text-base">
                            Token
                        </span>
                        <span className="cap-text-sm cap-text-gray-500">
                            BUSD
                        </span>
                    </div>
                </div>
                
                <label
                    htmlFor="cicleo-change-token"
                    className="cap-btn cap-btn-primary"
                >
                    Change Token
                </label>
                
                <label
                    htmlFor="cicleo-confirm-modal-cancel"
                    className="cap-btn cap-btn-error"
                >
                    Cancel my subscription
                </label>
            </div>
        </div>
    );
};

export default SubscriptionPart;