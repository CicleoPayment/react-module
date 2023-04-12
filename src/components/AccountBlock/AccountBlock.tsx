import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import "./AccountBlock.css";
import TextWhite from "@assets/logo_text_white.svg";
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
import SubscriptionPart from "./SubscriptionPart";
import ApprovalPart from "./ApprovalPart";
import SubscriptionInfo from "./SubscriptionInfo";
import EditApprovalModal from "./EditApprovalModal";
import ChangeTokenModal from "./ChangeTokenModal";

axios.defaults.withCredentials = true;

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
    tokenApproval: BigNumber;
};

let domain = "";
let origin = "";
if (typeof window !== "undefined") {
    domain = window.location.host;
    origin = window.location.origin;
}

const BACKEND_ADDR = "https://backend-test.cicleo.io";

async function createSiweMessage(address: string, statement: any) {
    const res = await axios.get(`${BACKEND_ADDR}/nonce`, {
        withCredentials: true,
    });

    let nonce = res.data.nonce;

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

    const res = await axios.post(
        `${BACKEND_ADDR}/verify`,
        { message, signature },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );

    const json = res.data;
    return json;
}

type AccountModalContent = {
    isWrongNetwork: boolean;
    isLoaded: boolean;
    isNotSubscribed: boolean;
    account: string;
    subManager: any;
    subscription: any;
    errorMessage: string;
};

const AccountModalContent: FC<AccountModalContent> = ({
    isWrongNetwork,
    isLoaded,
    isNotSubscribed,
    account,
    subManager,
    subscription,
    errorMessage,
}) => {
    if (isWrongNetwork)
        return (
            <div className="cap-p-4">
                <div className="cap-alert cap-alert-error cap-shadow-lg">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="cap-stroke-current cap-flex-shrink-0 cap-h-6 cap-w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Sorry but this network is unsuported</span>
                    </div>
                </div>
            </div>
        );
    
    if (isNotSubscribed)
        return (
            <div className="cap-p-4">
                <div className="cap-shadow-lg cap-alert cap-alert-warning">
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
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <div className="cap-flex cap-flex-col">
                            <span>You currently dont have an subscription</span>
                            <span>Close this page and click on "Pay with Cicleo" button to get started !</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        );

    if (isLoaded == false)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20 cap-flex-col cap-space-y-4">
                <span className="cap-font-medium cap-text-2xl ">
                    Getting your membership information...
                </span>
                <progress className="cap-w-56 cap-progress"></progress>
            </div>
        );

    const endCycleDate = new Date(subscription.subscriptionEndDate * 1000);

    return (
        <>
            <div className="cap-flex cap-w-full cap-justify-between cap-items-center cap-px-5 cap-leading-[1.2] cap-flex-row">
                <span className="cap-font-semibold cap-text-xl">
                    Manage your account
                </span>
                <span className="cap-font-semibold cap-text-tiny cap-text-gray-600">
                    {reduceAddress(account)}
                </span>
            </div>

            <div className="cap-divider !cap-mb-0"></div>

            {subscription.id == 0 ? (
                <div className="cap-p-4">
                    <div className="cap-shadow-lg cap-alert cap-alert-warning">
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
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <p>
                                You dont have any subscription. <br />
                                Return on the DApp to subscribe and so be able
                                to manage your subscription here
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="cap-flex">
                    <SubscriptionPart
                        subscription={subscription}
                        symbol={subManager.tokenSymbol}
                    />

                    <div className="cap-divider cap-divider-horizontal"></div>

                    <ApprovalPart subManager={subManager} subscription={subscription} />

                    <div className="cap-divider cap-divider-horizontal"></div>

                    <SubscriptionInfo endCycleDate={endCycleDate} />
                </div>
            )}
        </>
    );
};

type AccountBlock = {
    config: { [key: number]: number };
    signer: ethers.providers.JsonRpcSigner | undefined;
};

