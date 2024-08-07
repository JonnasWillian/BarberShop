// ModalVerific.js
import React from 'react';

function ModalVerific({ onSelectUserType }) {
    const handleUserTypeSelection = (type, e) => {
        e.stopPropagation(); // Evita a propagação do evento para o modal
        onSelectUserType(type === 'cliente' ? 1 : 2); // Envia 1 para cliente e 2 para barbearia
    };

    return (
        <div className="modal-content">
            <h2>Escolha o tipo de usuário</h2>
            <button className="orange-button" onClick={(e) => handleUserTypeSelection('cliente', e)}>Cliente</button>
            <button className="orange-button" onClick={(e) => handleUserTypeSelection('barbearia', e)}>Barbearia</button>
        </div>
    );
}

export default ModalVerific;
