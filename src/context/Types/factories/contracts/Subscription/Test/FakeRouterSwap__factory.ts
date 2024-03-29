/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  FakeRouterSwap,
  FakeRouterSwapInterface,
} from "../../../../contracts/Subscription/Test/FakeRouterSwap";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IOpenOceanCaller",
        name: "executor",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "srcToken",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "dstToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "srcReceiver",
            type: "address",
          },
          {
            internalType: "address",
            name: "dstReceiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minReturnAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "guaranteedAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "flags",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "permit",
            type: "bytes",
          },
        ],
        internalType: "struct SwapDescription",
        name: "desc",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IOpenOceanCaller.CallDescription[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610445806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806390411a3214610030575b600080fd5b61004361003e3660046102bc565b610045565b005b8251604080850151608086015191516323b872dd60e01b81526001600160a01b0391821660048201523060248201526044810192909252909116906323b872dd90606401602060405180830381600087803b1580156100a357600080fd5b505af11580156100b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100db91906103e6565b506020830151606084015160808501516040516323b872dd60e01b81523060048201526001600160a01b03928316602482015260448101919091529116906323b872dd90606401602060405180830381600087803b15801561013c57600080fd5b505af1158015610150573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061017491906103e6565b5050505050565b6001600160a01b038116811461019057600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b604051610140810167ffffffffffffffff811182821017156101cd576101cd610193565b60405290565b80356101de8161017b565b919050565b600082601f8301126101f457600080fd5b813567ffffffffffffffff8082111561020f5761020f610193565b604051601f8301601f19908116603f0116810190828211818310171561023757610237610193565b8160405283815286602085880101111561025057600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008083601f84011261028257600080fd5b50813567ffffffffffffffff81111561029a57600080fd5b6020830191508360208260051b85010111156102b557600080fd5b9250929050565b600080600080606085870312156102d257600080fd5b84356102dd8161017b565b9350602085013567ffffffffffffffff808211156102fa57600080fd5b90860190610140828903121561030f57600080fd5b6103176101a9565b610320836101d3565b815261032e602084016101d3565b602082015261033f604084016101d3565b6040820152610350606084016101d3565b60608201526080830135608082015260a083013560a082015260c083013560c082015260e083013560e082015261010061038b8185016101d3565b9082015261012083810135838111156103a357600080fd5b6103af8b8287016101e3565b8284015250508095505060408701359150808211156103cd57600080fd5b506103da87828801610270565b95989497509550505050565b6000602082840312156103f857600080fd5b8151801515811461040857600080fd5b939250505056fea2646970667358221220f94d5433e31dfe4dfa27f21b76582196a78d7c8fdcc199a7081b8aaa3397585364736f6c63430008090033";

type FakeRouterSwapConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FakeRouterSwapConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FakeRouterSwap__factory extends ContractFactory {
  constructor(...args: FakeRouterSwapConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FakeRouterSwap> {
    return super.deploy(overrides || {}) as Promise<FakeRouterSwap>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FakeRouterSwap {
    return super.attach(address) as FakeRouterSwap;
  }
  override connect(signer: Signer): FakeRouterSwap__factory {
    return super.connect(signer) as FakeRouterSwap__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FakeRouterSwapInterface {
    return new utils.Interface(_abi) as FakeRouterSwapInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FakeRouterSwap {
    return new Contract(address, _abi, signerOrProvider) as FakeRouterSwap;
  }
}
