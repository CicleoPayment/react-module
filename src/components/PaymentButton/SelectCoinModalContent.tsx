import { token } from "@context/Types/@openzeppelin/contracts";
import { formatNumber } from "@context/contract";
import { BigNumber, utils } from "ethers";
import React, { FC } from "react";

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
};

type PaymentModalContent = {
    tokenOutImage: string;
    isWrongNetwork: boolean;
    isLoaded: boolean;
    BUSD: string;
    subscription: any;
    oldSubscription: any;
    balance: number | string;
    coinLists: any[];
    setCoin: (coin: string) => void;
    subManager: any;
};

const PaymentModalContent: FC<PaymentModalContent> = ({
    tokenOutImage,
    isWrongNetwork,
    isLoaded,
    BUSD,
    subscription,
    oldSubscription,
    balance,
    coinLists,
    setCoin,
    subManager
}) => {
    const [selectedCoin, setSelectedCoin] = React.useState<any>(null);
    console.log(subManager)
    console.log("---------------")
    console.log(subscription);
    console.log(oldSubscription);



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

    if (isLoaded == false)
        return (
            <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20 cap-flex-col cap-space-y-4">
                <span className="cap-font-medium cap-text-2xl ">
                    Scanning your ERC20 coins...
                </span>
                <progress className="cap-w-56 cap-progress"></progress>
            </div>
        );

    return (
        <>
            {subscription.id != oldSubscription.id ? (
                <div className="cap-flex cap-flex-col cap-content-center cap-flex-wrap cap-justify-between cap-py-2 cap-bg-base-100">
                    <div className="cap-indicator cap-w-[400px] cap-flex cap-space-x-2 cap-py-2 cap-px-3 cap-border-primary cap-bg-gray-800 cap-rounded-xl">
                        <img
                            src={tokenOutImage == "" ? BUSD : tokenOutImage}
                            alt=""
                            className="cap-h-fit"
                            width={40}
                            height={40}
                        />
                        <div className="cap-flex cap-flex-col cap-justify-center">
                            <span className="cap-text-xl cap-font-semibold">
                                {oldSubscription.name}
                            </span>
                            <span className="cap-text-lg cap-font-medium">
                                {oldSubscription.price} {oldSubscription.tokenSymbol} per
                                month
                            </span>
                        </div>
                    </div>
                    <div className="cap-divider cap-w-[100px] cap-self-center">TO</div>
                    <div className="cap-indicator cap-w-[400px] cap-flex cap-space-x-2 cap-py-2 cap-px-3 cap-border-primary cap-bg-gray-800 cap-rounded-xl">
                        <span className="cap-indicator-item cap-badge cap-badge-primary">new</span>
                        <img
                            src={tokenOutImage == "" ? BUSD : tokenOutImage}
                            alt=""
                            className="cap-h-fit"
                            width={40}
                            height={40}
                        />
                        <div className="cap-flex cap-flex-col cap-justify-center">
                            <span className="cap-text-xl cap-font-semibold">
                                {subscription.name}
                            </span>
                            <span className="cap-text-lg cap-font-medium">
                                {subscription.price} {subscription.tokenSymbol} per
                                month
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="cap-p-5 cap-flex">
                    <div className="cap-shadow-lg cap-alert cap-alert-warning cap-justify-center">
                        <div>
                            <span>
                                You are already subscribed !
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="cap-divider"></div>

            {subscription.price != oldSubscription.price && (
                <div className="cap-px-4">
                    <div className="cap-shadow-lg cap-alert cap-alert-info ">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="cap-flex-shrink-0 cap-w-6 cap-h-6 cap-stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>
                                You will pay less for this subscription cycle
                                since you are already subscribed
                                ( {subscription.userPrice} {subscription.tokenSymbol})
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {coinLists.length == 0 ? (
                <div className="cap-p-5">
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
                            <span>
                                Unfortunally we detecting no ERC20 coin on your
                                account, swap your native tokens to ERC20 tokens
                                to continue
                            </span>
                        </div>
                    </div>
                </div>
            ) : (subscription.id == oldSubscription.id) ? (
                <>
                </>
            ) : (
                <div className="cap-flex cap-flex-col cap-p-3 cap-px-6 cap-font-medium cap-space-y-6">
                    <span className="cap-font-semibold ">
                        You can choose to pay with any of the ERC20 tokens
                        below, but be advised that the amount of tokens used to
                        make the payment will be equal to {subscription.price}{" "}
                        {subscription.tokenSymbol} in value. The amount of
                        tokens equal to {subscription.price}{" "}
                        {subscription.tokenSymbol} is calculated at the time of
                        payment.
                    </span>

                    <div className="cap-items-center cap-flex-col cap-space-y-10">
                        <div className="cap-grid cap-grid-cols-2 cap-gap-4">
                            {coinLists.map((coin, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedCoin(coin)}
                                    disabled={BigNumber.from(
                                        coin.raw_amount_hex_str
                                    ).lt(coin.toPay.toString())}
                                    className={`cap-flex cap-space-x-5 cap-items-center cap-justify-between cap-rounded-xl cap-py-2 cap-px-5 cap-border-primary cap-bg-gray-600 hover:cap-border disabled:hover:cap-border-none disabled:cap-bg-base-200 ${(selectedCoin != undefined &&
                                        selectedCoin.id == coin.id &&
                                        "!cap-bg-primary") ||
                                        ""
                                        } cap-cursor-pointer disabled:cap-cursor-default cap-w-full`}
                                >
                                    <div className="cap-flex cap-space-x-5 cap-items-center">
                                        <img
                                            src={coin.logo_url}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="cap-min-w-[40px]"
                                        />
                                    </div>

                                    <div className="cap-flex cap-flex-col cap-items-end cap-text-right">
                                        <span
                                            className={
                                                (BigNumber.from(
                                                    coin.raw_amount_hex_str
                                                ).lt(coin.toPay.toString())
                                                    ? "cap-text-gray-400"
                                                    : "") +
                                                " " +
                                                (selectedCoin != undefined &&
                                                    selectedCoin.id == coin.id
                                                    ? "cap-text-white"
                                                    : "")
                                            }
                                        >
                                            {coin.name}
                                        </span>
                                        <span
                                            className={
                                                "cap-text-gray-500 " +
                                                (selectedCoin != undefined &&
                                                    selectedCoin.id == coin.id
                                                    ? "!cap-text-gray-400"
                                                    : "")
                                            }
                                        >
                                            {Number(
                                                utils.formatUnits(
                                                    coin.toPay,
                                                    coin.decimals
                                                )
                                            ).toFixed(2) +
                                                " " +
                                                coin.symbol}
                                        </span>
                                        {BigNumber.from(
                                            coin.raw_amount_hex_str
                                        ).lt(coin.toPay.toString()) && (
                                                <span className="cap-text-red-500 cap-ml-2 cap-text-sm">
                                                    Insufficient Balance
                                                </span>
                                            )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="cap-modal-action">
                            <button
                                onClick={() => setCoin(selectedCoin)}
                                className="cap-btn cap-btn-primary"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )
            })
        </>
    );
};

export default PaymentModalContent;
