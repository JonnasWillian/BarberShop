import React from 'react';
import { useLocation } from 'react-router-dom';
import './dashboard.css'; // Importe o arquivo de estilos do dashboard
import DashboardItem from './dashboardItem';
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const data = {
  labels: ['Agendamento', 'Cabelo', 'Barba'],
  datasets: [{
    type: 'doughnut',
    label: ['Agendamento'],
    data: [700, 400, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

function Dashboard({ props }) {
  const location = useLocation();
  const info = location.state;
  console.log(info);


  if (info === null) {
      // Se não houver informações, redireciona para a tela inicial
      window.location.href = "./";
  }

  var nome = location.state.userName;
  var id = location.state.userId;

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Barbearia</h2>
        <div className="search">
          <input type="text" placeholder="Pesquisar" />
          <button><i className="fa fa-search"></i></button>
        </div>
        <ul>
          <li><a href='/dashboard'>Visão Geral</a></li>
          <li><a href='/entradas'>Entradas</a></li>
          <li><a href='/clientes'>Clientes</a></li>
          <li>Agenda</li>
          {/*<li>App para Membros</li>
          <li>Estoque</li>*/}
        </ul>
        <div className="config">
          {/* <h3>Configurações</h3> */}
          {/* Adicione aqui as configurações */}
        </div>
      </div>
      <div className="content">
        <div className="welcome">
          <h1>Bem-vindo {nome}!</h1>
          <div className="profile">
          <button className="add-collaborator"><b>+  Adicionar Colaborador</b></button>
          </div>
        </div>
        <hr />
        <div className="reports">
          <h2>Relatório Geral</h2>
          <div className="cards">
            <DashboardItem title="Serviços Realizados" value="123" color="#4F46C7" />
            <DashboardItem title="Total de Cortes" value="50" color="#FEC053" />
            <DashboardItem title="Total de Comissões" value="R$ 500,00" color="#92DEFE" />
          </div>
          <div className='cards-com-grafico'>
            <div className='infos'>
              <DashboardItem title="Total de Membros" value="30" color="#7ED957" />
              <DashboardItem title="Total de Membros Inativos" value="5" color="#FF5757" />
            </div>
            <div className='grafico'>
              <Line data={data} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
