import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from '../screens/firebase'; // Certifique-se de importar onValue corretamente

const ScreenAdmin = () => {
    const [chamados, setChamados] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');

    // Função para verificar as credenciais
    const handleLogin = (e) => {
        e.preventDefault();

        if (email === 'robert@gmail.com' && password === 'robert') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Email ou senha incorretos.');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Referência ao nó 'Chamados' no Firebase
            const chamadosRef = ref(database, 'Chamados');

            // Escuta as mudanças nos dados
            const unsubscribe = onValue(chamadosRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Converte os dados em um array
                    const chamadosArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setChamados(chamadosArray);
                } else {
                    setChamados([]);
                }
            });

            // Limpa o listener quando o componente desmonta
            return () => unsubscribe();
        }
    }, [isAuthenticated]);

    return (
        <div className="screen-admin">
            {!isAuthenticated ? (
                <div className="login-container">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="submit-button">Entrar</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Lista de Chamados</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Número de Telefone</th>
                                <th>Tipo de Serviço</th>
                                <th>Data Pretendida</th>
                                <th>Técnico Preferencial</th>
                                <th>Imagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chamados.map((chamado) => (
                                <tr key={chamado.id}>
                                    <td>{chamado.name}</td>
                                    <td>{chamado.phone}</td>
                                    <td>{chamado.serviceType}</td>
                                    <td>{chamado.desiredDate}</td>
                                    <td>{chamado.preferredTechnician}</td>
                                    <td>
                                        {chamado.image ? <img src={URL.createObjectURL(new Blob([chamado.image], { type: 'image/jpeg' }))} alt="Chamado" width="100" /> : 'Sem Imagem'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ScreenAdmin;
