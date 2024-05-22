import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import PagamentoCliente from './pages/pagamentoCliente';
import VerificarPlano from './pages/assinarPlano';
import Dashboard from './pages/barbearia/dashboard';
import Entradas from './pages/barbearia/entrada';
import Clientes from './pages/barbearia/clientes';
import Agenda from './pages/barbearia/agenda';
import CadastrarBarbearia from './pages/clientes/cadastrarBarbearia';
import PainelUsuario from './pages/clientes/painelUsuario';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home/>} />

        {/* Página cliente */}
        <Route path="/cadastrarBarbearia" element={<CadastrarBarbearia/>} />
        <Route path="/painelUsuario" element={<PainelUsuario/>} />

        {/* Página empresa */}
        <Route path="/pagamentoCliente" element={<PagamentoCliente/>} />
        <Route path="/verificarPlano" element={<VerificarPlano/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/entradas" element={<Entradas/>} />
        <Route path="/clientes" element={<Clientes/>} />
        <Route path="/agenda" element={<Agenda/>} />
      </Routes>
    </Router>
  );
}

export default App;
