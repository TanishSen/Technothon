// Footer component ("Get in Touch" section)
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function Footer() {
  return (
    <footer className="footer glassmorphism">
      <h2>Get in Touch</h2>
      <div className="footer-container">
        {/* Links */}
        <div className="footer-section">
          <p className="footer-title">About</p>
          <p className="footer-title">Artists</p>
          <p className="footer-title">Schedule</p>
          <p className="footer-title">News</p>
        </div>
        {/* Tickets */}
        <div className="footer-section">
          <p className="footer-title">Get Tickets</p>
          <p>Say hello</p>
          <p className="footer-info">INFO@TATTOO.COM</p>
        </div>
        {/* Contact Info */}
        <div className="footer-section">
          <p className="footer-title">Location</p>
          <p>7170 Random Street,</p>
          <p>Orchard Park, NY 14127</p>
          <p>United States</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Built with the Slider Revolution</p>
        <p>Go on Top</p>
      </div>
    </footer>
  );
}

export default Footer;
