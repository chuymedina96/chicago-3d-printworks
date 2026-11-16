import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            Chicago <strong>3D Printworks</strong>
          </div>
          <p>
            Engineering-led 3D printing for prototypes, fixtures and custom parts. Designed,
            quoted and printed on Chicago&apos;s South Side.
          </p>
          <a className="footer-mail" href="mailto:chicago3dprintworks@gmail.com">chicago3dprintworks@gmail.com</a>
        </div>

        <div>
          <h4>Services</h4>
          <ul>
            <li><Link to="/quote">Instant quote</Link></li>
            <li><Link to="/support">Engineering &amp; CAD</Link></li>
            <li><Link to="/support#industries">Who we work with</Link></li>
            <li><Link to="/technologies">Machines &amp; materials</Link></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support#contact">Contact</Link></li>
            <li><Link to="/terms">Terms of service</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Chicago 3D Printworks</span>
        <span className="mono">Made in Chicago, IL</span>
      </div>
    </footer>
  );
}
