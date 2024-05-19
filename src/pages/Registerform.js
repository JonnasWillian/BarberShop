
// RegisterForm.js
import React, { useState } from 'react';
import './Registerform.css';
import InputMask from 'react-input-mask';

function RegisterForm({ toggleFormType}) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
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
                body: JSON.stringify({ nome, email, senha, cpf, telefone })
            });

            const data = await response.json();
            setMensagem(data.message);
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
        }
    };

    return (
        <div className="modal-content">
            <h2>Cadastre-se</h2>
            <form onSubmit={handleSubmit}>
                {mensagem && <span className="uk-label uk-label-success">{mensagem}</span>}<br /><br />
                <div className="textbox">
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome de usuário" name="username" required />
                </div>
                <div className="textbox">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" required />
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
            <button onClick={toggleFormType}>Voltar ao login</button>
         
        </div>
    );
}

export default RegisterForm;