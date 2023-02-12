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
import { SiweMessage } from "siwe";
import axios from "axios";

type PaymentButton = {
    subManagerId: number;
    signer: ethers.providers.JsonRpcSigner | undefined;
};
let domain = "";
let origin = "";
if (typeof window !== "undefined") {
    domain = window.location.host;
    origin = window.location.origin;
}

const BACKEND_ADDR = "https://cicleo-backend.vercel.app";

async function createSiweMessage(address: string, statement: any) {
    const res = await fetch(`${BACKEND_ADDR}/nonce`, {
        credentials: "include",
    });

    let nonce = await res.text();

    console.log(nonce);

    const message = new SiweMessage({
        domain,
        address,
        statement,
        uri: origin,
        version: "1",
        chainId: 1,
        nonce: nonce,
    });
    return message.prepareMessage();
}

async function signInWithEthereum(signer: ethers.providers.JsonRpcSigner) {
    const message = await createSiweMessage(
        await signer.getAddress(),
        "Sign in with Ethereum to the app."
    );
    const signature = await signer.signMessage(message);

    const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
        credentials: "include",
    });

    const json = await res.text();
    return json;
}

const AccountBlock: FC<PaymentButton> = ({ subManagerId, signer }) => {
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [showModalSubscription, setShowModalSubscription] = useState(false);
    const [showModalTokenApprove, setShowModalTokenApprove] = useState(false);
    const [showModalSubApprove, setShowModalSubApprove] = useState(false);
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
    const [isLoading, setIsLoading] = useState(false);
    const [isTxSend, setIsTxSend] = useState(false);

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

            const res = await fetch(`${BACKEND_ADDR}/subscription/${address}`, {
                credentials: "include",
            });

            const _resJson = await res.json();

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
                isCancelled: !subscriptionData.isActive || _resJson.isCanceled,
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

    const unsubscribe = async () => {
        await signInWithEthereum(signer!);

        await fetch(`${BACKEND_ADDR}/subscription/cancel`, {
            method: "POST",
            credentials: "include",
        });

        await createContracts();
    };

    useEffect(() => {
        createContracts();
    }, [signer]);

    const handleClick = () => {
        setShowModalSubscription(true);
    };

    const handleClose = () => {
        setShowModalSubscription(false);
    };

    const handleApproveToken = async (amountToApprove: BigNumber) => {
        if (!signer) return;
        setIsTxSend(false);
        setIsLoading(true);

        const erc20 = await Contracts.ERC20(
            signer,
            subManager.coinAddress,
            true
        );

        await doTx(
            () => erc20.approve(subManager.address, amountToApprove),
            "Approve ERC20",
            () => {
                setIsTxSend(true);
            }
        );
        setIsTxSend(false);
        setShowModalTokenApprove(false);
        setIsLoading(false);
        createContracts();
    };

    const handleApproveSubscribe = async (amountToApprove: BigNumber) => {
        if (!signer) return;
        setIsTxSend(false);
        setIsLoading(true);

        const _subManager = await Contracts.SubscriptionManager(
            signer,
            subManager.address,
            true
        );

        await doTx(
            () => _subManager.approveSubscription(amountToApprove),
            "Approve Subscription",
            () => {
                setIsTxSend(true);
            }
        );
        setIsTxSend(false);
        setShowModalSubApprove(false);
        setIsLoading(false);
        createContracts();
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

            <Modal show={showModalSubscription} onClose={handleClose}>
                <AccountModalContent
                    isWrongNetwork={isWrongNetwork}
                    isLoaded={isLoaded}
                    account={account}
                    setShowConfirmationModal={setShowConfirmationModal}
                    setShowModalTokenApprove={setShowModalTokenApprove}
                    setShowModalSubApprove={setShowModalSubApprove}
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

            <EditApproval
                show={showModalTokenApprove}
                onClose={() => setShowModalTokenApprove(false)}
                onConfirm={handleApproveToken}
                messageHeader={`Edit your ${subManager.coinSymbol} approval`}
                messageInfo={`You can edit the total amount of ${subManager.coinSymbol} that we can withdraw from your wallet. This total amount will decrease over time as each payment for your subscription is withdrawn from your wallet in the appropriate installments.`}
                textInput={`Amount of ${subManager.coinSymbol} to approve`}
                decimals={subManager.coinDecimals}
                isLoading={isLoading}
                isTxSend={isTxSend}
                approval={subManager.tokenApproval}
            />

            <EditApproval
                show={showModalSubApprove}
                onClose={() => setShowModalSubApprove(false)}
                onConfirm={handleApproveSubscribe}
                messageHeader={`Edit your monthly approval`}
                messageInfo={`You can edit the maximum amount of ${subManager.coinSymbol} that we can withdraw from your wallet per payment cycle. This protects you from paying any additional costs if your subscription manager raises the subscription price without your signed consent.`}
                textInput={`Amount of ${subManager.coinSymbol} to approve`}
                decimals={subManager.coinDecimals}
                isLoading={isLoading}
                isTxSend={isTxSend}
                approval={subManager.subApproval}
            />
        </>
    );
};

