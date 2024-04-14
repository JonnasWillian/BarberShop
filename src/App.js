import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/dashboard';
import Entradas from './pages/entrada';
import Clientes from './pages/clientes';
import PagamentoCliente from './pages/pagamentoCliente';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home/>} />

        {/* Página cliente */}
        <Route path="/pagamentoCliente" element={<PagamentoCliente/>} />

        {/* Página empresa */}
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/entradas" element={<Entradas/>} />
        <Route path="/clientes" element={<Clientes/>} />
      </Routes>
    </Router>
  );
}

export default App;
