import { useState, useEffect } from "react"; 
import "./styles.css";

import { MdEditNote, MdLogout } from 'react-icons/md'; // Importando os ícones
import { AiOutlineEdit , AiOutlineFileExcel } from 'react-icons/ai'; // Importando os ícones

function PerfilAluno() {
  const logoPgcomp = "assets/logopgcomp.png"; // Logo

  const dataDeInicio = new Date("2023-02-01"); // Data de Início do aluno

  const [dataAtual, setDataAtual] = useState(new Date()); // Data atual

  const [tarefas, setTarefas] = useState([
    { id: 1, nome: "Qualificacao", prazoMeses: 24, descricao: "Apresentação e defesa do projeto de pesquisa.", feita: false },
    { id: 2, nome: "Artigo", prazoMeses: 24, descricao: "Elaborar e submeter um artigo científico.", feita: false },
    { id: 3, nome: "Estágio", prazoMeses: 18, descricao: "Concluir o estágio obrigatório.", feita: false },
    { id: 4, nome: "Defesa", prazoMeses: 24, descricao: "", feita: false },
    { id: 5, nome: "Exame de Proficiência em Língua Estrangeira", prazoMeses: 16, descricao: "Aprovação em exame de proficiência em língua estrangeira.", feita: false },
    { id: 6, nome: "Carga Horária Básica", prazoMeses: 15, descricao: "Cumprir a carga horária mínima de disciplinas obrigatórias.", feita: false },
  ]);

  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(null);

  const handleCheckboxChange = (id) => {
    const updatedTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        if (tarefa.feita) {
          return { ...tarefa, feita: false, dataRealizacao: null };
        } else {
          setTarefaEmEdicao(id);
          return tarefa;
        }
      }
      return tarefa;
    });
    setTarefas(updatedTarefas);
  };

  const salvarDataRealizacao = (id) => {
    const updatedTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, feita: true, dataRealizacao: dataSelecionada };
      }
      return tarefa;
    });
    setTarefas(updatedTarefas);
    setTarefaEmEdicao(null); // Limpa o estado de tarefa em edição
    setDataSelecionada(null); // Limpa a data selecionada
  };

  const tarefasOrdenadas = [...tarefas].sort((a, b) => {
    const prazoA = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + a.prazoMeses, dataDeInicio.getDate());
    const prazoB = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + b.prazoMeses, dataDeInicio.getDate());
    return prazoA - prazoB;
  });

  const tarefasAFazer = tarefasOrdenadas.filter((tarefa) => !tarefa.feita);
  const tarefasFeitas = tarefasOrdenadas.filter((tarefa) => tarefa.feita);

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date());
    }, 86400000); // Atualiza a data atual todos os dias
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="contain">
      <header>
        <div className="containerAluno">
          <div className="infoAluno">
          <img src={logoPgcomp} alt="Logo" />
          <div className="boxInfoAluno">
            <h3>José  Silva José Silva</h3>
            <p><span>Titulação:</span> Mestrado/Doutorado</p>
            <p><span>Data de Inicio:</span> {dataDeInicio.toLocaleDateString()}</p>
            <p><span>Status:</span> Ativo</p>
          </div>
            <div className="boxInfoAluno">
              <h3><span>Matrícula:</span> xxxxxxxxx</h3>
              <p><span>Orientador(a): </span>Augusto Carlos</p>
              <p><span>Término Previsto:</span> {new Date(dataDeInicio.getFullYear() + 3, dataDeInicio.getMonth(), dataDeInicio.getDate()).toLocaleDateString()}</p>
            </div>
          </div>

            <div className="botoesToolbar">
              <MdEditNote onClick={() => window.location.href = "/atualizar-senha"} 
                style={{ cursor: 'pointer', marginRight:"40px" }} 
                size={35} 
                title="Atualizar dados" 
              />
              <MdLogout onClick={() => window.location.href = "/"} 
                style={{ cursor: 'pointer', marginRight:"40px" }} 
                size={35} 
                title="Sair" 
              />
            </div>
        </div>
      </header>


      <div className="tarefasAluno" >
        <div className="boxTarefas" >
          <h3 style={{ textAlign: "center" }}>TAREFAS A FAZER</h3>
          {tarefasAFazer.map((tarefa) => {
            const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
            const diasRestantes = Math.ceil((prazo - dataAtual) / (1000 * 60 * 60 * 24));
            let backgroundColor;
            if (diasRestantes <= 90) {
              backgroundColor = "rgba(240,128,128)"; 
            } else if (diasRestantes <= 180) {
              backgroundColor = "rgba(244,164,96, 0.8)";
            } else {
              backgroundColor = "rgba(255,237,160, 0.9)";
            }

            return (
              <div id="task" key={tarefa.id} style={{ backgroundColor: backgroundColor,}}>
                <AiOutlineEdit // Marcador icone
                  onClick={() => handleCheckboxChange(tarefa.id)}
                  style={{ cursor: 'pointer', marginLeft: '5px', marginRight: "10px" }}
                  size={20}  
                  title="Editar"
                />
                <label style={{marginLeft: "5px",fontSize: "18px",fontWeight: "500",}}>
                  {tarefa.nome}
                </label>
                {tarefaEmEdicao === tarefa.id && (
                  <>
                    <br />
                    <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                      Data de realização:
                      <input
                        type="date"
                        value={dataSelecionada}
                        onChange={(e) => setDataSelecionada(e.target.value)}
                        style={{ marginLeft: "25px" }}
                      />
                      <button onClick={() => salvarDataRealizacao(tarefa.id)} 
                      style={{marginLeft:"25px",width:'70px', height:'25px', borderRadius: '5px', fontSize: "13px"}}>Salvar</button>
                    </label>
                  </>
                )}
                <br></br>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  {tarefa.descricao}<br></br>
                </label>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  Data Limite: {prazo.toLocaleDateString()} - {diasRestantes} dias restantes
                </label>
              </div>
            );
          })}
        </div>

        <div className="boxTarefas">
          <h3 style={{ textAlign: "center" }}>TAREFAS REALIZADAS</h3>
          {tarefasFeitas.map((tarefa) => {
            const prazo = new Date(dataDeInicio.getFullYear(), dataDeInicio.getMonth() + tarefa.prazoMeses, dataDeInicio.getDate());
            return (
              <div id="task" key={tarefa.id}style={{backgroundColor: "rgb(135,206,250,0.8)",}}>
                <AiOutlineFileExcel // Marcador icone
                  onClick={() => handleCheckboxChange(tarefa.id)}
                  style={{ cursor: 'pointer' , marginLeft: "5px"  }}
                  size={20} 
                  title="Desfazer"
                />
                <label style={{marginLeft: "15px",fontSize: "18px",fontWeight: "500",}}>
                  {tarefa.nome}
                </label>
                <br></br>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                  {tarefa.descricao}<br></br>
                </label>
                <label style={{ marginLeft: "40px", fontSize: "15px" }}>
                    Realizada em: {new Date(tarefa.dataRealizacao).toLocaleDateString()}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PerfilAluno;