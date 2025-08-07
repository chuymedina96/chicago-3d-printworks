// src/components/EstimateResult.js
function EstimateResult({ result }) {
  return (
    <div className="result-box">
      <h3>Estimated Quote</h3>
      <ul>
        <li><strong>Volume:</strong> {result.volume_cm3.toFixed(2)} cm³</li>
        <li><strong>Material:</strong> {result.material_g.toFixed(2)} g</li>
        <li><strong>Print Time:</strong> {result.estimated_time_min} min</li>
        <li><strong>Cost:</strong> ${result.cost_usd.toFixed(2)}</li>
      </ul>
    </div>
  );
}

export default EstimateResult;
