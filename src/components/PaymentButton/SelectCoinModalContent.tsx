import { formatNumber } from "@context/contract";
import { BigNumber, utils } from "ethers";
import React, { FC } from "react";
import { BounceLoader, ClipLoader } from "react-spinners";

type PaymentModalContent = {
    isWrongNetwork: boolean;
    isLoaded: boolean;
    BUSD: string;
    subscription: any;
    balance: number | string;
    coinLists: any[];
    setCoin: (coin: string) => void;
};

const PaymentModalContent: FC<PaymentModalContent> = ({
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

    return (
        <>
            <div className="cap-flex cap-justify-between cap-py-2">
                <div className="cap-flex cap-flex-row cap-items-center cap-px-5 cap-space-x-3">
                    <img
                        src={BUSD}
                        alt=""
                        className="cap-h-fit"
                        width={40}
                        height={40}
                    />
                    <div className="cap-flex cap-flex-col cap-justify-center">
                        <span className="cap-text-xl cap-font-semibold">
                            Subscription "{subscription.name}"
                        </span>
                        <span className="cap-text-lg cap-font-medium">
                            {subscription.price} {subscription.symbol} per month
                        </span>
                    </div>
                </div>

                <div className="cap-pr-4 cap-flex cap-flex-col cap-items-end">
                    <span className="cap-font-semibold">
                        Your {subscription.symbol} Balance
                    </span>
                    <span>{formatNumber(balance, 2)}</span>
                </div>
            </div>

            <hr />

            <div className="cap-flex cap-flex-col cap-p-3 cap-px-6 cap-font-medium cap-space-y-7 ">
                <span className="cap-font-semibold cap-text-gray-600">
                    You can chose to pay with any of this coin bellow, anyway
                    the price deducted each month will still be{" "}
                    {subscription.price} {subscription.symbol} worth of the coin
                    you chose (calculated on the day of payment)
                </span>

                <div className="cap-flex cap-items-center cap-flex-col cap-px-20 cap-space-y-10">
                    <div className="cap-w-fit cap-space-y-5">
                        {coinLists.map((coin, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCoin(coin.id)}
                                disabled={BigNumber.from(coin.raw_amount.toString()).lt(coin.toPay.toString())}
                                className={`cap-flex cap-space-x-5 cap-items-center cap-justify-between cap-border cap-rounded-xl cap-py-2 cap-px-5 hover:cap-border-blue-200 disabled:cap-border-gray-400 ${
                                    (selectedCoin == coin.id &&
                                        "!cap-border-blue-500 cap-bg-blue-50") ||
                                    ""
                                } cap-cursor-pointer cap-w-full`}
                            >
                                <div className="cap-flex cap-space-x-5 cap-items-center">
                                    <img
                                        src={coin.logo_url}
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                    <span className={BigNumber.from(coin.raw_amount.toString()).lt(coin.toPay.toString()) ? "cap-text-gray-500" : ""}>{coin.name}</span>
                                </div>
                                
                                <div className="cap-flex cap-flex-col cap-items-end">
                                    <span className="cap-text-gray-500">{Number(utils.formatUnits(coin.toPay, coin.decimals)).toFixed(2) + '.. ' + coin.symbol}</span>
                                    {BigNumber.from(coin.raw_amount.toString()).lt(coin.toPay.toString()) && <span className="cap-text-red-500 cap-ml-2">Insufficient Balance</span>}
                                </div>
                                
                            </button>
                        ))}
                    </div>

                    <button
                        className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 focus:cap-ring-4 focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-mr-2 cap-mb-2 dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 focus:cap-outline-none dark:focus:cap-ring-blue-800"
                        onClick={() => setCoin(selectedCoin)}
                    >Continue</button>
                </div>
            </div>
        </>
    );
};

export default PaymentModalContent;
