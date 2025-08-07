// src/pages/Support.js
function Support() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Engineering Support</h1>
      <p>Need design feedback, DfAM support, or pre-print review? Reach out to our engineering team.</p>
      <form action="https://formspree.io/f/your-code" method="POST">
        <label>Name</label>
        <input type="text" name="name" required />

        <label>Email</label>
        <input type="email" name="_replyto" required />

        <label>Message</label>
        <textarea name="message" rows="5" required></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default Support;
