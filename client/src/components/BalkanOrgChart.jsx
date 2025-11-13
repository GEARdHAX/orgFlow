import React, { useEffect, useRef } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

const BalkanOrgChart = ({ nodes }) => {
  const chartRef = useRef(null); // Get a reference to the div

  useEffect(() => {
    // Only run if we have the div and nodes
    if (chartRef.current && nodes && nodes.length > 0) {
      
      // Initialize the OrgChart
      const chart = new OrgChart(chartRef.current, {
        nodes: nodes,
        // This 'nodeBinding' maps our data fields to the chart's template
        nodeBinding: {
          field_0: "name",
          field_1: "role",
          // You can also bind an image:
          // img_0: "photoUrl" 
        },
        // Enable features
        zoom: {
          speed: 120,
          smooth: 2
        },
        pan: true,
        layout: OrgChart.layout.mixed,
        // Make it responsive
        enableSearch: false,
        nodeMenu: {
          details: { text: "Details" },
          edit: { text: "Edit" },
          add: { text: "Add" },
          remove: { text: "Remove" }
        },
      });

      // Cleanup on unmount
      return () => {
        chart.destroy();
      };
    }
  }, [nodes]); // Re-run if the nodes data changes

  // This is the div the chart will attach to
  return (
  <div
    id="orgchart"
    ref={chartRef}
    style={{
      width: "100%",
      height: "calc(100vh - 80px)", // full screen minus navbar
      overflow: "visible",           // allow free movement
      position: "relative",
      cursor: "grab"
    }}
  />
);

};

export default BalkanOrgChart;