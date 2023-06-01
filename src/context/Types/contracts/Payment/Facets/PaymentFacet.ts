/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export type SwapDescriptionStruct = {
  srcToken: PromiseOrValue<string>;
  dstToken: PromiseOrValue<string>;
  srcReceiver: PromiseOrValue<string>;
  dstReceiver: PromiseOrValue<string>;
  amount: PromiseOrValue<BigNumberish>;
  minReturnAmount: PromiseOrValue<BigNumberish>;
  guaranteedAmount: PromiseOrValue<BigNumberish>;
  flags: PromiseOrValue<BigNumberish>;
  referrer: PromiseOrValue<string>;
  permit: PromiseOrValue<BytesLike>;
};

export type SwapDescriptionStructOutput = [
  string,
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  string,
  string
] & {
  srcToken: string;
  dstToken: string;
  srcReceiver: string;
  dstReceiver: string;
  amount: BigNumber;
  minReturnAmount: BigNumber;
  guaranteedAmount: BigNumber;
  flags: BigNumber;
  referrer: string;
  permit: string;
};

export declare namespace IOpenOceanCaller {
  export type CallDescriptionStruct = {
    target: PromiseOrValue<BigNumberish>;
    gasLimit: PromiseOrValue<BigNumberish>;
    value: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
  };

  export type CallDescriptionStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    target: BigNumber;
    gasLimit: BigNumber;
    value: BigNumber;
    data: string;
  };
}

export interface PaymentFacetInterface extends utils.Interface {
  functions: {
    "getRouterSwap()": FunctionFragment;
    "payWithCicleo(uint256,uint256,string)": FunctionFragment;
    "payWithCicleoWithSwap(uint256,uint256,string,address,(address,address,address,address,uint256,uint256,uint256,uint256,address,bytes),(uint256,uint256,uint256,bytes)[])": FunctionFragment;
    "setRouterSwap(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getRouterSwap"
      | "payWithCicleo"
      | "payWithCicleoWithSwap"
      | "setRouterSwap"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getRouterSwap",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "payWithCicleo",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "payWithCicleoWithSwap",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      SwapDescriptionStruct,
      IOpenOceanCaller.CallDescriptionStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setRouterSwap",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getRouterSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payWithCicleo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payWithCicleoWithSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRouterSwap",
    data: BytesLike
  ): Result;

  events: {
    "PaymentDoneWithCicleo(uint256,address,string,uint256)": EventFragment;
    "PaymentManagerCreated(uint256,address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PaymentDoneWithCicleo"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaymentManagerCreated"): EventFragment;
}

export interface PaymentDoneWithCicleoEventObject {
  paymentManagerId: BigNumber;
  user: string;
  nameOfPayment: string;
  price: BigNumber;
}
export type PaymentDoneWithCicleoEvent = TypedEvent<
  [BigNumber, string, string, BigNumber],
  PaymentDoneWithCicleoEventObject
>;

export type PaymentDoneWithCicleoEventFilter =
  TypedEventFilter<PaymentDoneWithCicleoEvent>;

export interface PaymentManagerCreatedEventObject {
  paymentManagerId: BigNumber;
  user: string;
  paymentToken: string;
  treasuryAccount: string;
}
export type PaymentManagerCreatedEvent = TypedEvent<
  [BigNumber, string, string, string],
  PaymentManagerCreatedEventObject
>;

export type PaymentManagerCreatedEventFilter =
  TypedEventFilter<PaymentManagerCreatedEvent>;

export interface PaymentFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PaymentFacetInterface;

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
    getRouterSwap(overrides?: CallOverrides): Promise<[string]>;

    payWithCicleo(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    payWithCicleoWithSwap(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRouterSwap(
      routerSwap: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getRouterSwap(overrides?: CallOverrides): Promise<string>;

  payWithCicleo(
    paymentManagerId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    nameOfPayment: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  payWithCicleoWithSwap(
    paymentManagerId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    nameOfPayment: PromiseOrValue<string>,
    executor: PromiseOrValue<string>,
    desc: SwapDescriptionStruct,
    calls: IOpenOceanCaller.CallDescriptionStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRouterSwap(
    routerSwap: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getRouterSwap(overrides?: CallOverrides): Promise<string>;

    payWithCicleo(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    payWithCicleoWithSwap(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    setRouterSwap(
      routerSwap: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PaymentDoneWithCicleo(uint256,address,string,uint256)"(
      paymentManagerId?: PromiseOrValue<BigNumberish> | null,
      user?: PromiseOrValue<string> | null,
      nameOfPayment?: PromiseOrValue<string> | null,
      price?: null
    ): PaymentDoneWithCicleoEventFilter;
    PaymentDoneWithCicleo(
      paymentManagerId?: PromiseOrValue<BigNumberish> | null,
      user?: PromiseOrValue<string> | null,
      nameOfPayment?: PromiseOrValue<string> | null,
      price?: null
    ): PaymentDoneWithCicleoEventFilter;

    "PaymentManagerCreated(uint256,address,address,address)"(
      paymentManagerId?: PromiseOrValue<BigNumberish> | null,
      user?: PromiseOrValue<string> | null,
      paymentToken?: PromiseOrValue<string> | null,
      treasuryAccount?: null
    ): PaymentManagerCreatedEventFilter;
    PaymentManagerCreated(
      paymentManagerId?: PromiseOrValue<BigNumberish> | null,
      user?: PromiseOrValue<string> | null,
      paymentToken?: PromiseOrValue<string> | null,
      treasuryAccount?: null
    ): PaymentManagerCreatedEventFilter;
  };

  estimateGas: {
    getRouterSwap(overrides?: CallOverrides): Promise<BigNumber>;

    payWithCicleo(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    payWithCicleoWithSwap(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRouterSwap(
      routerSwap: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getRouterSwap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payWithCicleo(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    payWithCicleoWithSwap(
      paymentManagerId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      nameOfPayment: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRouterSwap(
      routerSwap: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
