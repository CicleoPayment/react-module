/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CicleoProxy,
  CicleoProxyInterface,
} from "../../../contracts/Proxy.sol/CicleoProxy";

const _abi = [
  {
    inputs: [],
    name: "DelegatecallFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
      {
        internalType: "address[]",
        name: "target",
        type: "address[]",
      },
    ],
    name: "multiDelegatecall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506104df806100206000396000f3fe60806040526004361061001e5760003560e01c80630e7c1f6f14610023575b600080fd5b610036610031366004610235565b61004c565b60405161004391906103a4565b60405180910390f35b6060835167ffffffffffffffff811115610068576100686101a2565b60405190808252806020026020018201604052801561009b57816020015b60608152602001906001900390816100865790505b50905060005b845181101561019a576000808585848181106100bf576100bf61041e565b90506020020160208101906100d49190610434565b6001600160a01b03168784815181106100ef576100ef61041e565b60200260200101516040516101049190610464565b600060405180830381855af49150503d806000811461013f576040519150601f19603f3d011682016040523d82523d6000602084013e610144565b606091505b509150915081610167576040516341af4c7f60e11b815260040160405180910390fd5b8084848151811061017a5761017a61041e565b60200260200101819052505050808061019290610480565b9150506100a1565b509392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156101e1576101e16101a2565b604052919050565b60008083601f8401126101fb57600080fd5b50813567ffffffffffffffff81111561021357600080fd5b6020830191508360208260051b850101111561022e57600080fd5b9250929050565b6000806000604080858703121561024b57600080fd5b843567ffffffffffffffff8082111561026357600080fd5b818701915087601f83011261027757600080fd5b813560208282111561028b5761028b6101a2565b8160051b61029a8282016101b8565b928352848101820192828101908c8511156102b457600080fd5b83870192505b84831015610342578235868111156102d25760008081fd5b8701603f81018e136102e45760008081fd5b84810135878111156102f8576102f86101a2565b61030a601f8201601f191687016101b8565b8181528f8b83850101111561031f5760008081fd5b818b840188830137600091810187019190915283525091830191908301906102ba565b995050508801359350508083111561035957600080fd5b5050610367868287016101e9565b9497909650939450505050565b60005b8381101561038f578181015183820152602001610377565b8381111561039e576000848401525b50505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561041157878503603f19018452815180518087526103f2818989018a8501610374565b601f01601f1916959095018601945092850192908501906001016103cb565b5092979650505050505050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561044657600080fd5b81356001600160a01b038116811461045d57600080fd5b9392505050565b60008251610476818460208701610374565b9190910192915050565b60006000198214156104a257634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212208f969af94a57c17f7929224e051a084d94cee8fb5ce2ab8328af3cb937bb870e64736f6c63430008090033";

type CicleoProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CicleoProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CicleoProxy__factory extends ContractFactory {
  constructor(...args: CicleoProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CicleoProxy> {
    return super.deploy(overrides || {}) as Promise<CicleoProxy>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CicleoProxy {
    return super.attach(address) as CicleoProxy;
  }
  override connect(signer: Signer): CicleoProxy__factory {
    return super.connect(signer) as CicleoProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CicleoProxyInterface {
    return new utils.Interface(_abi) as CicleoProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CicleoProxy {
    return new Contract(address, _abi, signerOrProvider) as CicleoProxy;
  }
}
