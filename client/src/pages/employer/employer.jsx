import React, { useState } from "react";
import "./employer.css";
import employerIcon from "../../assets/icons/employerIcon.png";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";
import WalletCard from "../../components/walletCard/walletCard";
import ConnectedCard from "../../components/connectedCard/connectedCard";
import ProfileCard from "../../components/profileCard/profileCard";
import { useForm } from "react-hook-form";

const Employer = () => {
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
        <WalletCard
          imgSrc={employerIcon}
          heading="CREDCHAIN For Employers.👨🏻‍💼💼"
          intro="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum velit
          fuga officia modi aliquam"
        />
      )}
      <Footer />
    </>
  );
};

export default Employer;
