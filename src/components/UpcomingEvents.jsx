// Upcoming Events section component
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function UpcomingEvents() {
  return (
    <section id="upcoming" className="upcoming-events">
      <h2 className="scroll-animate-text">UPCOMING EVENTS</h2>
      <div className="upcoming-events-container">
        {/* Event List */}
        <div className="upcoming-events-list">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className="event-item glassmorphism scroll-animate-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p className="event-date">{event.date}</p>
            </div>
          ))}
        </div>
        {/* Images */}
        <div className="upcoming-events-images">
          {upcomingEventImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Upcoming Event"
              className="scroll-animate-image"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      {/* <div className="view-all scroll-animate-text">
        <a href="#">View All</a>
      </div> */}
    </section>
  );
}

// Import event data
import { upcomingEvents, upcomingEventImages } from "../data/events";

export default UpcomingEvents;
