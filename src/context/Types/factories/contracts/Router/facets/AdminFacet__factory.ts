/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  AdminFacet,
  AdminFacetInterface,
} from "../../../../contracts/Router/facets/AdminFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "SubscriptionManagerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newName",
        type: "string",
      },
    ],
    name: "NameEdited",
    type: "event",
  },
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
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "SubscriptionManagerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTreasury",
        type: "address",
      },
    ],
    name: "TokenEdited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "SubscriptionManagerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTreasury",
        type: "address",
      },
    ],
    name: "TreasuryEdited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint8",
        name: "subscriptionId",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
    ],
    name: "UserEdited",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subscriptionEndDate",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "subscriptionId",
        type: "uint8",
      },
    ],
    name: "editAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    name: "setFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "setToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "verifyIfOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610aac806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063af906cf31161005b578063af906cf3146100fd578063f2fde38b14610110578063f654d3ac14610123578063fe55932a1461013657600080fd5b80630e2b5e311461008d5780634283f88e146100b55780635bb47808146100ca5780638da5cb5b146100dd575b600080fd5b6100a061009b366004610828565b610149565b60405190151581526020015b60405180910390f35b6100c86100c3366004610854565b6101e8565b005b6100c86100d8366004610884565b6102a1565b6100e56102d8565b6040516001600160a01b0390911681526020016100ac565b6100c861010b366004610854565b610310565b6100c861011e366004610884565b6103c0565b6100c86101313660046108a1565b6103d4565b6100c8610144366004610907565b6104a6565b600080600080516020610a578339815191528054604051630e2b5e3160e01b81526001600160a01b03878116600483015260248201879052929350911690630e2b5e319060440160206040518083038186803b1580156101a857600080fd5b505afa1580156101bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e091906109c2565b949350505050565b6101f182610555565b60006101fc836105ca565b604051630787a21360e51b81526001600160a01b0384811660048301529192509082169063f0f4426090602401600060405180830381600087803b15801561024357600080fd5b505af1158015610257573d6000803e3d6000fd5b50506040516001600160a01b03851681523392508591507f272566092165eb71334c4557e2d3626c105d62d03ab467757c2075981618f553906020015b60405180910390a3505050565b6102a961065b565b600080516020610a5783398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b600061030b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c1320546001600160a01b031690565b905090565b61031982610555565b6000610324836105ca565b60405163144fa6d760e01b81526001600160a01b0384811660048301529192509082169063144fa6d790602401600060405180830381600087803b15801561036b57600080fd5b505af115801561037f573d6000803e3d6000fd5b50506040516001600160a01b03851681523392508591507feab1d1aca1126b17a8baab58237bf77354c170719a9bcd5ac8f6c8d51d7e188090602001610294565b6103c861065b565b6103d1816106e4565b50565b6103dd84610555565b60006103e8856105ca565b604051636f04176160e11b81526001600160a01b0386811660048301526024820186905260ff851660448301529192509082169063de082ec290606401600060405180830381600087803b15801561043f57600080fd5b505af1158015610453573d6000803e3d6000fd5b505050508160ff16846001600160a01b0316867ffcda9f876b19b1444bd7bbe7732cf0c2eb5764f619714c9d7a7d6e75f87e1c188660405161049791815260200190565b60405180910390a45050505050565b6104af82610555565b60006104ba836105ca565b60405163c47f002760e01b81529091506001600160a01b0382169063c47f0027906104e99085906004016109e4565b600060405180830381600087803b15801561050357600080fd5b505af1158015610517573d6000803e3d6000fd5b50505050336001600160a01b0316837f4f04cbcd567de56da75a9613c0de888c90edc311f2659d0845541b00cca1af358460405161029491906109e4565b61055f3382610779565b6103d15760405162461bcd60e51b815260206004820152603160248201527f4c696241646d696e3a204d75737420686f6c64206f776e65727061737320666f60448201527039103a3434b99039bab136b0b730b3b2b960791b60648201526084015b60405180910390fd5b6000600080516020610a5783398151915254604051633eb0cceb60e21b8152600481018490526001600160a01b039091169063fac333ac9060240160206040518083038186803b15801561061d57600080fd5b505afa158015610631573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106559190610a39565b92915050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600401546001600160a01b031633146106e25760405162461bcd60e51b815260206004820152602260248201527f4c69624469616d6f6e643a204d75737420626520636f6e7472616374206f776e60448201526132b960f11b60648201526084016105c1565b565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c132080546001600160a01b031981166001600160a01b038481169182179093556040517fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000600080516020610a5783398151915254604051630e2b5e3160e01b81526001600160a01b0385811660048301526024820185905290911690630e2b5e319060440160206040518083038186803b1580156107d457600080fd5b505afa1580156107e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080c91906109c2565b9392505050565b6001600160a01b03811681146103d157600080fd5b6000806040838503121561083b57600080fd5b823561084681610813565b946020939093013593505050565b6000806040838503121561086757600080fd5b82359150602083013561087981610813565b809150509250929050565b60006020828403121561089657600080fd5b813561080c81610813565b600080600080608085870312156108b757600080fd5b8435935060208501356108c981610813565b925060408501359150606085013560ff811681146108e657600080fd5b939692955090935050565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561091a57600080fd5b82359150602083013567ffffffffffffffff8082111561093957600080fd5b818501915085601f83011261094d57600080fd5b81358181111561095f5761095f6108f1565b604051601f8201601f19908116603f01168101908382118183101715610987576109876108f1565b816040528281528860208487010111156109a057600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000602082840312156109d457600080fd5b8151801515811461080c57600080fd5b600060208083528351808285015260005b81811015610a11578581018301518582016040015282016109f5565b81811115610a23576000604083870101525b50601f01601f1916929092016040019392505050565b600060208284031215610a4b57600080fd5b815161080c8161081356fed8f6e013ff0cbc66ded25851d52c18673042e44ec585aeabfa2e9126bad1f74ea2646970667358221220778092bd31eb7d62ee05c50704a313d4991fef1d135528135e8f638523d5b7bd64736f6c63430008090033";

type AdminFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AdminFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AdminFacet__factory extends ContractFactory {
  constructor(...args: AdminFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AdminFacet> {
    return super.deploy(overrides || {}) as Promise<AdminFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AdminFacet {
    return super.attach(address) as AdminFacet;
  }
  override connect(signer: Signer): AdminFacet__factory {
    return super.connect(signer) as AdminFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdminFacetInterface {
    return new utils.Interface(_abi) as AdminFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdminFacet {
    return new Contract(address, _abi, signerOrProvider) as AdminFacet;
  }
}
