import { chainId } from "@/consts/parameters";

interface Contracts {
  [key: string]: { [chainId: number]: string };
}

export const contracts: Contracts = {
  uchatNode: {
    56: "0xbE6672a8aC4143e5582170cb43e9f6C67b6eb09E",
  }
};

export function getContract(name: string) {
  return contracts[name][chainId];
}
