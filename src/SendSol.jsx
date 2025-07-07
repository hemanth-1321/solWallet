import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const SendSol = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();
  async function sendSol() {
    if (!to || !amount) {
      alert("Please enter recipient and amount");
      return;
    }

    setLoading(true);

    try {
      // Simulating sending (replace with actual Solana logic)
      await new Promise((res) => setTimeout(res, 2000));
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      // Send transaction using wallet
      const signature = await wallet.sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, "processed");

      alert(`✅ Sent ${amount} SOL to ${to}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send SOL");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "350px",
        margin: "100px auto",
        padding: "30px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #1e1e2f, #2c2c3e)",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
        alignItems: "center",
        color: "#ffffff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "24px" }}>🚀 Send SOL</h2>

      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #555",
          width: "100%",
          fontSize: "16px",
          backgroundColor: "#2e2e3d",
          color: "#fff",
          outline: "none",
        }}
      />

      <input
        type="text"
        placeholder="Amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid #555",
          width: "100%",
          fontSize: "16px",
          backgroundColor: "#2e2e3d",
          color: "#fff",
          outline: "none",
        }}
      />

      <button
        onClick={sendSol}
        disabled={loading}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          backgroundColor: loading ? "#9e9e9e" : "#2979ff",
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "16px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "transform 0.2s, background 0.3s",
        }}
        onMouseOver={(e) => {
          const target = e.currentTarget;
          if (!loading) {
            target.style.backgroundColor = "#1565c0";
            target.style.transform = "scale(1.05)";
          }
        }}
        onMouseOut={(e) => {
          const target = e.currentTarget;
          if (!loading) {
            target.style.backgroundColor = "#2979ff";
            target.style.transform = "scale(1)";
          }
        }}
      >
        {loading ? "Sending..." : "Send SOL"}
      </button>
    </div>
  );
};
