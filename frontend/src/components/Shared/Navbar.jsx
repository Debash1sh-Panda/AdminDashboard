import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_API_USER } from "../../utils/baseUrl";
import { setUser } from "../../redux/authSlice";
import toast from "react-hot-toast";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import { setSearchUserByText } from "../../redux/userSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL_API_USER}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Update search text in Redux state
  useEffect(() => {
    dispatch(setSearchUserByText(input));
  }, [input, dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar bg-slate-400 mt-0 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between w-full items-center">
        {/* Left Side - Buttons for Admin */}
        {user?.role === "admin" ? (
          <div className="flex items-center md:ml-10 space-x-2 md:space-x-4">
            {/* Hamburger menu icon for mobile */}
            <button className="block md:hidden btn btn-sm" onClick={toggleMenu}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            {/* Navigation Links for larger screens */}
            <div className={`hidden md:flex gap-4 items-center`}>
              <Link to="/admin/home">
                <button className="btn btn-xs md:btn-md">Home</button>
              </Link>
              <Link to="/admin/graph">
                <button className="btn btn-xs md:btn-md">Graph</button>
              </Link>
            </div>
          </div>
        ) : (
          <Link to="/">
            <p className="btn btn-ghost text-xl text-blue-950">Dashboard</p>
          </Link>
        )}

        {/* Mobile menu */}
        {user?.role === "admin" && menuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-slate-400 z-40 flex flex-col items-center pt-20 space-y-4 md:hidden">
            <Link to="/admin/home" onClick={toggleMenu}>
              <button className="btn btn-md">Home</button>
            </Link>
            <Link to="/admin/graph" onClick={toggleMenu}>
              <button className="btn btn-md">Graph</button>
            </Link>
          </div>
        )}

        {/* Right Side - Search Bar or User Menu */}
        <div className="flex items-center ml-auto">
          {user?.role === "admin" ? (
            <>
              <div className="md:flex items-center mr-0 hidden">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-full md:mr-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn rounded-full">
                  <FaSearch />
                </button>
              </div>
              <div className="dropdown dropdown-end md:ml-10 md:mr-10">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src="https://internshala.com/cached_uploads/logo/5e2fddb254f581580195250.png"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <button onClick={logoutHandler} className="btn btn-ghost">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="btn btn-ghost">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="relative">
              {/* Navbar for larger screens */}
              <div className="md:flex items-center ml-auto hidden">
                <Link to="/" className="btn btn-ghost text-blue-950">
                  Home
                </Link>
                <Link to="/login" className="btn btn-ghost text-blue-950 ml-2">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-ghost text-blue-950 ml-2"
                >
                  Signup
                </Link>
              </div>

              {/* Floating Action Button (FAB) for mobile */}
              <div className="md:hidden fixed top-2 right-2">
                <button
                  onClick={toggleMenu}
                  className="bg-blue-950 text-white p-4 rounded-full shadow-lg focus:outline-none"
                >
                  {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Toggleable Menu */}
                {menuOpen && (
                  <div className="absolute right-1 top-16 bg-white shadow-md rounded-md p-4">
                    <Link to="/" className="block mb-2 text-blue-950">
                      Home
                    </Link>
                    <Link to="/login" className="block mb-2 text-blue-950">
                      Login
                    </Link>
                    <Link to="/register" className="block text-blue-950">
                      Signup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
