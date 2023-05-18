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
  PayableOverrides,
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
} from "../../common";

export type StargateDataStruct = {
  dstPoolId: PromiseOrValue<BigNumberish>;
  minAmountLD: PromiseOrValue<BigNumberish>;
  dstGasForCall: PromiseOrValue<BigNumberish>;
  lzFee: PromiseOrValue<BigNumberish>;
  refundAddress: PromiseOrValue<string>;
  callTo: PromiseOrValue<BytesLike>;
  callData: PromiseOrValue<BytesLike>;
};

export type StargateDataStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  string,
  string,
  string
] & {
  dstPoolId: BigNumber;
  minAmountLD: BigNumber;
  dstGasForCall: BigNumber;
  lzFee: BigNumber;
  refundAddress: string;
  callTo: string;
  callData: string;
};

export declare namespace ILiFi {
  export type BridgeDataStruct = {
    transactionId: PromiseOrValue<BytesLike>;
    bridge: PromiseOrValue<string>;
    integrator: PromiseOrValue<string>;
    referrer: PromiseOrValue<string>;
    sendingAssetId: PromiseOrValue<string>;
    receiver: PromiseOrValue<string>;
    minAmount: PromiseOrValue<BigNumberish>;
    destinationChainId: PromiseOrValue<BigNumberish>;
    hasSourceSwaps: PromiseOrValue<boolean>;
    hasDestinationCall: PromiseOrValue<boolean>;
  };

  export type BridgeDataStructOutput = [
    string,
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    boolean,
    boolean
  ] & {
    transactionId: string;
    bridge: string;
    integrator: string;
    referrer: string;
    sendingAssetId: string;
    receiver: string;
    minAmount: BigNumber;
    destinationChainId: BigNumber;
    hasSourceSwaps: boolean;
    hasDestinationCall: boolean;
  };
}

export declare namespace LibSwap {
  export type SwapDataStruct = {
    callTo: PromiseOrValue<string>;
    approveTo: PromiseOrValue<string>;
    sendingAssetId: PromiseOrValue<string>;
    receivingAssetId: PromiseOrValue<string>;
    fromAmount: PromiseOrValue<BigNumberish>;
    callData: PromiseOrValue<BytesLike>;
    requiresDeposit: PromiseOrValue<boolean>;
  };

  export type SwapDataStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    string,
    boolean
  ] & {
    callTo: string;
    approveTo: string;
    sendingAssetId: string;
    receivingAssetId: string;
    fromAmount: BigNumber;
    callData: string;
    requiresDeposit: boolean;
  };
}

export interface CicleoSubscriptionBridgeManagerInterface
  extends utils.Interface {
  functions: {
    "changeDestinationCalldata(bytes,bytes)": FunctionFragment;
    "changeSubscriptionLimit(uint256,uint256,uint256)": FunctionFragment;
    "lifi()": FunctionFragment;
    "payFunctionWithBridge(uint256,uint256,uint8,uint256,address,(bytes32,string,string,address,address,address,uint256,uint256,bool,bool),(address,address,address,address,uint256,bytes,bool)[],(uint256,uint256,uint256,uint256,address,bytes,bytes),bytes)": FunctionFragment;
    "usersSubscriptionLimit(uint256,uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "changeDestinationCalldata"
      | "changeSubscriptionLimit"
      | "lifi"
      | "payFunctionWithBridge"
      | "usersSubscriptionLimit"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "changeDestinationCalldata",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeSubscriptionLimit",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "lifi", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "payFunctionWithBridge",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      ILiFi.BridgeDataStruct,
      LibSwap.SwapDataStruct[],
      StargateDataStruct,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "usersSubscriptionLimit",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "changeDestinationCalldata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeSubscriptionLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lifi", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "payFunctionWithBridge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "usersSubscriptionLimit",
    data: BytesLike
  ): Result;

  events: {
    "EditSubscriptionLimit(address,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EditSubscriptionLimit"): EventFragment;
}

