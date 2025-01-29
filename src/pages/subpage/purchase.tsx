import { getContract } from "@/config/contracts";
import { UchatNodeService } from "@/service/UchatNodeService";
import { Container, Button, Box, Typography } from "@mui/material";
import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import abi from "@/config/abi/contract/uchatNode.json";
import tokenAbi from "@/config/abi/token/usdt.json";
import { ethers } from "ethers";

import { OracleService } from "@/service/OracleService";
import { PurchaseParameter } from "@/interfaces/PurchaseParameter";
import { getToken } from "@/config/tokens";

export default function Purchase() {
    const uchatNodeService = new UchatNodeService();
    const account = useAddress();

    // State for storing data
    const [batchId, setBatchId] = useState<number | null>(null);
    const [nodeCount, setNodeCount] = useState<number | null>(null);
    const [saleConfig, setSaleConfig] = useState<any | null>(null);
    const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
    const [result, setResult] = useState<string>("");

    // Fetch current batch
    const getCurrentBatch = async () => {
        try {
            const batchId = await uchatNodeService.getCurrentBatch();
            setBatchId(Number(batchId));
            setResult(`当前批次ID: ${batchId}`);
        } catch (error) {
            console.error(error);
            setResult("获取当前批次失败");
        }
    };

    // Fetch node count by batch ID
    const getNodeCountByBatch = async () => {
        if (batchId === null) {
            setResult("请先获取当前批次");
            return;
        }
        try {
            const count = await uchatNodeService.getNodeCountByBatch(batchId);
            setNodeCount(Number(count));
            setResult(`批次 ${batchId} 的节点数量: ${count}`);
        } catch (error) {
            console.error(error);
            setResult("获取节点数量失败");
        }
    };

    // Fetch node sale configuration
    const getNodeSaleConfig = async () => {
        if (batchId === null) {
            setResult("请先获取当前批次");
            return;
        }
        try {
            const config = await uchatNodeService.getNodeSaleConfig(batchId);
            setSaleConfig(config);
            setResult(`批次 ${batchId} 的节点销售配置: ${JSON.stringify(config, null, 2)}`);
        } catch (error) {
            console.error(error);
            setResult("获取节点销售配置失败");
        }
    };

    // Fetch wallet addresses by batch ID
    const getWalletAddressesByBatch = async () => {
        if (batchId === null) {
            setResult("请先获取当前批次");
            return;
        }
        try {
            const addresses = await uchatNodeService.getWalletAddressesByBatch(batchId);
            setWalletAddresses(addresses);
            setResult(`批次 ${batchId} 的节点钱包地址: ${addresses.join(", ")}`);
        } catch (error) {
            console.error(error);
            setResult("获取节点钱包地址失败");
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
                购买节点
            </Typography>
            <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button variant="contained" onClick={getCurrentBatch}>
                    获取当前批次
                </Button>
                <Button variant="contained" onClick={getNodeCountByBatch} disabled={batchId === null}>
                    获取当前批次的节点数量
                </Button>
                <Button variant="contained" onClick={getNodeSaleConfig} disabled={batchId === null}>
                    获取当前批次的节点销售配置
                </Button>
                <Button variant="contained" onClick={getWalletAddressesByBatch} disabled={batchId === null}>
                    获取当前批次的节点钱包地址
                </Button>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    操作步骤：
                </Typography>
                <Typography variant="body1">
                    第一步： 首先需要用户授权USDT（Approve） 给节点购买合约。
                </Typography>
                <Typography variant="body1">
                    第二步：向 Oracle 获取请求参数。
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                    第三步：调用合约的 <code>purchaseNode</code> 方法完成节点购买。
                </Typography>
                <Web3Button
                    contractAddress={getToken("usdt")}
                    contractAbi={tokenAbi}
                    action={async (contact) => {
                        const spender = getContract('uchatNode');
                        await contact.call("approve", [
                            spender,
                            ethers.constants.MaxUint256,
                        ])
                    }}
                    onSuccess={() => {
                        setResult("授权USDT成功");
                    }}
                    onError={(e) => {
                        setResult(`授权USDT失败: ${e.message}`);
                    }}>
                    授权USDT
                </Web3Button>

                <Web3Button
                    style={{ marginLeft: "15px" }}
                    contractAddress={getContract("uchatNode")}
                    contractAbi={abi}
                    action={async (contract) => {
                        try {
                            const oracleService = new OracleService();
                            const response = await oracleService.purchaseCreate(account?.toString() || "", batchId || 0);
                            if (response.code !== 200) {
                                setResult(`购买节点失败: ${response.message}`);
                                return;
                            }
                            const purchaseParam: PurchaseParameter = response.data;
                            const tx = await contract.call("purchaseNode", [
                                purchaseParam.batchId,
                                purchaseParam.refferral,
                                purchaseParam.timestamp,
                                purchaseParam.signature
                            ]);
                            setResult(`购买节点成功: ${tx.receipt.transactionHash}`);
                        } catch (error: any) {
                            console.error(error);
                            setResult(`购买节点失败: ${error.message}`);
                        }
                    }}
                >
                    购买节点
                </Web3Button>
            </Box>
            <Box sx={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <Typography variant="h6">结果:</Typography>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{result || "无结果"}</pre>
            </Box>
        </Container>
    );
}