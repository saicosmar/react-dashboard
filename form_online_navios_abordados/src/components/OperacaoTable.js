import React from "react";

const OperacaoTable = ({ dadosOperacao, config, handleOperacaoChange }) => {
  const onEntidadeChange = (e) => {
    const selectedValue = e.target.value;
    handleOperacaoChange(e, 1); // Atualiza índice 1 (Entidade)

    // Atualiza campos dependentes imediatamente
    if (selectedValue === "SIM/NAVIO") {
      handleOperacaoChange({ target: { value: "NAVIO" } }, 3); // Índice 3 (Tipo de Entidade)
      handleOperacaoChange({ target: { value: "Cabo Verde" } }, 4); // Índice 4 (Nacionalidade)
    } else if (selectedValue === "SIM/AERONAVE") {
      handleOperacaoChange({ target: { value: "AERONAVE" } }, 3);
      handleOperacaoChange({ target: { value: "Cabo Verde" } }, 4);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Operação</th>
          <th>Entidade</th>
          <th>Detalhe Entidade</th>
          <th>Tipo de Entidade</th>
          <th>Nacionalidade</th>
          <th>Outras Agências</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* Operação */}
          <td>
            <select
              value={dadosOperacao[0] || ""}
              onChange={(e) => handleOperacaoChange(e, 0)}
            >
              <option value="">Selecione</option>
              {config[0]?.map((opcao, i) => (
                <option key={i} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </td>

          {/* Entidade */}
          <td>
            <select
              value={dadosOperacao[1] || ""}
              onChange={onEntidadeChange}
            >
              <option value="">Selecione</option>
              {config[1]?.map((opcao, i) => (
                <option key={i} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </td>

          {/* Detalhe Entidade */}
          <td>
            <input
              type="text"
              value={dadosOperacao[2] || ""}
              onChange={(e) => handleOperacaoChange(e, 2)}
              placeholder="Informe detalhe"
              disabled={dadosOperacao[1] !== "OUTRO"}
            />
          </td>

          {/* Tipo de Entidade */}
          <td>
            {["SIM/NAVIO", "SIM/AERONAVE"].includes(dadosOperacao[1]) ? (
              <select value={dadosOperacao[3] || ""} disabled>
                <option value={dadosOperacao[3]}>{dadosOperacao[3]}</option>
              </select>
            ) : (
              <select
                value={dadosOperacao[3] || ""}
                onChange={(e) => handleOperacaoChange(e, 3)}
              >
                <option value="">Selecione</option>
                {config[2]?.map((opcao, i) => (
                  <option key={i} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            )}
          </td>

          {/* Nacionalidade */}
          <td>
            {["SIM/NAVIO", "SIM/AERONAVE"].includes(dadosOperacao[1]) ? (
              <select value={dadosOperacao[4] || ""} disabled>
                <option value={dadosOperacao[4]}>{dadosOperacao[4]}</option>
              </select>
            ) : (
              <select
                value={dadosOperacao[4] || ""}
                onChange={(e) => handleOperacaoChange(e, 4)}
              >
                <option value="">Selecione</option>
                {config[3]?.map((opcao, i) => (
                  <option key={i} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            )}
          </td>

          {/* Outras Agências */}
          <td>
            <input
              type="text"
              value={dadosOperacao[5] || ""}
              onChange={(e) => handleOperacaoChange(e, 5)}
              placeholder="Informe outras agências"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OperacaoTable;
