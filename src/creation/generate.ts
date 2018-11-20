function calcProficienceExp(value) {
  return (value + 1) * (100 + value + 1) + Math.pow(value, 2);
}

function calcLevelExp(value) {
  return value * (100 + value) + Math.pow(value, 2);
}

/**
 * creates a JSON with all proficience levels
 */
function generateProficienceJSON() {
  let json = "{\n";
  const repets = 200;

  for (let i = 1; i <= repets; i++) {
    json += `"${i}": {\n`;
    json += `  "exp": ${calcProficienceExp(i)}\n`;
    json += "}";

    if (i < repets) {
      json += ",\n";
    }
  }
  json += "\n";
  json += "}";

  console.log(json);
}

/**
 * creates a JSON with all player levels
 */
function generateLevelsJSON() {
  let json = "{\n";
  const repets = 200;
  let hpbase = 100;

  for (let i = 1; i <= repets; i++) {
    json += `"${i}": {\n`;
    json += `  "exp": ${calcLevelExp(i)},\n`;
    json += `  "hp": ${hpbase + 10}\n`;
    json += "}";

    hpbase += 10;

    if (i < repets) {
      json += ",\n";
    }
  }
  json += "\n";
  json += "}";

  console.log(json);
}

function generateLevelsOnlyNumbers() {
  let data = "";
  const repets = 200;
  for (let i = 1; i <= repets; i++) {
    data += `${calcLevelExp(i)} \n`;
  }
  console.log(data);
}
