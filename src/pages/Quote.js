import QuoteForm from "../components/QuoteForm";
import "./Quote.css";

function Quote() {
  return (
    <main className="quote-page" role="main" aria-label="Instant Quote">
      <section className="quote-card">
        <h1>Instant Quote</h1>
        <p className="quote-lede">
          Upload your STL or OBJ file to get an estimate in seconds. Our system
          analyzes geometry, volume, and material settings to generate accurate
          pricing.
        </p>
        <QuoteForm />
      </section>
    </main>
  );
}
export default Quote;
