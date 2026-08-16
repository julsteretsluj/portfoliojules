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
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="bg-wash" aria-hidden="true" />
      <div className="header-shell">
        <Header />
      </div>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
