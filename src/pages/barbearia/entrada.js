import React, { useState, useEffect}  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RegisterCorteform from './RegisterCorteform';
import axios from 'axios';

import './dashboard.css'; // Importe o arquivo de estilos do dashboard

function Entradas({props}) {
    const location = useLocation();
    const info = location.state;

    if (info === null) {
        // Se não houver informações, redireciona para a tela inicial
        window.location.href = "./";
    }

    // Pegar data
    const dataMes = new Date();
    const mesAtual = String(dataMes.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const anoAtual = dataMes.getFullYear();

    // Redirecionamento
    const history = useNavigate();
    const navegarDashboard = () => {
      history('/dashboard', { state: { userId: info.userId, userName: info.userName } });
    };
  
    const navegarClientes = () => {
      history('/clientes', { state: { userId: info.userId, userName: info.userName } });
    };

    const navegarAgenda = () => {
        history('/agenda', { state: { userId: info.userId, userName: info.userName } }); // Redireciona para a página do usuário
    };

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        fetchCortes();
    };

    // Função de pegar os membros
    const [cortes, setCortes] = useState([]);
    useEffect(() => {
        fetchCortes();
    }, []);

    const fetchCortes = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/buscarCortesBarbearia', {
            id: info.userId,
            mes: mesAtual,
            ano: anoAtual
        });
            const result = await response.data;
            console.log(result);
            setCortes(result);
        } catch (error) {
            console.log(error);
        }
    };

    // Formatar data
    const FormatarData = (data) => {
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='dashboard'>
            <div className="sidebar">
                <h2>Barbearia</h2>
                <ul>
                    <li><a onClick={navegarDashboard}>Visão Geral</a></li>
                    <li><a href='/entradas'>Entradas</a></li>
                    <li><a onClick={navegarClientes}>Clientes</a></li>
                    <li onClick={navegarAgenda}><a>Agenda</a></li>
                </ul>
                <div className="config">
                </div>
            </div>

            <div className="content">
                <div className="welcome">
                    <button onClick={openModal} className="add-collaborator"><b>+  Adicionar Serviço</b></button>
                    <div className="profile">
                        <div>
                            <p>{info.userName}</p>
                        </div>
                    </div>
                </div>
                {modalOpen && <RegisterCorteform closeModal={closeModal} />}
                <hr />
                <div className="reports">
                    <h2>Serviços do mês</h2>
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
                            {cortes.map(corte => (
                                <tr>
                                    <td>{corte.descricao}</td>
                                    <td>{FormatarData(corte.data)}</td>
                                    <td>{corte.barbeiro}</td>
                                    <td>{corte.cliente}</td>
                                    <td>{corte.formaPagamento}</td>
                                    <td>{corte.preco}</td>
                                </tr>
                            ))}
                            {/* <tr>
                                <td>Cabelo, barba</td>
                                <td>01/04/24 - 12h</td>
                                <td>João</td>
                                <td>Pedro</td>
                                <td>Pix</td>
                                <td>R$: 45,00</td>
                                <td><a><span uk-icon="pencil"></span></a></td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Entradas;