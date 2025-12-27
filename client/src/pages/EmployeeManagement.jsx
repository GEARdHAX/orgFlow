import { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, X, Search, Users, Building2, Mail, User, Shield, Phone, Calendar, Download, Filter, Upload } from "lucide-react";
import api from "../lib/api";
import { toast } from "sonner";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    reportsTo: "",
    phone: "",
    photoUrl: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to load employees:", error);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.role || !formData.email) {
      toast.error("Please fill in all required fields (Name, Role, Email)");
      return;
    }

    // Create FormData to handle file upload
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("reportsTo", formData.reportsTo || "");
    
    if (formData.phone) formDataToSend.append("phone", formData.phone);
    if (formData.photoUrl) formDataToSend.append("photoUrl", formData.photoUrl);
    
    // Add photo file if selected
    if (photoFile) {
      formDataToSend.append("photo", photoFile);
    }

    try {
      if (editMode) {
        await api.put(`/admin/employee/${currentEmployee._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Employee updated successfully");
        fetchEmployees(); // Refresh the list
      } else {
        await api.post("/admin/employee", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Employee added successfully");
        fetchEmployees(); // Refresh the list
      }
      closeForm();
    } catch (error) {
      console.error("Failed to save employee:", error);
      const errorMsg = error.response?.data?.message || "Failed to save employee";
      toast.error(errorMsg);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    try {
      await api.delete(`/admin/employee/${deleteTarget._id}`);
      setEmployees(prev => prev.filter(emp => emp._id !== deleteTarget._id));
      toast.success("Employee deleted successfully");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed");
    }
  };

  const openAdd = () => {
    setEditMode(false);
    setCurrentEmployee(null);
    setPhotoFile(null);
    setFormData({
      name: "",
      role: "",
      department: "",
      email: "",
      reportsTo: "",
      phone: "",
      photoUrl: "",
    });
    setShowForm(true);
  };

  const openEdit = (emp) => {
    setEditMode(true);
    setCurrentEmployee(emp);
    setPhotoFile(null);
    setFormData({
      name: emp.name,
      role: emp.role,
      department: emp.department || "",
      email: emp.email,
      reportsTo: emp.reportsTo || "",
      phone: emp.phone || "",
      photoUrl: emp.photoUrl || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCurrentEmployee(null);
    setPhotoFile(null);
  };

  const getManagerName = (id) => {
    if (!id) return "—";
    const manager = employees.find((e) => e._id === id);
    return manager?.name || "—";
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Extract unique departments and roles from employees
  const departments = ["all", ...new Set(employees.map(e => e.department).filter(Boolean))];
  const roles = ["all", ...new Set(employees.map(e => e.role).filter(Boolean))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || emp.department === filterDept;
    const matchesRole = filterRole === "all" || emp.role === filterRole;
    return matchesSearch && matchesDept && matchesRole;
  });

  const exportEmployees = () => {
    // Export logic can be implemented here
    toast.success("Export feature coming soon");
  };

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 pb-10">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Employee Management
              </h1>
              <p className="text-slate-400 text-sm">Manage your team members and organization structure</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="text-slate-400 font-medium">Loading employees...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                icon={<Users size={26} />}
                label="Total Employees"
                value={employees.length}
                color="from-teal-500 to-cyan-500"
              />
              <StatCard
                icon={<Building2 size={26} />}
                label="Departments"
                value={new Set(employees.map(e => e.department).filter(Boolean)).size}
                color="from-blue-500 to-indigo-500"
              />
              <StatCard
                icon={<User size={26} />}
                label="Team Leads"
                value={employees.filter(e => !e.reportsTo).length}
                color="from-purple-500 to-pink-500"
              />
            </div>

            {/* Action Bar */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search employees by name, role, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setAdvancedFilters(!advancedFilters)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:border-teal-500/50 hover:text-white transition-all duration-300"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>

                  <button
                    onClick={exportEmployees}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:border-blue-500/50 hover:text-white transition-all duration-300"
                  >
                    <Download size={18} />
                    <span>Export</span>
                  </button>

                  <button
                    onClick={openAdd}
                    className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <UserPlus size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Add Employee</span>
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              {advancedFilters && (
                <div className="mt-6 pt-6 border-t border-slate-700/50 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Department</label>
                    <select
                      value={filterDept}
                      onChange={(e) => setFilterDept(e.target.value)}
                      className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>
                          {dept === "all" ? "All Departments" : dept || "Unassigned"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Role</label>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role === "all" ? "All Roles" : role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Employee Table */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm overflow-hidden shadow-2xl">
              {filteredEmployees.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Users className="w-16 h-16 text-slate-600 mb-4" />
                  <p className="text-slate-400 text-lg mb-2">No employees found</p>
                  <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
                  <button
                    onClick={openAdd}
                    className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                  >
                    Add Your First Employee
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-800/80 border-b border-slate-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold text-slate-300">Employee</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-300">Role</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-300">Department</th>
                        <th className="px6 py-4 text-left font-semibold text-slate-300">Contact</th>
                        <th className="px-6 py-4 text-left font-semibold text-slate-300">Reports To</th>
                        <th className="px-6 py-4 text-right font-semibold text-slate-300">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredEmployees.map((emp) => (
                        <tr
                          key={emp._id}
                          className="border-t border-slate-700/30 hover:bg-slate-700/20 transition-all duration-200 group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={emp.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`}
                                  className="h-12 w-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-teal-500 transition-all duration-300"
                                  alt={emp.name}
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-white">{emp.name}</p>
                                {emp.email && (
                                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                                    <Mail size={12} />
                                    <span>{emp.email}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-slate-300">{emp.role}</span>
                          </td>

                          <td className="px-6 py-4">
                            {emp.department ? (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                {emp.department}
                              </span>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              {emp.email && (
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Mail size={12} />
                                  <span>{emp.email}</span>
                                </div>
                              )}
                              {emp.phone && (
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Phone size={12} />
                                  <span>{emp.phone}</span>
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {emp.reportsTo ? (
                                <>
                                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <User size={12} className="text-blue-400" />
                                  </div>
                                  <span className="text-slate-300">{getManagerName(emp.reportsTo)}</span>
                                </>
                              ) : (
                                <span className="text-slate-500">—</span>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <ActionIcon
                                onClick={() => openEdit(emp)}
                                icon={<Pencil size={16} />}
                                tooltip="Edit"
                                color="teal"
                              />
                              <ActionIcon
                                onClick={() => setDeleteTarget(emp)}
                                icon={<Trash2 size={16} />}
                                tooltip="Delete"
                                color="red"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Summary */}
              <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/50">
                <p className="text-sm text-slate-400">
                  Showing <span className="text-white font-medium">{filteredEmployees.length}</span> of{" "}
                  <span className="text-white font-medium">{employees.length}</span> employees
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Employee Modal */}
{showForm && (
  <Overlay onClose={closeForm}>
    <div className="w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] lg:max-h-[80vh] rounded-2xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl p-4 sm:p-6 lg:p-8 overflow-y-auto shadow-2xl mx-4">
      <div className="flex items-center justify-between mb-4 sm:mb-6 top-0 bg-slate-800/95 backdrop-blur-sm pt-2 pb-4 -mt-2 z-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {editMode ? "Edit Employee" : "Add New Employee"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {editMode ? "Update employee information" : "Add a new team member to your organization"}
          </p>
        </div>
        <button
          onClick={closeForm}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 text-slate-400 hover:text-white flex-shrink-0"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Input
            label="Full Name *"
            name="name"
            icon={<User size={16} className="sm:w-4 sm:h-4" />}
            formData={formData}
            setFormData={setFormData}
            placeholder="Enter full name"
            required
          />
          
          <Input
            label="Job Role *"
            name="role"
            icon={<Building2 size={16} className="sm:w-4 sm:h-4" />}
            formData={formData}
            setFormData={setFormData}
            placeholder="e.g. Senior Developer"
            required
          />
          
          <Input
            label="Department"
            name="department"
            icon={<Building2 size={16} className="sm:w-4 sm:h-4" />}
            formData={formData}
            setFormData={setFormData}
            placeholder="e.g. Engineering"
          />
          
          <Input
            label="Email Address *"
            name="email"
            type="email"
            icon={<Mail size={16} className="sm:w-4 sm:h-4" />}
            formData={formData}
            setFormData={setFormData}
            placeholder="employee@company.com"
            required
          />

          {/* <Input
            label="Phone Number"
            name="phone"
            type="tel"
            icon={<Phone size={16} className="sm:w-4 sm:h-4" />}
            formData={formData}
            setFormData={setFormData}
            placeholder="+1 (555) 123-4567"
          /> */}

          {/* Photo Upload/URL - Full width on mobile, 2 columns on desktop */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Profile Photo
            </label>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Upload className="absolute left-4 top-1/2 -translate-y-1/2" size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-700/50 bg-slate-800/50 text-white file:mr-4 file:py-1.5 file:px-3 sm:file:py-2 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30"
                />
              </div>
              <Input
                label="Or enter photo URL"
                name="photoUrl"
                formData={formData}
                setFormData={setFormData}
                placeholder="https://example.com/photo.jpg"
                required={false}
              />
            </div>
          </div>
        </div>

        {/* Reports To Field - Full width */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Reports To
          </label>
          <select
            value={formData.reportsTo}
            onChange={(e) => setFormData({ ...formData, reportsTo: e.target.value })}
            className="w-full rounded-xl
    border border-slate-700/50
    bg-slate-800/80
    text-white
    px-4 py-2.5 sm:py-3
    text-sm sm:text-base
    focus:outline-none
    focus:ring-2 focus:ring-teal-500/50
    focus:border-transparent
    transition-all duration-300

    appearance-none
    [&>option]:bg-slate-800
    [&>option]:text-white"
          >
            <option value="">None (Top Level)</option>
            {employees
              .filter((e) => e._id !== currentEmployee?._id)
              .map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name} - {e.role}
                </option>
              ))}
          </select>
        </div>

        {/* Action Buttons - Sticky to bottom on mobile */}
        <div className="flex gap-3 pt-4 sm:pt-6 bg-slate-800/95 backdrop-blur-sm pb-4 sm:pb-0 -mb-2">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 sm:px-6 sm:py-3.5 text-sm sm:text-base text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
          >
            {editMode ? "Update Employee" : "Add Employee"}
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="flex-1 rounded-xl border border-slate-700/50 px-4 py-2.5 sm:px-6 sm:py-3.5 text-sm sm:text-base text-slate-300 hover:bg-slate-700/30 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </Overlay>
)}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Overlay onClose={() => setDeleteTarget(null)}>
          <div className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl p-8 shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mb-6 mx-auto">
              <Trash2 className="text-red-500" size={24} />
            </div>
            
            <h3 className="text-2xl font-bold text-white text-center mb-3">
              Delete Employee
            </h3>
            <p className="text-sm text-slate-400 text-center mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone and will remove all associated data.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-slate-700/50 px-6 py-3.5 text-slate-300 hover:bg-slate-700/30 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3.5 text-white font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                Delete Employee
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default EmployeeManagement;

/* ---------------- Components ---------------- */

const StatCard = ({ icon, label, value, color }) => (
  <div className={`rounded-2xl bg-gradient-to-br ${color} p-[1px] group hover:scale-105 transition-all duration-300`}>
    <div className="rounded-2xl bg-slate-800/90 backdrop-blur-sm p-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-xl text-white`}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

const Overlay = ({ children, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4 py-8"
    style={{ animation: 'fadeIn 0.2s ease-out' }}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

const ActionIcon = ({ icon, onClick, tooltip, color = "teal" }) => (
  <button
    onClick={onClick}
    title={tooltip}
    className={`
      group relative h-10 w-10 flex items-center justify-center rounded-lg border
      transition-all duration-200 hover:scale-110
      ${
        color === "red"
          ? "border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20"
          : "border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/20"
      }
    `}
  >
    {icon}
  </button>
);

const Input = ({
  label,
  name,
  formData,
  setFormData,
  type = "text",
  required = true,
  placeholder = "",
  icon = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        type={type}
        required={required}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        placeholder={placeholder}
        className={`
          w-full rounded-xl border border-slate-700/50 bg-slate-800/50
          ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3 text-white placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent
          transition-all duration-300
        `}
      />
    </div>
  </div>
);