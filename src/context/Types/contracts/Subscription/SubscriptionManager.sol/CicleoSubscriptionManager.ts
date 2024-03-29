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

export interface CicleoSubscriptionManagerInterface extends utils.Interface {
  functions: {
    "bridgeSubscription(address,uint8,bool,uint256)": FunctionFragment;
    "cancel()": FunctionFragment;
    "changeSubscription(address,uint256,uint256,uint8)": FunctionFragment;
    "changeSubscriptionLimit(uint256)": FunctionFragment;
    "changeSubscriptionWithSwap(address,uint256,uint256,uint8,address,(address,address,address,address,uint256,uint256,uint256,uint256,address,bytes),(uint256,uint256,uint256,bytes)[])": FunctionFragment;
    "deleteSubManager()": FunctionFragment;
    "editAccount(address,uint256,uint8)": FunctionFragment;
    "factory()": FunctionFragment;
    "getAmountChangeSubscription(address,uint256)": FunctionFragment;
    "getUserSubscriptionId(address)": FunctionFragment;
    "getUserSubscriptionStatus(address)": FunctionFragment;
    "initialize(string,address,address,uint256)": FunctionFragment;
    "name()": FunctionFragment;
    "payFunctionWithSubToken(address,uint8,uint256,uint256)": FunctionFragment;
    "payFunctionWithSwap(address,address,(address,address,address,address,uint256,uint256,uint256,uint256,address,bytes),(uint256,uint256,uint256,bytes)[],uint8,uint256,uint256)": FunctionFragment;
    "setName(string)": FunctionFragment;
    "setToken(address)": FunctionFragment;
    "setTreasury(address)": FunctionFragment;
    "subscriptionDuration()": FunctionFragment;
    "subscriptionNumber()": FunctionFragment;
    "token()": FunctionFragment;
    "tokenAddress()": FunctionFragment;
    "tokenDecimals()": FunctionFragment;
    "tokenSymbol()": FunctionFragment;
    "treasury()": FunctionFragment;
    "users(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bridgeSubscription"
      | "cancel"
      | "changeSubscription"
      | "changeSubscriptionLimit"
      | "changeSubscriptionWithSwap"
      | "deleteSubManager"
      | "editAccount"
      | "factory"
      | "getAmountChangeSubscription"
      | "getUserSubscriptionId"
      | "getUserSubscriptionStatus"
      | "initialize"
      | "name"
      | "payFunctionWithSubToken"
      | "payFunctionWithSwap"
      | "setName"
      | "setToken"
      | "setTreasury"
      | "subscriptionDuration"
      | "subscriptionNumber"
      | "token"
      | "tokenAddress"
      | "tokenDecimals"
      | "tokenSymbol"
      | "treasury"
      | "users"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bridgeSubscription",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "cancel", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "changeSubscription",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "changeSubscriptionLimit",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeSubscriptionWithSwap",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      SwapDescriptionStruct,
      IOpenOceanCaller.CallDescriptionStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteSubManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "editAccount",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getAmountChangeSubscription",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserSubscriptionId",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserSubscriptionStatus",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "payFunctionWithSubToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "payFunctionWithSwap",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      SwapDescriptionStruct,
      IOpenOceanCaller.CallDescriptionStruct[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setName",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setTreasury",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "subscriptionDuration",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subscriptionNumber",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenDecimals",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSymbol",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "users",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "bridgeSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeSubscriptionLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeSubscriptionWithSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteSubManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "editAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAmountChangeSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserSubscriptionId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserSubscriptionStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "payFunctionWithSubToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payFunctionWithSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subscriptionDuration",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subscriptionNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenSymbol",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "users", data: BytesLike): Result;

  events: {
    "Cancel(address)": EventFragment;
    "EditSubscriptionLimit(address,uint256)": EventFragment;
    "SubscriptionEdited(address,uint256,uint256,bool)": EventFragment;
    "UserEdited(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Cancel"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EditSubscriptionLimit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubscriptionEdited"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UserEdited"): EventFragment;
}

export interface CancelEventObject {
  user: string;
}
export type CancelEvent = TypedEvent<[string], CancelEventObject>;

export type CancelEventFilter = TypedEventFilter<CancelEvent>;

export interface EditSubscriptionLimitEventObject {
  user: string;
  amountMaxPerPeriod: BigNumber;
}
export type EditSubscriptionLimitEvent = TypedEvent<
  [string, BigNumber],
  EditSubscriptionLimitEventObject
>;

export type EditSubscriptionLimitEventFilter =
  TypedEventFilter<EditSubscriptionLimitEvent>;

export interface SubscriptionEditedEventObject {
  user: string;
  subscriptionId: BigNumber;
  price: BigNumber;
  isActive: boolean;
}
export type SubscriptionEditedEvent = TypedEvent<
  [string, BigNumber, BigNumber, boolean],
  SubscriptionEditedEventObject
>;

export type SubscriptionEditedEventFilter =
  TypedEventFilter<SubscriptionEditedEvent>;

export interface UserEditedEventObject {
  user: string;
  subscriptionId: BigNumber;
  endDate: BigNumber;
}
export type UserEditedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  UserEditedEventObject
>;

export type UserEditedEventFilter = TypedEventFilter<UserEditedEvent>;

export interface CicleoSubscriptionManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CicleoSubscriptionManagerInterface;

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
    bridgeSubscription(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      isNewPeriod: PromiseOrValue<boolean>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancel(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeSubscription(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeSubscriptionLimit(
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeSubscriptionWithSwap(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deleteSubManager(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    editAccount(
      user: PromiseOrValue<string>,
      subscriptionEndDate: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    getAmountChangeSubscription(
      user: PromiseOrValue<string>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUserSubscriptionId(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number] & { subscriptionId: number }>;

    getUserSubscriptionStatus(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [number, boolean] & { subscriptionId: number; isActive: boolean }
    >;

    initialize(
      _name: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _treasury: PromiseOrValue<string>,
      _subscriptionDuration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    payFunctionWithSubToken(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    payFunctionWithSwap(
      user: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTreasury(
      _treasury: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    subscriptionDuration(overrides?: CallOverrides): Promise<[BigNumber]>;

    subscriptionNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    tokenAddress(overrides?: CallOverrides): Promise<[string]>;

    tokenDecimals(overrides?: CallOverrides): Promise<[number]>;

    tokenSymbol(overrides?: CallOverrides): Promise<[string]>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber, BigNumber, BigNumber, boolean] & {
        subscriptionEndDate: BigNumber;
        subscriptionId: number;
        subscriptionLimit: BigNumber;
        lastPaymentTime: BigNumber;
        totalPaidThisPeriod: BigNumber;
        canceled: boolean;
      }
    >;
  };

  bridgeSubscription(
    user: PromiseOrValue<string>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    isNewPeriod: PromiseOrValue<boolean>,
    price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancel(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeSubscription(
    user: PromiseOrValue<string>,
    oldPrice: PromiseOrValue<BigNumberish>,
    newPrice: PromiseOrValue<BigNumberish>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeSubscriptionLimit(
    amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeSubscriptionWithSwap(
    user: PromiseOrValue<string>,
    oldPrice: PromiseOrValue<BigNumberish>,
    newPrice: PromiseOrValue<BigNumberish>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    executor: PromiseOrValue<string>,
    desc: SwapDescriptionStruct,
    calls: IOpenOceanCaller.CallDescriptionStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deleteSubManager(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  editAccount(
    user: PromiseOrValue<string>,
    subscriptionEndDate: PromiseOrValue<BigNumberish>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  factory(overrides?: CallOverrides): Promise<string>;

  getAmountChangeSubscription(
    user: PromiseOrValue<string>,
    newPrice: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUserSubscriptionId(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  getUserSubscriptionStatus(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[number, boolean] & { subscriptionId: number; isActive: boolean }>;

  initialize(
    _name: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _treasury: PromiseOrValue<string>,
    _subscriptionDuration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  payFunctionWithSubToken(
    user: PromiseOrValue<string>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    endDate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  payFunctionWithSwap(
    user: PromiseOrValue<string>,
    executor: PromiseOrValue<string>,
    desc: SwapDescriptionStruct,
    calls: IOpenOceanCaller.CallDescriptionStruct[],
    subscriptionId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    endDate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setName(
    _name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setToken(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTreasury(
    _treasury: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  subscriptionDuration(overrides?: CallOverrides): Promise<BigNumber>;

  subscriptionNumber(overrides?: CallOverrides): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  tokenAddress(overrides?: CallOverrides): Promise<string>;

  tokenDecimals(overrides?: CallOverrides): Promise<number>;

  tokenSymbol(overrides?: CallOverrides): Promise<string>;

  treasury(overrides?: CallOverrides): Promise<string>;

  users(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, number, BigNumber, BigNumber, BigNumber, boolean] & {
      subscriptionEndDate: BigNumber;
      subscriptionId: number;
      subscriptionLimit: BigNumber;
      lastPaymentTime: BigNumber;
      totalPaidThisPeriod: BigNumber;
      canceled: boolean;
    }
  >;

  callStatic: {
    bridgeSubscription(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      isNewPeriod: PromiseOrValue<boolean>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancel(overrides?: CallOverrides): Promise<void>;

    changeSubscription(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeSubscriptionLimit(
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    changeSubscriptionWithSwap(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deleteSubManager(overrides?: CallOverrides): Promise<void>;

    editAccount(
      user: PromiseOrValue<string>,
      subscriptionEndDate: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    factory(overrides?: CallOverrides): Promise<string>;

    getAmountChangeSubscription(
      user: PromiseOrValue<string>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserSubscriptionId(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    getUserSubscriptionStatus(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [number, boolean] & { subscriptionId: number; isActive: boolean }
    >;

    initialize(
      _name: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _treasury: PromiseOrValue<string>,
      _subscriptionDuration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    payFunctionWithSubToken(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    payFunctionWithSwap(
      user: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTreasury(
      _treasury: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    subscriptionDuration(overrides?: CallOverrides): Promise<BigNumber>;

    subscriptionNumber(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    tokenAddress(overrides?: CallOverrides): Promise<string>;

    tokenDecimals(overrides?: CallOverrides): Promise<number>;

    tokenSymbol(overrides?: CallOverrides): Promise<string>;

    treasury(overrides?: CallOverrides): Promise<string>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number, BigNumber, BigNumber, BigNumber, boolean] & {
        subscriptionEndDate: BigNumber;
        subscriptionId: number;
        subscriptionLimit: BigNumber;
        lastPaymentTime: BigNumber;
        totalPaidThisPeriod: BigNumber;
        canceled: boolean;
      }
    >;
  };

  filters: {
    "Cancel(address)"(user?: PromiseOrValue<string> | null): CancelEventFilter;
    Cancel(user?: PromiseOrValue<string> | null): CancelEventFilter;

    "EditSubscriptionLimit(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amountMaxPerPeriod?: null
    ): EditSubscriptionLimitEventFilter;
    EditSubscriptionLimit(
      user?: PromiseOrValue<string> | null,
      amountMaxPerPeriod?: null
    ): EditSubscriptionLimitEventFilter;

    "SubscriptionEdited(address,uint256,uint256,bool)"(
      user?: PromiseOrValue<string> | null,
      subscriptionId?: PromiseOrValue<BigNumberish> | null,
      price?: null,
      isActive?: null
    ): SubscriptionEditedEventFilter;
    SubscriptionEdited(
      user?: PromiseOrValue<string> | null,
      subscriptionId?: PromiseOrValue<BigNumberish> | null,
      price?: null,
      isActive?: null
    ): SubscriptionEditedEventFilter;

    "UserEdited(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      subscriptionId?: PromiseOrValue<BigNumberish> | null,
      endDate?: null
    ): UserEditedEventFilter;
    UserEdited(
      user?: PromiseOrValue<string> | null,
      subscriptionId?: PromiseOrValue<BigNumberish> | null,
      endDate?: null
    ): UserEditedEventFilter;
  };

  estimateGas: {
    bridgeSubscription(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      isNewPeriod: PromiseOrValue<boolean>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancel(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeSubscription(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeSubscriptionLimit(
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeSubscriptionWithSwap(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deleteSubManager(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    editAccount(
      user: PromiseOrValue<string>,
      subscriptionEndDate: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getAmountChangeSubscription(
      user: PromiseOrValue<string>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserSubscriptionId(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserSubscriptionStatus(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _name: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _treasury: PromiseOrValue<string>,
      _subscriptionDuration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    payFunctionWithSubToken(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    payFunctionWithSwap(
      user: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTreasury(
      _treasury: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    subscriptionDuration(overrides?: CallOverrides): Promise<BigNumber>;

    subscriptionNumber(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    tokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    tokenDecimals(overrides?: CallOverrides): Promise<BigNumber>;

    tokenSymbol(overrides?: CallOverrides): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridgeSubscription(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      isNewPeriod: PromiseOrValue<boolean>,
      price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancel(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeSubscription(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeSubscriptionLimit(
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeSubscriptionWithSwap(
      user: PromiseOrValue<string>,
      oldPrice: PromiseOrValue<BigNumberish>,
      newPrice: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deleteSubManager(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    editAccount(
      user: PromiseOrValue<string>,
      subscriptionEndDate: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAmountChangeSubscription(
      user: PromiseOrValue<string>,
      newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserSubscriptionId(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserSubscriptionStatus(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _name: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _treasury: PromiseOrValue<string>,
      _subscriptionDuration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payFunctionWithSubToken(
      user: PromiseOrValue<string>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    payFunctionWithSwap(
      user: PromiseOrValue<string>,
      executor: PromiseOrValue<string>,
      desc: SwapDescriptionStruct,
      calls: IOpenOceanCaller.CallDescriptionStruct[],
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      endDate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setName(
      _name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTreasury(
      _treasury: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    subscriptionDuration(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    subscriptionNumber(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenDecimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenSymbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
