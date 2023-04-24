import { formatNumber } from "@context/contract";
import { BigNumber, ethers, utils } from "ethers";
import React, { FC } from "react";
import { ClipLoader } from "react-spinners";
type Step = {
    onClick: () => void;
    subscription: any;
    isLoading: boolean;
    errorMessage: string;
    swapInfo: any;
};

type SubManagerInfo = {
    id: number;
    address: string;
    name: string;
    owner: string;
    decimals: number;
    tokenAddress: string;
    treasury: string;
    tokenSymbol: string;
    subscriptions: any;
    allowance: BigNumber;
};

type StepFunction = {
    1: () => void;
    2: () => void;
    3: () => void;
};

const Step1: FC<Step> = ({
    onClick,
    subscription,
    isLoading,
    errorMessage,
    swapInfo,
}) => {
    return (
        <div className="cap-text-left cap-space-y-10">
            <div className="cap-px-8">
                <h3 className="cap-font-medium">
                    Approve {swapInfo.inToken.symbol}
                </h3>
                <p className="cap-text-sm">
                    Approve Cicleo to automatically withdraw $
                    {swapInfo.inToken.symbol} from your wallet for each payment
                    cycle
                </p>

                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>
            </div>

            <div className="cap-modal-action">
                <button
                    data-tooltip-target="step1"
                    data-tooltip-trigger="cap-hover"
                    className="cap-space-x-3 cap-btn cap-btn-primary"
                    onClick={onClick}
                >
                    <span>Approve</span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </div>
        </div>
    );
};

const Step2: FC<Step> = ({
    onClick,
    subscription,
    isLoading,
    errorMessage,
}) => {
    return (
        <div className="cap-text-left cap-space-y-10">
            <div className="cap-px-8">
                <h3 className="cap-font-medium">Subscription Limit</h3>
                <p className="cap-text-sm">
                    Approve the amount of {subscription.symbol} Cicleo can
                    withdraw from your account each payment cycle
                </p>
                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>
            </div>

            <div className="cap-modal-action">
                <button
                    className="cap-space-x-3 cap-btn cap-btn-primary"
                    onClick={onClick}
                >
                    <span>Subscription Limit</span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </div>
        </div>
    );
};

const formatPrice = (price: any, decimals: number, symbol: string) => {
    if (price == 0) {
        return "Free";
    }

    return `${Number(
        utils.formatUnits(
            price,
            decimals
        )
    ).toFixed(2)} ${symbol}`
}

const Step3: FC<Step> = ({
    onClick,
    subscription,
    isLoading,
    errorMessage,
    swapInfo,
}) => {
    return (
        <div className="cap-text-left cap-space-y-10">
            <div className="cap-px-8">
                <h3 className="cap-font-medium">
                    Subscribe for{" "}{formatPrice(swapInfo.inAmount, swapInfo.inToken.decimals, swapInfo.outToken.symbol)}
                </h3>
                <p className="cap-text-sm">
                    Begin your Cicleo transaction-free payment plan now!
                </p>
                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>
            </div>

            <div className="cap-modal-action">
                <button
                    className="cap-space-x-3 cap-btn cap-btn-primary"
                    onClick={onClick}
                >
                    <span>
                    Subscribe for{" "}{formatPrice(swapInfo.inAmount, swapInfo.inToken.decimals, swapInfo.outToken.symbol)}
                    </span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </div>
        </div>
    );
};

type Coin = {
    symbol: string;
    balance: string;
    image: string;
};

type PaymentModalContent = {
    isLoaded: boolean;
    inToken: Coin;
    step: number;
    subscription: any;
    oldSubscription: any;
    stepFunction: StepFunction;
    loadingStep: number;
    errorMessage: string;
    balance: number | string;
    swapInfo: any;
    isPurchased: boolean;
    duration: number;
};

const getDurationPeriod = (duration: number) => {
    if (duration == 30 * 86400) return "month";

    if (duration == 7 * 86400) return "week";

    if (duration == 86400) return "day";
};

