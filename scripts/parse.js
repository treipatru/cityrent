// Imports & vars --------------------------------------------------------------
const fs = require('fs');

if (!process.argv[2]) {
  console.log('No source file specified. Try: \n> node parse your-data-file.js\n');
  return;
}

const data = require(`./${process.argv[2]}`);
const rex = /^(\d{3,4})(?:\s)([^,]*)(?:,\s)([^\s]*)(?:\s)([^\n]*)$/;


// Functions -------------------------------------------------------------------
/**
 * Format to JSON and write file to disk.
 *
 * @function writeFile
 * @param {*} o - What to stringify.
 * @param {string} fileName - Name of export file.
 */
function writeFile(o, fileName) {
  const fileContents = JSON.stringify(o);
  fs.writeFileSync(fileName, fileContents);
}

/**
 * Process an array of strings, run a regex against each one then
 * sanitize the results and store.
 *
 * @function parseData
 * @param {Array} arr - Array of strings we're processing.
 * @param {String} exportFilename - Export file name.
 * @returns {Array} - Parsed data; an array of objects.
 */
function parseData(arr, exportFilename) {
  let parsed = [];

  arr.forEach((entry) => {
    const matches = entry.match(rex);
    const structuredData = {};

    matches.forEach((p, index) => {
      switch (index) {
        case 1:
          structuredData.cost = p;
          break;
        case 2:
          structuredData.area = p;
          break;
        case 3:
          structuredData.country = p;
          break;
        case 4:
          structuredData.continent = p;
          break;
        default:
          break;
      }
    });
    parsed.push(structuredData);
  });

  writeFile(parsed, exportFilename);
}


// Run things ------------------------------------------------------------------
console.log('\n > Parsing...');
parseData(data.data, 'data.json');
console.log('\n > Done!');
