// Navigation bar component
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function Navbar() {
  return (
    <nav className="navbar glassmorphism">
      {/* Logo */}
      <div className="navbar-logo francois-font ">TECHNOTHON</div>
      {/* Navigation links */}
      <div className="navbar-links francois-font ">
        <a href="#about" className="nav-link">
          ABOUT US
        </a>
        <a href="#events" className="nav-link">
          EVENTS
        </a>
        <a href="#innovations" className="nav-link">
          INNOVATIONS
        </a>
        <a href="#upcoming" className="nav-link">
          UPCOMING EVENTS
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
