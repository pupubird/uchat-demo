import axios from 'axios';

const hosts = import.meta.env.VITE_ORACLE_URL;

export class OracleService {
    async purchaseCreate(account: string, batchId: number) {
        const url = `${hosts}/purchase/create`;
        const params = {
            account: account,
            batchId: batchId,
        }
        try {
            const response = await axios.post(url, params);
            const res = response.data;
            return res;
        } catch (error) {
            console.error("Error fetching data: ", error);
            throw error;
        }
    }
}