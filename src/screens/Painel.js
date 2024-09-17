import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword, ref, set } from './firebase';
import '../styles/Painel.scss';

const Painel = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login bem-sucedido!");
      setError('');

      navigate('/servico'); // Redirect to /home after successful login
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvando os dados do usuário no Firebase Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        name,
        email
      });

      setSuccess("Registro bem-sucedido!");
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="painel-container" style={{ marginTop: '200px' }}>
      <div className="form-toggle">
        <button onClick={handleToggleForm} className={isLogin ? "active" : ""}>Login</button>
        <button onClick={handleToggleForm} className={!isLogin ? "active" : ""}>Registro</button>
      </div>

      {isLogin ? (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">Entrar</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      ) : (
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Registro</h2>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">Registrar</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      )}
    </div>
  );
};

export default Painel;
