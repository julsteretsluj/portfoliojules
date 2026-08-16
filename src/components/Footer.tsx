import { SocialLinks } from "@/components/ui/social-links";
import { email, socials } from "../data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-kicker">
          Open to leadership, partnerships, and youth-focused work.
        </p>
        <a className="footer-email" href={`mailto:${email}`}>
          {email}
        </a>
        <SocialLinks socials={socials} className="footer-socials" />
        <p className="footer-legal">
          Copyright © {new Date().getFullYear()} Jules Kitto-Astrop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
