import React, { FC, useEffect, useState } from "react";
import TextWhite from "@assets/logo_text_white.svg";
import axios from "axios";
import { BigNumber, utils } from "ethers";

type ChangeTokenModal = {
    subManager: any;
    subscription: any;
    address: string;
    changeToken: (tokenAddress: string, tokenSymbol: string) => void;
};

const ChangeTokenModal: FC<ChangeTokenModal> = ({
    subManager,
    subscription,
    address,
    changeToken,
}) => {
    const [coinLists, setCoinLists] = useState([]);
    const [selectedCoin, setSelectedCoin] = React.useState<any>(null);

    const getCoinList = async () => {
        if (subscription.originalPrice == undefined) return;
        if (subManager == undefined) return;
        console.log(subscription);

        const coinList = await axios.get(
            `https://backend.cicleo.io/chain/56/getBalance/${address}/${subManager.tokenAddress}/${subscription.originalPrice}`
        );

        let coinData = coinList.data;

        console.log(coinData);

        setCoinLists(coinData);
    };

    const handleChangeToken = async () => {
        if (selectedCoin == null) return;

        changeToken(selectedCoin.id, selectedCoin.symbol);
        document.getElementById("cicleo-change-token")?.click();
    };

    useEffect(() => {
        getCoinList();
    }, [address, subscription, subManager]);

    return (
        <>
            <input
                type="checkbox"
                id="cicleo-change-token"
                className="cap-modal-toggle"
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle ">
                <div className="cap-modal-box !cap-p-0 cap-relative cap-w-full !cap-max-w-2xl">
                    <label
                        htmlFor="cicleo-change-token"
                        className="cap-absolute cap-btn cap-btn-sm cap-btn-circle cap-right-2 cap-top-2"
                    >
                        ✕
                    </label>
                    <div className="cap-flex cap-items-start cap-justify-between cap-p-4 cap-rounded-t cap-bg-base-300">
                        <div className="cap-flex cap-items-center cap-w-full cap-space-x-4">
                            <img
                                src={TextWhite}
                                alt=""
                                className="cap-max-h-10"
                            />
                        </div>
                    </div>

                    <div className="cap-flex cap-w-full cap-justify-between cap-space-y-4 cap-py-4 cap-px-5 cap-leading-[1.2] cap-flex-col">
                        <span className="cap-font-bold cap-text-2xl">
                            Change Token to Pay
                        </span>
                        <div className="cap-shadow-lg cap-alert cap-alert-info">
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
                                    It will change on the next cycle only, you
                                    will not be charged today
                                </span>
                            </div>
                        </div>
                    </div>

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
                                        Unfortunally we detecting no ERC20 coin
                                        on your account, swap your native tokens
                                        to ERC20 tokens to continue
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="cap-flex cap-flex-col cap-p-3 cap-px-6 cap-font-medium cap-space-y-6">
                            <span className="cap-font-semibold ">
                                Payment can be made with any of the below ERC20
                                coins. The value will always be worth{" "}
                                {subscription.price} {subscription.symbol} as
                                calculated on the day of payment. This means the
                                raw token amount you pay each month may vary
                                depending on market conditions of the coin you
                                have chosen.
                            </span>

                            <div className="cap-items-center cap-flex-col cap-space-y-10 cap-px-4">
                                <div className="cap-grid cap-grid-cols-2 cap-gap-4">
                                    {coinLists.map((coin: any, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedCoin(coin)
                                            }
                                            disabled={BigNumber.from(
                                                coin.raw_amount.toString()
                                            ).lt(coin.toPay.toString())}
                                            className={`cap-flex cap-space-x-5 cap-items-center cap-justify-between cap-rounded-xl cap-py-2 cap-px-5 cap-border-primary cap-bg-gray-600 hover:cap-border disabled:hover:cap-border-none disabled:cap-bg-base-200 ${
                                                (selectedCoin != undefined &&
                                                    selectedCoin.id ==
                                                        coin.id &&
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
                                                        (BigNumber.from(
                                                            coin.raw_amount.toString()
                                                        ).lt(
                                                            coin.toPay.toString()
                                                        )
                                                            ? "cap-text-gray-400"
                                                            : "") +
                                                        " " +
                                                        (selectedCoin !=
                                                            undefined &&
                                                        selectedCoin.id ==
                                                            coin.id
                                                            ? "cap-text-white"
                                                            : "")
                                                    }
                                                >
                                                    {coin.name}
                                                </span>
                                                <span
                                                    className={
                                                        "cap-text-gray-500 " +
                                                        (selectedCoin !=
                                                            undefined &&
                                                        selectedCoin.id ==
                                                            coin.id
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
                                        className="cap-btn cap-btn-primary"
                                        onClick={handleChangeToken}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChangeTokenModal;
