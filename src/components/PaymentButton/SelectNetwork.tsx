import { token } from "@context/Types/@openzeppelin/contracts";
import { formatNumber } from "@context/contract";
import { BigNumber, Signer, utils, providers } from "ethers";
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
};

const SelectNetwork: FC<SelectNetwork> = ({
    handleSelectNetwork
}) => { 

    let _chains: Network[] = [
        {
            name: "Fantom",
            chainId: 250,
            rpcUrls: "https://rpc.ftm.tools/",
            image: "https://cryptologos.cc/logos/fantom-ftm-logo.png?v=013",
        }, {
            name: "Polygon",
            chainId: 137,
            rpcUrls: "https://rpc-mainnet.maticvigil.com/",
            image: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=013",
        }
    ]

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
                <h3 className="cap-text-xl cap-font-bold">Select your network where pay</h3>
            </div>
            <div className="cap-grid cap-px-10 cap-grid-cols-4 cap-gap-4">
                {_chains.map((chain, index) => 
                    <button className="" onClick={() => _handleSelectNetwork(chain)} key={index}>
                        <img
                            src={chain.image}
                            alt={chain.name}
                            width={100}
                            height={100}
                        />
                    </button>
                )}
            </div>
        </div>
    )
};

export default SelectNetwork;