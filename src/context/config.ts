export interface IConfig {
    bscTest?: IConfigNetwork;
}

export interface IConfigNetwork {
    chainId?: number;
    networkName?: string;
    rpc?: string;
    blockUrl?: string;
    busdAddress?: string;
    subscriptionFactoryAddress?: string;
}

const config: IConfig = {
    "bscTest": {
        "chainId": 97,
        "networkName": "binance-testnet",
        "rpc": "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "blockUrl": "https://testnet.bscscan.com/",
        "busdAddress": "0x4039899ED32D7B76f600270fb75aaFa5c9Cb01E9",
        "subscriptionFactoryAddress": "0x1aC8caC1A90BE34dE78EB5961E09D1f989A8E252",
    },
}

export default config;