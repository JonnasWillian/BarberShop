import React, { useState, useEffect}  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './dashboard.css';

function Clientes({ props }) {
    const location = useLocation();
    const info = location.state;

    if (info === null) {
        // Se não houver informações, redireciona para a tela inicial
        window.location.href = "./";
    }

    // Redirecionamento
    const history = useNavigate();
    const navegarDashboard = () => {
      history('/dashboard', { state: { userId: info.userId, userName: info.userName } });
    };
  
    const navegarEntrada = () => {
      history('/entradas', { state: { userId: info.userId, userName: info.userName } });
    };

    const navegarAgenda = () => {
        history('/agenda', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    // Função de pegar os membros
    const [membros, setMembros] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/membrosBarbearia', {
            id: info.userId
        });
            const result = await response.data;
            setMembros(result);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className='dashboard'>
            <div className="sidebar">
                <h2>Barbearia</h2>
                <ul>
                    <li><a onClick={navegarDashboard}>Visão Geral</a></li>
                    <li><a onClick={navegarEntrada}>Entradas</a></li>
                    <li><a href='/clientes'>Clientes</a></li>
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
                    <table class="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Telefone</th>
                                <th>Email</th>
                                {/* <th>Valor plano</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {membros.map(membro => (
                                <tr>
                                    <td>{membro.nome}</td>
                                    <td>Assinante</td>
                                    <td>{membro.telefone}</td>
                                    <td>{membro.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Clientes;