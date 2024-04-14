import React from 'react';
import { useNavigate } from 'react-router-dom';

import './pagamento.css';

function PagamentoCliente({ props }) {
    return (
        <div className="App">
            <h2>Bem vindo a nossa plataforma, por favor selecione a barbearia desejada e cartão para Pagamento</h2>

            <div class="payment-main-wrapper">
                <div className="user-card-info-wrapper">
                    <div class="header">
                        <p className="header-info">
                            <span>Dados do titular do cartão</span>
                        </p>
                    </div>
                    <form className="credit-card-info">
                        <label for="card-number">Número do cartão</label>
                        <div className="credit-card-number">
                            <input type="number" name="card-number" id="card-number"/>
                        </div>

                        <div className="validity-and-sc">
                            <div className="validity">
                                <label for="card-validity">Validade</label>
                                <input type="number" name="card-validity" id="card-validity" placeholder="MM/AA"/>
                            </div>

                            <div className="security-code">
                                <label for="card-security-code">Código de segurança</label>
                                <div className="card-security-code-input-and-icon">
                                    <input type="number" name="card-security-code" id="card-security-code" placeholder="CVV"/>
                                </div>
                            </div>
                        </div>
                        <label for="name">Nome completo</label>
                        <input type="text" name="name" id="name"/>

                        <label for="cpf">CPF</label>
                        <input type="number" name="cpf" id="cpf" placeholder="___-___-___-__"/>

                        <div className="phone-and-birthday">
                                <div className="phone">
                                    <label for="card-validity">Telefone</label>
                                    <input type="number" name="phone" id="phone" placeholder="(__) _____ - ____"/>
                                </div>
                                <div className="birthday">
                                    <label for="card-validity">Data de nascimento</label>
                                    <input type="number" name="phone" id="phone" placeholder="DD/MM/AAAA"/>
                                </div>
                        </div>

                        <label for="parcela">Plano</label>
                        <select name='plano' id="parcela">
                                <option value="0">Plano Gold</option>
                                <option  value="1">Plano Prime</option>
                                <option  value="2">Plano Gold</option>
                        </select>

                        <label for="parcela">Barbearia</label>
                        <select name='barbearia' id="parcela">
                                <option value="0">Barbearia x</option>
                                <option  value="1">Barbearia y</option>
                                <option  value="2">Barbearia k</option>
                                <option  value="3">Barbearia P</option>
                        </select>

                        <input type='submit' value='confirmar' id="finish-payment"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PagamentoCliente;