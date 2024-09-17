import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Importando auth do firebase
import '../styles/Servico.scss';

function Servico() {
    const [selected, setSelected] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // Estado para guardar o usuário logado
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Se o usuário estiver logado, pegue o e-mail e guarde no estado
                setUser(user);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };

    const handleServiceRequest = () => {
        if (!isLoggedIn) {
            navigate('/cadastrologin');
        } else {
            // Lógica para solicitar o serviço se estiver logado
        }
    };

    const handleSolicitarServico = () => {
        if (user) {
            // Se o usuário estiver logado, execute a ação desejada
            console.log("Serviço solicitado!");
            navigate('/abrirChamado');
        } else {
            // Se o usuário não estiver logado, redirecione para a página de login
            navigate('/cadastrologin');
        }
    };

    const data = [
        {
            question: "Porque escolha nossa loja?",
            answer: "Todo aparelho eletrônico tem um tempo de vida especificado..."
        },
        {
            question: "Qual é a especialização da Assistência especializada em Celular?",
            answer: "Texto explicando a especialização da assistência especializada em celular."
        },
        {
            question: "Habilidades para consertos de celular",
            answer: "Texto explicando as habilidades necessárias para consertos de celular."
        },
        {
            question: "Quando procurar uma assistência especializada?",
            answer: "Texto explicando quando é necessário procurar uma assistência especializada."
        }
    ];

    return (
        <div className="servico-container">
            <h1 className="servico-title">Nossos Serviços</h1>

            {user && <p>Olá, {user.email}</p>} {/* Exibe o e-mail do usuário logado */}

            <div className="servico-list">
                <div className="servico-item">
                    <h2>Reparo de Computadores</h2>
                    <p>Diagnóstico e reparo para computadores desktop e laptops.</p>
                    <button className="solicitar-servico-btn" onClick={handleSolicitarServico}>Solicitar Serviço</button>
                </div>
                <div className="servico-item">
                    <h2>Manutenção de Redes</h2>
                    <p>Configuração e manutenção de redes para empresas e residências.</p>
                    <button className="solicitar-servico-btn" onClick={handleSolicitarServico}>Solicitar Serviço</button>
                </div>
                <div className="servico-item">
                    <h2>Instalação de Softwares</h2>
                    <p>Instalação e configuração de sistemas operacionais e softwares.</p>
                    <button className="solicitar-servico-btn" onClick={handleSolicitarServico}>Solicitar Serviço</button>
                </div>
            </div>

            <h1 className="produto-title">Nossos Produtos</h1>
            <div className="produto-list">
                <div className="produto-item">
                    <h2>Computadores</h2>
                    <p>Computadores desktop e laptops de alta performance.</p>
                    <button className="ver-produto-btn">Ver Produto</button>
                </div>
                <div className="produto-item">
                    <h2>Roteadores</h2>
                    <p>Roteadores de última geração para melhor conectividade.</p>
                    <button className="ver-produto-btn">Ver Produto</button>
                </div>
                <div className="produto-item">
                    <h2>Softwares</h2>
                    <p>Softwares originais e licenciados para diversas necessidades.</p>
                    <button className="ver-produto-btn">Ver Produto</button>
                </div>
            </div>

            <div className="servico-content">
                <div className="servico-image">
                    <img src="https://clickcel.com.br/images/conserto-carcaa.jpg" alt="Conserto de celular" />
                </div>
                <div className="servico-text">
                    <h1>Conserto de celular São Paulo</h1>
                    <p>A Novo Smart conta com equipe de profissionais com experiência e aptidão para consertar xiaomi, iphone, motorola, LG, Asus e samsung.</p>
                    <p>Temos uma estrutura completa para quem busca consertos de celulares em todo Brasil.</p>
                    <p>Arrume seu celular, tablet e smartwatch no mesmo dia! Tenha total garantia de serviço e <span className="highlight">privacidade</span>.</p>
                    <p>Sabia que qualidade e segurança são fatores importantes para nós? Sim, independentemente do modelo de seu smartphone.</p>
                    <button className="contact-btn">Fale Conosco agora!</button>
                </div>
            </div>

            <div className="faq-section">
                <h1 className="faq-title">Perguntas Frequentes</h1>
                <div className="accordion">
                    {data.map((item, i) => (
                        <div className="item" key={i}>
                            <div className="title" onClick={() => toggle(i)}>
                                <h2 style={{ color: 'black' }}>{item.question}</h2>
                                <span className="icon">{selected === i ? '-' : '+'}</span>
                            </div>
                            <div className={`content ${selected === i ? 'show' : ''}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Servico;
