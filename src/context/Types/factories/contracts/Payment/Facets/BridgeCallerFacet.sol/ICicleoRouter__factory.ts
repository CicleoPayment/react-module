/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ICicleoRouter,
  ICicleoRouterInterface,
} from "../../../../../contracts/Payment/Facets/BridgeCallerFacet.sol/ICicleoRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "subscriptionManagerId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "subscriptionId",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "bridgeSubscription",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ICicleoRouter__factory {
  static readonly abi = _abi;
  static createInterface(): ICicleoRouterInterface {
    return new utils.Interface(_abi) as ICicleoRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICicleoRouter {
    return new Contract(address, _abi, signerOrProvider) as ICicleoRouter;
  }
}