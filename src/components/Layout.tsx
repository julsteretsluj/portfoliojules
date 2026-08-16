import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="frame">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="sheet">
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
