import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api'; // <-- Use our central API module
import { Users, Building, Activity, UserPlus, Settings as SettingsIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_employees: 0,
    total_departments: 0,
    recent_updates: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use the 'api' module and the correct protected route
      const response = await api.get('/admin/stats'); 
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  return (
    // The fixed navbar is h-16 (64px). We add padding-top to offset it.
    // pt-20 (80px) = 64px navbar + 16px padding
    <div className="min-h-screen pt-20 px-4 pb-10" data-testid="admin-dashboard">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8" data-testid="dashboard-title">Admin Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64" data-testid="dashboard-loading">
            {/* You can replace this with a spinner component if you have one */}
            <div className="text-[#00E6C3] text-xl">Loading dashboard...</div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" data-testid="dashboard-stats">
              <div className="glass-strong rounded-2xl p-6 card-hover glow-hover" data-testid="stat-total-employees">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#00E6C3] bg-opacity-20 rounded-full flex items-center justify-center">
                    <Users size={28} className="text-[#00E6C3]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{stats.total_employees}</h3>
                    <p className="text-[#C7C9D3] text-sm">Total Employees</p>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 card-hover glow-hover" data-testid="stat-departments">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#00E6C3] bg-opacity-20 rounded-full flex items-center justify-center">
                    <Building size={28} className="text-[#00E6C3]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{stats.total_departments}</h3>
                    <p className="text-[#C7C9D3] text-sm">Departments</p>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-2xl p-6 card-hover glow-hover" data-testid="stat-recent-updates">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-[#00E6C3] bg-opacity-20 rounded-full flex items-center justify-center">
                    <Activity size={28} className="text-[#00E6C3]" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{stats.recent_updates}</h3>
                    <p className="text-[#C7C9D3] text-sm">Recent Updates (24h)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-strong rounded-2xl p-8" data-testid="quick-actions">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/admin/employees"
                  className="flex items-center space-x-4 p-4 rounded-xl border border-gray-700 hover:border-[#00E6C3] hover:bg-[#00E6C3] hover:bg-opacity-10 transition-all group"
                  data-testid="action-add-employee"
                >
                  <div className="w-12 h-12 bg-[#00E6C3] bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30">
                    <UserPlus size={24} className="text-[#00E6C3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Employees</h3>
                    <p className="text-sm text-[#C7C9D3]">Add, edit, or remove records</p>
                  </div>
                </Link>

                <Link
                  to="/admin/settings"
                  className="flex items-center space-x-4 p-4 rounded-xl border border-gray-700 hover:border-[#00E6C3] hover:bg-[#00E6C3] hover:bg-opacity-10 transition-all group"
                  data-testid="action-settings"
                >
                  <div className="w-12 h-12 bg-[#00E6C3] bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30">
                    <SettingsIcon size={24} className="text-[#00E6C3]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Settings</h3>
                    <p className="text-sm text-[#C7C9D3]">Manage organization settings</p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;