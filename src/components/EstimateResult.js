// src/components/EstimateResult.js
import React, { useMemo, useState } from "react";
import "./quoteForm.css";

function Row({ label, value, suffix }) {
  return (
    <div className="er-row">
      <div className="er-label">{label}</div>
      <div className="er-value">
        {value !== undefined && value !== null ? value : "—"}
        {suffix ? ` ${suffix}` : ""}
      </div>
    </div>
  );
}

export default function EstimateResult({ result }) {
  const safe = result || {};
  const {
    filename,
    material: initialMaterial,
    layer_height_mm,       // initial or user-specified
    infill_pct,
    volume_cm3,
    surface_cm2,
    bbox_mm,
    triangles,
    est_material_g,
    est_print_time_hr,     // backend's initial time
    price_usd,             // backend's initial price
    materials,
    pricing_model,
  } = safe;

  // Use only the base filename (avoid leaking tmp paths)
  const displayName = (filename || "").split(/[\\/]/).pop() || filename || "—";

  // fallbacks if backend is older
  const mats = materials || {
    PLA:     { label: "PLA",     rate_per_g: 0.025, density_g_cm3: 1.24, rec_layer_mm: 0.2,  speed_factor: 1.0 },
    "PLA+":  { label: "PLA+",    rate_per_g: 0.028, density_g_cm3: 1.24, rec_layer_mm: 0.2,  speed_factor: 0.95 },
    PETG:    { label: "PETG",    rate_per_g: 0.03,  density_g_cm3: 1.27, rec_layer_mm: 0.24, speed_factor: 0.85 },
    Nylon:   { label: "Nylon",   rate_per_g: 0.06,  density_g_cm3: 1.15, rec_layer_mm: 0.24, speed_factor: 0.80 },
    CFNylon: { label: "CFNylon", rate_per_g: 0.10,  density_g_cm3: 1.20, rec_layer_mm: 0.28, speed_factor: 0.70 },
  };

  const model = pricing_model || {
    base_fee: 5.0,
    hourly_rate: 8.0,
    postprocess_fee: 0.0,
    machine_cm3_per_hr: 46.0, // fallback
  };

  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial || "PLA");

  // ---- MATCH BACKEND MATH ----
  const estimateTimeHours = (vol_cm3, lh_mm, infill, machine_cm3_hr, mat_speed) => {
    if (!vol_cm3 || !machine_cm3_hr) return null;
    // same clamps as backend
    const layerRel = 0.20 / Math.max(lh_mm || 0.2, 0.10);
    const layerRelClamped = Math.max(0.6, Math.min(layerRel, 1.5));
    const infillMult = 1.0 + ((infill ?? 20) / 100.0) * 0.3;
    const effective = Math.max(1e-6, machine_cm3_hr * (mat_speed || 1.0) / layerRelClamped);
    const est = (vol_cm3 / effective) * infillMult;
    return Math.max(0.08, est); // ~5 min floor
  };

  const computed = useMemo(() => {
    if (!volume_cm3) {
      return {
        layer_mm: layer_height_mm ?? null,
        time_hr: est_print_time_hr ?? null,
        grams: est_material_g ?? null,
        price: price_usd ?? null,
      };
    }
    const m = mats[selectedMaterial] || mats["PLA"];
    const recLayer = m.rec_layer_mm ?? layer_height_mm ?? 0.2;

    // time using backend-equivalent model
    const time_hr = estimateTimeHours(
      volume_cm3,
      recLayer,
      infill_pct ?? 20,
      model.machine_cm3_per_hr,
      m.speed_factor
    );

    // grams & price using current material + model knobs
    const grams = volume_cm3 * (m.density_g_cm3 ?? 1.24);
    const price =
      (model.base_fee || 0) +
      grams * (m.rate_per_g ?? 0.025) +
      (time_hr || 0) * (model.hourly_rate || 0) +
      (model.postprocess_fee || 0);

    return {
      layer_mm: Math.round(recLayer * 1000) / 1000,
      time_hr: time_hr != null ? Math.round(time_hr * 100) / 100 : null,
      grams: Math.round(grams * 10) / 10,
      price: Math.round(price * 100) / 100,
    };
  }, [
    selectedMaterial,
    mats,
    model.machine_cm3_per_hr,
    model.base_fee,
    model.hourly_rate,
    model.postprocess_fee,
    volume_cm3,
    layer_height_mm,
    infill_pct,
    est_print_time_hr,
    est_material_g,
    price_usd,
  ]);

  if (!result) return null;

  return (
    <div className="estimate-card">
      <h3>Estimate</h3>

      <div className="controls" style={{ marginBottom: "0.75rem" }}>
        <div className="control">
          <label>Material</label>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            {Object.keys(mats).map((k) => (
              <option key={k} value={k}>{mats[k].label || k}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="er-grid">
        <Row label="File" value={displayName} />
        <Row label="Layer Height (rec.)" value={computed.layer_mm} suffix="mm" />
        <Row label="Infill" value={infill_pct} suffix="%" />
        <Row label="Volume" value={volume_cm3} suffix="cm³" />
        <Row label="Surface Area" value={surface_cm2} suffix="cm²" />
        <Row
          label="Bounding Box (mm)"
          value={Array.isArray(bbox_mm) ? `${bbox_mm[0]} × ${bbox_mm[1]} × ${bbox_mm[2]}` : "—"}
        />
        <Row label="Triangles" value={triangles} />
        <Row label="Material (est.)" value={computed.grams} suffix="g" />
        <Row label="Print Time (est.)" value={computed.time_hr} suffix="hr" />
      </div>

      <div className="er-total">
        <span>Total</span>
        <strong>{computed.price != null ? `$${computed.price}` : "—"}</strong>
      </div>
    </div>
  );
}
