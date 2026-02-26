import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-blue-700">
          Travel Planner
        </h1>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Dashboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;