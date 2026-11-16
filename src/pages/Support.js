// src/pages/Support.js: Engineering services
import { Link } from "react-router-dom";
import "./Support.css";
import {
  IconRuler, IconCube, IconScan, IconLayers, IconFactory, IconBeaker, IconHand, IconMail, IconUpload, IconArrow,
} from "../components/Icons";

const services = [
  {
    icon: IconRuler,
    title: "CAD design & iteration",
    body: "Start from a sketch, photo, dimensions or an existing model. We build the CAD, iterate with you and deliver files you own.",
    points: ["Parametric models you can reuse", "Revision rounds with printed test pieces", "STEP and STL deliverables"],
  },
  {
    icon: IconCube,
    title: "DFM & material selection",
    body: "We sanity-check wall thickness, tolerances, threads and fasteners, then recommend orientation, layer height, infill and material for strength, weight and cost.",
    points: ["Tolerance and fit advice", "Orientation for strength", "Cost vs. performance trade-offs"],
  },
  {
    icon: IconScan,
    title: "Reverse engineering",
    body: "Bring us a broken or discontinued part. We measure it, model it, reinforce the weak spots and print a replacement, then keep the file for reorders.",
    points: ["Caliper and fit-test measurement", "Improved replacement designs", "Model kept on file"],
  },
  {
    icon: IconLayers,
    title: "Fixtures & short runs",
    body: "Brackets, grippers, nests, inspection jigs and adapters, from one-offs to small batches with tier pricing so pilots have clear economics.",
    points: ["Single-unit to 100+ pieces", "10 / 25 / 50 / 100 tier pricing", "Repeatable print recipes"],
  },
];

const industries = [
  { icon: IconFactory, title: "Manufacturing & industrial", body: "Line-side fixtures, gauges, guards and replacement parts that keep production moving." },
  { icon: IconBeaker, title: "Startups, labs & R&D", body: "Prototype enclosures, mechanisms and test rigs, iterated weekly." },
  { icon: IconHand, title: "Assistive & clinical partners", body: "Adaptive aids, mounts and prototype models built alongside clinicians and device teams." },
];

const sla = [
  ["Quotes", "Instant online", "Same-day human follow-up"],
  ["Prototypes", "24–72 hours", "Material and queue dependent"],
  ["Small batches", "3–10 business days", "With tier pricing"],
  ["CAD projects", "Scoped per project", "Quoted up front"],
];

export default function Support() {
  return (
    <main className="page support-page">
      <div className="container">
        <header className="page-header">
          <div className="eyebrow">Engineering services</div>
          <h1>Engineering help from idea to part</h1>
          <p className="lede">
            Most shops just print what you send. We help you design it, improve it and make it repeatable,
            for prototypes, production fixtures and the parts nobody makes anymore.
          </p>
          <div className="btn-row center hdr-cta">
            <Link to="/quote" className="btn btn-primary">Start an instant quote <span className="arrow">→</span></Link>
            <a href="#contact" className="btn btn-ghost">Talk to an engineer</a>
          </div>
        </header>

        <section className="grid grid-2 svc-grid" aria-label="Services">
          {services.map((s) => (
            <article key={s.title} className="card svc-card">
              <div className="icon-tile"><s.icon /></div>
              <h2 className="svc-title">{s.title}</h2>
              <p>{s.body}</p>
              <ul className="check-list">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
        </section>
      </div>

      <section className="section section-alt svc-section" id="industries">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Who we work with</div>
            <h2>Where we&apos;re most useful</h2>
          </div>
          <div className="grid grid-3">
            {industries.map((i) => (
              <div key={i.title} className="card">
                <div className="icon-tile cyan"><i.icon /></div>
                <h3>{i.title}</h3>
                <p>{i.body}</p>
              </div>
            ))}
          </div>
          <p className="fine-print-c">
            Assistive work is done with licensed professionals who own patient fit and care. We don&apos;t manufacture
            FDA-regulated medical devices directly.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="svc-two" aria-label="Files and service levels">
          <div className="card">
            <div className="icon-tile"><IconUpload /></div>
            <h2 className="svc-title">Sending files</h2>
            <ul className="file-list">
              <li><span className="tag">Preferred</span><span><code>.stl</code> or <code>.obj</code> in millimeters, watertight if possible</span></li>
              <li><span className="tag">CAD</span><span><code>.step</code> / <code>.iges</code> by email for a deeper DFM pass</span></li>
              <li><span className="tag">Context</span><span>Loads, mating parts, environment and cosmetic expectations</span></li>
              <li><span className="tag">No file?</span><span>Photos, sketches with dimensions or the physical part work too</span></li>
            </ul>
          </div>

          <div className="card">
            <h2 className="svc-title">Typical service levels</h2>
            <div className="sla">
              {sla.map(([k, v, n]) => (
                <div className="sla-row" key={k}>
                  <span className="sla-k">{k}</span>
                  <span className="sla-v">{v}</span>
                  <span className="sla-n">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band contact-band" id="contact">
          <div className="eyebrow">Contact</div>
          <h2>Tell us what you&apos;re building</h2>
          <p>
            Send files, photos or a quick description. We&apos;ll review it, talk materials and tolerances,
            and suggest a first pilot part. Prefer a call or screenshare? Just ask.
          </p>
          <div className="btn-row center">
            <a className="btn btn-primary" href="mailto:chicago3dprintworks@gmail.com"><IconMail /> chicago3dprintworks@gmail.com</a>
            <Link className="btn btn-ghost" to="/about">Meet the team <IconArrow /></Link>
          </div>
          <p className="contact-fine">
            By sending files you confirm you have the rights to share them. See our <Link to="/terms">Terms</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
