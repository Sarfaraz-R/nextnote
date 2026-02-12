import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

// 1. Reusable Component for the "Roll Up" Effect
const FlipLink = ({ children, to, className, active }) => {
  return (
    <Link
      to={to}
      className={clsx(
        "relative block overflow-hidden whitespace-nowrap text-sm font-medium transition-colors",
        className,
      )}
    >
      <motion.div
        initial="initial"
        whileHover="hovered"
        // If it's the active link, we can decide if we want it to stay "rolled up"
        // or just bold. Here I'll keep the hover interaction independent.
        className="relative"
      >
        {/* Top Text (The one that slides up and away) */}
        <motion.span
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={clsx(
            "block",
            active ? "text-black font-semibold" : "text-[#0D0D0D]",
          )}
        >
          {children}
        </motion.span>

        {/* Bottom Text (The one that slides up from the bottom) */}
        <motion.span
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 block text-gray-500" // Changed color here
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  );
};

// 2. Special Button Component for "Get Started" to apply the effect inside a button
const FlipButton = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="group relative px-4 py-2 rounded-lg bg-[#0D0D0D] text-white overflow-hidden flex items-center justify-center"
    >
      <motion.div
        initial="initial"
        whileHover="hovered"
        className="relative block overflow-hidden"
      >
        <motion.span
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="block"
        >
          {children}
        </motion.span>
        <motion.span
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute inset-0 block text-gray-300" // Lighter gray for contrast on black
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  const navItems = [
    { name: "Features", path: "/#features" },
    { name: "How it Works", path: "/#how-it-works" },
    { name: "Templates", path: "/#templates" },
    { name: "Pricing", path: "/pricing" },
    { name: "Docs", path: "/docs" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 
                 bg-[#F9F9F9]/80 
                 backdrop-blur-md 
                 border-b border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Nextnote Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="text-lg font-semibold tracking-tight text-[#0D0D0D]">
            Nextnote
          </span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <FlipLink
              key={item.name}
              to={item.path}
              active={currentPath === item.path}
            >
              {item.name}
            </FlipLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {/* Sign In - Using the FlipLink logic but mostly keeping it simple */}
          <FlipLink to="/auth/login">Sign In</FlipLink>

          {/* Get Started - Using the special Button version */}
          <FlipButton to="/auth/register">Get Started</FlipButton>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#0D0D0D]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#F9F9F9] border-b border-[#E5E5E5] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#0D0D0D]"
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-[#E5E5E5]" />
              <Link
                to="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-[#0D0D0D]"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-[#0D0D0D] text-white text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
