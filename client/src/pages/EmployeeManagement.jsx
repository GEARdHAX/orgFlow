import { useEffect, useState } from 'react';
import api from '../lib/api'; // <-- Use central api module
import { Pencil, Trash2, UserPlus, X } from 'lucide-react';
import { toast } from 'sonner'; // <-- Use sonner

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    reportsTo: '',
    photoUrl: '',
    email: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // Use correct api module and route
      const response = await api.get('/admin/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentEmployee(null);
    setFormData({
      name: '',
      role: '',
      department: '',
      reportsTo: '',
      photoUrl: '',
      email: '',
    });
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setEditMode(true);
    setCurrentEmployee(employee);
    setFormData({
      name: employee.name,
      role: employee.role,
      department: employee.department,
      reportsTo: employee.reportsTo || '',
      photoUrl: employee.photoUrl || '',
      email: employee.email || '', // Handle new email field
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure 'reportsTo' is null if empty, not an empty string
    const dataToSubmit = {
      ...formData,
      reportsTo: formData.reportsTo || null,
    };

    try {
      if (editMode) {
        // Use correct route and employee _id
        await api.put(`/admin/employee/${currentEmployee._id}`, dataToSubmit);
        toast.success('Employee updated successfully');
      } else {
        // Use correct route
        await api.post('/admin/employee', dataToSubmit);
        toast.success('Employee added successfully');
      }
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Failed to save employee');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        // Use correct route and _id
        await api.delete(`/admin/employee/${id}`);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error('Failed to delete employee');
      }
    }
  };
  
  // Helper to find manager's name from their ID
  const getManagerName = (managerId) => {
    if (!managerId) return 'N/A';
    const manager = employees.find(e => e._id === managerId);
    return manager ? manager.name : 'N/A';
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10" data-testid="employee-management">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold" data-testid="employee-management-title">Employee Management</h1>
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 bg-[#00E6C3] text-black font-semibold px-6 py-3 rounded-xl hover:bg-[#00BFA0] transition-all"
            data-testid="add-employee-btn"
          >
            <UserPlus size={20} />
            <span>Add Employee</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64" data-testid="employees-loading">
            <div className="text-[#00E6C3] text-xl">Loading employees...</div>
          </div>
        ) : (
          <div className="glass-strong rounded-2xl overflow-hidden" data-testid="employees-table">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-left p-4 font-semibold">Role</th>
                    <th className="text-left p-4 font-semibold">Department</th>
                    <th className="text-left p-4 font-semibold">Reports To</th>
                    <th className="text-left p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id} className="border-b border-gray-800 hover:bg-[#00E6C3] hover:bg-opacity-5" data-testid={`employee-row-${emp._id}`}>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={emp.photoUrl || '/uploads/default-avatar.png'} // Fallback image
                            alt={emp.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-medium" data-testid={`employee-name-${emp._id}`}>{emp.name}</span>
                        </div>
                      </td>
                      <td className="p-4" data-testid={`employee-role-${emp._id}`}>{emp.role}</td>
                      <td className="p-4" data-testid={`employee-department-${emp._id}`}>{emp.department}</td>
                      <td className="p-4" data-testid={`employee-reports-to-${emp._id}`}>
                        {getManagerName(emp.reportsTo)} {/* Correctly show name */}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(emp)}
                            className="p-2 rounded-lg bg-[#00E6C3] bg-opacity-20 hover:bg-opacity-30 text-[#00E6C3] transition-all"
                            data-testid={`edit-employee-${emp._id}`}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp._id, emp.name)}
                            className="p-2 rounded-lg bg-red-500 bg-opacity-20 hover:bg-opacity-30 text-red-400 transition-all"
                            data-testid={`delete-employee-${emp._id}`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
          onClick={() => setShowModal(false)}
          data-testid="employee-modal-overlay"
        >
          <div
            className="glass-strong rounded-2xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            data-testid="employee-modal"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
              data-testid="modal-close-btn"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6" data-testid="modal-title">
              {editMode ? 'Edit Employee' : 'Add Employee'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full" // Using your global style
                  required
                  data-testid="form-name-input"
                />
              </div>

              {/* Role Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  data-testid="form-role-input"
                />
              </div>

              {/* Department Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Department *</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  data-testid="form-department-input"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                  data-testid="form-email-input"
                />
              </div>

              {/* Reports To Dropdown (Merged) */}
              <div>
                <label className="block text-sm font-medium mb-2">Reports To</label>
                <select 
                  name="reportsTo"
                  value={formData.reportsTo} 
                  onChange={handleInputChange}
                  className="w-full" // Use your global style
                  data-testid="form-reports-to-input"
                >
                  <option value="">None (Top-Level Employee)</option>
                  {employees
                    .filter(emp => emp._id !== currentEmployee?._id) // Can't report to self
                    .map(emp => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name} ({emp.role})
                      </option>
                  ))}
                </select>
              </div>

              {/* Photo URL Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Photo URL</label>
                <input
                  type="text"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="https://example.com/photo.jpg"
                  data-testid="form-photo-url-input"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#00E6C3] text-black font-semibold py-3 rounded-xl hover:bg-[#00BFA0] transition-all"
                  data-testid="form-submit-btn"
                >
                  {editMode ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-400 text-white py-3 rounded-xl hover:bg-gray-800 transition-all"
                  data-testid="form-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;