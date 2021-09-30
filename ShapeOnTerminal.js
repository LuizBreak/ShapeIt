'use strict';

import * as Shaper from './DrawShape.js';
import { writeToFile, deleteFile, readFromFile, jsonReader, EnviarShapeToClient} from  './fileOperations.js'
import fs from 'fs';

var lado = "";
var centro = "";
var outpuType = "web";
var flashOnScreen = false;
var filePath = "";

var numOfShapes = 0;
const inicio = Date.now();
var momento = new Date();

var DiaDeHoy =  momento.getDate()  + '-' + (momento.getMonth() +1 ) + '-' + momento.getFullYear();
var horaInicial = momento.getHours() + ":" + momento.getMinutes() + ":" + momento.getSeconds();

// console.log("Inicio: -> " + inicio)

for (let j = 0; j < process.argv.length; j++) {

    console.log( j + ' ->  ' + (process.argv[j]));

    if (j==2)  {
        if (process.argv[j].length != 0){
            outpuType = process.argv[j];
        }
    } else if (j==3){
      flashOnScreen = (process.argv[j] == 'true');
      // console.log("Flash: " + flashOnScreen)
    } else if (j==4){
        filePath = process.argv[j];
    }
}

if (filePath.length > 0){
  // Now Let's Process all json requests from the file
  processJsonRequests(filePath, flashOnScreen);

} else {
  // console.log("\x1b[31m%s\x1b[0m", "Error: Json path not provided!");
  // console.log('\x1b[36m%s\x1b[0m', "Error: Json path not provided!");  //cyan
  console.log('\x1b[33m%s\x1b[0m', "Error: Json path not provided!");  //yellow
  process.exit;
}

function processJsonRequests(filePath, flashOnScreen){

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }

    try {

      const collection = JSON.parse(data);

      // una vuelta para cada solicitud
      for (let index = 0; index < collection.Solicitudes.length; index++) { 

        const nombre = collection.Solicitudes[index].nombre; 
        const tipoDeEntrega = collection.Solicitudes[index].tipoDeEntrega;
        const correo = collection.Solicitudes[index].correo; 
        const numOfOrders = collection.Solicitudes[index].orders.length;

        var fileContent = "";

        for (let j = 0; j < numOfOrders; j++) {
          
          var cantidad = collection.Solicitudes[index].orders[j].cantidad;
          var lado = collection.Solicitudes[index].orders[j].lado;
          var centro = collection.Solicitudes[index].orders[j].centro; 
          var ratio = collection.Solicitudes[index].orders[j].ratio; 
          
          // console.log('Inicio-> Cliente:' + nombre + ' Cantidad de solicitudes: ' + cantidad + "\n\n");
          console.log("\n Order [" + nombre + "] [" + j + "] | " + cantidad + " | " + lado + " | " + centro + " | " + "\n");

          var tempFileContent = "";
          
          // producir e imprimir solo un shape en la pantalla
          tempFileContent = Shaper.ShapeController(lado , centro, outpuType, "Diamond", flashOnScreen, ratio);
          
          // console.log(tempFileContent + "\n\n");

          // una vuelta para cada cantidad
          for (let index = 0; index < cantidad; index++) {
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
          // console.log('Final: Cliente:' + nombre +  "\n\n");
          
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
      console.log("*");
      console.log("*   Inicio: -> " + horaInicial);
      console.log("*   Fin:    -> " + horaFinal);
      console.log("*");
      console.log("*   Duracion de Ejecucion  = " + duracion);
      console.log("*");
      console.log("*******************************************");
      console.log("\n\n");

    } catch (err) {
      console.log('Error parsing JSON:', err);
    }
  });
};