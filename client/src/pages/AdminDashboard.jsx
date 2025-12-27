import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import {
  Users,
  Building2,
  Activity,
  UserPlus,
  Settings,
  Clock,
  ArrowRight,
  Shield
} from "lucide-react";

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
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 md:px-8 lg:px-10 pb-10">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10" data-testid="admin-dashboard">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-400 text-sm">Welcome back! Here's your overview</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="text-slate-400 font-medium">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid - Improved responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <StatCard
                icon={<Users size={22} className="sm:size-6" />}
                value={stats.total_employees}
                label="Total Employees"
                color="from-teal-500 to-cyan-500"
              />
              <StatCard
                icon={<Building2 size={22} className="sm:size-6" />}
                value={stats.total_departments}
                label="Departments"
                color="from-blue-500 to-indigo-500"
              />
              <StatCard
                icon={<Activity size={22} className="sm:size-6" />}
                value={stats.recent_updates}
                label="Recent Updates (24h)"
                color="from-purple-500 to-pink-500"
              />
              <StatCard
                icon={<Users size={22} className="sm:size-6" />}
                value={stats.total_employees}
                label="Accounts"
                color="from-amber-500 to-orange-500"
              />
            </div>

            {/* Quick Actions - Improved responsiveness */}
            <div className="rounded-xl md:rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl md:text-2xl font-bold text-white">Quick Actions</h2>
                  <p className="text-slate-400 text-sm mt-1">Manage your organization efficiently</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Clock size={14} className="md:size-4" />
                  <span className="text-xs md:text-sm">Last updated: just now</span>
                </div>
              </div>

              {/* Action Cards - Responsive layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <ActionCard
                  to="/admin/employees"
                  icon={<UserPlus size={18} className="md:size-5" />}
                  title="Manage Employees"
                  description="Add, edit, or remove employee records"
                  color="from-teal-500 to-cyan-500"
                />

                <ActionCard
                  to="/admin/settings"
                  icon={<Settings size={18} className="md:size-5" />}
                  title="Settings"
                  description="Configure system preferences"
                  color="from-purple-500 to-pink-500"
                />
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="rounded-xl md:rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <Activity className="text-white md:size-5" size={16} />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Recent Activity</h2>
                    <p className="text-slate-400 text-sm">Latest updates and system activities</p>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  <Clock size={14} className="inline mr-2 md:size-4" />
                  <span className="text-xs md:text-sm">Today</span>
                </div>
              </div>
              
              {/* Activity Items - Responsive layout */}
              <div className="space-y-4 md:space-y-6">
                {stats.recent_updates === 0 ? (
                  <div className="py-8 md:py-12 text-center">
                    <Activity className="w-8 h-8 md:w-12 md:h-12 text-slate-600 mx-auto mb-3 md:mb-4" />
                    <h3 className="text-base md:text-lg text-slate-400 mb-2">No Recent Activity</h3>
                    <p className="text-sm text-slate-500">Activity will appear here when updates occur</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <ActivityItem
                      icon={<UserPlus size={14} className="md:size-5" />}
                      title="Employee Updates"
                      text={`${stats.recent_updates} updates in the last 24 hours`}
                      time="Various activities"
                      color="bg-gradient-to-br from-teal-500 to-cyan-500"
                    />
                    <ActivityItem
                      icon={<Building2 size={14} className="md:size-5" />}
                      title="Department Changes"
                      text="Organization structure updates"
                      time="System maintenance"
                      color="bg-gradient-to-br from-blue-500 to-indigo-500"
                    />
                    <ActivityItem
                      icon={<Settings size={14} className="md:size-5" />}
                      title="System Configuration"
                      text="Settings and preferences updated"
                      time="Admin activity"
                      color="bg-gradient-to-br from-purple-500 to-pink-500"
                    />
                    <ActivityItem
                      icon={<Shield size={14} className="md:size-5" />}
                      title="Security Logs"
                      text="Access and permission changes"
                      time="Security audit"
                      color="bg-gradient-to-br from-amber-500 to-orange-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ---------------- Components ---------------- */

const StatCard = ({ icon, value, label, color }) => (
  <div className="rounded-lg md:rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 md:p-6">
    <div className="flex items-center gap-4 md:gap-6">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-xs md:text-sm text-slate-400">{label}</p>
      </div>
    </div>
  </div>
);

const ActionCard = ({ to, icon, title, description, color }) => (
  <Link
    to={to}
    className="group relative overflow-hidden rounded-lg md:rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 lg:p-8 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
      <p className="text-sm text-slate-400 mb-4 md:mb-6 flex-grow">{description}</p>
      <div className="flex items-center gap-2 text-teal-400 text-xs md:text-sm font-medium group-hover:gap-3 transition-all duration-300">
        <span>Access Feature</span>
        <ArrowRight size={14} className="md:size-5 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </div>
    
    {/* Hover gradient effect */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
  </Link>
);

const ActivityItem = ({ icon, title, text, time, color }) => (
  <div className="rounded-lg md:rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-4 md:p-6 hover:border-slate-600/50 transition-all duration-300">
    <div className="flex items-start gap-3 md:gap-4">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${color} flex items-center justify-center text-white flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-base md:text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-xs md:text-sm text-slate-300 mb-2">{text}</p>
        <p className="text-xs text-slate-500">{time}</p>
      </div>
    </div>
  </div>
);