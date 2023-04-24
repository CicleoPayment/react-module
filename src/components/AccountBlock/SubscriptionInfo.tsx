import React, { FC } from "react";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

type SubscriptionInfo = {
    endCycleDate: Date;
};

const SubscriptionInfo: FC<SubscriptionInfo> = ({ endCycleDate }) => {
    return (
        <div className="cap-space-y-3 cap-flex-grow">
            <div className="cap-flex cap-items-center cap-flex-col">
                <span className="cap-text-xl cap-font-semibold cap-grow cap-text-center">
                    Subscription Info
                </span>
                <div className="cap-divider !cap-mt-0 !cap-mb-0 "></div>
            </div>

            <div className="cap-flex cap-flex-col cap-space-y-1">
                <span className="cap-font-semibold cap-text-md">
                    Next Due Date
                </span>
                <div>
                    <div>
                        in{" "}
                        <span className="cap-font-mono cap-text-2xl cap-countdown">
                            {endCycleDate.getTime() == 9999999999000 ? (
                                "∞"
                            ) : (
                                <span
                                    style={{
                                        // @ts-ignore
                                        "--value": Math.floor(
                                            (endCycleDate.getTime() -
                                                Date.now()) /
                                                (1000 * 3600 * 24)
                                        ),
                                    }}
                                ></span>
                            )}
                        </span>{" "}
                        days
                    </div>
                    {endCycleDate.getTime() != 9999999999000 && (
                        <span className="cap-text-gray-600">
                            {capitalizeFirstLetter(
                                endCycleDate.toLocaleString(
                                    window.navigator.language,
                                    {
                                        weekday: "long",
                                    }
                                )
                            )}{" "}
                            {endCycleDate.getDay()}{" "}
                            {capitalizeFirstLetter(
                                endCycleDate.toLocaleString(
                                    window.navigator.language,
                                    {
                                        month: "long",
                                    }
                                )
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionInfo;
