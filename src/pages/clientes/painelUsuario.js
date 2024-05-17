import React, { useState, useEffect} from 'react';
import {useLocation } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './painelUsuario.css';

function PainelUsuario() {
    const location = useLocation();
    const info = location.state;

    // Se não houver informações, redireciona para a tela inicial
    if (info === null) {
        window.location.href = "./";
    }

    // Função da busca dos dados da barbearia associada
    const [barbearia, setBarbearia] = useState('');

    useEffect(() => {
        fetchData();
    }, []);    

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/dadosBarbeariaAssociada', {
            id: info.id_barbearia
          });
            const result = await response.data;
            setBarbearia(result[0]);
        } catch (error) {
            console.log(error);
        }
    };

    // Função de cadastrar agendamento
    const [date, setDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        console.log('Data marcada:', selectedDate);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
          // Enviar os dados do cartão para o backend
          const response = await axios.post('http://localhost:3002/api/agendarCorte', {
            usrId: info.userId,
            idBarbearia: info.id_barbearia,
            dia: date.getDate(),
            mes:date.getMonth() + 1
          });
          console.log('Cadastro realizado!');
        } catch (error) {
          console.log(error);
          alert('Erro ao atualizar! Selecione uma opção de barbearia');
        }
    };

    // Buscar agendas do mês
    const [agendaDoMes, setAgendaDoMes] = useState([]);

    useEffect(() => {
        async function fetchBarbearia() {
            try {
                const response = await axios.post('http://localhost:3002/api/listarBarbearias/', {usrId: info.userId, mes:date.getMonth() + 1});
                setAgendaDoMes(response.data);
            } catch (error) {
                console.error('Erro ao buscar barbearias:', error);
            }
        }
    
        fetchBarbearia();
    }, []);

    return(
        <div className="painelUsuario">
            <div className="main-container">
                <section className="app-navigation">
                    <div className="container app-title-container">
                        <div className="content-container">
                            <div className="title-nav-box">
                                <h1>{info.userName}</h1>
                                <div className="nav-icon"><i className="ion-more"></i></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="test-results">
                    <div className="container">
                        <div className="content-container">
                            <h2>Agenda: {barbearia.nome} || Pix: {barbearia.pix} || Telefone: {barbearia.telefone}</h2>
                            <div className="general-scores">
                                <div>
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={date}
                                    />

                                    <br/><br/>
                                    <form onSubmit={handleConfirm}>
                                        <input type='hidden'/>
                                        <input className="btn-envio" type='submit' value="confirmar"/>
                                    </form>
                                </div>
                                <h2>Data selecionada: {date.getDate()} / {date.getMonth() + 1}</h2>
                                <div>
                                    <h2>Data marcada:</h2>
                                    {agendaDoMes.map(agenda => (
                                    <p>Data agendada: {agenda.dia} / {agenda.mes}</p>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default PainelUsuario;