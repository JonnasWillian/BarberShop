import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useHistory do React Router
import './dashboard.css'; // Importe o arquivo de estilos do dashboard

function Entradas({ username }) {
    return (
        <div className='dashboard'>
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
                    <h3>Configurações</h3>
                    {/* Adicione aqui as configurações */}
                </div>
            </div>

            <div className="content">
                <div className="welcome">
                    <h1></h1>
                    <div className="profile">
                        <button className="add-collaborator"><b>+  Adicionar Colaborador</b></button>
                        <div>
                            <p>Nome da Barbearia</p>
                            <p>Administrador</p>
                        </div>
                        <img src="profile.jpg" alt="Perfil" />
                    </div>
                </div>
                <hr />
                <div className="reports">
                    <h2>Serviços recentes</h2>
                    {/* Tabela */}
                    <table class="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Data e hora</th>
                                <th>Barbeiro</th>
                                <th>Cliente</th>
                                <th>Pagamento</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cabelo, barba</td>
                                <td>01/04/24 - 12h</td>
                                <td>João</td>
                                <td>Pedro</td>
                                <td>Pix</td>
                                <td>R$: 45,00</td>
                                <td><a><span uk-icon="pencil"></span></a></td>
                            </tr>
                            <tr>
                                <td>Cabelo, barba, Sobrancelha</td>
                                <td>30/03/24 - 10h</td>
                                <td>Luis</td>
                                <td>Avulso</td>
                                <td>Dinheiro</td>
                                <td>R$: 50,00</td>
                                <td><a><span uk-icon="pencil"></span></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Entradas;