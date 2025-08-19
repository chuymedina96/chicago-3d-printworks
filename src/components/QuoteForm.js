import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import EstimateResult from "./EstimateResult";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./quoteForm.css";

// 🔁 Updated env var key: REACT_APP_API_BASE
const API_BASE = (process.env.REACT_APP_API_BASE || "http://localhost:8000").replace(/\/$/, "");
const CLIENT_MAX_MB = Number(process.env.REACT_APP_DATA_UPLOAD_MAX_MB || 200);
const MATERIALS = ["PLA", "PLA+", "PETG", "Nylon", "CFNylon"];

const STORAGE_KEY = "c3dpw_workspaces_v1"; // store many parts

/* --------------------------------- UI bits --------------------------------- */
function Chevron({ open }) { return <span className={`chev ${open ? "open" : ""}`} aria-hidden>▸</span>; }
function Accordion({ items }) {
  const [open, setOpen] = useState(items?.[0]?.id || null);
  return (
    <div className="accordion">
      {items.map((it) => (
        <div key={it.id} className="acc-item">
          <button className="acc-trigger" aria-expanded={open === it.id} onClick={() => setOpen(open === it.id ? null : it.id)}>
            <Chevron open={open === it.id} /><span>{it.title}</span>
          </button>
          {open === it.id && <div className="acc-panel">{it.content}</div>}
        </div>
      ))}
    </div>
  );
}
function ConfirmModal({ open, onClose, onConfirm, title = "Clear current quote?", body }) {
  const overlayRef = useRef(null);
  const onKeyDown = useCallback((e) => { if (open && e.key === "Escape") onClose(); }, [open, onClose]);
  useEffect(() => { if (!open) return; document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown); }, [open, onKeyDown]);
  if (!open) return null;
  return (
    <div className="modal-overlay" ref={overlayRef} role="presentation" onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h3 id="confirm-title" className="modal-title">{title}</h3>
        <p className="modal-body">{body || "This will remove the current file name, quote results, batch tiers and cached data. Your material/infill/layer selections remain."}</p>
        <div className="modal-actions">
          <button type="button" className="button-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="button-danger" onClick={onConfirm}>Clear Quote</button>
        </div>
      </div>
    </div>
  );
}
/* ----------------------- Materials modal ----------------------- */
const MATERIAL_META = {
  PLA: { tagline:"Crisp, affordable, low warp", bullets:["Tensile (typ): ~50–70 MPa","Great for visual models, ergonomic jigs","Avoid high heat (car interiors, >60 °C)"], quick:"Go-to for first prototypes & fit checks", recipe:"0.20 mm • 15–25% infill • 2–3 walls" },
  "PLA+": { tagline:"PLA with tougher layer adhesion", bullets:["Tensile (typ): ~55–75 MPa","Clips, light-duty snap-fits, housings","Nice finish, low warp"], quick:"When PLA needs a bit more toughness", recipe:"0.20 mm • 20–35% infill • 3 walls" },
  PETG: { tagline:"Durable, chemical/UV resistant", bullets:["Tensile (typ): ~50–60 MPa","Enclosures, outdoor fixtures, fluid-contact","Slight flex; stronger layer bonding than PLA"], quick:"Utility parts that see the elements", recipe:"0.24 mm • 35–50% infill • 3–4 walls" },
  Nylon: { tagline:"Engineering-grade; fatigue & impact", bullets:["Tensile (typ): ~70–90 MPa","Living hinges, gears, end-use brackets","Needs dry storage; excellent wear"], quick:"When parts must take abuse", recipe:"0.24–0.28 mm • 40–60% infill • 4+ walls" },
  CFNylon: { tagline:"Carbon-fiber reinforced PA — very stiff", bullets:["Tensile (typ): ~80–120 MPa","Tooling, fixtures, robot end-effectors","Premium matte finish, high dimensional stability"], quick:"Rigid tooling & precision brackets", recipe:"0.24–0.28 mm • 40–60% infill • 4–6 walls" },
};
function MaterialsModal({ open, onClose, onPick, current }) {
  const [active, setActive] = useState(current || "PLA");
  const overlayRef = useRef(null);
  const onKeyDown = useCallback((e) => { if (open && e.key === "Escape") onClose(); }, [open, onClose]);
  useEffect(() => { if (!open) return; setActive(current || "PLA"); document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown); }, [open, current, onKeyDown]);
  if (!open) return null;
  const m = MATERIAL_META[active];
  return (
    <div className="modal-overlay" ref={overlayRef} role="presentation" onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="materials-title" style={{ padding: 20 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <h3 id="materials-title" className="modal-title" style={{ marginBottom: 6 }}>Materials — pick with confidence</h3>
          <button type="button" className="button-secondary" onClick={onClose}>Close</button>
        </div>

        {/* responsive left list / right details */}
        <div className="resp-grid-2" style={{ marginTop: 8 }}>
          <div style={{ border:"1px solid var(--border)", borderRadius:12, padding:8, background:"var(--panel)" }}>
            {Object.keys(MATERIAL_META).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="button-quiet"
                style={{
                  width:"100%",
                  textAlign:"left",
                  padding:"10px 12px",
                  borderRadius:10,
                  border:"1px solid var(--border)",
                  background: active===key?"var(--brand-50)":"transparent",
                  marginBottom:8,
                  fontWeight:700
                }}
              >
                {key}
                <div style={{ fontWeight:500, color:"var(--muted)", fontSize:".9rem" }}>
                  {MATERIAL_META[key].tagline}
                </div>
              </button>
            ))}
          </div>

          <div
            key={active}
            style={{
              border:"1px solid var(--border)",
              borderRadius:12,
              padding:16,
              background:"var(--panel)",
              minHeight:220,
              position:"relative",
              overflow:"hidden"
            }}
          >
            <div
              style={{
                position:"absolute",
                inset:0,
                pointerEvents:"none",
                opacity:0,
                animation:"fadeIn .18s ease-out forwards"
              }}
            />
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div style={{ display:"grid", gap:10 }}>
              <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between" }}>
                <div>
                  <h4 style={{ margin:0 }}>{active}</h4>
                  <div style={{ color:"var(--muted)", marginTop:2 }}>{m.tagline}</div>
                </div>
                <button
                  type="button"
                  onClick={() => { onPick(active); onClose(); }}
                  style={{ padding:"0.6rem .9rem" }}
                >
                  Use {active}
                </button>
              </div>
              <ul style={{ margin:"6px 0 0 1rem" }}>
                {m.bullets.map((b,i)=><li key={i} style={{ margin:".35rem 0" }}>{b}</li>)}
              </ul>

              <div className="resp-grid-2-even" style={{ marginTop: 8 }}>
                <div style={{ border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", background:"var(--table-head-bg)" }}>
                  <div style={{ fontSize:".85rem", color:"var(--muted)", marginBottom:4 }}>Best for</div>
                  <div style={{ fontWeight:700 }}>{m.quick}</div>
                </div>
                <div style={{ border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", background:"var(--brand-50)" }}>
                  <div style={{ fontSize:".85rem", color:"var(--muted)", marginBottom:4 }}>Typical recipe</div>
                  <div style={{ fontWeight:700 }}>{m.recipe}</div>
                </div>
              </div>

              <div style={{ fontSize:".9rem", color:"var(--muted)", marginTop:6 }}>
                Need datasheets or exact grades? We can share stocked brands and validate critical loads.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ----------------------- Infill visualizer --------------------- */
function LatticePreview({ percent = 20, size = 200, corner = 12 }) {
  const p = Math.max(0, Math.min(100, percent));
  const spacing = (26 + (6 - 26) * (p / 100)); // 26 → 6
  const Lines = ({ angle }) => {
    const rad = (angle * Math.PI) / 180, cos = Math.cos(rad), sin = Math.sin(rad);
    const diag = Math.hypot(size, size), count = Math.ceil((diag * 2) / spacing);
    const lines = [];
    for (let i = -count; i <= count; i++) {
      const d = i * spacing, x1 = -diag, y1 = d, x2 = diag, y2 = d;
      const rx1 = x1 * cos - y1 * sin + size/2, ry1 = x1 * sin + y1 * cos + size/2;
      const rx2 = x2 * cos - y2 * sin + size/2, ry2 = x2 * sin + y2 * cos + size/2;
      lines.push(<line key={`${angle}-${i}`} x1={rx1} y1={ry1} x2={rx2} y2={ry2} stroke="var(--brand)" strokeWidth="1.6" strokeLinecap="round" opacity={0.9} />);
    }
    return <g>{lines}</g>;
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Infill lattice preview at ${p}%`} style={{ borderRadius: corner, boxShadow: "var(--shadow)" }}>
      <defs>
        <clipPath id="latticeClip"><rect x="0" y="0" width={size} height={size} rx={corner} ry={corner} /></clipPath>
        <linearGradient id="latticeSheen" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.08)" /><stop offset="100%" stopColor="rgba(0,0,0,0.06)" /></linearGradient>
      </defs>
      <rect x="0" y="0" width={size} height={size} rx={corner} ry={corner} fill="var(--panel)" stroke="var(--border)" />
      <g clipPath="url(#latticeClip)">
        <rect x="0" y="0" width={size} height={size} fill="var(--table-head-bg)" />
        <g opacity={0.95}><Lines angle={0} /><Lines angle={60} /><Lines angle={120} /></g>
        <rect x="0" y="0" width={size} height={size} fill="url(#latticeSheen)" />
      </g>
      <rect x="0.5" y="0.5" width={size-1} height={size-1} rx={corner} ry={corner} fill="none" stroke="var(--border)" />
    </svg>
  );
}
function InfillModal({ open, onClose, value, onChange }) {
  const [temp, setTemp] = useState(value ?? 20);
  const overlayRef = useRef(null);
  const onKeyDown = useCallback((e) => { if (open && e.key === "Escape") onClose(); }, [open, onClose]);
  useEffect(() => { if (!open) return; setTemp(value ?? 20); document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown); }, [open, value, onKeyDown]);
  if (!open) return null;
  const presets = [15, 35, 60, 100];
  return (
    <div className="modal-overlay" ref={overlayRef} role="presentation" onMouseDown={(e)=>{ if(e.target===overlayRef.current) onClose(); }}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="infill-title" style={{ padding: 20 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <h3 id="infill-title" className="modal-title" style={{ marginBottom:6 }}>Infill — strength vs. weight</h3>
          <button type="button" className="button-secondary" onClick={onClose}>Close</button>
        </div>

        {/* preview + controls, responsive */}
        <div className="resp-grid-visual" style={{ marginTop:8 }}>
          <div style={{ display:"grid", placeItems:"center" }}><LatticePreview percent={temp} size={220} /></div>
          <div style={{ display:"grid", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontWeight:700 }}>Density: {temp}%</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {presets.map((p)=>(
                  <button key={p} type="button" className="button-secondary button-quiet" onClick={()=>setTemp(p)}
                    style={{ padding:"6px 10px", borderColor: temp===p?"var(--ring)":"var(--border)", background: temp===p?"var(--brand-50)":"transparent" }}>{p}%</button>
                ))}
              </div>
            </div>
            <input type="range" min="0" max="100" step="1" value={temp} onChange={(e)=>setTemp(Number(e.target.value))} aria-label="Infill percentage" />
            <div style={{ border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", background:"var(--table-head-bg)" }}>
              <div style={{ fontWeight:700, marginBottom:4 }}>What it means</div>
              <ul style={{ margin:0, paddingLeft:"1.1rem" }}>
                <li><b>10–20%</b>: light & fast — visual models, mock-ups, simple housings.</li>
                <li><b>30–50%</b>: balanced — brackets, fixtures, functional prototypes.</li>
                <li><b>60–100%</b>: max strength — tooling, thin-walled parts, threads.</li>
              </ul>
              <div style={{ color:"var(--muted)", marginTop:6, fontSize:".9rem" }}>Pro tip: increasing <b>shells/walls</b> often boosts strength more efficiently than just raising infill.</div>
            </div>
            <div className="modal-actions" style={{ justifyContent:"space-between" }}>
              <div className="muted" style={{ fontSize:".9rem" }}>Affects strength, weight, and price. We’ll tune perimeters for you.</div>
              <button type="button" onClick={()=>{ onChange(temp); onClose(); }}>Use {temp}% infill</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------ Workspaces (tabs for parts) ---------------------- */
function uuid() { return Math.random().toString(36).slice(2, 10); }
function makeWorkspace(seed = {}) {
  return {
    id: uuid(),
    name: seed.name || "Part",
    file: null,
    uploadedName: seed.uploadedName || null,
    material: seed.material || "PLA",
    infill: typeof seed.infill === "number" ? seed.infill : 20,
    layerHeight: typeof seed.layerHeight === "number" ? seed.layerHeight : 0.2,
    qty: typeof seed.qty === "number" ? seed.qty : 1,
    result: seed.result || null,
    batch: seed.batch || null,
    custom: seed.custom || null,
    msg: "",
  };
}

function WorkspacesBar({ items, activeId, onSwitch, onAdd, onRename, onDuplicate, onRemove, onExportAll }) {
  return (
    <div className="ws-bar" style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 }}>
      {items.map((w, idx) => {
        const active = w.id === activeId;
        const price = w.result?.price_usd ?? w.batch?.single?.price_usd;
        return (
          <button key={w.id} className={`button-secondary button-quiet ${active ? "pill-strong" : ""}`}
            onClick={() => onSwitch(w.id)} title={w.uploadedName || w.name}
            style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", borderRadius:999 }}>
            <span style={{ fontWeight:700 }}>{w.name || `Part ${idx+1}`}</span>
            {price ? <span className="muted" style={{ fontSize:".85rem" }}>${Number(price).toFixed(2)}</span> : null}
          </button>
        );
      })}
      <button onClick={onAdd}>+ Add part</button>

      {/* RIGHT SIDE ACTIONS (fixed layout) */}
      <div className="ws-right">
        <button className="button-secondary" onClick={onExportAll} title="Export a single PDF containing all parts">
          Export all (PDF)
        </button>

        <div className="manage-actions">
          <span className="muted small">Manage current:</span>
          <button className="button-secondary" onClick={()=>onRename(activeId)}>Rename</button>
          <button className="button-secondary" onClick={()=>onDuplicate(activeId)}>Duplicate</button>
          <button className="button-danger" onClick={()=>onRemove(activeId)}>Remove</button>
        </div>
      </div>
    </div>
  );
}

/* =============================== Main Component ============================ */
export default function QuoteForm({ onSaveToCart }) {
  const [workspaces, setWorkspaces] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length) return saved.map((w) => ({ ...makeWorkspace(), ...w, id: w.id || uuid(), file: null }));
    } catch {}
    return [makeWorkspace({ name: "Part 1" })];
  });
  const [activeId, setActiveId] = useState(() => workspaces[0]?.id);
  const active = workspaces.find((w) => w.id === activeId) || workspaces[0];

  // Modals
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [infillOpen, setInfillOpen] = useState(false);

  // PDF capture ref (current workspace only)
  const captureRef = useRef(null);
  const recalcTimer = useRef(null);

  // axios client
  const axiosClient = useMemo(
    () => axios.create({ baseURL: API_BASE, timeout: 60000, headers: { "X-Requested-With": "XMLHttpRequest" } }),
    []
  );

  // persist all workspaces
  useEffect(() => {
    try {
      const toSave = workspaces.map(({ file, msg, ...rest }) => rest);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {}
  }, [workspaces]);

  // helpers
  const patchActive = (patch) => {
    setWorkspaces((prev) => prev.map((w) => (w.id === active.id ? { ...w, ...patch } : w)));
  };

  // Dropzone (binds to active workspace)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "model/stl": [".stl"], "model/obj": [".obj"], "application/sla": [".stl"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles?.[0];
      if (!f) return;
      const maxBytes = CLIENT_MAX_MB * 1024 * 1024;
      if (f.size > maxBytes) {
        patchActive({ msg: `File is larger than ${CLIENT_MAX_MB} MB. Please re-export or compress.` });
        return;
      }
      patchActive({ file: f, uploadedName: f.name || null, result: null, batch: null, qty: 1, custom: null, msg: "" });
    },
  });

  // custom qty recompute per active
  useEffect(() => {
    const w = active;
    if (!w?.batch?.tiers?.length || !w?.qty) {
      patchActive({ custom: null });
      return;
    }
    const q = Math.max(1, Math.floor(w.qty));
    const nearest = [...w.batch.tiers].sort((a, b) => Math.abs(a.qty - q) - Math.abs(b.qty - q))[0];
    if (!nearest) {
      patchActive({ custom: null });
      return;
    }
    const perUnit = Number(nearest.per_unit);
    patchActive({ custom: { perUnit: perUnit.toFixed(2), total: (perUnit * q).toFixed(2), fromQty: nearest.qty, qty: q } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.qty, active?.batch?.tiers]);

  // auto-recalc when controls change (active only)
  useEffect(() => {
    if (!active?.file) return;
    if (!active?.result && !active?.batch) return;
    if (recalcTimer.current) clearTimeout(recalcTimer.current);
    recalcTimer.current = setTimeout(() => {
      active?.batch ? handleBatch(true) : handleSingle(true);
    }, 350);
    return () => recalcTimer.current && clearTimeout(recalcTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.material, active?.infill, active?.layerHeight, active?.file, active?.id]);

  // network
  const postForm = async (endpoint, silent = false) => {
    if (!active?.file) {
      if (!silent) alert("Please upload a file for this part.");
      return null;
    }
    const formData = new FormData();
    formData.append("file", active.file);
    formData.append("material", active.material);
    formData.append("infill_pct", String(active.infill));
    formData.append("layer_height_mm", String(active.layerHeight));
    if (!silent) patchActive({ msg: "Uploading and analyzing…" });
    try {
      const res = await axiosClient.post(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
      if (!silent) patchActive({ msg: "" });
      return res.data;
    } catch (err) {
      if (!silent) {
        console.error(err);
        patchActive({ msg: "" });
        alert(`Failed: ${err?.response?.data?.detail || err?.message || "Request failed"}`);
      }
      return null;
    }
  };
  const handleSingle = async (silent = false) => {
    const data = await postForm("/api/quote/", silent);
    if (data) patchActive({ result: data, batch: null, custom: null, uploadedName: active?.uploadedName || data.filename || null });
  };
  const handleBatch = async (silent = false) => {
    const data = await postForm("/api/quote/batch/", silent);
    if (data)
      patchActive({
        batch: data,
        result: data.single || null,
        uploadedName: active?.uploadedName || data?.single?.filename || null,
      });
  };

  // clear current workspace data
  const confirmClear = () => {
    patchActive({ file: null, uploadedName: null, result: null, batch: null, qty: 1, custom: null, msg: "" });
    setConfirmOpen(false);
  };

  /* ------------------------------ Export helpers -------------------------- */
  const buildBaseName = (w) => {
    const base = w?.result?.filename || w?.uploadedName || w?.file?.name || w.name || "quote";
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    return `${String(base).replace(/\s+/g, "_")}_${ts}`;
  };
  const collectPayload = (w) => ({
    inputs: {
      filename: w?.result?.filename || w?.uploadedName || w?.file?.name || null,
      material: w.material,
      infill_pct: w.infill,
      layer_height_mm: w.layerHeight,
      custom_qty: w?.custom?.qty || null,
    },
    single: w.result || null,
    batch: w.batch || null,
    custom_estimate: w.custom || null,
  });

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(collectPayload(active), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${buildBaseName(active)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const w = active;
    const lines = [];
    if (w.result) {
      lines.push("Single Quote Summary");
      lines.push("Field,Value");
      const s = {
        filename: w.result.filename || w.uploadedName || "",
        material: w.material,
        infill_pct: w.infill,
        layer_height_mm: w.layerHeight,
        est_material_g: w.result.est_material_g,
        est_print_time_hr: w.result.est_print_time_hr,
        price_usd: w.result.price_usd,
        volume_cm3: w.result.volume_cm3,
        surface_cm2: w.result.surface_cm2,
        bbox_mm: (w.result.bbox_mm || []).join(" x "),
        triangles: w.result.triangles,
        machine: w.result.pricing_model?.machine_label,
      };
      Object.entries(s).forEach(([k, v]) => lines.push(`${k},${String(v ?? "").replace(/,/g, ";")}`));
      lines.push("");
    }
    if (w?.batch?.tiers?.length) {
      lines.push("Batch Tiers");
      lines.push("qty,discount,per_unit,total");
      w.batch.tiers.forEach((r) => lines.push([r.qty, r.discount, r.per_unit, r.total].join(",")));
      lines.push("");
    }
    if (w.custom) {
      lines.push("Custom Estimate");
      lines.push("qty,per_unit,total,nearest_tier");
      lines.push([w.custom.qty, w.custom.perUnit, w.custom.total, w.custom.fromQty].join(","));
      lines.push("");
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${buildBaseName(w)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Single workspace UI capture
  const downloadPDF = async () => {
    if (!captureRef.current) return;
    const EXPORT_WIDTH = 900;
    const wrap = document.createElement("div");
    wrap.style.position = "fixed";
    wrap.style.left = "-99999px";
    wrap.style.top = "0";
    wrap.style.width = `${EXPORT_WIDTH}px`;
    wrap.className = "pdf-export-root";
    const clone = captureRef.current.cloneNode(true);
    wrap.appendChild(clone);
    document.body.appendChild(wrap);

    const canvas = await html2canvas(wrap, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      width: wrap.clientWidth,
      windowWidth: wrap.clientWidth,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true, orientation: "p" });
    const pageW = pdf.internal.pageSize.getWidth(),
      pageH = pdf.internal.pageSize.getHeight();
    const margin = 30,
      imgW = pageW - margin * 2,
      imgH = (canvas.height * imgW) / canvas.width;
    const fitH = pageH - margin * 2;
    const ratio = imgH > fitH ? fitH / imgH : 1;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text(`Chicago 3D Printworks — Quote (${active.name})`, margin, margin - 10);
    pdf.addImage(imgData, "PNG", margin, margin, imgW * ratio, imgH * ratio, undefined, "FAST");
    pdf.save(`${buildBaseName(active)}.pdf`);
    document.body.removeChild(wrap);
  };

  // Export ALL workspaces
  const exportAllPDF = async () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true, orientation: "p" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 30;

    const stage = document.createElement("div");
    stage.style.position = "fixed";
    stage.style.left = "-99999px";
    stage.style.top = "0";
    stage.style.width = "900px";
    stage.className = "pdf-export-root";
    document.body.appendChild(stage);

    for (let i = 0; i < workspaces.length; i++) {
      const w = workspaces[i];

      const card = document.createElement("div");
      card.className = "estimate-card";
      card.style.padding = "20px";
      card.style.margin = "0";

      const title = document.createElement("h3");
      title.textContent = `${w.name}${w.uploadedName ? ` — ${w.uploadedName}` : ""}`;
      title.style.marginTop = "0";
      card.appendChild(title);

      const sub = document.createElement("div");
      sub.className = "muted";
      sub.style.marginBottom = "10px";
      sub.textContent = `Material: ${w.material} • Infill: ${w.infill}% • Layer: ${w.layerHeight}mm`;
      card.appendChild(sub);

      if (w.result) {
        const box = document.createElement("div");
        box.className = "result-box";
        const grid = document.createElement("div");
        grid.className = "er-grid";

        const rows = [
          ["Price (USD)", w.result.price_usd],
          ["Material (g)", w.result.est_material_g],
          ["Print time (hr)", w.result.est_print_time_hr],
          ["Volume (cm³)", w.result.volume_cm3],
          ["Surface (cm²)", w.result.surface_cm2],
          ["BBox (mm)", (w.result.bbox_mm || []).join(" x ")],
          ["Triangles", w.result.triangles],
          ["Machine", w.result.pricing_model?.machine_label || ""],
        ];

        rows.forEach(([k, v]) => {
          const row = document.createElement("div");
          row.className = "er-row";
          const l = document.createElement("div");
          l.className = "er-label";
          l.textContent = k;
          const val = document.createElement("div");
          val.className = "er-value";
          val.textContent = String(v ?? "—");
          row.appendChild(l);
          row.appendChild(val);
          grid.appendChild(row);
        });

        box.appendChild(grid);
        card.appendChild(box);
      }

      if (w?.batch?.tiers?.length) {
        const h4 = document.createElement("h4");
        h4.textContent = "Batch Pricing";
        card.appendChild(h4);

        const table = document.createElement("table");
        table.className = "batch-table";
        const thead = document.createElement("thead");
        thead.innerHTML = `<tr><th>Qty</th><th>Discount</th><th>Per Unit</th><th>Total</th></tr>`;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        w.batch.tiers.forEach((r) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td data-label="Qty">${r.qty}</td>
            <td data-label="Discount">${Math.round(r.discount * 100)}%</td>
            <td data-label="Per Unit">$${r.per_unit}</td>
            <td data-label="Total">$${r.total}</td>
          `;
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        card.appendChild(table);

        if (w.custom) {
          const custom = document.createElement("div");
          custom.className = "custom-qty-summary";
          custom.style.marginTop = "10px";
          custom.innerHTML = `
            <div class="pill">$${w.custom.perUnit} <span>/unit</span></div>
            <div class="pill pill-strong">$${w.custom.total} <span>total</span></div>
            <div class="muted">Nearest tier: <b>${w.custom.fromQty}</b></div>
          `;
          card.appendChild(custom);
        }
      }

      stage.appendChild(card);

      const canvas = await html2canvas(card, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        width: stage.clientWidth,
        windowWidth: stage.clientWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;
      const fitH = pageH - margin * 2;
      const ratio = imgH > fitH ? fitH / imgH : 1;

      if (i > 0) pdf.addPage();
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text("Chicago 3D Printworks — Quote Pack", margin, margin - 10);
      pdf.addImage(imgData, "PNG", margin, margin, imgW * ratio, imgH * ratio, undefined, "FAST");

      stage.removeChild(card);
    }

    document.body.removeChild(stage);
    pdf.save(`C3DPW_Quote_Pack_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  /* ----------------------- Info / education -------------------- */
  const infoItems = [
    {
      id: "upload",
      title: "Upload specs & estimator",
      content: (
        <div className="info-block">
          <ul className="checklist">
            <li>
              STL/OBJ in <b>millimeters</b>, watertight meshes preferred.
            </li>
            <li>
              Estimator uses <b>volume</b>, <b>surface area</b>, and <b>triangle count</b>.
            </li>
            <li>Orientation/supports handled by our operators.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "materials",
      title: "Materials (overview)",
      content: (
        <div className="info-block">
          <p className="muted">
            PLA, PLA+, PETG, Nylon, CF Nylon — each trades strength, heat, weight, and cost a little differently. For detailed
            use-cases & recipes, open the Materials guide.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" className="button-secondary" onClick={() => setMaterialsOpen(true)}>
              Open materials guide
            </button>
            <button type="button" className="button-secondary" onClick={() => setInfillOpen(true)}>
              Visualize infill
            </button>
          </div>
        </div>
      ),
    },
  ];

  /* ---------------------------- Workspace actions -------------------------- */
  const addWorkspace = () => {
    setWorkspaces((prev) => {
      const idx = prev.length + 1;
      const w = makeWorkspace({ name: `Part ${idx}` });
      setActiveId(w.id);
      return [...prev, w];
    });
  };
  const switchWorkspace = (id) => setActiveId(id);
  const renameWorkspace = (id) => {
    const name = prompt("Rename part:", workspaces.find((w) => w.id === id)?.name || "");
    if (name) setWorkspaces((prev) => prev.map((w) => (w.id === id ? { ...w, name } : w)));
  };
  const duplicateWorkspace = (id) => {
    setWorkspaces((prev) => {
      const src = prev.find((w) => w.id === id);
      if (!src) return prev;
      const dupe = makeWorkspace({
        ...src,
        id: undefined,
        name: `${src.name} (copy)`,
        file: null,
        uploadedName: src.uploadedName,
      });
      return [...prev, dupe];
    });
  };
  const removeWorkspace = (id) => {
    setWorkspaces((prev) => {
      const next = prev.filter((w) => w.id !== id);
      if (!next.length) {
        const fresh = makeWorkspace({ name: "Part 1" });
        setActiveId(fresh.id);
        return [fresh];
      }
      if (id === activeId) setActiveId(next[0].id);
      return next;
    });
  };

  /* --------------------------------- Render -------------------------------- */
  return (
    <div className="quote-container" role="region" aria-label="Instant Quote">
      {/* Workspaces header */}
      <WorkspacesBar
        items={workspaces}
        activeId={activeId}
        onSwitch={switchWorkspace}
        onAdd={addWorkspace}
        onRename={renameWorkspace}
        onDuplicate={duplicateWorkspace}
        onRemove={removeWorkspace}
        onExportAll={exportAllPDF}
      />

      {/* Upload (bound to active workspace) */}
      <div {...getRootProps()} className={`drop-area ${isDragActive ? "active" : ""}`} aria-label="Upload area">
        <input {...getInputProps()} aria-label="Upload STL or OBJ" />
        {active?.file ? (
          <p>{active.file.name}</p>
        ) : active?.uploadedName ? (
          <p>
            Last uploaded: <strong>{active.uploadedName}</strong> (re-upload to recalc)
          </p>
        ) : (
          <p>Drag & drop your STL/OBJ here</p>
        )}
        <p className="hint">Max {CLIENT_MAX_MB} MB • .stl or .obj</p>
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="control">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <label htmlFor="material">Material</label>
            <button
              type="button"
              className="button-secondary button-quiet"
              onClick={() => setMaterialsOpen(true)}
              title="Open detailed materials guide"
              style={{ padding: "6px 10px" }}
            >
              Learn materials
            </button>
          </div>
          <select id="material" value={active.material} onChange={(e) => patchActive({ material: e.target.value })}>
            {MATERIALS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="control">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <label htmlFor="infill">Infill %</label>
            <button
              type="button"
              className="button-secondary button-quiet"
              onClick={() => setInfillOpen(true)}
              title="Open infill visualizer"
              style={{ padding: "6px 10px" }}
            >
              Visualize
            </button>
          </div>
          <input
            id="infill"
            type="number"
            min="0"
            max="100"
            step="1"
            value={active.infill}
            onChange={(e) => patchActive({ infill: Math.min(100, Math.max(0, Number(e.target.value))) })}
          />
        </div>

        <div className="control">
          <label htmlFor="layer">Layer (mm)</label>
          <input
            id="layer"
            type="number"
            min="0.1"
            max="0.4"
            step="0.02"
            value={active.layerHeight}
            onChange={(e) => patchActive({ layerHeight: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button onClick={() => handleSingle(false)} disabled={!active?.file}>
          {active?.msg ? "Estimating…" : "Get Estimate"}
        </button>
        <button onClick={() => handleBatch(false)} disabled={!active?.file}>
          {active?.msg ? "Calculating…" : "Batch Pricing"}
        </button>
        {(active?.result || active?.batch) && (
          <button
            type="button"
            className="button-secondary"
            onClick={() => setConfirmOpen(true)}
            title="Clear current quote and cached data"
          >
            Clear Current Quote
          </button>
        )}
      </div>

      {active?.msg && (
        <div className="status" role="status" aria-live="polite">
          {active.msg}
        </div>
      )}

      {/* Export capture for THIS workspace */}
      <div ref={captureRef}>
        {active?.result && <EstimateResult result={active.result} />}
        {active?.batch?.tiers?.length > 0 && (
          <div className="mt-16">
            <h4>Batch Pricing</h4>
            <table className="batch-table">
              <thead>
                <tr>
                  <th>Qty</th>
                  <th>Discount</th>
                  <th>Per Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {active.batch.tiers.map((r) => (
                  <tr key={r.qty}>
                    <td data-label="Qty">{r.qty}</td>
                    <td data-label="Discount">{Math.round(r.discount * 100)}%</td>
                    <td data-label="Per Unit">${r.per_unit}</td>
                    <td data-label="Total">${r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Custom quantity */}
            <div className="custom-qty-wrap mt-16" aria-label="Custom quantity estimator">
              <div className="custom-qty-row">
                <label htmlFor="customQty" className="custom-qty-label">
                  Custom Qty
                </label>
                <input
                  id="customQty"
                  type="number"
                  min="1"
                  value={active.qty}
                  onChange={(e) => patchActive({ qty: Number(e.target.value) })}
                  className="custom-qty-input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              <div className="custom-qty-summary" role="note" aria-live="polite">
                {active?.custom ? (
                  <>
                    <div className="pill">
                      ${active.custom.perUnit} <span>/unit</span>
                    </div>
                    <div className="pill pill-strong">
                      ${active.custom.total} <span>total</span>
                    </div>
                    <div className="muted">
                      Based on nearest tier of <b>{active.custom.fromQty}</b> units
                    </div>
                  </>
                ) : (
                  <div className="muted">Enter a quantity to see an instant estimate.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {(active?.result || active?.batch) && (
        <div className="actions" style={{ marginTop: 16 }}>
          <button type="button" className="button-secondary" onClick={downloadPDF}>
            Download PDF
          </button>
          <button type="button" className="button-secondary" onClick={downloadCSV}>
            Download CSV
          </button>
          <button type="button" className="button-secondary" onClick={downloadJSON}>
            Download JSON
          </button>
        </div>
      )}

      {/* Helpful info */}
      <div className="info-sections mt-16">
        <h4>Helpful info</h4>
        <Accordion items={infoItems} />
      </div>

      {/* Modals */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmClear}
        title="Clear current quote?"
        body="This clears file name, quote results, batch tiers, and cached data for this part. Material/infill/layer stay."
      />
      <MaterialsModal
        open={materialsOpen}
        onClose={() => setMaterialsOpen(false)}
        onPick={(m) => patchActive({ material: m })}
        current={active.material}
      />
      <InfillModal
        open={infillOpen}
        onClose={() => setInfillOpen(false)}
        value={active.infill}
        onChange={(v) => patchActive({ infill: v })}
      />
    </div>
  );
}
