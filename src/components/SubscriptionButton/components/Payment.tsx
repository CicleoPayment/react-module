import LoadingState from "../../Shared/LoadingState";
import { formatNumber } from "@context/contract";
import { BigNumber, utils } from "ethers";
import React, { FC, useState } from "react";
import { ClipLoader } from "react-spinners";

type ApprovalSelector = {
    isInfinity: boolean;
    setIsInfinity: (isInfinity: boolean) => void;
    textLabel: string;
    setApprovalAmount: (approvalAmount: number) => void;
    approvalAmount: number;
};

const ApprovalSelector: FC<ApprovalSelector> = ({
    isInfinity,
    setIsInfinity,
    textLabel,
    approvalAmount,
    setApprovalAmount,
}) => {
    const toggleInfinity = (e: any) => {
        setIsInfinity(e.target.checked);
    };

    const handleOnChangeValue = (e: any) => {
        setApprovalAmount(e.target.value);
    };

    return (
        <div className="cap-flex cap-space-x-5">
            <div className="cap-flex-grow">
                <div className="cap-form-control">
                    <label className="cap-label">
                        <span className="cap-label-text">Approval</span>
                    </label>
                    <label className="cap-input-group">
                        <input
                            type="number"
                            id="approveAmount"
                            placeholder="50"
                            name="approveAmount"
                            required={!isInfinity}
                            min={0}
                            disabled={isInfinity}
                            value={approvalAmount}
                            className="cap-input cap-input-bordered"
                            onChange={handleOnChangeValue}
                        />
                        <span className="cap-max-w-[30rem]">{textLabel}</span>
                    </label>
                </div>
            </div>

            <div className="cap-h-20 cap-w- cap-border-r cap-border-[#E5E7EB]" />

            <div className="cap-flex-grow cap-flex cap-items-center cap-justify-center">
                <div className="cap-flex cap-items-center cap-mb-4 ">
                    <input
                        id="infinity-checkbox"
                        type="checkbox"
                        name="infinity-checkbox"
                        onChange={toggleInfinity}
                        checked={isInfinity}
                        className="cap-checkbox"
                    />
                    <label htmlFor="infinity-checkbox" className="cap-label">
                        <span className="cap-label-text">
                            Unlimited approval
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

type Step = {
    onClick: () => void;
    subscription: any;
    oldSubscription: any;
    isLoading: boolean;
    errorMessage: string;
    swapInfo: any;
    setIsInfinity?: (isInfinity: boolean) => void;
    isInfinity?: boolean;
    approvalAmount?: number;
    setApprovalAmount?: (approvalAmount: number) => void;
    coin: any;
};

type StepFunction = {
    1: (isInfinityToken: boolean, approvalToken: number) => void;
    2: (isInfinitySubscription: boolean, approvalSubscription: number) => void;
    3: () => void;
};

const Step1: FC<Step> = ({
    onClick,
    isLoading,
    errorMessage,
    swapInfo,
    setIsInfinity,
    isInfinity,
    approvalAmount,
    setApprovalAmount,
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

                <div className="cap-alert cap-alert-info cap-shadow-lg cap-mt-2">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="cap-stroke-current cap-flex-shrink-0 cap-w-6 cap-h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>
                            We advise you to use recommanded parameters. For
                            Metamask users click on "use default" button on the
                            approval window
                        </span>
                    </div>
                </div>

                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>

                <div className="cap-mt-4">
                    {/* // @ts-ignore */}
                    <ApprovalSelector
                        textLabel={swapInfo.inToken.symbol}
                        isInfinity={isInfinity || false}
                        setIsInfinity={setIsInfinity || (() => {})}
                        setApprovalAmount={setApprovalAmount || (() => {})}
                        approvalAmount={approvalAmount || 0}
                    />
                </div>
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
    isLoading,
    errorMessage,
    setIsInfinity,
    isInfinity,
    approvalAmount,
    setApprovalAmount,
    swapInfo,
}) => {
    return (
        <div className="cap-text-left cap-space-y-10">
            <div className="cap-px-8">
                <h3 className="cap-font-medium">Subscription Limit</h3>
                <p className="cap-text-sm">
                    Approve the amount of {swapInfo.outToken.symbol} Cicleo can
                    withdraw from your account each payment cycle
                </p>
                <span className="cap-font-normal cap-text-red-400">
                    {errorMessage}
                </span>

                <div className="cap-mt-4">
                    {/* // @ts-ignore */}
                    <ApprovalSelector
                        textLabel={`${swapInfo.outToken.symbol}`}
                        isInfinity={isInfinity || false}
                        setIsInfinity={setIsInfinity || (() => {})}
                        setApprovalAmount={setApprovalAmount || (() => {})}
                        approvalAmount={approvalAmount || 0}
                    />
                </div>
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

const Step3: FC<Step> = ({
    onClick,
    subscription,
    oldSubscription,
    isLoading,
    errorMessage,
    coin,
}) => {
    return (
        <div className="cap-text-left cap-space-y-10">
            <div className="cap-px-8">
                <h3 className="cap-font-medium">
                    {subscription.id == oldSubscription.id
                        ? " Re-Subscribe"
                        : "Subscribe"}{" "}
                    to {subscription.name} for{" "}
                    {utils.formatUnits(coin.toPay, coin.decimals)} {coin.symbol}
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
                        Subscribe for{" "}
                        {utils.formatUnits(coin.toPay, coin.decimals)}{" "}
                        {coin.symbol}
                    </span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </div>
        </div>
    );
};

type Approval = {
    isInfinity: boolean;
    amount: number;
    setIsInfinity: (isInfinity: boolean) => void;
    setAmount: (amount: number) => void;
};

type Payment = {
    isLoaded: boolean;
    step: number;
    setStep: (step: number) => void;
    subscription: any;
    oldSubscription: any;
    stepFunction: StepFunction;
    loadingStep: number;
    errorMessage: string;
    swapInfo: any;
    isPurchased: boolean;
    token: Approval;
    subscriptionLimit: Approval;
    isViaBridge: boolean;
    coin: any;
};

const Payment: FC<Payment> = ({
    isLoaded,
    step,
    setStep,
    subscription,
    oldSubscription,
    stepFunction,
    loadingStep,
    errorMessage,
    swapInfo,
    isPurchased,
    token,
    subscriptionLimit,
    isViaBridge,
    coin,
}) => {
    if (isPurchased) {
        return (
            <div className="cap-p-4 cap-space-y-8">
                <h2 className="cap-text-xl cap-font-semibold">
                    Thanks for your subscription!
                </h2>

                {isViaBridge && (
                    <span>
                        Note that since you use a bridge to pay this
                        subscription that can take some mintues to perform on
                        the destination chain! You'll receive an email when that
                        would be done !
                    </span>
                )}

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
            <LoadingState text="Finding the best way to swap your tokens..." />
        );
    return (
        <div className="cap-space-y-4 cap-px-4 cap-mt-4">
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
                                className={`cap-step ${
                                    step >= 1 && "cap-step-primary"
                                }`}
                                onClick={() => {
                                    setStep(1);
                                }}
                            >
                                Approve {swapInfo.inToken.symbol}
                            </li>
                            <li
                                className={`cap-step ${
                                    step >= 2 && "cap-step-primary"
                                }`}
                                onClick={() => {
                                    setStep(2);
                                }}
                            >
                                Subscription Limit
                            </li>
                            <li
                                className={`cap-step ${
                                    step == 3 && "cap-step-primary"
                                }`}
                                onClick={() => {
                                    setStep(3);
                                }}
                            >
                                Subscribe
                            </li>
                        </ul>

                        <div className="cap-mt-8 ">
                            {step == 1 && (
                                <Step1
                                    onClick={() =>
                                        stepFunction[1](
                                            token.isInfinity,
                                            token.amount
                                        )
                                    }
                                    subscription={subscription}
                                    oldSubscription={oldSubscription}
                                    isLoading={loadingStep == 1}
                                    errorMessage={errorMessage}
                                    swapInfo={swapInfo}
                                    isInfinity={token.isInfinity}
                                    setIsInfinity={token.setIsInfinity}
                                    approvalAmount={token.amount}
                                    setApprovalAmount={token.setAmount}
                                    coin={coin}
                                />
                            )}

                            {step == 2 && (
                                <Step2
                                    onClick={() =>
                                        stepFunction[2](
                                            subscriptionLimit.isInfinity,
                                            subscriptionLimit.amount
                                        )
                                    }
                                    subscription={subscription}
                                    oldSubscription={oldSubscription}
                                    isLoading={loadingStep == 2}
                                    errorMessage={errorMessage}
                                    swapInfo={swapInfo}
                                    isInfinity={subscriptionLimit.isInfinity}
                                    setIsInfinity={
                                        subscriptionLimit.setIsInfinity
                                    }
                                    approvalAmount={subscriptionLimit.amount}
                                    setApprovalAmount={
                                        subscriptionLimit.setAmount
                                    }
                                    coin={coin}
                                />
                            )}

                            {step == 3 && (
                                <Step3
                                    onClick={() => stepFunction[3]()}
                                    subscription={subscription}
                                    oldSubscription={oldSubscription}
                                    isLoading={loadingStep == 3}
                                    errorMessage={errorMessage}
                                    swapInfo={swapInfo}
                                    coin={coin}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <LoadingState text="Finding best path to pay subscripiton..." />
                )}
            </div>
        </div>
    );
};

export default Payment;
