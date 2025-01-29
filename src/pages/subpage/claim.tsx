import { Container, Button, Box, Typography } from "@mui/material";
import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";
import { getContract } from "@/config/contracts";
import abi from "@/config/abi/contract/uchatNode.json";
import { UchatNodeService } from "@/service/UchatNodeService";

export default function Claim() {
    const uchatNodeService = new UchatNodeService();
    const account = useAddress();

    // State for storing data
    const [nodeInfo, setNodeInfo] = useState<any | null>(null);
    const [claimableUchat, setClaimableUchat] = useState<number | null>(null);
    const [result, setResult] = useState<string>("");

    // Fetch node information
    const getNodeInfo = async () => {
        try {
            const info = await uchatNodeService.getNodeInfo(account || "");
            setNodeInfo(info);
            setResult(`节点信息: ${JSON.stringify(info, null, 2)}`);
        } catch (error) {
            console.error(error);
            setResult("获取节点信息失败");
        }
    };

    // Fetch claimable Uchat
    const getClaimableUchat = async () => {
        try {
            const claimable = await uchatNodeService.getClaimbleUchat(account || "");
            setClaimableUchat(Number(claimable));
            setResult(`可领取的 Uchat: ${claimable}`);
        } catch (error) {
            console.error(error);
            setResult("获取可领取的 Uchat 失败");
        }
    };

    return (
        <Container sx={{ paddingTop: "20px" }}>
            <ConnectWallet />
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                领取收益
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button variant="contained" onClick={getNodeInfo}>
                    获取节点信息
                </Button>
                <Button variant="contained" onClick={getClaimableUchat}>
                    获取可领取的 Uchat
                </Button>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    操作步骤：
                </Typography>
                <Typography variant="body1">
                    第一步：点击上方按钮获取节点信息和可领取的 Uchat。
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                    第二步：点击下方按钮调用合约领取收益。
                </Typography>
                <Web3Button
                    contractAddress={getContract("uchatNode")}
                    contractAbi={abi}
                    action={async (contract) => {
                        try {
                            const tx = await contract.call("claimUchat");
                            setResult(`领取成功: ${tx.receipt.transactionHash}`);
                        } catch (error: any) {
                            console.error(error);
                            setResult(`领取失败: ${error.message}`);
                        }
                    }}
                >
                    领取收益
                </Web3Button>
            </Box>
            <Box sx={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <Typography variant="h6">结果:</Typography>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{result || "无结果"}</pre>
            </Box>
        </Container>
    );
}