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

/**
 * Used to format emojis description in a enum
 * @param {string} text
 */
function convert(text) {
  let splited = text.split("//");
  let result = "";
  for (let i = 1; i < splited.length; i++) {
    let secondSplit = splited[i].split(" ");
    let description = "";

    for (let i2 = 2; i2 < secondSplit.length; i2++) {
      description += secondSplit[i2].replace(/(\r\n|\n|\r)/gm, "") + " ";
    }

    result += "/** " + description + "*/";
    result += "\n";
    result += `"${secondSplit[1]}" = "${secondSplit[1]}",\n`;
  }
  document.getElementById("txtoutput").innerHTML = result;
}
