import React from "react";
import "./home.css";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <>
      <Header />
      <section>
        <h1>Store and Verify your Digital Credentials📂</h1>
        <p>Now faster and more secure using Blockchain Technology.🔒🌐</p>
        <Link to="/roles">
          <Button label="Get Started" />
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default home;