const AccountBlock: FC<AccountBlock> = ({ config, signer }) => {
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [subManager, setSubManager] = useState({} as SubManagerInfo);
    const [subscription, setSubscription] = useState({
        id: 0,
        name: "",
        price: "0",
        isCancelled: false,
        isContractActive: false,
        userTokenAddress: "",
        userTokenSymbol: "",
    });
    const [account, setAccount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTxSend, setIsTxSend] = useState(false);
    const [isNotSubscribed, setIsNotSubscribed] = useState(false);

    const createContracts = async () => {
        setIsLoaded(false);
        setIsWrongNetwork(false);

        if (!signer) return;

        try {
            const { chainId } = await signer.provider.getNetwork();

            const address = await signer.getAddress();

            setAccount(address);

            const subManagerId = config[chainId];

            if (!(await isGoodNetwork(chainId)) || subManagerId == undefined) {
                setIsWrongNetwork(true);
                console.log("Wrong network");
                return;
            }

            const subscriptionRouterContract =
                await Contracts.SubscriptionRouter(signer);
            if (subscriptionRouterContract == null) return;

            // @ts-ignore
            try {
                let _subManagerInfo =
                    await subscriptionRouterContract.getSubscriptionManager(
                        subManagerId
                    );
                

                const _subManagerContract = await Contracts.SubscriptionManager(
                    signer,
                    _subManagerInfo._address
                );

                const userInfo = await _subManagerContract.users(address);
                
                const res = await fetch(
                    `${BACKEND_ADDR}/chain/${chainId}/subscription/${_subManagerInfo.id}/${address}`,
                    {
                        credentials: "same-origin",
                    }
                );

                const _resJson = await res.json();

                if (_resJson.tokenPaymentAddress == undefined) { 
                    console.log('okje')
                    setIsNotSubscribed(true);
                    return
                }

                const erc20 = await Contracts.ERC20(signer, _resJson.tokenPaymentAddress.toLowerCase(), true);
                const allowance = await erc20.allowance(
                    address,
                    _subManagerInfo._address
                );
                
                setSubManager({
                    id: Number(subManagerId),
                    address: _subManagerInfo._address,
                    name: _subManagerInfo.name,
                    owner: _subManagerInfo.owners[0],
                    decimals: Number(_subManagerInfo.tokenDecimals),
                    tokenAddress: _subManagerInfo.tokenAddress,
                    treasury: _subManagerInfo.treasury,
                    tokenSymbol: _subManagerInfo.tokenSymbol,
                    subscriptions: _subManagerInfo.subscriptions,
                    allowance: userInfo.subscriptionLimit,
                    tokenApproval: allowance,
                });

                const subscriptionData = await _subManagerContract.getUserSubscriptionStatus(
                    address
                );

                const sub = await subscriptionRouterContract.subscriptions(
                    Number(subManagerId),
                    subscriptionData.subscriptionId
                );

                let _subscription = {
                    id: subscriptionData.subscriptionId,
                    isActive: sub.isActive,
                    name: sub.name,
                    price: ethers.utils.formatUnits(sub.price, Number(_subManagerInfo.tokenDecimals)),
                    isCancelled:
                        !subscriptionData.isActive || _resJson.isCanceled,
                    isContractActive: subscriptionData.isActive,
                    subscriptionEndDate:
                        userInfo.subscriptionEndDate.toNumber(),
                    originalPrice: sub.price,
                    userTokenAddress: _resJson.tokenPaymentAddress.toLowerCase(),
                    userTokenSymbol: _resJson.tokenPaymentSymbol,
                    
                };

                setIsLoaded(true);
                setSubscription(_subscription);
            } catch (e) {
                console.log(e);
                setIsWrongNetwork(true);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    const unsubscribe = async () => {
        if (!signer) return;
        await signInWithEthereum(signer);
        const { chainId } = await signer.provider.getNetwork();

        await axios.post(
            `${BACKEND_ADDR}/chain/${chainId}/subscription/${subManager.address}/cancel`,
            {},
            {
                withCredentials: true,
            }
        );

        await createContracts();
    };

    const renew = async () => {
        if (!signer) return;
        await signInWithEthereum(signer);
        const { chainId } = await signer.provider.getNetwork();

        await axios.post(
            `${BACKEND_ADDR}/chain/${chainId}/subscription/${subManager.address}/renew`,
            {},
            {
                withCredentials: true,
            }
        );

        await createContracts();
    };

    const changeToken = async (tokenAddress: string, tokenSymbol: string) => {
        if (!signer) return;
        await signInWithEthereum(signer);
        const { chainId } = await signer.provider.getNetwork();

        await axios.post(
            `${BACKEND_ADDR}/chain/${chainId}/subscription/${subManager.address}/changeCoin`,
            {
                tokenPaymentAddress: tokenAddress,
                tokenPaymentSymbol: tokenSymbol,
            },
            {
                withCredentials: true,
            }
        );

        await createContracts();
    };

    useEffect(() => {
        createContracts();
    }, [signer]);

    const handleApproveToken = async (amountToApprove: BigNumber) => {
        if (!signer) return;
        setIsTxSend(false);
        setIsLoading(true);

        const erc20 = await Contracts.ERC20(
            signer,
            subscription.userTokenAddress,
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
        document.getElementById("cicleo-edit-approval-token")?.click();
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
            () => _subManager.changeSubscriptionLimit(amountToApprove),
            "Approve Subscription",
            () => {
                setIsTxSend(true);
            }
        );
        setIsTxSend(false);
        document.getElementById("cicleo-edit-approval-subscription")?.click();
        setIsLoading(false);
        createContracts();
    };

    const renewSubscription = async (subscriptionId: number) => {
        if (!signer) return;
        setIsTxSend(false);
        setIsLoading(true);

        const _subManager = await Contracts.SubscriptionManager(
            signer,
            subManager.address,
            true
        );

        await doTx(
            () => _subManager.payment(subscriptionId),
            "Renew Subscription",
            () => {
                setIsTxSend(true);
            }
        );
        setIsTxSend(false);
        setShowConfirmationModal(false);
        setIsLoading(false);
        createContracts();
    };

    const handleConfirmationPage = () => {
        if (subscription.isCancelled) {
            if (subscription.isContractActive == false) {
                return (
                    <ConfirmationModal
                        name="renew"
                        confirmationMessageHeader={`Are you sure about restarting your subscription?`}
                        confirmationMessage={`You will have to pay subscription price since your subscription expired.`}
                        onConfirm={() => renewSubscription(subscription.id)}
                    />
                );
            }

            return (
                <ConfirmationModal
                    name="renew"
                    confirmationMessageHeader={`Are you sure about restarting your subscription?`}
                    confirmationMessage={`Your subscription will be renewed the next cycle.`}
                    onConfirm={renew}
                />
            );
        }

        return (
            <ConfirmationModal
                name="cancel"
                confirmationMessageHeader={`Are you sure about cancelling your subscription?`}
                confirmationMessage={`You will still be able to use the service until the end of the current billing period.`}
                onConfirm={unsubscribe}
            />
        );
    };

    return (
        <>
            <label
                htmlFor="cicleo-account-modal"
                className="cap-btn cap-btn-primary cap-max-w-[300px] cap-flex cap-justify-center "
            >
                <div className="cap-flex cap-items-center cap-justify-center cap-capitalize cap-text-xl cap-text-white">
                    <span>Manage your Account</span>
                </div>
            </label>

            <input
                type="checkbox"
                id="cicleo-account-modal"
                className="cap-modal-toggle"
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle !cap-ml-0">
                <div className="cap-modal-box cap-relative cap-p-0 cap-w-full !cap-max-w-3xl">
                    <div className="cap-mb-4 cap-px-4 cap-py-3 cap-bg-base-300">
                        <img src={TextWhite} alt="" className="cap-h-10" />
                    </div>
                    <label
                        htmlFor="cicleo-account-modal"
                        className="cap-absolute cap-btn cap-btn-sm cap-btn-circle cap-right-2 cap-top-2"
                    >
                        ✕
                    </label>

                    <AccountModalContent
                        isWrongNetwork={isWrongNetwork}
                        isLoaded={isLoaded}
                        isNotSubscribed={isNotSubscribed}
                        account={account}
                        subManager={subManager}
                        subscription={subscription}
                        errorMessage={errorMessage}
                    />
                </div>
            </div>
            {handleConfirmationPage()}
            <EditApprovalModal
                name="token"
                labelTextInput={subManager.tokenSymbol}
                onConfirm={handleApproveToken}
                messageHeader={`Edit your ${subManager.tokenSymbol} approval`}
                messageInfo={`You can edit the total amount of ${subManager.tokenSymbol} that we can withdraw from your wallet. This total amount will decrease over time as each payment for your subscription is withdrawn from your wallet in the appropriate installments.`}
                textInput={`Amount of ${subManager.tokenSymbol} to approve`}
                decimals={subManager.decimals}
                isLoading={isLoading}
                isTxSend={isTxSend}
                approval={subManager.tokenApproval}
            />
            <EditApprovalModal
                name="subscription"
                labelTextInput={`${subManager.tokenSymbol} / Month`}
                onConfirm={handleApproveSubscribe}
                messageHeader={`Edit your monthly approval`}
                messageInfo={`You can edit the maximum amount of ${subManager.tokenSymbol} that we can withdraw from your wallet per payment cycle. This protects you from paying any additional costs if your subscription manager raises the subscription price without your signed consent.`}
                textInput={`Amount of ${subManager.tokenSymbol} to approve`}
                decimals={subManager.decimals}
                isLoading={isLoading}
                isTxSend={isTxSend}
                approval={subManager.allowance}
            />
            <ChangeTokenModal
                address={account}
                subManager={subManager}
                subscription={subscription}
                changeToken={changeToken}
            />
        </>
    );
};

export default AccountBlock;
