import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { Droplet, CheckCircle2 } from "lucide-react";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Login", to: "/login" },
];

const HomePage = () => {
  const [, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const rippleControls = useAnimation();
  const bounceControls = useAnimation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    rippleControls.start({
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2],
      transition: { repeat: Infinity, duration: 4 },
    });

    bounceControls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2 },
    });
  }, [rippleControls, bounceControls]);

  const initiatives = [
    "IoT water meters deployed in Thimphu & Paro",
    "Rainwater harvesting projects in rural schools",
    "Launch of citizen MyWater mobile app",
    "Youth Ambassadors training in river stewardship",
  ];

  return (
    <div
      className={`min-h-screen px-6 ${
        darkMode
          ? "bg-gradient-to-b from-[#001f24] via-[#003633] to-[#004d40] text-[#a7e6e1]"
          : "bg-gradient-to-b from-[#86C5D9] via-[#4DA0AE] to-[#00798C] text-white"
      }`}
    >
      {/* Header */}
      <header className="relative flex flex-col max-w-7xl mx-auto py-8">
        <motion.div
          animate={rippleControls}
          className="absolute top-1/2 left-1/2 w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#52b0cf] opacity-25 pointer-events-none blur-3xl"
        />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div animate={bounceControls}>
              <Droplet
                className={`w-10 h-10 ${
                  darkMode ? "text-[#48cae4]" : "text-[#00a8cc]"
                }`}
              />
            </motion.div>
            <div>
              <h1
                className={`text-3xl font-extrabold ${
                  darkMode ? "text-[#a7e6e1]" : "text-[#d6dee3]"
                }`}
              >
                Druk Water Authority System (DWAS)
              </h1>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                National Water Intelligence for Bhutan
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 w-10 h-5 bg-[#48cae4] dark:bg-[#005f73] rounded-full relative"
              aria-label="Toggle dark mode"
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 transition-transform ${
                  darkMode ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Nav Bar */}
        <nav
          className={`mt-8 flex justify-end space-x-10 text-lg font-semibold ${
            darkMode ? "text-[#caf0f8]" : "text-[#023047]"
          }`}
        >
          {navItems.map(({ name, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded hover:bg-[#0096c7] hover:text-white transition ${
                  isActive
                    ? "text-[#00b4d8] font-bold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-[#00b4d8] after:rounded"
                    : darkMode
                    ? "text-[#90e0ef]"
                    : "text-[#023047]"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className={`pt-16 pb-28 rounded-3xl shadow-lg max-w-5xl mx-auto text-center px-6 ${
          darkMode
            ? "bg-gradient-to-tr from-[#00798c] via-[#004d40] to-[#013440] text-[#a7e6e1]"
            : "bg-gradient-to-tr from-[#0096c7] via-[#00b4d8] to-[#48cae4] text-white"
        }`}
      >
        <h1 className="text-5xl font-extrabold mb-5 animate-pulse">
          Wisdom Flows with Every Drop
        </h1>
        <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Ensuring clean, intelligent, and equitable water access for every citizen. Powered by
          data, driven by compassion.
        </p>
        <Link to="/dashboard">
          <Button
            className={`px-8 py-3 rounded-lg font-semibold shadow-md transition ${
              darkMode
                ? "bg-[#caf0f8] text-[#023047] hover:bg-[#ade8f4]"
                : "bg-white text-[#00798c] hover:bg-[#e0f7fa]"
            }`}
          >
            Go to Dashboard 🚀
          </Button>
        </Link>
      </section>

      {/* About Us */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`py-24 rounded-3xl max-w-5xl mx-auto mt-16 shadow-md text-center px-6 ${
          darkMode ? "bg-[#012f33] text-[#caf0f8]" : "bg-[#90e0ef] text-[#0077b6]"
        }`}
      >
        <h2 className="text-4xl font-bold mb-5">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed">
          Druk Water Authority leads Bhutan in sustainable water resource management through
          technology, transparency, and trust.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-14 py-20 px-6 max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={`p-10 rounded-2xl shadow-lg ${
            darkMode ? "bg-[#005f73] text-[#caf0f8]" : "bg-[#48cae4] text-[#023047]"
          }`}
        >
          <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
          <p className="leading-relaxed">
            Empowering Bhutan through resilient water systems and community-focused solutions.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className={`p-10 rounded-2xl shadow-lg ${
            darkMode ? "bg-[#00798c] text-[#caf0f8]" : "bg-[#90e0ef] text-[#023047]"
          }`}
        >
          <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
          <p className="leading-relaxed">
            A water-secure Bhutan where innovation and tradition work in harmony.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className={`py-24 rounded-3xl max-w-7xl mx-auto mt-16 shadow-lg text-left px-6 ${
          darkMode ? "bg-[#023047] text-[#caf0f8]" : "bg-[#90e0ef] text-[#023047]"
        }`}
      >
        <h2 className="text-4xl font-bold mb-12 text-center">
          What We Do
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Smart Water Monitoring", desc: "Real-time sensors across rivers and reservoirs." },
            { title: "Water Quality Analytics", desc: "AI-driven purity and safety insights." },
            { title: "Community Engagement", desc: "Empowering local voices with workshops and outreach." },
            { title: "Infrastructure Planning", desc: "GIS-based mapping for urban and rural planning." },
            { title: "Crisis Management", desc: "Alerts and solutions for emergencies." },
            { title: "Open Data Portals", desc: "Transparent dashboards for all stakeholders." },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl shadow ${
                darkMode ? "bg-[#004d40] text-[#caf0f8]" : "bg-white text-[#023047]"
              }`}
            >
              <h4 className="text-xl font-semibold mb-3">{title}</h4>
              <p className="text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Initiatives */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-24 px-8 relative overflow-hidden rounded-3xl max-w-5xl mx-auto mt-16 shadow-lg"
        style={{
          background:
            darkMode
              ? "linear-gradient(to bottom, #00798c, #004d40, #013440)"
              : "linear-gradient(to bottom, #0096c7, #00b4d8, #48cae4)",
          color: darkMode ? "#a7e6e1" : "#004d40",
        }}
      >
        {/* Decorative wave background */}
        <svg
          className="absolute top-0 left-0 w-full h-36 opacity-30"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={darkMode ? "#004d40" : "#004d40"}
            fillOpacity="0.4"
            d="M0,128L48,160C96,192,192,256,288,261.3C384,267,480,213,576,165.3C672,117,768,75,864,64C960,53,1056,75,1152,90.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>

        <h2 className="text-4xl font-extrabold mb-14 drop-shadow-lg text-center">
          Latest Initiatives
        </h2>

        <div className="grid sm:grid-cols-2 gap-10 relative z-10">
          {initiatives.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.06 }}
              className={`flex items-start space-x-5 rounded-2xl p-6 shadow-lg cursor-pointer transition-shadow duration-300 ${
                darkMode ? "bg-white/10" : "bg-white/90"
              }`}
            >
              <CheckCircle2
                className={`w-9 h-9 ${
                  darkMode ? "text-[#48cae4]" : "text-[#48cae4]"
                }`}
              />
              <p
                className={`font-semibold text-lg leading-relaxed ${
                  darkMode ? "text-[#a7e6e1]" : "text-[#004d40]"
                }`}
              >
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Partners */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className={`py-24 rounded-3xl max-w-6xl mx-auto mt-20 shadow-lg text-center px-6 ${
          darkMode ? "bg-[#005f73] text-[#caf0f8]" : "bg-[#00b4d8] text-[#023047]"
        }`}
      >
        <h2 className="text-4xl font-bold mb-10">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-8 text-base font-semibold">
          {[
            "Ministry of Agriculture",
            "Bhutan Hydrology Institute",
            "Himalayan Water Trust",
            "Green Tech Partners",
          ].map((partner, i) => (
            <span
              key={i}
              className={`inline-block rounded-xl px-6 py-2 shadow-md ${
                darkMode ? "bg-[#00798c]" : "bg-white/90"
              }`}
            >
              {partner}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer
        className={`text-center py-6 text-sm mt-24 ${
          darkMode
            ? "bg-[#002f2f] text-[#a7e6e1]"
            : "bg-[#52b0cf] text-[#023047]"
        }`}
      >
        © {new Date().getFullYear()} Druk Water Authority. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
