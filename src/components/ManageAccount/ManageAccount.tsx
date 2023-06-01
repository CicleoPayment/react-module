import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers, Signer } from "ethers";
import "./ManageAccount.css";
import TextWhite from "@assets/logo_text_white.svg";
import { ConfirmationModal } from "../index";
import { reduceAddress } from "@context/contract";
import { SiweMessage } from "siwe";
import axios from "axios";
import {
    SubscriptionSettingsBlock,
    ApprovalBlock,
    SubscriptionInfoBlock,
    EditApproval,
    ChangeToken,
} from "./components";
import { LoadingState, Login } from "@components";
import {
    erc20ABI,
    readContract,
    createClient,
    prepareWriteContract,
    connect,
    InjectedConnector,
    writeContract,
    fetchSigner,
} from "@wagmi/core";
import { CicleoSubscriptionManager__factory } from "@context/Types";

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
    duration: number;
};

let domain = "";
let origin = "";
if (typeof window !== "undefined") {
    domain = window.location.host;
    origin = window.location.origin;
}

const BACKEND_ADDR = "https://backend-test.cicleo.io";

type Network = {
    name: string;
    rpcUrls: string;
    image: string;
};

type NetworkList = {
    [key: number]: Network;
};

let _chains: NetworkList = {
    250: {
        name: "Fantom",
        rpcUrls: "https://rpc.ftm.tools/",
        image: "https://cryptologos.cc/logos/fantom-ftm-logo.png?v=013",
    },
    137: {
        name: "Polygon",
        rpcUrls: "https://rpc-mainnet.maticvigil.com/",
        image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=013",
    },
};

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

type ManageAccount = {
    isWrongNetwork: boolean;
    isLoaded: boolean;
    account: string;
    subManager: any;
    subscription: any;
    errorMessage: string;
    setIsWrongNetwork: (value: boolean) => void;
};

