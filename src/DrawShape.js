import { PonerLetras } from "../utils/utils.js";

function ShapeController(c1, c2, outputType, shapeType, flash, Ratio){

  switch (shapeType) {
    case "Diamond":
      return MakeDiamond(c1, c2, outputType, flash, Ratio);
    case "Square":
      return MakeSquare(c1, c2, outputType, flash, Ratio);
    case "Rhombus":
      return Makerhombus(c1, c2, outputType, flash, Ratio);
    default:
      return "Shape not implemented!"
      break;
  }

}
function MakeDiamond (c1, c2, outputType, flash, ratio){

/* Perfect base diamond

...[3]^... [7 columns]
./...\.
.\.../.
...v...
[4 rows]

*/

  var colunas = Math.round( (3 + 1) * ratio);  // # de columnas del area de trabajo
  var rows = colunas;                          // # de rows del area de trabajo
  var lado = 0;

  var Shape = "";
  var lineFeed = "\n";

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

  const shapeConfiguration = "\n Ratio: " + ratio + " Columns: " + colunas + " Rows: " + rows + lineFeed;
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
function MakeSquare (c1, c2, outputType, flash, ratio){

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

    var colunas = Math.round(24 * ratio);                // # de columnas del area de trabajo
    var centro = Math.round(colunas * 0.4);    // # de columnas dentro del shape

    var rows = Math.round(colunas * 0.25);     // # de vultas de una mitad
    var lateral = Math.round(colunas * 0.25);  // # de columnas afuera del shape

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
    
    const shapeConfiguration = "\n Ratio: " + ratio + " Columns: " + colunas + " Rows: " + rows*2 + " Lado: " + lateral + " Centro: " + centro + lineFeed;
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
function Makerhombus(c1, c2, outputType, flash, ratio){
  /*
  ....................... (24 colunas)
  .......................
  [2 rows]
  ........[8]++++++++++++++[14].[1]
  .......|............|..
  ......|............|...
  .....|............|....
  ....|............|.....
  ...|............|......
  ..|............|.......
  .|............|........
  ++++++++++++++.........
   [8 rows]
  ........................
  ........................
  [12]

  */
  var colunas = Math.round(24 * ratio);                // # de columnas del area de trabajo
  var centro = Math.round((colunas * 0.70));    // # de columnas dentro del shape

  var rows = Math.round(colunas * 0.25);     // # de vultas de una mitad
  var lateral = Math.round(colunas * 0.20);  // # de columnas afuera del shape

  var Shape = "";      // Contenido del shape
  var lineFeed = "\n";

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

  var headerFooter = Centro(colunas, c1, flash) + lineFeed;
  var aberturaCierre = ""
  var cuerpo = "";
  
  var limite = Math.round((rows*2) * 0.3);
  
  const shapeConfiguration = "\n Ratio: " + ratio + " Columns: " + colunas + " Rows: " + rows*2 + " Lado: " + lateral + " Centro: " + centro + lineFeed;
  Shape = shapeConfiguration;

  var offSet = 0;
  var LateralDireita = (colunas - (centro+2) );

  for (var i = 0; i < (rows * 2); i++) {

    switch (true) {

      case (i == (limite - 1)):
        // aberturaCierre Up
        Shape += Izquierda(LateralDireita - offSet, c1, flash)  + "+" + Centro(centro, "-", flash) +  "+" +  Derecha(offSet, c1, flash) + lineFeed;   // Up
        offSet += 1;
        break;
      case (i < limite - 1):
        Shape += headerFooter;        // Up
        break;
      case (i == ((rows*2) - limite)):
        // aberturaCierre Down
        Shape += Izquierda(LateralDireita-offSet, c1, flash)  + "+" + Centro(centro, "-", flash) +  "+" +  Derecha(offSet, c1, flash) + lineFeed;
        offSet += 1;
        break;
      case (i > ((rows*2) - limite)): // Down
        Shape += headerFooter;
        break;
      default:
        // cuerpo
        cuerpo = Izquierda(LateralDireita-offSet, c1, flash) + Centro(1, "/", flash) + Centro(centro, c2, flash) + Centro(1, "/", flash) + Derecha(offSet, c1, flash) + lineFeed;
        Shape += cuerpo;
        offSet += 1;
        break;
    }
    GetLineFeed(outputType, flash);
  }

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

