# Cicleo React Module

This module is to integrate Cicleo into your website
This contain **Payment Button** and **Manage Account Button**

## Installation

    npm i @cicleo/react-module

## Usage of the Payment Button

First import this on the top of your file who will use the Payment Button

    import  "@cicleo/react-module/dist/index.css";
    import { PaymentButton } from  "@cicleo/react-module";

Then integrate it as simply 

    <PaymentButton
		config={{56:  5}}
		subscriptionId={1} //Subscription id is the id of the subscription (see on dapp)
		signer={signer as ethers.providers.JsonRpcSigner}
	/>

Per exemple this configuration will config the button to use the **#5 Subscription Manager** on the **BSC network**

> To use **multiples chains** just put Network ID and the related Subscription Manager ID

	 <PaymentButton
		config={{56:  5, 43114: 6}}//Will use subscription manager 5 on BSC and subscription manager 6 on Avalanche
		subscriptionId={1} //Subscription id is the id of the subscription (see on dapp)
		signer={signer as ethers.providers.JsonRpcSigner}
	/>
	
> If you use wagmi you can simply use that for signer object

	import { useSigner, useNetwork } from  "wagmi";
	let { data: signer } = useSigner();

And there you go !

## Usage of the Manage your Account Button


First import this on the top of your file who will use the Payment Button

    import  "@cicleo/react-module/dist/index.css";
    import { AccountBlock } from  "@cicleo/react-module";

Then integrate it as simply 

    <AccountBlock
		config={{56:  5}}
		signer={signer as ethers.providers.JsonRpcSigner}
	/>

Per exemple this configuration will config the button to use the **#5 Subscription Manager** on the **BSC network**

> To use **multiples chains** just put Network ID and the related Subscription Manager ID

	 <AccountBlock
		config={{56:  5, 43114: 6}}//Will use subscription manager 5 on BSC and subscription manager 6 on Avalanche
		signer={signer as ethers.providers.JsonRpcSigner}
	/>
> If you use wagmi you can simply use that for signer object

	import { useSigner, useNetwork } from  "wagmi";
	let { data: signer } = useSigner();

And there you go !

## Find my Subscription Manager ID ?

First go on https://cicleo.io/subscription/manage and click on your Subscription Manager, then you'll find it on the URL of the page

![enter image description here](https://cdn.discordapp.com/attachments/970759610476666910/1087367222793609296/CleanShot_2023-03-20_at_14.28.152x.png)
