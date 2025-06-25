import BarDashboardSideBar from "@/Components/CustomSection/BarDashboardSideBar";
import BarDashboardNavBar from "@/Components/CustomSection/BarDashboardNavBar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const BarDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

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
    <div className="flex flex-col relative lg:flex-row h-screen overflow-hidden">
      <div className="lg:hidden flex items-center justify-between p-4 px-6 bg-[#222222] text-white">
        <Link to={"/bar-dashboard"}>
          <h2 className="text-[#F1B906] text-4xl font-bold text-center">
            Sipawayy
          </h2>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`lg:static absolute top-18 left-0 w-[70%] sm:w-[60%] md:w-[50%] lg:w-auto z-40 transition-all duration-600
       ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} 
          lg:translate-x-0 lg:opacity-100
        `}
      >
        <BarDashboardSideBar />
      </div>

      <div className="overflow-y-auto flex flex-col flex-1">
        <BarDashboardNavBar />

        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BarDashboardLayout;
