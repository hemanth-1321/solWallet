import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirDrop } from "./RequestAirDrop";
import ShowBalance from "./ShowBalance";
import { SendSol } from "./SendSol";

function App() {
  return (
    <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              minHeight: "100vh",
              background: "linear-gradient(to right, #141e30, #243b55)",
              color: "#fff",
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
              padding: "40px 20px",
              boxSizing: "border-box",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "20px",
                borderBottom: "1px solid #444",
                marginBottom: "30px",
              }}
            >
              <h1 style={{ margin: 0, fontSize: "28px" }}>🪙 Solana DApp</h1>
              <div style={{ display: "flex", gap: "12px" }}>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>

            {/* Balance */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <ShowBalance />
            </div>

            {/* Main Content */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                flexWrap: "wrap",
              }}
            >
              <RequestAirDrop />
              <SendSol />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
