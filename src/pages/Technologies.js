// src/pages/Technologies.js
function Technologies() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Our 3D Printing Stack</h1>
      <p>We use high-speed FDM printers with auto-calibration and advanced slicing logic.</p>

      <h2>File Types</h2>
      <p>We accept STL and OBJ files. Our quote system analyzes part volume and surface area using open-source tools like <code>trimesh</code>.</p>

      <h2>Materials</h2>
      <ul>
        <li>PLA</li>
        <li>PETG</li>
        <li>Nylon (carbon-fiber reinforced)</li>
      </ul>

      <h2>Process</h2>
      <p>We analyze part geometry, estimate material weight, and calculate print time using our custom Django API.</p>
    </div>
  );
}

export default Technologies;
