import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import PageCurtain from "./PageCurtain";
import ScrollReveal from "./ScrollReveal";
import { Balloons } from "./ui/balloons";

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
      <PageCurtain />
      <Balloons type="default" />
      <Header />
      <main id="main">
        <Outlet />
        <ScrollReveal />
      </main>
      <Footer />
    </>
  );
}
