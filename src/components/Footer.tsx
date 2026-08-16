import { email, links } from "../data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-kicker">Open to leadership, partnerships, and youth-focused work</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <ul className="footer-links">
        <li>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={links.instagramPersonal} target="_blank" rel="noreferrer">
            @jules.ktoast
          </a>
        </li>
        <li>
          <a href={links.instagramSeamuns} target="_blank" rel="noreferrer">
            @seamuns.th
          </a>
        </li>
        <li>
          <a href={links.seamun} target="_blank" rel="noreferrer">
            SEAMUN I 2027
          </a>
        </li>
      </ul>
      <p className="footer-legal">© {new Date().getFullYear()} Jules Kitto-Astrop</p>
    </footer>
  );
}
