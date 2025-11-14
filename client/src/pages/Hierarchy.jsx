// import { useEffect, useRef, useState, useCallback } from "react";
// import OrgChart from "@balkangraph/orgchart.js";
// import api from "../lib/api";
// import { registerOrgFlowTemplate } from "../utils/orgFlowTemplate";

// const Hierarchy = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const fetchHierarchy = useCallback(async () => {
//     try {
//       const response = await api.get("/public/hierarchy");
//       const nested = response.data;

//       const flatten = (nodes, parent = null) => {
//         let res = [];
//         nodes.forEach((n) => {
//           res.push({
//             id: n._id,
//             pid: parent,
//             name: n.name,
//             title: n.role,
//             img: n.photoUrl,
//             email: n.email,
//             phone: n.phone,
//             dept: n.department,
//             _fullData: n,
//           });
//           if (n.children) res.push(...flatten(n.children, n._id));
//         });
//         return res;
//       };

//       let flat = [];
//       nested.forEach((root) => flat.push(...flatten([root], null)));

//       // register theme
//       registerOrgFlowTemplate();

//       if (!chartInstance.current) {
//         chartInstance.current = new OrgChart(chartRef.current, {
//           template: "myTemplate",
//           layout: OrgChart.layout.mixed,
//           mode: "dark",
//           nodeMouseClick: OrgChart.action.none,
//           mouseScrool: OrgChart.action.scroll,
//           enableSearch: false,
//           nodeBinding: {
//             field_0: "name",
//             field_1: "title",
//             img_0: "img",
//             email: "email",
//             phone: "phone",
//           },
//         });
//       }

//       chartInstance.current.load(flat);
//     } catch (err) {
//       console.error("Hierarchy error:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHierarchy();
//   }, [fetchHierarchy]);

//   return (
//     <div className="pt-20 px-4 pb-10">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8">
//           Organization Chart
//         </h1>

//         <div className="w-full h-[700px] glass-strong rounded-2xl p-6">
//           <div
//             id="orgchart-container"
//             ref={chartRef}
//             style={{ width: "100%", height: "100%" }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hierarchy;


import React, { useEffect, useRef, useState } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import api from "../lib/api";
import { registerCircleStyleTemplate } from "../utils/orgFlowTemplate";

const Hierarchy = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [loading, setLoading] = useState(true);

  // Register Template Once
  useEffect(() => {
    registerCircleStyleTemplate();
  }, []);

  // Fetch hierarchy from backend (axios)
  const fetchHierarchy = async () => {
    try {
      const res = await api.get("/public/hierarchy");
      console.log("Fetched Hierarchy:", res.data);
      return res.data;
    } catch (err) {
      console.error("Hierarchy fetch error:", err);
      return [];
    }
  };

  // Convert Nested → Flat
  const flattenTree = (node, parentId = null, flat = []) => {
    if (!node) return flat;

    flat.push({
      id: node._id,
      pid: parentId,
      name: node.name,
      title: node.role,
      photoUrl: node.photoUrl,
      tags: node.tags || [],
    });

    if (node.children?.length > 0) {
      node.children.forEach((child) =>
        flattenTree(child, node._id, flat)
      );
    }

    return flat;
  };

  // Initialize Chart
  useEffect(() => {
    const loadChart = async () => {
      if (!chartRef.current) {
        console.warn("Chart container not ready");
        return;
      }

      const treeData = await fetchHierarchy();
      if (!treeData.length) return;

      const flatData = flattenTree(treeData[0]);
      console.log("Flattened Data:", flatData);

      // Destroy previous instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create chart
      chartInstance.current = new OrgChart(chartRef.current, {
        template: "circleNode",
        mode: "dark",
        enableSearch: false,
        mouseScrool: OrgChart.action.scroll,
        scaleInitial: 1,
        siblingSeparation: 10,
        levelSeparation: 50,

        nodeBinding: {
          field_0: "name",
          field_1: "title",
          img_0: "photoUrl",
        },

        tags: {
          root: { template: "circleRoot" },
          orange: { template: "circleOrange" },
          brown: { template: "circleBrown" },
        },

        nodes: flatData,
      });

      setLoading(false);
    };

    loadChart();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center relative flex-col">
      <div>
        <h1 className="text-4xl font-bold text-center mb-8">
          Organization Chart
        </h1>
      </div>
      {loading && (
        <p style={{ color: "#ED9422", position: "absolute", top: "50%" }}>
          Loading chart...
        </p>
      )}

      <div
        id="tree"
        ref={chartRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      />
    </div>
  );
};

export default Hierarchy;
