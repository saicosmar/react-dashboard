import React from "react";
import { LocalizacaoGGLatitude, LocalizacaoGGLongitude } from "./LocalizacaoGG";
import { LocalizacaoGGMMLatitude, LocalizacaoGGMMLongitude } from "./LocalizacaoGGMM";
import { LocalizacaoGGMMSSLatitude, LocalizacaoGGMMSSLongitude } from "./LocalizacaoGGMMSS";

// Converte o valor da coordenada para o total de minutos.
// Para o formato GG, o valor é interpretado como graus decimais (por exemplo, "15,06" significa 15,06°).
const parseLocation = (value, currentFormat, isLatitude) => {
  if (!value || value.trim() === "") return null;
  value = value.trim();
  
  if (currentFormat === "GG") {
    const decimalDegrees = parseFloat(value.replace(",", "."));
    if (isNaN(decimalDegrees)) return null;
    return decimalDegrees * 60; // total de minutos
  } else if (currentFormat === "GGMM") {
    // Aqui, usamos sempre 2 dígitos para os graus
    const degDigits = 2;
    const degrees = parseInt(value.slice(0, degDigits), 10);
    const minutes = parseFloat(value.slice(degDigits).replace(",", "."));
    if (isNaN(degrees) || isNaN(minutes)) return null;
    return degrees * 60 + minutes;
  } else if (currentFormat === "GGMMSS") {
    // Aqui, também usamos sempre 2 dígitos para os graus
    const degDigits = 2;
    const degrees = parseInt(value.slice(0, degDigits), 10);
    const minutes = parseInt(value.slice(degDigits, degDigits + 2), 10);
    const seconds = parseInt(value.slice(degDigits + 2, degDigits + 4), 10);
    if (isNaN(degrees) || isNaN(minutes) || isNaN(seconds)) return null;
    return degrees * 60 + minutes + seconds / 60;
  }
  return null;
};

// Formata um total de minutos para o formato de destino.
// Para GG: retorna graus decimais (exemplo: "15,06")  
// Para GGMM: retorna "graus minutos,mm" (exemplo: "15 03,60")
// Para GGMMSS: retorna "ggmmss,00" (exemplo: "150336,00"), ajustando caso os segundos arredondem para 60.
const formatLocation = (totalMinutes, targetFormat, isLatitude) => {
  if (totalMinutes === null) return "";
  const absTotalMinutes = Math.abs(totalMinutes);
  
  if (targetFormat === "GG") {
    // Converte de volta para graus decimais (ex: "15,06")
    const decimalDegrees = absTotalMinutes / 60;
    return decimalDegrees.toFixed(2).replace(".", ",");
  } else if (targetFormat === "GGMM") {
    // Converte para graus e minutos decimais (ex: "15 03,60")
    const degrees = Math.floor(absTotalMinutes / 60);
    const minutesDecimal = absTotalMinutes - degrees * 60;
    let minStr = minutesDecimal.toFixed(2).replace(".", ",");
    // Se minStr tiver menos de 5 caracteres (por exemplo, "3,60"), garante que fique com 2 dígitos à esquerda
    if (minStr.length < 5) {
      minStr = minStr.padStart(5, "0");
    }
    return `${degrees} ${minStr}`;
  } else if (targetFormat === "GGMMSS") {
    // Converte para graus, minutos inteiros e segundos (ex: "150336,00")
    let degrees = Math.floor(absTotalMinutes / 60);
    let remainder = absTotalMinutes - degrees * 60;
    let minutes = Math.floor(remainder);
    let seconds = Math.round((remainder - minutes) * 60);
    // Se os segundos arredondarem para 60, ajusta minutos e, se necessário, os graus
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        degrees++;
        minutes = 0;
      }
    }
    return `${degrees}${minutes.toString().padStart(2, "0")}${seconds.toString().padStart(2, "0")},00`;
  }
  return "";
};

