/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestnetUSDC,
  TestnetUSDCInterface,
} from "../../../../contracts/Test/FakeUSDC.sol/TestnetUSDC";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040805180820182526004808252635553444360e01b60208084018281528551808701909652928552840152815191929161004e9160039161006a565b50805161006290600490602084019061006a565b50505061013e565b82805461007690610103565b90600052602060002090601f01602090048101928261009857600085556100de565b82601f106100b157805160ff19168380011785556100de565b828001600101855582156100de579182015b828111156100de5782518255916020019190600101906100c3565b506100ea9291506100ee565b5090565b5b808211156100ea57600081556001016100ef565b600181811c9082168061011757607f821691505b6020821081141561013857634e487b7160e01b600052602260045260246000fd5b50919050565b6109628061014d6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806370a082311161007157806370a082311461014157806395d89b411461016a578063a0712d6814610172578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b806306fdde03146100b9578063095ea7b3146100d757806318160ddd146100fa57806323b872dd1461010c578063313ce5671461011f578063395093511461012e575b600080fd5b6100c16101c0565b6040516100ce9190610786565b60405180910390f35b6100ea6100e53660046107f7565b610252565b60405190151581526020016100ce565b6002545b6040519081526020016100ce565b6100ea61011a366004610821565b61026a565b604051601281526020016100ce565b6100ea61013c3660046107f7565b61028e565b6100fe61014f36600461085d565b6001600160a01b031660009081526020819052604090205490565b6100c16102b0565b61018561018036600461087f565b6102bf565b005b6100ea6101953660046107f7565b6102cc565b6100ea6101a83660046107f7565b61034c565b6100fe6101bb366004610898565b61035a565b6060600380546101cf906108cb565b80601f01602080910402602001604051908101604052809291908181526020018280546101fb906108cb565b80156102485780601f1061021d57610100808354040283529160200191610248565b820191906000526020600020905b81548152906001019060200180831161022b57829003601f168201915b5050505050905090565b600033610260818585610385565b5060019392505050565b6000336102788582856104a9565b610283858585610523565b506001949350505050565b6000336102608185856102a1838361035a565b6102ab9190610906565b610385565b6060600480546101cf906108cb565b6102c933826106c7565b50565b600033816102da828661035a565b90508381101561033f5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102838286868403610385565b600033610260818585610523565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166103e75760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610336565b6001600160a01b0382166104485760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610336565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006104b5848461035a565b9050600019811461051d57818110156105105760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610336565b61051d8484848403610385565b50505050565b6001600160a01b0383166105875760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610336565b6001600160a01b0382166105e95760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610336565b6001600160a01b038316600090815260208190526040902054818110156106615760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610336565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a361051d565b6001600160a01b03821661071d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610336565b806002600082825461072f9190610906565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600060208083528351808285015260005b818110156107b357858101830151858201604001528201610797565b818111156107c5576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146107f257600080fd5b919050565b6000806040838503121561080a57600080fd5b610813836107db565b946020939093013593505050565b60008060006060848603121561083657600080fd5b61083f846107db565b925061084d602085016107db565b9150604084013590509250925092565b60006020828403121561086f57600080fd5b610878826107db565b9392505050565b60006020828403121561089157600080fd5b5035919050565b600080604083850312156108ab57600080fd5b6108b4836107db565b91506108c2602084016107db565b90509250929050565b600181811c908216806108df57607f821691505b6020821081141561090057634e487b7160e01b600052602260045260246000fd5b50919050565b6000821982111561092757634e487b7160e01b600052601160045260246000fd5b50019056fea264697066735822122038ecd610fde74f31f6a839cdcba3ea159a56759a6a366b214ff34a7ca1e3adf964736f6c63430008090033";

type TestnetUSDCConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestnetUSDCConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestnetUSDC__factory extends ContractFactory {
  constructor(...args: TestnetUSDCConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestnetUSDC> {
    return super.deploy(overrides || {}) as Promise<TestnetUSDC>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestnetUSDC {
    return super.attach(address) as TestnetUSDC;
  }
  override connect(signer: Signer): TestnetUSDC__factory {
    return super.connect(signer) as TestnetUSDC__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestnetUSDCInterface {
    return new utils.Interface(_abi) as TestnetUSDCInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestnetUSDC {
    return new Contract(address, _abi, signerOrProvider) as TestnetUSDC;
  }
}
