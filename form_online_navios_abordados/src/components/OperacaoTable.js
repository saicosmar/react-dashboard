import React from "react";

const OperacaoTable = ({
  dadosOperacao,
  config,             // objeto contendo: config.operacoes, config.entidades, config.tiposEntidade, config.nacionalidadeEntidade
  automaticEntidades, // array com os dados automáticos (coluna D) que correspondem à lista de entidades (coluna E)
  handleOperacaoChange,
}) => {
  // Função para tratar a mudança do dropdown "Entidade"
  const onEntidadeChange = (e) => {
    const selectedValue = e.target.value;
    // Atualiza o valor da coluna "Entidade" (índice 1)
    handleOperacaoChange(e, 1);

    // Procura o índice do valor selecionado no array de opções do dropdown (coluna E)
    const idx = config.entidades ? config.entidades.indexOf(selectedValue) : -1;
    if (idx !== -1 && automaticEntidades && automaticEntidades[idx]) {
      const autoValue = automaticEntidades[idx];
      if (autoValue === "SIM/NAVIO") {
        // Define Tipo de Entidade (índice 3) e Nacionalidade (índice 4) automaticamente
        handleOperacaoChange({ target: { value: "NAVIO" } }, 3);
        handleOperacaoChange({ target: { value: "Cabo Verde" } }, 4);
      } else if (autoValue === "SIM/AERONAVE") {
        handleOperacaoChange({ target: { value: "AERONAVE" } }, 3);
        handleOperacaoChange({ target: { value: "Cabo Verde" } }, 4);
      }
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
              {config.operacoes &&
                config.operacoes.map((opcao, i) => (
                  <option key={i} value={opcao}>
                    {opcao}
                  </option>
                ))}
            </select>
          </td>
          {/* Entidade */}
          <td>
            <select value={dadosOperacao[1] || ""} onChange={onEntidadeChange}>
              <option value="">Selecione</option>
              {config.entidades &&
                config.entidades.map((opcao, i) => (
                  <option key={i} value={opcao}>
                    {opcao}
                  </option>
                ))}
            </select>
          </td>
          {/* Detalhe Entidade – habilitado somente se Entidade for "OUTRO" */}
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
            {dadosOperacao[1] === "SIM/NAVIO" || dadosOperacao[1] === "SIM/AERONAVE" ? (
              // Mostra caixa de texto com valor automático (readOnly)
              <input
                type="text"
                value={dadosOperacao[1] === "SIM/NAVIO" ? "NAVIO" : "AERONAVE"}
                readOnly
              />
            ) : dadosOperacao[1] === "OUTRO" ? (
              // Se for "OUTRO", permite seleção via dropdown (usando config.tiposEntidade)
              <select
                value={dadosOperacao[3] || ""}
                onChange={(e) => handleOperacaoChange(e, 3)}
              >
                <option value="">Selecione</option>
                {config.tiposEntidade &&
                  config.tiposEntidade.map((opcao, i) => (
                    <option key={i} value={opcao}>
                      {opcao}
                    </option>
                  ))}
              </select>
            ) : (
              // Para outros casos, pode ser editável conforme desejado
              <input
                type="text"
                value={dadosOperacao[3] || ""}
                onChange={(e) => handleOperacaoChange(e, 3)}
              />
            )}
          </td>
          {/* Nacionalidade */}
          <td>
            {dadosOperacao[1] === "SIM/NAVIO" || dadosOperacao[1] === "SIM/AERONAVE" ? (
              <input type="text" value="Cabo Verde" readOnly />
            ) : dadosOperacao[1] === "OUTRO" ? (
              <select
                value={dadosOperacao[4] || ""}
                onChange={(e) => handleOperacaoChange(e, 4)}
              >
                <option value="">Selecione</option>
                {config.nacionalidadeEntidade &&
                  config.nacionalidadeEntidade.map((opcao, i) => (
                    <option key={i} value={opcao}>
                      {opcao}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type="text"
                value={dadosOperacao[4] || ""}
                onChange={(e) => handleOperacaoChange(e, 4)}
              />
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
