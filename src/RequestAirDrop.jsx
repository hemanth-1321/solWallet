import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export const RequestAirDrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function reqAirDrop() {
    if (!wallet.publicKey) return alert("Wallet not connected");
    if (!amount || isNaN(amount)) return alert("Enter a valid amount");

    setLoading(true);
    try {
      const sig = await connection.requestAirdrop(
        wallet.publicKey,
        parseFloat(amount) * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(sig);
      alert("Airdrop successful! Signature:\n" + sig);
    } catch (err) {
      console.error(err);
      alert("Airdrop failed.");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
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
      <h2 style={{ margin: 0, fontSize: "24px" }}>💸 Request Airdrop</h2>

      <input
        type="text"
        placeholder="Enter amount in SOL"
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
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={reqAirDrop}
        disabled={loading}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          backgroundColor: loading ? "#9e9e9e" : "#00c853",
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: "16px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "transform 0.2s, background 0.3s",
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.target.style.backgroundColor = "#00b94f";
            e.target.style.transform = "scale(1.05)";
          }
        }}
        onMouseOut={(e) => {
          if (!loading) {
            e.target.style.backgroundColor = "#00c853";
            e.target.style.transform = "scale(1)";
          }
        }}
      >
        {loading ? "Requesting..." : "Request"}
      </button>

      {wallet.publicKey ? (
        <div
          style={{
            marginTop: "10px",
            wordBreak: "break-all",
            backgroundColor: "#2e2e3d",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#90ee90",
            textAlign: "center",
          }}
        >
          <strong>Connected Wallet:</strong>
          <br />
          {wallet.publicKey.toBase58()}
        </div>
      ) : (
        <p style={{ fontSize: "14px", color: "#f44336" }}>
          Wallet not connected
        </p>
      )}
    </div>
  );
};
