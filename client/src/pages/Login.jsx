import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore'; // <-- 1. Import the auth store
import { LogIn } from 'lucide-react';
// We no longer need axios here
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; (No longer needed)
// const API = `${BACKEND_URL}/api`; (No longer needed)

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // 2. Get the login function from our store
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 3. Call the login function from the store
      await login(username, password);
      
      // On success, navigate to the dashboard
      navigate('/admin/dashboard');

    } catch (err) {
      // 4. The store's function throws an error, which we catch here
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Your beautiful UI remains unchanged
    <div className="min-h-screen flex items-center justify-center px-4 pt-16" data-testid="login-page">
      <div className="max-w-md w-full">
        <div className="glass rounded-2xl p-8 shadow-2xl fade-in" data-testid="login-form-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00E6C3] bg-opacity-20 rounded-full mb-4">
              <LogIn size={32} className="text-[#00E6C3]" />
            </div>
            <h2 className="text-3xl font-bold" data-testid="login-heading">Welcome Back</h2>
            <p className="text-[#C7C9D3] mt-2">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full" // Styles from index.css
                placeholder="Enter your username"
                required
                data-testid="login-username-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full" // Styles from index.css
                placeholder="Enter your password"
                required
                data-testid="login-password-input"
              />
            </div>

            {error && (
              <div
                className="text-red-400 text-sm p-3 rounded-lg"
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                data-testid="login-error"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00E6C3] text-black font-semibold py-3 rounded-xl hover:bg-[#00BFA0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="login-submit-btn"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#C7C9D3]">
              Hint: <span className="text-[#00E6C3] font-semibold">admin / admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;