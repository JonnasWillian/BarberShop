// LoginForm.js
import React from 'react';

function LoginForm({ email, senha, setEmail, setSenha, handleLogin, mensagem, closeModal, toggleFormType }) {
  return (
      <div className="modal-content">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
              <div className="textbox">
                  <input type="text" placeholder="Nome de usuário" name="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="textbox">
                  <input type="password" placeholder="Senha" name="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              </div>
              <input  className="orange-button" className="btn" type="submit" value="Entrar" />
          </form>
          {mensagem && <span>{mensagem}</span>}
          <p>Não tem uma conta? <button onClick={toggleFormType}>Criar conta</button></p>
          <button  onClick={closeModal}>Fechar</button>
      </div>
  );
}

export default LoginForm;
