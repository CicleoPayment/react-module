import { formatNumber } from "@context/contract";
import { utils } from "ethers";
import React, { FC } from "react";
import { BounceLoader, ClipLoader } from "react-spinners";

type Step = {
    step: number;
    onClick: () => void;
    subscription: any;
    isLoading: boolean;
    errorMessage: string;
    swapInfo: any;
};

type StepFunction = {
    1: () => void;
    2: () => void;
    3: () => void;
};

const Step1: FC<Step> = ({
    step,
    onClick,
    subscription,
    isLoading,
    errorMessage,
    swapInfo,
}) => {
    if (step == 1) {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-text-gray-600 cap-bg-blue-300 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-gray-700">
                    1
                </span>
                <h3 className="cap-font-medium cap-leading-tight cap-text-black">
                    Approve {swapInfo.inToken.symbol}
                </h3>
                <p className="cap-text-sm">
                    Approve Cicleo to automatically withdraw $
                    {swapInfo.inToken.symbol} from your wallet for each
                    payment cycle
                </p>

                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>

                <button
                    data-tooltip-target="step1"
                    data-tooltip-trigger="cap-hover"
                    className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 cap-mt-6 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-text-center dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 dark:focus:cap-ring-blue-800 cap-flex cap-items-center cap-space-x-3"
                    onClick={onClick}
                >
                    <span>Approve</span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>

                <div
                    id="step1"
                    role="tooltip"
                    className="cap-absolute cap-z-10 cap-invisible cap-inline-block cap-px-3 cap-py-2 cap-text-sm cap-font-medium cap-text-white cap-bg-gray-900 cap-rounded-lg cap-shadow-sm cap-opacity-0 tooltip dark:cap-bg-gray-700"
                >
                    Tooltip content
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </li>
        );
    } else {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-bg-green-200 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-green-900">
                    <svg
                        aria-hidden="true"
                        className="cap-w-5 cap-h-5 cap-text-green-500 dark:cap-text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
                <h3 className="cap-font-medium cap-leading-tight">
                    Approve {swapInfo.inToken.symbol}
                </h3>
                <p className="cap-text-sm">
                    Approve Cicleo to automatically withdraw $
                    {swapInfo.inToken.symbol} from your wallet for each
                    payment cycle
                </p>
            </li>
        );
    }
};

const Step2: FC<Step> = ({
    step,
    onClick,
    subscription,
    isLoading,
    errorMessage,
}) => {
    if (step < 2) {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-bg-gray-100 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-gray-700">
                    2
                </span>
                <h3 className="cap-font-medium cap-leading-tight">
                    Approve Subscription
                </h3>
                <p className="cap-text-sm">
                    Approve the amount of {subscription.symbol} Cicleo can
                    withdraw from your account each payment cycle
                </p>
            </li>
        );
    } else if (step == 2) {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-text-gray-600 cap-bg-blue-300 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-gray-700">
                    2
                </span>
                <h3 className="cap-font-medium cap-leading-tight cap-text-black">
                    Approve Subscription
                </h3>
                <p className="cap-text-sm">
                    Approve the amount of {subscription.symbol} Cicleo can
                    withdraw from your account each payment cycle
                </p>
                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>
                <button
                    className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 cap-mt-6 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-text-center dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 dark:focus:cap-ring-blue-800 cap-flex cap-items-center cap-space-x-3"
                    onClick={onClick}
                >
                    <span>Subscription Approve</span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </li>
        );
    } else {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-bg-green-200 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-green-900">
                    <svg
                        aria-hidden="true"
                        className="cap-w-5 cap-h-5 cap-text-green-500 dark:cap-text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
                <h3 className="cap-font-medium cap-leading-tight">
                    Approve Subscription :
                </h3>
                <p className="cap-text-sm">
                    Approve the amount of {subscription.symbol} Cicleo can
                    withdraw from your account each payment cycle
                </p>
            </li>
        );
    }
};

