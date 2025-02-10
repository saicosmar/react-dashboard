import React from "react";

const OperacaoTable = ({ dadosOperacao, config, handleOperacaoChange }) => {
  if (!Array.isArray(dadosOperacao) || !Array.isArray(config)) {
    return <p>Erro: dadosOperacao ou config não são arrays válidos.</p>;
  }

  return (
    <div>
      <div className="operacaotable">
      <div className="table-wrapper small-table">
        <table>
          <thead>
            <tr>
              <th>Operação</th>
              <th>Entidade</th>
              <th>Tipo</th>
              <th>Nacionalidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {dadosOperacao.map((valor, index) => (
                <td key={index}>
                  {Array.isArray(config[index]) ? (
                    <select value={valor} onChange={(e) => handleOperacaoChange(e, index)}>
                      {config[index].map((item, idx) => (
                        <option key={idx} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p style={{ color: "red" }}>Erro: Configuração inválida</p>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default OperacaoTable;
