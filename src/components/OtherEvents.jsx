// Other Events section component
import { BorderBeam } from "./BorderBeam";
import { otherEvents } from "../data/events";
// import { otherEvents } from "../data/events";
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
            <BorderBeam />
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

export default OtherEvents;
