/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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
} from "../../common";

export interface ISubscriptionFactoryInterface extends utils.Interface {
  functions: {
    "botAddress()": FunctionFragment;
    "executor()": FunctionFragment;
    "router()": FunctionFragment;
    "taxAccount()": FunctionFragment;
    "taxPercent()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "botAddress"
      | "executor"
      | "router"
      | "taxAccount"
      | "taxPercent"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "botAddress",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "executor", values?: undefined): string;
  encodeFunctionData(functionFragment: "router", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "taxAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "taxPercent",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "botAddress", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "executor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "router", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "taxAccount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "taxPercent", data: BytesLike): Result;

  events: {};
}

export interface ISubscriptionFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISubscriptionFactoryInterface;

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
    botAddress(overrides?: CallOverrides): Promise<[string]>;

    executor(overrides?: CallOverrides): Promise<[string]>;

    router(overrides?: CallOverrides): Promise<[string]>;

    taxAccount(overrides?: CallOverrides): Promise<[string]>;

    taxPercent(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  botAddress(overrides?: CallOverrides): Promise<string>;

  executor(overrides?: CallOverrides): Promise<string>;

  router(overrides?: CallOverrides): Promise<string>;

  taxAccount(overrides?: CallOverrides): Promise<string>;

  taxPercent(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    botAddress(overrides?: CallOverrides): Promise<string>;

    executor(overrides?: CallOverrides): Promise<string>;

    router(overrides?: CallOverrides): Promise<string>;

    taxAccount(overrides?: CallOverrides): Promise<string>;

    taxPercent(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    botAddress(overrides?: CallOverrides): Promise<BigNumber>;

    executor(overrides?: CallOverrides): Promise<BigNumber>;

    router(overrides?: CallOverrides): Promise<BigNumber>;

    taxAccount(overrides?: CallOverrides): Promise<BigNumber>;

    taxPercent(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    botAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    router(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    taxAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    taxPercent(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
