import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

function MainLayout() {
  const location = useLocation();
  const hideNavAndFooter = ["/login", "/sign-up"].includes(location.pathname);

  return (
    <>
      <ScrollRestoration />
      {!hideNavAndFooter && <Navbar />}
      <Outlet />
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default MainLayout;
