import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Index() {
  const [open, setOpen] = useState(false);

  // 打开提示框
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // 关闭提示框
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <h1>Menus</h1>
        <ul>
          <li>
            <Link to='/subpage/purchase'>购买节点</Link>
          </li>
          <li>
            <Link to='/subpage/claim'>领取收益</Link>
          </li>
          <li>
            {/* 点击时打开提示框 */}
            <Button variant="text" onClick={handleOpenDialog}>
              领取测试USDT
            </Button>
          </li>
          <li>
            <a href='/download/uchatNode.json' download>
              UchatNode的ABI下载
            </a>
          </li>
        </ul>

        <h2>合约地址</h2>
        <ul>
          <li>
            <strong>USDT合约地址：</strong>
            <span>0xF6Ba08f748c5B65bDBD4ab98252e5bF55430Ac39</span>
          </li>
          <li>
            <strong>Uchat合约地址：</strong>
            <span>0x56C1EB14f0064CB3B5ED78F9E5122020d07Fc4dc</span>
          </li>
          <li>
            <strong>UchatNode合约地址：</strong>
            <span>0xcF052Cb400e327fB71B50777D321Bb4fdFF3f51A</span>
          </li>
        </ul>
      </Container>

      {/* 提示框 */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>领取测试USDT</DialogTitle>
        <DialogContent>
          <Typography>
            以下是发币钱包的私钥：
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "5px",
              wordWrap: "break-word",
              marginTop: "10px",
              fontFamily: "monospace",
            }}
          >
            1939330a4f6a97c30b201d7a22f2e3de00ef1bb3daf86891a42adac20f98bc36
          </Typography>
          <Typography sx={{ marginTop: "10px" }}>
            请自行导入到钱包中，获取USDT测试代币。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}