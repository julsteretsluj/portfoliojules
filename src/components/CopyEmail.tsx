import { useState } from "react";
import { launchBalloons } from "./ui/balloons";
import { email } from "../data";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    launchBalloons();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="copy-email" type="button" onClick={copy}>
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
