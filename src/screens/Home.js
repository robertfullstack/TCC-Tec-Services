import React from "react";
import '../styles/Home.scss';
import { FaTools, FaMobileAlt, FaSyncAlt, FaShoppingCart, FaEnvelope, FaStar } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem-vindo à TecService</h1>
        <p>Sua solução para consertos e assistência técnica de dispositivos móveis.</p>
      </header>

      <section className="services-section">
        <h2>Nossos Serviços</h2>
        <div className="services-list">
          <div className="service-item">
            <FaTools className="service-icon" />
            <h3>Agendamento de Consertos</h3>
            <p>Agende consertos para dispositivos móveis de forma rápida e prática.</p>
          </div>
          <div className="service-item">
            <FaMobileAlt className="service-icon" />
            <h3>Troca de Tela</h3>
            <p>Especialistas em troca de tela para smartphones e tablets.</p>
          </div>
          <div className="service-item">
            <FaSyncAlt className="service-icon" />
            <h3>Atualização de Software</h3>
            <p>Atualize seu sistema operacional para a versão mais recente.</p>
          </div>
          <div className="service-item">
            <FaShoppingCart className="service-icon" />
            <h3>Compra de Peças</h3>
            <p>Compre peças de reposição originais e de alta qualidade.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Sobre Nós</h2>
        <p>
          A TecService é especializada em assistência técnica para dispositivos móveis, oferecendo soluções rápidas, eficientes e de alta qualidade. Nossa equipe de especialistas está pronta para resolver qualquer problema que você tenha, desde a troca de telas até a atualização de software. Nosso objetivo é garantir que seus dispositivos estejam sempre funcionando perfeitamente, para que você possa se concentrar no que realmente importa.
        </p>
      </section>

      <section className="testimonials-section">
        <h2>Depoimentos de Clientes</h2>
        <div className="testimonials-list">
          <div className="testimonial-item">
            <h4>João Silva</h4>
            <p>"Serviço excelente! Meu celular voltou a funcionar como novo. Recomendo a TecService a todos."</p>
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
          </div>
          <div className="testimonial-item">
            <h4>Maria Oliveira</h4>
            <p>"Atendimento rápido e eficiente. Consegui agendar o conserto no mesmo dia. Muito satisfeita!"</p>
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
          </div>
          <div className="testimonial-item">
            <h4>Pedro Santos</h4>
            <p>"Peças de alta qualidade e preços justos. A TecService é a melhor assistência técnica que já usei."</p>
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Fale Conosco</h2>
        <p>Entre em contato conosco para mais informações ou para agendar um serviço.</p>
        <button className="contact-button">
          <FaEnvelope className="button-icon" /> Contato
        </button>
      </section>

      <footer className="footer">
        <p>&copy; 2024 TecService. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
