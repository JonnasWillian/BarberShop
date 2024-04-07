import React, { useState } from 'react';
import './Registerform.css'; 
import InputMask from 'react-input-mask';

function RegisterForm({closeModal}) {
  const [userType, setUserType] = useState('cliente');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/api/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha, tipo, cpf, telefone})
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
          <h2>Cadastre-se</h2>
          <h3>Selecione a opção de cadastro</h3>

          <form onSubmit={handleSubmit}>
            {mensagem && <span class="uk-label uk-label-success">{mensagem}</span>}<br/><br/>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="1">Cliente</option>
              <option value="2">Barbearia</option>
            </select>
            <button className="close-btn" onClick={closeModal}>X</button> {/* Botão X dentro do formulário */}
            <div className="textbox">
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome de usuário" name="username" required />
            </div>
            <div className="textbox">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" name="email" required />
            </div>
            
            <div className="textbox">
                <InputMask
                  value={telefone} onChange={(e) => setTelefone(e.target.value)}
                  mask="(99) 99999-9999"
                  placeholder="Telefone"
                  required
                />
              </div>  
            <div className="textbox">
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF/CNPJ" name="password" required />
            </div>
            <div className="textbox">
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" name="password" required />
            </div>
            <input className="btn" type="submit" value="Criar Conta" />
          </form>
        
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
