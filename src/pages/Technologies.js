import { Link } from "react-router-dom";
import "./Technologies.css";
import { IconPrinter, IconCode, IconLayers } from "../components/Icons";

const machines = [
  { name: "FlashForge Adventurer 5M Pro", build: "220 × 220 × 220 mm", notes: "Enclosed, high-speed CoreXY. Our go-to for engineering filaments and consistent repeat parts." },
  { name: "Anycubic Kobra S1", build: "250 × 250 × 250 mm", notes: "High-speed CoreXY for larger parts and multi-material workflows." },
];

const materials = [
  { name: "PLA", use: "Prototypes, fit checks, visual models", strength: 2, heat: 1, density: "1.24 g/cm³" },
  { name: "PLA+", use: "Tougher everyday functional parts", strength: 3, heat: 1, density: "1.24 g/cm³" },
  { name: "PETG", use: "Brackets, outdoor parts, light chemical exposure", strength: 3, heat: 2, density: "1.27 g/cm³" },
  { name: "Nylon", use: "Wear parts, living hinges, impact resistance", strength: 4, heat: 3, density: "1.15 g/cm³" },
  { name: "CF Nylon", use: "Stiff, light fixtures and end-use tooling", strength: 5, heat: 4, density: "1.20 g/cm³" },
];

const Meter = ({ value, label }) => (
  <span className="meter" aria-label={`${label}: ${value} of 5`}>
    {[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= value ? "on" : ""} />)}
  </span>
);

export default function Technologies() {
  return (
    <main className="page tech-page">
      <div className="container">
        <header className="page-header">
          <div className="eyebrow">Machines &amp; materials</div>
          <h1>Our production stack</h1>
          <p className="lede">
            A tuned fleet of high-speed FDM printers with hardened-steel nozzles for abrasive, fiber-filled
            materials, run with versioned print recipes so repeat orders come out the same.
          </p>
        </header>

        <section className="tech-block">
          <div className="section-head">
            <div className="eyebrow">Fleet</div>
            <h2>Machines</h2>
          </div>
          <div className="grid grid-2">
            {machines.map((m) => (
              <article key={m.name} className="card machine-card">
                <div className="icon-tile"><IconPrinter /></div>
                <h3>{m.name}</h3>
                <div className="machine-spec mono">Build volume · {m.build}</div>
                <p>{m.notes}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tech-block">
          <div className="section-head">
            <div className="eyebrow">Materials</div>
            <h2>What we print in</h2>
            <p>Not sure which to pick? The quote tool explains each one, and we&apos;ll recommend a material during review.</p>
          </div>
          <div className="mat-table" role="table" aria-label="Materials">
            <div className="mat-row mat-head" role="row">
              <span role="columnheader">Material</span>
              <span role="columnheader">Best for</span>
              <span role="columnheader">Strength</span>
              <span role="columnheader">Heat resistance</span>
              <span role="columnheader">Density</span>
            </div>
            {materials.map((m) => (
              <div className="mat-row" role="row" key={m.name}>
                <span role="cell" className="mat-name">{m.name}</span>
                <span role="cell" className="mat-use">{m.use}</span>
                <span role="cell" data-label="Strength"><Meter value={m.strength} label="Strength" /></span>
                <span role="cell" data-label="Heat"><Meter value={m.heat} label="Heat resistance" /></span>
                <span role="cell" className="mono mat-den" data-label="Density">{m.density}</span>
              </div>
            ))}
          </div>
          <p className="fine-note">Relative ratings are a general guide for FDM parts; real performance depends on geometry, orientation and settings.</p>
        </section>

        <section className="tech-block grid grid-2">
          <article className="card">
            <div className="icon-tile cyan"><IconCode /></div>
            <h3>Geometry analysis &amp; quoting</h3>
            <p>
              We accept STL and OBJ. Our own Python engine parses the mesh for volume, surface area, bounding box
              and triangle count, then maps it to material density and machine throughput to price the part,
              served live from our Django API.
            </p>
            <Link to="/quote" className="btn btn-ghost btn-sm">Open the quote tool <span className="arrow">→</span></Link>
          </article>
          <article className="card">
            <div className="icon-tile cyan"><IconLayers /></div>
            <h3>Roadmap</h3>
            <p>
              We&apos;re expanding toward TPU, ASA and higher-temperature engineering materials, with resin (SLA)
              for fine-detail prototypes and 3D scanning for faster reverse engineering as demand grows.
            </p>
            <div className="tag-row"><span className="tag">TPU</span><span className="tag">ASA</span><span className="tag">High-temp</span><span className="tag">SLA resin</span><span className="tag">3D scanning</span></div>
          </article>
        </section>
      </div>
    </main>
  );
}
