import { chainId } from "@/consts/parameters";

interface Contracts {
  [key: string]: { [chainId: number]: string };
}

export const contracts: Contracts = {
  uchatNode: {
    97: "0xD56ba0Eac228Ee660a51F8bC84e512574386b31f",
  }
};

export function getContract(name: string) {
  return contracts[name][chainId];
}
