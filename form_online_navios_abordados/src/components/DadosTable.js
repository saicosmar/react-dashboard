import React from "react";
import { LocalizacaoGGLatitude, LocalizacaoGGLongitude } from "./LocalizacaoGG";
import { LocalizacaoGGMMLatitude, LocalizacaoGGMMLongitude } from "./LocalizacaoGGMM";
import { LocalizacaoGGMMSSLatitude, LocalizacaoGGMMSSLongitude } from "./LocalizacaoGGMMSS";

// Função para converter o valor de localização em um número (total de minutos)
const parseLocation = (value, currentFormat, isLatitude) => {
  if (!value) return 0;
  value = value.trim();
  if (currentFormat === "GG") {
    // Formato: "dd,mm.xx" (ex: "12,56.98")
    const parts = value.split(",");
    const degrees = parseInt(parts[0], 10);
    // Substituir vírgula decimal se necessário
    const minutes = parseFloat(parts[1].replace(",", "."));
    return degrees * 60 + minutes;
  } else if (currentFormat === "GGMM") {
    // Formato: "ddmm,mm" (ex: "1256,98")
    const degDigits = isLatitude ? 2 : 3;
    const degrees = parseInt(value.slice(0, degDigits), 10);
    const minutes = parseFloat(value.slice(degDigits).replace(",", "."));
    return degrees * 60 + minutes;
  } else if (currentFormat === "GGMMSS") {
    // Formato: "ddmmss,00" (ex: "125659,00")
    const degDigits = isLatitude ? 2 : 3;
    const degrees = parseInt(value.slice(0, degDigits), 10);
    const minutes = parseInt(value.slice(degDigits, degDigits + 2), 10);
    const seconds = parseInt(value.slice(degDigits + 2, degDigits + 4), 10);
    return degrees * 60 + minutes + seconds / 60;
  }
  return 0;
};

// Função para formatar um total de minutos para o formato de destino
const formatLocation = (totalMinutes, targetFormat, isLatitude) => {
  const degrees = Math.floor(totalMinutes / 60);
  const minutesDecimal = totalMinutes - degrees * 60;
  if (targetFormat === "GG") {
    // Formato "GG,GG": graus com 2 (ou 3) dígitos, vírgula, minutos decimais com 2 casas
    const degStr = isLatitude ? String(degrees).padStart(2, "0") : String(degrees).padStart(3, "0");
    const minStr = minutesDecimal.toFixed(2).replace(".", ",");
    return `${degStr},${minStr}`;
  } else if (targetFormat === "GGMM") {
    // Formato "GGMM,MM": concatena graus e minutos decimais, sem separador
    const degStr = isLatitude ? String(degrees).padStart(2, "0") : String(degrees).padStart(3, "0");
    const minStr = minutesDecimal.toFixed(2).replace(".", ",");
    return `${degStr}${minStr}`;
  } else if (targetFormat === "GGMMSS") {
    // Formato "GGMMSS,00": graus, minutos inteiros e segundos inteiros (arredondados), com ",00"
    const degStr = isLatitude ? String(degrees).padStart(2, "0") : String(degrees).padStart(3, "0");
    const min = Math.floor(minutesDecimal);
    const sec = Math.round((minutesDecimal - min) * 60);
    const minStr = String(min).padStart(2, "0");
    const secStr = String(sec).padStart(2, "0");
    return `${degStr}${minStr}${secStr},00`;
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
  setDadosSelecionados,       // Função para atualizar todos os registros
}) => {
  if (!dadosSelecionados.length)
    return (
      <p>
        Nenhum navio selecionado. Use o filtro para buscar por embarcação e clique "ESCOLHER" para inserir a Embarcação!
      </p>
    );

  // Função para alternar o modelo de posição e converter os valores existentes
  const toggleModel = () => {
    let newFormat;
    if (activeLocationFormat === "GG") {
      newFormat = "GGMM";
    } else if (activeLocationFormat === "GGMM") {
      newFormat = "GGMMSS";
    } else {
      newFormat = "GG";
    }
    // Converter cada registro: se houver valor em latitude e longitude, converte para o novo formato
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

  return (
    <div className="dadostable">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {/* Colunas fixas */}
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
              {/* Botão para alternar modelo de posição */}
              <th colSpan="2">
                <button onClick={toggleModel}>
                  ESCOLHER MODELO POSIÇÕES: {activeLocationFormat}
                </button>
                <br />
                Latitude / Longitude
              </th>
              <th>Situação</th>
              <th>Tipo de Infração</th>
              <th>Medidas Tomadas</th>
              <th>Outras Agências</th>
              <th>OBS</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dadosSelecionados.map((dado, rowIndex) => (
              <tr key={rowIndex}>
                {/* Colunas fixas */}
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
                {/* Coluna para Latitude */}
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
                    <input type="text" value="" disabled placeholder="Inativo" style={{ width: "80px" }} />
                  )}
                </td>
                {/* Coluna para Longitude */}
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
                    <input type="text" value="" disabled placeholder="Inativo" style={{ width: "80px" }} />
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
                {/* Textareas para campos longos */}
                <td>
                  <textarea
                    value={dado.tipoInfracao}
                    onChange={(e) => updateCellValue(rowIndex, "tipoInfracao", e.target.value)}
                    disabled={dado.disabled}
                    style={{ width: "100px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}
                    rows={3}
                  />
                </td>
                <td>
                  <textarea
                    value={dado.medidasTomadas}
                    onChange={(e) => updateCellValue(rowIndex, "medidasTomadas", e.target.value)}
                    disabled={dado.disabled}
                    style={{ width: "100px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}
                    rows={3}
                  />
                </td>
                <td>
                  <textarea
                    value={dado.outrasAgencias}
                    onChange={(e) => updateCellValue(rowIndex, "outrasAgencias", e.target.value)}
                    disabled={dado.disabled}
                    style={{ width: "100px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}
                    rows={3}
                  />
                </td>
                <td>
                  <textarea
                    value={dado.observacoes}
                    onChange={(e) => updateCellValue(rowIndex, "observacoes", e.target.value)}
                    disabled={dado.disabled}
                    style={{ width: "100px", whiteSpace: "pre-wrap", wordBreak: "break-all" }}
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
