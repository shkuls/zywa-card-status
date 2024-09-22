const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const dataDir = path.join(__dirname, '../data');


async function readCSVFiles() {
    const CardJSON = [];
    
        
        const files = fs.readdirSync(dataDir);
        const readFile = files.map((file) => {
            return new Promise((resolve) => {
              if (path.extname(file) === '.csv') {
                const filePath = path.join(dataDir, file);
                const startIndex =file.search("-") + 2;
                const endIndex = file.search(".csv")
                const status = file.slice(startIndex, endIndex);
                
                const fileData = [];
                
                fs.createReadStream(filePath)
                  .pipe(csv())
                  .on('data', (row) => {
                    fileData.push({ ...row, status });
                  })
                  .on('end', () => {
                    CardJSON.push(...fileData); 
                    resolve(); 
                  })
                  
              }
            });
          });
        
          await Promise.all(readFile);
        
          return CardJSON;

}

module.exports = readCSVFiles;