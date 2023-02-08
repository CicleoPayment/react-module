import React, { useState, FC, useEffect } from "react";
import LogoBlue from "@assets/logo.png";

type ConfirmationModal = {
    show: boolean;
    onClose: () => void;
    confirmationMessageHeader: string;
    confirmationMessage: string;
    onConfirm: () => void;
};

const ConfirmationModal: FC<ConfirmationModal> = ({ show, onClose, confirmationMessageHeader, confirmationMessage, onConfirm }) => {
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
                                Ciclo Payment | Confirmation
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

                    
                    <div className="cap-flex cap-w-full cap-justify-between cap-space-y-4 cap-py-4 cap-px-5 cap-leading-[1.2] cap-flex-col" >
                        <span className="cap-font-bold cap-text-2xl">{confirmationMessageHeader}</span>
                        <span className="cap-font-semibold cap-text-xl">{ confirmationMessage }</span>
                    </div>

                    
                    {/* <!-- Modal footer --> */}
                    <div className="cap-flex cap-items-center cap-p-6 cap-space-x-2 cap-border-t cap-border-gray-200 cap-rounded-b dark:cap-border-gray-600">
                        <button
                            data-modal-hide="defaultModal"
                            type="button"
                            className="cap-text-white cap-bg-blue-700 hover:cap-bg-blue-800 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-font-medium cap-rounded-lg cap-text-sm cap-px-5 cap-py-2.5 cap-text-center dark:cap-bg-blue-600 dark:hover:cap-bg-blue-700 dark:focus:cap-ring-blue-800"
                            onClick={() => {
                                onClose()
                                onConfirm()
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            data-modal-hide="defaultModal"
                            type="button"
                            className="cap-text-gray-500 cap-bg-white hover:cap-bg-gray-100 focus:cap-ring-4 focus:cap-outline-none focus:cap-ring-blue-300 cap-rounded-lg cap-border cap-border-gray-200 cap-text-sm cap-font-medium cap-px-5 cap-py-2.5 hover:cap-text-gray-900 focus:cap-z-10 dark:cap-bg-gray-700 dark:cap-text-gray-300 dark:cap-border-gray-500 dark:hover:cap-text-white dark:hover:cap-bg-gray-600 dark:focus:cap-ring-gray-600"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;