import "./styles.css";

import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';

import Button from "../../components/Button";

function Tarefas(){

    const logoPgcomp = "/assets/logopgcomp.png"; // Logo

    const tarefasData = [
        { id: 1, nome: 'Qualificação', prazo: 13, descricao: 'Apresentação e defesa do projeto de pesquisa.', titulacao: 'Mestrado' },
        { id: 2, nome: 'Carga Horária Básica', prazo: 18, descricao: 'Cumprir a carga horária mínima de disciplinas obrigatórias.', titulacao: 'Mestrado' },
        { id: 3, nome: 'Artigo', prazo: 24, descricao: 'Elaborar e submeter um artigo científico.', titulacao: 'Mestrado' },
        { id: 4, nome: 'Exame de Proficiência em Língua Estrangeira', prazo: 24, descricao: 'Aprovação em exame de proficiência em língua estrangeira.', titulacao: 'Doutorado' },
        { id: 5, nome: 'Estágio', prazo: 18, descricao: 'Concluir o estágio obrigatório.', titulacao: 'Doutorado' }
    ];

    /* Const Att Tarefas */
    const [tarefas, setTarefas] = useState(tarefasData);
    const [showModal, setShowModal] = useState(false);
    const [selectedTarefa, setSelectedTarefa] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTarefaNome, setEditTarefaNome] = useState('');
    const [editTarefaPrazo, setEditTarefaPrazo] = useState(0);
    const [editTarefaDescricao, setEditTarefaDescricao] = useState('');
    const [editTarefaTitulacao, setEditTarefaTitulacao] = useState('Mestrado');
    /* Const Add Tarefas */
    const [showAddModal, setShowAddModal] = useState(false);
    const [novaTarefaNome, setNovaTarefaNome] = useState('');
    const [novaTarefaPrazo, setNovaTarefaPrazo] = useState(0);
    const [novaTarefaDescricao, setNovaTarefaDescricao] = useState('');
    const [novaTarefaTitulacao, setNovaTarefaTitulacao] = useState('Mestrado');

    const tarefasMestrado = tarefas.filter(tarefa => tarefa.titulacao === 'Mestrado');
    const tarefasDoutorado = tarefas.filter(tarefa => tarefa.titulacao === 'Doutorado');

    const handleDelete = () => {
        const updatedTarefas = tarefas.filter(tarefa => tarefa.id !== selectedTarefa.id);
        setTarefas(updatedTarefas);
        setShowModal(false);
    }

    const handleEdit = () => {
        const updatedTarefas = tarefas.map(tarefa => {
            if (tarefa.id === selectedTarefa.id) {
                return {
                    ...tarefa,
                    nome: editTarefaNome,
                    prazo: editTarefaPrazo,
                    descricao: editTarefaDescricao,
                    titulacao: editTarefaTitulacao
                };
            }
            return tarefa;
        });
        setTarefas(updatedTarefas);
        setIsEditing(false);
        setSelectedTarefa(null);
    }

    const handleAddTarefa = () => {
        const newTarefa = {
            id: tarefas.length + 1,
            nome: novaTarefaNome,
            prazo: novaTarefaPrazo,
            descricao: novaTarefaDescricao,
            titulacao: novaTarefaTitulacao
        };
        setTarefas([...tarefas, newTarefa]);
        setShowAddModal(false);
        setNovaTarefaNome('');
        setNovaTarefaPrazo(0);
        setNovaTarefaDescricao('');
        setNovaTarefaTitulacao('Mestrado');
    }

    return (
        <div className='contain'>
            <div className='botoesTarefas'>
                {/* Botão retornar */}
                <button onClick={() => window.location.href = "/perfil-coordenador"} 
                            style={{right: '230px',width:'140px'}}>Voltar</button>
                {/* Botão Adicionar Tarefa */}
                <button onClick={() => setShowAddModal(true)} 
                    style={{ right: '400px',width:'130px'}}> Add Tarefa 
                </button>
            </div>


            <h3 style={{marginBottom:"3px", marginTop:'-10px'}}>Tarefas Mestrado</h3>
            {/* Container de Tarefas de Mestrado */}
            <div className='container-lista'>
                <ul>{tarefasMestrado.map(tarefa => (
                        <li key={tarefa.id} >
                            {/* Edição das tarefas */}
                        <div> {isEditing && selectedTarefa.id === tarefa.id ? (<>
                                <input 
                                        type="text" 
                                        value={editTarefaNome} 
                                        onChange={(e) => setEditTarefaNome(e.target.value)}
                                        placeholder="Nome da tarefa"
                                        style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                                <input 
                                        type="number" 
                                        value={editTarefaPrazo} 
                                        onChange={(e) => setEditTarefaPrazo(Number(e.target.value))}
                                        placeholder="Prazo em meses"
                                        style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                                <textarea 
                                        value={editTarefaDescricao} 
                                        onChange={(e) => setEditTarefaDescricao(e.target.value)}
                                        placeholder="Descrição"
                                        style={{ marginBottom: '10px', width: '100%', padding: '8px', height: '80px' }}/>
                                 <select 
                                        value={editTarefaTitulacao} 
                                        onChange={(e) => setEditTarefaTitulacao(e.target.value)}
                                        style={{ marginBottom: '10px', width: '100%', padding: '8px' }}>
                                    <option value="Mestrado">Mestrado</option>
                                    <option value="Doutorado">Doutorado</option>
                                    </select>
                                </>
                            ) : (
                                <>
                                    <strong>{tarefa.nome}</strong> - Prazo: {tarefa.prazo} meses<br />
                                    Descrição: {tarefa.descricao}
                                </>
                            )}
                        </div>
                        {/* Ação dos botões e ícones - salvar, editar e deletar*/}
                        <div >
                            {isEditing && selectedTarefa.id === tarefa.id ? (
                                <button onClick={handleEdit} style={{ marginRight: '10px', width:'120px',height:'30px' }}>
                                    Salvar
                                </button>
                            ) : (
                                <>
                                    <AiFillEdit style={{color: "#000000", padding:  '20px', cursor: 'pointer'}}
                                        onClick={() => {
                                            setIsEditing(true);
                                            setEditTarefaNome(tarefa.nome);
                                            setEditTarefaPrazo(tarefa.prazo);
                                            setEditTarefaDescricao(tarefa.descricao);
                                            setEditTarefaTitulacao(tarefa.titulacao);
                                            setSelectedTarefa(tarefa);
                                        }}  
                                        size={20}
                                    />
                                    <AiFillDelete style={{color: "#000000", cursor: 'pointer'}}
                                        onClick={() => {
                                            setSelectedTarefa(tarefa);
                                            setShowModal(true);
                                        }}
                                        size={20}  
                                    />
                                </>
                            )}
                        </div>
                    </li>
                    ))}
                </ul>
            </div>



            <h3 style={{marginBottom:"3px"}}>Tarefas Doutorado</h3>
            {/* Container de Tarefas de Doutorado */}
            <div className='container-lista'>
                <ul>
                    {tarefasDoutorado.map(tarefa => (
                        <li key={tarefa.id} >
                            {/* Edição das tarefas */}
                            <div> {isEditing && selectedTarefa.id === tarefa.id ? (<>
                                    <input 
                                            type="text" 
                                            value={editTarefaNome} 
                                            onChange={(e) => setEditTarefaNome(e.target.value)}
                                            placeholder="Nome da tarefa"
                                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                                    <input 
                                            type="number" 
                                            value={editTarefaPrazo} 
                                            onChange={(e) => setEditTarefaPrazo(Number(e.target.value))}
                                            placeholder="Prazo em meses"
                                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                                    <textarea 
                                            value={editTarefaDescricao} 
                                            onChange={(e) => setEditTarefaDescricao(e.target.value)}
                                            placeholder="Descrição"
                                            style={{ marginBottom: '10px', width: '100%', padding: '8px', height: '80px' }}/>
                                     <select 
                                            value={editTarefaTitulacao} 
                                            onChange={(e) => setEditTarefaTitulacao(e.target.value)}
                                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}>
                                        <option value="Mestrado">Mestrado</option>
                                        <option value="Doutorado">Doutorado</option>
                                        </select>
                                    </>
                                ) : (
                                    <> {/* Exibir em tela*/}
                                        <strong>{tarefa.nome}</strong> - Prazo: {tarefa.prazo} meses<br />
                                        Descrição: {tarefa.descricao}
                                    </>
                                )}
                            </div>
                            {/* Ação dos botões e ícones - salvar, editar e deletar*/}
                            <div >
                                {isEditing && selectedTarefa.id === tarefa.id ? (
                                    <button onClick={handleEdit} style={{ marginRight: '10px', width:'120px',height:'30px' }}>
                                        Salvar
                                    </button>
                                ) : (
                                    <>
                                        <AiFillEdit style={{color: "#000000", padding:  '20px', cursor: 'pointer'}}
                                            onClick={() => {
                                                setIsEditing(true);
                                                setEditTarefaNome(tarefa.nome);
                                                setEditTarefaPrazo(tarefa.prazo);
                                                setEditTarefaDescricao(tarefa.descricao);
                                                setEditTarefaTitulacao(tarefa.titulacao);
                                                setSelectedTarefa(tarefa);
                                            }}  
                                            size={20}
                                        />
                                        <AiFillDelete style={{color: "#000000", cursor: 'pointer'}}
                                            onClick={() => {
                                                setSelectedTarefa(tarefa);
                                                setShowModal(true);
                                            }}
                                            size={20}  
                                        />
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

                {/* Modal de Adicionar Tarefa */}
                {showAddModal && (
                <div className='confirmationBox'>
                    <div className='modal'style={{backgroundColor: '#fff'}}>
                        <p>Adicionar Nova Tarefa</p>
                        <input 
                            type="text" 
                            value={novaTarefaNome} 
                            onChange={(e) => setNovaTarefaNome(e.target.value)}
                            placeholder="Nome da tarefa"
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                        <input 
                            type="number" 
                            value={novaTarefaPrazo} 
                            onChange={(e) => setNovaTarefaPrazo(Number(e.target.value))}
                            placeholder="Prazo em meses"
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}/>
                        <textarea 
                            value={novaTarefaDescricao} 
                            onChange={(e) => setNovaTarefaDescricao(e.target.value)}
                            placeholder="Descrição"
                            style={{ marginBottom: '10px', width: '100%', padding: '8px', height: '80px' }}/>
                        <select 
                            value={novaTarefaTitulacao} 
                            onChange={(e) => setNovaTarefaTitulacao(e.target.value)}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                        >
                            <option value="Mestrado">Mestrado</option>
                            <option value="Doutorado">Doutorado</option>
                        </select>
                        <ul style={{display: 'flex'}}>
                            <button onClick={handleAddTarefa} style={{marginRight: '30px',padding: "10px" }}>Adicionar</button>
                            <button onClick={() => setShowAddModal(false)} style={{padding: "10px" }}>Cancelar</button>
                        </ul>
                    </div>
                </div>
            )}

            {/* Modal de confirmação exclusão*/}
            {showModal && (
                <div className='confirmation-box'>
                    <div className='modal' style={{backgroundColor: '#fff'}}>
                        <p>Tem certeza que deseja remover essa tarefa da lista?</p>
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

export default Tarefas;