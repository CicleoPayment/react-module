/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  CicleoSubscriptionBridgeDiamond,
  CicleoSubscriptionBridgeDiamondInterface,
} from "../../../../contracts/Subscription/SubscriptionBridge.sol/CicleoSubscriptionBridgeDiamond";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_diamondCutFacet",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initializationContractAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "InitializationFunctionReverted",
    type: "error",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405260405162001e5338038062001e53833981016040819052620000269162000c60565b6200003c826200015660201b620000b01760201c565b604080516001808252818301909252600091816020015b60408051606080820183526000808352602083015291810191909152815260200190600190039081620000535750506040805160018082528183019092529192506000919060208083019080368337019050509050631f931c1c60e01b81600081518110620000c657620000c662000c98565b6001600160e01b031990921660209283029190910182015260408051606081019091526001600160a01b038516815290810160008152602001828152508260008151811062000119576200011962000c98565b60200260200101819052506200014c82600060405180602001604052806000815250620001da60201b620001331760201c565b5050505062000f1b565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c132080546001600160a01b031981166001600160a01b0384811691821790935560405160008051602062001dbf833981519152939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e5460008051602062001dbf8339815191529061ffff811690819060009060071615620002395750600381901c60009081526001840160205260409020545b60005b8751811015620002c957620002bb83838a848151811062000261576200026162000c98565b6020026020010151600001518b858151811062000282576200028262000c98565b6020026020010151602001518c8681518110620002a357620002a362000c98565b6020026020010151604001516200035b60201b60201c565b90935091506001016200023c565b50828214620002e65760028401805461ffff191661ffff84161790555b60078216156200030957600382901c600090815260018501602052604090208190555b7f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb6738787876040516200033e9392919062000d21565b60405180910390a162000352868662000b47565b50505050505050565b6000808060008051602062001dbf83398151915290506000845111620003dc5760405162461bcd60e51b815260206004820152602b60248201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660448201526a1858d95d081d1bc818dd5d60aa1b60648201526084015b60405180910390fd5b6000856002811115620003f357620003f362000cae565b141562000571576200041f8660405180606001604052806024815260200162001ddf6024913962000c1f565b60005b84518110156200056a57600085828151811062000443576200044362000c98565b6020908102919091018101516001600160e01b03198116600090815291859052604090912054909150606081901c15620004e65760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f60448201527f6e207468617420616c72656164792065786973747300000000000000000000006064820152608401620003d3565b6001600160e01b031980831660008181526020879052604090206001600160601b031960608d901b168e17905560e060058e901b811692831c199c909c1690821c179a8114156200054b5760038c901c600090815260018601602052604081209b909b555b8b620005578162000e3e565b9c50506001909301925062000422915050565b5062000b3b565b600185600281111562000588576200058862000cae565b14156200079857620005b48660405180606001604052806028815260200162001e2b6028913962000c1f565b60005b84518110156200056a576000858281518110620005d857620005d862000c98565b6020908102919091018101516001600160e01b03198116600090815291859052604090912054909150606081901c30811415620006705760405162461bcd60e51b815260206004820152602f60248201527f4c69624469616d6f6e644375743a2043616e2774207265706c61636520696d6d60448201526e3aba30b1363290333ab731ba34b7b760891b6064820152608401620003d3565b896001600160a01b0316816001600160a01b03161415620006e95760405162461bcd60e51b8152602060048201526038602482015260008051602062001d9f83398151915260448201527f6374696f6e20776974682073616d652066756e6374696f6e00000000000000006064820152608401620003d3565b6001600160a01b038116620007565760405162461bcd60e51b8152602060048201526038602482015260008051602062001d9f83398151915260448201527f6374696f6e207468617420646f65736e277420657869737400000000000000006064820152608401620003d3565b506001600160e01b031990911660009081526020849052604090206001600160601b03919091166001600160601b031960608a901b16179055600101620005b7565b6002856002811115620007af57620007af62000cae565b141562000ae2576001600160a01b03861615620008355760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f7665206661636574206164647260448201527f657373206d7573742062652061646472657373283029000000000000000000006064820152608401620003d3565b600388901c6007891660005b865181101562000abd57896200087e57826200085d8162000e5c565b60008181526001870160205260409020549b509350600792506200088e9050565b816200088a8162000e5c565b9250505b6000806000808a8581518110620008a957620008a962000c98565b6020908102919091018101516001600160e01b031981166000908152918a9052604090912054909150606081901c6200094b5760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e27742065786973740000000000000000006064820152608401620003d3565b606081901c301415620009b85760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201526d3a30b1363290333ab731ba34b7b760911b6064820152608401620003d3565b600587901b8f901b94506001600160e01b03198086169083161462000a0a576001600160e01b03198516600090815260208a90526040902080546001600160601b0319166001600160601b0383161790555b6001600160e01b031991909116600090815260208990526040812055600381901c611fff16925060051b60e016905085821462000a71576000828152600188016020526040902080546001600160e01b031980841c19909116908516831c17905562000a95565b80836001600160e01b031916901c816001600160e01b031960001b901c198e16179c505b8462000ab157600086815260018801602052604081208190559c505b50505060010162000841565b508062000acc83600862000e76565b62000ad8919062000e98565b9950505062000b3b565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f727265637420466163657443756044820152663a20b1ba34b7b760c91b6064820152608401620003d3565b50959694955050505050565b6001600160a01b03821662000b5a575050565b62000b7f8260405180606001604052806028815260200162001e036028913962000c1f565b600080836001600160a01b03168360405162000b9c919062000eb3565b600060405180830381855af49150503d806000811462000bd9576040519150601f19603f3d011682016040523d82523d6000602084013e62000bde565b606091505b50915091508162000c195780511562000bfa5780518082602001fd5b838360405163192105d760e01b8152600401620003d392919062000ed1565b50505050565b813b818162000c195760405162461bcd60e51b8152600401620003d3919062000eff565b80516001600160a01b038116811462000c5b57600080fd5b919050565b6000806040838503121562000c7457600080fd5b62000c7f8362000c43565b915062000c8f6020840162000c43565b90509250929050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b60005b8381101562000ce157818101518382015260200162000cc7565b8381111562000c195750506000910152565b6000815180845262000d0d81602086016020860162000cc4565b601f01601f19169290920160200192915050565b60006060808301818452808751808352608092508286019150828160051b8701016020808b0160005b8481101562000df657898403607f19018652815180516001600160a01b0316855283810151898601906003811062000d9257634e487b7160e01b600052602160045260246000fd5b868601526040918201519186018a905281519081905290840190600090898701905b8083101562000de05783516001600160e01b031916825292860192600192909201919086019062000db4565b5097850197955050509082019060010162000d4a565b50506001600160a01b038a1690880152868103604088015262000e1a818962000cf3565b9a9950505050505050505050565b634e487b7160e01b600052601160045260246000fd5b600060001982141562000e555762000e5562000e28565b5060010190565b60008162000e6e5762000e6e62000e28565b506000190190565b600081600019048311821515161562000e935762000e9362000e28565b500290565b6000821982111562000eae5762000eae62000e28565b500190565b6000825162000ec781846020870162000cc4565b9190910192915050565b6001600160a01b038316815260406020820181905260009062000ef79083018462000cf3565b949350505050565b60208152600062000f14602083018462000cf3565b9392505050565b610e748062000f2b6000396000f3fe60806040523661000b57005b600080356001600160e01b0319168152600080516020610dab8339815191526020819052604090912054819060601c8061008c5760405162461bcd60e51b815260206004820181905260248201527f4469616d6f6e643a2046756e6374696f6e20646f6573206e6f7420657869737460448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e8080156100ab573d6000f35b3d6000fd5b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c132080546001600160a01b031981166001600160a01b03848116918217909355604051600080516020610dab833981519152939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e54600080516020610dab8339815191529061ffff8116908190600090600716156101905750600381901c60009081526001840160205260409020545b60005b875181101561020d5761020083838a84815181106101b3576101b3610b45565b6020026020010151600001518b85815181106101d1576101d1610b45565b6020026020010151602001518c86815181106101ef576101ef610b45565b602002602001015160400151610299565b9093509150600101610193565b508282146102295760028401805461ffff191661ffff84161790555b600782161561024b57600382901c600090815260018501602052604090208190555b7f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb67387878760405161027e93929190610bc9565b60405180910390a16102908686610a58565b50505050505050565b60008080600080516020610dab833981519152905060008451116103135760405162461bcd60e51b815260206004820152602b60248201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660448201526a1858d95d081d1bc818dd5d60aa1b6064820152608401610083565b600085600281111561032757610327610b5b565b141561048e5761034f86604051806060016040528060248152602001610dcb60249139610b24565b60005b845181101561048857600085828151811061036f5761036f610b45565b6020908102919091018101516001600160e01b03198116600090815291859052604090912054909150606081901c156104085760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f6044820152746e207468617420616c72656164792065786973747360581b6064820152608401610083565b6001600160e01b031980831660008181526020879052604090206001600160601b031960608d901b168e17905560e060058e901b811692831c199c909c1690821c179a81141561046c5760038c901c600090815260018601602052604081209b909b555b8b61047681610cdf565b9c505060019093019250610352915050565b50610a4c565b60018560028111156104a2576104a2610b5b565b14156106ca576104ca86604051806060016040528060288152602001610e1760289139610b24565b60005b84518110156104885760008582815181106104ea576104ea610b45565b6020908102919091018101516001600160e01b03198116600090815291859052604090912054909150606081901c308114156105805760405162461bcd60e51b815260206004820152602f60248201527f4c69624469616d6f6e644375743a2043616e2774207265706c61636520696d6d60448201526e3aba30b1363290333ab731ba34b7b760891b6064820152608401610083565b896001600160a01b0316816001600160a01b031614156106085760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e20776974682073616d652066756e6374696f6e00000000000000006064820152608401610083565b6001600160a01b0381166106845760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e207468617420646f65736e277420657869737400000000000000006064820152608401610083565b506001600160e01b031990911660009081526020849052604090206bffffffffffffffffffffffff919091166001600160601b031960608a901b161790556001016104cd565b60028560028111156106de576106de610b5b565b14156109f4576001600160a01b0386161561075a5760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f76652066616365742061646472604482015275657373206d757374206265206164647265737328302960501b6064820152608401610083565b600388901c6007891660005b86518110156109d4578961079e578261077e81610cfa565b60008181526001870160205260409020549b509350600792506107ac9050565b816107a881610cfa565b9250505b6000806000808a85815181106107c4576107c4610b45565b6020908102919091018101516001600160e01b031981166000908152918a9052604090912054909150606081901c6108645760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e27742065786973740000000000000000006064820152608401610083565b606081901c3014156108cf5760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201526d3a30b1363290333ab731ba34b7b760911b6064820152608401610083565b600587901b8f901b94506001600160e01b031980861690831614610925576001600160e01b03198516600090815260208a90526040902080546001600160601b0319166bffffffffffffffffffffffff83161790555b6001600160e01b031991909116600090815260208990526040812055600381901c611fff16925060051b60e016905085821461098a576000828152600188016020526040902080546001600160e01b031980841c19909116908516831c1790556109ae565b80836001600160e01b031916901c816001600160e01b031960001b901c198e16179c505b846109c957600086815260018801602052604081208190559c505b505050600101610766565b50806109e1836008610d11565b6109eb9190610d30565b99505050610a4c565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f727265637420466163657443756044820152663a20b1ba34b7b760c91b6064820152608401610083565b50959694955050505050565b6001600160a01b038216610a6a575050565b610a8c82604051806060016040528060288152602001610def60289139610b24565b600080836001600160a01b031683604051610aa79190610d48565b600060405180830381855af49150503d8060008114610ae2576040519150601f19603f3d011682016040523d82523d6000602084013e610ae7565b606091505b509150915081610b1e57805115610b015780518082602001fd5b838360405163192105d760e01b8152600401610083929190610d64565b50505050565b813b8181610b1e5760405162461bcd60e51b81526004016100839190610d90565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b60005b83811015610b8c578181015183820152602001610b74565b83811115610b1e5750506000910152565b60008151808452610bb5816020860160208601610b71565b601f01601f19169290920160200192915050565b60006060808301818452808751808352608092508286019150828160051b8701016020808b0160005b84811015610c9957898403607f19018652815180516001600160a01b03168552838101518986019060038110610c3857634e487b7160e01b600052602160045260246000fd5b868601526040918201519186018a905281519081905290840190600090898701905b80831015610c845783516001600160e01b0319168252928601926001929092019190860190610c5a565b50978501979550505090820190600101610bf2565b50506001600160a01b038a16908801528681036040880152610cbb8189610b9d565b9a9950505050505050505050565b634e487b7160e01b600052601160045260246000fd5b6000600019821415610cf357610cf3610cc9565b5060010190565b600081610d0957610d09610cc9565b506000190190565b6000816000190483118215151615610d2b57610d2b610cc9565b500290565b60008219821115610d4357610d43610cc9565b500190565b60008251610d5a818460208701610b71565b9190910192915050565b6001600160a01b0383168152604060208201819052600090610d8890830184610b9d565b949350505050565b602081526000610da36020830184610b9d565b939250505056fec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c4c69624469616d6f6e644375743a2041646420666163657420686173206e6f20636f64654c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a205265706c61636520666163657420686173206e6f20636f6465a264697066735822122016a23b39a2cc7aff1adb843ee374390a5359e3493e0c7b51bb1a9fcc8ec3b24264736f6c634300080900334c69624469616d6f6e644375743a2043616e2774207265706c6163652066756ec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c4c69624469616d6f6e644375743a2041646420666163657420686173206e6f20636f64654c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a205265706c61636520666163657420686173206e6f20636f6465";

type CicleoSubscriptionBridgeDiamondConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CicleoSubscriptionBridgeDiamondConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CicleoSubscriptionBridgeDiamond__factory extends ContractFactory {
  constructor(...args: CicleoSubscriptionBridgeDiamondConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _contractOwner: PromiseOrValue<string>,
    _diamondCutFacet: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<CicleoSubscriptionBridgeDiamond> {
    return super.deploy(
      _contractOwner,
      _diamondCutFacet,
      overrides || {}
    ) as Promise<CicleoSubscriptionBridgeDiamond>;
  }
  override getDeployTransaction(
    _contractOwner: PromiseOrValue<string>,
    _diamondCutFacet: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _contractOwner,
      _diamondCutFacet,
      overrides || {}
    );
  }
  override attach(address: string): CicleoSubscriptionBridgeDiamond {
    return super.attach(address) as CicleoSubscriptionBridgeDiamond;
  }
  override connect(signer: Signer): CicleoSubscriptionBridgeDiamond__factory {
    return super.connect(signer) as CicleoSubscriptionBridgeDiamond__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CicleoSubscriptionBridgeDiamondInterface {
    return new utils.Interface(
      _abi
    ) as CicleoSubscriptionBridgeDiamondInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CicleoSubscriptionBridgeDiamond {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as CicleoSubscriptionBridgeDiamond;
  }
}