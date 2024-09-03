import React from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import UserDetails from "./UserDetails";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      {user && user.role === "user" ? <UserDetails /> : ""}
      <Footer />
    </div>
  );
}

export default Home;
