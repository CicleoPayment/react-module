import React, { FC } from "react";
import TOKEN_IMG from "@assets/token.svg";
import BACK_ARROW_IMG from "@assets/back-arrow.svg";
import { formatNumber, reduceAddress } from "@context/contract";
import { getNetwork } from "@wagmi/core";

type Network = {
    name: string,
    chainId: number,
    rpcUrls: string,
    image: string,
}

type Coin = {
    symbol: string,
    image: string,
    balance: number
}

type HeaderSubscriptionInfo = {
    subscription: any;
    oldSubscription: any;
    subscriptionInfoIsFetched: boolean;
    step: number;
    loadingStep: number;
    inToken: Coin;
    duration: number;
    _chains: Network[];
    networkSelected: boolean;
    handleBackOnNetwork: () => void;
    handleBackCoins: () => void;
    handleBackStep: (stepNumber: number) => void;
};

const getDurationPeriod = (duration: number) => {
    if (duration == 30 * 86400) return "month";

    if (duration == 7 * 86400) return "week";

    if (duration == 86400) return "day";
};

type ArrowGetBack = {
    onClick: () => void
}

const ArrowGetBack: FC<ArrowGetBack> = ({onClick}) => {
    return <>
        <button onClick={onClick}>
            <img
                src={BACK_ARROW_IMG}
                width={20}
                height={20}
                alt="Back arrow"
            />
        </button>
        <div className="cap-divider cap-divider-horizontal"></div>
    </>
}

const HeaderSubscriptionInfo: FC<HeaderSubscriptionInfo> = ({
    subscription,
    oldSubscription,
    subscriptionInfoIsFetched,
    loadingStep,
    step,
    inToken,
    duration,
    _chains,
    networkSelected,
    handleBackOnNetwork,
    handleBackStep,
    handleBackCoins
}) => {
    
    //In case of info of the subscription is not fetched yet
    if (!subscriptionInfoIsFetched) return <></>;

    const { chain, chains } = getNetwork();
    let paymentChainId = 0
    let chainInfo = null
    if (chain) {
        paymentChainId = chain.id

        for (let i = 0; i < _chains.length; i++) {
            let _chainInfo = _chains[i]

            if (_chainInfo.chainId == paymentChainId) {
                chainInfo = _chainInfo
            }
        }
    };
    
    //If user didnt have a actual subscription
    if (oldSubscription.id == 0 || subscription.id == oldSubscription.id)
        return (
            <>
                <div className="cap-flex cap-py-3 cap-w-full cap-space-x-2 cap-gap-2 cap-items-center cap-px-4 cap-justify-between cap-border-primary">
                    <div className="cap-flex cap-items-center cap-space-x-2">

                        {(() => {
                            if (subscription.id == oldSubscription.id && oldSubscription.isActive) {
                                return (<></>)
                            }

                            if (step == 1 && loadingStep != 1) return (
                                <ArrowGetBack onClick={handleBackCoins} />
                            )

                            if (step == 2 && loadingStep != 2) return (
                                <ArrowGetBack onClick={() => handleBackStep(1)} />
                            )

                            if (step == 3 && loadingStep != 3) return (
                                <ArrowGetBack onClick={() => handleBackStep(2)} />
                            )

                            if (networkSelected == true) return (
                                <ArrowGetBack onClick={handleBackOnNetwork} />
                                
                            )
                        })()}


                        {(networkSelected == true && chainInfo != undefined && loadingStep != 3) &&
                            <img
                                src={chainInfo.image}
                                alt="blockchain image"
                                className="cap-h-fit !cap-mr-2"
                                width={40}
                                height={40}
                            />
                        }
                        <div className="cap-flex cap-flex-col cap-justify-center">
                            <span className="cap-text-xl cap-font-semibold">
                                {subscription.name}
                            </span>
                            <span className="cap-text-lg cap-font-medium">
                                {subscription.price} {subscription.tokenSymbol}{" "}
                                per {getDurationPeriod(duration)}
                            </span>
                        </div>
                    </div>

                    {inToken.symbol != undefined && (
                        <div className="cap-flex cap-items-center cap-text-end">
                            <div className="cap-pr-4 cap-flex cap-flex-col cap-items-end">
                                <span className="cap-font-semibold">
                                    Your {inToken.symbol} Balance
                                </span>
                                <span>{formatNumber(inToken.balance, 2)}</span>
                            </div>
                            <img
                                src={inToken.image}
                                alt=""
                                className="cap-h-fit"
                                width={40}
                                height={40}
                            />
                        </div>
                    )}
                    
                </div>

                <div className="cap-divider cap-my-0"></div>
            </>
        );

    //When the user already have a asubscription (so upgrade subscription)
    return (
        <>
            <div className="cap-flex cap-flex-col cap-content-center cap-flex-wrap cap-justify-between cap-py-2 cap-bg-base-100">
                <div className="cap-indicator cap-w-[400px] cap-flex cap-space-x-2 cap-py-2 cap-px-3 cap-border-primary cap-bg-gray-800 cap-rounded-xl">
                    <img
                        src={TOKEN_IMG}
                        alt=""
                        className="cap-h-fit"
                        width={40}
                        height={40}
                    />
                    <div className="cap-flex cap-flex-col cap-justify-center">
                        <span className="cap-text-xl cap-font-semibold">
                            {oldSubscription.name}
                        </span>
                        <span className="cap-text-lg cap-font-medium">
                            {oldSubscription.price}{" "}
                            {oldSubscription.tokenSymbol} per month
                        </span>
                    </div>
                </div>
                <div className="cap-divider cap-w-[100px] cap-self-center">
                    TO
                </div>
                <div className="cap-indicator cap-w-[400px] cap-flex cap-space-x-2 cap-py-2 cap-px-3 cap-border-primary cap-bg-gray-800 cap-rounded-xl">
                    <span className="cap-indicator-item cap-badge cap-badge-primary">
                        new
                    </span>
                    <img
                        src={TOKEN_IMG}
                        alt=""
                        className="cap-h-fit"
                        width={40}
                        height={40}
                    />
                    <div className="cap-flex cap-flex-col cap-justify-center">
                        <span className="cap-text-xl cap-font-semibold">
                            {subscription.name}
                        </span>
                        <span className="cap-text-lg cap-font-medium">
                            {subscription.price} {subscription.tokenSymbol} per
                            month
                        </span>
                    </div>
                </div>
            </div>
            <div className="cap-divider cap-my-0"></div>
        </>
    );
};

export default HeaderSubscriptionInfo;
