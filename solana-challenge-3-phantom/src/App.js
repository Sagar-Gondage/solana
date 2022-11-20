import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";

/**
 * @description gets Phantom provider, if it exists
 */
const getProvider = () => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana;
    if (provider.isPhantom) return provider;
  }
};
function App() {
  // create state variable for the provider
  const [provider, setProvider] = useState(undefined);
  // create state variable for the wallet key
  const [walletKey, setWalletKey] = useState(undefined);
  // this is the function that runs whenever the component updates (e.g. render, refresh)
  useEffect(() => {
    const provider = getProvider();
    // if the phantom provider exists, set this as the provider
    if (provider) setProvider(provider);
    else setProvider(undefined);
  }, []);
  /**
   * @description prompts user to connect wallet if it exists.
   * This function is called when the connect wallet button is clicked
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;
    // checks if phantom wallet exists
    if (solana) {
      try {
        // connects wallet and returns response which includes the wallet public key
        const response = await solana.connect();
        console.log("wallet account ", response.publicKey.toString());
        // update walletKey to be the public key
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        console.log("error here", err);
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };

  const disConnectWallet = async () => {
    const { solana } = window;
    try {
      // const response = await solana.disConnectWallet;
      setWalletKey(undefined);
    } catch (err) {
      console.log("Error", err);
    }
  };
  // HTML code for the app
  return (
    <div className="App">
      <header>
        <h2>Connect to Phantom Wallet</h2>
      </header>
      {provider && !walletKey && (
        <button
          style={{
            fontSize: "16px",
            padding: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
      {provider && walletKey && (
        <>
          <p>Connected account</p>
          <button
            style={{
              fontSize: "16px",
              padding: "15px",
              fontWeight: "bold",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={disConnectWallet}
          >
            DisConnect Wallet
          </button>
        </>
      )}
      {!provider && (
        <p>
          No provider found. Install{" "}
          <a href="https://phantom.app/">Phantom Browser extension</a>
        </p>
      )}
    </div>
  );
}

export default App;
