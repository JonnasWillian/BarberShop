import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './plano.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function VerificarPlano({ props }) {
    // Pega o parametro do banco de qual
    let query = useQuery();
    let id_plano = query.get('preference_id');

    // Verificando pagamento e caso ocorra, atualizar e redirecionar
    const navigate = useNavigate();
    useEffect(() => {
        fetchBarbearia(id_plano);
    }, []); 

    const fetchBarbearia = async (id_plano) => {
        try {
            const response = await axios.post('http://localhost:8080/api/registrarAssinatura/', {id_plano});
            navigate('/dashboard', { state: { userId: response.id, userName: response.nome } });
        } catch (error) {
            console.error('Erro ao buscar barbearias:', error);
        }
    }

    return(
        <div className="App loading">
            <div className="load-1">
                <h1>Processando pagamento</h1>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}

export default VerificarPlano;