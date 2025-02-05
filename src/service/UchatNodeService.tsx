import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { chainConst } from "@/consts/parameters";
import { getContract } from "@/config/contracts";
import abi from "@/config/abi/contract/uchatNode.json";
import { NodeSaleConfigEntity } from "@/entities/NodeSaleConfigEntity";
import { NodeInfoEntity } from "@/entities/NodeInfoEntity";

const contractAddress = getContract('uchatNode');

export class UchatNodeService {
    async getClaimbleUchat(account: string) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const balance = await contract.call(
                "getClaimableUchat", [account]
            );
            return balance;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async getCurrentBatch() {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const batchId = await contract.call(
                "currentBatch", []
            );
            return batchId;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async getNodeCountByBatch(batchId: number) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const nodeCount = await contract.call(
                "getNodeCountByBatch", [batchId]
            );
            return nodeCount;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async getNodeSaleConfig(batchId: number) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const config = await contract.call(
                "getNodeSaleConfig", [batchId]
            );
            const nodeSaleConfig = new NodeSaleConfigEntity();
            nodeSaleConfig.batch = Number(config[0]);
            nodeSaleConfig.totalSupply = Number(config[1]);
            nodeSaleConfig.totalReleasedPerUser = Number(config[2]);
            nodeSaleConfig.price = config[3];
            nodeSaleConfig.isWhitelistOnly = config[4];
            nodeSaleConfig.isAppUserOnly = config[5];
            nodeSaleConfig.startReleaseTime = Number(config[7]);
            nodeSaleConfig.dailyReleasePercent = Number(config[8]);
            nodeSaleConfig.state = config[9];
            nodeSaleConfig.startSaleTime = Number(config[10]);
            nodeSaleConfig.endSaleTime = Number(config[11]);
            return nodeSaleConfig;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getNodeInfo(account: string) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const result = await contract.call(
                "getNodeInfo", [account]
            );
            const nodeInfo = new NodeInfoEntity();
            nodeInfo.batch = Number(result[0]);
            nodeInfo.walletAddress = result[1];
            nodeInfo.totalUchatOutput = result[2];
            nodeInfo.claimedUchat = result[3];
            nodeInfo.purchaseTime = Number(result[4]);
            nodeInfo.startReleaseTime = Number(result[5]);
            return nodeInfo;

        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getAllNodeWalletAddresses() {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const result = await contract.call(
                "getAllNodeWalletAddresses", []
            );
            return result;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getWhitelist(batchId: number) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const result = await contract.call(
                "getWhitelist", [batchId]
            );
            return result;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getWalletAddressesByBatch(batch: number) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const result = await contract.call(
                "getWalletAddresses", [batch]
            );
            return result;
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}