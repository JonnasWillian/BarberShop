import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RegisterCorteform.css'; 

function RegisterCorteform({closeModal}) {
  const location = useLocation();
  const info = location.state;
  const id_barbearia = info.userId;

  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const dataAtual = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const [cliente, setCliente] = useState('');
  const [barbeiro, setBarbeiro] = useState('');
  const [corte, setCorte] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [preco, setPreco] = useState('');
  const [comissao, setComissao] = useState('');

  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch('http://localhost:8080/api/cadastrarCorte', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({id_barbearia, month, year, dataAtual, cliente, barbeiro, corte, pagamento, preco, comissao})
          });

          const data = await response.json();
          setMensagem(data.message);
      } catch (error) {
          console.error('Erro ao enviar solicitação:', error);
      }
  };

  return (
    <div>
      <div className="modal" onClick={closeModal}>
        <div className="modal-content"  onClick={(e) => e.stopPropagation()}>
          <h2>Cadastro do corte</h2>

          <form onSubmit={handleSubmit}>
            {mensagem && <span class="uk-label uk-label-success">{mensagem}</span>}<br/><br/>
            <button className="close-btn" onClick={closeModal}>X</button>

            <div className="textbox">
              <input type="text" value={corte} onChange={(e) => setCorte(e.target.value)} placeholder="Descreva o serviço" required />
            </div>
            <div className="textbox">
              <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nome do cliente" required />
            </div>
            <div className="textbox">
              <input type="text" value={barbeiro} onChange={(e) => setBarbeiro(e.target.value)} placeholder="Nome do barbeiro" required />
            </div>
            <div className="textbox">
              <input type="text" value={pagamento} onChange={(e) => setPagamento(e.target.value)} placeholder="Forma de pagamento" required />
            </div>
            <div className="textbox">
              <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} step="0.01" min="1" placeholder="Preço do corte" required />
            </div>
            <div className="textbox">
              <input type="number" value={comissao} onChange={(e) => setComissao(e.target.value)} step="0.01" min="1" placeholder="Porcentagem da comissão" required />
            </div>

            <input className="btn" type="submit" value="Cadastrar" />
          </form>
        
        </div>
      </div>
    </div>
  );
}

export default RegisterCorteform;
