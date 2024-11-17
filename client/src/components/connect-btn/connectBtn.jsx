import Web3 from "web3";
import React from "react";
import userABI from "../../abi/User.json";
import credChainABI from "../../abi/CredChain.json";
const userContractAddress = "0x2dD6cC40fFCcF141C20fD660f77A2dC7c1Bb8e9e";
const credChainContractAddress = "0xe270F382e3AA0B07f6a962014700AC2Cb64c91e9";

const Connect = () => {
  const Connect = ({
    web3,
    account,
    shortAddress,
    setContract,
    setAccount,
    setUserContract,
    setWeb3,
  }) => {
    //switches user to sepolia testnet
    async function switchToSepolia() {
      try {
        // Request user to switch to Sepolia
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], // Chain ID for Sepolia in hexadecimal
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            // If Sepolia is not added to user's MetaMask, add it
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0xaa36a7",
                  chainName: "Sepolia",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc.sepolia.org"],
                },
              ],
            });
          } catch (addError) {
            console.error(
              "Failed to add Sepolia network to MetaMask",
              addError
            );
          }
        } else {
          console.error("Failed to switch to Sepolia network", switchError);
        }
      }
    }

    async function connectWallet() {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const networkId = await window.ethereum.request({
            method: "net_version",
          });

          if (networkId !== "100") {
            // Network ID for Sepolia
            await switchToSepolia();
          }

          // user enables the app to connect to MetaMask
          const tempWeb3 = new Web3(window.ethereum);
          setWeb3(tempWeb3);
          const credChainInstance = new tempWeb3.eth.Contract(
            credChainABI,
            credChainContractAddress
          );

          const userInstance = new tempWeb3.eth.Contract(
            userABI,
            userContractAddress
          );
          setUserContract(credChainInstance);
          const accounts = await tempWeb3.eth.getAccounts();
          if (accounts.length > 0) {
            setContract(credChainInstance);
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("No web3 provider detected");
      }
    }

    return (
      <>
        <div className="connect">
          {!account ? (
            <button id="connectWalletBtn" onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <div id="userAddress">Connected: {shortAddress(account)}</div>
          )}
        </div>
        <div id="connectMessage">
          {!account ? "Please connect your wallet to tweet." : ""}
        </div>
      </>
    );
  };
};

export default Connect;
