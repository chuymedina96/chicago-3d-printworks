import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import {
  IconFactory, IconBeaker, IconScan, IconHand, IconRuler, IconCube, IconLayers, IconBolt,
  IconCode, IconPin, IconUpload, IconChat, IconPrinter, IconTruck, IconArrow,
} from "../components/Icons";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] } }),
};

const audiences = [
  {
    icon: IconFactory,
    title: "Manufacturers & plants",
    body: "Jigs, fixtures, gauges, sensor brackets and machine guards for production lines. When a line is down, a printed part in days beats a machined part in weeks.",
    tags: ["Jigs & fixtures", "End-of-arm tooling", "Line-side parts"],
  },
  {
    icon: IconBeaker,
    title: "Hardware & engineering teams",
    body: "Fast design iteration for startups, labs and product teams: enclosures, mechanisms and fit-check prototypes, with an engineer reviewing every revision.",
    tags: ["Rapid prototyping", "Enclosures", "Fit checks"],
  },
  {
    icon: IconScan,
    title: "Reverse engineering",
    body: "Broken or discontinued part? We measure it, rebuild it in CAD, improve weak points and print a replacement, then keep the model on file for next time.",
    tags: ["Obsolete parts", "CAD rebuilds", "Repeat orders"],
  },
  {
    icon: IconHand,
    title: "Assistive & medical-adjacent",
    body: "Custom grips, mounts, adaptive aids and early-stage prototypes, built in partnership with clinicians and device teams who own the patient side.",
    tags: ["Adaptive aids", "Mounts", "Prototype models"],
  },
];

const services = [
  { icon: IconRuler, title: "CAD & design iteration", body: "Send a sketch, a photo or a model. We design it, revise it with you and hand back production-ready files." },
  { icon: IconCube, title: "Design for manufacturing", body: "Wall thickness, tolerances, threads, orientation and material choice reviewed before anything hits the printer." },
  { icon: IconBolt, title: "Rapid prototyping", body: "Typical prototype turnaround of 24–72 hours, so you can test, break and improve on a weekly cadence." },
  { icon: IconLayers, title: "Short-run production", body: "From one part to small batches, with tiered pricing so pilots and roll-outs have clear economics." },
];

const steps = [
  { icon: IconUpload, title: "Upload", body: "Drop an STL or OBJ into the quote tool. Geometry, volume and price come back in seconds." },
  { icon: IconChat, title: "Engineer review", body: "We check fit, strength and printability, and suggest changes before we print." },
  { icon: IconPrinter, title: "Print & inspect", body: "Printed in-house on tuned machines with hardened nozzles, then checked against your specs." },
  { icon: IconTruck, title: "Pickup or ship", body: "Local pickup on Chicago's South Side, or shipped to your lab, plant or office." },
];

const readout = [
  ["Bounding box", "20.0 × 20.0 × 82.5 mm"],
  ["Volume", "11.19 cm³"],
  ["Surface area", "70.33 cm²"],
  ["Triangles", "64,278"],
  ["Material", "PLA · 0.2 mm · 20%"],
  ["Est. material", "13.9 g"],
];

