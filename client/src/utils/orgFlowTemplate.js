// import OrgChart from "@balkangraph/orgchart.js";

// export const registerOrgFlowTemplate = () => {
//     if (OrgChart.templates.myTemplate) return;

//     let avatar =
//         `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" x="230" y="20" viewBox="0 0 20 20">
//         <path fill="#9CA3AF" d="M10 11c-5.92 0-8 3-8 5v3h16v-3c0-2-2.08-5-8-5z"/>
//         <circle cx="10" cy="5.5" r="4.5" fill="#9CA3AF"/>
//     </svg>`;

//     let email =
//         `<svg fill="#fff" width="100px" height="25px" x="25" y="90" viewBox="0 0 100 42">
//         <path d="M40.5,31.5v-18c0,0-18.2,12.7-19.97,13.359C18.79,26.23,0.5,13.5,0.5,13.5v18c0,2.5,0.53,3,3,3h34"/>
//         <text x="50" y="30" font-size="24" fill="#fff">Email</text>
//     </svg>`;

//     let phone =
//         `<svg fill="#fff" width="100px" height="25px" x="165" y="90" viewBox="0 0 100 42">
//         <path d="M15 20c-1-2-2-4-2-4c2-1 6-3 6-6c0-2-5-8-6-9C10 1 5 6 4 8c-1 3 0 6 1 9c3 6 12 17 17 21c3 3 6 4 9 3c1-.3 6-4 7-7"/>
//         <text x="50" y="25" font-size="24" fill="#fff">Phone</text>
//     </svg>`;

//     // Base template
//     OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
//     OrgChart.templates.myTemplate.size = [300, 120];

//     OrgChart.templates.myTemplate.node = `
//         <rect x="0" y="0" height="{h}" width="{w}"
//               fill="#111827" rx="7" ry="7"></rect>

//         <line x1="2" y1="85" x2="300" y2="85"
//               stroke="#2C3341"></line>

//         <line x1="152" y1="85" x2="152" y2="120"
//               stroke="#2C3341"></line>

//         <line class="level" x1="0" y="5" x2="0" y2="115"
//               stroke-width="3" stroke="#FFCA28"></line>

//         ${avatar}
//     `;

//     OrgChart.templates.myTemplate.img_0 = `
//         <clipPath id="{randId}">
//             <circle cx="250" cy="40" r="25"></circle>
//         </clipPath>
//         <image clip-path="url(#{randId})"
//                xlink:href="{val}"
//                x="220" y="10" width="60" height="60"
//                preserveAspectRatio="xMidYMid slice" />
//     `;

//     OrgChart.templates.myTemplate.field_0 = `
//       <text data-width="230" fill="#fff" x="25" y="35"
//             font-size="14">{val}</text>
//   `;

//     OrgChart.templates.myTemplate.field_1 = `
//       <text data-width="230" fill="#fff" x="25" y="55"
//             font-size="12">{val}</text>
//   `;

//     OrgChart.templates.myTemplate.email =
//         email +
//         `<rect data-email="{val}" x="25" y="90" width="100" height="30" opacity="0"></rect>`;

//     OrgChart.templates.myTemplate.phone =
//         phone +
//         `<rect data-phone="{val}" x="185" y="90" width="100" height="30" opacity="0"></rect>`;
// };


import OrgChart from "@balkangraph/orgchart.js";

export function registerCircleStyleTemplate() {

    // Base Circle Template (Neon version)
    OrgChart.templates.circleNode = Object.assign({}, OrgChart.templates.ana);
    OrgChart.templates.circleNode.size = [140, 180];

    OrgChart.templates.circleNode.node = `
      <rect x="0" y="0" width="140" height="180" fill="transparent"></rect>

      <!-- Outer Neon Glow -->
      <circle cx="70" cy="60" r="58" fill="none" stroke="#00f7ff" stroke-width="4" 
        filter="url(#glowNeon)">
      </circle>

      <!-- Outer Dark Circle -->
      <circle cx="70" cy="60" r="55" fill="#1a1a1a" stroke="#00f7ff" stroke-width="2"></circle>

      <!-- Inner White Circle -->
      <circle cx="70" cy="60" r="40" fill="#ffffff"></circle>
    `;

    // Image
    OrgChart.templates.circleNode.img_0 = `
      <clipPath id="{randId}">
          <circle cx="70" cy="60" r="40"></circle>
      </clipPath>

      <image clip-path="url(#{randId})"
          xlink:href="{val}"
          x="30" y="20"
          width="80" height="80"
          preserveAspectRatio="xMidYMid slice"
      />
    `;

    // Neon Name
    OrgChart.templates.circleNode.field_0 = `
      <text 
        data-width="140" 
        style="font-size: 16px; font-weight: 600;" 
        fill="#00f7ff"
        x="70" y="150" 
        text-anchor="middle">{val}
      </text>
    `;

    // Neon Title
    OrgChart.templates.circleNode.field_1 = `
      <text 
        data-width="140" 
        style="font-size: 11px;" 
        fill="#7fffd4"
        x="70" y="168" 
        text-anchor="middle">{val}
      </text>
    `;

    // REMOVE expand/collapse (+ / −)
    OrgChart.templates.circleNode.plus = "";
    OrgChart.templates.circleNode.minus = "";

    // ============================
    // 🌟 NEON COLOR VARIANTS
    // ============================

    // ROOT = Cyan / Aqua
    OrgChart.templates.circleRoot = Object.assign({}, OrgChart.templates.circleNode);
    OrgChart.templates.circleRoot.node = OrgChart.templates.circleNode.node.replace(
        /#00f7ff/g,
        "#00eaff"
    );

    // ORANGE TAG = Purple Neon
    OrgChart.templates.circleOrange = Object.assign({}, OrgChart.templates.circleNode);
    OrgChart.templates.circleOrange.node = OrgChart.templates.circleNode.node.replace(
        /#00f7ff/g,
        "#d400ff"
    );
    OrgChart.templates.circleOrange.field_0 = OrgChart.templates.circleNode.field_0.replace(
        /#00f7ff/g,
        "#d400ff"
    );

    // BROWN TAG = Blue Neon
    OrgChart.templates.circleBrown = Object.assign({}, OrgChart.templates.circleNode);
    OrgChart.templates.circleBrown.node = OrgChart.templates.circleNode.node.replace(
        /#00f7ff/g,
        "#007bff"
    );
    OrgChart.templates.circleBrown.field_0 = OrgChart.templates.circleNode.field_0.replace(
        /#00f7ff/g,
        "#007bff"
    );

    // ================================
    // 🌟 SVG Neon Glow Definition
    // ================================
    OrgChart.templates.circleNode.defs = `
      <filter id="glowNeon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
          </feMerge>
      </filter>
    `;
}
