import { useEffect, useRef, useState } from 'react';
import api from '../lib/api'; // Use our central API module
import $ from "jquery";
// Point directly to the minified JS file
import "orgchart/dist/js/jquery.orgchart.min.js"; 
import "orgchart/dist/css/jquery.orgchart.css";
import { X } from "lucide-react";

const Hierarchy = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchHierarchy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHierarchy = async () => {
    setLoading(true);
    try {
      const response = await api.get('/public/hierarchy');
      const nestedTree = response.data;

      const mapNode = (node) => ({
        name: node.name,
        title: node.role,
        _fullData: node, 
        children: node.children.map(mapNode),
      });
      
      const chartDataRoots = nestedTree.map(mapNode);

      const rootData = {
        name: 'Organization',
        title: 'Top Level',
        className: 'invisible-root-node',
        _fullData: { name: 'Organization', role: 'Root', email: '', department: '' },
        children: chartDataRoots,
      };

      renderChart(rootData);
    
    } catch (error) {
      console.error('Error fetching hierarchy:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (data) => {
    if (chartRef.current) {
      chartRef.current.innerHTML = '';
      $(chartRef.current).orgchart({
        'data': data,
        'nodeContent': 'title',
        'direction': 't2b',
        'pan': true,
        'zoom': true,
        'verticalLevel': 4,
        'depth': 999,
        'createNode': function(node, data) {
          node.on('click', function(event) {
            if (!event.isPropagationStopped()) {
              if (data && data._fullData) {
                if (!$(this).is('.invisible-root-node')) {
                  setSelectedEmployee(data._fullData);
                }
              }
            }
          });
        }
      });
    }
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-10" data-testid="hierarchy-page">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8" data-testid="hierarchy-title">
          Organization Chart
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-96" data-testid="hierarchy-loading">
            <div className="text-[#00E6C3] text-xl">Loading hierarchy...</div>
          </div>
        ) : (
          // --- THIS IS THE CORRECTED HTML ---
          // A simple container with padding, overflow, and a set height.
          <div 
            className="glass-strong rounded-2xl p-6 overflow-x-auto" 
            style={{ minHeight: '700px' }} 
            data-testid="hierarchy-chart-container"
          >
            {/* The single, empty div the library needs */}
            <div
              ref={chartRef}
              id="chart-container"
              className="orgchart-container"
              style={{
                '--node-bg': 'rgba(255, 255, 255, 0.07)',
                '--node-border': '1px solid rgba(0, 230, 195, 0.3)',
                '--line-color': '#00E6C3',
              }}
            ></div>
          </div>
          // --- END OF CORRECTED HTML ---
        )}
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
          data-testid="employee-modal-overlay"
        >
          <div
            className="glass-strong rounded-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
            data-testid="employee-modal"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={closeModal}
              data-testid="modal-close-btn"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center">
              <img
                src={selectedEmployee.photoUrl || '/uploads/default-avatar.png'}
                alt={selectedEmployee.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#00E6C3]"
                data-testid="employee-photo"
              />
              <h2 className="text-2xl font-bold mb-2" data-testid="employee-name">{selectedEmployee.name}</h2>
              <p className="text-[#00E6C3] font-semibold mb-4" data-testid="employee-role">{selectedEmployee.role}</p>

              <div className="w-full space-y-3 text-left">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-[#C7C9D3]">Department:</span>
                  <span className="font-semibold" data-testid="employee-department">{selectedEmployee.department}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-[#C7C9D3]">Email:</span>
                  <span className="font-semibold text-sm" data-testid="employee-email">{selectedEmployee.email}</span>
                </div>
                {selectedEmployee.reportsTo && (
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-[#C7C9D3]">Reports To (ID):</span>
                    <span className="font-semibold text-xs" data-testid="employee-reports-to">{selectedEmployee.reportsTo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        .orgchart-container .orgchart {
          background: transparent;
        }
        .orgchart-container .invisible-root-node,
        .orgchart-container .invisible-root-node + .lines .downLine {
          display: none;
        }
        .orgchart-container .invisible-root-node .lines .downLine {
            display: block;
        }
        .orgchart-container .node {
          background: var(--node-bg);
          border: var(--node-border);
          color: #FFF;
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 150px;
        }
        .orgchart-container .node:hover {
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 24px rgba(0, 230, 195, 0.3);
          transform: translateY(-3px);
        }
        .orgchart-container .node .title {
          background: transparent;
          color: #FFF;
          font-weight: 500;
          font-size: 14px;
        }
        .orgchart-container .lines .downLine,
        .orgchart-container .lines .leftLine,
        .orgchart-container .lines .rightLine,
        .orgchart-container .lines .topLine {
          background-color: var(--line-color);
        }
        .orgchart-container .oc-export-btn {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Hierarchy;