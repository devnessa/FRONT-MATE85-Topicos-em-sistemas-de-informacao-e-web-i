import { useState } from 'react';
import "./styles.css"
import Button from "../../components/ButtonPrimary";
import { MdGroupAdd, MdLogout } from 'react-icons/md'; // Importando os ícones

function PerfilOrientador(){

    const logoPgcomp = "assets/logopgcomp.png"; // Logo

    const alunosData = [
        { id: 1, nome: 'João Silva', matricula: '2022001', titulacao: 'Mestrado', datafinal: '03/05/2024' },
        { id: 2, nome: 'Tauane Souza', matricula: '2022002', titulacao: 'Doutorado', datafinal: '03=18/05/2027' },
        { id: 3, nome: 'Mario Souza', matricula: '2022003', titulacao: 'Mestrado', datafinal: '15/05/2024' },
        { id: 4, nome: 'Ana Clara', matricula: '2022004', titulacao: 'Doutorado', datafinal: '03/07/2027' },
        { id: 5, nome: 'Pedro Henrique', matricula: '2022005', titulacao: 'Mestrado', datafinal: '03/012/2025' },
        { id: 6, nome: 'Carlos Eduardo', matricula: '2022006', titulacao: 'Doutorado', datafinal: '03/05/2026' },
        { id: 7, nome: 'Roberta Santos', matricula: '2022007', titulacao: 'Mestrado', datafinal: '03/08/2025' }
    ];

    const [alunos, setAlunos] = useState(alunosData);
    const [showModal, setShowModal] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState(null);

    const handleDoubleClick = (matricula) => {
        const aluno = alunos.find(aluno => aluno.matricula === matricula);
        if (aluno) {
            window.open(`/perfil-aluno`);
        }
    }

    const handleDelete = () => {
        const updatedAlunos = alunos.filter(aluno => aluno.id !== selectedAluno.id);
        setAlunos(updatedAlunos);
        setShowModal(false);
    }

    // Separa os alunos baseados na titulação
    const alunosMestrado = alunos.filter(aluno => aluno.titulacao === 'Mestrado');
    const alunosDoutorado = alunos.filter(aluno => aluno.titulacao === 'Doutorado');

    return (
        <div className='contain'>
            <header>    
                <div className='containerOrientador'>
                    {/* Logo */}
                    <img src={logoPgcomp}/>
                    {/* Informações do perfil */}
                    <div className='infoOrientador' style={{justifyContent:"space-between"}}>
                        <div>
                            <h2>Augusto Carlos Santos</h2>
                            <h3>Orientandos: {alunos.length}</h3>
                        </div>
                        {/* Botões */}
                        <div className="botoesToolbar" >
                            <div >
                                <MdGroupAdd 
                                onClick={() => window.location.href = "/perfil-coordenador/solicitacoes"} 
                                style={{ cursor: 'pointer', marginRight: "40px" }}
                                size={35} 
                                title="Solicitações" 
                                />
                            </div>
                            <div >
                                <MdLogout 
                                onClick={() => window.location.href = "/"} 
                                style={{ cursor: 'pointer', marginRight: "40px" }}
                                size={35} 
                                title="Sair" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <h2 style={{textAlign:'center', marginTop:'160px', }}>Lista de Orientandos</h2>

            {/* Container de Alunos Orientados - Mestrado */}
            <div className='containerOrientadorOrientandos'>
                <h3 style={{textAlign: 'center', marginBottom: '10px'}}>Alunos de Mestrado</h3>
                <ul>
                    {alunosMestrado.map(aluno => (
                        <li style={{ cursor:'pointer',padding: '7px 20px'}}
                        key={aluno.id} 
                            onDoubleClick={() => handleDoubleClick(aluno.matricula)}>
                            <div>
                                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula} - Titulação: {aluno.titulacao}<br />
                                Conclusão prevista em {aluno.datafinal}
                            </div>
                            <div >
                            <button onClick={() => handleDoubleClick(aluno.matricula)}
                                    style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                        Abrir
                                </button>
                                <button onClick={() => {
                                    setSelectedAluno(aluno);
                                    setShowModal(true);
                                }} style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Container de Alunos Orientados - Doutorado */}
            <div className='containerOrientadorOrientandos' style={{marginTop:'30px'}}>
                <h3 style={{textAlign: 'center', marginBottom: '10px'}}>Alunos de Doutorado</h3>
                <ul>
                    {alunosDoutorado.map(aluno => (
                        <li style={{ cursor:'pointer',padding: '7px 20px'}}
                        key={aluno.id} 
                            onDoubleClick={() => handleDoubleClick(aluno.matricula)}>
                            <div>
                                <strong>{aluno.nome}</strong> - Matrícula: {aluno.matricula} - Titulação: {aluno.titulacao}<br />
                                Conclusão prevista em {aluno.datafinal}
                            </div>
                            <div >
                            <button onClick={() => handleDoubleClick(aluno.matricula)}
                                    style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                        Abrir
                                </button>
                                <button onClick={() => {
                                    setSelectedAluno(aluno);
                                    setShowModal(true);
                                }} style={{marginRight: '10px', height:'30px', borderRadius:'5px', width:'95px', fontSize: '13px'}}>
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal de confirmação */}
            {showModal && (
                <div className='confirmationBox'>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                        borderRadius: '8px',
                        width: '300px',
                        textAlign: 'center',
                    }}>
                        <p>Tem certeza que deseja remover esse aluno da sua lista?</p>
                        <ul style={{display: 'flex'}}>
                            <button onClick={handleDelete} style={{marginRight: '30px',padding: "10px" }}>Sim</button>
                            <button onClick={() => setShowModal(false)} style={{padding: "10px" }}>Não</button>
                        </ul>
                    </div>
                </div>
            )}

        </div>
    )
}

export default PerfilOrientador;