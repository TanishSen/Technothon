// Upcoming Events section component
import "../styles/glassmorphism.css"; // Import glassmorphism styles

function UpcomingEvents() {
  return (
    <section id="upcoming" className="upcoming-events">
      <h2>Upcoming Events</h2>
      <div className="upcoming-events-container">
        {/* Event List */}
        <div className="upcoming-events-list">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-item glassmorphism">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p className="event-date">{event.date}</p>
            </div>
          ))}
        </div>
        {/* Images */}
        <div className="upcoming-events-images">
          {upcomingEventImages.map((image, index) => (
            <img key={index} src={image} alt="Upcoming Event" />
          ))}
        </div>
      </div>
      <div className="view-all">
        <a href="#">View All</a>
      </div>
    </section>
  );
}

// Import event data
import { upcomingEvents, upcomingEventImages } from "../data/events";

export default UpcomingEvents;
