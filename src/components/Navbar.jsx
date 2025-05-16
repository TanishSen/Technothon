// Navigation bar component
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function Navbar() {
  return (
    <nav className="navbar glassmorphism">
      {/* Logo */}
      <div className="navbar-logo">TECHNOTHON</div>
      {/* Navigation links */}
      <div className="navbar-links">
        <a href="#about">ABOUT US</a>
        <a href="#events">EVENTS</a>
        <a href="#innovations">INNOVATIONS</a>
        <a href="#upcoming">UPCOMING EVENTS</a>
      </div>
    </nav>
  );
}

export default Navbar;
