import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

const Layout = () => {
  return (
    <>
      <Header />

      <div className="flex-1 bg-gray-50 transition-all duration-200">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
