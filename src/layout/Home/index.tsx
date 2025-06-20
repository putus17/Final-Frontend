import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { Droplet, Zap, Wifi, CheckCircle2 } from "lucide-react";

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
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-b from-[#001f24] via-[#003633] to-[#004d40] text-[#a7e6e1]"
          : "bg-gradient-to-b from-[#86C5D9] via-[#4DA0AE] to-[#00798C] text-[#05386B]"
      } px-6`}
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
              <Droplet className="w-10 h-10 text-[#00a8cc]" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-extrabold text-[#023047] dark:text-[#a3cef1]">
                Druk Water Authority System (DWAS)
              </h1>
              <p className="text-sm font-medium text-[#0077b6] dark:text-[#48cae4]">
                National Water Intelligence for Bhutan
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 15, -15, 15, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Zap className="w-5 h-5 text-[#00b4d8]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Wifi className="w-5 h-5 text-[#00b4d8]" />
            </motion.div>
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
          className="mt-8 flex justify-end space-x-10 text-lg font-semibold
          text-[#023047] dark:text-[#caf0f8]"
        >
          {navItems.map(({ name, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded hover:bg-[#0096c7] hover:text-white transition ${
                  isActive
                    ? "text-[#00b4d8] dark:text-[#caf0f8] font-bold after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-[#00b4d8] after:rounded"
                    : "text-[#023047] dark:text-[#90e0ef]"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-28 bg-gradient-to-tr from-[#0096c7] via-[#00b4d8] to-[#48cae4] text-white text-center px-6 rounded-3xl shadow-lg max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-5 animate-pulse">
          Wisdom Flows with Every Drop
        </h1>
        <p className="text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Ensuring clean, intelligent, and equitable water access for every citizen. Powered by
          data, driven by compassion.
        </p>
        <Link to="/dashboard">
          <Button className="bg-[#caf0f8] text-[#023047] px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#ade8f4] transition">
            Go to Dashboard 🚀
          </Button>
        </Link>
      </section>

      {/* About Us */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-24 bg-[#90e0ef] dark:bg-[#012f33] text-center px-6 rounded-3xl max-w-5xl mx-auto mt-16 shadow-md"
      >
        <h2 className="text-4xl font-bold text-[#0077b6] dark:text-[#caf0f8] mb-5">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto text-[#0077b6] dark:text-[#caf0f8] leading-relaxed">
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
          className="bg-[#48cae4] dark:bg-[#005f73] p-10 rounded-2xl shadow-lg"
        >
          <h3 className="text-3xl font-bold text-[#023047] dark:text-[#caf0f8] mb-4">Our Mission</h3>
          <p className="text-[#023047] dark:text-[#caf0f8] leading-relaxed">
            Empowering Bhutan through resilient water systems and community-focused solutions.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#90e0ef] dark:bg-[#00798c] p-10 rounded-2xl shadow-lg"
        >
          <h3 className="text-3xl font-bold text-[#023047] dark:text-[#caf0f8] mb-4">Our Vision</h3>
          <p className="text-[#023047] dark:text-[#caf0f8] leading-relaxed">
            A water-secure Bhutan where innovation and tradition work in harmony.
          </p>
        </motion.div>
      </section>

      {/* Services */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="py-24 bg-[#90e0ef] dark:bg-[#023047] text-center px-6 rounded-3xl max-w-7xl mx-auto mt-16 shadow-lg"
      >
        <h2 className="text-4xl font-bold text-[#0077b6] dark:text-[#caf0f8] mb-12">What We Do</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">
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
              className="p-6 bg-white/90 dark:bg-[#004d40] rounded-2xl shadow text-[#023047] dark:text-[#caf0f8]"
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
        className="py-24 px-8 bg-gradient-to-b from-[#00798c] via-[#004d40] to-[#013440] relative overflow-hidden rounded-3xl max-w-5xl mx-auto mt-16 shadow-lg"
      >
        {/* Decorative wave background */}
        <svg
          className="absolute top-0 left-0 w-full h-36 opacity-30"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#004d40"
            fillOpacity="0.4"
            d="M0,128L48,160C96,192,192,256,288,261.3C384,267,480,213,576,165.3C672,117,768,75,864,64C960,53,1056,75,1152,90.7C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>

        <h2 className="text-4xl font-extrabold text-white mb-14 drop-shadow-lg text-center">
          Latest Initiatives
        </h2>

        <div className="grid sm:grid-cols-2 gap-10 relative z-10">
          {initiatives.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.06 }}
              className="flex items-start space-x-5 bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg cursor-pointer transition-shadow duration-300"
            >
              <CheckCircle2 className="w-9 h-9 text-[#48cae4]" />
              <p className="text-[#004d40] dark:text-[#a7e6e1] font-semibold text-lg leading-relaxed">
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
        className="py-24 bg-[#00b4d8] dark:bg-[#005f73] text-center rounded-3xl max-w-6xl mx-auto mt-20 shadow-lg"
      >
        <h2 className="text-4xl font-bold text-[#023047] dark:text-[#caf0f8] mb-10">Our Partners</h2>
        <div className="flex flex-wrap justify-center gap-8 text-base font-semibold text-[#023047] dark:text-[#caf0f8]">
          <span className="inline-block rounded-xl px-6 py-2 bg-white/90 dark:bg-[#00798c] shadow-md">
            Ministry of Agriculture
          </span>
          <span className="inline-block rounded-xl px-6 py-2 bg-white/90 dark:bg-[#00798c] shadow-md">
            Bhutan Hydrology Institute
          </span>
          <span className="inline-block rounded-xl px-6 py-2 bg-white/90 dark:bg-[#00798c] shadow-md">
            Himalayan Water Trust
          </span>
          <span className="inline-block rounded-xl px-6 py-2 bg-white/90 dark:bg-[#00798c] shadow-md">
            Green Tech Partners
          </span>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#52b0cf] dark:bg-[#002f2f] text-center py-6 text-sm text-[#023047] dark:text-[#a7e6e1] mt-24">
        © {new Date().getFullYear()} Druk Water Authority. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
