'use strict';

import * as Shaper from './DrawShape.js';
import { writeToFile, deleteFile, readFromFile, jsonReader, EnviarShapeToClient} from  './fileOperations.js'
import fs from 'fs';

// arg[] parameters
var lado = "";
var centro = "";
var outpuType = "web";
var flashOnScreen = false;

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
processJsonRequests('./shapesRequest.v2.json', flashOnScreen);

// TrabajandoConArreglos('Nuestro programa es muy chulo!');

function processJsonRequests(filePath, flashOnScreen){

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

        const nombre = solicitudes.shapes[index].nombre; 
        const tipoDeEntrega = solicitudes.shapes[index].tipoDeEntrega;
        const correo = solicitudes.shapes[index].correo; 
        const numOfOrders = solicitudes.shapes[index].orders.length;

        for (let j = 0; j < numOfOrders; j++) {
          
          var cantidad = solicitudes.shapes[index].orders[j].cantidad;
          var lado = solicitudes.shapes[index].orders[j].lado;
          var centro = solicitudes.shapes[index].orders[j].centro; 
          
          var tempFileContent = "";
          var fileContent = "";

          // console.log('Inicio-> Cliente:' + nombre + ' Cantidad de Shapes: ' + cantidad + "\n\n");
          console.log("\n Order [" + nombre + "] [" + j + "] | " + cantidad + " | " + lado + " | " + centro + "\n");

          // producir e imprimir solo un shape en la pantalla
          tempFileContent = Shaper.ShapeController(lado , centro, outpuType, flashOnScreen);
          
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

// function TrabajandoConArreglos(nombreDelUsuario){

//   let listaDeElementos = nombreDelUsuario.split("");
//   console.log(listaDeElementos);

//   for (let index = 0; index < listaDeElementos.length; index += 2) {
//     //listaDeElementos[index] = index;
//     console.log(listaDeElementos[index])
//   }
// }


/*

*******************************************
*
*   Programa: ShapeMaker
*
*   Fecha de Ejecucion: 21-9-2021
*   Numero de Shapes: 103
*   Inicio: -> 12:57:58
*   Final:  -> 12:58:6
*
*   Ducarion de Ejecucion  = 7.739
*
*******************************************

*******************************************
*
*   Programa: ShapeMaker
*
*   Fecha de Ejecucion: 21-9-2021
*   Numero de Shapes: 103
*   Inicio: -> 13:25:54
*   Final:  -> 13:25:55
*
*   Ducarion de Ejecucion  = 1.096
*
*******************************************

*******************************************
*
*   Programa: ShapeMaker
*
*   Fecha de Ejecucion: 21-9-2021
*   Numero de Shapes: 103
*   Inicio: -> 13:39:21
*   Final:  -> 13:39:21
*
*   Ducarion de Ejecucion  = 0.067
*
*******************************************
*/



