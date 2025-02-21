import { getContract } from "@/config/contracts";
import { Container, Button, Box, Typography } from "@mui/material";
import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import abi from "@/config/abi/contract/dailyDividendDistributor.json";
import { DailyDividendDistributorService } from "@/service/DailyDividendDistributorService";

export default function DailyDividendDistributor() {
    const dailyDividendDistributorService = new DailyDividendDistributorService();
    const account = useAddress();
    const [result, setResult] = useState<string>("");

    const isWalletExist = async () => {
        try {
            if (account === null || account === "") {
                setResult("请先connect wallet");
                return false;
            }
            const state = await dailyDividendDistributorService.isWalletExist(account || "");
            setResult(state.toString());
        } catch (error) {
            console.error(error);
            setResult("获取失败");
        }
    };

    const getWalletBalance = async () => {
        try {
            if (account === null || account === "") {
                setResult("请先connect wallet");
                return false;
            }
            const balance = await dailyDividendDistributorService.getWalletBalance(account || "");
            setResult(balance.toString());
        } catch (error) {
            console.error(error);
            setResult("获取失败");
        }
    };

    // Log account changes
    useEffect(() => {
        console.log("Current account:", account);
    }, [account]);

    return (
        <Container sx={{ paddingTop: "20px" }}>
            <ConnectWallet />
            <Typography variant="h4" sx={{ marginTop: "20px" }}>
                节点分红
            </Typography>
            <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button variant="contained" onClick={isWalletExist}>
                    判断是否有资格领取节点分红
                </Button>
            </Box>
            <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button variant="contained" onClick={getWalletBalance}>
                    获取可领取的USDT数量
                </Button>
            </Box>
            <Box sx={{ marginTop: "20px" }}>

                <Web3Button
                    style={{ width: '100%' }}
                    contractAddress={getContract("dailyDividendDistributor")}
                    contractAbi={abi}
                    action={async (contract) => {
                        try {
                            const tx = await contract.call("claimDividend", []);
                            setResult(`领取节点分红成功: ${tx.receipt.transactionHash}`);
                        } catch (error: any) {
                            console.error(error);
                            setResult(`领取节点分红失败: ${error.message}`);
                        }
                    }}
                >
                    领取分红
                </Web3Button>
            </Box>
            <Box sx={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <Typography variant="h6">结果:</Typography>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{result || "无结果"}</pre>
            </Box>
        </Container>
    );
}