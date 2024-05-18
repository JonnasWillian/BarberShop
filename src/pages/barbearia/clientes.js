import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './dashboard.css'; // Importe o arquivo de estilos do dashboard

function Clientes({ props }) {
    const location = useLocation();
    const info = location.state;
    console.log(info)

    const history = useNavigate();
    const navegarDashboard = () => {
      history('/dashboard', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };
  
    const navegarEntrada = () => {
      history('/entradas', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    return (
        <div className='dashboard'>
            <div className="sidebar">
                <h2>Barbearia</h2>
                <div className="search">
                    <input type="text" placeholder="Pesquisar" />
                    <button><i className="fa fa-search"></i></button>
                </div>
                <ul>
                    <li><a onClick={navegarDashboard}>Visão Geral</a></li>
                    <li><a onClick={navegarEntrada}>Entradas</a></li>
                    <li><a href='/clientes'>Clientes</a></li>
                    <li>Agenda</li>
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
                                {/* <th>último corte</th> */}
                                <th>Telefone</th>
                                <th>Valor plano</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pedro</td>
                                <td>Assinante</td>
                                {/* <td>04/02/24 - 09:30</td> */}
                                <td>479596565645</td>
                                <td>Gold</td>
                            </tr>
                            <tr>
                                <td>Carlos</td>
                                <td>Assinante</td>
                                {/* <td>26/03/24 - 14:30</td> */}
                                <td>479596565645</td>
                                <td>Clássico</td>
                            </tr>
                            <tr>
                                <td>Tiago</td>
                                <td>Assinante</td>
                                {/* <td>24/03/24 - 11:45</td> */}
                                <td>479596565645</td>
                                <td>Pro</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Clientes;