import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import "./PaymentButton.css";
import Logo from "@assets/logo_white.svg";
import LogoBlue from "@assets/logo.png";
import BUSD from "@assets/BUSD.webp";
import { Contracts, isGoodNetwork, doTx } from "@context/contract";
import { BounceLoader, ClipLoader } from "react-spinners";

type PaymentButton = {
    subManagerId: number;
    subscriptionId: number;
    signer: ethers.providers.JsonRpcSigner | undefined;
};

const PaymentButton: FC<PaymentButton> = ({
    signer,
    subManagerId,
    subscriptionId,
}) => {
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [step, setStep] = useState(1);
    const [subscription, setSubscription] = useState({
        isActive: true,
        name: "",
        price: "0",
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [stepFunction, setStepFunction] = useState({
        1: () => { },
        2: () => { },
        3: () => { },
    });

    const [errorMessage, setErrorMessage] = useState('');

    const createContracts = async () => {
        setIsWrongNetwork(false);
        if (!signer) return;

        try {
            const { chainId } = await signer.provider.getNetwork();

            const address = await signer.getAddress();

            console.log(chainId);

            if (!isGoodNetwork(chainId)) {
                setIsWrongNetwork(true);
                console.log("Wrong network");
                return;
            }

            const subFactory = await Contracts.SubscriptionFactory(signer);

            const _subManagerAddy = await subFactory.ids(subManagerId);

            if (_subManagerAddy == "0x0000000000000000000000000000000000000000")
                return;

            const subManager = await Contracts.SubscriptionManager(
                signer,
                _subManagerAddy,
                true
            );

            let subscription = await subManager.subscriptions(subscriptionId);
            const decimals = await subManager.getDecimals();
            const token = await subManager.token();
            const symbol = await subManager.getSymbol();

            let _subscription = {
                isActive: subscription.isActive,
                name: subscription.name,
                price: ethers.utils.formatUnits(subscription.price, decimals),
                symbol,
            };

            const erc20 = await Contracts.ERC20(signer, token, true);

            setStepFunction({
                1: async () => {
                    await doTx(
                        () =>
                            erc20.approve(
                                subManager.address,
                                ethers.constants.MaxUint256
                            ),
                        `Approve ${symbol}`,
                        () => setLoadingStep(1)
                    );

                    setLoadingStep(0)
                    setStep(2);
                },
                2: async () => {
                    await doTx(
                        () =>
                            subManager.approveSubscription(
                                subscription.price
                            ),
                        "Approve Subscription",
                        () => setLoadingStep(2)
                    );

                    setLoadingStep(0)
                    setStep(3);
                },
                3: async () => {
                    try {
                        await doTx(
                            () =>
                                subManager.payment(
                                    subscriptionId,
                                ),
                            "Subscribe",
                            () => setLoadingStep(3)
                        );

                        setLoadingStep(0)
                        setStep(4);
                    } catch (error: any) {
                        console.log(error)
                        setErrorMessage(error.message)
                    }
                    
                },
            });

            let step = 1;

            const allowance = await erc20.allowance(
                address,
                subManager.address
            );

            if (allowance.gt(subscription.price)) {
                step = 2;

                const allowanceSubscription = await subManager.users(address);

                if (allowanceSubscription.approval.gte(subscription.price)) {
                    step = 3;
                }
            }

            setStep(step);
            setIsLoaded(true);
            setSubscription(_subscription);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        createContracts();
    }, [signer]);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="cicleo-blue-button cap-max-w-[300px] cap-flex cap-justify-center "
            >
                <div className="cap-flex cap-items-center cap-justify-center">
                    <span>Pay with</span>
                    <img src={Logo} alt="" />
                </div>
            </button>

            <Modal show={showModal} onClose={handleClose}>
                <PaymentModalContent
                    isWrongNetwork={isWrongNetwork}
                    isLoaded={isLoaded}
                    BUSD={BUSD}
                    subscription={subscription}
                    step={step}
                    setStep={setStep}
                    stepFunction={stepFunction}
                    loadingStep={loadingStep}
                    errorMessage={errorMessage}
                />
            </Modal>
        </>
    );
};

export default PaymentButton;

type Step = {
    step: number;
    onClick: () => void;
    subscription: any;
    isLoading: boolean;
    errorMessage: string;
};

const Step1: FC<Step> = ({ step, onClick, subscription, isLoading, errorMessage }) => {
    if (step == 1) {
        return (
            <li className="cap-mb-10 cap-ml-6">
                <span className="cap-absolute cap-flex cap-items-center cap-justify-center cap-w-8 cap-h-8 cap-text-gray-600 cap-bg-blue-300 cap-rounded-full cap--left-4 cap-ring-4 cap-ring-white dark:cap-ring-gray-900 dark:cap-bg-gray-700">
                    1
                </span>
                <h3 className="cap-font-medium cap-leading-tight cap-text-black">
                    Approve {subscription.symbol}
                </h3>
                <p className="cap-text-sm">
                    Approve Cicleo to automatically withdraw $
                    {subscription.symbol} from your wallet for each payment
                    cycle
                </p>

                <span className="cap-font-normal cap-text-red-400">{errorMessage}</span>

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
                    Approve {subscription.symbol}
                </h3>
                <p className="cap-text-sm">
                    Approve Cicleo to automatically withdraw $
                    {subscription.symbol} from your wallet for each payment
                    cycle
                </p>
            </li>
        );
    }
};

const Step2: FC<Step> = ({ step, onClick, subscription, isLoading, errorMessage }) => {
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
                    Approve the amount of
                    {subscription.symbol} Cicleo can withdraw from your account
                    each payment cycle
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
                    Approve the amount of{subscription.symbol} Cicleo can
                    withdraw from your account each payment cycle
                </p>
                <span className="cap-font-normal cap-text-red-400">{errorMessage}</span>
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
                    Approve the amount of
                    {subscription.symbol} Cicleo can withdraw from your account
                    each payment cycle
                </p>
            </li>
        );
    }
};

