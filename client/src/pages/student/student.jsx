import React, { useState } from "react";
import "./student.css";
import Header from "../../components/header/header";
import WalletCard from "../../components/walletCard/walletCard";
import Footer from "../../components/footer/footer";
import StudentIcon from "../../assets/icons/studentIcon.png";
import ConnectedCard from "../../components/connectedCard/connectedCard";
import ProfileCard from "../../components/profileCard/profileCard";

const Student = () => {
  const [isConnected, setIsConnected] = useState(true);

  const connect = () => {
    setIsConnected(true);
  };
  const disconnect = () => {
    setIsConnected(false);
  };

  return (
    <>
      <Header />
      <ProfileCard />
      {isConnected ? (
        <div className="connected-display">
          <ConnectedCard
            connectedAccountAddress="0xd0415ad....32cE"
            imgSrc={StudentIcon}
          />
          <h2>ISSUED CERTIFICATES :</h2>
          <p>
            All the Certificate that you have are listed below.Sorted from
            latest to oldest ones.🤓
          </p>
          <div class="certificateContainer">
            <table>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Certified For</th>
                  <th>Issue Date</th>
                  <th>Institute Address</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Web Development Basics</td>
                  <td>2024-08-15</td>
                  <td>0xd0415ad....32cE</td>
                  <td>
                    <a href="#">Share</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Blockchain Fundamentals</td>
                  <td>2024-06-20</td>
                  <td>0xd0415ad....32cE</td>
                  <td>
                    <a href="#">Share</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <WalletCard
          imgSrc={StudentIcon}
          heading="CREDCHAIN For Students.🧑🏻‍🎓"
          intro="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum velit"
        />
      )}

      <Footer />
    </>
  );
};

export default Student;
