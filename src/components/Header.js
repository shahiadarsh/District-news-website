import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Blocks from "./Block";
const Header = ({ isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);
  const blocks = ["All", ...Blocks];

  const navItems = blocks.map((block) => {
    return {
      name: block,
      path: block === "All" ? "/" : `/${block}`,
    };
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Make the API request to log out
      const response = await api.post(
        "/admin/logout",
        {},
        { withCredentials: true }
      );

      // If successful, update the admin status
      if (response.status === 200) {
        setIsAdmin(false);
        navigate("/"); // Redirect to home page
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setError("Unable to log out. Please try again.");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
      } shadow-md transition-all duration-300`}
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold flex items-center space-x-2 text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          <img
            src="/channels4_profile.png"
            className="h-8 md:h-10 lg:h-12 w-auto rounded-full"
            alt="Siddharthnagar News Logo"
          />
          <span className="">Gorakhpur Times 24</span>
        </Link>

        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className={`mr-4 p-2 rounded-full ${
              darkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-blue-500 text-white"
            } transition-colors duration-300`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${darkMode ? "bg-gray-700" : "bg-blue-500"}`}
          >
            <ul className="container mx-auto px-4 py-2 space-y-2 ">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-4 rounded ${
                      location.pathname === item.path
                        ? darkMode
                          ? "bg-gray-600"
                          : "bg-blue-400"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {isAdmin ? (
                <>
                  <li>
                    <Link to="/catalog" className="block py-2 px-4 rounded">
                      Catalog
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/admin" className="block py-2 px-4 rounded">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
      <nav className="hidden lg:block">
        <ul className="container mx-auto px-4 py-2 flex justify-evenly space-x-4 mb-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`py-2 px-4 rounded ${
                  location.pathname === item.path
                    ? darkMode
                      ? "bg-gray-600"
                      : "bg-blue-500"
                    : "hover:bg-opacity-75"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/catalog"
                  className="py-2 px-4 rounded hover:bg-opacity-75"
                >
                  Catalog
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex text-[14px] py-1 px-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/admin"
                className="py-2 px-4 rounded hover:bg-opacity-75"
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
