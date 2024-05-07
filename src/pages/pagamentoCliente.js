import React, { useState } from 'react';
import axios from 'axios';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

// import { useNavigate } from 'react-router-dom';
import './pagamento.css';

function PagamentoCliente({ props }) {

  const [form, setForm] = useState({
    nome: '',
    numeroCartao: '',
    expiracao: '',
    cvv: '',
    valor: '',
    barbearia:'',
    focus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar os dados do cartão para o backend
      const response = await axios.post('http://localhost:3002/assinatura', {
        nome: form.nome,
        numero_cartao: form.numeroCartao,
        expiracao: form.expiracao,
        cvv: form.cvv,
        valor: form.valor,
        barbearia: form.barbearia
      });
      console.log('Resposta do backend:', response.data);
      alert('Assinatura criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      alert('Erro ao criar assinatura. Verifique os dados do cartão, se preencheu as informações da barberia/plano e tente novamente.');
    }
  };

  return (
      <div className="App">
          <h2 className='titulo'>Assinatura de Plano</h2>

          <div className='planos uk-child-width-1-2@s uk-grid-match'>
            <div>
                <div className="uk-card uk-card-default uk-card-hover uk-card-body cardPlanos">
                    <h3 className="uk-card-title">Plano básico</h3>
                    <p>- 3 cortes no mês</p>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-primary uk-card-hover uk-card-body uk-light cardPlanos">
                    <h3 className="uk-card-title">Plano Gold</h3>
                    <p>- 4 cortes no mês</p>
                    <p>- 4 corte de barba no mês</p>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light cardPlanos">
                    <h3 className="uk-card-title">Plano premium</h3>
                    <p>- 5 cortes no mês</p>
                    <p>- 5 corte de barba no mês</p>
                    <p>- 5 cortes de sombranchela no mês</p>
                </div>
            </div>
          </div>

          <div className='cartaoCredito'>
            <div className='cartao' style={{ marginTop: '20px' }}>
              <Cards
                cvc={form.cvv}
                expiry={form.expiracao}
                name={form.nome}
                number={form.numeroCartao}
                focused={form.focus}
              />
            </div>

            <form className='dadosCartao uk-grid-small' onSubmit={handleSubmit}>

              <div className="uk-width-1-1">
                  <input className="uk-input" type="text" name="nome" placeholder="Nome no Cartão" value={form.nome} onChange={handleChange} required aria-label="100"/>
              </div>

              <div className='divisor'>
                <div className="uk-width-1-2@s">
                    <input className="uk-input" type="text" placeholder="Número do cartão" name="numeroCartao" aria-label="50" value={form.numeroCartao} onChange={handleChange} required/>
                </div>

                <div className="uk-width-1-4@s">
                  <input className="uk-input" type="text" name="expiracao" placeholder="Expiração (MM/YY)" aria-label="25" value={form.expiracao} onChange={handleChange} required/>
                </div>

                <div className="uk-width-1-4@s">
                  <input className="uk-input" type="text" name="cvv" placeholder="CVV" aria-label="25" value={form.cvv} onChange={handleChange} required/>
                </div>
              </div>

              <div className='divisor'>
                <div className="uk-width-1-2@s">
                  <label className="uk-form-label" for="form-stacked-select">Plano</label>
                  <div className="uk-form-controls">
                      <select className="uk-select" name='valor' value={form.valor} onChange={handleChange} id="form-stacked-select">
                          <option value="">Selecione uma opção</option>
                          <option value="50,50">Plano básico</option>
                          <option value="70,25">Plano Gold</option>
                          <option value="99,99">Plano premium</option>
                      </select>
                  </div>
                </div>

                <div className="uk-width-1-2@s">
                  <label className="uk-form-label" for="form-stacked-select">Barbearia</label>
                  <div className="uk-form-controls">
                      <select className="uk-select" name='barbearia' value={form.barbearia} onChange={handleChange}  id="form-stacked-select">
                          <option value="">Selecione uma opção</option>
                          <option value="1">Na régua</option>
                          <option value="2">Barbearia do cadu</option>
                          <option value="3">Corte show</option>
                      </select>
                  </div>
                </div>
              </div>

              <br></br>
              <button className="uk-button uk-button-primary"  type="submit">Assinar Plano</button>
            </form>
          </div>
      </div>
  )
}

export default PagamentoCliente;