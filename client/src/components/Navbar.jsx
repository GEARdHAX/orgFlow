import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserRoundPlus } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-gray-800"
      style={{ background: "rgba(10, 15, 31, 0.8)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="relative flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            data-testid="nav-logo"
          >
            <span className="text-xl font-bold text-[#00E6C3]">demo</span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              to="/"
              className="text-white hover:text-[#00E6C3] transition-colors font-medium"
              data-testid="nav-home"
            >
              Home
            </Link>

            <Link
              to="/hierarchy"
              className="text-white hover:text-[#00E6C3] transition-colors font-medium"
              data-testid="nav-hierarchy"
            >
              Hierarchy
            </Link>

            <Link
              to="/admin/dashboard"
              className="text-white hover:text-[#00E6C3] transition-colors font-medium"
              data-testid="nav-dashboard"
            >
              Dashboard
            </Link>
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-4">

            {user ? (
              <>
                {/* Rounded Add User Button */}
                <Link
                  to="/admin/employees"
                  className="hidden md:flex bg-[#00E6C3] text-black p-2.5 rounded-full hover:bg-[#00BFA0] transition-all"
                  data-testid="nav-add-user-btn"
                >
                  <UserRoundPlus size={20} />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hidden md:block border border-gray-400 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all"
                  data-testid="nav-logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:block border border-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-all font-medium"
                data-testid="nav-login-btn"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t border-gray-800 backdrop-blur-md bg-[#0a0f1f]/90"
          data-testid="mobile-menu"
        >
          <div className="px-4 py-4 space-y-3">
            
            <Link
              to="/"
              className="block text-white hover:text-[#00E6C3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-home"
            >
              Home
            </Link>

            <Link
              to="/hierarchy"
              className="block text-white hover:text-[#00E6C3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-hierarchy"
            >
              Hierarchy
            </Link>

            <Link
              to="/admin/dashboard"
              className="block text-white hover:text-[#00E6C3] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              data-testid="mobile-nav-dashboard"
            >
              Dashboard
            </Link>

            {user ? (
              <>
                {/* Mobile Rounded Add User */}
                <Link
                  to="/admin/employees"
                  className="flex items-center space-x-2 text-[#00E6C3] font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-add-user"
                >
                  <div className="bg-[#00E6C3] text-black p-2 rounded-full flex gap-2">
                    <UserRoundPlus size={20} />
                    <span>Add User</span>
                  </div>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-white"
                  data-testid="mobile-nav-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-white"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-login"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
