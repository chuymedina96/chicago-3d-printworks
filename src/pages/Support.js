// src/pages/Support.js
import './Support.css';

function Support() {
  return (
    <div className="support-container">
      <h1>Engineering Support</h1>
      <p>
        Need help with design constraints, part tolerances, slicer settings, or advanced materials? Our
        team is hands-on and happy to assist with model reviews, material matching, and performance advice.
      </p>
      <p>
        We're actively building our own STL geometry analyzer to provide instant pricing and quoting —
        it's still in R&D, but we're making fast progress using Python and Django to parse mesh
        complexity, volume, and print time.
      </p>
      <p>
        For now, feel free to reach out directly via email or connect with our lead engineer:
        <br />
        <strong>
          📧 <a href="mailto:chuymedina96@gmail.com">chuymedina96@gmail.com</a>
          <br />
          💼 <a href="https://www.linkedin.com/in/jmedina-creative-software-engineer/" target="_blank" rel="noopener noreferrer">
            LinkedIn — Chuy Medina
          </a>
        </strong>
      </p>
    </div>
  );
}

export default Support;
