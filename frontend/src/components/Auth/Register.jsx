import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { BASE_URL_API_USER } from "../../utils/baseUrl.js";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Register() {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const userData = {
      name: data.name,
      emailId: data.emailId,
      password: data.password,
      gender: data.gender,
    };
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${BASE_URL_API_USER}/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            {/* Full Name Input */}
            <div className="form-control md:mb-4">
              <label className="label">
                <span className="text-black">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered input-primary w-full"
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="form-control md:mb-4">
              <label className="label">
                <span className="text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className={`input input-bordered input-primary w-full ${
                  errors.emailId ? "border-red-500" : ""
                }`}
                {...register("emailId", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
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
                className={`input input-bordered input-primary w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Gender Radio Buttons */}
            <div className="form-control mb-6">
              <div className="flex md:gap-4">
                <label className="label">
                  <span className="text-black">Gender</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Male"
                    className="radio checked:bg-green-600"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  <span className="text-black md:ml-2">Male</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    value="Female"
                    className="radio checked:bg-red-500"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  <span className="text-black md:ml-2">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="form-control flex flex-row gap-4">
              <div className="w-full md:w-1/2">
                <button
                  type="submit"
                  className="btn btn-success w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              <div className="w-full md:w-1/2">
                <Link to="/login">
                  <button className="btn btn-error w-full" disabled={loading}>
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
