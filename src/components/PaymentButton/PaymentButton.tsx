import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import "./PaymentButton.css";
import TextWhite from "@assets/logo_text_white.svg";
import TOKEN_IMG from "@assets/token.svg";
import { Contracts, isGoodNetwork, doTx, openOceanIface } from "@context/contract";
import PaymentModalContent from "./PaymentModalContent";
import SelectCoinModalContent from "./SelectCoinModalContent";
import axios from "axios";

type PaymentButton = {
    subscriptionId: number;
    signer: ethers.providers.JsonRpcSigner | undefined;
    config: { [key: number]: number };
};

const PaymentButton: FC<PaymentButton> = ({
    signer,
    subscriptionId,
    config,
}) => {
    const [isWrongNetwork, setIsWrongNetwork] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [subManager, setSubManager] = useState({
        address: "",
        token: "",
        decimals: 0,
        allowance: BigNumber.from("0"),
    });
    const [subManagerContract, setSubManagerContract] = useState<any>(null);
    const [swapInfo, setSwapInfo] = useState<any>(null);
    const [coin, setCoin] = useState<any>(null);
    const [coinLists, setCoinLists] = useState([]);
    const [step, setStep] = useState(1);
    const [balance, setBalance] = useState<string | number>("#");
    const [subscription, setSubscription] = useState({
        isActive: true,
        name: "",
        price: "0",
        originalPrice: BigNumber.from("0"),
    });
    const [loadingStep, setLoadingStep] = useState(0);
    const [stepFunction, setStepFunction] = useState({
        1: () => {},
        2: () => {},
        3: () => {},
    });
    const [tokenOutImage, setTokenOutImage] = useState("")

    const changeToken = async (coin: any) => {
        if (!signer) return;
        
        const address = await signer.getAddress();
        const erc20 = await Contracts.ERC20(signer, coin.id);

        const decimals = await erc20.decimals()

        let _coin = coin

        _coin.balance = Number(ethers.utils.formatUnits((await erc20.balanceOf(address)).toString(), decimals).toString())

        console.log(_coin)

        setCoin(_coin)
    }

    const getSwap = async () => {
        if (!signer) return;
        if (!coin) return;
        
        const erc20 = await Contracts.ERC20(signer, coin.id);

        const address = await signer.getAddress();

        let data = JSON.stringify({
            tokenIn: coin.id,
            tokenOut: subManager.token,
            price: subscription.originalPrice,
            fromAddress: subManager.address,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://backend.cicleo.io/chain/56/getExactPrice/",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        const resp = await axios(config);

        let step = 1;

       

        const allowance = await erc20.allowance(address, subManager.address);

        if (allowance.gt(subscription.originalPrice)) {
            step = 2;

            if (subManager.allowance.gte(subscription.originalPrice)) {
                step = 3;
            }
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
                    `Approve ${resp.data.data.inToken.symbol}`,
                    () => setLoadingStep(1)
                );

                setLoadingStep(0);
                setStep(2);
            },
            2: async () => {
                await doTx(
                    () =>
                        subManagerContract.approveSubscription(
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

                    console.log(decodedData);

                    await doTx(
                        () =>
                            subManagerContract.paymentWithSwap(
                                subscriptionId,
                                decodedData.args.caller,
                                decodedData.args.desc,
                                decodedData.args.calls
                                //{gasLimit: '1000000'}
                            ),
                        "Subscribe",
                        () => setLoadingStep(3)
                    );

                    setLoadingStep(0);
                    setStep(4);
                } catch (error: any) {
                    console.log(error);
                    setErrorMessage(error.message);
                }
            },
        });

        setSwapInfo(resp.data.data);
    };

    useEffect(() => {
        getSwap();
        console.log(coin)
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

            const subFactory = await Contracts.SubscriptionFactory(signer);

            const _subManagerAddy = await subFactory.ids(subManagerId);

            if (_subManagerAddy == "0x0000000000000000000000000000000000000000")
                return;

            const subManager = await Contracts.SubscriptionManager(
                signer,
                _subManagerAddy,
                true
            );

            setSubManagerContract(subManager);

            let subscription = await subManager.subscriptions(subscriptionId);
            const decimals = await subManager.getDecimals();
            const token = await subManager.token();
            const symbol = await subManager.getSymbol();
            const _user = await subManager.users(address);

            setSubManager({
                address: _subManagerAddy,
                token,
                decimals,
                allowance: _user.approval,
            });

            let _subscription = {
                isActive: subscription.isActive,
                name: subscription.name,
                price: ethers.utils.formatUnits(subscription.price, decimals),
                symbol,
                originalPrice: subscription.price,
            };

            const erc20 = await Contracts.ERC20(signer, token, true);

            setBalance(
                Number(
                    ethers.utils.formatUnits(
                        await erc20.balanceOf(address),
                        decimals
                    )
                )
            );

            //--------------------------------------------------------------

            const coinList = await axios.get(
                `https://backend.cicleo.io/chain/56/getBalance/${address}/${token}/${subscription.price}`
            );

            let coinData = coinList.data;

            setCoinLists(coinData);
            setIsLoaded(true);
            setSubscription(_subscription);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        createContracts();
    }, [signer]);

    return (
        <>
            <label
                htmlFor="cicleo-payment-modal"
                className="cap-btn cap-btn-primary cap-max-w-[300px] cap-flex cap-justify-center "
            >
                <div className="cap-flex cap-items-center cap-text cap-justify-center cap-text-white cap-w-full cap-space-x-2">
                    <span className="cap-mt-2 cap-text-xl cap-normal-case">
                        Pay with
                    </span>
                    <img src={TextWhite} alt="" className="cap-max-w-[100px]" />
                </div>
            </label>

            <input
                type="checkbox"
                id="cicleo-payment-modal"
                className="cap-modal-toggle"
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle !cap-ml-0">
                <div className="cap-modal-box cap-relative cap-p-0">
                    <div className="cap-mb-4 cap-px-4 cap-py-3 cap-bg-base-300">
                        <img src={TextWhite} alt="" className="cap-h-10" />
                    </div>
                    <label
                        htmlFor="cicleo-payment-modal"
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
                            balance={balance}
                            coinLists={coinLists}
                            setCoin={changeToken}
                        />
                    ) : (
                        <PaymentModalContent
                            isLoaded={isLoaded}
                            inToken={{image: coin.logo_url, symbol: coin.symbol, balance: coin.balance}}
                            subscription={subscription}
                            step={step}
                            stepFunction={stepFunction}
                            loadingStep={loadingStep}
                            errorMessage={errorMessage}
                            balance={balance}
                            swapInfo={swapInfo}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default PaymentButton;
