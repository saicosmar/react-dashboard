import React from "react";

const OperacaoTable = ({ dadosOperacao, config, handleOperacaoChange }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Operação</th>
          <th>Entidade</th>
          <th>Tipo de Operação</th>
          <th>Nacionalidade</th>
          <th>Outras Agências</th> {/* Adicionando a nova coluna */}
        </tr>
      </thead>
      <tbody>
        <tr>
          {config.map((opcoes, index) => (
            <td key={index}>
              <select
                value={dadosOperacao[index] || ""}
                onChange={(e) => handleOperacaoChange(e, index)}
              >
                <option value="">Selecione</option>
                {opcoes.map((opcao, i) => (
                  <option key={i} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
            </td>
          ))}
          <td>
            <input
              type="text"
              value={dadosOperacao[4] || ""} // Índice 4 para "Outras Agências"
              onChange={(e) => handleOperacaoChange(e, 4)}
              placeholder="Informe outras agências"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OperacaoTable;
