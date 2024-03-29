/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  LibAdmin,
  LibAdminInterface,
} from "../../../../../contracts/Subscription/Bridge/Libraries/LibAdmin";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
] as const;

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212202395ca1cb5e4a0bc405bddc79bcb2d3240e15372e1cf60a7b64716391771e04c64736f6c63430008090033";

type LibAdminConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LibAdminConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LibAdmin__factory extends ContractFactory {
  constructor(...args: LibAdminConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LibAdmin> {
    return super.deploy(overrides || {}) as Promise<LibAdmin>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): LibAdmin {
    return super.attach(address) as LibAdmin;
  }
  override connect(signer: Signer): LibAdmin__factory {
    return super.connect(signer) as LibAdmin__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LibAdminInterface {
    return new utils.Interface(_abi) as LibAdminInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LibAdmin {
    return new Contract(address, _abi, signerOrProvider) as LibAdmin;
  }
}
