import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore';
import { LogIn, Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-10">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-md mx-auto z-10" data-testid="login-page">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Shield className="text-white" size={28} />
              </div>
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 opacity-20 blur-xl"></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2">Sign in to access your admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8 shadow-2xl" data-testid="login-form-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                  data-testid="login-username-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm pl-10 pr-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-sm p-4"
                data-testid="login-error"
              >
                <div className="flex items-center gap-2 text-rose-400">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <span className="text-xs">!</span>
                  </div>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative overflow-hidden w-full rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold py-3.5 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="login-submit-btn"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">Demo Credentials</p>
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <span className="text-sm text-slate-300">Username: <span className="text-teal-400 font-medium">admin</span></span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                  <span className="text-sm text-slate-300">Password: <span className="text-cyan-400 font-medium">admin123</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Need help? Contact <span className="text-teal-400">support@orgsync.com</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 text-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-2">
              <Shield size={16} className="text-blue-400" />
            </div>
            <p className="text-xs text-slate-400">Secure Login</p>
          </div>
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 text-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-2">
              <Lock size={16} className="text-purple-400" />
            </div>
            <p className="text-xs text-slate-400">Encrypted Data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;