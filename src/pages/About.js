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

        {/* Jesus (Chuy) Medina */}
        <div className="about-card soft" >
          <div className="team-grid">
            <img
              className="headshot"
              src="/images/team/chuy.jpeg"
              alt="Jesus Medina"
              loading="lazy"
            />
            <div>
              <h3 className="team-name">Jesus Medina</h3>
              <div className="kv" aria-label="Role">
                <span className="pill">Founder</span>
                <span className="pill">Software &amp; DevOps</span>
              </div>

              <p>
                I’m a software engineer and DevOps practitioner turned maker. Over the years I’ve
                built and operated systems for startups, Fortune 500 companies, and even U.S.
                federal agencies—where reliability and scale were non-negotiable. From containerized
                microservices to Kubernetes infrastructure for the Department of Education, I’ve
                learned how to deliver software that’s <strong>repeatable, observable, and fast</strong>.
              </p>
              <p>
                Now I’m applying that mindset to 3D printing—treating printers like a fleet, jobs
                like deployments, and build parameters like versioned infrastructure. My focus is on
                pipeline-driven quoting, consistent material/process recipes, and lights-out
                scheduling for <strong>small-to-medium batch production</strong>. If it can be
                scripted, monitored, or automated, it gets done.
              </p>

              <ul>
                <li>Tooling: Python, Node, Docker, CI/CD, observability.</li>
                <li>
                  Quoting engine: mesh parsing with in-house coded analysis API, material profiles,
                  time/throughput models.
                </li>
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
                  aria-label="Follow Jesus Medina on LinkedIn"
                >
                  <svg
                    className="linkedin-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.265 2.37 4.265 5.455v6.286zM5.337 7.433a2.064 2.064 0 1 1 0-4.128 2.064 2.064 0 0 1 0 4.128zM6.998 20.452H3.674V9h3.324v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Future teammates */}
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