const Step3: FC<Step> = ({ step, onClick, subscription, isLoading, errorMessage }) => {
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
                <span className="cap-font-normal cap-text-red-400">{errorMessage}</span>
                <button
                    className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 cap-mt-6 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-text-center dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 dark:focus:cap-ring-blue-800 cap-flex cap-items-center cap-space-x-3"
                    onClick={onClick}
                >
                    <span>Start your {subscription.name} Package</span>
                    {isLoading && <ClipLoader color={"#fff"} size={20} />}
                </button>
            </li>
        );
    }
};

type Modal = {
    children: JSX.Element;
    show: boolean;
    onClose: () => void;
};

const Modal: FC<Modal> = ({ children, show, onClose }) => {
    if (show == false) return <></>;
    return (
        <div
            tabIndex={-1}
            role="dialog"
            aria-hidden={false}
            onClick={onClose}
            className="cap-fixed cap-top-0 cap-left-0 cap-right-0 cap-z-50 cap-flex cap-items-center cap-justify-center cap-overflow-x-hidden cap-overflow-y-auto cap-bg-gray-900 cap-bg-opacity-50 h-modal md:cap-inset-0 md:cap-h-full dark:cap-bg-opacity-80"
        >
            <div
                className="cap-relative cap-w-full cap-h-full cap-max-w-2xl md:cap-h-fit"
                onClick={(e: any) => e.stopPropagation()}
            >
                {/* <!-- Modal content --> */}
                <div className="cap-relative cap-bg-white cap-rounded-lg cap-shadow dark:cap-bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="cap-flex cap-items-start cap-justify-between cap-p-4 cap-border-b cap-rounded-t dark:cap-border-gray-600">
                        <div className="cap-flex cap-items-center cap-w-full cap-space-x-4">
                            <img
                                src={LogoBlue}
                                alt=""
                                className="cap-max-h-10"
                            />
                            <h3 className="cap-text-xl cap-font-semibold cap-text-gray-900 dark:cap-text-white">
                                Ciclo Payment
                            </h3>
                        </div>

                        <button
                            onClick={onClose}
                            type="button"
                            className="cap-text-gray-400 cap-bg-transparent hover:cap-bg-gray-200 hover:cap-text-gray-900 cap-rounded-lg cap-text-sm cap-p-1.5 cap-ml-auto cap-inline-flex cap-items-center dark:hover:cap-bg-gray-600 dark:hover:cap-text-white"
                            data-modal-hide="defaultModal"
                        >
                            <svg
                                aria-hidden="true"
                                className="cap-w-5 cap-h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="cap-sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    {children}
                    {/* <!-- Modal footer --> */}
                    <div className="cap-flex cap-items-center cap-p-6 cap-space-x-2 cap-border-t cap-border-gray-200 cap-rounded-b dark:cap-border-gray-600">
                        <button
                            data-modal-hide="defaultModal"
                            type="button"
                            className="cap-text-gray-500 cap-bg-white hover:cap-bg-gray-100 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-rounded-lg cap-border cap-border-gray-200 cap-text-sm cap-font-medium cap-px-5 cap-py-2.5 hover:cap-text-gray-900 focus:cap-z-10 dark:cap-bg-gray-700 dark:cap-text-gray-300 dark:cap-border-gray-500 dark:hover:cap-text-white dark:hover:cap-bg-gray-600 dark:focus:cap-ring-gray-600"
                            onClick={onClose}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

type StepFunction = {
    1: () => void;
    2: () => void;
    3: () => void;
};

type PaymentModalContent = {
    isWrongNetwork: boolean;
    isLoaded: boolean;
    BUSD: string;
    step: number;
    subscription: any;
    setStep: (step: number) => void;
    stepFunction: StepFunction;
    loadingStep: number;
    errorMessage: string;
};

const PaymentModalContent: FC<PaymentModalContent> = ({
    isWrongNetwork,
    isLoaded,
    BUSD,
    step,
    subscription,
    setStep,
    stepFunction,
    loadingStep,
    errorMessage
}) => {
    if (!isLoaded)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20">
                <BounceLoader color="#354c8b" />
            </div>
        );

    if (isWrongNetwork)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20">
                <span className="cap-font-semibold cap-text-2xl">
                    Sorry but this network is unsuported
                </span>
            </div>
        );

    return (
        <>
            <div className="cap-flex cap-flex-col cap-py-2">
                <div className="cap-flex cap-flex-row cap-items-center cap-px-5 cap-space-x-3">
                    <img
                        src={BUSD}
                        alt=""
                        className="cap-h-fit"
                        width={30}
                        height={30}
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
            </div>

            <hr />

            <div className="cap-flex cap-flex-col cap-p-3 cap-px-6 cap-font-medium cap-space-y-7">
                <span className="cap-font-semibold cap-text-gray-600">
                    To process your subscription on-boarding, we will require
                    you to sign the following 3 transactions:
                </span>

                <div className="cap-flex cap-justify-center">
                    <ol className="cap-relative cap-ml-4 cap-text-gray-500 cap-border-l cap-border-gray-200 dark:cap-border-gray-700 dark:cap-text-gray-400">
                        <Step1
                            step={step}
                            onClick={() => stepFunction[1]()}
                            subscription={subscription}
                            isLoading={loadingStep == 1}
                            errorMessage={errorMessage}
                        />

                        <Step2
                            step={step}
                            onClick={() => stepFunction[2]()}
                            subscription={subscription}
                            isLoading={loadingStep == 2}
                            errorMessage={errorMessage}
                        />

                        <Step3
                            step={step}
                            onClick={() => stepFunction[3]()}
                            subscription={subscription}
                            isLoading={loadingStep == 3}
                            errorMessage={errorMessage}
                        />
                    </ol>
                </div>
            </div>
        </>
    );
};
