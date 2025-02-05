import { chainId } from "@/consts/parameters";

interface Contracts {
  [key: string]: { [chainId: number]: string };
}

export const contracts: Contracts = {
  uchatNode: {
    97: "0xC00c05D51bAc4BB6266Ee2dC33b7C41Aa5cc1F23",
  }
};

export function getContract(name: string) {
  return contracts[name][chainId];
}
