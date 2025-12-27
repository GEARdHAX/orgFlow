import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserRoundPlus, Home, GitBranch, LayoutDashboard, LogOut, LogIn, Menu, X, Shield } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Home", icon: <Home size={18} />, testId: "nav-home" },
    { to: "/hierarchy", label: "Hierarchy", icon: <GitBranch size={18} />, testId: "nav-hierarchy" },
    { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, testId: "nav-dashboard" },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 border-b border-slate-700/50 bg-slate-900/40 backdrop-blur-xl"
      style={{ 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Animated border effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="relative flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 md:space-x-3 group"
            data-testid="nav-logo"
            onMouseEnter={() => setHoveredItem('logo')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Shield className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 ${hoveredItem === 'logo' ? 'opacity-30' : ''}`}></div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                OrgSync
              </h1>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </Link>

          {/* Center: Desktop Navigation - Hidden on mobile, visible on lg+ */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 ${
                  hoveredItem === item.label ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
                data-testid={item.testId}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`transition-transform duration-300 ${hoveredItem === item.label ? 'scale-110' : ''}`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm md:text-base">{item.label}</span>
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoveredItem === item.label ? 'opacity-100' : ''}`}></div>
                <div className={`absolute bottom-0 left-3 right-3 md:left-4 md:right-4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoveredItem === item.label ? 'opacity-100' : ''}`}></div>
              </Link>
            ))}
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">

            {user ? (
              <>
                {/* Add User Button - Hidden on sm, visible on md+ */}
                <Link
                  to="/admin/employees"
                  className="hidden md:flex relative group"
                  data-testid="nav-add-user-btn"
                  onMouseEnter={() => setHoveredItem('add-user')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                  <div className="relative rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-2 md:p-3 text-white hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 group-hover:scale-105">
                    <UserRoundPlus className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </Link>

                {/* User Info - Hidden on sm, visible on md+ */}
                <div className="hidden md:flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <span className="hidden lg:inline text-sm text-slate-300">{user.name || 'Admin'}</span>
                </div>

                {/* Logout Button - Hidden on sm, visible on md+ */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex relative cursor-pointer group items-center"
                  data-testid="nav-logout-btn"
                  onMouseEnter={() => setHoveredItem('logout')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                  <div className="relative flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-3 py-2 hover:border-rose-500/50 hover:bg-slate-800/70 transition-all duration-300 group-hover:scale-105">
                    <LogOut className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
                    <span className="hidden xl:inline text-sm text-slate-300 font-medium">Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex relative overflow-hidden group items-center"
                data-testid="nav-login-btn"
                onMouseEnter={() => setHoveredItem('login')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                <div className="relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-3 py-2 md:px-4 md:py-2.5 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 group-hover:scale-105">
                  <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Login</span>
                </div>
              </Link>
            )}

            {/* Mobile Menu Toggle - Visible on all, hidden on lg+ */}
            <button
              className="lg:hidden relative overflow-hidden p-2 rounded-lg border border-slate-700/50 bg-slate-800/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              <div className="relative z-10 text-slate-300">
                {mobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu - Visible on lg- */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t border-slate-700/50 backdrop-blur-xl bg-slate-900/95"
          data-testid="mobile-menu"
          style={{ 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.92) 100%)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Mobile menu animated border */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 group"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-${item.testId}`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium text-sm md:text-base">{item.label}</span>
              </Link>
            ))}

            {/* Mobile User Section */}
            {user ? (
              <>
                {/* Mobile User Info */}
                <div className="px-4 py-3 mt-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">{user.name || 'Admin'}</p>
                      <p className="text-xs text-slate-500">Administrator</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Add User Button */}
                <Link
                  to="/admin/employees"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-nav-add-user"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <UserRoundPlus className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-sm md:text-base">Add New Employee</span>
                </Link>

                {/* Mobile Logout Button */}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-slate-700/50 text-rose-400 font-medium hover:bg-slate-800/50 transition-all duration-300"
                  data-testid="mobile-nav-logout"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="text-sm md:text-base">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-login"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-sm md:text-base">Login to Account</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;