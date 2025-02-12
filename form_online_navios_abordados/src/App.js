import React, { useEffect, useState } from "react";
import axios from "axios";
import OperacaoTable from "./components/OperacaoTable";
import NaviosTable from "./components/NaviosTable";
import DadosTable from "./components/DadosTable";
import "./App.css";
import * as XLSX from "xlsx"; // Para exportação

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR6IEKVLswVSPSlD5qKBtbTqwj7ciZOhr40a84inuVTeeXIyC8KueX8IaVW2tILpaVxp5p2OsoxBi6g/pub?output=csv";
const GOOGLE_SHEET_CONFIG_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmY3QHsDgxr-YD_5pvQla3QqEv54ek8sqB1HolsYgfOaFpTT7huZI-E7EVtt_TV0hD0Jq52j46y4vn/pub?gid=481503026&single=true&output=csv";

function App() {
  // Estados com persistência via localStorage
  const [dadosOperacao, setDadosOperacao] = useState(() => {
    const saved = localStorage.getItem("dadosOperacao");
    return saved ? JSON.parse(saved) :  ["", "", "", "", ""];
  });
  const [dadosSelecionados, setDadosSelecionados] = useState(() => {
    const saved = localStorage.getItem("dadosSelecionados");
    return saved ? JSON.parse(saved) : [];
  });
  const [dadosNavios, setDadosNavios] = useState([]);
  const [filtros, setFiltros] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [config, setConfig] = useState({
    nacionalidadeEntidade: [],
    operacoes: [],
    entidades: [],
    tiposEntidade: [],
    situacoes: [],
    tiposEmbarcacao: [],
  });

  // Estado para formato de localização ativo ("GG", "GGMM" ou "GGMMSS")
  //const [activeLocationFormat, setActiveLocationFormat] = useState("GG");

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await axios.get(GOOGLE_SHEET_CONFIG_URL);
        const linhas = response.data.split("\n").map((linha) => linha.split(","));
        const dados = linhas.slice(1); // Remove o cabeçalho
        setConfig({
          nacionalidadeEntidade: dados.map((row) => row[0]).filter(Boolean),
          operacoes: dados.map((row) => row[2]).filter(Boolean),
          entidades: dados.map((row) => row[4]).filter(Boolean),
          tiposEntidade: dados.map((row) => row[6]).filter(Boolean),
          situacoes: dados.map((row) => row[8]).filter(Boolean),
          tiposEmbarcacao: dados.map((row) => row[10]).filter(Boolean),
        });
      } catch (error) {
        console.error("Erro ao buscar configuração:", error);
        setError("Falha ao carregar configurações.");
      }
    }
    async function fetchNavios() {
      try {
        const response = await axios.get(GOOGLE_SHEET_URL);
        const linhasNavios = response.data.split("\n").map((linha) => linha.split(","));
        setDadosNavios(linhasNavios);
      } catch (error) {
        console.error("Erro ao buscar dados dos navios:", error);
        setError("Falha ao carregar dados dos navios.");
      }
    }
    Promise.all([fetchConfig(), fetchNavios()]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("dadosOperacao", JSON.stringify(dadosOperacao));
  }, [dadosOperacao]);
  useEffect(() => {
    localStorage.setItem("dadosSelecionados", JSON.stringify(dadosSelecionados));
  }, [dadosSelecionados]);

  const handleFiltroChange = (e, colunaIndex) => {
    const valor = e.target.value;
    setFiltros((prev) => ({ ...prev, [colunaIndex]: valor }));
  };

  const dadosFiltrados = dadosNavios.filter((linha, i) => {
    if (i === 0) return true; // Cabeçalho permanece
    return linha.every((celula, j) => {
      const filtro = filtros[j];
      if (!filtro) return true;
      const valorCelula = celula ? String(celula).toLowerCase() : "";
      return valorCelula.includes(filtro.toLowerCase());
    });
  });

  const adicionarAoDadostable = (linha) => {
    if (
      linha[0] &&
      linha[0].trim().toLowerCase() === "nome da embarcação".toLowerCase()
    ) {
      return;
    }
    setDadosSelecionados((prev) => [
      ...prev,
      {
        nomeEmbarcacao: linha[0],
        tipoDeTask: "",
        numRegisto: linha[1],
        numMatricula: linha[2],
        tipoEmbarcacao: linha[3],
        nacionalidade: linha[4],
        nomeMestre: linha[5],
        ilha: linha[6],
        licenca: linha[7],
        // Inicialmente, os campos de localização ficam vazios.
        localizacaoGG: "",
        localizacaoGGMM: "",
        localizacaoGGMMSS: "",
        // Utilizamos os campos latitude e longitude para a entrada do usuário.
        latitude: "",
        longitude: "",
        situacao: "",
        tipoInfracao: "",
        medidasTomadas: "",
        //outrasAgencias: "",
        observacoes: "",
        disabled: false,
        data: new Date().toISOString().substring(0, 10),
        hora: new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      },
    ]);
  };

  const handleCellEdit = (e, rowIndex, cellKey) => {
    const novoValor = e.target.innerText;
    setDadosSelecionados((prev) => {
      const novosDados = [...prev];
      novosDados[rowIndex][cellKey] = novoValor;
      return novosDados;
    });
  };

  const updateCellValue = (rowIndex, field, value) => {
    setDadosSelecionados((prev) => {
      const novosDados = [...prev];
      novosDados[rowIndex][field] = value;
      return novosDados;
    });
  };

  const updateRowDisabled = (rowIndex, status) => {
    setDadosSelecionados((prev) => {
      const novosDados = [...prev];
      novosDados[rowIndex].disabled = status;
      return novosDados;
    });
  };

  const removerLinha = (rowIndex) => {
    setDadosSelecionados((prev) =>
      prev.filter((_, index) => index !== rowIndex)
    );
  };

  const resetarDados = () => {
    if (
      window.confirm("Tem certeza que deseja resetar os dados e começar do zero?")
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

// Função de conversão: recebe o valor da localização (ex.: "12,34 N" ou "12 34,56 N")
// e retorna o formato (-)ggmm,mm (para latitude) ou (-)gggmm,mm (para longitude)
// Detecta o formato da coordenada (GG,GG H | GG MM,MM H | GG MM SS H)
const detectFormat = (value) => {
  if (!value) return null;
  const trimmed = value.trim().replace(",", "."); // Substituir "," por "."
  const parts = trimmed.split(" ");

  if (parts.length < 2) return null; // Precisa pelo menos de graus e hemisfério

  const numericPart = parts.slice(0, parts.length - 1).join(" "); // Remove o hemisfério
  const numericParts = numericPart.split(" ");

  if (numericParts.length === 1 && numericParts[0].includes(".")) {
    return "GG"; // Exemplo: "12,34 N"
  } else if (numericParts.length === 2 && numericParts[1].includes(".")) {
    return "GGMM"; // Exemplo: "12 34,56 N"
  } else if (numericParts.length === 3) {
    return "GGMMSS"; // Exemplo: "12 34 56 N"
  }
  return null;
};

// Converte a coordenada detectada para (-)ggmm,mm ou (-)gggmm,mm
const convertLocation = (value, isLatitude) => {
  if (!value) return "";
  
  const format = detectFormat(value);
  if (!format) return value; // Retorna o original se não identificar

  const trimmed = value.trim().replace(",", "."); 
  const parts = trimmed.split(" ");
  const hemis = parts.pop().toUpperCase(); // Último elemento é o hemisfério
  const numericPart = parts.join(" ");

  let degrees = 0, minutes = 0, seconds = 0;

  if (format === "GG") {
    degrees = parseFloat(numericPart);
    minutes = (degrees % 1) * 60;
    degrees = Math.floor(degrees);
  } else if (format === "GGMM") {
    const [deg, min] = numericPart.split(" ");
    degrees = parseInt(deg, 10);
    minutes = parseFloat(min);
  } else if (format === "GGMMSS") {
    const [deg, min, sec] = numericPart.split(" ");
    degrees = parseInt(deg, 10);
    minutes = parseInt(min, 10);
    seconds = parseFloat(sec);
  }

  // Converter segundos para fração de minutos
  let minutesDecimal = (minutes + seconds / 60).toFixed(2);
  let result = `${degrees}${minutesDecimal.replace(".", ",")}`;

  // Ajustar sinal baseado no hemisfério
  if ((isLatitude && hemis === "S") || (!isLatitude && hemis === "W")) {
    result = "-" + result;
  }

  return result;
};




  // Recupera o formato salvo ou usa "GG" como padrão
  const [activeLocationFormat, setActiveLocationFormat] = useState(() => {
    return localStorage.getItem("activeLocationFormat") || "GG";
  });


  // Atualiza o localStorage sempre que o formato mudar
  useEffect(() => {
    localStorage.setItem("activeLocationFormat", activeLocationFormat);
  }, [activeLocationFormat]);




const enviarDados = () => {
  // Verifica se os dados de operação foram alterados (não estão vazios)
  if (dadosOperacao.every(field => field.trim() === "")) {
    alert("Por favor, altere os dados de operação antes de enviar.");
    return;
  }
  
  // Verifica se todas as linhas estão no estado 'Pronto' (disabled === true)
  const notReadyRows = dadosSelecionados.filter(row => !row.disabled);
  if (notReadyRows.length > 0) {
    alert("Todas as linhas devem estar no estado 'Pronto' antes de enviar.");
    return;
  }
  
  // Dados de operação (4 elementos)
  const operacaoData = {
    operacao: dadosOperacao[0] || "",
    entidade: dadosOperacao[1] || "",
    tipoOperacao: dadosOperacao[2] || "",
    nacionalidadeOperacao: dadosOperacao[3] || "",
    outrasAgencias: dadosOperacao[4] || "", // Adicionando campo
  };
  

  // Definindo os cabeçalhos para o Excel (22 colunas)
  const headers = [
    "Operação",
    "Entidade",
    "Tipo",
    "Nacionalidade",
    "Nome da Embarcação",
    "Nº Registo/IMO",
    "Nº Matrícula/MMSI",
    "Tipo de Embarcacao",
    "Nacionalidade",
    "Nome do Mestre",
    "Ilha",
    "Licença",
    "Data",
    "Hora",
    "Tipo de Task",
    "Latitude",
    "Longitude",
    "Situação",
    "Tipo de Infração",
    "Medidas Tomadas",
    "Outras Agências",
    "OBS",
  ];

  // Para cada registro, converte os campos de localização para o formato desejado.
  // Aqui, assume-se que os campos 'latitude' e 'longitude' foram atualizados via os inputs.
  const combinedData = dadosSelecionados.map((row) => {
    const lat = convertLocation(row.latitude, true);
    const lon = convertLocation(row.longitude, false);
    return [
      operacaoData.operacao,
      operacaoData.entidade,
      operacaoData.tipoOperacao,
      operacaoData.nacionalidadeOperacao,
      row.nomeEmbarcacao,
      row.numRegisto,
      row.numMatricula,
      row.tipoEmbarcacao,
      row.nacionalidade,
      row.nomeMestre,
      row.ilha,
      row.licenca,
      row.data,
      row.hora,
      row.tipoDeTask,
      lat,
      lon,
      //row.latitude,  // Mantém os valores exatamente como estão
      //row.longitude, // Sem conversão
      row.situacao,
      row.tipoInfracao,
      row.medidasTomadas,
      operacaoData.outrasAgencias,
      row.observacoes,
    ];
  });

  // Cria a planilha (worksheet) a partir dos dados
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...combinedData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  XLSX.writeFile(workbook, "dados_exportados.xlsx");
};


  return (
    <div className="container">
      <h1>FORMULÁRIO PARA NAVIOS ABORDADOS/AVISTADOS/INVESTIGADOS</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : null}

<OperacaoTable
  dadosOperacao={dadosOperacao}
  config={[
    config.operacoes,
    config.entidades,
    config.tiposEntidade,
    config.nacionalidadeEntidade,
  ]}
  handleOperacaoChange={(e, index) => {
    const novoValor = e.target.value;
    setDadosOperacao((prev) => {
      const novosDados = [...prev];
      novosDados[index] = novoValor; // Atualiza corretamente qualquer campo
      return novosDados;
    });
  }}
/>

      <NaviosTable
        dadosFiltrados={dadosFiltrados}
        adicionarAoDadostable={adicionarAoDadostable}
        handleFiltroChange={handleFiltroChange}
      />

<DadosTable
  dadosSelecionados={dadosSelecionados}
  handleCellEdit={handleCellEdit}
  updateCellValue={updateCellValue}
  updateRowDisabled={updateRowDisabled}
  removerLinha={removerLinha}
  activeLocationFormat={activeLocationFormat}
  setActiveLocationFormat={setActiveLocationFormat}
  setDadosSelecionados={setDadosSelecionados} // Necessário para atualizar os registros
/>


      <button
        onClick={enviarDados}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Enviar/Download de dados
      </button>
      <button
        onClick={resetarDados}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
        }}
      >
        Resetar Dados
      </button>
    </div>
  );
}

export default App;
