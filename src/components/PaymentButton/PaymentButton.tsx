import React, { useState, FC, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import "./PaymentButton.css";
import Logo from "@assets/logo_white.svg";
import LogoBlue from "@assets/logo.png";
import TOKEN_IMG from "@assets/token.svg";
import { Contracts, isGoodNetwork, doTx } from "@context/contract";
import PaymentModalContent from "./PaymentModalContent";
import SelectCoinModalContent from "./SelectCoinModalContent";
import axios from "axios";

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
    const [coin, setCoin] = useState<string | null>(null);
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
    
    const iface = new ethers.utils.Interface(
        [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"srcToken","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"dstToken","type":"address"},{"indexed":false,"internalType":"address","name":"dstReceiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"spentAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"returnAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"minReturnAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"guaranteedAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"referrer","type":"address"}],"name":"Swapped","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOpenOceanCaller","name":"caller","type":"address"},{"components":[{"internalType":"contract IERC20","name":"srcToken","type":"address"},{"internalType":"contract IERC20","name":"dstToken","type":"address"},{"internalType":"address","name":"srcReceiver","type":"address"},{"internalType":"address","name":"dstReceiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturnAmount","type":"uint256"},{"internalType":"uint256","name":"guaranteedAmount","type":"uint256"},{"internalType":"uint256","name":"flags","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"bytes","name":"permit","type":"bytes"}],"internalType":"struct OpenOceanExchange.SwapDescription","name":"desc","type":"tuple"},{"components":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"gasLimit","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct IOpenOceanCaller.CallDescription[]","name":"calls","type":"tuple[]"}],"name":"swap","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]    );

    const getSwap = async () => {
        if (!signer) return;
        if (!coin) return;

        const address = await signer.getAddress();
        
        let data = JSON.stringify({
            tokenIn: coin,
            tokenOut: subManager.token,
            price: subscription.originalPrice,
            fromAddress: subManager.address,
        });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:6001/chain/56/getExactPrice/",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };

        const resp = await axios(config);

        let step = 1;

        const erc20 = await Contracts.ERC20(signer, coin);

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
                        subManagerContract.approveSubscription(subscription.originalPrice),
                    "Approve Subscription",
                    () => setLoadingStep(2)
                );

                setLoadingStep(0);
                setStep(3);
            },
            3: async () => {
                try {
                    let decodedData = iface.parseTransaction({ data: resp.data.data.data, value: resp.data.data.value });

                    console.log(decodedData);

                    await doTx(
                        () => subManagerContract.paymentWithSwap(
                            subscriptionId,
                            decodedData.args.caller,
                            decodedData.args.desc,
                            decodedData.args.calls,
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
    }, [coin]);

    const createContracts = async () => {
        setIsLoaded(false);
        setIsWrongNetwork(false);

        if (!signer) return;

        try {
            const { chainId } = await signer.provider.getNetwork();

            const address = await signer.getAddress();

            if (!(await isGoodNetwork(chainId))) {
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
                allowance: _user.approval
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
                `https://cicleo-backend.vercel.app/chain/56/getBalance/${address}/${token}/${subscription.price}`
            );

            console.log(coinList.data);

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
                {coin == null ? (
                    <SelectCoinModalContent
                        isWrongNetwork={isWrongNetwork}
                        isLoaded={isLoaded}
                        BUSD={TOKEN_IMG}
                        subscription={subscription}
                        balance={balance}
                        coinLists={coinLists}
                        setCoin={(coin: string) => setCoin(coin)}
                    />
                ) : (
                    <PaymentModalContent
                        isLoaded={isLoaded}
                        BUSD={TOKEN_IMG}
                        subscription={subscription}
                        step={step}
                        stepFunction={stepFunction}
                        loadingStep={loadingStep}
                        errorMessage={errorMessage}
                        balance={balance}
                        swapInfo={swapInfo}
                    />
                )}
            </Modal>
        </>
    );
};

export default PaymentButton;

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
                </div>
            </div>
        </div>
    );
};
