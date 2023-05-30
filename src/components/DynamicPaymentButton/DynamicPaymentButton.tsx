import React, { useState, FC, useEffect } from "react";
import { BigNumber, Signer, ethers, providers } from "ethers";
import "./PaymentButton.css";
import TextWhite from "@assets/logo_text_white.svg";
import PayImage from "@assets/pay.svg";
import { getConfig, doTx, reduceAddress, openOceanIface } from "@context/contract";
import {
    Payment,
    SelectCoin,
    SelectNetwork,
    HeaderSubscriptionInfo,
} from "./components";
import axios from "axios";
import { getNetwork, fetchSigner, getContract, readContract, erc20ABI, readContracts, signMessage, prepareWriteContract, writeContract, getAccount} from "@wagmi/core";
import {Login, LoadingState} from "@components";
import {
    CicleoSubscriptionBridgeManager__factory, CicleoSubscriptionManager__factory, PaymentFacet__factory
} from "@context/Types";

type DynamicPaymentButton = {
    chainId: number;
    subManagerId: number;
    price: BigNumber;
    name: string;
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
    name: string,
    chainId: number,
    rpcUrls: string,
    image: string,
}

type coin = {
    logo_url: string,
    symbol: string,
    id: string,
    balance: number,
    decimals: number,
    toPay: string,
    _bridgeData: any[],
    _swapData: any[],
    _stargateData: any[],
    value: string,
}

let _chains: Network[] = [
    {
        name: "Fantom",
        chainId: 250,
        rpcUrls: "https://rpc.ftm.tools/",
        image: "https://cryptologos.cc/logos/fantom-ftm-logo.png?v=013",
    }, {
        name: "Polygon",
        chainId: 137,
        rpcUrls: "https://rpc-mainnet.maticvigil.com/",
        image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=013",
    }
]

