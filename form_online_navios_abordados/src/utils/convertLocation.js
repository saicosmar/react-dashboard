export const convertLocation = (value, isLatitude) => {
    if (!value) return "";
    const trimmed = value.trim().replace(",", ".");
    const parts = trimmed.split(" ");
    if (parts.length < 2) return value;
    const hemis = parts[parts.length - 1].toUpperCase();
    let numericPart = parts.slice(0, parts.length - 1).join(" ");
    let degrees = "";
    let minutes = "00";
    let seconds = "00";
    const numericParts = numericPart.split(" ");
    if (numericParts.length === 1) {
      degrees = numericParts[0].split(".")[0] || "00";
      minutes = (numericParts[0].split(".")[1] || "00").padEnd(2, "0");
    } else if (numericParts.length === 2) {
      degrees = numericParts[0];
      minutes = numericParts[1].split(".")[0] || "00";
      seconds = (numericParts[1].split(".")[1] || "00").padEnd(2, "0");
    } else if (numericParts.length === 3) {
      degrees = numericParts[0];
      minutes = numericParts[1];
      seconds = numericParts[2];
    }
    let minutesDecimal = (parseInt(minutes, 10) + parseInt(seconds, 10) / 60).toFixed(2);
    let result = `${degrees}${minutesDecimal.replace(".", ",")}`;
    if ((isLatitude && hemis === "S") || (!isLatitude && hemis === "W")) result = "-" + result;
    return result;
  };
  