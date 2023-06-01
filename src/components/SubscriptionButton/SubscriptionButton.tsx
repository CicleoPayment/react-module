import React, { useState, FC, useEffect } from "react";
import { BigNumber, Signer, ethers } from "ethers";
import "./SubscriptionButton.css";
import TextWhite from "@assets/logo_text_white.svg";
import PayImage from "@assets/pay.svg";
import {
    getConfig,
    doTx,
    reduceAddress,
    openOceanIface,
} from "@context/contract";
import {
    Payment,
    SelectCoin,
    SelectNetwork,
    HeaderSubscriptionInfo,
} from "./components";
import axios from "axios";
import {
    getNetwork,
    fetchSigner,
    getContract,
    readContract,
    erc20ABI,
    readContracts,
    signMessage,
    writeContract,
    getAccount,
} from "@wagmi/core";
import { Login, LoadingState } from "@components";
import {
    CicleoSubscriptionManager__factory,
    AmarokFacet__factory,
    StargateFacet__factory,
} from "@context/Types";
import { PaymentFacet__factory } from "@context/Types/factories/contracts/Subscription/Router/Facets";
import { BridgeFacet__factory } from "@context/Types/factories/contracts/Subscription/Bridge/Facets";

type SubscriptionButton = {
    subscriptionId: number;
    chainId: number;
    subManagerId: number;
    referral?: string;
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
    duration: number;
};

type Network = {
    name: string;
    chainId: number;
    rpcUrls: string;
    image: string;
};

type coin = {
    logo_url: string;
    symbol: string;
    id: string;
    balance: number;
    decimals: number;
    toPay: string;
    _bridgeData: any[];
    _swapData: any[];
    _stargateData: any[];
    _amarokData: any[];
    value: string;
};

let _chains: Network[] = [
    {
        name: "Fantom",
        chainId: 250,
        rpcUrls: "https://rpc.ftm.tools/",
        image: "https://cryptologos.cc/logos/fantom-ftm-logo.png?v=013",
    },
    {
        name: "Polygon",
        chainId: 137,
        rpcUrls: "https://rpc-mainnet.maticvigil.com/",
        image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=013",
    },
    {
        name: "Binance",
        chainId: 56,
        rpcUrls: "https://bsc-dataseed.binance.org/",
        image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=013",
    },
];

