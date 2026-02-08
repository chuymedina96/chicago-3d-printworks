import React from "react";
import "./About.css";

export default function About() {
  return (
    <main className="about-page" role="main" aria-label="About Chicago 3D Printworks">
      {/* Intro */}
      <section className="about-card" aria-labelledby="about-title">
        <h1 id="about-title">About Chicago 3D Printworks</h1>
        <p className="about-lede">
          We’re an engineering-driven shop focused on fast, repeatable pipelines for prototype and
          small–medium batch production. Our quoting engine, print recipes, and scheduling tools are
          built in-house to keep quality high and pricing transparent.
        </p>
      </section>

      {/* Story */}
      <section className="about-card" aria-labelledby="story-title">
        <h2 id="story-title">Our Story</h2>
        <p>
          We started with a simple idea: apply <strong>software + DevOps thinking</strong> to
          additive manufacturing. We wrote a Python quoting engine that analyzes mesh geometry
          to compute volume, surface area, triangle count, and a
          print-time model. Those signals tie into material profiles and machine throughput to
          generate instant quotes—then the same parameters are used to orchestrate jobs on the floor.
        </p>
        <p>
          Our first product line was delightfully scrappy—<strong>CatCap</strong>, a customizable
          cap for cats designed for birthdays, photo shoots, and playful personalization. It taught
          us variant management, fast iteration, and small-batch QC. Today, we help hardware teams,
          labs, and creators move from one-off prototypes to <em>repeatable short-run production</em>.
        </p>
      </section>

      {/* Team */}
      <section className="about-card" aria-labelledby="team-title">
        <h2 id="team-title">Team</h2>

        <div className="team-grid-2">
          {/* Jesus (Chuy) Medina */}
          <div className="team-member">
            <img
              className="headshot"
              src="/images/team/chuy.jpeg"
              alt="Jesus Medina"
              loading="lazy"
            />
            <div>
              <h3 className="team-name">Jesus Medina</h3>
              <div className="kv">
                <span className="pill">Founder</span>
                <span className="pill">Software &amp; DevOps</span>
              </div>
              <p>
                Jesus is a software engineer, DevOps practitioner, and maker. Before founding Chicago 3D Printworks, he built large-scale systems for startups, Fortune 500 companies, and U.S. federal agencies—including Kubernetes infrastructure for the Department of Education, where reliability and scale were critical.
              </p>
              <p>
                At Chicago 3D Printworks, he coded our quoting engine from scratch—analyzing STL files to accurately predict print time, material usage, and costs with engineering-grade precision. By combining DevOps pipelines with 3D printing, he treats production like infrastructure: orchestrated, repeatable, and fast.
              </p>
              <p>
                His vision is to use this approach not only to support labs and engineering teams, but also to build a community-centered production hub on the South Side of Chicago—bringing accessible manufacturing to the neighborhoods that need it most.
              </p>
              <ul>
                <li>Tooling: Python, Node, Docker, CI/CD, observability.</li>
                <li>Quoting engine: STL parsing, material profiling, print-time/cost prediction.</li>
                <li>Ops: print farm orchestration, parameter versioning, quality traces.</li>
              </ul>
              <div className="link-row">
                <a href="/quote" className="button-secondary">Try Instant Quote</a>
                <a href="/terms" className="button-secondary">Terms</a>
                <a href="/support" className="button-secondary">Contact</a>
                <a
                  href="https://www.linkedin.com/in/jmedina-creative-software-engineer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary linkedin-link"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="about-card soft">
          <h3>We’re growing</h3>
          <p className="about-lede">
            This page is a work in progress—more teammates, partners, and shop photos coming soon.
          </p>
        </div>
      </section>
    </main>
  );
}
