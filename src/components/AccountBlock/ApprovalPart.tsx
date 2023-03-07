import { ethers } from "ethers";
import React, { FC } from "react";

type ApprovalPart = {
    subManager: any;
};

const ApprovalPart: FC<ApprovalPart> = ({
    subManager,
}) => {
    return (
        <div className="cap-space-y-3 cap-flex-grow cap-mb-4">
            <div className="cap-flex cap-flex-col cap-items-center">
                <span className="cap-text-xl cap-font-semibold cap-text-center cap-grow cap-w-full">
                    Approval Settings
                </span>
                <div className="cap-divider !cap-mt-0 !cap-mb-0 "></div>
            </div>

            <div className="cap-flex cap-flex-col">
                <span className="cap-font-semibold cap-text-md">
                    {subManager.coinSymbol} Approval
                </span>
                <span className="cap-text-gray-600">
                    {subManager.tokenApproval.eq(ethers.constants.MaxUint256)
                        ? "Infinity"
                        : ethers.utils.formatUnits(
                              subManager.tokenApproval,
                              subManager.coinDecimals
                          )}
                </span>

                <label
                    htmlFor="cicleo-edit-approval-token"
                    className="cap-mt-3 cap-btn cap-btn-primary"
                >
                    Edit
                </label>
            </div>
            <div className="cap-flex cap-flex-col cap-mt-4">
                <span className="cap-font-semibold cap-text-md">
                    Subscription Limit
                </span>
                <span className="cap-text-gray-600">
                    {subManager.allowance.eq(ethers.constants.MaxUint256)
                        ? "Infinity"
                        : ethers.utils.formatUnits(
                              subManager.allowance,
                              subManager.coinDecimals
                          )}{" "}
                    {subManager.coinSymbol} per month
                </span>

                <label
                    htmlFor="cicleo-edit-approval-subscription"
                    className="cap-mt-3 cap-btn cap-btn-primary"
                >
                    Edit
                </label>
            </div>
        </div>
    );
};

export default ApprovalPart;
