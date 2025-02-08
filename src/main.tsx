import React from "react";
import { createRoot } from "react-dom/client";
import { coinbaseWallet, metamaskWallet, okxWallet, phantomWallet, ThirdwebProvider, trustWallet, walletConnect } from "@thirdweb-dev/react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./styles/globals.scss";
import {
  walletConnectProjectId,
  clientIdConst,
} from "./consts/parameters";
import Index from "./pages/Index";
import Purchase from "./pages/subpage/purchase";
import Claim from "./pages/subpage/claim";
import { CssBaseline } from "@mui/material";
import i18n from './utils/i18n'; // Ensure the path is correct
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root");
const root = createRoot(container!);
const clientId = clientIdConst || "";


const tokenPocketWalletConfig = walletConnect({ projectId: walletConnectProjectId });
tokenPocketWalletConfig.meta.name = "TokenPocket";
tokenPocketWalletConfig.meta.iconURL = "/icons/TokenPocket-wallet-logo.png";

// Layout component to handle conditional rendering of Header and Footer
const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  return (
    <>
      {children}
    </>
  );
};

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Router>
        <ThirdwebProvider clientId={clientId} activeChain={'binance'} supportedWallets={[
          metamaskWallet(),
          trustWallet(),
          coinbaseWallet(),
          okxWallet(),
          phantomWallet(),
          walletConnect({ projectId: walletConnectProjectId })
        ]}>
          <CssBaseline />
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/subpage/purchase" element={<Purchase />} />
                  <Route path="/subpage/claim" element={<Claim />} />
                </Routes>
              </Layout>
        </ThirdwebProvider>
        <ToastContainer position="bottom-center" />
      </Router>
    </I18nextProvider>
  </React.StrictMode>,
);