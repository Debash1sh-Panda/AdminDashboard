import React, { useEffect } from "react";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import UserDetails from "./UserDetails";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/home");
    }
  }, [navigate, user?.role]);
  return (
    <div>
      <Navbar />
      {user && user.role === "user" ? <UserDetails /> : ""}
      <Footer />
    </div>
  );
}

export default Home;
