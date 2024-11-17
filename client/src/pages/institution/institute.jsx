import React, { useState } from "react";
import "./institute.css";
import instituteIcon from "../../assets/icons/instituteIcon.png";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";
import WalletCard from "../../components/walletCard/walletCard";
import { useForm } from "react-hook-form";
import ConnectedCard from "../../components/connectedCard/connectedCard";
import ProfileCard from "../../components/profileCard/profileCard";

const Institute = () => {
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
      {isConnected ? (
        <div className="connected-display">
          <ConnectedCard
            connectedAccountAddress="0xd0415ad....32cE"
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
        <WalletCard
          imgSrc={instituteIcon}
          heading="CREDCHAIN For Institutes.🏫"
          intro="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum velit
      fuga officia modi aliquam"
        />
      )}
      <Footer />
    </>
  );
};

export default Institute;
