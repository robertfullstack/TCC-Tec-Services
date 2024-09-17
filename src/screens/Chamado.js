import React, { useState } from 'react';
import { database, ref, set } from '../screens/firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/Chamado.scss';

export const Chamado = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [desiredDate, setDesiredDate] = useState('');
    const [preferredTechnician, setPreferredTechnician] = useState('');
    const [image, setImage] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [repairDetails, setRepairDetails] = useState('');
    const [suggestionImages, setSuggestionImages] = useState([]); // Novo estado para imagens das sugestões


    const handleSubmit = async (e) => {
        e.preventDefault();

        const chamadoData = {
            name,
            phone,
            serviceType,
            desiredDate,
            preferredTechnician,
            image: '', // Inicialmente vazio
            repairDetails // Adicionar detalhes de reparo
        };

        try {
            if (image) {
                const storage = getStorage();
                const imageRef = storageRef(storage, `images/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                const imageUrl = await getDownloadURL(imageRef);
                chamadoData.image = imageUrl;
            }

            const newChamadoRef = ref(database, 'Chamados/' + Date.now());
            await set(newChamadoRef, chamadoData);
            console.log('Chamado salvo com sucesso!');

            // Atualizar sugestões e imagens baseadas no tipo de serviço e detalhes de reparo
            let newSuggestions = [];
            let newSuggestionImages = [];
            if (serviceType === 'Reparo de Computadores') {
                if (repairDetails === 'HD não está funcionando') {
                    newSuggestions = [
                        'Peça de reposição: HD',
                        'Software de diagnóstico: AIDA64'
                    ];
                    newSuggestionImages = [
                        'https://blogdocftv.com/wp-content/uploads/2018/04/hd-seagate-skyhalk.png',
                        'https://store-images.microsoft.com/image/apps.3123.13510798884987542.689d0953-1168-4bc4-8942-23b988b99331.cb456ed4-e854-4ade-b494-f3ebe3f7cfe5'
                    ];
                } else if (repairDetails === 'Computador está lento') {
                    newSuggestions = [
                        'Peça de reposição: Memória RAM Kingston Fury',
                        'Software de limpeza: CCleaner'
                    ];
                    newSuggestionImages = [
                        'https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages.kabum.com.br%2Fprodutos%2Ffotos%2F503027%2Fmemoria-kingston-fury-renegade-rgb-96gb-2x48gb-6400mt-s-ddr5-cl32-dimm-prata-xmp-kf564c32rsak2-96_1698692059_g.jpg&w=640&q=100',
                        'https://img.utdstc.com/icon/b11/a66/b11a66fbf96d4c79ac0b6c66ecef89c454ff5a604724e1969e7ec945504ecc57:200'
                    ];
                } else if (repairDetails === 'Problemas de inicialização') {
                    newSuggestions = [
                        'Peça de reposição: HD',
                        'Software de diagnóstico: AIDA64'
                    ];
                    newSuggestionImages = [
                        'https://blogdocftv.com/wp-content/uploads/2018/04/hd-seagate-skyhalk.png',
                        'https://store-images.microsoft.com/image/apps.3123.13510798884987542.689d0953-1168-4bc4-8942-23b988b99331.cb456ed4-e854-4ade-b494-f3ebe3f7cfe5'
                    ];
                } else if (repairDetails === 'Outro') {
                    newSuggestions = [
                        'Peça de reposição: HD',
                        'Peça de reposição: Memória RAM',
                        'Software de diagnóstico: AIDA64'
                    ];
                    newSuggestionImages = [
                        'https://example.com/hd-image.jpg',
                        'https://example.com/ram-image.jpg',
                        'https://example.com/aida64-image.jpg'
                    ];
                }
            } else if (serviceType === 'Manutenção de Redes') {
                if (repairDetails === 'Problemas de conexão') {
                    newSuggestions = [
                        'Peça de reposição: Roteador',
                        'Software de diagnóstico de rede: Wireshark'
                    ];
                    newSuggestionImages = [
                        'https://cdn.shopify.com/s/files/1/0170/0955/products/roteador-ac-1200mbps-tp-link-tl-wr840n_1024x1024.jpg?v=1606889645',
                        'https://www.wireshark.org/assets/images/wireshark.png'
                    ];
                } else if (repairDetails === 'Rede lenta') {
                    newSuggestions = [
                        'Peça de reposição: Switch de Rede',
                        'Software de otimização de rede: NetLimiter'
                    ];
                    newSuggestionImages = [
                        'https://22536.cdn.simplo7.net/static/22536/sku/eletronicos-switch-de-rede-switch-de-rede-8-portas-mercusys-10-100mbps-p-1675258162424.jpg',
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SvsUrR8LnhSe2YwxSbem4FhMYg66FZOewA&s'
                    ];
                } else if (repairDetails === 'Falha de hardware') {
                    newSuggestions = [
                        'Peça de reposição: Placa de Rede',
                        'Software de diagnóstico de hardware: HWMonitor'
                    ];
                    newSuggestionImages = [
                        'https://images-na.ssl-images-amazon.com/images/I/61SJPVbby2L._AC_SL1500_.jpg',
                        'https://www.cpuid.com/medias/images/hwmonitor.png'
                    ];
                } else if (repairDetails === 'Outro') {
                    newSuggestions = [
                        'Peça de reposição: Roteador',
                        'Peça de reposição: Switch de Rede',
                        'Software de diagnóstico de rede: Wireshark'
                    ];
                    newSuggestionImages = [
                        'https://cdn.shopify.com/s/files/1/0170/0955/products/roteador-ac-1200mbps-tp-link-tl-wr840n_1024x1024.jpg?v=1606889645',
                        'https://cdn.shopify.com/s/files/1/0170/0955/products/switch-de-rede-tp-link-tl-sf1005d_1024x1024.jpg?v=1606889645',
                        'https://www.wireshark.org/assets/images/wireshark.png'
                    ];
                }
            } else if (serviceType === 'Instalação de Softwares') {
                if (repairDetails === 'Software não está funcionando') {
                    newSuggestions = [
                        'Reinstalar software',
                        'Verificar compatibilidade de sistema'
                    ];
                    newSuggestionImages = [
                        'https://www.example.com/software-installation.jpg',
                        'https://www.example.com/system-compatibility.jpg'
                    ];
                } else if (repairDetails === 'Erro de instalação') {
                    newSuggestions = [
                        'Verificar requisitos do sistema',
                        'Baixar versão correta do software'
                    ];
                    newSuggestionImages = [
                        'https://www.example.com/system-requirements.jpg',
                        'https://www.example.com/download-software.jpg'
                    ];
                } else if (repairDetails === 'Licença não válida') {
                    newSuggestions = [
                        'Atualizar licença',
                        'Contatar suporte do software'
                    ];
                    newSuggestionImages = [
                        'https://manuaisti.anac.gov.br/windows/img/win10-install03.png?style=centershadow',
                        'https://filestore.community.support.microsoft.com/api/images/cb166710-e73b-4260-8c10-9140bd74dfae?upload=true'
                    ];
                } else if (repairDetails === 'Outro') {
                    newSuggestions = [
                        'Reinstalar software',
                        'Verificar compatibilidade de sistema',
                        'Atualizar licença'
                    ];
                    newSuggestionImages = [
                        'https://www.example.com/software-installation.jpg',
                        'https://www.example.com/system-compatibility.jpg',
                        'https://www.example.com/license-update.jpg'
                    ];
                }
            }


            setSuggestions(newSuggestions);
            setSuggestionImages(newSuggestionImages);
            setSubmissionSuccess(true);
        } catch (error) {
            console.error('Erro ao salvar chamado:', error);
        }

        setName('');
        setPhone('');
        setServiceType('');
        setDesiredDate('');
        setPreferredTechnician('');
        setImage(null);
        setRepairDetails('');
    };


    const formatPhone = (value) => {
        const cleanValue = value.replace(/\D/g, '');

        const formattedPhone = cleanValue.replace(/(\d{2})(\d{1})(\d{0,4})(\d{0,4})/, '($1) $2$3-$4');

        return formattedPhone.substring(0, 15);
    };
    const handlePhoneChange = (e) => {
        setPhone(formatPhone(e.target.value));
    };

    return (
        <div className="chamado-container">
            {!submissionSuccess ? (
                <div>
                    <h1>Formulário de Pedido</h1>
                    <form onSubmit={handleSubmit} className="chamado-form">
                        <div className="form-group">
                            <label htmlFor="name">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Número de Telefone:</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="serviceType">Tipo de Serviço:</label>
                            <select
                                id="serviceType"
                                value={serviceType}
                                onChange={(e) => {
                                    setServiceType(e.target.value);
                                    // Limpar detalhes de reparo ao mudar o tipo de serviço
                                    setRepairDetails('');
                                }}
                                required
                            >
                                <option value="">Selecione um serviço</option>
                                <option value="Reparo de Computadores">Reparo de Computadores</option>
                                <option value="Manutenção de Redes">Manutenção de Redes</option>
                                <option value="Instalação de Softwares">Instalação de Softwares</option>
                            </select>
                        </div>
                        {serviceType && (
                            <div className="form-group">
                                <label htmlFor="repairDetails">Detalhes do Problema:</label>
                                <select
                                    id="repairDetails"
                                    value={repairDetails}
                                    onChange={(e) => setRepairDetails(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione um detalhe</option>
                                    {serviceType === 'Reparo de Computadores' && (
                                        <>
                                            <option value="HD não está funcionando">HD não está funcionando</option>
                                            <option value="Computador está lento">Computador está lento</option>
                                            <option value="Problemas de inicialização">Problemas de inicialização</option>
                                            <option value="Outro">Outro</option>
                                        </>
                                    )}
                                    {serviceType === 'Manutenção de Redes' && (
                                        <>
                                            <option value="Problemas de conexão">Problemas de conexão</option>
                                            <option value="Rede lenta">Rede lenta</option>
                                            <option value="Falha de hardware">Falha de hardware</option>
                                            <option value="Outro">Outro</option>
                                        </>
                                    )}
                                    {serviceType === 'Instalação de Softwares' && (
                                        <>
                                            <option value="Software não está funcionando">Software não está funcionando</option>
                                            <option value="Erro de instalação">Erro de instalação</option>
                                            <option value="Licença não válida">Licença não válida</option>
                                            <option value="Outro">Outro</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="desiredDate">Data Pretendida Para Resolução do Problema:</label>
                            <input
                                type="date"
                                id="desiredDate"
                                value={desiredDate}
                                onChange={(e) => setDesiredDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preferredTechnician">Preferência Por Técnico (Não obrigatório):</label>
                            <input
                                type="text"
                                id="preferredTechnician"
                                value={preferredTechnician}
                                onChange={(e) => setPreferredTechnician(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Imagem:</label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <button type="submit" className="submit-button">Enviar</button>
                    </form>
                </div>
            ) : (
                <div style={{ width: '60%', margin: 'auto' }}>

                    <h1>Chamado Registrado com Sucesso!</h1>
                    <p>Aqui estão os detalhes do seu chamado:</p>
                    <div className="chamado-details">
                        {/* FAZER RENDERIZAR AS INFORMAÇÕES SOBRE O CHAMADO AQUI!! POR QUE NÃO ESTÁ APARECENDO! */}
                        <p><strong>Responsável:</strong> </p>
                        <p><strong>Número de Contato:</strong></p>
                        <p><strong>Tipo de Serviço:</strong> </p>
                        <p><strong>Detalhes do Problema:</strong> </p>
                        <p><strong>Data Pretendida:</strong> </p>
                        <p><strong>Preferência por Técnico:</strong> </p>
                        {image && <p><strong>Imagem:</strong> <a href={image} target="_blank" rel="noopener noreferrer">Visualizar Imagem</a></p>}
                    </div>
                    <p>- Temos algumas sugestões para você:</p>
                    {/* CODE ANTIGO: CASO EU PRECISA... ESSE ESTÁ SEM IMAGEM!! */}
                    {/* <ul>
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul> */}

                    <ul className="suggestions-list" style={{ display: 'grid', gridTemplateColumns: '5fr 5fr', margin: 'auto', justifyContent: 'center' }}>
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>
                                <p>{suggestion}</p>
                                {suggestionImages[index] && (
                                    <img src={suggestionImages[index]} alt={`Sugestão ${index + 1}`} className="suggestion-image" style={{ width: '60%', margin: 'auto', display: 'flex' }} />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Chamado;
