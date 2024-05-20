import React, { useState, useEffect}  from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import DashboardItem from './dashboardItem';
import axios from 'axios';

import './dashboard.css'; // Importe o arquivo de estilos do dashboard
import "chart.js/auto";
import { Line } from "react-chartjs-2";

function Dashboard({ props }) {
  const location = useLocation();
  const info = location.state;

  if (info === null) {
      // Se não houver informações, redireciona para a tela inicial
      window.location.href = "./";
  }

  // Pegar data
  const date = new Date();
  const mes = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const ano = date.getFullYear();

  // Rotas de direcionamento
  const history = useNavigate();
  const navegarEntrada = () => {
    history('/entradas', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
  };

  const navegarClientes = () => {
    history('/clientes', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
  };

  // Função de pegar os membros
  const [membros, setMembros] = useState('');
  useEffect(() => {
    fetchData();
    fetchCortes();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.post('http://localhost:3002/api/membrosBarbearia', {
        id: info.userId
      });
        const result = await response.data;
        setMembros(result.length);
    } catch (error) {
        console.log(error);
    }
  };

  // Função de pegar cortes avulsos
  const [cortes, setCortes] = useState('');
  const fetchCortes = async () => {
    try {
        const response = await axios.post('http://localhost:3002/api/buscarCortesDoMes', {
          id_barbearia: info.userId,
          mes: mes,
          ano, ano
      });
        const result = await response.data;
        setCortes(result);
        calcularFaturamento(result);
        calcularComissao(result);
    } catch (error) {
        console.log(error);
    }
  };

  // Calcular faturamento do mês
  const [valorFaturamento, setValorFaturamento] = useState('');
  const calcularFaturamento = async (arrayCortes) => {
    let faturamentoTotal = 0;
    for (let i = 0; i < arrayCortes.length; i++) {
      faturamentoTotal += parseFloat(arrayCortes[i]['preco'])
    }
    setValorFaturamento(faturamentoTotal);
  };

  // Calcular comissao do mês
  const [valorComissao, setValorComissao] = useState('');
  const calcularComissao = async (arrayCortes) => {
    let comissaoTotal = 0;
    for (let i = 0; i < arrayCortes.length; i++) {
      comissaoTotal += parseFloat(arrayCortes[i]['preco']) * (parseFloat("0."+arrayCortes[i]['comissao']))
    }
    setValorComissao(comissaoTotal);
  };

  // Gráfico
  const data = {
    labels: ['Faturamento', 'Comissão'],
    datasets: [{
      type: 'doughnut',
      label: ['Fluxo de caixa'],
      data: [valorFaturamento, valorComissao],
      backgroundColor: [
        '#FEC057',
        '#91DEFD',
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Barbearia</h2>
        <ul>
          <li><a href='/dashboard'>Visão Geral</a></li>
          <li onClick={navegarEntrada}><a>Entradas</a></li>
          <li onClick={navegarClientes}><a>Clientes</a></li>
          <li>Agenda</li>
        </ul>
      </div>
      <div className="content">
        <div className="welcome">
          <h1>Bem-vindo {info.userName}!</h1>
        </div>
        <hr />
        <div className="reports">
          <h2>Relatório Geral</h2>
          <div className="cards">
            <DashboardItem title="Serviços Realizados" value={cortes.length} color="#4F46C7" />
            <DashboardItem title="Total do faturamento" value={valorFaturamento} color="#FEC053" />
            <DashboardItem title="Total de Comissões" value={valorComissao} color="#92DEFE" />
          </div>
          <div className='cards-com-grafico'>
            <div className='infos'>
              <DashboardItem title="Total de Membros" value={membros} color="#7ED957"/>
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
