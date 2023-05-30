import React from "react";

type LoadingState = {
    text: string,
}

const LoadingState: React.FC<LoadingState> = ({ text }) => {
    return (
        <div className="cap-flex cap-items-center cap-justify-center cap-flex-grow cap-w-full cap-h-full cap-p-20 cap-flex-col cap-space-y-4">
            <span className="cap-font-medium cap-text-xl cap-text-center">
                {text}
            </span>
            <progress className="cap-w-56 cap-progress"></progress>
        </div>
    )
}

export default LoadingState;