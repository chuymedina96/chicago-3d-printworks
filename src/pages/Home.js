import './Home.css';
import { useState, useEffect } from 'react';

const rotatingWords = ["Engineers", "Brands", "Creators"];

function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500); // rotates every 2.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src="/assets/13211149_3840_2160_25fps.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>Chicago 3D Printworks</h1>
          <p>
            Precision 3D Printing for{" "}
            <span className="rotating-word">{rotatingWords[index]}</span>
          </p>
          <a href="/quote" className="cta-button">Get an Instant Quote</a>
        </div>
      </section>

      {/* Technologies / Capabilities */}
      <section className="section light-section">
        <h2>Technologies & Capabilities</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>FDM & Multi-Color</h3>
            <p>
              High-speed desktop FDM printing with support for PLA, PLA+, PETG, and carbon fiber-reinforced nylon. All machines run upgraded hardened steel nozzles for abrasive material compatibility.
            </p>
          </div>
          <div className="feature-card">
            <h3>Functional Prototyping</h3>
            <p>
              We focus on parts that function — from mechanical brackets to flexible enclosures and custom tools. Every part is made in-house with precision and intent.
            </p>
          </div>
          <div className="feature-card">
            <h3>Engineering-Grade Ambitions</h3>
            <p>
              We’re currently exploring support for PEEK and high-temp materials, investing in both the hardware and workflow necessary to produce true engineering-grade components.
            </p>
          </div>
        </div>
      </section>

      {/* In-House STL Analysis / Quote Tool */}
      <section className="section light-section">
        <h2>In-House STL Analysis & Instant Quotes</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Custom Quoting Engine</h3>
            <p>
              We're actively developing a Python-based STL parsing engine that analyzes mesh geometry,
              volume, surface area, and bounding boxes to generate accurate, material-aware quotes.
            </p>
          </div>
          <div className="feature-card">
            <h3>Built from Scratch</h3>
            <p>
              Our team is writing the quoting algorithms ourselves — allowing us to fully control how geometry,
              materials, and print settings map to production time and cost.
            </p>
          </div>
          <div className="feature-card">
            <h3>Future-Ready Intelligence</h3>
            <p>
              As our tool evolves, we aim to offer real-time quotes tailored to complex prints and exotic materials like carbon fiber nylon, TPU, and PEEK.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section dark-section">
        <h2>Industries We Serve</h2>
        <ul className="industries-list">
          <li>🔩 Industrial Prototyping</li>
          <li>⚙️ Mechanical & Product Engineering</li>
          <li>📐 Consumer Product Design</li>
          <li>🏎 Automotive Mods</li>
          <li>🐾 Pet Products & Retail</li>
        </ul>
      </section>

      {/* Our Process */}
      <section className="section light-section">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <h3>1. Upload STL</h3>
            <p>Drag and drop your file for instant geometry analysis and quoting (beta).</p>
          </div>
          <div className="step">
            <h3>2. Review Specs</h3>
            <p>View estimated time, material usage, cost, and available finish options.</p>
          </div>
          <div className="step">
            <h3>3. Local Production</h3>
            <p>We print your part in-house using tuned machines — fast, affordable, reliable.</p>
          </div>
        </div>
      </section>

      {/* Engineering Support CTA */}
      <section className="section support-cta">
        <h2>Need Help With a Complex Project?</h2>
        <p>Our engineers are ready to help. Send us your models, requirements, or technical questions.</p>
        <a href="/support" className="cta-button">Contact Engineering Support</a>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div>© 2025 Chicago 3D Printworks</div>
        <div><a href="/support">Support</a> • <a href="/quote">Quote</a> • <a href="/terms">Terms</a></div>
      </footer>
    </div>
  );
}

export default Home;
