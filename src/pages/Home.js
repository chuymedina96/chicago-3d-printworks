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
            <h3>FDM / Multi-Color</h3>
            <p>High-speed, multi-filament printing using PLA, ABS, PETG, and carbon fiber blends.</p>
          </div>
          <div className="feature-card">
            <h3>SLA / Resin</h3>
            <p>Ultra-detailed prints for dental, jewelry, and design applications with fast turnaround.</p>
          </div>
          <div className="feature-card">
            <h3>Advanced Materials</h3>
            <p>Carbon fiber nylon, TPU flexibles, and PEEK (for aerospace-grade projects).</p>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section dark-section">
        <h2>Industries We Serve</h2>
        <ul className="industries-list">
          <li>🔩 Industrial Prototyping</li>
          <li>⚙️ Engineering & Mechanical Parts</li>
          <li>📐 Product Design</li>
          <li>🏎 Automotive Mods</li>
          <li>🐾 Pet Products & Retail</li>
        </ul>
      </section>

      {/* Our Process */}
      <section className="section light-section">
        <h2>Our Process</h2>
        <div className="process-steps">
          <div className="step">
            <h3>1. Upload STL</h3>
            <p>Drag and drop your file for instant analysis & pricing.</p>
          </div>
          <div className="step">
            <h3>2. Review Specs</h3>
            <p>See estimated print time, material, cost, and finish options.</p>
          </div>
          <div className="step">
            <h3>3. Production</h3>
            <p>We print it right here in Chicago. Fast, affordable, reliable.</p>
          </div>
        </div>
      </section>

      {/* Engineering Support CTA */}
      <section className="section support-cta">
        <h2>Need Help With a Complex Project?</h2>
        <p>Our engineers are ready to help. Send us your models, requirements, or questions.</p>
        <a href="/support" className="cta-button">Contact Engineering Support</a>
      </section>
    </div>
  );
}

export default Home;
