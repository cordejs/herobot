function calcProficienceExp(value) {
  return (value + 1) * (100 + value + 1) + Math.pow(value, 2);
}

function calcLevelExp(value) {
  return value * (100 + value) + Math.pow(value, 2);
}

/**
 * creates a JSON with all proficience levels
 */
generateProficienceJSON = function () {
  let json = "{\n";
  const repets = 200;

  for (var i = 1; i <= repets; i++) {
    json += `"${i}": {\n`;
    json += `  "exp": ${calcProficienceExp(i)} \n`;
    json += "}";

    if (i < repets) {
      json += ",\n";
    }
  }
  json += "\n";
  json += "}";

  console.log(json);
};

/**
 * creates a JSON with all player levels
 */
generateLevelsJSON = function () {
  let json = "{\n";
  const repets = 200;

  for (var i = 1; i <= repets; i++) {
    json += `"${i}": {\n`;
    json += `  "exp": ${calcLevelExp(i)} \n`;
    json += "}";

    if (i < repets) {
      json += ",\n";
    }
  }
  json += "\n";
  json += "}";

  console.log(json);
};

generateLevelsOnlyNumbers = function () {
  let data = "";
  const repets = 200;
  for (var i = 1; i <= repets; i++) {
    data += `${calcLevelExp(i)} \n`;
  }
  console.log(data);
}
