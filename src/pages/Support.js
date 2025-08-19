// src/pages/Support.jsx
import React from "react";
import "./Support.css";

export default function Support() {
  return (
    <main className="support-page" role="main" aria-label="Engineering Support">
      {/* Hero / status */}
      <section className="sp-card sp-hero" aria-labelledby="sp-hero-title">
        <header className="sp-hero-top">
          <h1 id="sp-hero-title">Engineering Support</h1>
          <span className="sp-badge sp-badge-on" aria-label="Instant quote status">
            Instant quote is live 24/7
          </span>
        </header>

        <p className="sp-lede">
          Move from prototype to small-batch production with confidence. Our in-house quoting engine
          analyzes STL/OBJ geometry, maps it to material profiles and throughput, and returns pricing
          in seconds. We follow through with DFM guidance, fixtures, and repeatable recipes.
        </p>

        <div className="sp-cta-row">
          <a className="sp-button" href="/quote">Start Instant Quote</a>
        </div>
      </section>

      {/* What we help with */}
      <section className="sp-card" aria-labelledby="sp-help-title">
        <h2 id="sp-help-title">How we can help</h2>
        <div className="sp-grid">
          <article className="sp-tile">
            <h3>DFM & material selection</h3>
            <p>
              We sanity-check wall thickness, tolerances, threads, and fasteners, then recommend
              layer height / infill / material combos for strength, weight, and cost.
            </p>
          </article>
          <article className="sp-tile">
            <h3>Fixtures & end-use tooling</h3>
            <p>
              Brackets, grippers, nests, inspection jigs, and adapters—optimized for fast iteration
              and repeatable short-run production.
            </p>
          </article>
          <article className="sp-tile">
            <h3>Small-to-medium batches</h3>
            <p>
              Single-unit pricing plus 10/25/50/100 tier estimates so you can plan pilots and
              roll-outs with clear economics.
            </p>
          </article>
        </div>
      </section>

      {/* File guidance */}
      <section className="sp-card" aria-labelledby="sp-files-title">
        <h2 id="sp-files-title">File guidance</h2>
        <ul className="sp-list">
          <li>
            <b>Preferred:</b> <code>.stl</code> (mm) or <code>.obj</code> — watertight if possible.
          </li>
          <li>
            <b>Metadata:</b> include intended loads, fit interfaces, and cosmetic expectations.
          </li>
          <li>
            <b>STEP/CAD:</b> if you have <code>.step</code>/<code>.iges</code>, email them to{" "}
            <a href="mailto:chicago3dprintworks@gmail.com">chicago3dprintworks@gmail.com</a> for a deeper DFM pass.
          </li>
        </ul>

        <div className="sp-cta-row sp-cta-right">
          <a className="sp-button" href="/quote">Upload & get pricing</a>
        </div>
      </section>

      {/* Service levels */}
      <section className="sp-card" aria-labelledby="sp-sla-title">
        <h2 id="sp-sla-title">Typical service levels</h2>
        <div className="sp-sla">
          <div className="sp-sla-item">
            <div className="sp-sla-label">Quotes</div>
            <div className="sp-sla-value">Instant tool • Same-day follow-up</div>
          </div>
          <div className="sp-sla-item">
            <div className="sp-sla-label">Prototypes</div>
            <div className="sp-sla-value">24–72 hours (material & queue dependent)</div>
          </div>
          <div className="sp-sla-item">
            <div className="sp-sla-label">Small batches</div>
            <div className="sp-sla-value">3–10 business days with tier pricing</div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="sp-card" aria-labelledby="sp-contact-title">
        <h2 id="sp-contact-title">Contact the team</h2>
        <p className="sp-muted">
          Prefer a quick call or screenshare? We’ll review your models, talk materials/tolerances,
          and suggest a pilot part.
        </p>
        <div className="sp-cta-row">
          <a className="sp-button sp-button-quiet" href="mailto:chicago3dprintworks@gmail.com">
            chicago3dprintworks@gmail.com
          </a>
          <a className="sp-button" href="/about">Meet the team</a>
        </div>
        <p className="sp-footnote">
          By sending files you confirm you have the rights to share them. See our <a href="/terms">Terms</a>.
        </p>
      </section>
    </main>
  );
}
