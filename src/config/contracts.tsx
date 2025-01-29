import { chainId } from "@/consts/parameters";

interface Contracts {
  [key: string]: { [chainId: number]: string };
}

export const contracts: Contracts = {
  uchatNode: {
    97: "0xcF052Cb400e327fB71B50777D321Bb4fdFF3f51A",
  }
};

export function getContract(name: string) {
  return contracts[name][chainId];
}
