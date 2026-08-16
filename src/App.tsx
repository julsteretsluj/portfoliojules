import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const About = lazy(() => import("./pages/About"));
const Passions = lazy(() => import("./pages/Passions"));
const Esa = lazy(() => import("./pages/Esa"));
const Now = lazy(() => import("./pages/Now"));

export default function App() {
  return (
    <Suspense fallback={<p className="route-fallback" role="status">Loading page</p>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/passions" element={<Passions />} />
          <Route path="/esa" element={<Esa />} />
          <Route path="/now" element={<Now />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
