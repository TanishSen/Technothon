// Other Events section component
function OtherEvents() {
  return (
    <section id="events" className="other-events">
      <h2>Other Events</h2>
      <div className="events-grid">
        {otherEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
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
