import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle =
    "px-3 py-2 rounded-lg transition";

  const activeStyle =
    "bg-white text-blue-700 font-semibold";

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          Travel Planner
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive ? activeStyle : "hover:bg-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive ? activeStyle : "hover:bg-blue-600"
              }`
            }
          >
            Dashboard
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-6 py-4 space-y-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block font-semibold text-yellow-300"
                : "block"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block font-semibold text-yellow-300"
                : "block"
            }
          >
            Dashboard
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;