const ManageAccount: FC<ManageAccount> = ({
    isWrongNetwork,
    isLoaded,
    account,
    subManager,
    subscription,
    errorMessage,
    setIsWrongNetwork,
}) => {
    if (isWrongNetwork)
        return (
            <div className="cap-p-4 cap-space-y-4">
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
                        <span>Sorry but you use another network to pay</span>
                    </div>
                </div>
                <div className="cap-w-full cap-flex cap-items-center cap-justify-center cap-z-30">
                    <button
                        className="cap-btn cap-btn-primary"
                        onClick={async () => {
                            const resp = await connect({
                                connector: new InjectedConnector(),
                                chainId: subscription.paymentChain,
                            });

                            if (resp) {
                                setIsWrongNetwork(false);
                            }
                        }}
                    >
                        Change network
                    </button>
                </div>
            </div>
        );

    if (isLoaded == false)
        return <LoadingState text="Getting your membership information..." />;

    if (subscription.subscriptionEndDate < Date.now() / 1000)
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
                            <span>
                                You currently dont have an active subscription
                            </span>
                            <span>
                                Close this page and click on "Pay with Cicleo"
                                button to get started !
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );

    if (subscription.id == 0)
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
                            <span>
                                Close this page and click on "Pay with Cicleo"
                                button to get started !
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );

    const endCycleDate = new Date(subscription.subscriptionEndDate * 1000);

    return (
        <>
            <div className="cap-flex cap-w-full cap-justify-between cap-items-center cap-px-5 cap-leading-[1.2] cap-flex-row">
                <span className="cap-font-semibold cap-text-xl">
                    Manage your account
                </span>

                <div className="cap-items-center cap-justify-center cap-space-x-4 cap-flex cap-flex-row">
                    <span className="cap-font-semibold cap-text-tiny cap-text-gray-600">
                        {reduceAddress(account)}
                    </span>

                    {subscription.paymentChain != 0 && (
                        <div className="cap-w-8 cap-h-8">
                            <img
                                src={_chains[subscription.paymentChain].image}
                                alt=""
                            />
                        </div>
                    )}
                </div>
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
                <div className="cap-px-4 cap-flex">
                    <SubscriptionSettingsBlock
                        subscription={subscription}
                        symbol={subManager.tokenSymbol}
                        duration={subManager.duration}
                    />

                    <div className="cap-divider cap-divider-horizontal"></div>

                    <ApprovalBlock
                        subManager={subManager}
                        subscription={subscription}
                    />

                    {subscription.isCancelled == false && (
                        <>
                            <div className="cap-divider cap-divider-horizontal"></div>
                            <SubscriptionInfoBlock
                                endCycleDate={endCycleDate}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

type AccountBlock = {
    chainId: number;
    subManagerId: number;
};

const AccountBlock: FC<AccountBlock> = ({ chainId, subManagerId }) => {
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
        userTokenDecimals: 0,
    });
    const [account, setAccount] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTxSend, setIsTxSend] = useState(false);
    const [currentChainId, setCurrentChainId] = useState(0);

    const getInfo = async () => {
        if (account == undefined) return;
        const subscriptionInfo = await axios.get(
            `https://backend-test.cicleo.io/chain/${chainId}/getUserStatusInfo/${subManagerId}/${account}`
        );

        console.log(subscriptionInfo.data);

        let _subManager = subscriptionInfo.data.subManager as SubManagerInfo;

        //Verify if user is subscribed
        if (_subManager.allowance != undefined) {
            _subManager.allowance = BigNumber.from(_subManager.allowance);
            _subManager.tokenApproval = BigNumber.from(
                _subManager.tokenApproval
            );

            if (
                subscriptionInfo.data.subscription.paymentChain !=
                currentChainId
            ) {
                setIsWrongNetwork(true);
            } else {
            }
        }

        console.log(_subManager);
        setSubManager(_subManager);
        setSubscription(subscriptionInfo.data.subscription);

        setIsLoaded(true);
    };

    const signer = "";

    const unsubscribe = async () => {
        const signer = (await fetchSigner()) as ethers.providers.JsonRpcSigner;
        await signInWithEthereum(signer);

        await axios.post(
            `${BACKEND_ADDR}/chain/${chainId}/subscription/${subManager.id}/cancel`,
            {},
            {
                withCredentials: true,
            }
        );

        await getInfo();
    };

    const renew = async () => {
        const signer = (await fetchSigner()) as ethers.providers.JsonRpcSigner;
        await signInWithEthereum(signer);

        await axios.post(
            `${BACKEND_ADDR}/chain/${chainId}/subscription/${subManager.id}/renew`,
            {},
            {
                withCredentials: true,
            }
        );

        await getInfo();
    };

    const changeToken = async (tokenAddress: string, tokenSymbol: string) => {
        const signer = (await fetchSigner()) as ethers.providers.JsonRpcSigner;
        await signInWithEthereum(signer);

        await axios.post(
            `${BACKEND_ADDR}/chain/${chainId}/subscription/${subManager.id}/changeCoin`,
            {
                tokenPaymentAddress: tokenAddress,
                tokenPaymentSymbol: tokenSymbol,
            },
            {
                withCredentials: true,
            }
        );

        await getInfo();
    };

    const handleApproveToken = async (amountToApprove: BigNumber) => {
        setIsTxSend(false);
        setIsLoading(true);

        console.log("heifji");

        console.log(await fetchSigner());

        try {
            console.log(amountToApprove);
            console.log(subscription.userTokenAddress);
            const config = await prepareWriteContract({
                //@ts-ignore
                address: subscription.userTokenAddress,
                abi: erc20ABI,
                functionName: "approve",
                //@ts-ignore
                args: [subManager.address, amountToApprove],
            });

            const { hash, wait } = await writeContract(config);

            console.log("jdruh");

            setIsTxSend(true);

            await wait();
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.message);
        }

        setIsTxSend(false);
        document.getElementById("cicleo-edit-approval-token")?.click();
        setIsLoading(false);
        getInfo();
    };

    const handleApproveSubscribe = async (amountToApprove: BigNumber) => {
        setIsTxSend(false);
        setIsLoading(true);

        try {
            const { hash, wait } = await writeContract({
                //@ts-ignore
                address: subscription.userTokenAddress,
                abi: CicleoSubscriptionManager__factory.abi,
                functionName: "changeSubscriptionLimit",
                args: [amountToApprove],
            });

            setIsTxSend(true);

            await wait();
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.message);
        }

        setIsTxSend(false);
        document.getElementById("cicleo-edit-approval-subscription")?.click();
        setIsLoading(false);
        getInfo();
    };

    useEffect(() => {
        getInfo();
    }, [account]);

    const handleConfirmationPage = () => {
        if (subscription.isCancelled) {
            if (subscription.isContractActive == false) {
                return <></>;
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

                    {account == null ? (
                        <Login
                            handleSelectAccount={(address, chainId) => {
                                setAccount(address);
                                setCurrentChainId(chainId);
                            }}
                        />
                    ) : (
                        <ManageAccount
                            isWrongNetwork={isWrongNetwork}
                            isLoaded={isLoaded}
                            account={account || ""}
                            subManager={subManager}
                            subscription={subscription}
                            errorMessage={errorMessage}
                            setIsWrongNetwork={setIsWrongNetwork}
                        />
                    )}
                </div>
            </div>
            {handleConfirmationPage()}
            <EditApproval
                name="token"
                labelTextInput={subscription.userTokenSymbol}
                onConfirm={handleApproveToken}
                messageHeader={`Edit your ${subscription.userTokenSymbol} approval`}
                messageInfo={`You can edit the total amount of ${subscription.userTokenSymbol} that we can withdraw from your wallet. This total amount will decrease over time as each payment for your subscription is withdrawn from your wallet in the appropriate installments.\nFor MetaMask users please click on "Use Default" when token approval modal appeard`}
                textInput={`Amount of ${subscription.userTokenSymbol} to approve`}
                decimals={subscription.userTokenDecimals}
                isLoading={isLoading}
                isTxSend={isTxSend}
                approval={subManager.tokenApproval}
            />
            <EditApproval
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
            <ChangeToken
                address={account || ""}
                subManager={subManager}
                subscription={subscription}
                changeToken={changeToken}
            />
        </>
    );
};

export default AccountBlock;
