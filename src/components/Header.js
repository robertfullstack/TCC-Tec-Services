import React, { useState, useEffect } from 'react';
import '../styles/Header.scss';
import { IoClose, IoMenu } from "react-icons/io5";
import { auth } from '../screens/firebase'; // Importe o Firebase Auth

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/'; // Redireciona para a página inicial após logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/cadastrologin'; // Redireciona para a página de login/cadastro
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <a href='/' style={{ textDecoration: 'none' }}>
            <h1>TecService</h1>
          </a>
        </div>
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="/Servico">Serviços</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
          {isLoggedIn ? (
            <button className="contact-button" onClick={handleLogout}>Sair</button>
          ) : (
            <button className="contact-button" onClick={handleLoginRedirect}>Fale Conosco</button>
          )}
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? (
            <IoClose size={50} />
          ) : (
            <IoMenu size={50} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