const PaymentModalContent: FC<PaymentModalContent> = ({
    isLoaded,
    inToken,
    step,
    subscription,
    oldSubscription,
    stepFunction,
    loadingStep,
    errorMessage,
    balance,
    swapInfo,
    isPurchased,
    duration,
}) => {
    if (isPurchased) {
        return (
            <div className="cap-p-4 cap-space-y-8">
                <h2 className="cap-text-xl cap-font-semibold">
                    Thanks for your subscription!
                </h2>
                <div className="cap-shadow-lg cap-alert cap-alert-success">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="cap-flex-shrink-0 cap-w-6 cap-h-6 cap-stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="cap-flex cap-flex-col">
                            <span>Your subscription has been confirmed!</span>
                            <span>You can close this page</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoaded == false)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20 cap-flex-col">
                <span className="cap-font-medium">
                    Finding the best way to swap your tokens
                </span>
                <progress className="cap-w-56 cap-progress"></progress>
            </div>
        );
    console.log(`Old subId = ${subscription.subscriptionId}`);
    return (
        <>
            <div className="cap-flex cap-justify-between cap-py-2 cap-px-5">
                <div className="cap-flex cap-flex-row cap-items-center cap-space-x-3">
                    <div className="cap-flex cap-flex-col cap-justify-center">
                        <span className="cap-text-xl cap-font-semibold">
                            {subscription.name}
                        </span>
                        <span className="cap-text-lg cap-font-medium">
                            {Number(subscription.price) == 0
                                ? "Free"
                                : `${subscription.price} ${
                                      subscription.tokenSymbol
                                  } per ${getDurationPeriod(duration)}`}
                        </span>
                    </div>
                </div>

                {subscription.price != "0.0" && (
                    <div className="cap-flex cap-items-center">
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

            <div className="cap-divider"></div>

            <div className="cap-space-y-4 cap-px-4">
                <div className="cap-shadow-lg cap-alert cap-alert-info">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="cap-flex-shrink-0 cap-w-6 cap-h-6 cap-stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>
                            To process your subscription on-boarding, we will
                            require you to sign the following 3 transactions:
                        </span>
                    </div>
                </div>
                <div className="cap-pb-5 cap-flex cap-justify-center cap-flex-col">
                    {swapInfo != null ? (
                        <>
                            <ul className="cap-steps cap-steps-vertical lg:cap-steps-horizontal">
                                <li
                                    className={`cap-step ${step >= 1 && "cap-step-primary"
                                        }`}
                                >
                                    Approve {swapInfo.inToken.symbol}
                                </li>
                                <li
                                    className={`cap-step ${step >= 2 && "cap-step-primary"
                                        }`}
                                >
                                    Subscription Limit
                                </li>
                                <li
                                    className={`cap-step ${step == 3 && "cap-step-primary"
                                        }`}
                                >
                                    Subscribe
                                </li>
                            </ul>

                            <div className="cap-mt-8 ">
                                {step == 1 && (
                                    <Step1
                                        onClick={() => stepFunction[1]()}
                                        subscription={subscription}
                                        isLoading={loadingStep == 1}
                                        errorMessage={errorMessage}
                                        swapInfo={swapInfo}
                                    />
                                )}

                                {step == 2 && (
                                    <Step2
                                        onClick={() => stepFunction[2]()}
                                        subscription={subscription}
                                        isLoading={loadingStep == 2}
                                        errorMessage={errorMessage}
                                        swapInfo={swapInfo}
                                    />
                                )}

                                {step == 3 && (
                                    <Step3
                                        onClick={() => stepFunction[3]()}
                                        subscription={subscription}
                                        isLoading={loadingStep == 3}
                                        errorMessage={errorMessage}
                                        swapInfo={swapInfo}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-py-10 cap-px-4 cap-flex-col cap-space-y-4">
                            <span className="cap-text-center cap-font-medium cap-text-2xl">
                                Finding best path to pay subscripiton...
                            </span>
                            <progress className="cap-w-56 cap-progress"></progress>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentModalContent;
