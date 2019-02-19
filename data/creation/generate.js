function generate(reps = 200, type) {
  if (type === "proficience") {
    generateProficienceJSON(reps);
  } else {
    generateLevelsJSON(reps);
  }
}

/**
 * creates a JSON with all proficience levels
 */
function generateProficienceJSON(reps = 200) {
  let json = "{\n";
  const repets = reps;

  for (var i = 1; i <= repets; i++) {
    json += `"${i}": {\n`;
    json += `  "exp": ${(i + 1) * (100 + i + 1) + Math.pow(i, 2)} \n`;
    json += "}";

    if (i < repets) {
      json += ",\n";
    }
  }
  json += "\n";
  json += "}";

  document.getElementById("txtAreaResult").value = json;
}

/**
 * creates a JSON with all player levels
 */
function generateLevelsJSON(reps = 200) {
  let json = "{\n";
  const repets = reps;

  for (var i = 1; i <= repets; i++) {
    json += ` "${i}": {\n`;
    json += `   "exp": ${i * (100 + i) + Math.pow(i, 2)} \n`;
    json += " }";

    if (i < repets) {
      json += ",\n";
    }
  }
  json += "\n";
  json += "}";

  document.getElementById("txtAreaResult").value = json;
}