const DynamicPaymentButton: FC<DynamicPaymentButton> = ({
    subManagerId,
    chainId,
    name,
    price,
    referral,
}) => {
    const [account, setAccount] = useState<string | null>(null);
    const [isBridged, setIsBridged] = useState(false)

    const [subscriptionInfoIsFetched, setSubscriptionInfoIsFetched] =
        useState(false);
    const [networkSelected, setNetworkSelected] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [subManager, setSubManager] = useState<SubManagerInfo>(
        {} as SubManagerInfo
    );
    const [swapInfo, setSwapInfo] = useState<any>(null);
    const [coin, setCoin] = useState<coin>({} as coin);
    const [coinLists, setCoinLists] = useState([]);
    const [step, setStep] = useState(0);
    const [balance, setBalance] = useState<string | number>("#");
    const [loadingStep, setLoadingStep] = useState(0);
    const [stepFunction, setStepFunction] = useState({
        1: (isInfinity: boolean, approvalToken: number) => {},
        2: (isInfinity: boolean, approvalSubscription: number) => {},
        3: () => {},
    });
    const [isPurchased, setIsPurchased] = useState(false);

    const [isInfinityToken, setIsInfinityToken] = useState(true);
    const [approvalToken, setApprovalToken] = useState(0)

    const [isInfinitySubscription, setIsInfinitySubscription] = useState(false);
    const [approvalSubscription, setApprovalSubscription] = useState(0)

    const changeToken = async (coin: any) => {
        if (!account) return;

        const erc20Contract = {
            address: coin.id,
            abi: erc20ABI,
          }

        const balance = await readContract({
            ...erc20Contract,
            functionName: 'balanceOf',
            // @ts-ignore
            args: [account]
        })

        let _coin = coin;
        
        _coin.balance = Number(
            ethers.utils
                .formatUnits(
                    balance,
                    coin.decimals
                )
                .toString()
        );
        
        setCoin(_coin);
    };

    const getSwap = async () => {
        console.log("Get swap");
        if (!coin) return;
        if (!account) return;
        if (coin.id == undefined) return

        console.log(coin);
        console.log(account)
        console.log(subManager.address)

        
        const data = await readContracts({
            contracts: [
                {
                    // @ts-ignore
                    address: coin.id,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    // @ts-ignore
                    args: [account, subManager.address],
                }
            ] 
        })

        console.log("Get swap");
        console.log(data);



        /* const erc20 = await Contracts.ERC20(signer, coin.id);

        const subscriptionRouterContract = await Contracts.SubscriptionRouter(
            signer
        ); */

        const { chain, chains } = getNetwork();
        if (!chain) return;
        const paymentChainId = chain.id;

        setStep(1);
        setIsLoaded(true)
        
        const config = await getConfig(paymentChainId);
        const router = config.subscriptionRouterAddress;
        const bridge = config.subscriptionBridgeAddress;
    
        if (isBridged) {
            console.log("BRIDGED")
            setSwapInfo({
                inToken: {
                    address: coin.id,
                    symbol: coin.symbol,
                    decimals: coin.decimals
                },
                inAmount: coin.toPay,
                outToken: {
                    address: subManager.tokenAddress,
                    symbol: subManager.tokenSymbol,
                    decimals: subManager.decimals,
                },
                outAmount: price.toString(),
            });

            const approval = await readContract({
                // @ts-ignore
                address: coin.id,
                abi: erc20ABI,
                functionName: 'allowance',
                // @ts-ignore
                args: [account, bridge],
            })
            
            const users = await readContract({
                // @ts-ignore
                address: bridge,
                abi: CicleoSubscriptionBridgeManager__factory.abi,
                functionName: 'users',
                // @ts-ignore
                args: [chainId, subManagerId, account],
            })

            const subApproval = users.subscriptionLimit as BigNumber

            if (approval.gte(price)) {
                setStep(2);
                
                if (subApproval.gte(price)) {
                    setStep(3);
                }

                console.log(subApproval)
            }
            
            setApprovalSubscription(Number(ethers.utils.formatUnits(price, coin.decimals)));

            setStepFunction({
                1: async (isInfinityToken, approvalToken) => {
                    if (isInfinityToken == false) { 
                        if (approvalToken < priceFormatted) {
                            return setErrorMessage("You need to approve at least the subscription price")
                        }
                    }
                    
                    try {
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: coin.id,
                            abi: erc20ABI,
                            functionName: 'approve',
                            args: [bridge, isInfinityToken ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(approvalToken.toString(), subManager.decimals)],
                        })

                        setLoadingStep(1);

                        await wait()

                        setErrorMessage("");
                        setStep(2);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return
                    }

                    if (subApproval.gte(coin.toPay)) {
                        setStep(3);
                    }
                },
                2: async (isInfinitySubscription, approvalSubscription) => {
                    if (isInfinitySubscription == false) { 
                        if (approvalSubscription < priceFormatted) {
                            return setErrorMessage("You need to approve at least the subscription price")
                        }
                    }

                    try {
                        // @ts-ignore
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: bridge,
                            abi: CicleoSubscriptionBridgeManager__factory.abi,
                            functionName: 'changeSubscriptionLimit',
                            args: [chainId, subManagerId, isInfinitySubscription ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(approvalSubscription.toString(), subManager.decimals)],
                        })

                        setLoadingStep(2);
                        
                        await wait();
                        
                        setErrorMessage("");
                        setStep(3);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return
                    }
                },
                3: async () => {
                    try {
                        const message = ethers.utils.toUtf8Bytes('Cicleo Bridged Subscription\n\n'
                        + 'Chain: ' + chainId + '\n'
                        + 'User: ' + account.toLowerCase() + '\n'
                        + 'SubManager: ' + subManagerId + '\n'
                        + 'Subscription: 255\n'
                        + 'Price: ' + price.toString() + '\n'
                            + 'Nonce: ' + 0)

                        let signature = await signMessage({
                            message: message
                        })

                        function _adjustV(v: number): number {
                            if (v === 0) {
                              return 27
                            } else if (v === 1) {
                              return 28
                            } else {
                              return v
                            }
                        }

                        const { v, r, s } = ethers.utils.splitSignature(signature)
                        const adjustedV = _adjustV(v)
                        signature = ethers.utils.joinSignature({ r, s, v: adjustedV }) as any
                        
                        console.log(coin._stargateData)

                        // @ts-ignore
                        const nativePrice = BigNumber.from(coin._stargateData[3].hex).mul(12).div(10)

                        let starGate: any = coin._stargateData
                        starGate[3] = nativePrice.toString() as any

                        const signer = await fetchSigner()
            
                        const _bridge = getContract({address: bridge, abi: CicleoSubscriptionBridgeManager__factory.abi, signerOrProvider: signer as Signer})

                        const tx = await _bridge.payFunctionWithBridge(
                            //@ts-ignore
                            [
                                BigNumber.from(chainId),
                                BigNumber.from(subManagerId),
                                255,
                                price.toString(),
                                coin.id
                            ],
                            coin._bridgeData,
                            coin._swapData,
                            starGate,
                            referral != undefined ? referral : ethers.constants.AddressZero,
                            subManager.duration,
                            signature,
                            { value: nativePrice }
                        )
                
                        setLoadingStep(3);

                        const transac = await tx.wait()

                        console.log(transac)

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

                        
                        return
                    }
                },
            });

            return
        }

        const resulat = await readContracts({
            contracts: [
                {
                    address: coin.id as `0x${string}`,
                    abi: erc20ABI,
                    functionName: 'allowance',
                    // @ts-ignore
                    args: [account, subManager.address],
                },{
                    address: subManager.address as `0x${string}`,
                    abi: CicleoSubscriptionManager__factory.abi,
                    functionName: 'users',
                    args: [account as `0x${string}`],
                }
            ]
        })

        const approval = resulat[0] as BigNumber;
        const users = resulat[1] as any;

        const subApproval = users.subscriptionLimit as BigNumber;

        if (approval.gte(price)) {
            setStep(2);
            
            if (subApproval.gte(price)) {
                setStep(3);
            }
        }
        
        setApprovalSubscription(Number(ethers.utils.formatUnits(price, subManager.decimals)));
        
        const priceFormatted = Number(ethers.utils.formatUnits(price, coin.decimals));

        //If same coin payment as submanager
        if (coin.id.toUpperCase() == subManager.tokenAddress.toUpperCase()) {
            setSwapInfo({
                inToken: {
                    address: subManager.tokenAddress,
                    symbol: subManager.tokenSymbol,
                    decimals: subManager.decimals,
                },
                inAmount: price.toString(),
                outToken: {
                    address: subManager.tokenAddress,
                    symbol: subManager.tokenSymbol,
                    decimals: subManager.decimals,
                },
                outAmount: price.toString(),
            });

            

            setStepFunction({
                1: async (isInfinityToken, approvalToken) => {
                    if (isInfinityToken == false) { 
                        if (approvalToken < priceFormatted) {
                            return setErrorMessage("You need to approve at least the subscription price")
                        }
                    }
                    
                    try {
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: coin.id,
                            abi: erc20ABI,
                            functionName: 'approve',
                            args: [subManager.address, isInfinityToken ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(approvalToken.toString(), subManager.decimals)],
                        })

                        setLoadingStep(1);

                        await wait()
                        
                        setErrorMessage("");
                        setStep(2);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return
                    }

                    if (subApproval.gte(price)) {
                        setStep(3);
                    }
                },
                2: async (isInfinitySubscription, approvalSubscription) => {
                    if (isInfinitySubscription == false) { 
                        if (approvalSubscription < priceFormatted) {
                            return setErrorMessage("You need to approve at least the subscription price")
                        }
                    }

                    try {
                        // @ts-ignore
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: subManager.address,
                            abi: CicleoSubscriptionManager__factory.abi,
                            functionName: "changeSubscriptionLimit",
                            args: [isInfinitySubscription ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(approvalSubscription.toString(), subManager.decimals)],
                        })

                        setLoadingStep(2);

                        await wait()
                        
                        setErrorMessage("");
                        setStep(3);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return
                    }
                },
                3: async () => {
                    try {
                        // @ts-ignore
                        const { wait } = await writeContract({
                            // @ts-ignore
                            address: router,
                            abi: PaymentFacet__factory.abi,
                            functionName: "subscribeDynamicly",
                            args: [subManagerId, name, price, referral != undefined ? referral : ethers.constants.AddressZero]
                        })

                        setLoadingStep(3);

                        await wait()

                        setErrorMessage("");
                        setIsPurchased(true);
                    } catch (error: any) {  
                        console.log(error);
                        setErrorMessage(error.message);
                        return
                    }
                },
            });

        //For swap things on same network
        } else { 
            let data = JSON.stringify({
                tokenIn: coin.id,
                tokenOut: subManager.tokenAddress,
                price: price.toString(),
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
                1: async (isInfinity: boolean, approvalToken: number) => {
                    if (isInfinityToken == false) { 
                        if (approvalToken < priceFormatted) {
                            return setErrorMessage("You need to approve at least the subscription price")
                        }
                    }
                    
                    try {
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: coin.id,
                            abi: erc20ABI,
                            functionName: 'approve',
                            args: [subManager.address, isInfinityToken ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(approvalToken.toString(), subManager.decimals)],
                        })

                        setLoadingStep(1);

                        await wait()
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return
                    }

                    if (subApproval.gte(priceFormatted)) {
                        setStep(3);
                    }
                    
                    setStep(2);
                },
                2: async (isInfinity: boolean, approvalSubscription: number) => {
                    if (isInfinitySubscription == false) { 
                        if (approvalSubscription < priceFormatted) {
                            return setErrorMessage("You need to approve at least the subscription price")
                        }
                    }

                    try {
                        // @ts-ignore
                        const { hash, wait } = await writeContract({
                            // @ts-ignore
                            address: subManager.address,
                            abi: CicleoSubscriptionManager__factory.abi,
                            functionName: "changeSubscriptionLimit",
                            args: [isInfinitySubscription ? ethers.constants.MaxUint256 : ethers.utils.parseUnits(approvalSubscription.toString(), subManager.decimals)],
                        })

                        setLoadingStep(2);

                        await wait()
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        return
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
                            functionName: "subscribeDynamiclyWithSwap",
                            args: [subManagerId, name, price, referral != undefined ? referral : ethers.constants.AddressZero, decodedData.args.caller, decodedData.args.desc, decodedData.args.calls]
                        })
                        
                        setLoadingStep(3)

                        await wait()

                        setLoadingStep(0);
                        setIsPurchased(true);
                    } catch (error: any) {
                        console.log(error);
                        setErrorMessage(error.message);
                        setStep(1);
                    }
                }
            });
        }
    };

    useEffect(() => {
        getSwap();
        console.log(coin);
    }, [coin]);

    //Function to fetch the subscription info from the backend
    //Called when modal is opened
    const fetchSubscriptionInfo = async () => {
        const subscriptionInfo = await axios.get(
            `https://backend-test.cicleo.io/chain/${chainId}/getSubscriptionInfo/${subManagerId}/255`
        );

        console.log("hndihj")

        console.log(subscriptionInfo.data);

        const _subManager = subscriptionInfo.data.subManager as SubManagerInfo;

        setSubManager(_subManager);
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
            `https://backend-test.cicleo.io/chain/${chainId}/getUserInfo/${subManagerId}/255/${address}/${sourceChainId}?price=${price.toString()}`
        );

        setCoinLists(userInfo.data.coinList);
        setIsLoaded(true);
    };

    useEffect(() => {
        getUserTokenList();
    }, [networkSelected]);

    const handleSelectNetwork = (_chainId: number) => {
        setNetworkSelected(true);
        setIsBridged(_chainId != chainId)
    };

    return (
        <>
            <label
                htmlFor={"cicleo-payment-modal-" + name}
                className="cap-btn cap-btn-primary cap-max-w-[200px] cap-flex cap-justify-center "
            >
                <div className="cap-flex cap-items-center cap-text cap-justify-center cap-text-white cap-w-full cap-space-x-2">
                    <img src={PayImage} alt="" className="cap-max-w-[90px]" />
                </div>
            </label>

            <input
                type="checkbox"
                id={"cicleo-payment-modal-" + name}
                className="cap-modal-toggle"
                onChange={(event) => { 
                    if (event.target.checked) {
                        fetchSubscriptionInfo();
                    }
                }}
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle !cap-ml-0">
                <div className="cap-modal-box cap-relative cap-p-0 cap-text-white">
                    <div className="cap-px-4 cap-py-3 cap-bg-base-300 cap-flex cap-justify-between cap-items-center">
                        <img src={TextWhite} alt="" className="cap-h-10" />
                        <span className="cap-mr-8">{reduceAddress(account || "")}</span>
                    </div>
                    <div>
                        
                    </div>
                    <label
                        htmlFor={"cicleo-payment-modal-" + name}
                        className="cap-absolute cap-btn cap-btn-sm cap-btn-circle cap-right-2 cap-top-2"
                        onChange={fetchSubscriptionInfo}
                    >
                        ✕
                    </label>

                    <HeaderSubscriptionInfo
                        name={name}
                        price={ethers.utils.formatUnits(price, subManager.decimals)}
                        tokenSymbol={subManager.tokenSymbol}
                        step={step}
                        loadingStep={loadingStep}
                        duration={subManager.duration}
                        _chains={_chains}
                        networkSelected={networkSelected}
                        handleBackOnNetwork={() => {
                            console.log("ejhe")
                            setNetworkSelected(false)
                            setIsLoaded(false)
                            setCoinLists([])
                            setCoin({} as coin)
                        }}
                        handleBackStep={(step: number) => {
                            setLoadingStep(0)
                            setStep(step)
                        }}
                        handleBackCoins={() => {
                            console.log("ejei")
                            setStep(0)
                            setCoin({} as coin)
                        }}
                        handleBackEmailUser={() => { 
                            
                        }}
                        isEmailEnter={true}
                        inToken={{
                            image: coin.logo_url,
                            symbol: coin.symbol,
                            balance: coin.balance,
                        }}
                        subscriptionInfoIsFetched={subscriptionInfoIsFetched}
                    />

                    {(() => {
                        if (account == null) return (
                            <Login
                                handleSelectAccount={(address) => {
                                    setAccount(address)
                                }}
                            />
                        );

                        if (subscriptionInfoIsFetched == false) return (
                            <LoadingState text="We're getting info on the subscription..." />
                        );

                        if (networkSelected == false)
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
                                    name={name}
                                    price={ethers.utils.formatUnits(price, subManager.decimals)}
                                    tokenSymbol={subManager.tokenSymbol}
                                    coinLists={coinLists}
                                    setCoin={changeToken}
                                />
                            );
                        }
                    
                        return (
                            <Payment
                                isLoaded={isLoaded}
                                price={ethers.utils.formatUnits(price, subManager.decimals)}
                                name={name}
                                step={step}
                                stepFunction={stepFunction}
                                loadingStep={loadingStep}
                                errorMessage={errorMessage}
                                swapInfo={swapInfo}
                                isPurchased={isPurchased}
                                token={{
                                    isInfinity: isInfinityToken,
                                    amount: approvalToken,
                                    setAmount: setApprovalToken,
                                    setIsInfinity: setIsInfinityToken
                                }}
                                isViaBridge={isBridged}
                                subscriptionLimit={{
                                    isInfinity: isInfinitySubscription,
                                    amount: approvalSubscription,
                                    setAmount: setApprovalSubscription,
                                    setIsInfinity: setIsInfinitySubscription
                                }}
                            />
                        );
                    })()}
                </div>
            </div>
        </>
    );
};

export default DynamicPaymentButton;
