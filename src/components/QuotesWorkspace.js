// src/components/QuotesWorkspace.js
import { useEffect, useMemo, useState, useCallback } from "react";
import jsPDF from "jspdf";
import "./quoteForm.css";
import QuoteForm from "./QuoteForm";

const CART_KEY = "c3dpw_quote_cart_v1";

function QuoteRow({ item, onRemove }) {
  const meta = item?.meta || {};
  return (
    <div className="cart-row">
      <div className="cart-thumb">
        {item?.png ? (
          <img src={item.png} alt={meta.filename || "Quote preview"} />
        ) : (
          <div className="thumb-fallback">No preview</div>
        )}
      </div>
      <div className="cart-info">
        <div className="cart-title">{meta.filename || "Unnamed part"}</div>
        <div className="cart-sub">
          {meta.material} • {meta.infill_pct}% infill • {meta.layer_height_mm} mm
        </div>
        <div className="cart-sub">
          {meta.price != null ? <>${Number(meta.price).toFixed(2)} total</> : "—"}
        </div>
      </div>
      <div className="cart-actions">
        <button
          type="button"
          className="button-secondary"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default function QuotesWorkspace() {
  const [items, setItems] = useState([]);

  // restore
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = useCallback((payloadFromForm) => {
    // payloadFromForm = { id, png, meta, raw }
    setItems((prev) => [payloadFromForm, ...prev]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  /* ---------- Export all (legacy cart export) ---------- */
  const exportAllPDF = async () => {
    if (!Array.isArray(items) || !items.length) return;

    const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 30;

    items.forEach((it, idx) => {
      if (idx > 0) pdf.addPage();

      // header
      let y = margin;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(it?.meta?.filename || "Quote", margin, y);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      const sub = [
        it?.meta?.material,
        `${it?.meta?.infill_pct}%`,
        `${it?.meta?.layer_height_mm}mm`,
        it?.meta?.price != null ? `$${Number(it.meta.price).toFixed(2)}` : null,
      ]
        .filter(Boolean)
        .join(" • ");
      pdf.text(sub, pageW - margin, y, { align: "right" });
      y += 12;

      // snapshot image (already scaled well from form)
      if (it?.png) {
        const img = it.png;
        const imgW = pageW - margin * 2;
        const imgH = imgW * (3 / 4); // assume ~4:3 from form export
        const imgY = y + 8;
        if (imgY + imgH > pageH - margin) {
          const maxH = pageH - margin - imgY;
          const ratio = maxH / imgH;
          pdf.addImage(img, "PNG", margin, imgY, imgW * ratio, imgH * ratio, undefined, "FAST");
        } else {
          pdf.addImage(img, "PNG", margin, imgY, imgW, imgH, undefined, "FAST");
        }
      }
    });

    pdf.save(`all-quotes_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.pdf`);
  };

  const exportAllCSV = () => {
    if (!items.length) return;
    const lines = [];
    lines.push(
      "filename,material,infill_pct,layer_height_mm,price_usd,est_material_g,est_print_time_hr,volume_cm3,surface_cm2,triangles"
    );
    items.forEach((it) => {
      const r = it?.raw?.single || it?.raw?.result || it?.raw?.single_result || {};
      const meta = it?.meta || {};
      const priceStr =
        (meta.price ?? r?.price_usd ?? "") !== "" ? Number(meta.price ?? r?.price_usd).toFixed(2) : "";
      const timeStr = r?.est_print_time_hr != null ? Number(r.est_print_time_hr).toFixed(2) : "";
      lines.push(
        [
          JSON.stringify(meta.filename || ""), // protect commas
          meta.material,
          meta.infill_pct,
          meta.layer_height_mm,
          priceStr,
          r?.est_material_g ?? "",
          timeStr,
          r?.volume_cm3 ?? "",
          r?.surface_cm2 ?? "",
          r?.triangles ?? "",
        ].join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "all-quotes.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const exportAllJSON = () => {
    if (!items.length) return;
    const payload = items.map((it) => ({
      id: it.id,
      meta: it.meta,
      raw: it.raw, // includes inputs + single/batch
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "all-quotes.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const totals = useMemo(() => {
    const sum = items.reduce((acc, it) => acc + (Number(it?.meta?.price) || 0), 0);
    return { count: items.length, sum: Math.round(sum * 100) / 100 };
  }, [items]);

  return (
    <div className="quote-container" style={{ display: "grid", gap: 18 }}>
      {/* Left: normal single-item workflow */}
      <QuoteForm onSaveToCart={addToCart} />

      {/* Right / Bottom: the cart */}
      <div className="estimate-card" style={{ marginTop: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <h3 style={{ margin: 0 }}>Quote List</h3>
          <div className="muted">
            {totals.count} item{totals.count !== 1 ? "s" : ""}
            {totals.count ? <> • ${totals.sum.toFixed(2)} total</> : null}
          </div>
        </div>

        {!items.length && (
          <p className="muted" style={{ marginTop: 8 }}>
            No saved quotes yet. Generate an estimate above, then click <b>Add to Quote List</b>.
          </p>
        )}

        <div className="cart-list">
          {items.map((it) => (
            <QuoteRow key={it.id} item={it} onRemove={removeItem} />
          ))}
        </div>

        <div className="actions actions-responsive" style={{ marginTop: 12 }}>
          <button type="button" className="button-secondary" onClick={clearAll} disabled={!items.length}>
            Clear All
          </button>
          <div style={{ flex: 1 }} />
          <button type="button" className="button-secondary" onClick={exportAllCSV} disabled={!items.length}>
            Export CSV
          </button>
          <button type="button" className="button-secondary" onClick={exportAllJSON} disabled={!items.length}>
            Export JSON
          </button>
          <button type="button" onClick={exportAllPDF} disabled={!items.length}>
            Export All as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
