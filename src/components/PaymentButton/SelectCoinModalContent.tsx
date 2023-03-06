import { formatNumber } from "@context/contract";
import { BigNumber, utils } from "ethers";
import React, { FC } from "react";

type PaymentModalContent = {
    tokenOutImage: string;
    isWrongNetwork: boolean;
    isLoaded: boolean;
    BUSD: string;
    subscription: any;
    balance: number | string;
    coinLists: any[];
    setCoin: (coin: string) => void;
};

const PaymentModalContent: FC<PaymentModalContent> = ({
    tokenOutImage,
    isWrongNetwork,
    isLoaded,
    BUSD,
    subscription,
    balance,
    coinLists,
    setCoin,
}) => {
    const [selectedCoin, setSelectedCoin] = React.useState<any>(null);

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
            <div className="cap-flex cap-justify-between cap-py-2 cap-bg-base-100">
                <div className="cap-flex cap-flex-row cap-items-center cap-px-5 cap-space-x-3">
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
                            {subscription.price} {subscription.symbol} per month
                        </span>
                    </div>
                </div>
            </div>

            <div className="cap-divider"></div>

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
            ) : (
                <div className="cap-flex cap-flex-col cap-p-3 cap-px-6 cap-font-medium cap-space-y-6">
                    <span className="cap-font-semibold ">
                        You can chose to pay with any of this coin bellow,
                        anyway the price deducted each month will still be{" "}
                        {subscription.price} {subscription.symbol} worth of the
                        coin you chose (calculated on the day of payment)
                    </span>

                    <div className="cap-items-center cap-flex-col cap-space-y-10 cap-px-4">
                        <div className="cap-grid cap-grid-cols-2 cap-gap-4">
                            {coinLists.map((coin, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedCoin(coin)}
                                    disabled={BigNumber.from(
                                        coin.raw_amount.toString()
                                    ).lt(coin.toPay.toString())}
                                    className={`cap-flex cap-space-x-5 cap-items-center cap-justify-between cap-rounded-xl cap-py-2 cap-px-5 cap-border-primary cap-bg-gray-600 hover:cap-border disabled:hover:cap-border-none disabled:cap-bg-base-200 ${
                                        (selectedCoin != undefined &&
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
                                        />
                                    </div>

                                    <div className="cap-flex cap-flex-col cap-items-end cap-text-right">
                                        <span
                                            className={
                                                BigNumber.from(
                                                    coin.raw_amount.toString()
                                                ).lt(coin.toPay.toString())
                                                    ? "cap-text-gray-400"
                                                    : ""
                                            }
                                        >
                                            {coin.name}
                                        </span>
                                        <span className="cap-text-gray-500">
                                            {Number(
                                                utils.formatUnits(
                                                    coin.toPay,
                                                    coin.decimals
                                                )
                                            ).toFixed(2) + ' ' + coin.symbol}
                                        </span>
                                        {BigNumber.from(
                                            coin.raw_amount.toString()
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
            )}
        </>
    );
};

export default PaymentModalContent;
