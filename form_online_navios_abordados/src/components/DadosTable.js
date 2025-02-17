import React, { useState } from "react";
import { LocalizacaoGGLatitude, LocalizacaoGGLongitude } from "./LocalizacaoGG";
import { LocalizacaoGGMMLatitude, LocalizacaoGGMMLongitude } from "./LocalizacaoGGMM";
import { LocalizacaoGGMMSSLatitude, LocalizacaoGGMMSSLongitude } from "./LocalizacaoGGMMSS";

// Função para converter o valor de localização em um número (total de minutos)
const parseLocation = (value, currentFormat, isLatitude) => {
  if (!value || value.trim() === "") return null; // Retorna null se estiver vazio
  value = value.trim();
  if (currentFormat === "GG") {
    const parts = value.split(",");
    if (parts.length < 2) return null; // Garante que haja as duas partes
    const degrees = parseInt(parts[0], 10);
    const minutes = parseFloat(parts[1].replace(",", "."));
    return degrees * 60 + minutes;
  } else if (currentFormat === "GGMM") {
    const degDigits = isLatitude ? 2 : 3;
    const degrees = parseInt(value.slice(0, degDigits), 10);
    const minutes = parseFloat(value.slice(degDigits).replace(",", "."));
    return degrees * 60 + minutes;
  } else if (currentFormat === "GGMMSS") {
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
  if (totalMinutes === null) return ""; // Se não houver valor, retorna string vazia
  const degrees = Math.floor(totalMinutes / 60);
  const minutesDecimal = totalMinutes - degrees * 60;
  if (targetFormat === "GG") {
    const degStr = isLatitude ? String(degrees).padStart(2, "0") : String(degrees).padStart(3, "0");
    const minStr = minutesDecimal.toFixed(2).replace(".", ",");
    return `${degStr},${minStr}`;
  } else if (targetFormat === "GGMM") {
    const degStr = isLatitude ? String(degrees).padStart(2, "0") : String(degrees).padStart(3, "0");
    const minStr = minutesDecimal.toFixed(2).replace(".", ",");
    return `${degStr}${minStr}`;
  } else if (targetFormat === "GGMMSS") {
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
  tipoInfracaoOptions,        // Novo: Array de objetos: { value, description }
}) => {
  if (!dadosSelecionados.length)
    return (
      <p>
        Nenhuma embarcação selecionada. Use o filtro para buscar por embarcação e clique "ESCOLHER" para inserir a Embarcação!
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
    const updatedRows = dadosSelecionados.map((row) => {
      const totalMinutesLat = parseLocation(row.latitude, activeLocationFormat, true);
      const totalMinutesLon = parseLocation(row.longitude, activeLocationFormat, false);
      // Se o valor for null, mantenha o campo vazio
      const newLat = totalMinutesLat !== null ? formatLocation(totalMinutesLat, newFormat, true) : "";
      const newLon = totalMinutesLon !== null ? formatLocation(totalMinutesLon, newFormat, false) : "";
      return { ...row, latitude: newLat, longitude: newLon };
    });
    setDadosSelecionados(updatedRows);
    setActiveLocationFormat(newFormat);
  };

  // Estilo para os campos com área de texto (Medidas Tomadas, OBS)
  const textAreaStyle = {
    minWidth: "150px",
    maxWidth: "300px",
    minHeight: "50px",
    maxHeight: "150px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all"
  };

  // Componente customizado para dropdown multi-seleção com checkboxes e tooltip
  const MultiSelectDropdown = ({ value, options, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleCheckboxChange = (e) => {
      const optionValue = e.target.value;
      let newValue;
      if (e.target.checked) {
        newValue = [...value, optionValue];
      } else {
        newValue = value.filter((v) => v !== optionValue);
      }
      onChange(newValue);
    };

    // Exibe os valores selecionados como uma lista separada por vírgula
    const selectedText = options
      .filter((option) => value.includes(option.value))
      .map((option) => option.value)
      .join(", ");

    return (
      <div className="multi-select-dropdown" style={{ position: "relative", width: "200px" }}>
        <div
          onClick={toggleDropdown}
          style={{
            border: "1px solid #ccc",
            padding: "5px",
            cursor: disabled ? "not-allowed" : "pointer",
            backgroundColor: disabled ? "#f5f5f5" : "white"
          }}
        >
          {selectedText || "Selecione..."}
        </div>
        {isOpen && (
          <div
            className="dropdown-options"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              border: "1px solid #ccc",
              backgroundColor: "white",
              zIndex: 1000,
              maxHeight: "150px",
              overflowY: "auto"
            }}
          >
            {options.map((option) => (
              <label
                key={option.value}
                title={option.description} // Exibe a descrição como tooltip ao passar o mouse
                style={{ display: "block", padding: "5px", cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                {" "}{option.value}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dadostable">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {/* Apenas as colunas que devem ser exibidas */}
              <th>Nome da Embarcação</th>
              <th>Nº Registo/IMO</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Tipo de Task</th>
              {/* Botão para alternar modelo de posição */}
              <th colSpan="2">
                <button onClick={toggleModel}>
                  ALTERNAR FORMATO POSIÇÕES, selecionado: {activeLocationFormat}
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
                {/* Apenas as colunas que devem ser exibidas */}
                <td>{dado.nomeEmbarcacao}</td>
                <td>{dado.numRegisto}</td>
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
                    <input
                      type="text"
                      value=""
                      disabled
                      placeholder="Inativo"
                      style={{ width: "80px" }}
                    />
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
                {/* Coluna para Tipo de Infração */}
                <td>
                  {dado.disabled ? (
                    <span>
                      {Array.isArray(dado.tipoInfracao)
                        ? dado.tipoInfracao.join(", ")
                        : dado.tipoInfracao}
                    </span>
                  ) : (
                    <MultiSelectDropdown
                      value={Array.isArray(dado.tipoInfracao) ? dado.tipoInfracao : []}
                      options={tipoInfracaoOptions}
                      onChange={(selectedValues) =>
                        updateCellValue(rowIndex, "tipoInfracao", selectedValues)
                      }
                      disabled={dado.disabled}
                    />
                  )}
                </td>
                {/* Coluna para Medidas Tomadas */}
                <td>
                  <textarea
                    value={dado.medidasTomadas}
                    onChange={(e) => updateCellValue(rowIndex, "medidasTomadas", e.target.value)}
                    disabled={dado.disabled}
                    style={textAreaStyle}
                    rows={3}
                  />
                </td>
                {/* Coluna para OBS */}
                <td>
                  <textarea
                    value={dado.observacoes}
                    onChange={(e) => updateCellValue(rowIndex, "observacoes", e.target.value)}
                    disabled={dado.disabled}
                    style={textAreaStyle}
                    rows={3}
                  />
                </td>
                {/* Coluna para Ações */}
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
