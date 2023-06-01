/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IOpenOceanCaller,
  IOpenOceanCallerInterface,
} from "../../../../../contracts/Subscription/Types/CicleoTypes.sol/IOpenOceanCaller";

const _abi = [
  {
    inputs: [
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
        internalType: "struct IOpenOceanCaller.CallDescription",
        name: "desc",
        type: "tuple",
      },
    ],
    name: "makeCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
        name: "desc",
        type: "tuple[]",
      },
    ],
    name: "makeCalls",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IOpenOceanCaller__factory {
  static readonly abi = _abi;
  static createInterface(): IOpenOceanCallerInterface {
    return new utils.Interface(_abi) as IOpenOceanCallerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOpenOceanCaller {
    return new Contract(address, _abi, signerOrProvider) as IOpenOceanCaller;
  }
}