import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Menu, X } from "lucide-react"; // ✅ Hamburger icons

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handlerlogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-6 text-white">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-lg">
          Job <span className="text-sky-400">Portal</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-white">
          {user ? (
            user.role === "recruiter" ? (
              <>
                <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )
          ) : (
            <>
              <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="hover:text-yellow-400 transition duration-300 hover:scale-105 cursor-pointer">
                <Link to="/browse">Browse</Link>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white shadow-md rounded-xl">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black shadow-md rounded-xl">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:scale-110 transition duration-300 shadow-md ring-2 ring-sky-300 text-black">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@user"
                    className="w-10 h-10 rounded-full"
                  />
                  <AvatarFallback>{user?.fullname[0]}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 mt-2 rounded-2xl shadow-2xl bg-slate-900 text-black border border-slate-700">
                {/* Profile Section */}
                <div className="flex gap-4 items-start">
                  <Avatar className="w-12 h-12 shadow-md ring-2 ring-slate-600 text-black">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                    <AvatarFallback>{user?.fullname[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-bold tracking-wide text-sky-400 hover:text-blue-500 transition duration-300">
                      {user.fullname}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1 leading-snug">
                      {user?.profile?.bio || "No bio added"}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-end gap-4">
                  {user && user.role === "student" && (
                    <Button
                      variant="ghost"
                      className="rounded-xl border border-sky-500 text-sky-300 hover:bg-sky-500 hover:text-white transition duration-300"
                    >
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  )}
                  <Button
                    onClick={handlerlogout}
                    variant="ghost"
                    className="rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-md"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {menuOpen ? (
            <X
              size={28}
              className="cursor-pointer text-white"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              size={28}
              className="cursor-pointer text-white"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <ul className="flex flex-col items-start gap-4 p-6 text-white font-medium">
            {user ? (
              user.role === "recruiter" ? (
                <>
                  <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>
                    Companies
                  </Link>
                  <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>
                    Jobs
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                    Jobs
                  </Link>
                  <Link to="/browse" onClick={() => setMenuOpen(false)}>
                    Browse
                  </Link>
                </>
              )
            ) : (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/jobs" onClick={() => setMenuOpen(false)}>
                  Jobs
                </Link>
                <Link to="/browse" onClick={() => setMenuOpen(false)}>
                  Browse
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full mt-2 bg-sky-500 hover:bg-sky-600 text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black">
                    Signup
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <Button
                onClick={() => {
                  handlerlogout();
                  setMenuOpen(false);
                }}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
