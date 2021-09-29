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

    if (j==2) {
        lado = process.argv[j];
    } else if (j==3) {
        centro = process.argv[j];
    } else if (j==4)  {
        if (process.argv[j].length != 0){
            outpuType = process.argv[j];
        }
    } else if (j==5){
      flashOnScreen = (process.argv[j] == 'true');
      // console.log("Flash: " + flashOnScreen)
    } else if (j==6){
      filePath = process.argv[j];
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
processJsonRequests(filePath, flashOnScreen);

// TrabajandoConArreglos('Nuestro programa es muy chulo!');

function processJsonRequests(filePath, flashOnScreen){


  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }

    // console.log(data);

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
          tempFileContent = Shaper.ShapeController(lado , centro, outpuType, "Square", flashOnScreen, ratio);
          
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

// function TrabajandoConArreglos(nombreDelUsuario){

//   let listaDeElementos = nombreDelUsuario.split("");
//   console.log(listaDeElementos);

//   for (let index = 0; index < listaDeElementos.length; index += 2) {
//     //listaDeElementos[index] = index;
//     console.log(listaDeElementos[index])
//   }
// }