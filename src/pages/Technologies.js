import './Technologies.css';

function Technologies() {
  return (
    <main className="tech-container" role="main" aria-label="Technologies">
      <h1>Our 3D Printing Stack</h1>
      <p>
        At Chicago 3D Printworks, we’re currently running a fleet of high-speed FDM printers,
        most of which are upgraded with hardened steel nozzles and tuned for multi-material workflows.
        We specialize in printing real-world parts with accuracy and speed for prototyping, retail, and local brands.
      </p>

      <h2>Materials We've Used</h2>
      <ul>
        <li>PLA / PLA+ – everyday functional parts & prototypes</li>
        <li>PETG – stronger, more temperature-resistant prints</li>
        <li>Nylon – flexible and durable</li>
        <li>Carbon Fiber Nylon – rigid, lightweight, engineering-grade performance</li>
      </ul>

      <h2>File Support & Geometry Analysis</h2>
      <p>
        We currently accept STL and OBJ file formats. Our backend quote system is powered by a custom
        Python algorithm that parses 3D mesh geometry.
        It analyzes surface area, bounding box dimensions, and part volume to help generate accurate time and material estimates.
      </p>

      <p>
        Our STL analyzer is still in active development, and we’re refining it weekly to support more real-world edge cases and material options.
        All pricing is calculated live through our own Django API stack.
      </p>

      <h2>Vision & Roadmap</h2>
      <p>
        While we're currently focused on rapid FDM production using tested materials, we’re actively exploring
        support for advanced materials like TPU, ASA, and PEEK. Resin/SLA capabilities and CNC post-processing
        are also on our roadmap as demand increases.
      </p>
    </main>
  );
}

export default Technologies;
