import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import "./PaymentButton.css";
import TextWhite from "@assets/logo_text_white.svg";
import PayImage from "@assets/pay.svg";
import TOKEN_IMG from "@assets/token.svg";
import {
    Contracts,
    isGoodNetwork,
    doTx,
    openOceanIface,
} from "@context/contract";
import PaymentModalContent from "./PaymentModalContent";
import SelectCoinModalContent from "./SelectCoinModalContent";
import axios from "axios";

type PaymentButton = {
    subscriptionId: number;
    signer: ethers.providers.JsonRpcSigner | undefined;
    config: { [key: number]: number };
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

const PaymentButton: FC<PaymentButton> = ({
    signer,
    subscriptionId,
    config,
    referral
}) => {
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [subManager, setSubManager] = useState<SubManagerInfo>(
        {} as SubManagerInfo
    );
    const [subManagerContract, setSubManagerContract] = useState<any>(null);
    const [swapInfo, setSwapInfo] = useState<any>(null);
    const [coin, setCoin] = useState<any>(null);
    const [coinLists, setCoinLists] = useState([]);
    const [step, setStep] = useState(1);
    const [balance, setBalance] = useState<string | number>("#");
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
        originalPrice: BigNumber.from("0"),
        tokenSymbol: ""
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [stepFunction, setStepFunction] = useState({
        1: () => { },
        2: () => { },
        3: () => { },
    });
    const [tokenOutImage, setTokenOutImage] = useState("");
    const [isPurchased, setIsPurchased] = useState(false);

    const BACKEND_ADDR = "https://backend-test.cicleo.io";


    const changeToken = async (coin: any) => {
        if (!signer) return;

        const address = await signer.getAddress();
        const erc20 = await Contracts.ERC20(signer, coin.id);

        const decimals = await erc20.decimals();

        let _coin = coin;

        _coin.balance = Number(
            ethers.utils
                .formatUnits(
                    (await erc20.balanceOf(address)).toString(),
                    decimals
                )
                .toString()
        );

        console.log(_coin);

        setCoin(_coin);
    };

    const getSwap = async () => {
        if (!signer) return;
        if (!coin) return;

        console.log("Get swap")

        const erc20 = await Contracts.ERC20(signer, coin.id);

        const subscriptionRouterContract = await Contracts.SubscriptionRouter(
            signer
        );

        const address = await signer.getAddress();

        const { chainId } = await signer.provider.getNetwork();

        if (coin.id.toUpperCase() == subManager.tokenAddress.toUpperCase()) {
            let step = 1;

            const allowance = await erc20.allowance(
                address,
                subManager.address
            );

            if (allowance.gt(subscription.originalPrice)) {
                step = 2;

                if (subManager.allowance.gte(subscription.originalPrice)) {
                    step = 3;
                }
            }

            if (subscription.originalPrice.eq(BigNumber.from("0"))) {
                step = 3;
            }

            setStep(step);

            setStepFunction({
                1: async () => {
                    await doTx(
                        () =>
                            erc20.approve(
                                subManager.address,
                                ethers.constants.MaxUint256
                            ),
                        `Approve ${subManager.tokenSymbol}`,
                        () => setLoadingStep(1)
                    );

                    setLoadingStep(0);
                    setStep(2);
                },
                2: async () => {
                    console.log(subscription.originalPrice);
                    await doTx(
                        () =>
                            subManagerContract.changeSubscriptionLimit(
                                subscription.originalPrice
                            ),
                        "Approve Subscription",
                        () => setLoadingStep(2)
                    );

                    setLoadingStep(0);
                    setStep(3);
                },
                3: async () => {
                    if (subscription.id != oldSubscription.id && oldSubscription.id != 0) {
                        console.log("subscription.id != oldSubscription.id");
                        await doTx(
                            () =>
                                subscriptionRouterContract.changeSubscription(
                                    subManager.id,
                                    subscriptionId
                                ),
                            "Change Subscribtion",
                            () => setLoadingStep(3)
                        );

                        setLoadingStep(0);
                        setIsPurchased(true);
                    } else {
                        console.log("else");

                        await doTx(
                            () =>
                                subscriptionRouterContract.subscribe(
                                    subManager.id,
                                    subscriptionId,
                                    referral != undefined ? referral : ethers.constants.AddressZero
                                ),
                            "Subscribe",
                            () => setLoadingStep(3)
                        );

                        setLoadingStep(0);
                        setIsPurchased(true);
                    }
                },
            });

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
                url: `https://backend.cicleo.io/chain/${chainId}/getExactPrice/`,
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            const resp = await axios(config);

            console.log(resp.data);

            let step = 1;

            const allowance = await erc20.allowance(
                address,
                subManager.address
            );

            if (allowance.gt(subscription.originalPrice)) {
                step = 2;

                if (subManager.allowance.gte(subscription.originalPrice)) {
                    step = 3;
                }
            }

            setStep(step);

            console.log(subManager.address)

            setStepFunction({
                1: async () => {
                    await doTx(
                        () =>
                            erc20.approve(
                                subManager.address,
                                ethers.constants.MaxUint256
                            ),
                        `Approve ${resp.data.data.inToken.symbol}`,
                        () => setLoadingStep(1)
                    );

                    setLoadingStep(0);
                    setStep(2);
                },
                2: async () => {
                    await doTx(
                        () =>
                            subManagerContract.changeSubscriptionLimit(
                                subscription.originalPrice
                            ),
                        "Approve Subscription",
                        () => setLoadingStep(2)
                    );

                    setLoadingStep(0);
                    setStep(3);
                },
                3: async () => {
                    try {
                        let decodedData = openOceanIface.parseTransaction({
                            data: resp.data.data.data,
                            value: resp.data.data.value,
                        });

                        if (subscription.id != oldSubscription.id && oldSubscription.id != 0) {

                            await doTx(
                                () =>
                                    // uint256 subscriptionManagerId,
                                    // uint8 newSubscriptionId,
                                    // IOpenOceanCaller executor,
                                    // SwapDescription memory desc,
                                    // IOpenOceanCaller.CallDescription[] calldata calls
                                    subscriptionRouterContract.changeSubscriptionWithSwap(
                                        subManager.id,
                                        subscriptionId,
                                        decodedData.args.caller,
                                        decodedData.args.desc,
                                        decodedData.args.calls
                                    ),
                                "Subscribe",
                                () => setLoadingStep(3)
                            );
                        } else {
                            await doTx(
                                () =>
                                    subscriptionRouterContract.subscribeWithSwap(
                                        subManager.id,
                                        subscriptionId,
                                        referral != undefined ? referral : ethers.constants.AddressZero,
                                        decodedData.args.caller,
                                        decodedData.args.desc,
                                        decodedData.args.calls
                                    ),
                                "Subscribe",
                                () => setLoadingStep(3)
                            );
                        }

                        setLoadingStep(0);
                        setIsPurchased(true);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        setStep(1);
                    }
                },
            });

            setSwapInfo(resp.data.data);
        }
    };

    useEffect(() => {

        getSwap();
        console.log(coin);
    }, [coin]);


    const createContracts = async () => {
        setIsLoaded(false);
        setIsWrongNetwork(false);

        if (!signer) return;

        try {
            const { chainId } = await signer.provider.getNetwork();

            const address = await signer.getAddress();

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
                console.log(subManagerId)
                let subscriptionManagerInfo =
                    await subscriptionRouterContract.getSubscriptionManager(
                        subManagerId
                    );

                const _subManagerContract = await Contracts.SubscriptionManager(
                    signer,
                    subscriptionManagerInfo._address
                );
                setSubManagerContract(_subManagerContract);

                console.log(_subManagerContract);

                let _subManagerInfo = subscriptionManagerInfo;

                const userInfo = await _subManagerContract.users(address);

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
                    duration: Number(_subManagerInfo.subscriptionDuration),
                });

                const _subscriptionInfo =
                    await subscriptionRouterContract.subscriptions(
                        Number(subManagerId),
                        subscriptionId
                    );

                console.log("-----------PB");

                console.log(Number(subManagerId));
                console.log(address);
                console.log(subscriptionId);


                const userPrice = await subscriptionRouterContract.getChangeSubscriptionPrice(
                    Number(subManagerId),
                    address,
                    subscriptionId
                );

                let _subscription = {
                    id: subscriptionId,
                    isActive: _subscriptionInfo.isActive,
                    name: _subscriptionInfo.name,
                    price: ethers.utils.formatUnits(
                        _subscriptionInfo.price,
                        Number(_subManagerInfo.tokenDecimals)
                    ),
                    originalPrice: _subscriptionInfo.price,
                    tokenSymbol: _subManagerInfo.tokenSymbol,
                    userPrice: ethers.utils.formatUnits(
                        userPrice,
                        Number(_subManagerInfo.tokenDecimals)
                    ),
                    originalUserPrice: userPrice,
                };

                const sub = await subscriptionRouterContract.subscriptions(
                    Number(subManagerId),
                    userInfo.subscriptionId
                );

                setOldSubscription({
                    id: userInfo.subscriptionId,
                    name: sub.name,
                    price: ethers.utils.formatUnits(
                        sub.price,
                        Number(_subManagerInfo.tokenDecimals)
                    ),
                    originalPrice: sub.price,
                    tokenSymbol: _subManagerInfo.tokenSymbol
                });

                const erc20 = await Contracts.ERC20(
                    signer,
                    _subManagerInfo.tokenAddress,
                    true
                );

                setBalance(
                    Number(
                        ethers.utils.formatUnits(
                            await erc20.balanceOf(address),
                            Number(_subManagerInfo.tokenDecimals)
                        )
                    )
                );

                const coinList = await axios.get(
                    `https://backend.cicleo.io/chain/${chainId}/getBalance/${address}/${_subManagerInfo.tokenAddress}/${userPrice.toString()}`
                );

                let coinData = coinList.data;

                setCoinLists(coinData);
                setIsLoaded(true);
                setSubscription(_subscription);

                if (_subscription.originalPrice.eq(0)) {
                    changeToken({ id: _subManagerInfo.tokenAddress });
                }
            } catch (error) {
                console.log(error);
                return;
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        createContracts();
    }, [signer]);

    const updateModal = () => {
        createContracts();
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
                onChange={updateModal}
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle !cap-ml-0">
                <div className="cap-modal-box cap-relative cap-p-0 cap-text-white">
                    <div className="cap-px-4 cap-py-3 cap-bg-base-300">
                        <img src={TextWhite} alt="" className="cap-h-10" />
                    </div>
                    <label
                        htmlFor={"cicleo-payment-modal-" + subscriptionId}
                        className="cap-absolute cap-btn cap-btn-sm cap-btn-circle cap-right-2 cap-top-2"
                    >
                        ✕
                    </label>
                    {coin == null ? (
                        <SelectCoinModalContent
                            tokenOutImage={tokenOutImage}
                            isWrongNetwork={isWrongNetwork}
                            isLoaded={isLoaded}
                            BUSD={TOKEN_IMG}
                            subscription={subscription}
                            oldSubscription={oldSubscription}
                            balance={balance}
                            coinLists={coinLists}
                            setCoin={changeToken}
                            subManager={subManager}
                        />
                    ) : (
                        <PaymentModalContent
                            isLoaded={isLoaded}
                            inToken={{
                                image: coin.logo_url,
                                symbol: coin.symbol,
                                balance: coin.balance,
                            }}
                            subscription={subscription}
                            oldSubscription={oldSubscription}
                            step={step}
                            stepFunction={stepFunction}
                            loadingStep={loadingStep}
                            errorMessage={errorMessage}
                            balance={balance}
                            swapInfo={swapInfo}
                            isPurchased={isPurchased}
                            duration={subManager.duration}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentButton;
