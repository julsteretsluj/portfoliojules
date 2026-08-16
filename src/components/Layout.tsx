import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { dockApps, email } from "../data";
import Footer from "./Footer";
import Header from "./Header";
import PageCurtain from "./PageCurtain";
import ScrollReveal from "./ScrollReveal";
import { Balloons } from "./ui/balloons";
import MacOSDock from "./ui/mac-os-dock";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
      <div className="site-dock-wrap">
        <MacOSDock
          apps={dockApps}
          openApps={[pathname]}
          onAppClick={(id) => {
            if (id === "mail") {
              window.location.href = `mailto:${email}`;
              return;
            }
            navigate(id);
          }}
        />
      </div>
    </>
  );
}
