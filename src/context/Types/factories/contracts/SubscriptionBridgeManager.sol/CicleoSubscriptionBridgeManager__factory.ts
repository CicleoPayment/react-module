/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CicleoSubscriptionBridgeManager,
  CicleoSubscriptionBridgeManagerInterface,
} from "../../../contracts/SubscriptionBridgeManager.sol/CicleoSubscriptionBridgeManager";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountMaxPerPeriod",
        type: "uint256",
      },
    ],
    name: "EditSubscriptionLimit",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountMaxPerPeriod",
        type: "uint256",
      },
    ],
    name: "changeSubscriptionLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "bridge",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "payFunctionWithBridge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "bridge",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "renewFunctionWithBridge",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "usersSubscriptionLimit",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506106dc806100206000396000f3fe60806040526004361061003f5760003560e01c80633b108aa1146100445780638b753a2f14610059578063925c9e1014610079578063a0f668ed14610044575b600080fd5b6100576100523660046104ad565b6100c8565b005b34801561006557600080fd5b5061005761007436600461059f565b610420565b34801561008557600080fd5b506100b66100943660046105cb565b6000602081815293815260408082208552928152828120909352825290205481565b60405190815260200160405180910390f35b60008681526020818152604080832088845282528083203384529091529020548411156101625760405162461bcd60e51b815260206004820152603f60248201527f596f75206e65656420746f20617070726f7665206f757220636f6e747261637460448201527f20746f207370656e64207468697320616d6f756e74206f6620746f6b656e730060648201526084015b60405180910390fd5b6040516370a0823160e01b815230600482015283906000906001600160a01b038316906370a082319060240160206040518083038186803b1580156101a657600080fd5b505afa1580156101ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101de9190610604565b6040516323b872dd60e01b8152336004820152306024820152604481018890529091506001600160a01b038316906323b872dd90606401602060405180830381600087803b15801561022f57600080fd5b505af1158015610243573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610267919061061d565b506040516370a0823160e01b81523060048201526000906001600160a01b038416906370a082319060240160206040518083038186803b1580156102aa57600080fd5b505afa1580156102be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e29190610604565b9050866102ef8383610646565b101561032f5760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b6044820152606401610159565b60405163095ea7b360e01b81526001600160a01b0386811660048301526024820189905284169063095ea7b390604401602060405180830381600087803b15801561037957600080fd5b505af115801561038d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b1919061061d565b50600080866001600160a01b031634876040516103ce919061066b565b60006040518083038185875af1925050503d806000811461040b576040519150601f19603f3d011682016040523d82523d6000602084013e610410565b606091505b5050505050505050505050505050565b60008381526020818152604080832085845282528083203380855290835292819020849055518381528492869290917fc50df9abeda1236c3cc22ec2e8bd50ee79eda415f485fa7e7978c9239971b51c910160405180910390a4505050565b6001600160a01b038116811461049457600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60008060008060008060c087890312156104c657600080fd5b86359550602087013594506040870135935060608701356104e68161047f565b925060808701356104f68161047f565b915060a087013567ffffffffffffffff8082111561051357600080fd5b818901915089601f83011261052757600080fd5b81358181111561053957610539610497565b604051601f8201601f19908116603f0116810190838211818310171561056157610561610497565b816040528281528c602084870101111561057a57600080fd5b8260208601602083013760006020848301015280955050505050509295509295509295565b6000806000606084860312156105b457600080fd5b505081359360208301359350604090920135919050565b6000806000606084860312156105e057600080fd5b833592506020840135915060408401356105f98161047f565b809150509250925092565b60006020828403121561061657600080fd5b5051919050565b60006020828403121561062f57600080fd5b8151801515811461063f57600080fd5b9392505050565b60008282101561066657634e487b7160e01b600052601160045260246000fd5b500390565b6000825160005b8181101561068c5760208186018101518583015201610672565b8181111561069b576000828501525b50919091019291505056fea26469706673582212206f5da396cdbde73e4a83c780cac9100ec57435b87973eb0743afda531441ed0f64736f6c63430008090033";

type CicleoSubscriptionBridgeManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CicleoSubscriptionBridgeManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CicleoSubscriptionBridgeManager__factory extends ContractFactory {
  constructor(...args: CicleoSubscriptionBridgeManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CicleoSubscriptionBridgeManager> {
    return super.deploy(
      overrides || {}
    ) as Promise<CicleoSubscriptionBridgeManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): CicleoSubscriptionBridgeManager {
    return super.attach(address) as CicleoSubscriptionBridgeManager;
  }
  override connect(signer: Signer): CicleoSubscriptionBridgeManager__factory {
    return super.connect(signer) as CicleoSubscriptionBridgeManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CicleoSubscriptionBridgeManagerInterface {
    return new utils.Interface(
      _abi
    ) as CicleoSubscriptionBridgeManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CicleoSubscriptionBridgeManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CicleoSubscriptionBridgeManager;
  }
}