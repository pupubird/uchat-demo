export class NodeInfoEntity {
    batch:number;
    walletAddress:string;
    totalUchatOutput:string;
    claimedUchat:string;
    purchaseTime:number;
    startReleaseTime:number;
    constructor(){
        this.batch = 0;
        this.walletAddress = '';
        this.totalUchatOutput = '0';
        this.claimedUchat = '0';
        this.purchaseTime = new Date().getTime();
        this.startReleaseTime = new Date().getTime();
    }

}