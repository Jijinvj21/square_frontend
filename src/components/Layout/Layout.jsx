import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Layout() {
  return (
    <>
      <div className="layout_container">
        <Toaster />
        <Header /> 
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