const DadosTable = ({
  dadosSelecionados,
  handleCellEdit,
  updateCellValue,
  updateRowDisabled,
  removerLinha,
  activeLocationFormat,       // "GG", "GGMM" ou "GGMMSS"
  setActiveLocationFormat,    // Função para alterar o formato ativo
  setDadosSelecionados,       // Função para atualizar os registros
}) => {
  if (!dadosSelecionados.length)
    return (
      <p>
        Nenhuma embarcação selecionada. Use o filtro para buscar por embarcação e clique "ESCOLHER" para inserir a Embarcação!
      </p>
    );

  // Função para alternar o formato e converter as coordenadas.
  // Sequência: GG → GGMM, GGMM → GGMMSS, GGMMSS → GG.
  const toggleModel = () => {
    let newFormat;
    if (activeLocationFormat === "GG") {
      newFormat = "GGMM";
    } else if (activeLocationFormat === "GGMM") {
      newFormat = "GGMMSS";
    } else {
      newFormat = "GG";
    }
    const updatedRows = dadosSelecionados.map((row) => {
      const totalMinutesLat = parseLocation(row.latitude, activeLocationFormat, true);
      const totalMinutesLon = parseLocation(row.longitude, activeLocationFormat, false);
      const newLat = formatLocation(totalMinutesLat, newFormat, true);
      const newLon = formatLocation(totalMinutesLon, newFormat, false);
      return { ...row, latitude: newLat, longitude: newLon };
    });
    setDadosSelecionados(updatedRows);
    setActiveLocationFormat(newFormat);
  };

  // Exemplo de estilo para áreas de texto (não relacionado à conversão de coordenadas)
  const textAreaStyle = {
    minWidth: "150px",
    maxWidth: "300px",
    minHeight: "50px",
    maxHeight: "150px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all"
  };

  return (
    <div className="dadostable">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {/* Cabeçalho – colunas fixas */}
              <th>Nome da Embarcação</th>
              <th>Nº Registo/IMO</th>
              <th>Nº Matrícula/MMSI</th>
              <th>Tipo de Embarcacao</th>
              <th>Nacionalidade</th>
              <th>Nome do Mestre</th>
              <th>Ilha</th>
              <th>Licença</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Tipo de Task</th>
              <th colSpan="2">
                <button onClick={toggleModel}>
                  ALTERNAR FORMATO: {activeLocationFormat}
                </button>
                <br />
                Latitude / Longitude
              </th>
              <th>Situação</th>
              <th>Tipo de Infração</th>
              <th>Medidas Tomadas</th>
              <th>OBS</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosSelecionados.map((dado, rowIndex) => (
              <tr key={rowIndex}>
                <td>{dado.nomeEmbarcacao}</td>
                <td>{dado.numRegisto}</td>
                <td>{dado.numMatricula}</td>
                <td>{dado.tipoEmbarcacao}</td>
                <td>{dado.nacionalidade}</td>
                <td>{dado.nomeMestre}</td>
                <td>{dado.ilha}</td>
                <td>{dado.licenca}</td>
                <td>
                  <input
                    type="date"
                    value={dado.data}
                    onChange={(e) => updateCellValue(rowIndex, "data", e.target.value)}
                    disabled={dado.disabled}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={dado.hora}
                    onChange={(e) => updateCellValue(rowIndex, "hora", e.target.value)}
                    disabled={dado.disabled}
                  />
                </td>
                <td>
                  {dado.disabled ? (
                    <span>{dado.tipoDeTask}</span>
                  ) : (
                    <select
                      value={dado.tipoDeTask}
                      onChange={(e) => updateCellValue(rowIndex, "tipoDeTask", e.target.value)}
                      disabled={dado.disabled}
                    >
                      <option value="">Selecione...</option>
                      <option value="Abordado">Abordado</option>
                      <option value="Avistado">Avistado</option>
                      <option value="Investigado">Investigado</option>
                    </select>
                  )}
                </td>
                {/* Exibição da latitude conforme o formato ativo */}
                <td>
                  {activeLocationFormat === "GG" ? (
                    <LocalizacaoGGLatitude
                      value={dado.latitude || ""}
                      onChange={(e) => updateCellValue(rowIndex, "latitude", e.target.value)}
                      disabled={dado.disabled}
                    />
                  ) : activeLocationFormat === "GGMM" ? (
                    <LocalizacaoGGMMLatitude
                      value={dado.latitude || ""}
                      onChange={(e) => updateCellValue(rowIndex, "latitude", e.target.value)}
                      disabled={dado.disabled}
                    />
                  ) : activeLocationFormat === "GGMMSS" ? (
                    <LocalizacaoGGMMSSLatitude
                      value={dado.latitude || ""}
                      onChange={(e) => updateCellValue(rowIndex, "latitude", e.target.value)}
                      disabled={dado.disabled}
                    />
                  ) : (
                    <input
                      type="text"
                      value=""
                      disabled
                      placeholder="Inativo"
                      style={{ width: "80px" }}
                    />
                  )}
                </td>
                {/* Exibição da longitude conforme o formato ativo */}
                <td>
                  {activeLocationFormat === "GG" ? (
                    <LocalizacaoGGLongitude
                      value={dado.longitude || ""}
                      onChange={(e) => updateCellValue(rowIndex, "longitude", e.target.value)}
                      disabled={dado.disabled}
                    />
                  ) : activeLocationFormat === "GGMM" ? (
                    <LocalizacaoGGMMLongitude
                      value={dado.longitude || ""}
                      onChange={(e) => updateCellValue(rowIndex, "longitude", e.target.value)}
                      disabled={dado.disabled}
                    />
                  ) : activeLocationFormat === "GGMMSS" ? (
                    <LocalizacaoGGMMSSLongitude
                      value={dado.longitude || ""}
                      onChange={(e) => updateCellValue(rowIndex, "longitude", e.target.value)}
                      disabled={dado.disabled}
                    />
                  ) : (
                    <input
                      type="text"
                      value=""
                      disabled
                      placeholder="Inativo"
                      style={{ width: "80px" }}
                    />
                  )}
                </td>
                {/* Dropdown para Situação */}
                <td>
                  {dado.disabled ? (
                    <span>{dado.situacao}</span>
                  ) : (
                    <select
                      value={dado.situacao}
                      onChange={(e) => updateCellValue(rowIndex, "situacao", e.target.value)}
                      disabled={dado.disabled}
                    >
                      <option value="">Selecione...</option>
                      <option value="Irregular">Irregular</option>
                      <option value="Ilegal">Ilegal</option>
                      <option value="Legal">Legal</option>
                    </select>
                  )}
                </td>
                {/* Áreas de texto para campos longos */}
                <td>
                  <textarea
                    value={dado.tipoInfracao}
                    onChange={(e) => updateCellValue(rowIndex, "tipoInfracao", e.target.value)}
                    disabled={dado.disabled}
                    style={textAreaStyle}
                    rows={3}
                  />
                </td>
                <td>
                  <textarea
                    value={dado.medidasTomadas}
                    onChange={(e) => updateCellValue(rowIndex, "medidasTomadas", e.target.value)}
                    disabled={dado.disabled}
                    style={textAreaStyle}
                    rows={3}
                  />
                </td>
                <td>
                  <textarea
                    value={dado.observacoes}
                    onChange={(e) => updateCellValue(rowIndex, "observacoes", e.target.value)}
                    disabled={dado.disabled}
                    style={textAreaStyle}
                    rows={3}
                  />
                </td>
                {/* Ações */}
                <td>
                  <button onClick={() => updateRowDisabled(rowIndex, !dado.disabled)}>
                    {dado.disabled ? "Editar" : "Pronto"}
                  </button>
                  <button onClick={() => removerLinha(rowIndex)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DadosTable;
