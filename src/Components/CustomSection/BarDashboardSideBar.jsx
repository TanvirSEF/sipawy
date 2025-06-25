import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../Hooks/Api/UseAxios";
import toast from "react-hot-toast";

const tabs = [
  {
    name: "Order",
    link: "/bar-dashboard/order",
  },
  {
    name: "Inventory",
    link: "/bar-dashboard/inventory",
  },
  {
    name: "Staffs",
    link: "/bar-dashboard/staffs",
  },
  {
    name: "Statistics",
    link: "/bar-dashboard/statistics",
  },
  {
    name: "Settings",
    link: "/bar-dashboard/settings",
  },
];

const BarDashboardSideBar = () => {
  const location = useLocation().pathname;
  const Axios = useAxios();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const tokenData = JSON.parse(localStorage.getItem("usertoken"));
      const token = tokenData?.token;

      if (!token) {
        toast.error("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      await Axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("usertoken");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <section className="h-full">
      <div className="min-h-screen w-[280px] xl:w-[350px] bg-[#1f1b1b] px-8 xl:px-16 pb-20 pt-12  flex flex-col justify-between gap-12">
        <Link to="/">
          {/* Show full title on larger screens only */}
          <h2 className="text-[#F1B906] text-3xl sm:text-4xl font-bold text-center hidden lg:block">
            Sipawayy
          </h2>
        </Link>

        <div className="flex flex-col gap-[20px] flex-grow">
          {tabs.map((tab, idx) => (
            <Link
              key={idx}
              to={tab.link}
              className={cn(
                `w-full hover:bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] border border-[#F1B906] block py-3 sm:py-4 rounded-md text-center text-base sm:text-lg font-medium tracking-wide text-white hover:text-[#0E0E0E] transition-all duration-300 group`,
                {
                  "bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] text-[#0E0E0E]":
                    location === tab.link,
                }
              )}
            >
              <span className="inline-block transition-transform duration-300 group-hover:scale-110 origin-top">
                {tab.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full hover:bg-[linear-gradient(92deg,_#DBA514_2.3%,_#EEB609_35.25%,_#C69320_66.76%,_#FCC201_97.79%)] border border-[#F1B906] block py-3 sm:py-4 rounded-md text-center text-base sm:text-lg font-medium tracking-wide text-white hover:text-[#0E0E0E] transition-all duration-300 group cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </section>
  );
};

export default BarDashboardSideBar;
