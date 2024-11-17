import React, { useState, useEffect } from "react";
import "./employer.css";
import employerIcon from "../../assets/icons/employerIcon.png";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";
import WalletCard from "../../components/walletCard/walletCard";
import ConnectedCard from "../../components/connectedCard/connectedCard";
import ProfileCard from "../../components/profileCard/profileCard";
import { useForm } from "react-hook-form";

import Web3 from "web3";
import userABI from "../../abi/User.json";
// import credChainABI from "../../abi/CredChain.json";
const userContractAddress = "0x2dD6cC40fFCcF141C20fD660f77A2dC7c1Bb8e9e";
// const credChainContractAddress = "0xe270F382e3AA0B07f6a962014700AC2Cb64c91e9";

const Employer = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      let o;
      const web3Instance = new Web3(window.ethereum);
      const contractInstance = new web3Instance.eth.Contract(
        userABI,
        userContractAddress
      );
      setWeb3(web3Instance);
      setContract(contractInstance);
    } else {
      console.error("No web3 provider detected");
    }
  }, []);

  useEffect(() => {
    setLoggedIn(false);
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setLoggedIn(true);
        // displayTweets(accounts[0]);
      } catch (error) {
        if (error.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      }
    } else {
      console.error("No web3 provider detected.");
    }
  };

  const shortAddress = (address, startLength = 6, endLength = 4) => {
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isConnected, setIsConnected] = useState(true);
  const connect = () => {
    setIsConnected(true);
  };
  const disconnect = () => {
    setIsConnected(false);
  };

  function onSubmit() {}
  return (
    <>
      <Header />
      <ProfileCard />
      {account ? (
        <div className="connected-display">
          <ConnectedCard
            connectedAccountAddress="0xd0415ad....32cE"
            imgSrc={employerIcon}
            intro1="Enter student details to issue certificate from the Institute.📝"
            intro2="These details are stored in Blockchain and can't be tempered with.🔒"
          />
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Certificate Hash</label>
              <input {...register("certificateHash")} />
              <Button type="submit" label="Verify Certificate" />
            </form>
          </div>
        </div>
      ) : (
        <div className="connect-display">
          <WalletCard
            imgSrc={employerIcon}
            heading="CREDCHAIN For Institutes.🏫"
            intro="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum velit"
          />
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Employer;