export default function Home() {
  return (
    <main className="home">
      {/* ===== Hero ===== */}
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline aria-hidden="true">
          <source src="/assets/72c3f85c-86e4-4aa2-9741-da157a6df5a2.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-grid grid-bg" />

        <div className="container hero-inner">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0} className="eyebrow">
            Engineering-led 3D printing · Chicago
          </motion.div>
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1}>
            Prototypes, fixtures &amp; custom parts.
            <span className="hero-accent"> Engineered, not just printed.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="show" variants={fadeUp} custom={2} className="lede hero-lede">
            We pair CAD and design-for-manufacturing know-how with an in-house print farm, so engineering
            teams, manufacturers and makers go from idea to tested part in days, not weeks.
          </motion.p>
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="btn-row center">
            <Link to="/quote" className="btn btn-primary">Get an instant quote <span className="arrow">→</span></Link>
            <Link to="/support#contact" className="btn btn-ghost">Talk to an engineer</Link>
          </motion.div>

          <motion.ul initial="hidden" animate="show" variants={fadeUp} custom={4} className="hero-stats">
            <li><strong>Instant</strong><span>STL / OBJ quotes</span></li>
            <li><strong>24–72 hr</strong><span>typical prototypes</span></li>
            <li><strong>CAD + DFM</strong><span>engineer on every job</span></li>
            <li><strong>South Side</strong><span>local pickup</span></li>
          </motion.ul>
        </div>
      </section>

      {/* ===== Who we work with ===== */}
      <section className="section" id="who">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Who we work with</div>
            <h2>Built for teams that need parts that work</h2>
            <p>We&apos;re not a trinket shop. Our focus is functional parts where design, fit and turnaround matter.</p>
          </div>

          <div className="grid grid-2">
            {audiences.map((a, i) => (
              <motion.article
                key={a.title}
                className="card audience-card"
                initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={i}
              >
                <div className="icon-tile"><a.icon /></div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <div className="tag-row">{a.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </motion.article>
            ))}
          </div>
          <p className="fine-print">
            We build assistive and prototype devices alongside licensed clinicians and device teams. We don&apos;t
            manufacture FDA-regulated medical devices directly.
          </p>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What we do</div>
            <h2>Design, iterate, print, repeat</h2>
            <p>The printer is the easy part. The value is the engineering around it.</p>
          </div>
          <div className="grid grid-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className="card service-card"
                initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={i}
              >
                <div className="icon-tile cyan"><s.icon /></div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="btn-row center section-cta">
            <Link to="/support" className="btn btn-ghost">Explore engineering services <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ===== Quote engine ===== */}
      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <div className="eyebrow">Instant quoting engine</div>
            <h2>Upload a file. Get real numbers in seconds.</h2>
            <p className="lede">
              Our quoting engine is written in-house in Python. It reads your mesh, measures volume, surface area
              and bounding box, then maps it to material profiles and machine throughput for a transparent price,
              with batch tiers built in.
            </p>
            <ul className="check-list">
              <li>STL and OBJ, in millimeters</li>
              <li>PLA, PLA+, PETG, Nylon and carbon-fiber Nylon</li>
              <li>Batch pricing tiers and PDF export for purchasing</li>
              <li>Multi-part workspace for assemblies</li>
            </ul>
            <div className="btn-row">
              <Link to="/quote" className="btn btn-primary">Try the quote tool <span className="arrow">→</span></Link>
            </div>
          </div>

          <motion.div
            className="readout"
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
          >
            <div className="readout-head">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="readout-file mono">screw_flat.stl</span>
            </div>
            <div className="readout-body">
              {readout.map(([k, v]) => (
                <div className="readout-row" key={k}>
                  <span className="muted">{k}</span>
                  <span className="mono">{v}</span>
                </div>
              ))}
              <div className="readout-total">
                <span>Estimated price</span>
                <strong className="mono">$7.41</strong>
              </div>
            </div>
            <div className="readout-foot mono">Example output from our live quote API</div>
          </motion.div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">How it works</div>
            <h2>From file to finished part</h2>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="step"
                initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} custom={i}
              >
                <div className="step-num mono">0{i + 1}</div>
                <div className="icon-tile"><s.icon /></div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Why us ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why Chicago 3D Printworks</div>
            <h2>A software-minded shop</h2>
            <p>We run production the way good engineering teams run infrastructure: measured, repeatable and fast.</p>
          </div>
          <div className="grid grid-3">
            <div className="card why-card">
              <div className="icon-tile"><IconCode /></div>
              <h3>Built by engineers</h3>
              <p>Our founder is a software and DevOps engineer. Quoting, scheduling and print recipes are our own tools, not a resold platform.</p>
            </div>
            <div className="card why-card">
              <div className="icon-tile"><IconRuler /></div>
              <h3>Design help included</h3>
              <p>Every order gets a printability check. Need more? We do the CAD and the iterations with you.</p>
            </div>
            <div className="card why-card">
              <div className="icon-tile"><IconPin /></div>
              <h3>Local and fast</h3>
              <p>Based on Chicago&apos;s South Side, serving the city, the Calumet region and NW Indiana, with pickup or shipping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-band">
            <div className="eyebrow">Start a project</div>
            <h2>Have a part in mind? Let&apos;s get it in your hands this week.</h2>
            <p>Upload a file for an instant price, or send us a sketch, photo or broken part and we&apos;ll take it from there.</p>
            <div className="btn-row center">
              <Link to="/quote" className="btn btn-primary">Get an instant quote <IconArrow /></Link>
              <a href="mailto:chicago3dprintworks@gmail.com" className="btn btn-ghost">Email the team</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
