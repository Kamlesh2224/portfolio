import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navigation({ closeMenu }) {
  const [hovered, setHovered] = useState(null);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Work", id: "experiences" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          offset: -80,
          duration: 1.5,
          immediate: false,
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (closeMenu) closeMenu();
  };

  return (
    <ul className="relative flex flex-col items-center gap-2 sm:flex-row sm:gap-2">
      {navLinks.map((link) => (
        <li
          key={link.id}
          className="relative px-5 py-2"
          onMouseEnter={() => setHovered(link.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <button
            onClick={() => scrollToSection(link.id)}
            className={`relative z-10 text-lg font-bold transition-colors duration-300 ${
              hovered === link.id ? "text-white" : "text-neutral-300"
            }`}
          >
            {link.name}
          </button>

          {hovered === link.id && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 z-0 bg-white/15 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 20;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center p-6 transition-all duration-500">
      <motion.div
        layout
        initial={false}
        animate={{
          width: scrolled ? "fit-content" : "100%",
          maxWidth: scrolled ? "600px" : "1200px",
          backgroundColor: scrolled
            ? "rgba(10, 10, 12, 0.9)"
            : "rgba(10, 10, 12, 0.85)",
          borderRadius: scrolled ? "100px" : "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex items-center justify-between px-8 py-4 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-black text-white tracking-tighter whitespace-nowrap"
        >
          <span className="text-sand">K</span>
          {!scrolled && <span className="hidden md:inline">AMLESH</span>}
          &nbsp;
          <span className="text-sand">B</span>
          {!scrolled && <span className="hidden md:inline">EHERA</span>}
        </button>

        <nav className="hidden sm:block">
          <Navigation />
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex p-2 text-white sm:hidden"
        >
          <img
            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
            className="w-6 h-6"
            alt="toggle"
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-[#0a0a0c] border border-white/10 rounded-[2rem] p-8 sm:hidden shadow-2xl backdrop-blur-3xl"
          >
            <Navigation closeMenu={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
