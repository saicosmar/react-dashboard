import React from "react";
import InputMask from "react-input-mask";
//import { convertLocation } from "../utils/convertLocation"; // Importando a função


export const LocalizacaoGGLatitude = ({ value, onChange, disabled }) => {
  let numeric = "";
  let hemisferio = "N"; // Definir padrão como "N"

  if (value) {
    const parts = value.split(" ");
    numeric = parts[0] || "";
    hemisferio = parts[1] || "N"; // Garante que sempre haverá um hemisfério
  }

  const handleNumericChange = (e) => {
    const newNumeric = e.target.value;
    onChange({ target: { value: newNumeric + " " + hemisferio } });
  };

  const handleHemiChange = (e) => {
    const newHemi = e.target.value;
    onChange({ target: { value: numeric + " " + newHemi } });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputMask mask="99,99" value={numeric} onChange={handleNumericChange} disabled={disabled}>
        {(inputProps) => <input {...inputProps} type="text" style={{ width: "60px" }} />}
      </InputMask>
      <select
        value={hemisferio}
        onChange={handleHemiChange}
        disabled={disabled}
        style={{ marginLeft: "4px" }}
      >
        <option value="N">N</option>
        <option value="S">S</option>
      </select>
    </div>
  );
};


export const LocalizacaoGGLongitude = ({ value, onChange, disabled }) => {
  let numeric = "";
  let hemisferio = "W"; // Definir padrão como "W"

  if (value) {
    const parts = value.split(" ");
    numeric = parts[0] || "";
    hemisferio = parts[1] || "W"; // Garante que sempre haverá um hemisfério
  }

  const handleNumericChange = (e) => {
    const newNumeric = e.target.value;
    onChange({ target: { value: newNumeric + " " + hemisferio } });
  };

  const handleHemiChange = (e) => {
    const newHemi = e.target.value;
    onChange({ target: { value: numeric + " " + newHemi } });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputMask mask="99,99" value={numeric} onChange={handleNumericChange} disabled={disabled}>
        {(inputProps) => <input {...inputProps} type="text" style={{ width: "60px" }} />}
      </InputMask>
      <select
        value={hemisferio}
        onChange={handleHemiChange}
        disabled={disabled}
        style={{ marginLeft: "4px" }}
      >
        <option value="E">E</option>
        <option value="W">W</option>
      </select>
    </div>
  );
};
