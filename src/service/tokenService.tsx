import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import abi from "@/config/abi/token/usdt.json"
import { getTokenInfo } from "@/config/tokens";
import { TokenInfo } from "@/entities/TokenInfoEntity";
import { isNull } from "@/utils/string";
import { chainConst } from "@/consts/parameters";

export const fromEther = (value: number) => Math.round(value * 1e18);
export const toEther = (value: number) => value / 1e18;

export const fromDecimal = (value: number, decimal: number) => multiplyByPowerOfTen(value, decimal);
export const toDecimal = (value: number, decimal: number) => divideByPowerOfTen(value, decimal);

function multiplyByPowerOfTen(value: number, exponent: number): number {
    return value * Math.pow(10, exponent);
}

function divideByPowerOfTen(value: number, exponent: number): number {
    return value / Math.pow(10, exponent);
}

export class TokenService {
    async getUicPrice() {
        return await this.getTokenPrice('uic');
    }

    async getTokenPrice(tokenName: string) {
        if (tokenName === 'TOKEN') tokenName = 'uic';
        const tokenInfo: TokenInfo = getTokenInfo(tokenName);
        const usdtInfo: TokenInfo = getTokenInfo('usdt');

        const tokenContractAddress = tokenInfo.contract;
        const usdtContractAddress = usdtInfo.contract;

        const lpContractAddress = tokenInfo.lp;
        if (isNull(lpContractAddress)) return 1;

        const balanceUSDT = toDecimal(await this.getBalanceOf(usdtContractAddress, lpContractAddress), usdtInfo.decimal);
        const balanceToken = toDecimal(await this.getBalanceOf(tokenContractAddress, lpContractAddress), tokenInfo.decimal);
        return balanceUSDT / balanceToken;
    }

    async getBalanceOf(tokenContractAddress: string, ownerAddress: string) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(tokenContractAddress, abi);
        try {
            const balance = await contract.call(
                "balanceOf", [ownerAddress]
            );
            return balance;
        } catch (error) {
            return 0;
        }

    }

    async allowance(tokenName: string, owner: string, spenderAddress: string) {
        const tokenInfo: TokenInfo = getTokenInfo(tokenName);

        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(tokenInfo.contract, abi);

        try {
            const allowence = await contract.call(
                "allowance", [owner, spenderAddress]
            );
            return allowence;
        } catch (error) {
            return 0;
        }
    }

    async allowanceByContract(tokenContract: string, owner: string, spenderAddress: string) {
        const sdk = new ThirdwebSDK(chainConst);
        const contract = await sdk.getContract(tokenContract, abi);

        try {
            const allowence = await contract.call(
                "allowance", [owner, spenderAddress]
            );
            return allowence;
        } catch (error) {
            return 0;
        }
    }

    /**
     * 
     * @param tokenName 
     * @param owner 
     * @param spender 
     * @param amount 用原数据， 比如1 就是1，非bigInt
     */
    async checkAllowance(tokenName: string, owner: string, spender: string, amount: number) {
        const tokenInfo: TokenInfo = getTokenInfo(tokenName);
        if (tokenInfo.contract !== "0x0000000000000000000000000000000000000001") {
            const allowanceBigInt = await this.allowance(tokenName, owner, spender);

            console.log("tokenName", tokenName, "amount", fromDecimal(amount, tokenInfo.decimal), "allowanceBigInt", Number(allowanceBigInt), fromDecimal(amount, tokenInfo.decimal) - Number(allowanceBigInt) <= 0)

            return fromDecimal(amount, tokenInfo.decimal) - Number(allowanceBigInt) <= 0;
        } else {
            return true;
        }

    }
}


