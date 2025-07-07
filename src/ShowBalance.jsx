import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const ShowBalance = () => {
  const [balance, setBalance] = useState(null);
  const { connection } = useConnection();
  const wallet = useWallet();

  async function getBalance() {
    if (!wallet.publicKey) return;
    const mybalance = await connection.getBalance(wallet.publicKey);
    setBalance(mybalance / LAMPORTS_PER_SOL);
  }

  useEffect(() => {
    getBalance();
  }, [wallet.publicKey, connection]);

  return (
    <div style={{ color: "black", textAlign: "center", fontSize: "18px" }}>
      {wallet.publicKey ? (
        <p>💰 Balance: {balance !== null ? `${balance} SOL` : "Loading..."}</p>
      ) : (
        <p>🔌 Wallet not connected</p>
      )}
    </div>
  );
};

export default ShowBalance;
