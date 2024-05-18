// DashboardItem.jsx

import React from 'react';
import './dashboard.css'; // Importe o arquivo de estilos do dashboard

function DashboardItem({ title, value, color }) {
    return (
      <div className="dashboard-item" style={{ backgroundColor: color }}>
        <h3>{title}</h3>
        <p>{value}</p>
        {/* <a href="#" className="see-more">Ver histórico</a> */}
      </div>
    );
  }
  

export default DashboardItem;
