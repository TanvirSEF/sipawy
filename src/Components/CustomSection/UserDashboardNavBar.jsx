import { ChatIcon, NotificationIcon } from "@/assets/icons/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import useFetchData from "../Hooks/Api/UseFetchData";
import imagePreview from "../../assets/images/Logo/usernavprofile.jpg";

const UserDashboardNavBar = () => {
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const { data } = useFetchData("/api/me", token);

  const imageFromAPI = `${import.meta.env.VITE_BASE_URL}/${data?.data?.avatar}`;
  return (
    <section className="nav-bar px-3 md:px-10 py-4 lg:py-7 bg-[#0F0F0F] w-full flex flex-wrap items-center justify-center lg:justify-end gap-4 md:gap-8 sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white text-sm md:text-lg font-medium">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-0 cursor-pointer">
            <div className="border border-[#DBA514] rounded-full p-1">
              <NotificationIcon className="size-5 fill-white" />
            </div>
            <h4>Notifications</h4>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[300px] md:w-[500px] mx-2 xl:mx-0"
            side="bottom"
            align="end"
          >
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <DropdownMenuItem key={idx}>
                  <div className="border border-black rounded-full p-1 mr-2">
                    <NotificationIcon className="size-5 fill-black" />
                  </div>
                  <p>
                    Happy Hour Alert: Enjoy 2-for-1 Cocktails Today from 5 PM to
                    7 PM!
                  </p>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Chat */}
        <Link to="/user-dashboard/chat" className="flex items-center gap-2">
          <div className="border border-[#DBA514] rounded-full p-1">
            <ChatIcon className="size-5" />
          </div>
          <h4>Chat</h4>
        </Link>
      </div>

      {/* Profile */}
      <Link
        to="/user-dashboard/profile-details"
        className="flex items-center gap-2 text-black text-sm md:text-lg font-medium bg-[#DBA514] py-2 px-3 rounded-[4px]"
      >
        <img
          src={data?.data?.avatar ? imageFromAPI : imagePreview}
          alt=""
          className="size-[30px] rounded-full shrink-0"
        />
        <h3>{data?.data?.name}</h3>
      </Link>
    </section>
  );
};

export default UserDashboardNavBar;
