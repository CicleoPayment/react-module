import React, { FC } from "react";
import { connect } from '@wagmi/core'
import { InjectedConnector, configureChains, createClient } from "@wagmi/core";
import { fantom, polygon } from "@wagmi/core/chains";
import { publicProvider } from '@wagmi/core/providers/public'

type Network = {
    name: string,
    chainId: number,
    rpcUrls: string,
    image: string,
}


type SelectNetwork = {
    handleSelectNetwork: (chainId: number) => void,
    _chains: Network[]
};

const SelectNetwork: FC<SelectNetwork> = ({
    handleSelectNetwork,
    _chains
}) => { 
    
    const { chains, provider } = configureChains(
        [fantom, polygon],
        [publicProvider()],
    )

    const client = createClient({
        provider,
        connectors: [new InjectedConnector({ chains })],
    })

    const _handleSelectNetwork = async (chain: Network) => {
        const result = await connect({
            chainId: chain.chainId,
            connector: new InjectedConnector(),
        })

        if (result) {
            handleSelectNetwork(chain.chainId)
        }
          
    }

    return (
        <div className="cap-pb-10">
            <div className="cap-flex cap-flex-col cap-w-full cap-items-center cap-py-4">
                <h3 className="cap-text-lg cap-font-bold">Select your network where pay</h3>
            </div>
            <div className="cap-grid cap-px-10 cap-grid-cols-4 cap-gap-4">
                {_chains.map((chain, index) => 
                    <button className="cap-bg-base-300 cap-rounded-xl cap-flex cap-flex-col cap-items-center cap-justify-center cap-py-4 cap-space-y-4" onClick={() => _handleSelectNetwork(chain)} key={index}>
                        <img
                            src={chain.image}
                            alt={chain.name}
                            width={60}
                            height={60}
                        />

                        <span>{chain.name}</span>
                    </button>
                )}
            </div>
        </div>
    )
};

export default SelectNetwork;