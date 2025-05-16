// Homepage component (combines all sections)
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import AIUnleashed from "../components/AIUnleashed";
import OtherEvents from "../components/OtherEvents";
import Innovations from "../components/Innovations";
import UpcomingEvents from "../components/UpcomingEvents";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      <AboutUs />
      <AIUnleashed />
      <OtherEvents />
      <Innovations />
      <UpcomingEvents />
      <Footer />
    </div>
  );
}

export default Home;
