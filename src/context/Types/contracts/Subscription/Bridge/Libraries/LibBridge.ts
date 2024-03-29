/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export type PaymentParametersStruct = {
  chainId: PromiseOrValue<BigNumberish>;
  subscriptionManagerId: PromiseOrValue<BigNumberish>;
  subscriptionId: PromiseOrValue<BigNumberish>;
  priceInSubToken: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
};

export type PaymentParametersStructOutput = [
  BigNumber,
  BigNumber,
  number,
  BigNumber,
  string
] & {
  chainId: BigNumber;
  subscriptionManagerId: BigNumber;
  subscriptionId: number;
  priceInSubToken: BigNumber;
  token: string;
};

export interface LibBridgeInterface extends utils.Interface {
  functions: {
    "getSubscribeDestinationCalldata((uint256,uint256,uint8,uint256,IERC20),address,address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getSubscribeDestinationCalldata"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getSubscribeDestinationCalldata",
    values: [
      PaymentParametersStruct,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getSubscribeDestinationCalldata",
    data: BytesLike
  ): Result;

  events: {};
}

export interface LibBridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LibBridgeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getSubscribeDestinationCalldata(
      paymentParams: PaymentParametersStruct,
      user: PromiseOrValue<string>,
      referral: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  getSubscribeDestinationCalldata(
    paymentParams: PaymentParametersStruct,
    user: PromiseOrValue<string>,
    referral: PromiseOrValue<string>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getSubscribeDestinationCalldata(
      paymentParams: PaymentParametersStruct,
      user: PromiseOrValue<string>,
      referral: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getSubscribeDestinationCalldata(
      paymentParams: PaymentParametersStruct,
      user: PromiseOrValue<string>,
      referral: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getSubscribeDestinationCalldata(
      paymentParams: PaymentParametersStruct,
      user: PromiseOrValue<string>,
      referral: PromiseOrValue<string>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
