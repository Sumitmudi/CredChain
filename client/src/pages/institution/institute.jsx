import React, { useState, useEffect } from "react";
import "./institute.css";
import instituteIcon from "../../assets/icons/instituteIcon.png";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";
import WalletCard from "../../components/walletCard/walletCard";
import { useForm } from "react-hook-form";
import ConnectedCard from "../../components/connectedCard/connectedCard";
import ProfileCard from "../../components/profileCard/profileCard";

import Web3 from "web3";
import userABI from "../../abi/User.json";
// import credChainABI from "../../abi/CredChain.json";
const userContractAddress = "0x2dD6cC40fFCcF141C20fD660f77A2dC7c1Bb8e9e";
// const credChainContractAddress = "0xe270F382e3AA0B07f6a962014700AC2Cb64c91e9";

const Institute = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  // const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  function onSubmit() {}
  return (
    <>
      <Header />
      <ProfileCard />
      {account ? (
        <div className="connected-display">
          <ConnectedCard
            connectedAccountAddress={shortAddress(account)}
            imgSrc={instituteIcon}
            intro1="Enter student details to issue certificate from the Institute.📝"
            intro2="These details are stored in Blockchain and can't be tempered with.🔒"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-group">
              <label>Name</label>
              <input
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Minimum length should be 3",
                  },
                  maxLength: {
                    value: 6,
                    message: "Minimum length should be 3",
                  },
                })}
              />
              <label>Date</label>
              <input {...register("date")} />
            </div>
            <div class="form-group">
              <label>Certified For</label>
              <input
                {...register("certifiedFor", {
                  required: true,
                  minLength: {
                    value: 15,
                    message: "Minimum length should be 15",
                  },
                  maxLength: {
                    value: 35,
                    message: "Minimum length should be 35",
                  },
                })}
              />
              <label>Wallet Address</label>
              <input
                {...register("walletAddress", {
                  required: "Ethereum address is required",
                  validate: (value) => {
                    if (value.length !== 42) {
                      return "Ethereum address must be exactly 42 characters long";
                    }
                    if (!value.startsWith("0x")) {
                      return 'Ethereum address must start with "0x"';
                    }
                    return true;
                  },
                })}
              />
            </div>
            {errors.walletAddress && <p>{errors.walletAddress.message}</p>}
            <Button
              className="issue-cert-btn"
              type="submit"
              label="Issue Certificate"
            />
          </form>
        </div>
      ) : (
        <div className="connect-display">
          <WalletCard
            imgSrc={instituteIcon}
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

export default Institute;
