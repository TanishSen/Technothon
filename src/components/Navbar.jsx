// Navigation bar component
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function Navbar() {
  return (
    <nav className="navbar glassmorphism">
      {/* Logo */}
      <div className="navbar-logo scroll-animate-left">TECHTHON</div>
      {/* Navigation links */}
      <div className="navbar-links scroll-animate-right">
        <a href="#about">About</a>
        <a href="#events">Events</a>
        <a href="#innovations">Innovations</a>
        <a href="#upcoming">Upcoming Events</a>
      </div>
    </nav>
  );
}

export default Navbar;
