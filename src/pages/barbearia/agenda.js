import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

import './dashboard.css'; // Importe o arquivo de estilos do dashboard

function Agenda({ props }) {
    const location = useLocation();
    const info = location.state;

    // Pegar data
    const date = new Date();
    const mes = String(date.getMonth() + 1).padStart(2, ''); // Janeiro é 0!
    const ano = date.getFullYear();

    if (info === null) {
        // Se não houver informações, redireciona para a tela inicial
        window.location.href = "./";
    }

      // Rotas de direcionamento
    const history = useNavigate();
    const navegarEntrada = () => {
        history('/entradas', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    const navegarClientes = () => {
        history('/clientes', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    const navegarDashborad = () => {
        history('/dashboard', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    const navegarAgenda = () => {
        history('/agenda', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    // Buscar agendas do mês
    useEffect(() => {
        fetchBarbearia(mes);
    }, []); 
    const [agendaDoMes, setAgendaDoMes] = useState([]);

    const fetchBarbearia = async (mes) => {
        try {
            const response = await axios.post('http://localhost:3002/api/listarAgendaCortesBarbearias/', {usrId: info.userId, mes});
            setAgendaDoMes(response.data);
        } catch (error) {
            console.error('Erro ao buscar barbearias:', error);
        }
    }

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Barbearia</h2>
                <ul>
                    <li onClick={navegarDashborad}><a>Visão Geral</a></li>
                    <li onClick={navegarEntrada}><a>Entradas</a></li>
                    <li onClick={navegarClientes}><a>Clientes</a></li>
                    <li onClick={navegarAgenda}><a>Agenda</a></li>
                </ul>
            </div>

            <div className="content">
                <div className="welcome">
                    <h1></h1>
                    <div className="profile">
                        <div>
                            <p>{info.userName}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="reports">
                    <h2>Assinaturas</h2>
                    <table className="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Dia</th>
                                <th>Telefone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendaDoMes.map(membro => (
                                <tr>
                                    <td>{membro.User.nome}</td>
                                    <td>{membro.dia}/{membro.mes}/{membro.ano} {membro.horas}</td>
                                    <td>{membro.User.telefone}</td>
                                    <td>{membro.User.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Agenda;