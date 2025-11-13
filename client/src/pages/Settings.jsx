import { useEffect, useState } from 'react';
import api from '../lib/api'; // <-- Use our central API module
import { Save, Building } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  // Use state for each field + the file
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [currentLogoUrl, setCurrentLogoUrl] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // Use the correct public route
      const response = await api.get('/public/organization');
      setOrgName(response.data.orgName || '');
      setDescription(response.data.description || '');
      setCurrentLogoUrl(response.data.logoUrl || '');
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

    // We MUST use FormData to send files
    const formData = new FormData();
    formData.append('orgName', orgName);
    formData.append('description', description);
    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      // Use the correct admin route and send FormData
      const res = await api.put('/admin/organization', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the preview with the new URL
      setCurrentLogoUrl(res.data.logoUrl);
      setLogoFile(null); // Clear the file input
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10" data-testid="settings-page">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8" data-testid="settings-title">Organization Settings</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64" data-testid="settings-loading">
            <div className="text-[#00E6C3] text-xl">Loading settings...</div>
          </div>
        ) : (
          <div className="glass-strong rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="organization_name" className="block text-sm font-medium mb-2">
                  Organization Name *
                </label>
                <input
                  id="organization_name"
                  type="text"
                  name="organization_name"
                  value={orgName} // <-- Use orgName state
                  onChange={(e) => setOrgName(e.target.value)} // <-- Update orgName
                  className="w-full"
                  required
                  data-testid="settings-org-name-input"
                />
              </div>

              <div>
                <label htmlFor="logo_upload" className="block text-sm font-medium mb-2">
                  Upload New Logo
                </label>
                <input
                  id="logo_upload"
                  type="file" // <-- This is the file upload
                  name="logo_upload"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="w-full file:font-semibold file:bg-opacity-20 file:bg-[#00E6C3] file:text-[#00E6C3] file:border-0 file:px-4 file:py-2 file:rounded-lg file:mr-4 hover:file:bg-opacity-30"
                  data-testid="settings-logo-upload-input"
                />
                {/* Logo Preview */}
                {currentLogoUrl && (
                  <div className="mt-4 flex items-center space-x-4">
                    <span className="text-sm text-[#C7C9D3]">Current Logo:</span>
                    <img
                      // Use the full server URL for the preview
                      src={`http://localhost:5001${currentLogoUrl}?${new Date().getTime()}`}
                      alt="Logo preview"
                      className="w-16 h-16 object-contain rounded-lg border border-gray-700"
                      data-testid="settings-logo-preview"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description} // <-- Use description state
                  onChange={(e) => setDescription(e.target.value)} // <-- Update description
                  className="w-full"
                  rows={4}
                  placeholder="Enter organization description"
                  data-testid="settings-description-input"
                />
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 bg-[#00E6C3] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[#00BFA0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="settings-save-btn"
                >
                  <Save size={20} />
                  <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>
            </form>

            {/* Info box from your new UI */}
            <div className="mt-8 p-6 rounded-xl border border-gray-700" data-testid="settings-info">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#00E6C3] bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building size={24} className="text-[#00E6C3]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Organization Information</h3>
                  <p className="text-sm text-[#C7C9D3] leading-relaxed">
                    Update your organization's name, logo, and description. These details will be displayed across the platform and help personalize your workspace.
                  </p>
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