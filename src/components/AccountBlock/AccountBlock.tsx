import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import "./AccountBlock.css";
import Logo from "@assets/logo_white.svg";
import LogoBlue from "@assets/logo.png";
import { ConfirmationModal } from "./../index";
import {
    Contracts,
    isGoodNetwork,
    doTx,
    reduceAddress,
} from "@context/contract";
import { BounceLoader, ClipLoader } from "react-spinners";

type PaymentButton = {
    subManagerId: number;
    signer: ethers.providers.JsonRpcSigner | undefined;
};

const AccountBlock: FC<PaymentButton> = ({ subManagerId, signer }) => {
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [subManager, setSubManager] = useState({} as subManager);
    const [subscription, setSubscription] = useState({
        name: "",
        price: "0",
        isCancelled: false,
    });
    const [account, setAccount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const createContracts = async () => {
        setIsLoaded(false);
        setIsWrongNetwork(false);

        if (!signer) return;

        try {
            const { chainId } = await signer.provider.getNetwork();

            const address = await signer.getAddress();

            signer.provider.on("accountsChanged", (accounts: string[]) => {
                createContracts();
            });

            setAccount(address);

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

            let subscription = await subManager.subscriptions(1);
            const decimals = await subManager.getDecimals();
            const token = await subManager.token();
            const symbol = await subManager.getSymbol();

            const userData = await subManager.users(address);

            const erc20 = await Contracts.ERC20(signer, token, true);
            const allowance = await erc20.allowance(
                address,
                subManager.address
            );

            let _subManager: subManager = {
                address: _subManagerAddy,
                name: await subManager.name(),
                coinSymbol: symbol,
                coinDecimals: decimals,
                coinAddress: token,
                subApproval: userData.approval,
                tokenApproval: allowance,
            };

            setSubManager(_subManager);

            const subscriptionData = await subManager.getSubscriptionStatus(
                address
            );

            const sub = await subManager.subscriptions(
                subscriptionData.subscriptionId
            );

            let _subscription = {
                id: subscriptionData.subscriptionId,
                isActive: sub.isActive,
                name: sub.name,
                price: ethers.utils.formatUnits(sub.price, decimals),
                isCancelled: !subscriptionData.isActive,
                subscriptionEndDate: userData.subscriptionEndDate.toNumber(),
            };

            let step = 1;

            if (allowance.gt(subscription.price)) {
                step = 2;

                const allowanceSubscription = await subManager.users(address);

                if (allowanceSubscription.approval.gte(subscription.price)) {
                    step = 3;
                }
            }

            setIsLoaded(true);
            setSubscription(_subscription);
        } catch (error: any) {
            console.log(error);
        }
    };

    const unsubscribe = async () => {};

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
                    <span>Manage your Account</span>
                </div>
            </button>

            <Modal show={showModal} onClose={handleClose}>
                <AccountModalContent
                    isWrongNetwork={isWrongNetwork}
                    isLoaded={isLoaded}
                    account={account}
                    setShowConfirmationModal={setShowConfirmationModal}
                    subManager={subManager}
                    subscription={subscription}
                    errorMessage={errorMessage}
                />
            </Modal>

            <ConfirmationModal
                show={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                confirmationMessageHeader={`Are you sure about cancelling your subscription?`}
                confirmationMessage={`You will still be able to use the service until the end of the current billing period.`}
                onConfirm={unsubscribe}
            />
        </>
    );
};

export default AccountBlock;

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
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

type subManager = {
    name: string;
    address: string;
    coinSymbol: string;
    coinAddress: string;
    coinDecimals: number;
    subApproval: BigNumber;
    tokenApproval: BigNumber;
};

type AccountModalContent = {
    isWrongNetwork: boolean;
    isLoaded: boolean;
    account: string;
    setShowConfirmationModal: (show: boolean) => void;
    subManager: subManager;
    subscription: any;
    errorMessage: string;
};

const AccountModalContent: FC<AccountModalContent> = ({
    isWrongNetwork,
    isLoaded,
    account,
    setShowConfirmationModal,
    subManager,
    subscription,
    errorMessage,
}) => {
    if (isWrongNetwork)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20">
                <span className="cap-font-semibold cap-text-2xl">
                    Sorry but this network is unsuported
                </span>
            </div>
        );

    if (isLoaded == false)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20">
                <BounceLoader color="#354c8b" />
            </div>
        );

    console.log(subscription.subscriptionEndDate);

    const endCycleDate = new Date(subscription.subscriptionEndDate * 1000);

    return (
        <>
            <div className="cap-flex cap-w-full cap-justify-between cap-items-center cap-py-4 cap-px-5 cap-leading-[1.2] cap-flex-row">
                <span className="cap-font-semibold cap-text-xl">
                    Manage your account
                </span>
                <span className="cap-font-semibold cap-text-tiny cap-text-gray-700">
                    {reduceAddress(account)}
                </span>
            </div>

            <hr />

            {subscription.id == 0 ? (
                <div className="cap-w-full cap-border cap-flex cap-flex-col cap-px-4 cap-py-4 cap-space-y-2">
                    <span className="cap-font-bold cap-text-xl">
                        You dont have any subscription
                    </span>
                    <span className="cap-text-lg cap-text-gray-600 cap-font-semibold">
                        Return on the DApp to subscribe and so be able to manage
                        your subscription here
                    </span>
                </div>
            ) : (
                <div className="cap-flex">
                    <SubscriptionSquare
                        setShowConfirmationModal={setShowConfirmationModal}
                        subscription={subscription}
                    />
                    <div className="cap-p-4 cap-space-y-3 cap-border cap-flex-grow">
                        <span className="cap-text-gray-600 cap-font-semibold">
                            Approval Settings
                            </span>
                            <hr/>
                        <div className="cap-flex cap-flex-col">
                            <span className="cap-font-semibold cap-text-md">
                                {subManager.coinSymbol} Approval
                            </span>
                            <span className="cap-text-gray-600">
                                {subManager.tokenApproval.eq(
                                    ethers.constants.MaxUint256
                                )
                                    ? "Infinity"
                                    : ethers.utils.formatUnits(
                                          subManager.tokenApproval,
                                          subManager.coinDecimals
                                      )}
                            </span>

                            <button
                                type="button"
                                className="cap-text-white cap-mt-2 cap-bg-blue-700 hover:cap-bg-blue-800 focus:cap-ring-4 focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 focus:cap-outline-none dark:focus:cap-ring-blue-800"
                                onClick={() => setShowConfirmationModal(true)}
                            >
                                Edit
                            </button>
                        </div>

                        <div className="cap-flex cap-flex-col">
                            <span className="cap-font-semibold cap-text-md">
                                Subscription Approval
                            </span>
                            <span className="cap-text-gray-600">
                                {subManager.subApproval.eq(
                                    ethers.constants.MaxUint256
                                )
                                    ? "Infinity"
                                    : ethers.utils.formatUnits(
                                          subManager.subApproval,
                                          subManager.coinDecimals
                                      )}{" "}
                                {subManager.coinSymbol} per month
                            </span>

                            <button
                                type="button"
                                className="cap-text-white cap-mt-2 cap-bg-blue-700 hover:cap-bg-blue-800 focus:cap-ring-4 focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 focus:cap-outline-none dark:focus:cap-ring-blue-800"
                                onClick={() => setShowConfirmationModal(true)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="cap-p-4 cap-space-y-3 cap-border cap-flex-grow">
                    <span className="cap-text-gray-600 cap-font-semibold">
                            Subscription Info
                            </span>
                            <hr/>
                        <div className="cap-flex cap-flex-col">
                            <span className="cap-font-semibold cap-text-md">
                                Subscription Next Cycle
                            </span>
                            <span className="cap-text-gray-600">
                                {capitalizeFirstLetter(
                                    endCycleDate.toLocaleString(
                                        window.navigator.language,
                                        { weekday: "long" }
                                    )
                                )}{" "}
                                {endCycleDate.getDay()}{" "}
                                {capitalizeFirstLetter(
                                    endCycleDate.toLocaleString(
                                        window.navigator.language,
                                        { month: "long" }
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

type SubscriptionSquare = {
    setShowConfirmationModal: (show: boolean) => void;
    subscription: any;
};

const SubscriptionSquare: FC<SubscriptionSquare> = ({
    setShowConfirmationModal,
    subscription,
}) => {
    if (false) {
        return (
            <div className="cap-max-w-[40%] cap-border cap-flex cap-flex-col cap-px-4 cap-py-4 cap-space-y-2">
                <span className="cap-text-gray-600 cap-font-semibold">
                    Your canceled subscription
                </span>
                <hr/>
                <div className="cap-flex cap-flex-col cap-px-0">
                    <span className="cap-font-bold cap-text-xl">
                        {subscription.name} Package
                    </span>
                    <span className="cap-text-sm cap-text-gray-800">
                        {subscription.price} {subscription.symbol} per year
                    </span>
                </div>

                <button
                    type="button"
                    className="focus:cap-outline-none cap-text-white cap-bg-red-700 hover:cap-bg-red-800 focus:cap-ring-4 focus:cap-ring-red-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-red-600 dark:hover:cap-bg-red-700 dark:focus:cap-ring-red-900"
                    onClick={() => setShowConfirmationModal(true)}
                >
                    Renew my subscription
                </button>
            </div>
        );
    }

    if (subscription.isCancelled) {
        return (
            <div className="cap-max-w-[40%] cap-border cap-flex cap-flex-col cap-px-4 cap-py-4 cap-space-y-2">
                <span className="cap-text-gray-600 cap-font-semibold">
                    Your canceled subscription
                </span>
                <hr/>
                <div className="cap-flex cap-flex-col cap-px-0">
                    <span className="cap-font-bold cap-text-xl">
                        {subscription.name} Package
                    </span>
                    <span className="cap-text-sm cap-text-gray-600">
                        {subscription.price} {subscription.symbol} per year
                    </span>
                </div>

                <button
                    type="button"
                    className="focus:cap-outline-none cap-text-white cap-bg-red-700 hover:cap-bg-red-800 focus:cap-ring-4 focus:cap-ring-red-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-red-600 dark:hover:cap-bg-red-700 dark:focus:cap-ring-red-900"
                    onClick={() => setShowConfirmationModal(true)}
                >
                    Renew my subscription
                </button>
            </div>
        );
    }

    return (
        <div className="cap-max-w-[40%] cap-border cap-flex cap-flex-col cap-px-4 cap-py-4 cap-space-y-2">
            <span className="cap-text-gray-600 cap-font-semibold">
                Your current subscription
            </span>
            <hr/>
            <div className="cap-flex cap-flex-col cap-px-0">
                <span className="cap-font-bold cap-text-xl">
                    {subscription.name} Package
                </span>
                <span className="cap-text-sm cap-text-gray-800">
                    {subscription.price} {subscription.symbol} per year
                </span>
            </div>

            <button
                type="button"
                className="focus:cap-outline-none cap-text-white cap-bg-red-700 hover:cap-bg-red-800 focus:cap-ring-4 focus:cap-ring-red-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-red-600 dark:hover:cap-bg-red-700 dark:focus:cap-ring-red-900"
                onClick={() => setShowConfirmationModal(true)}
            >
                Cancel my subscription
            </button>
        </div>
    );
};
