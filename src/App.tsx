import { lazy, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EntryGate, { shouldShowEntryGate } from "./components/EntryGate";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const About = lazy(() => import("./pages/About"));
const Passions = lazy(() => import("./pages/Passions"));
const Takes = lazy(() => import("./pages/Takes"));
const Now = lazy(() => import("./pages/Now"));

export default function App() {
  const [locked, setLocked] = useState(shouldShowEntryGate);

  return (
    <>
      {locked ? <EntryGate onEntered={() => setLocked(false)} /> : null}
      <div id="site" inert={locked || undefined}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/passions" element={<Passions />} />
            <Route path="/takes" element={<Takes />} />
            <Route path="/now" element={<Now />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
