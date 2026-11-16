import { Link } from "react-router-dom";
import "./About.css";
import { IconCode, IconPin, IconLayers } from "../components/Icons";

const values = [
  { icon: IconCode, title: "Software + DevOps thinking", body: "We treat production like infrastructure: measured, versioned and repeatable. Our quoting engine and print recipes are built in-house." },
  { icon: IconLayers, title: "Engineering first", body: "We care whether the part works, not just whether it printed. Every job gets a design and printability check." },
  { icon: IconPin, title: "Rooted on the South Side", body: "We're building an accessible production hub on Chicago's South Side, bringing real manufacturing capability to the neighborhood." },
];

export default function About() {
  return (
    <main className="page about-page">
      <div className="container">
        <header className="page-header">
          <div className="eyebrow">About us</div>
          <h1>An engineering shop that happens to own printers</h1>
          <p className="lede">
            Chicago 3D Printworks is an engineering-driven 3D printing studio focused on fast, repeatable pipelines
            for prototypes and small-to-medium batch production.
          </p>
        </header>

        <section className="about-story card">
          <div className="story-col">
            <div className="eyebrow">Our story</div>
            <h2>Applying software thinking to manufacturing</h2>
          </div>
          <div className="story-col">
            <p>
              We started with a simple idea: apply <strong>software and DevOps discipline</strong> to additive
              manufacturing. We wrote a Python quoting engine that analyzes mesh geometry (volume, surface area,
              triangle count and a print-time model) and ties it to material profiles and machine throughput to
              generate instant quotes. The same parameters then drive jobs on the floor.
            </p>
            <p>
              Our first product line was delightfully scrappy: <strong>CatCap</strong>, a customizable cap for cats
              made for birthdays and photo shoots. It taught us variant management, fast iteration and small-batch
              QC. Today we help hardware teams, labs, manufacturers and makers move from one-off prototypes to
              <em> repeatable short-run production</em>.
            </p>
          </div>
        </section>

        <section className="grid grid-3 about-values">
          {values.map((v) => (
            <div className="card" key={v.title}>
              <div className="icon-tile"><v.icon /></div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </section>

        <section className="team">
          <div className="section-head">
            <div className="eyebrow">Team</div>
            <h2>The people behind the parts</h2>
          </div>

          <article className="card founder">
            <div className="founder-photo">
              <img src="/images/team/chuy.jpeg" alt="Jesus Medina, founder of Chicago 3D Printworks" loading="lazy" />
            </div>
            <div className="founder-body">
              <h3 className="founder-name">Jesus &ldquo;Chuy&rdquo; Medina</h3>
              <div className="tag-row founder-tags">
                <span className="tag">Founder</span>
                <span className="tag">Software &amp; DevOps</span>
                <span className="tag">CAD &amp; fabrication</span>
              </div>
              <p>
                Jesus is a software engineer, DevOps practitioner and maker. Before founding Chicago 3D Printworks
                he built systems for startups, enterprise clients and U.S. federal agencies, including Kubernetes
                infrastructure for the Department of Education, where reliability and scale were critical.
              </p>
              <p>
                He wrote our quoting engine from scratch, analyzing STL files to predict print time, material use
                and cost, and runs production the way he ran infrastructure: orchestrated, repeatable and fast.
              </p>
              <ul className="check-list founder-list">
                <li>Tooling: Python, Node, Docker, CI/CD, observability</li>
                <li>Quoting engine: STL parsing, material profiles, time and cost prediction</li>
                <li>Operations: print-farm orchestration, parameter versioning, quality traces</li>
              </ul>
              <div className="btn-row">
                <Link to="/quote" className="btn btn-primary btn-sm">Try the instant quote</Link>
                <a
                  href="https://www.linkedin.com/in/jmedina-creative-software-engineer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </article>

          <p className="growing">We&apos;re growing. More teammates, partners and shop photos coming soon.</p>
        </section>

        <section className="cta-band">
          <h2>Let&apos;s build something that works</h2>
          <p>Send us a file, a sketch or a broken part. We&apos;ll take it from there.</p>
          <div className="btn-row center">
            <Link to="/quote" className="btn btn-primary">Get an instant quote <span className="arrow">→</span></Link>
            <Link to="/support#contact" className="btn btn-ghost">Contact the team</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
