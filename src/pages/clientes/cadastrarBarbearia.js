import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importe o useHistory do React Router
import axios from 'axios';

import './styleCadBarbearia.css';

function CadastrarBarbearia() {
    const location = useLocation();
    const info = location.state;
    console.log(info.userId);

    if (info === null) {
        // Se não houver informações, redireciona para a tela inicial
        window.location.href = "./";
    }

    const history = useNavigate();

    // Pegando barbearias cadastradas
    const [barbearias, setBarbearia] = useState([]);

    useEffect(() => {
        async function fetchBarbearia() {
          try {
            const response = await axios.post('http://localhost:3002/api/listaBarbearias/');
            setBarbearia(response.data);
          } catch (error) {
            console.error('Erro ao buscar barbearias:', error);
          }
        }
    
        fetchBarbearia();
    }, []);

    // Envio e cadastro da barbearia do usuário
    const [form, setForm] = useState({
        id_barbearia: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Enviar os dados do cartão para o backend
          const response = await axios.post('http://localhost:3002/api/associarBarbearia', {
            barbeariaSelecionada: form.id_barbearia,
            idUser: info.userId
          });
          console.log('Resposta do backend:', response.data);
          history('/painelUsuario', { state: { userId: info.userId, userName: info.userName, id_barbearia: form.id_barbearia} }); // Redireciona para a página do usuário
        } catch (error) {
          console.log(error);
          alert('Erro ao atualizar! Selecione uma opção de barbearia');
        }
      };

    return (
        <div className='cadastrarBarbearia'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label for="vozSelect">Selecione a barbearia</label>
                            <select name='id_barbearia' value={form.id_barbearia} onChange={handleChange} id="vozSelect">
                                <option value=''>Selecione uma barbearia</option>
                                {barbearias.map(barbearia => (
                                    <option key={barbearia.id} value={barbearia.id}>{barbearia.nome}</option>
                                ))}
                            </select>
                    </div>
                    <input className="btn-envio" type='submit' value='Enviar'/>
                </form>
            </div>
        </div>
    );
}

export default CadastrarBarbearia;