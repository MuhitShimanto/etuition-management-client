import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 w-full">
          <Outlet />
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default MainLayout;