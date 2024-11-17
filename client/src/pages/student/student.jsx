import React, { useState, useEffect } from "react";
import "./student.css";
import Header from "../../components/header/header";
import WalletCard from "../../components/walletCard/walletCard";
import Footer from "../../components/footer/footer";
import StudentIcon from "../../assets/icons/studentIcon.png";
import ConnectedCard from "../../components/connectedCard/connectedCard";
import ProfileCard from "../../components/profileCard/profileCard";
import Connect from "../../components/connect-btn/connectBtn";

const Student = () => {
  const [profileExists, setProfileExists] = useState(null);
  const [profileContract, setProfileContract] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getCertificates() {
    if (!web3 || !contract) {
      console.error("Web3 or contract not initialized.");
      return;
    }

    const tempCertificates = await contract.methods
      .getAllCertificates(account)
      .call();
    // we do this so we can sort the certificates by timestamp
    const certificates = [...tempCertificates];
    certificates.sort((a, b) => b.timestamp - a.timestamp);
    setCertificates(certificates);
    setLoading(false);
  }

  async function checkProfile() {
    const userProfile = await getProfile(account);

    setProfileExists(userProfile);
  }

  async function getProfile() {
    if (!web3 || !profileContract || !account) {
      console.error(
        "Web3 or profileContract not initialized or account not connected."
      );
      return;
    }

    const profile = await profileContract.methods.getProfile(account).call();
    setLoading(false);
    return profile.displayName;
  }

  useEffect(() => {
    if (contract && account) {
      if (profileExists) {
        getCertificates();
      } else {
        checkProfile();
      }
    }
  }, [contract, account, profileExists]);

  function shortAddress(address, startLength = 6, endLength = 4) {
    if (address === account && profileExists) {
      return profileExists;
    } else if (address) {
      return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }
  }

  return (
    <>
      <Header />
      <ProfileCard />
      <ConnectedCard imgSrc={StudentIcon} />
      <h2>ISSUED CERTIFICATES :</h2>
      <p>
        All the Certificate that you have are listed below.Sorted from latest to
        oldest ones.🤓
      </p>
      {!loading && account && profileExists
        ? getCertificates
        : // <>
          //   <AddTweet
          //     contract={contract}
          //     account={account}
          //     getTweets={getTweets}
          //   />
          //   <Tweets tweets={tweets} shortAddress={shortAddress} />
          // </>
          account &&
          !loading && (
            <ProfileCard />
            // <ProfileCreation
            //   account={account}
            //   profileContract={profileContract}
            //   checkProfile={checkProfile}
            // />
          )}
      {/* // <div className="certificateContainer">
        //   <table>
        //     <thead>
        //       <tr>
        //         <th>Sr. No</th>
        //         <th>Certified For</th>
        //         <th>Issue Date</th>
        //         <th>Institute Address</th>
        //         <th>Share</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       <tr>
        //         <td>1</td>
        //         <td>Web Development Basics</td>
        //         <td>2024-08-15</td>
        //         <td>0xd0415ad....32cE</td>
        //         <td>
        //           <a href="#">Share</a>
        //         </td>
        //       </tr>
        //       <tr>
        //         <td>2</td>
        //         <td>Blockchain Fundamentals</td>
        //         <td>2024-06-20</td>
        //         <td>0xd0415ad....32cE</td>
        //         <td>
        //           <a href="#">Share</a>
        //         </td>
        //       </tr>
        //     </tbody>
        //   </table>
        // </div> */}

      <Footer />
    </>
  );
};

export default Student;