export interface EditSubscriptionLimitEventObject {
  user: string;
  chainId: BigNumber;
  subscriptionManagerId: BigNumber;
  amountMaxPerPeriod: BigNumber;
}
export type EditSubscriptionLimitEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  EditSubscriptionLimitEventObject
>;

export type EditSubscriptionLimitEventFilter =
  TypedEventFilter<EditSubscriptionLimitEvent>;

export interface CicleoSubscriptionBridgeManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CicleoSubscriptionBridgeManagerInterface;

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
    changeDestinationCalldata(
      originalCalldata: PromiseOrValue<BytesLike>,
      dstCalldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { finalCallData: string }>;

    changeSubscriptionLimit(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    lifi(overrides?: CallOverrides): Promise<[string]>;

    payFunctionWithBridge(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _bridgeData: ILiFi.BridgeDataStruct,
      _swapData: LibSwap.SwapDataStruct[],
      _stargateData: StargateDataStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    usersSubscriptionLimit(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  changeDestinationCalldata(
    originalCalldata: PromiseOrValue<BytesLike>,
    dstCalldata: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  changeSubscriptionLimit(
    chainId: PromiseOrValue<BigNumberish>,
    subscriptionManagerId: PromiseOrValue<BigNumberish>,
    amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  lifi(overrides?: CallOverrides): Promise<string>;

  payFunctionWithBridge(
    chainId: PromiseOrValue<BigNumberish>,
    subscriptionManagerId: PromiseOrValue<BigNumberish>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    _token: PromiseOrValue<string>,
    _bridgeData: ILiFi.BridgeDataStruct,
    _swapData: LibSwap.SwapDataStruct[],
    _stargateData: StargateDataStruct,
    signature: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  usersSubscriptionLimit(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<BigNumberish>,
    arg2: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    changeDestinationCalldata(
      originalCalldata: PromiseOrValue<BytesLike>,
      dstCalldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    changeSubscriptionLimit(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    lifi(overrides?: CallOverrides): Promise<string>;

    payFunctionWithBridge(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _bridgeData: ILiFi.BridgeDataStruct,
      _swapData: LibSwap.SwapDataStruct[],
      _stargateData: StargateDataStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    usersSubscriptionLimit(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "EditSubscriptionLimit(address,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      chainId?: PromiseOrValue<BigNumberish> | null,
      subscriptionManagerId?: PromiseOrValue<BigNumberish> | null,
      amountMaxPerPeriod?: null
    ): EditSubscriptionLimitEventFilter;
    EditSubscriptionLimit(
      user?: PromiseOrValue<string> | null,
      chainId?: PromiseOrValue<BigNumberish> | null,
      subscriptionManagerId?: PromiseOrValue<BigNumberish> | null,
      amountMaxPerPeriod?: null
    ): EditSubscriptionLimitEventFilter;
  };

  estimateGas: {
    changeDestinationCalldata(
      originalCalldata: PromiseOrValue<BytesLike>,
      dstCalldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeSubscriptionLimit(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    lifi(overrides?: CallOverrides): Promise<BigNumber>;

    payFunctionWithBridge(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _bridgeData: ILiFi.BridgeDataStruct,
      _swapData: LibSwap.SwapDataStruct[],
      _stargateData: StargateDataStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    usersSubscriptionLimit(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    changeDestinationCalldata(
      originalCalldata: PromiseOrValue<BytesLike>,
      dstCalldata: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeSubscriptionLimit(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      amountMaxPerPeriod: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    lifi(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payFunctionWithBridge(
      chainId: PromiseOrValue<BigNumberish>,
      subscriptionManagerId: PromiseOrValue<BigNumberish>,
      subscriptionId: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      _token: PromiseOrValue<string>,
      _bridgeData: ILiFi.BridgeDataStruct,
      _swapData: LibSwap.SwapDataStruct[],
      _stargateData: StargateDataStruct,
      signature: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    usersSubscriptionLimit(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<BigNumberish>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
