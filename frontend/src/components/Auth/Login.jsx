import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { BASE_URL_API_USER } from "../../utils/baseUrl.js";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${BASE_URL_API_USER}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.userResponse));
        navigate("/");
        toast(res.data.message);
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast(error?.response?.data?.message || "An unexpected error occurred.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen flex items-center justify-center px-4">
        <div className="hero-content w-full max-w-md p-8 bg-white shadow-2xl rounded-lg">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="form-control md:mb-4">
              <label className="label">
                <span className="text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered input-primary w-full"
                {...register("emailId", { required: "Email is required" })}
              />
              {errors.emailId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered input-primary w-full"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="form-control flex flex-row gap-4 mt-8">
              <div className="w-full md:w-1/2">
                <button className="btn btn-error w-full">
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
              <div className="w-full md:w-1/2">
                <Link to="/register">
                  <button className="btn btn-success w-full">Sign Up</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
