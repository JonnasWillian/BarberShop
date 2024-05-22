import React, { useState } from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';

// import { useNavigate } from 'react-router-dom';
import './pagamento.css';

function PagamentoCliente({ props }) {
  const location = useLocation();
  const info = location.state;

  const [email, setEmail] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info, email)
    try {
      // Enviar os dados do cartão para o backend
      const response = await axios.post('http://localhost:3002/api/pagamento', {
        id: info.userId,
        email: email
      });
      window.location.replace(response.data.init_point);
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      alert('Erro ao criar assinatura, aguarde u pouco e tente novamente.');
    }
  };

  return (
      <div className="App">
          <h2 className='titulo'>Assinatura de Plano</h2>

          <div className='planos uk-child-width-2-2@s uk-grid-match'>
            <div>
                <div className="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light cardPlanos">
                    <h3 className="uk-card-title">Assinatura ddo plano</h3>
                    <p>- Acesso a agendamento de cortes</p>
                    <p>- Cadastrar cortes da barbearia</p>
                    <p>- Gestão de cortes e custos</p>
                </div>
            </div>
          </div>

          <div className='cartaoCredito'>
            <form className='dadosCartao uk-grid-small' onSubmit={handleSubmit}>
              <div className="uk-width-1-1">
                  <input className="uk-input" type="text" name="email" placeholder="Email de referência" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="100"/>
              </div>
              <button className="uk-button uk-button-primary"  type="submit">Assinar Plano</button>
            </form>
          </div>
      </div>
  )
}

export default PagamentoCliente;