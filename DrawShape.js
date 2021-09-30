import { PonerLetras } from "./utils.js";

function ShapeController(c1, c2, outputType, shapeType, flash, Ratio){

  if(shapeType == "Diamond"){
    return MakeDiamondFlex(c1, c2, outputType, flash, Ratio)
  } else if(shapeType == "Square"){
    return MakeSquare (c1, c2, outputType, flash, Ratio)
  } else {
    return "Shape not implemented!"
  }

}
function MakeDiamondFlex (c1, c2, outputType, flash, Ratio){

/* Perfect base diamond

...[3]^... [7 columns]
./...\.
.\.../.
...v...
[4 rows]

*/

  var colunas = Math.round( (3 + 1) * Ratio);  // # de columnas del area de trabajo
  var rows = colunas;                          // # de rows del area de trabajo
  var lado = 0;

  var Shape = "";
  var lineFeed = "\n";

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

  const shapeConfiguration = "\n Ratio: " + Ratio + " Columns: " + colunas + " Rows: " + rows + lineFeed;
  Shape = shapeConfiguration;

  for (var i = 0; i <= (rows+1); i++) {

    if ( i <= (rows/2) ){
      lado = Math.round((rows/2)-i);
      Shape += Izquierda(lado, c1, flash) + "/" + Centro(colunas - (2*lado), c2, flash) + "\\" + Derecha(lado, c1, flash) + lineFeed;
      if (outputType != "web" && flash) process.stdout.write("\n");
    } else {
      Shape += Izquierda(lado, c1, flash) + "\\" + Centro(colunas - (2*lado), c2, flash) + "/" + Derecha(lado, c1, flash) + lineFeed;
      lado += 1;
      if (outputType != "web" && flash) process.stdout.write("\n");
    }
  }
  return Shape;
}
function MakeDiamond (c1, c2, outputType, flash, Ratio){

    // console.log("Output Type Requested: " + outputType);

    var rows = 30;
    var Shape = "";
    var lineFeed = "\n";

    if (outputType == "web") {
      lineFeed = "<br>";
    } else {
      lineFeed = "\n";
    }

    // console.log("Flash in Controller: " + flash + " Output: " + outputType)

    for (var i = 0; i <= rows; i++) {
      if( i == 0 ){
        Shape += Izquierda(rows-i+1, c1, flash) + "^" + Derecha(rows-i, c1, flash) + lineFeed;
      } else {
        Shape += Izquierda(rows-i, c1, flash) + "/" + Centro(61-2*(rows-i), c2, flash) + "\\" + Derecha(rows-i, c1, flash) + lineFeed;
      }
      if (outputType != "web" && flash) process.stdout.write("\n");
    }

    for (var i = rows; i >= 0; i--) {
      if( i == 0 ){
        Shape += Izquierda(rows-i+1, c1, flash) + "v" + Derecha(rows-i, c1, flash) + lineFeed;
      } else {
        Shape += Izquierda(rows-i, c1, flash) + "\\" + Centro(61-2*(rows-i), c2, flash) + "/" + Derecha(rows-i, c1, flash) + lineFeed;
      }
      if (outputType != "web" && flash) process.stdout.write("\n");
    }
    return Shape;
}
function MakeSquare (c1, c2, outputType, flash, Ratio){

/* Equations and Shape Explation

  Pefect Base Square:

    var colunas = Math.round(24 * Ratio);      // # de columnas del area de trabajo
    var centro = Math.round((10) * Ratio);     // # de columnas dentro del shape

    var rows = Math.round((6) * Ratio);        // # de vultas de una mitad
    var lateral = Math.round((6)* Ratio);      // # de columnas afuera del shape

  Generalized Base Square
    var colunas = Math.round(24 * Ratio);             // # de columnas del area de trabajo
    var centro = Math.round((colunas*0.4) * Ratio);   // # de columnas dentro del shape

    var rows = Math.round((colunas*0.25) * Ratio);    // # de vultas de una mitad
    var lateral = Math.round((colunas*0.25)* Ratio);  // # de columnas afuera del shape

    lateral =(colunas - (centro +  2))/2;

........................ (24)
........................
........................
[3]
.....(5)++++++++++++++(14).....
.....|............(12)|.....
.....|............|.....
.....|............|.....
.....|............|.....
.....++++++++++++++.....
[6]
........................
........................
........................
[12]

  */

    var colunas = Math.round(24 * Ratio);                // # de columnas del area de trabajo
    var centro = Math.round((colunas * 0.4) * Ratio);    // # de columnas dentro del shape

    var rows = Math.round((colunas * 0.25) * Ratio);     // # de vultas de una mitad
    var lateral = Math.round((colunas * 0.25) * Ratio);  // # de columnas afuera del shape

    // Make sure to adjust colunas after round up problems
    const finalCuerpoSize = (2 * lateral) + centro + 2;

    if (colunas < finalCuerpoSize) {
      colunas = finalCuerpoSize
    } else if (colunas > finalCuerpoSize) {
      centro += colunas-finalCuerpoSize
    }

    var Shape = "";      // Contenido del shape
    var lineFeed = "\n";

    if (outputType == "web") {
      lineFeed = "<br>";
    } else {
      lineFeed = "\n";
    }

    var headerFooter = Centro(colunas, c1, flash) + lineFeed;
    var aberturaCierre = Izquierda(lateral, c1, flash)  + "+" + Centro(centro, "-", flash) +  "+" +  Derecha(lateral, c1, flash) + lineFeed;
    var cuerpo = Izquierda(lateral, c1, flash) + Centro(1, "|", flash) + Centro(centro, c2, flash) + Centro(1, "|", flash) + Derecha(lateral, c1, flash) + lineFeed;

    // console.log("Flash in Controller: " + flash + " Output: " + outputType)
    var limite = Math.round((rows*2) * 0.3);
    
    const shapeConfiguration = "\n Ratio: " + Ratio + " Columns: " + colunas + " Rows: " + rows*2 + " Lado: " + lateral + " Centro: " + centro + lineFeed;
    Shape = shapeConfiguration;

    for (var i = 0; i < (rows * 2); i++) {

      switch (true) {

        case (i == (limite - 1)):
          Shape += aberturaCierre       // Up
          break;
        case (i < limite - 1):
          Shape += headerFooter;        // Up
          break;
        case (i == ((rows*2) - limite)):
          Shape += aberturaCierre;      // Down
          break;
        case (i > ((rows*2) - limite)): // Down
          Shape += headerFooter;
          break;
        default:
          Shape += cuerpo;
          break;
      }

      // if (i == (limite - 1)) {
      //   Shape += aberturaCierre
      // } else if (i < limite - 1){
      //   Shape += headerFooter;
      // } else if (i == (rows - limite)){
      //   Shape += aberturaCierre;
      // } else if (i > (rows - limite)){
      //   Shape += headerFooter;
      // } else { // mis otros 70%
      //   Shape += cuerpo;
      // } 

      GetLineFeed(outputType, flash);
    }
    // for (var i = rows; i > 0; i--) {

    //   if (i == (limite)) {
    //     Shape += aberturaCierre
    //   } else if( i < limite){
    //     Shape += headerFooter;
    //   } else { // mis otros 70%
    //     Shape += cuerpo;
    //   }
    //   GetLineFeed(outputType, flash);
    // }
    return Shape;
}
function GetLineFeed (outputType, flash){

  if (outputType != "web" && flash) 
    return  process.stdout.write("\n");

}
function Izquierda(Tamano, CaracterDeseado, flash){
  return PonerLetras(Tamano, CaracterDeseado, flash);
}
function Centro(Tamano, CaracterDeseado, flash){
    return PonerLetras(Tamano, CaracterDeseado, flash);
}
function Derecha(Tamano, CaracterDeseado, flash){
    return PonerLetras(Tamano, CaracterDeseado, flash);
}

export { ShapeController};

