import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { dockApps, email } from "../data";
import Footer from "./Footer";
import Header from "./Header";
import PageCurtain from "./PageCurtain";
import ScrollReveal from "./ScrollReveal";
import { Balloons } from "./ui/balloons";
import { LiquidCursor } from "./ui/liquid-cursor";
import MacOSDock from "./ui/mac-os-dock";
import { MetamorphicLoader } from "./ui/metamorphic-loader";

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <MetamorphicLoader size={160} color="#0071E3" lighteningStep={16} />
      <span className="sr-only">Loading page</span>
    </div>
  );
}

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
      <LiquidCursor size={44} />
      <Balloons type="default" />
      <Header />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
          <ScrollReveal />
        </Suspense>
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