export default AccountBlock;

type Modal = {
    children: JSX.Element;
    show: boolean;
    onClose: () => void;
    isLoading?: boolean;
};

const Modal: FC<Modal> = ({ children, show, onClose, isLoading }) => {
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
    setShowModalTokenApprove: (show: boolean) => void;
    setShowModalSubApprove: (show: boolean) => void;
    subManager: subManager;
    subscription: any;
    errorMessage: string;
};

const AccountModalContent: FC<AccountModalContent> = ({
    isWrongNetwork,
    isLoaded,
    account,
    setShowConfirmationModal,
    setShowModalTokenApprove,
    setShowModalSubApprove,
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
                        <hr />
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
                                onClick={() => setShowModalTokenApprove(true)}
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
                                onClick={() => setShowModalSubApprove(true)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className="cap-p-4 cap-space-y-3 cap-border cap-flex-grow">
                        <span className="cap-text-gray-600 cap-font-semibold">
                            Subscription Info
                        </span>
                        <hr />
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
    if (subscription.isCancelled) {
        return (
            <div className="cap-max-w-[40%] cap-border cap-flex cap-flex-col cap-px-4 cap-py-4 cap-space-y-2">
                <span className="cap-text-gray-600 cap-font-semibold">
                    Your canceled subscription
                </span>
                <hr />
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
            <hr />
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

type EditApproval = {
    show: boolean;
    onClose: () => void;
    messageHeader: string;
    messageInfo: string;
    textInput: string;
    onConfirm: (approveAmount: BigNumber) => void;
    decimals: number;
    isLoading: boolean;
    isTxSend: boolean;
    approval: BigNumber;
};

const EditApproval: FC<EditApproval> = ({
    show,
    onClose,
    messageHeader,
    messageInfo,
    textInput,
    onConfirm,
    decimals,
    isLoading,
    isTxSend,
    approval,
}) => {
    const [isInifity, setIsInifity] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const form = e.currentTarget;
        const values = Object.fromEntries(new FormData(form));

        console.log(values);

        let approveAmount = ethers.constants.MaxUint256;

        if (values.approveAmount != undefined) {
            approveAmount = ethers.utils.parseUnits(
                values.approveAmount as string,
                decimals
            );
        }

        onConfirm(approveAmount);
    };

    const toggleInifity = (e: any) => {
        setIsInifity(e.target.checked);
    };

    const getDefaultValueInput = () => {
        if (approval.eq(ethers.constants.MaxUint256)) return "1";
        if (approval) return ethers.utils.formatUnits(approval, decimals);
    };

    useEffect(() => {
        if (approval == undefined) return;
        if (approval.eq(ethers.constants.MaxUint256)) {
            console.log("is inifity");
            setIsInifity(true);
        }
    }, [approval]);

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
                    <form action="" onSubmit={handleSubmit}>
                        {/* <!-- Modal header --> */}
                        <div className="cap-flex cap-items-start cap-justify-between cap-p-4 cap-border-b cap-rounded-t dark:cap-border-gray-600">
                            <div className="cap-flex cap-items-center cap-w-full cap-space-x-4">
                                <img
                                    src={LogoBlue}
                                    alt=""
                                    className="cap-max-h-10"
                                />
                                <h3 className="cap-text-xl cap-font-semibold cap-text-gray-900 dark:cap-text-white">
                                    Ciclo Payment | Change Approval
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

                        <div className="cap-flex cap-w-full cap-justify-between cap-space-y-4 cap-py-4 cap-px-5 cap-leading-[1.2] cap-flex-col">
                            <span className="cap-font-bold cap-text-2xl">
                                {messageHeader}
                            </span>

                            <span className="cap-font-semibold cap-text-xl">
                                {messageInfo}
                            </span>

                            <hr className="mb-6" />

                            <div className="cap-flex cap-space-x-5">
                                <div className="cap-flex-grow">
                                    <div className="cap-mb-6 ">
                                        <label
                                            htmlFor="approveAmount"
                                            className={`cap-block cap-mb-2 cap-text-sm cap-font-medium cap-text-gray-900 dark:cap-text-white ${
                                                isInifity && "cap-text-gray-400"
                                            }`}
                                        >
                                            {textInput}
                                        </label>
                                        <input
                                            type="number"
                                            id="approveAmount"
                                            className={`cap-bg-gray-50 cap-border cap-border-gray-300 cap-text-gray-900 cap-text-sm cap-rounded-lg focus:cap-ring-blue-500 focus:cap-border-blue-500 cap-block cap-w-full cap-p-2.5 dark:cap-bg-gray-700 dark:cap-border-gray-600 dark:cap-placeholder-gray-400 dark:cap-text-white dark:focus:cap-ring-blue-500 dark:focus:cap-border-blue-500 ${
                                                isInifity &&
                                                "cap-text-gray-200 dark:cap-bg-gray-600"
                                            }`}
                                            placeholder="50"
                                            name="approveAmount"
                                            required={!isInifity}
                                            min={0}
                                            disabled={isInifity}
                                            defaultValue={getDefaultValueInput()}
                                        />
                                    </div>
                                </div>

                                <div className="cap-h-20 cap-w- cap-border-r cap-border-[#E5E7EB]" />

                                <div className="cap-flex-grow cap-flex cap-items-center cap-justify-center">
                                    <div className="cap-flex cap-items-center cap-mb-4 ">
                                        <input
                                            id="infinity-checkbox"
                                            type="checkbox"
                                            name="infinity-checkbox"
                                            onChange={toggleInifity}
                                            checked={isInifity}
                                            className="cap-w-4 cap-h-4 cap-disabled cap-text-blue-600 cap-bg-gray-100 cap-border-gray-300 cap-rounded focus:cap-ring-blue-500 dark:focus:cap-ring-blue-600 dark:cap-ring-offset-gray-800 focus:cap-ring-2 dark:cap-bg-gray-700 dark:cap-border-gray-600"
                                        />
                                        <label
                                            htmlFor="infinity-checkbox"
                                            className="cap-ml-2 cap-text-sm cap-font-medium cap-text-gray-900 dark:cap-text-gray-300"
                                        >
                                            Should be Illimited
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className="cap-flex cap-items-center cap-p-6 cap-space-x-2 cap-border-t cap-border-gray-200 cap-rounded-b dark:cap-border-gray-600">
                            <button
                                data-modal-hide="defaultModal"
                                type="submit"
                                className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-text-center dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 dark:focus:cap-ring-blue-800"
                            >
                                {isLoading ? (
                                    <>
                                        {isTxSend
                                            ? "Sending..."
                                            : "Waiting for confirmation..."}
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                            <button
                                data-modal-hide="defaultModal"
                                type="button"
                                className="cap-text-gray-500 cap-bg-white hover:cap-bg-gray-100 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-rounded-lg cap-border cap-border-gray-200 cap-text-sm cap-font-medium cap-px-5 cap-py-2.5 hover:cap-text-gray-900 focus:cap-z-10 dark:cap-bg-gray-700 dark:cap-text-gray-300 dark:cap-border-gray-500 dark:hover:cap-text-white dark:hover:cap-bg-gray-600 dark:focus:cap-ring-gray-600"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
