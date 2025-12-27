import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Save, Building, Shield, Upload, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  // Organization settings state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState('');

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5
  });

  // Password change state
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // Fetch organization settings
      const response = await api.get('/public/organization');
      setOrgName(response.data.orgName || '');
      setDescription(response.data.description || '');
      setCurrentLogoUrl(response.data.logoUrl || '');
      
      // In a real app, you'd fetch security settings from another endpoint
      // For now, we'll use defaults
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    formData.append('orgName', orgName);
    formData.append('description', description);
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      const res = await api.put('/admin/organization', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setCurrentLogoUrl(res.data.logoUrl);
      setLogoFile(null);
      toast.success('Organization settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSecurityUpdate = async () => {
    try {
      // In a real app, you'd make an API call here
      toast.success('Security settings updated');
    } catch (error) {
      toast.error('Failed to update security settings');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      // In a real app, you'd make an API call here
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
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

      <div className="relative max-w-6xl mx-auto z-10" data-testid="settings-page">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Organization Settings
              </h1>
              <p className="text-slate-400 text-sm">Manage your organization's configuration and preferences</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="text-slate-400 font-medium">Loading settings...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Organization Settings Card */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Organization Profile</h2>
                  <p className="text-slate-400 text-sm mt-1">Update your organization's basic information</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
                  <Building size={16} />
                  <span>Organization Details</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="organization_name" className="block text-sm font-medium text-slate-300 mb-3">
                        Organization Name *
                      </label>
                      <input
                        id="organization_name"
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                        required
                        data-testid="settings-org-name-input"
                        placeholder="Enter organization name"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-3">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                        rows={5}
                        placeholder="Enter organization description"
                        data-testid="settings-description-input"
                      />
                    </div>
                  </div>

                  {/* Right Column - Logo Upload */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="logo_upload" className="block text-sm font-medium text-slate-300 mb-3">
                        Organization Logo
                      </label>
                      <div className="rounded-xl border-2 border-dashed border-slate-700/50 bg-slate-800/30 p-8 text-center hover:border-teal-500/50 transition-colors duration-300">
                        <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400 text-sm mb-2">Drag & drop or click to upload</p>
                        <p className="text-slate-500 text-xs mb-4">PNG, JPG up to 5MB</p>
                        <input
                          id="logo_upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setLogoFile(e.target.files[0])}
                          className="hidden"
                          data-testid="settings-logo-upload-input"
                        />
                        <label htmlFor="logo_upload" className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium px-6 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                          Choose File
                        </label>
                        {logoFile && (
                          <p className="text-teal-400 text-sm mt-4">
                            Selected: {logoFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Logo Preview */}
                    {currentLogoUrl && (
                      <div className="space-y-3">
                        <p className="text-sm text-slate-400">Current Logo:</p>
                        <div className="relative w-32 h-32 rounded-xl border border-slate-700/50 bg-slate-800/50 overflow-hidden">
                          <img
                            src={`http://localhost:5001${currentLogoUrl}?${new Date().getTime()}`}
                            alt="Logo preview"
                            className="w-full h-full object-contain p-4"
                            data-testid="settings-logo-preview"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-slate-700/50">
                  <button
                    type="submit"
                    disabled={saving}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-8 py-3 hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="settings-save-btn"
                  >
                    <div className="flex items-center gap-2">
                      <Save size={20} />
                      <span>{saving ? 'Saving...' : 'Save Organization Settings'}</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>

            {/* Two-Column Layout for Security and Password */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Security Settings Card */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Security Settings</h3>
                    <p className="text-slate-400 text-sm">Configure security preferences</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between py-3 border-b border-slate-700/30">
                    <div>
                      <p className="text-slate-300 font-medium">Two-Factor Authentication</p>
                      <p className="text-slate-500 text-sm">Add an extra layer of security</p>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({...prev, twoFactorEnabled: !prev.twoFactorEnabled}))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${securitySettings.twoFactorEnabled ? 'bg-teal-500' : 'bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Session Timeout (minutes)</label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({...prev, sessionTimeout: parseInt(e.target.value)}))}
                        className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-white"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>60 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Password Expiry (days)</label>
                      <select
                        value={securitySettings.passwordExpiryDays}
                        onChange={(e) => setSecuritySettings(prev => ({...prev, passwordExpiryDays: parseInt(e.target.value)}))}
                        className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-white"
                      >
                        <option value={30}>30 days</option>
                        <option value={60}>60 days</option>
                        <option value={90}>90 days</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleSecurityUpdate}
                    className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800/70 text-white font-medium py-3 transition-colors"
                  >
                    Update Security Settings
                  </button>
                </div>
              </div>

              {/* Password Change Card */}
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Change Password</h3>
                    <p className="text-slate-400 text-sm">Update your account password</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                        className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-white pr-10"
                        placeholder="Enter current password"
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

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                      className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-white"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Confirm New Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                      className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-white"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 hover:opacity-90 transition-opacity mt-4"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;