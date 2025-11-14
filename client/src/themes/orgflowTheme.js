// OrgFlow Custom Dark Glassmorphism Theme for BalkanGraph
export const orgFlowTheme = {
    size: [230, 120], // node width & height

    node: `
    <div class="of-node">
      <img class="of-photo" src="{val:photoUrl}" />
      <div class="of-name">{val:name}</div>
      <div class="of-role">{val:title}</div>
    </div>
  `,

    css: `
    .of-node {
      width: 230px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(0, 230, 195, 0.35);
      border-radius: 14px;

      color: #FFFFFF;
      font-family: 'Inter', 'Poppins', sans-serif;

      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);

      transition: all 0.25s ease-in-out;
    }

    .of-node:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-3px);
      box-shadow: 0 0 25px rgba(0, 230, 195, 0.35);
    }

    .of-photo {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 6px;
      border: 2px solid #00E6C3;
    }

    .of-name {
      font-size: 15px;
      font-weight: 600;
      color: #FFFFFF;
      margin-top: 2px;
    }

    .of-role {
      font-size: 12px;
      font-weight: 500;
      color: #00E6C3;
      margin-top: 2px;
    }
  `,

    // Connector lines
    link: {
        stroke: "#00E6C3",
        strokeWidth: 1.5,
        linecap: "round"
    }
};