const SubscriptionButton: FC<SubscriptionButton> = ({
    subscriptionId,
    subManagerId,
    chainId,
    referral,
}) => {
    const [account, setAccount] = useState<string | null>(null);
    const [isBridged, setIsBridged] = useState(false);

    const [subscriptionInfoIsFetched, setSubscriptionInfoIsFetched] =
        useState(false);
    const [networkSelected, setNetworkSelected] = useState(false);

    const [userInfoLoaded, setUserInfoLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [subManager, setSubManager] = useState<SubManagerInfo>(
        {} as SubManagerInfo
    );
    const [swapInfo, setSwapInfo] = useState<any>(null);
    const [coin, setCoin] = useState<coin>({} as coin);
    const [coinLists, setCoinLists] = useState([]);
    const [step, setStep] = useState(0);
    const [explorerLink, setExplorerLink] = useState("");
    const [subscription, setSubscription] = useState({
        id: subscriptionId,
        isActive: true,
        name: "",
        price: "0",
        originalPrice: BigNumber.from("0"),
        tokenSymbol: "",
        userPrice: "0",
        originalUserPrice: BigNumber.from("0"),
    });
    const [oldSubscription, setOldSubscription] = useState({
        id: 0,
        name: "",
        price: "0",
        isActive: false,
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [stepFunction, setStepFunction] = useState({
        1: (isInfinity: boolean, approvalToken: number) => {},
        2: (isInfinity: boolean, approvalSubscription: number) => {},
        3: () => {},
    });
    const [isPurchased, setIsPurchased] = useState(false);

    const [isInfinityToken, setIsInfinityToken] = useState(true);
    const [approvalToken, setApprovalToken] = useState(0);

    const [isInfinitySubscription, setIsInfinitySubscription] = useState(false);
    const [approvalSubscription, setApprovalSubscription] = useState(0);

    const changeToken = async (_coin: any) => {
        if (!account) return;

        setCoin(_coin);
    };

    const getSwap = async () => {
        console.log("Get swap");
        if (!coin) return;
        if (!account) return;
        if (coin.id == undefined) return;

        const { chain, chains } = getNetwork();
        if (!chain) return;
        const paymentChainId = chain.id;

        setStep(1);
        setIsLoaded(true);

        const config = await getConfig(paymentChainId);
        const router = config.subscriptionRouterAddress;
        const bridge = config.subscriptionBridgeAddress;

        setApprovalSubscription(
            Number(
                ethers.utils.formatUnits(
                    subscription.originalPrice,
                    subManager.decimals
                )
            )
        );

        const priceFormatted = Number(
            ethers.utils.formatUnits(
                subscription.originalPrice,
                subManager.decimals
            )
        );

        console.log(subscription.originalPrice);
        console.log(priceFormatted);

        if (isBridged) {
            setSwapInfo({
                inToken: {
                    address: coin.id,
                    symbol: coin.symbol,
                    decimals: coin.decimals,
                },
                inAmount: coin.toPay,
                outToken: {
                    address: subManager.tokenAddress,
                    symbol: subManager.tokenSymbol,
                    decimals: subManager.decimals,
                },
                outAmount: subscription.originalUserPrice.toString(),
            });

            const tokenApproval = await readContract({
                // @ts-ignore
                address: coin.id,
                abi: erc20ABI,
                functionName: "allowance",
                // @ts-ignore
                args: [account, bridge],
            });

            const users = (await readContract({
                // @ts-ignore
                address: bridge,
                abi: BridgeFacet__factory.abi,
                functionName: "users",
                // @ts-ignore
                args: [chainId, subManagerId, account],
            })) as any;

            const subApproval = users.subscriptionLimit as BigNumber;

            if (tokenApproval.gte(subscription.originalPrice)) {
                setStep(2);

                if (subApproval.gte(subscription.originalPrice)) {
                    setStep(3);
                }
            }

            setStepFunction({
                1: async (isInfinity, approval) => {
                    if (isInfinity == false) {
                        if (
                            approval <
                            Number(
                                ethers.utils.formatUnits(
                                    coin.toPay,
                                    coin.decimals
                                )
                            )
                        ) {
                            return setErrorMessage(
                                "You need to approve at least the subscription price"
                            );
                        }
                    }

                    try {
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: coin.id,
                            abi: erc20ABI,
                            functionName: "approve",
                            args: [
                                bridge,
                                isInfinity
                                    ? ethers.constants.MaxUint256
                                    : ethers.utils.parseUnits(
                                          approval.toString(),
                                          coin.decimals
                                      ),
                            ],
                        });

                        setLoadingStep(1);

                        await wait();

                        setErrorMessage("");
                        setStep(2);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }

                    if (subApproval.gte(coin.toPay)) {
                        setStep(3);
                    }
                },
                2: async (isInfinity, approval) => {
                    if (isInfinity == false) {
                        if (approval < priceFormatted) {
                            return setErrorMessage(
                                "You need to approve at least the subscription price"
                            );
                        }
                    }

                    try {
                        // @ts-ignore
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: bridge,
                            abi: BridgeFacet__factory.abi,
                            functionName: "changeSubscriptionLimit",
                            args: [
                                chainId,
                                subManagerId,
                                isInfinity
                                    ? ethers.constants.MaxUint256
                                    : ethers.utils.parseUnits(
                                          approval.toString(),
                                          subManager.decimals
                                      ),
                            ],
                        });

                        setLoadingStep(2);

                        await wait();

                        setErrorMessage("");
                        setStep(3);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }
                },
                3: async () => {
                    console.log("subscription.id != oldSubscription.id");
                    try {
                        const message = ethers.utils.toUtf8Bytes(
                            "Cicleo Bridged Subscription\n\n" +
                                "Chain: " +
                                chainId +
                                "\n" +
                                "User: " +
                                account.toLowerCase() +
                                "\n" +
                                "SubManager: " +
                                subManagerId +
                                "\n" +
                                "Subscription: " +
                                subscriptionId +
                                "\n" +
                                "Price: " +
                                subscription.originalUserPrice.toString() +
                                "\n" +
                                "Nonce: " +
                                0
                        );

                        let signature = await signMessage({
                            message: message,
                        });

                        function _adjustV(v: number): number {
                            if (v === 0) {
                                return 27;
                            } else if (v === 1) {
                                return 28;
                            } else {
                                return v;
                            }
                        }

                        const { v, r, s } =
                            ethers.utils.splitSignature(signature);
                        const adjustedV = _adjustV(v);
                        signature = ethers.utils.joinSignature({
                            r,
                            s,
                            v: adjustedV,
                        }) as any;

                        console.log(coin);

                        let tx: any;

                        if (coin._stargateData != undefined) {
                            console.log("STARGATE");
                            // @ts-ignore
                            const nativePrice = BigNumber.from(
                                coin._stargateData[3].hex
                            )
                                .mul(11)
                                .div(10);

                            let starGate: any = coin._stargateData;
                            starGate[3] = nativePrice.toString() as any;

                            const signer = await fetchSigner();

                            const _bridge = getContract({
                                address: bridge,
                                abi: StargateFacet__factory.abi,
                                signerOrProvider: signer as Signer,
                            });

                            tx =
                                await _bridge.payFunctionWithBridgeWithStargate(
                                    //@ts-ignore
                                    [
                                        BigNumber.from(chainId),
                                        BigNumber.from(subManagerId),
                                        subscriptionId,
                                        subscription.originalUserPrice.toString(),
                                        coin.id,
                                    ],
                                    coin._bridgeData,
                                    coin._swapData,
                                    starGate,
                                    referral != undefined
                                        ? referral
                                        : ethers.constants.AddressZero,
                                    subManager.duration,
                                    signature,
                                    { value: nativePrice }
                                );
                        } else if (coin._amarokData != undefined) {
                            console.log("AMAROK");

                            const nativePrice = BigNumber.from(
                                coin._amarokData[3].hex
                            );

                            const signer = await fetchSigner();

                            const _bridge = getContract({
                                address: bridge,
                                abi: AmarokFacet__factory.abi,
                                signerOrProvider: signer as Signer,
                            });

                            tx = await _bridge.payFunctionWithBridgeWithAmarok(
                                //@ts-ignore
                                [
                                    BigNumber.from(chainId),
                                    BigNumber.from(subManagerId),
                                    subscriptionId,
                                    subscription.originalUserPrice.toString(),
                                    coin.id,
                                ],
                                coin._bridgeData,
                                coin._swapData,
                                coin._amarokData,
                                referral != undefined
                                    ? referral
                                    : ethers.constants.AddressZero,
                                subManager.duration,
                                signature,
                                { value: coin.value }
                            );
                        }

                        setLoadingStep(3);

                        const transac = await tx.wait();

                        if (coin._stargateData != undefined) {
                            setExplorerLink(
                                `https://backend-test.cicelo.io/getlzlink/${transac.blockHash}`
                            );
                        } else if (coin._amarokData != undefined) {
                            setExplorerLink(
                                `https://connextscan.io/tx/${transac.blockHash}?src=search`
                            );
                        }

                        setErrorMessage("");
                        setIsPurchased(true);
                    } catch (error: any) {
                        console.log(error);

                        if (error.data && error.data.message) {
                            return setErrorMessage(error.data.message);
                        }
                        if (error.message) {
                            return setErrorMessage(error.message);
                        }

                        return;
                    }
                },
            });

            return;
        }

        console.log(coin.id);

        const resulat = await readContracts({
            contracts: [
                {
                    address: coin.id as `0x${string}`,
                    abi: erc20ABI,
                    functionName: "allowance",
                    // @ts-ignore
                    args: [account, subManager.address],
                },
                {
                    address: subManager.address as `0x${string}`,
                    abi: CicleoSubscriptionManager__factory.abi,
                    functionName: "users",
                    args: [account as `0x${string}`],
                },
            ],
        });

        const approval = resulat[0] as BigNumber;
        const users = resulat[1] as any;

        console.log(users);

        const subApproval = users.subscriptionLimit as BigNumber;

        if (approval.gte(ethers.utils.parseUnits(coin.toPay, coin.decimals))) {
            setStep(2);

            if (subApproval.gte(subscription.originalUserPrice)) {
                setStep(3);
            }

            console.log(subApproval);
        }

        //If same coin payment as submanager
        if (coin.id.toUpperCase() == subManager.tokenAddress.toUpperCase()) {
            setSwapInfo({
                inToken: {
                    address: subManager.tokenAddress,
                    symbol: subManager.tokenSymbol,
                    decimals: subManager.decimals,
                },
                inAmount: subscription.originalUserPrice.toString(),
                outToken: {
                    address: subManager.tokenAddress,
                    symbol: subManager.tokenSymbol,
                    decimals: subManager.decimals,
                },
                outAmount: subscription.originalUserPrice.toString(),
            });

            setStepFunction({
                1: async (isInfinity, approval) => {
                    if (isInfinity == false) {
                        if (approval < priceFormatted) {
                            return setErrorMessage(
                                "You need to approve at least the subscription price"
                            );
                        }
                    }

                    try {
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: coin.id,
                            abi: erc20ABI,
                            functionName: "approve",
                            args: [
                                subManager.address,
                                isInfinity
                                    ? ethers.constants.MaxUint256
                                    : ethers.utils.parseUnits(
                                          approval.toString(),
                                          coin.decimals
                                      ),
                            ],
                        });

                        setLoadingStep(1);

                        await wait();

                        setErrorMessage("");
                        setStep(2);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }

                    if (subApproval.gte(subscription.originalUserPrice)) {
                        setStep(3);
                    }
                },
                2: async (isInfinity, approval) => {
                    if (isInfinity == false) {
                        if (approval < priceFormatted) {
                            return setErrorMessage(
                                "You need to approve at least the subscription price"
                            );
                        }
                    }

                    try {
                        // @ts-ignore
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: subManager.address,
                            abi: CicleoSubscriptionManager__factory.abi,
                            functionName: "changeSubscriptionLimit",
                            // @ts-ignore
                            args: [
                                isInfinity
                                    ? ethers.constants.MaxUint256
                                    : ethers.utils.parseUnits(
                                          approval.toString(),
                                          subManager.decimals
                                      ),
                            ],
                        });

                        setLoadingStep(2);

                        await wait();

                        setErrorMessage("");
                        setStep(3);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }
                },
                3: async () => {
                    try {
                        // @ts-ignore
                        const { wait } = await writeContract({
                            // @ts-ignore
                            address: router,
                            abi: PaymentFacet__factory.abi,
                            functionName: "subscribe",
                            args: [
                                subManagerId,
                                subscriptionId,
                                referral != undefined
                                    ? referral
                                    : ethers.constants.AddressZero,
                            ],
                        });

                        setLoadingStep(3);

                        await wait();

                        setErrorMessage("");
                        setIsPurchased(true);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }
                },
            });

            //For swap things on same network
        } else {
            let data = JSON.stringify({
                tokenIn: coin.id,
                tokenOut: subManager.tokenAddress,
                price: subscription.originalUserPrice.toString(),
                fromAddress: subManager.address,
            });

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `https://backend-test.cicleo.io/chain/${chainId}/getExactPrice/`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            const resp = await axios(config);

            setSwapInfo(resp.data.data);

            setStepFunction({
                1: async (isInfinity: boolean, approval: number) => {
                    if (isInfinity == false) {
                        if (
                            approval <
                            Number(
                                ethers.utils.formatUnits(
                                    coin.toPay,
                                    coin.decimals
                                )
                            )
                        ) {
                            return setErrorMessage(
                                "You need to approve at least the subscription price"
                            );
                        }
                    }

                    try {
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: coin.id,
                            abi: erc20ABI,
                            functionName: "approve",
                            args: [
                                subManager.address,
                                isInfinity
                                    ? ethers.constants.MaxUint256
                                    : ethers.utils.parseUnits(
                                          approval.toString(),
                                          coin.decimals
                                      ),
                            ],
                        });

                        setLoadingStep(1);

                        await wait();
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }

                    if (subApproval.gte(subscription.originalUserPrice)) {
                        setStep(3);
                    }

                    setStep(2);
                },
                2: async (isInfinity: boolean, approval: number) => {
                    if (isInfinity == false) {
                        if (approval < priceFormatted) {
                            return setErrorMessage(
                                "You need to approve at least the subscription price"
                            );
                        }
                    }

                    try {
                        // @ts-ignore
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: subManager.address,
                            abi: CicleoSubscriptionManager__factory.abi,
                            functionName: "changeSubscriptionLimit",
                            args: [
                                isInfinity
                                    ? ethers.constants.MaxUint256
                                    : ethers.utils.parseUnits(
                                          approval.toString(),
                                          subManager.decimals
                                      ),
                            ],
                        });

                        setLoadingStep(2);

                        await wait();
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return;
                    }

                    setErrorMessage("");
                    setStep(3);
                },
                3: async () => {
                    try {
                        let decodedData = openOceanIface.parseTransaction({
                            data: resp.data.data.data,
                            value: resp.data.data.value,
                        });

                        console.log("decodeddata");
                        console.log(decodedData);

                        // @ts-ignore
                        const { wait } = writeContract({
                            // @ts-ignore
                            address: router,
                            abi: PaymentFacet__factory.abi,
                            functionName: "subscribeWithSwap",
                            args: [
                                subManagerId,
                                subscriptionId,
                                referral != undefined
                                    ? referral
                                    : ethers.constants.AddressZero,
                                decodedData.args.caller,
                                decodedData.args.desc,
                                decodedData.args.calls,
                            ],
                        });

                        setLoadingStep(3);

                        await wait();

                        setLoadingStep(0);
                        setIsPurchased(true);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        setStep(1);
                    }
                },
            });
        }
    };

    useEffect(() => {
        if (coin.id != undefined) {
            getSwap();
        }
    }, [coin]);

    //Function to fetch the subscription info from the backend
    //Called when modal is opened
    const fetchSubscriptionInfo = async () => {
        const subscriptionInfo = await axios.get(
            `https://backend-test.cicleo.io/chain/${chainId}/getSubscriptionInfo/${subManagerId}/${subscriptionId}`
        );

        console.log(subscriptionInfo.data);

        const _subManager = subscriptionInfo.data.subManager as SubManagerInfo;

        console.log(_subManager);
        setSubManager(_subManager);
        setSubscription(subscriptionInfo.data.subscription);

        setSubscriptionInfoIsFetched(true);
    };

    const getUserTokenList = async () => {
        const { chain, chains } = getNetwork();
        if (!chain) return;
        const sourceChainId = chain.id;

        const account = getAccount();
        const address = account.address;

        if (!address) return;

        const userInfo = await axios.get(
            `https://backend-test.cicleo.io/chain/${chainId}/getUserInfo/${subManagerId}/${subscriptionId}/${address}/${sourceChainId}`
        );

        setCoinLists(userInfo.data.coinList);
        setIsLoaded(true);
    };

    const getUserSub = async (address: string) => {
        console.log("Get user info");
        if (!address) return;

        const userInfo = await axios.get(
            `https://backend-test.cicleo.io/chain/${chainId}/getUserSub/${subManagerId}/${subscriptionId}/${address}/`
        );

        console.log(userInfo.data);

        setOldSubscription({
            id: userInfo.data.id,
            name: userInfo.data.name,
            price: ethers.utils.formatUnits(
                userInfo.data.price,
                subManager.decimals
            ),
            isActive: userInfo.data.isActive,
        });

        let _subscription = subscription;

        console.log(userInfo.data.userPrice);
        console.log(subManager);
        setSubscription({
            ..._subscription,
            originalUserPrice: BigNumber.from(userInfo.data.userPrice),
            userPrice: ethers.utils.formatUnits(
                userInfo.data.userPrice,
                subManager.decimals
            ),
        });

        setUserInfoLoaded(true);
    };

    useEffect(() => {
        if (account && subManager.decimals != null) {
            getUserSub(account);
        }
    }, [account, subManager]);

    useEffect(() => {
        if (networkSelected) {
            getUserTokenList();
        }
    }, [networkSelected]);

    const handleSelectNetwork = (_chainId: number) => {
        setNetworkSelected(true);
        setIsBridged(_chainId != chainId);
    };

    return (
        <>
            <label
                htmlFor={"cicleo-payment-modal-" + subscriptionId}
                className="cap-btn cap-btn-primary cap-max-w-[200px] cap-flex cap-justify-center "
            >
                <div className="cap-flex cap-items-center cap-text cap-justify-center cap-text-white cap-w-full cap-space-x-2">
                    <img src={PayImage} alt="" className="cap-max-w-[90px]" />
                </div>
            </label>

            <input
                type="checkbox"
                id={"cicleo-payment-modal-" + subscriptionId}
                className="cap-modal-toggle"
                onChange={(event) => {
                    if (event.target.checked) {
                        fetchSubscriptionInfo();
                    }
                }}
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle !cap-ml-0 cap-z-30">
                <div className="cap-modal-box cap-relative cap-p-0 cap-text-white">
                    <div className="cap-px-4 cap-py-3 cap-bg-base-300 cap-flex cap-justify-between cap-items-center">
                        <img src={TextWhite} alt="" className="cap-h-10" />
                        <span className="cap-mr-8">
                            {reduceAddress(account || "")}
                        </span>
                    </div>
                    <div></div>
                    <label
                        htmlFor={"cicleo-payment-modal-" + subscriptionId}
                        className="cap-absolute cap-btn cap-btn-sm cap-btn-circle cap-right-2 cap-top-2"
                    >
                        ✕
                    </label>

                    <HeaderSubscriptionInfo
                        subscription={subscription}
                        oldSubscription={oldSubscription}
                        subscriptionInfoIsFetched={subscriptionInfoIsFetched}
                        step={step}
                        loadingStep={loadingStep}
                        duration={subManager.duration}
                        _chains={_chains}
                        networkSelected={networkSelected}
                        handleBackOnNetwork={() => {
                            console.log("ejhe");
                            setNetworkSelected(false);
                            setIsLoaded(false);
                            setCoinLists([]);
                            setCoin({} as coin);
                        }}
                        handleBackStep={(step: number) => {
                            setLoadingStep(0);
                            setStep(step);
                        }}
                        handleBackCoins={() => {
                            console.log("ejei");
                            setStep(0);
                            setCoin({} as coin);
                        }}
                        handleBackEmailUser={() => {}}
                        isEmailEnter={true}
                        inToken={{
                            image: coin.logo_url,
                            symbol: coin.symbol,
                            balance: coin.balance,
                        }}
                    />

                    {(() => {
                        if (
                            subscription.id == oldSubscription.id &&
                            oldSubscription.isActive
                        )
                            return (
                                <div className="cap-p-4">
                                    <div className="cap-alert cap-alert-success cap-shadow-lg">
                                        <div className="cap-flex">
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
                                            <span>
                                                You are already subscribed !
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );

                        if (account == null)
                            return (
                                <Login
                                    handleSelectAccount={(address) => {
                                        setAccount(address);
                                    }}
                                />
                            );

                        if (!subscriptionInfoIsFetched)
                            return (
                                <LoadingState text="We're getting info on the subscription..." />
                            );

                        if (userInfoLoaded == false)
                            return (
                                <LoadingState text="We're getting some last info..." />
                            );

                        if (!networkSelected)
                            return (
                                <SelectNetwork
                                    handleSelectNetwork={handleSelectNetwork}
                                    _chains={_chains}
                                />
                            );

                        if (coin.id == undefined) {
                            return (
                                <SelectCoin
                                    isLoaded={isLoaded}
                                    subscription={subscription}
                                    oldSubscription={oldSubscription}
                                    coinLists={coinLists}
                                    setCoin={changeToken}
                                />
                            );
                        }

                        return (
                            <Payment
                                isLoaded={isLoaded}
                                subscription={subscription}
                                oldSubscription={oldSubscription}
                                step={step}
                                setStep={setStep}
                                stepFunction={stepFunction}
                                loadingStep={loadingStep}
                                errorMessage={errorMessage}
                                swapInfo={swapInfo}
                                isPurchased={isPurchased}
                                token={{
                                    isInfinity: isInfinityToken,
                                    amount: approvalToken,
                                    setAmount: setApprovalToken,
                                    setIsInfinity: setIsInfinityToken,
                                }}
                                isViaBridge={isBridged}
                                subscriptionLimit={{
                                    isInfinity: isInfinitySubscription,
                                    amount: approvalSubscription,
                                    setAmount: setApprovalSubscription,
                                    setIsInfinity: setIsInfinitySubscription,
                                }}
                                coin={coin}
                                explorerLink={explorerLink}
                            />
                        );
                    })()}
                </div>
            </div>
        </>
    );
};

export default SubscriptionButton;
