import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalVerific from './clientes/ModalVerific';
import image from "../images/barbershop.jpg";
import imagenoivo from "../images/noivo.jpg";
import RegisterForm from './Registerform';
import LoginForm from './clientes/LoginForm';
import '../App.css';

function Home() {
    const [userType, setUserType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();

    useEffect(() => {
      const handleScroll = () => {
          const header = document.querySelector('header');
          if (window.scrollY > 0) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setUserType('');
    };

    const toggleFormType = () => {
        setFormType(formType === 'login' ? 'register' : 'login');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3002/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (data.exists) {
                if (data.tipo === 1) {
                    if (data.id_barbearia) {
                        navigate('/painelUsuario', { state: { userId: data.userId, userName: data.userName, id_barbearia: data.id_barbearia } });
                    } else {
                        navigate('/cadastrarBarbearia', { state: { userId: data.userId, userName: data.userName } });
                    }
                } else {
                    navigate('/dashboard', { state: { userId: data.userId, userName: data.userName } });
                }
            } else {
                setMensagem('Email ou senha incorreto.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserTypeSelection = (type) => {
        setUserType(type);
       
    };

    const handleOutsideClick = () => {
        if (modalOpen) {
            closeModal();
        }
    };

    return (
        <div className="App">
                   <header>
                <div className=" menu-left logo">
                    <h1>La firma</h1>
                    <ul className="menu-left">
                    <li> <a href="#">Sobre</a></li>
                        <li><a href="#">Contato</a></li>
                        <li><a href="#">Serviços</a></li>
                       </ul>
                   
                </div>
                <nav>
                    
                    <ul className="menu-right">
                        <li><button className="orange-button" onClick={openModal}>Entrar</button></li>
                    </ul>
                </nav>
            </header>
            <div className="background">
             
                <div className="welcome-message">
                    <h1>Bem-vindo à La Firma</h1>
                    <p>Seu lugar para cortes de cabelo, barba e muito mais!</p>
                    <button className="orange-button"onClick={openModal}>Entrar</button>
                </div>
            </div>

            {modalOpen && (
                <div className="modal" onClick={handleOutsideClick}>
                    <ModalVerific onSelectUserType={handleUserTypeSelection} />
                </div>
            )}

            {modalOpen && userType && (
                <div className="modal" onClick={handleOutsideClick}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {formType === 'login' ? (
                            <LoginForm
                                email={email}
                                senha={senha}
                                setEmail={setEmail}
                                setSenha={setSenha}
                                handleLogin={handleLogin}
                                mensagem={mensagem}
                                closeModal={closeModal}
                                toggleFormType={toggleFormType}
                            />
                        ) : (
                            <RegisterForm
                                closeModal={closeModal}
                                toggleFormType={toggleFormType}
                            />
                        )}
                    </div>
                </div>
            )}
      <main className="About">
        <div className='image-about'>
          <img src={image} alt='Imagem' />
        </div>
        <div className='text-about'>
          <h2>La Firma</h2>
          <h3>Música, Network e Brêja</h3>
          <p>
            Os consagrados cortes com tesoura, navalha e toalha quente estão de volta e provam que o bem estar da sua pele precisa estar em primeiro lugar. Além é claro, coloração, manicure, estética facial, relaxamento, selagem/progressiva e diversas opções de bebidas artesanais e bebidas quentes. Chegou a revolução da barba e você não vai querer ficar de fora!
          </p>
          <h3>Use #EstiloLafirma nas redes sociais.</h3>
          <a href='#'><button className='saibamais'> Conheça Mais</button></a>
        </div>
      </main>

      <section className="services">
        <h2>Serviços</h2>
        <p>Produtos escolhidos a dedo e profissionais de excelência</p>
        <p>Estamos prontos para atender as suas necessidades, enquanto você degusta aquela cerveja artesanal importada e bate papo com os amigos.</p>
        <div className="card-container">
          <div className="row">
            <div className="card">
              <img src={require('../icons/icon1.svg').default} alt="Ícone 1" />
              <h3>Bar / Petiscaria</h3>
              <p>Bebidas artesanais, bebidas quentes</p>
              <a href="#">Leia mais</a>
            </div>

            <div className="card">
              <img src={require('../icons/icon2.svg').default} alt="Ícone 1" />
              <h3>Barba</h3>
              <p>Trilhamos um caminho old school, por isso a navalha é a nossa companheira.</p>
              <a href="#">Leia mais</a>
            </div>

            <div className="card">
              <img src={require('../icons/icon3.svg').default} alt="Ícone 1" />
              <h3>Cabelo</h3>
              <p>Nossos profissionais vão te ajudar a escolher o corte que melhor encaixe no seu perfil.</p>
              <a href="#">Leia mais</a>
            </div>

            <div className="card">
              <img src={require('../icons/icon4.svg').default} alt="Ícone 1" />
              <h3>Coloração</h3>
              <p>O homem moderno não deseja apenas cobrir os fios brancos. É preciso ficar na moda.</p>
              <a href="#">Leia mais</a>
            </div>
          </div>
          <div className="row">
            <div className="card">
              <img src={require('../icons/icon5.svg').default} alt="Ícone 1" />
              <h3>ESTÉTICA FACIAL</h3>
              <p>O homem moderno deseja cada vez mais estar em dia com os cuidados com a pele.</p>
              <a href="#">Leia mais</a>
            </div>
            <div className="card">
              <img src={require('../icons/icon6.svg').default} alt="Ícone 1" />
              <h3>Manicure</h3>
              <p>Os cuidados com os pés e as mãos não devem ficar renegados apenas à higiene.</p>
              <a href="#">Leia mais</a>
            </div>
            <div className="card">
              <img src={require('../icons/icon7.svg').default} alt="Ícone 1" />
              <h3>Relaxamento</h3>
              <p>Foi-se o tempo em que apenas as mulheres desejavam manter os cabelos lisos e com vida.</p>
              <a href="#">Leia mais</a>
            </div>
            <div className="card">
              <img src={require('../icons/icon8.svg').default} alt="Ícone 1" />
              <h3>SELAGEM <br /> /PROGRESSIVA</h3>
              <p>O cabelo é fundamental em um visual de respeito!</p>
              <a href="#">Leia mais</a>
            </div>
          </div>
        </div>
      </section>

      <section className='news'>
        <div className='text-news'>
          <h2>La Firma</h2>
          <h3>Música, Network e Brêja</h3>
          <p>
            Os consagrados cortes com tesoura, navalha e toalha quente estão de volta e provam que o bem estar da sua pele precisa estar em primeiro lugar. Além é claro, coloração, manicure, estética facial, relaxamento, selagem/progressiva e diversas opções de bebidas artesanais e bebidas quentes. Chegou a revolução da barba e você não vai querer ficar de fora!
          </p>
          <h3>Use #EstiloLafirma nas redes sociais.</h3>
          <a href='#'><button className='saibamais'> Conheça Mais</button></a>
        </div>
        <div className='image-news'>
          <img src={imagenoivo} alt='Imagem' />
        </div>
      </section>
    </div>
  );
}

export default Home;