const Step3: FC<Step> = ({
    step,
    onClick,
    subscription,
    isLoading,
    errorMessage,
    swapInfo,
}) => {
    if (step < 3) {
        return (
            <li className="cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-bg-gray-100 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-gray-700">
                    3
                </span>
                <h3 className="cap-font-medium cap-leading-tight">Subscribe</h3>
                <p className="cap-text-sm">
                    Begin your Cicleo transaction-free payment plan now!
                </p>
            </li>
        );
    } else {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-text-gray-600 cap-bg-blue-300 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-gray-700">
                    3
                </span>
                <h3 className="cap-font-medium cap-leading-tight cap-text-black">
                    Subscribe
                </h3>
                <p className="cap-text-sm">
                    Begin your Cicleo transaction-free payment plan now!
                </p>
                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>
                <button
                    className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 cap-mt-6 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-text-center dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 dark:focus:cap-ring-blue-800 cap-flex cap-items-center cap-space-x-3"
                    onClick={onClick}
                >
                    <span>
                        Start your {subscription.name} Package for{" "}
                        {utils.formatUnits(
                            swapInfo.inAmount,
                            swapInfo.inToken.decimals
                        )}
                    </span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </li>
        );
    }
};

type PaymentModalContent = {
    isLoaded: boolean;
    BUSD: string;
    step: number;
    subscription: any;
    stepFunction: StepFunction;
    loadingStep: number;
    errorMessage: string;
    balance: number | string;
    swapInfo: any;
};

const PaymentModalContent: FC<PaymentModalContent> = ({
    isLoaded,
    BUSD,
    step,
    subscription,
    stepFunction,
    loadingStep,
    errorMessage,
    balance,
    swapInfo,
}) => {
    if (isLoaded == false)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20 cap-flex-col">
                <span className="cap-font-medium">Finding the best way to swap your tokens</span>
                <BounceLoader color="#354c8b" />
            </div>
        );

    return (
        <>
            <div className="cap-flex cap-justify-between cap-py-2">
                <div className="cap-flex cap-flex-row cap-items-center cap-px-5 cap-space-x-3">
                    <img
                        src={BUSD}
                        alt=""
                        className="cap-h-fit"
                        width={40}
                        height={40}
                    />
                    <div className="cap-flex cap-flex-col cap-justify-center">
                        <span className="cap-text-xl cap-font-semibold">
                            Subscription "{subscription.name}"
                        </span>
                        <span className="cap-text-lg cap-font-medium">
                            {subscription.price} {subscription.symbol} per month
                        </span>
                    </div>
                </div>

                <div className="cap-pr-4 cap-flex cap-flex-col cap-items-end">
                    <span className="cap-font-semibold">
                        Your {subscription.symbol} Balance
                    </span>
                    <span>{formatNumber(balance, 2)}</span>
                </div>
            </div>

            <hr />

            <div className="cap-flex cap-flex-col cap-p-3 cap-px-6 cap-font-medium cap-space-y-7">
                <span className="cap-font-semibold cap-text-gray-600">
                    To process your subscription on-boarding, we will require
                    you to sign the following 3 transactions:
                </span>

                <div className="cap-flex cap-justify-center">
                    <ol
                        className={`cap-relative cap-ml-4 cap-text-gray-500 ${
                            (swapInfo != null && "cap-border-l") || ""
                        } cap-border-gray-200 dark:cap-border-gray-700 dark:cap-text-gray-400`}
                    >
                        {swapInfo != null ? (
                            <>
                                <Step1
                                    step={step}
                                    onClick={() => stepFunction[1]()}
                                    subscription={subscription}
                                    isLoading={loadingStep == 1}
                                    errorMessage={errorMessage}
                                    swapInfo={swapInfo}
                                />

                                <Step2
                                    step={step}
                                    onClick={() => stepFunction[2]()}
                                    subscription={subscription}
                                    isLoading={loadingStep == 2}
                                    errorMessage={errorMessage}
                                    swapInfo={swapInfo}
                                />

                                <Step3
                                    step={step}
                                    onClick={() => stepFunction[3]()}
                                    subscription={subscription}
                                    isLoading={loadingStep == 3}
                                    errorMessage={errorMessage}
                                    swapInfo={swapInfo}
                                />
                            </>
                        ) : (
                            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20">
                                <BounceLoader color="#354c8b" />
                            </div>
                        )}
                    </ol>
                </div>
            </div>
        </>
    );
};

export default PaymentModalContent;
