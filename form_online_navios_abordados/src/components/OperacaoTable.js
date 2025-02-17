import React from "react";

const OperacaoTable = ({ dadosOperacao, config, handleOperacaoChange }) => {
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
              {config[0] &&
                config[0].map((opcao, i) => (
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
              onChange={(e) => {
                handleOperacaoChange(e, 1);
                if (e.target.value === "SIM/NAVIO") {
                  // Automatically set Tipo de Entidade and Nacionalidade for NAVIO
                  handleOperacaoChange({ target: { value: "NAVIO" } }, 3);
                  handleOperacaoChange({ target: { value: "Cabo Verde" } }, 4);
                } else if (e.target.value === "SIM/AERONAVE") {
                  // Automatically set Tipo de Entidade and Nacionalidade for AERONAVE
                  handleOperacaoChange({ target: { value: "AERONAVE" } }, 3);
                  handleOperacaoChange({ target: { value: "Cabo Verde" } }, 4);
                }
              }}
            >
              <option value="">Selecione</option>
              {config[1] &&
                config[1].map((opcao, i) => (
                  <option key={i} value={opcao}>
                    {opcao}
                  </option>
                ))}
            </select>
          </td>
          {/* Detalhe Entidade (enabled only if Entidade is "OUTRO") */}
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
            {(dadosOperacao[1] === "SIM/NAVIO" || dadosOperacao[1] === "SIM/AERONAVE") ? (
              <select value={dadosOperacao[1] === "SIM/NAVIO" ? "NAVIO" : "AERONAVE"} disabled>
                <option value={dadosOperacao[1] === "SIM/NAVIO" ? "NAVIO" : "AERONAVE"}>
                  {dadosOperacao[1] === "SIM/NAVIO" ? "NAVIO" : "AERONAVE"}
                </option>
              </select>
            ) : (
              <select
                value={dadosOperacao[3] || ""}
                onChange={(e) => handleOperacaoChange(e, 3)}
              >
                <option value="">Selecione</option>
                {config[2] &&
                  config[2].map((opcao, i) => (
                    <option key={i} value={opcao}>
                      {opcao}
                    </option>
                  ))}
              </select>
            )}
          </td>
          {/* Nacionalidade */}
          <td>
            {(dadosOperacao[1] === "SIM/NAVIO" || dadosOperacao[1] === "SIM/AERONAVE") ? (
              <select value="Cabo Verde" disabled>
                <option value="Cabo Verde">Cabo Verde</option>
              </select>
            ) : (
              <select
                value={dadosOperacao[4] || ""}
                onChange={(e) => handleOperacaoChange(e, 4)}
              >
                <option value="">Selecione</option>
                {config[3] &&
                  config[3].map((opcao, i) => (
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
