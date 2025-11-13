import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useAuthStore } from './lib/authStore'; // <-- Import the store
import { Toaster } from 'sonner';
// Layout
import Navbar from './components/Navbar'; // <-- Your new Navbar
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Hierarchy from './pages/Hierarchy';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Settings from './pages/Settings';

function App() {
  // Get user state and logout function from the store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="App">
      {/* Pass the user and logout function as props */}
      <Navbar user={user} onLogout={logout} />
      <Toaster richColors position="top-right" />
      
      {/* Add pt-16 to offset the fixed navbar (h-16) */}
      <main className="container mx-auto p-4 pt-20"> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hierarchy" element={<Hierarchy />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
          
          {/* 404 Not Found (Optional) */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;