import { BigNumber, ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import TextWhite from "@assets/logo_text_white.svg";

type EditApproval = {
    name: string;
    messageHeader: string;
    messageInfo: string;
    textInput: string;
    onConfirm: (approveAmount: BigNumber) => void;
    decimals: number;
    isLoading: boolean;
    isTxSend: boolean;
    approval: BigNumber;
    labelTextInput: string;
};

const EditApproval: FC<EditApproval> = ({
    name,
    messageHeader,
    messageInfo,
    textInput,
    onConfirm,
    decimals,
    isLoading,
    isTxSend,
    approval,
    labelTextInput,
}) => {
    const [isInfinity, setIsInfinity] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const form = e.currentTarget;
        const values = Object.fromEntries(new FormData(form));

        console.log(values);

        let approveAmount = ethers.constants.MaxUint256;

        if (values.approveAmount != undefined) {
            approveAmount = ethers.utils.parseUnits(
                values.approveAmount as string,
                decimals
            );
        }

        onConfirm(approveAmount);
    };

    const toggleInfinity = (e: any) => {
        setIsInfinity(e.target.checked);
    };

    const getDefaultValueInput = () => {
        if (approval == undefined) return;
        if (approval.eq(ethers.constants.MaxUint256)) return "1";
        if (approval) {
            return ethers.utils.formatUnits(approval, decimals);
        }
    };

    useEffect(() => {
        if (approval == undefined) return;
        if (approval.eq(ethers.constants.MaxUint256)) {
            console.log("is inifity");
            setIsInfinity(true);
        }
    }, [approval]);

    return (
        <>
            <input
                type="checkbox"
                id={"cicleo-edit-approval-" + name}
                className="cap-modal-toggle"
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle ">
                <div className="cap-modal-box !cap-p-0 cap-relative cap-w-full !cap-max-w-2xl">
                    <label
                        htmlFor={"cicleo-edit-approval-" + name}
                        className="cap-absolute cap-btn cap-btn-sm cap-btn-circle cap-right-2 cap-top-2"
                    >
                        ✕
                    </label>
                    <form action="" onSubmit={handleSubmit}>
                        {/* <!-- Modal header --> */}
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
                                {messageHeader}
                            </span>

                            <div className="cap-divider"></div>

                            <div className="cap-alert cap-alert-info cap-shadow-lg ">
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
                                    <span>{messageInfo}</span>
                                </div>
                            </div>

                            <div className="cap-flex cap-space-x-5">
                                <div className="cap-flex-grow">
                                    <div className="cap-form-control">
                                        <label className="cap-label">
                                            <span className="cap-label-text">
                                                {textInput}
                                            </span>
                                        </label>
                                        <label className="cap-input-group">
                                            <input
                                                type="number"
                                                id="approveAmount"
                                                placeholder="50"
                                                name="approveAmount"
                                                required={!isInfinity}
                                                min={0}
                                                disabled={isInfinity}
                                                defaultValue={getDefaultValueInput()}
                                                className="cap-input cap-input-bordered"
                                            />
                                            <span className="cap-max-w-[30rem]">
                                                {labelTextInput}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="cap-h-20 cap-w- cap-border-r cap-border-[#E5E7EB]" />

                                <div className="cap-flex-grow cap-flex cap-items-center cap-justify-center">
                                    <div className="cap-flex cap-items-center cap-mb-4 ">
                                        <input
                                            id="infinity-checkbox"
                                            type="checkbox"
                                            name="infinity-checkbox"
                                            onChange={toggleInfinity}
                                            checked={isInfinity}
                                            className="cap-checkbox"
                                        />
                                        <label
                                            htmlFor="infinity-checkbox"
                                            className="cap-label"
                                        >
                                            <span className="cap-label-text">
                                                Unlimited approval
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cap-m-4 cap-modal-action">
                            <button
                                data-modal-hide="defaultModal"
                                type="submit"
                                className="cap-btn cap-btn-primary"
                            >
                                {isLoading ? (
                                    <>
                                        {isTxSend
                                            ? "Sending..."
                                            : "Waiting for confirmation..."}
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditApproval;
