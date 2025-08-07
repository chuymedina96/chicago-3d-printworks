// src/pages/Quote.js
import QuoteForm from "../components/QuoteForm";

function Quote() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Instant Quote</h1>
      <p>Upload your STL or OBJ file to get an estimate.</p>
      <QuoteForm />
    </div>
  );
}
export default Quote;
