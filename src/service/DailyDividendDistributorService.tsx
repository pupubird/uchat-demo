import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { chainConst } from "@/consts/parameters";
import { getContract } from "@/config/contracts";
import abi from "@/config/abi/contract/dailyDividendDistributor.json";

const contractAddress = getContract('dailyDividendDistributor');

export class DailyDividendDistributorService {
    async isWalletExist(account: string) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const state = await contract.call(
                "isWalletExist", [account]
            );
            return state;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    async getWalletBalance(account:string){
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(contractAddress, abi);
        try {
            const balance = await contract.call(
                "isWalletExist", [account]
            );
            return Number(balance);
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

}