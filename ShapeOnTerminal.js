'use strict';

import * as Shaper from './DrawShape.js';
import { writeToFile, deleteFile, readFromFile, jsonReader, EnviarShapeToClient} from  './fileOperations.js'
import fs from 'fs';

var lado = "";
var centro = "";
var outpuType = "web";
var numOfShapes = 0;
const inicio = Date.now();

var momento = new Date();

var DiaDeHoy =  momento.getDate()  + '-' + (momento.getMonth() +1 ) + '-' + momento.getFullYear();
var horaInicial = momento.getHours() + ":" + momento.getMinutes() + ":" + momento.getSeconds();

console.log("Inicio: -> " + inicio)

for (let j = 0; j < process.argv.length; j++) {

    console.log( j + ' ->  ' + (process.argv[j]));

    if (j==2) {
        lado = process.argv[j];
    } else if (j==3) {
        centro = process.argv[j];
    } else if (j==4)  {
        if (process.argv[j].length != 0){
            outpuType = process.argv[j];
        }
    }
}
// producing one shape
// const fileContent = Shaper.ShapeController(lado, centro, outpuType);

// saving shape to file
// await writeToFile('shape1.3.txt', fileContent, (err)=>{ 
//     if (err) { 
//       console.log('Error Message:' + err); 
//     } 
// });

// reading shape from a file
// var finalContent = await readFromFile ('shape1.3.txt', (err)=>{ 
//     if (err) { 
//       console.log(err); 
//     } 
// });

// printing shape to screen
// console.log("\n\n" + finalContent + "\n\n");


// Now Let's Process all json requests from the file
processJsonRequests('./shapesRequest.json');

function processJsonRequests(filePath){

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }

    // console.log(data);

    try {

      const solicitudes = JSON.parse(data);
  
      // una vuelta para cada solicitud
      for (let index = 0; index < solicitudes.shapes.length; index++) { 

        var lado = solicitudes.shapes[index].lado;
        var centro = solicitudes.shapes[index].centro;      
        var nombre = solicitudes.shapes[index].nombre; 
        var tipoDeEntrega = solicitudes.shapes[index].tipoDeEntrega;
        var correo = solicitudes.shapes[index].correo; 
        var cantidad = solicitudes.shapes[index].cantidad;         

        var tempFileContent = "";
        var fileContent = "";

        // una vuelta para cada cantidad
        for (let index = 0; index < cantidad; index++) {

          // producir e imprimir solo un shape en la pantalla
          tempFileContent = Shaper.ShapeController(lado , centro, outpuType);
          console.log(tempFileContent + "\n\n");

          // acumular shapes
          fileContent += tempFileContent;
          numOfShapes++;
        }

        writeToFile("./Data/" + nombre + ".txt", fileContent, (err)=>{ 
            if (err) { 
              console.log('Error Message:' + err); 
            }

        });

        if (tipoDeEntrega == "correo") {       
            EnviarShapeToClient(nombre + ".txt", correo);
        }
      }
      momento = new Date();
      var horaFinal = momento.getHours() + ":" + momento.getMinutes() + ":" + momento.getSeconds();

      const final = Date.now();
      const duracion = (final - inicio)/1000;

      console.log("\n\n");
      console.log("*******************************************");
      console.log("*");
      console.log("*   Programa: ShapeMaker");
      console.log("*");
      console.log("*   Fecha de Ejecucion: " + DiaDeHoy);
      console.log("*   Numero de Shapes: "  + numOfShapes);
      console.log("*   Inicio: -> " + horaInicial);
      console.log("*   Final:  -> " + horaFinal);
      console.log("*");
      console.log("*   Ducarion de Ejecucion  = " + duracion);
      console.log("*");
      console.log("*******************************************");
      console.log("\n\n");

    } catch (err) {
      console.log('Error parsing JSON:', err);
    }
  });
};

/*
Inicio: -> 1632236289420
Final: -> 1632236290782
Este programa fue ejecutado en  = 1.362
*/
