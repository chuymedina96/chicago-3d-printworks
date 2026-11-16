import QuoteForm from "../components/QuoteForm";
import "./Quote.css";

function Quote() {
  return (
    <main className="page quote-page">
      <div className="container">
        <header className="page-header quote-header">
          <div className="eyebrow">Instant quote</div>
          <h1>Price your part in seconds</h1>
          <p className="lede">
            Upload an STL or OBJ. Our engine measures the geometry, applies your material and print settings,
            and returns a price with batch tiers. An engineer reviews every order before it prints.
          </p>
          <ul className="quote-points">
            <li>STL / OBJ in mm</li>
            <li>5 materials</li>
            <li>Batch pricing</li>
            <li>PDF export</li>
          </ul>
        </header>
        <QuoteForm />
        <p className="quote-fine">
          Quotes are estimates for standard FDM printing. Final pricing is confirmed after engineering review.
          Need CAD help or have a STEP file? Email <a href="mailto:chicago3dprintworks@gmail.com">chicago3dprintworks@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
export default Quote;
