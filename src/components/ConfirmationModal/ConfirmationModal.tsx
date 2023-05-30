import React, { FC } from "react";
import TextWhite from "@assets/logo_text_white.svg";

type ConfirmationModal = {
    name: string;
    confirmationMessageHeader: string;
    confirmationMessage: string;
    onConfirm: () => void;
};

const ConfirmationModal: FC<ConfirmationModal> = ({
    name,
    confirmationMessageHeader,
    confirmationMessage,
    onConfirm,
}) => {
    return (
        <>
            <input
                type="checkbox"
                id={"cicleo-confirm-modal-" + name}
                className="cap-modal-toggle"
            />
            <div className="cap-modal cap-modal-bottom sm:cap-modal-middle ">
                <div className="cap-modal-box !cap-p-0 cap-relative cap-w-full !cap-max-w-2xl">
                    <label
                        htmlFor={"cicleo-confirm-modal-" + name}
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
                            {confirmationMessageHeader}
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
                                <span>{confirmationMessage}</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div className="cap-modal-action cap-m-4">
                        <label
                            className="cap-btn cap-btn-primary"
                            htmlFor={"cicleo-confirm-modal-" + name}
                            onClick={() => onConfirm()}
                        >
                            Confirm
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;
