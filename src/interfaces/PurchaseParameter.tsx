export class PurchaseParameter {
    batchId: number;
    refferral: string;
    timestamp: number;
    signature: string;
    constructor() {
        this.batchId = 0;
        this.refferral = "";
        this.timestamp = 0;
        this.signature = "";
    }
}