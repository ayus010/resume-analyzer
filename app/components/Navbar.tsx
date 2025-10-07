import { useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { auth } = usePuterStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="
        navbar fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        bg-white/90 backdrop-blur-md
        rounded-full px-6 py-3 shadow-sm
        max-w-[1200px] mx-auto mt-4 sm:mt-6
      "
      style={{ insetInline: "0", marginInline: "auto" }}
    >
      {/* Logo */}
      <Link to="/">
        <p className="text-2xl font-bold text-gradient hover:scale-105 transition-transform whitespace-nowrap">
          RESUME ANALYZER
        </p>
      </Link>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        {auth.isAuthenticated ? (
          <>
            <Link
              to="/upload"
              className="primary-button w-fit hover:scale-105 transition-transform"
            >
              Upload Resume
            </Link>
            <Link
              to="/wipe"
              className="primary-button w-fit hover:scale-105 transition-transform"
            >
              Wipe Data
            </Link>
            <button
              onClick={auth.signOut}
              className="primary-button w-fit hover:scale-105 transition-transform"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={auth.signIn}
            className="primary-button w-fit hover:scale-105 transition-transform"
          >
            Sign In / Sign Up
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex items-center">
        {auth.isAuthenticated ? (
          <>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div
                className="
                  absolute top-16 right-4 w-40
                  bg-white/95 backdrop-blur-md rounded-2xl shadow-lg
                  flex flex-col items-center py-3 gap-2
                  animate-in slide-in-from-top duration-150
                "
              >
                <Link
                  to="/wipe"
                  onClick={closeMenu}
                  className="primary-button w-[80%] text-center"
                >
                  Wipe Data
                </Link>
                <button
                  onClick={() => {
                    auth.signOut();
                    closeMenu();
                  }}
                  className="primary-button w-[80%] text-center"
                >
                  Log Out
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={auth.signIn}
            className="primary-button w-fit text-sm px-4 py-2"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
