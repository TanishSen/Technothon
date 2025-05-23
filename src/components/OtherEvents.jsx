// Other Events section component
function OtherEvents() {
  return (
    <section id="events" className="other-events">
      <h2 className="scroll-animate-text">OTHER EVENTS</h2>
      <div className="events-grid">
        {otherEvents.map((event, index) => (
          <div
            key={event.id}
            className="event-card scroll-animate-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              className="scroll-animate-image"
              src={event.image}
              alt={event.title}
            />
            <div className="event-overlay">
              <h3>{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Import event data
import { otherEvents } from "../data/events";

export default OtherEvents;
