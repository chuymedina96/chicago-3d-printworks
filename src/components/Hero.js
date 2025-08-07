import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <video autoPlay muted loop className="hero-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay">
        <h1 className="hero-title">Your Trusted 3D Print Partner</h1>
        <p className="hero-subtitle">
          Upload your design, get a quote, and bring it to life — fast.
        </p>
        <a href="/quote" className="hero-cta">Get Instant Quote</a>
      </div>
    </section>
  );
}

export default Hero;
