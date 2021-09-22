// Article Reference: https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-the-fs-module-in-node-js

import fs from 'fs';

export async function readFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8", function (err, data) {
        if (err) throw err;
        // console.log(data);
    });
    // console.log('data ->' + data);
    return data;
  } catch (err) {
    console.error(`Got an error trying to read the file: ${err.message}`);
    throw err;
  }
}
export async function writeToFile(fileName, fileContent) {
  try {
    await fs.writeFile(fileName, fileContent, function (err, data) {
      if (err) throw err;
      //console.log(data);
    });
    // console.log('just create this file:' + fileName)
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
    throw error;
  }
}
export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath, function (err, data) {
      if (err) throw err;
    });
    console.log(`Deleted ${filePath}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }
}
export function jsonReader(filePath) {

  fs.readFile(filePath, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return 
    }
    console.log('File data:', jsonString);
    return jsonString;  
  })
}

export function EnviarShapeToClient(nombreDelArchivo, correo){
  // console.log ('Correo enviado a:' + correo + " con el adjunto: " + nombreDelArchivo)
};


// main testing callers
// var fileContent = await readFromFile ('MyShape.txt', (err)=>{ 
//   if (err) { 
//     console.log(err); 
//   } 
// });

// await writeToFile('fileFromPromise.v1.txt', fileContent, (err)=>{ 
//   if (err) { 
//     console.log(err); 
//   } 
// }); 

