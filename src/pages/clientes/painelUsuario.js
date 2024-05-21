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

    const dataMes = new Date();
    const dataAno = dataMes.getFullYear();

    // Buscar agendas do mês
    const [agendaDoMes, setAgendaDoMes] = useState([]);

    const fetchBarbearia = async (mes, ano) => {
        try {
            const response = await axios.post('http://localhost:3002/api/listarBarbearias/', {usrId: info.userId, mes, ano});
            setAgendaDoMes(response.data);
        } catch (error) {
            console.error('Erro ao buscar barbearias:', error);
        }
    }

    // Função da busca dos dados da barbearia associada
    const [barbearia, setBarbearia] = useState('');

    useEffect(() => {
        fetchData();
        fetchBarbearia(date.getMonth() + 1, date.getFullYear());
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
    const [hora, setHora] = useState(dataAno);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        fetchBarbearia(selectedDate.getMonth() + 1, dataAno);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        try {
          // Enviar os dados do cartão para o backend
          const response = await axios.post('http://localhost:3002/api/agendarCorte', {
            usrId: info.userId,
            idBarbearia: info.id_barbearia,
            dia: date.getDate(),
            mes:date.getMonth() + 1,
            ano:date.getFullYear(),
            hora: hora
          });
          fetchBarbearia(date.getMonth() + 1, date.getFullYear());
        } catch (error) {
          console.log(error);
          alert('Erro ao atualizar! Selecione uma opção de barbearia');
        }
    };

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
                                        locale="pt-BR"
                                    />

                                    <br/><br/>
                                    <form onSubmit={handleConfirm} className='hora'>
                                        <input className="espaco" value={hora} onChange={(e) => setHora(e.target.value)} type='time'required/>
                                        <input className="btn-envio espaco" type='submit' value="confirmar"/>
                                    </form>
                                </div>
                                <h2>Data selecionada: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} {hora}</h2>
                                <div>
                                    <h2>Data marcada:</h2>
                                    {agendaDoMes.map(agenda => (
                                        <p>Data agendada: {agenda.dia}/{agenda.mes} {agenda.horas}</p>
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