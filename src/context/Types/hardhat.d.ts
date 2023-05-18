/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "ERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Upgradeable__factory>;
    getContractFactory(
      name: "ERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721EnumerableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721EnumerableUpgradeable__factory>;
    getContractFactory(
      name: "IERC721MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC721ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC721Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC1271",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1271__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ICicleoSubscriptionRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICicleoSubscriptionRouter__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ILiFi",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiFi__factory>;
    getContractFactory(
      name: "CicleoProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CicleoProxy__factory>;
    getContractFactory(
      name: "Diamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Diamond__factory>;
    getContractFactory(
      name: "AdminFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AdminFacet__factory>;
    getContractFactory(
      name: "BridgeFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BridgeFacet__factory>;
    getContractFactory(
      name: "DiamondCutFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondCutFacet__factory>;
    getContractFactory(
      name: "DiamondLoupeFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondLoupeFacet__factory>;
    getContractFactory(
      name: "PaymentFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PaymentFacet__factory>;
    getContractFactory(
      name: "SubscriptionTypesFacet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SubscriptionTypesFacet__factory>;
    getContractFactory(
      name: "IDiamondCut",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDiamondCut__factory>;
    getContractFactory(
      name: "IDiamondLoupe",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDiamondLoupe__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "IERC173",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC173__factory>;
    getContractFactory(
      name: "LibAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibAdmin__factory>;
    getContractFactory(
      name: "LibDiamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibDiamond__factory>;
    getContractFactory(
      name: "DiamondInit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DiamondInit__factory>;
    getContractFactory(
      name: "CicleoSubscriptionBridgeManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CicleoSubscriptionBridgeManager__factory>;
    getContractFactory(
      name: "ICicleoRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICicleoRouter__factory>;
    getContractFactory(
      name: "ILiFiDiamond",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILiFiDiamond__factory>;
    getContractFactory(
      name: "CicleoSubscriptionFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CicleoSubscriptionFactory__factory>;
    getContractFactory(
      name: "CicleoSubscriptionManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CicleoSubscriptionManager__factory>;
    getContractFactory(
      name: "CicleoSubscriptionSecurity",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CicleoSubscriptionSecurity__factory>;
    getContractFactory(
      name: "FakeRouterSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FakeRouterSwap__factory>;
    getContractFactory(
      name: "TestnetUSDC",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestnetUSDC__factory>;
    getContractFactory(
      name: "CicleoTestBridge",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CicleoTestBridge__factory>;
    getContractFactory(
      name: "IAggregationExecutor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAggregationExecutor__factory>;
    getContractFactory(
      name: "IOpenOceanCaller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOpenOceanCaller__factory>;
    getContractFactory(
      name: "IRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRouter__factory>;

    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "ERC721Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Upgradeable>;
    getContractAt(
      name: "ERC721EnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721EnumerableUpgradeable>;
    getContractAt(
      name: "IERC721EnumerableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721EnumerableUpgradeable>;
    getContractAt(
      name: "IERC721MetadataUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721MetadataUpgradeable>;
    getContractAt(
      name: "IERC721ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721ReceiverUpgradeable>;
    getContractAt(
      name: "IERC721Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "IERC1271",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1271>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ICicleoSubscriptionRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICicleoSubscriptionRouter>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ILiFi",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILiFi>;
    getContractAt(
      name: "CicleoProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CicleoProxy>;
    getContractAt(
      name: "Diamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Diamond>;
    getContractAt(
      name: "AdminFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AdminFacet>;
    getContractAt(
      name: "BridgeFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BridgeFacet>;
    getContractAt(
      name: "DiamondCutFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DiamondCutFacet>;
    getContractAt(
      name: "DiamondLoupeFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DiamondLoupeFacet>;
    getContractAt(
      name: "PaymentFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PaymentFacet>;
    getContractAt(
      name: "SubscriptionTypesFacet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SubscriptionTypesFacet>;
    getContractAt(
      name: "IDiamondCut",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDiamondCut>;
    getContractAt(
      name: "IDiamondLoupe",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDiamondLoupe>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "IERC173",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC173>;
    getContractAt(
      name: "LibAdmin",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibAdmin>;
    getContractAt(
      name: "LibDiamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LibDiamond>;
    getContractAt(
      name: "DiamondInit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DiamondInit>;
    getContractAt(
      name: "CicleoSubscriptionBridgeManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CicleoSubscriptionBridgeManager>;
    getContractAt(
      name: "ICicleoRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICicleoRouter>;
    getContractAt(
      name: "ILiFiDiamond",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ILiFiDiamond>;
    getContractAt(
      name: "CicleoSubscriptionFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CicleoSubscriptionFactory>;
    getContractAt(
      name: "CicleoSubscriptionManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CicleoSubscriptionManager>;
    getContractAt(
      name: "CicleoSubscriptionSecurity",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CicleoSubscriptionSecurity>;
    getContractAt(
      name: "FakeRouterSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FakeRouterSwap>;
    getContractAt(
      name: "TestnetUSDC",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestnetUSDC>;
    getContractAt(
      name: "CicleoTestBridge",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CicleoTestBridge>;
    getContractAt(
      name: "IAggregationExecutor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAggregationExecutor>;
    getContractAt(
      name: "IOpenOceanCaller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOpenOceanCaller>;
    getContractAt(
      name: "IRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRouter>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
