import React from "react";
import InputMask from "react-input-mask";

export const LocalizacaoGGMMSSLatitude = ({ value, onChange, disabled }) => {
  // Valor esperado: "99 99 99,99 H" (H = N ou S)
  let numeric = "";
  let hemisferio = "N";
  if (value) {
    const parts = value.split(" ");
    if (parts.length >= 4) {
      numeric = parts[0] + " " + parts[1] + " " + parts[2];
      hemisferio = parts[3];
    } else {
      numeric = parts.join(" ");
    }
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
      <InputMask 
        mask="99 99 99,99" 
        value={numeric} 
        onChange={handleNumericChange} 
        disabled={disabled}
      >
        {(inputProps) => (
          <input {...inputProps} type="text" style={{ width: "100px" }} />
        )}
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

export const LocalizacaoGGMMSSLongitude = ({ value, onChange, disabled }) => {
  // Valor esperado: "99 99 99,99 H" (H = E ou W)
  let numeric = "";
  let hemisferio = "W";
  if (value) {
    const parts = value.split(" ");
    if (parts.length >= 4) {
      numeric = parts[0] + " " + parts[1] + " " + parts[2];
      hemisferio = parts[3];
    } else {
      numeric = parts.join(" ");
    }
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
      <InputMask 
        mask="99 99 99,99" 
        value={numeric} 
        onChange={handleNumericChange} 
        disabled={disabled}
      >
        {(inputProps) => (
          <input {...inputProps} type="text" style={{ width: "100px" }} />
        )}
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
