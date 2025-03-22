import { Outlet, useLocation } from "react-router-dom";
import { Header, Footer } from "../components";

const Layout = () => {
  const location = useLocation();

  const showHeader = !["/login", "/register"].includes(location.pathname);

  return (
    <>
      {/* Top Header */}
      {showHeader && <Header />}

      <div className="flex-1 bg-gray-50 transition-all duration-200">
        <Outlet />
      </div>

      {/* Footer */}
      {showHeader && <Footer />}
    </>
  );
};

export default Layout;
