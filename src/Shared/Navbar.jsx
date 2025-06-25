import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import Logo from "../assets/images/Logo/Sipawayy.png";
import Container from "./Container";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const role = localStorage.getItem("role");
  const token = userToken?.token;
  const { data: barprofileinfo } = useFetchData("/api/me", token);
  console.log(barprofileinfo);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <nav className="fixed w-full z-50">
      <Container>
        <div className="mt-[20px] lg:mt-[45px] rounded-[8px] font-ITCKabelStd border-[0.2px] border-[#DBA514]/30 bg-[rgba(42,46,53,0.8)] mx-3 px-6 py-2 flex justify-between items-center">
          <div className=" flex justify-between items-center w-full lg:w-auto">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
            {/* Mobile view */}
            <div className="lg:hidden text-white flex">
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
          <ul
            ref={menuRef}
            className={` lg:flex flex-col items-center lg:flex-row gap-y-2 lg:gap-x-4
    absolute lg:static top-full left-0 w-[calc(100%-.9rem*2)] lg:w-auto
    bg-[rgba(30,30,30,0.85)] lg:bg-transparent py-4 mx-3 lg:mx-0 lg:p-0 rounded-b-lg lg:rounded-none
    transition-all duration-600 ease-[cubic-bezier(0.4, 0, 0.2, 1)] z-40
    ${isOpen ? "translate-x-0  opacity-100" : "-translate-x-full  opacity-0"}
    lg:translate-x-0 lg:translate-y-0 lg:opacity-100
  `}
          >
            <li className="py-2 px-6 capitalize font-semibold text-[14px] text-[#F8F8FF] hover:text-[#E9B20C] duration-300 ease-in-out cursor-pointer">
              <Link Link="/">Home</Link>
            </li>
            <li className="py-2 px-6 capitalize font-semibold text-[14px] text-[#F8F8FF] hover:text-[#E9B20C] duration-300 ease-in-out cursor-pointer">
              <Link to="/bar">bars</Link>
            </li>
            <li className="py-2 px-6  capitalize font-semibold text-[14px] text-[#F8F8FF] hover:text-[#E9B20C] duration-300 ease-in-out cursor-pointer">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li className="py-2 px-6  capitalize font-semibold text-[14px] text-[#F8F8FF] hover:text-[#E9B20C] duration-300 ease-in-out cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="py-2 px-6 capitalize font-semibold text-[14px] text-[#F8F8FF] hover:text-[#E9B20C] duration-300 ease-in-out cursor-pointer">
              {userToken ? (
                role === "bar_owner" ? (
                  <Link to="/bar-dashboard/order">Dashboard</Link>
                ) : role === "user" ? (
                  <Link to="/user-dashboard">Dashboard</Link>
                ) : (
                  <Link to="/login">Dashboard</Link>
                )
              ) : (
                <Link to="/login">Dashboard</Link>
              )}
            </li>
            {/* login & signup */}
            <div className="flex gap-x-2 pt-3 px-6 lg:px-0 lg:pt-0">
              {token && role ? (
                <Link
                  to={
                    role === "user" ? "/user-dashboard" : "/bar-dashboard/order"
                  }
                  className="flex items-center gap-2 leading-none text-black text-lg font-medium bg-[#DBA514] py-2 px-3 rounded-[4px]"
                >
                  <img
                    src={
                      barprofileinfo?.data?.cover_photo
                        ? `${import.meta.env.VITE_BASE_URL}/${
                            barprofileinfo.data.cover_photo
                          }`
                        : "https://i.ibb.co.com/XkYLH2xR/avatar.png"
                    }
                    alt="avatar"
                    className="size-[30px] rounded-full shrink-0 object-cover"
                  />
                  <h3>{barprofileinfo?.data?.name ?? ""}</h3>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                  <button className="flex justify-center items-center leading-none px-5 sm:px-8 py-3 sm:py-4 capitalize font-semibold text-[14px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer">
                      log in
                    </button>
                  </Link>
                  <Link to="/sign-up">
                    <button className="flex justify-center items-center leading-none px-5 sm:px-8 py-3 sm:py-4 capitalize font-semibold text-[14px] rounded-lg bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] backdrop-blur-[6.5px] text-[#0E0E0E] cursor-pointer">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
