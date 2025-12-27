import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useAuthStore } from './lib/authStore';
import { Toaster } from 'sonner';

// Layout
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute'; // <--- Import this

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Hierarchy from './pages/Hierarchy';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Settings from './pages/Settings';

function App() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="App">
      <Navbar user={user} onLogout={logout} />
      <Toaster richColors position="top-right" />
      
      <main className="container mx-auto p-4 pt-20"> 
        <Routes>
          {/* Public Routes (Accessible by anyone) */}
          <Route path="/" element={<Home />} />
          <Route path="/hierarchy" element={<Hierarchy />} />

          {/* Guest Only Routes (Logged in users cannot see these) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Admin Routes (Only logged in users can see these) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;