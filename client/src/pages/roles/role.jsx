import React from "react";
import "./role.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Cards from "../../components/cards/cards";
import studentIcon from "../../assets/icons/studentIcon.png";
import employerIcon from "../../assets/icons/employerIcon.png";
import instituteIcon from "../../assets/icons/instituteIcon.png";
import { Link } from "react-router-dom";

const role = () => {
  return (
    <>
      <Header />
      <h2>Choose Your Role First</h2>
      <p>
        To Connect Wallet you have to first pick your role, the role you want to
        log in as
      </p>
      <section id="role-cards">
        <Link to="/roles/student">
          <Cards buttonLabel="Student" imgSrc={studentIcon} />
        </Link>
        <Link to="/roles/institute">
          <Cards buttonLabel="Academic Institution" imgSrc={instituteIcon} />
        </Link>
        <Link to="/roles/employer">
          <Cards buttonLabel="Employer" imgSrc={employerIcon} />
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default role;
