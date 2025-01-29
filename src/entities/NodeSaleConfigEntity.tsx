export class NodeSaleConfigEntity {
    batch: number;
    totalSupply: number;
    totalReleasedPerUser: number;
    price: string;
    isWhitelistOnly: boolean;
    isAppUserOnly: boolean;
    startReleaseTime: number;
    dailyReleasePercent: number;
    state: boolean;
    startSaleTime: number;
    endSaleTime: number;

    constructor() {
        this.batch = 0;
        this.totalSupply = 0;
        this.totalReleasedPerUser = 0;
        this.price = "0";
        this.isWhitelistOnly = false;
        this.isAppUserOnly = false;
        this.startReleaseTime = 0;
        this.dailyReleasePercent = 0;
        this.state = false;
        this.startSaleTime = 0;
        this.endSaleTime = 0;
    }
}