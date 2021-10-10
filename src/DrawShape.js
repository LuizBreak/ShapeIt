import { PonerLetras, reverseShape, getReversed } from "../utils/utils.js";

function ShapeController(c1, c2, c3, outputType, shapeType, flash, Ratio){

  switch (shapeType) {
    case "Diamond":
      return MakeDiamond(c1, c2, outputType, flash, Ratio);
    case "Square":
      return MakeSquare(c1, c2, outputType, flash, Ratio);
    case "Rhombus":
      return Makerhombus(c1, c2, outputType, flash, Ratio);
    case "Cross":
      return MakeCross(c1, c2, outputType, flash, Ratio);
    case "Envelope":
      return MakeEnvelope(c1, c2, c3, outputType, flash, Ratio);

    default:
      return "Shape not implemented!"
      break;
  }

}
function getBiggerSize(num1, num2, num3){

  if( num1 >= num2 && num1 >= num3){
    console.log(num1+" is the largest Number");
    return num1;
  } else if (num2 >= num1 && num2 >= num3){
    console.log(num2+" is the largest Number");
    return num2;
  } else
      console.log(num3+" is the largest Number");
      return num3;

}
function MakeCross (c1, c2, outputType, flash, ratio){
/*
......................... headerFooter -> columnas [25] -> HeaderFooter
......................... limite [2] = columnas * 0.08
..........+++++.......... aberturaCierre -> Izquierdo [10 - lado1 = columnas * 0.40] Border [5 - Top1 = columnas * 0.20] Derecho [lado1] -> AperturaCierre
..........+...+.......... cuerpo -> Izquierdo [lado1] Border[1] Centro [3 - Tcentro1 = columnas * 0.12] Border[1] Derecho [=] -> Cuerpo1
..........+...+..........
....+++++++...+++++++.... cuerpo2 -> Izquierdo [4 - lado2 = columnas * 0.16] Border[7 - Top2 = columnas * 0.28] Centro [Tcentro1] Border[=] Derecho [lado2] -> Cuerpo2
....+...............+.... cuerpo3 -> Izquierdo [lado2] Border[1] Centro [Tcentro2 = columnas * 0.60] Border[1] Derecho [lado2] -> Cuerpo3
....+...............+....
....+++++++...+++++++....
..........+...+..........
..........+...+..........
..........+++++.......... 
......................... 
......................... rows [14]


......................... [25]
.........................
..........-----.......... [10]+[5]+[10]
..........|...|.......... [10]+[1]+[3]+[1]+[10]
..........|...|..........
.....---------------..... [5]+[1]+[13]+[1]+[5]
.....|.............|..... [5]+[1]+[13]+[1]+[5]
.....|.............|.....
.....---------------.....
..........|...|..........
..........|...|..........
..........-----..........
.........................
......................... Rows[14]


*/

    var columnas = Math.round(25 * ratio);      // # de columnas del area de trabajo

    var rows = Math.round(columnas * 0.28);     // # de filas del area de trabajo

    var lateral = Math.round(columnas * 0.4);  // # de columnas afuera del shape
    var lateral1 = Math.round(columnas * 0.2);

    var Tcentro1 = Math.round(columnas * 0.12)
    var Tcentro2 = Math.round(columnas * 0.52)

    var top1 = Math.round(columnas * 0.2);
    var top2 = Math.round(columnas * 0.28);

    var limite = Math.round((columnas) * 0.12);
    var limite2 = Math.round((columnas) * 0.24);

    var Shape = "";      // Contenido del shape
    var lineFeed = "\n";

    if (outputType == "web") {
      lineFeed = "<br>";
    } else {
      lineFeed = "\n";
    }
    // .........................
    var headerFooter = Centro(columnas, c1, flash) + lineFeed;

    // ..........-----..........
    var aperturaCierre = Izquierda(lateral, c1, flash) + Centro(1, "-", flash) + Centro(Tcentro1, "-", flash) + Centro(1, "-", flash) + Derecha(lateral, c1, flash) + lineFeed;
    
    // ..........|...|.......... 
    var cuerpo = Izquierda(lateral, c1, flash) + Centro(1, "|", flash) + Centro(Tcentro1, c2, flash) + Centro(1, "|", flash) + Derecha(lateral, c1, flash) + lineFeed;
    
    // .....------...------.....
    var wing = Izquierda(lateral1, c1, flash) + Centro(1, "-", flash) +  Centro(Tcentro2, "-", flash) + Centro(1, "-", flash) + Derecha(lateral1, c1, flash) + lineFeed;
    
    // .....|.............|.....
    var cuerpo2 = Izquierda(lateral1, c1, flash) + Centro(1, "|", flash) + Centro(Tcentro2, c2, flash) + Centro(1, "|", flash) + Derecha(lateral1, c1, flash) + lineFeed;

    // Make sure to adjust colunas size after round up problems
    var maxSize = getBiggerSize(cuerpo.length, wing.length, cuerpo2.length);

    // if (columnas < maxSize) {
    //   columnas += maxSize - columnas;
    //   headerFooter = Centro(columnas, c1, flash) + lineFeed;
    // }
    // if (aperturaCierre.length < maxSize){
    //   Tcentro1 += maxSize - aperturaCierre.length;
    //   var aperturaCierre = Izquierda(lateral, c1, flash) + Centro(1, "-", flash) + Centro(Tcentro1, "-", flash) + Centro(1, "-", flash) + Derecha(lateral, c1, flash) + lineFeed;
    // }
    // if (cuerpo.length < maxSize) {
    //   Tcentro1 += maxSize - aperturaCierre.length;
    //   cuerpo = Izquierda(lateral, c1, flash) + Centro(1, "|", flash) + Centro(Tcentro1, c2, flash) + Centro(1, "|", flash) + Derecha(lateral, c1, flash) + lineFeed;
    // }
    // if (wing.length < maxSize) {
    //   Tcentro1 += maxSize - wing.length;
    //   var wing = Izquierda(lateral1, c1, flash) + Centro(top2, "-", flash) +  Centro(Tcentro1, c2, flash) + Centro(top2, "-", flash) + Derecha(lateral1, c1, flash) + lineFeed;
    // }
    // if (cuerpo2.length < maxSize) {
    //   Tcentro2 += maxSize - cuerpo2.length;
    //   cuerpo2 = Izquierda(lateral1, c1, flash) + Centro(1, "|", flash) + Centro(Tcentro2, c2, flash) + Centro(1, "|", flash) + Derecha(lateral1, c1, flash) + lineFeed;
    // }

    const shapeConfiguration = "\n Ratio: " + ratio + " Columns: " + columnas + " Rows: " + rows*2 + lineFeed;
    Shape = shapeConfiguration;

    // print points
    var printApertura = (limite - 1);
    var printCierre = (rows*2) - limite;
    var printWingUp = (limite2 - 1);
    var printWingDown = (rows*2) - printWingUp - 1;

    for (var i = 0; i < (rows * 2); i++) {

      switch (true) {
        case (i < printApertura):
          Shape += headerFooter;        // .........................
          break;
        case (i == printApertura):
          Shape += aperturaCierre       // ..........-----..........
          break;
        case (printApertura < i && i < printWingUp):
          Shape += cuerpo;              // ..........|...|..........
          break;
        case (i == printWingUp):        // .....------...------.....
          Shape += wing;
          break;
        case (printWingUp < i && i < printWingDown):
          Shape += cuerpo2;             // .....|.............|.....
          break;
        case (i == printWingDown):
          Shape += wing;             // .....------...------.....
          break;
        case (printWingDown < i && i < printCierre):
          Shape += cuerpo;              // ..........|...|..........
          break;
        case (i == printCierre):
          Shape += aperturaCierre;      // ..........-----..........
          break;
        case (i > printCierre):         // .........................
          Shape += headerFooter;
          break;
        default:
          Shape += "*** Error ***" + lineFeed;
          break;
      }

      GetLineFeed(outputType, flash);
    }
    return Shape;
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
function MakeEnvelope(c1, c2, c3, outputType, flash, ratio){
  /*
    c1="#", c2="+", c3="o", outputType="terminal", flash=false, ration=1

    columnas = [26]
    rows = [16] columnas * 0.61
    
    01 ########################## [26#]
    02 ########################## limiteArriba = rows * 0.12
    03 ##|+\+++++++++++++++++++## [2#][1|][1+][1\][19+][2#]
    04 ##|++\ooooooooooooooooo+## [2#][1|][+ -> 1] [o -> -1][2#]
    05 ##|+++\oooooooooooooooo+##
    06 ##|++++\ooooooooooooooo+##
    07 ##|+++++\oooooooooooooo+##
    08 ##|++++++\ooooooooooooo+## limiteMedio = rows * 0.5
    09 ##|++++++/ooooooooooooo+## 
    10 ##|+++++/oooooooooooooo+##
    11 ##|++++/ooooooooooooooo+##
    12 ##|+++/oooooooooooooooo+##
    13 ##|++/ooooooooooooooooo+##
    14 ##|+/+++++++++++++++++++##
    15 ########################## LimiteAbajo = rows - LimiteArriba
    16 ##########################

    tamanoDelCuerpo = columnas * 0.84

    headerFooter    += Centro(columnas, c1) + lineFeed;
    aperturaCierre  += Izquierda(lado, c1) + "|" + Izquierda(i-1, c2) + "\\" + Derecha(tamanoDelCuerpo - (i+1), c2) + Izquierda(lado, c1) + lineFeed;
    cuerpo          +=  Izquierda(lado, c1) + "|"  + Izquierda(i-1, c2) + "\\" + Derecha(tamanoDelCuerpo - (i+2), c3) + c2 + Izquierda(lado, c1) + lineFeed;
    lado = limiteArriba

    */

    var columnas = Math.round(26 * ratio);                // # de columnas del area de trabajo
    var rows = Math.round(columnas * 0.61);               // # de vultas de una mitad
    var tamanoDelCuerpo = Math.round(columnas * 0.84);    // # de columnas dentro del shape

    var limiteArriba = Math.round(rows * 0.12);
    var limiteAbajo = Math.round(rows - limiteArriba);
    var limiteMedio = Math.round(rows * 0.5)
    var lado = limiteArriba;

    var Shape = "";      // Contenido del shape
    var lineFeed = "\n";

    var headerFooterUp      = "";
    var aperturaCierreUp    = "";
    var cuerpoUp            = "";
    var headerFooterDown    = "";
    var aperturaCierreDown  = "";
    var cuerpoDown          = "";



    for (var i = 0; i < rows; i++) {

      switch (true) {

        case (i < limiteArriba):
          // ##########################
          headerFooterUp += Centro(columnas, c1) + lineFeed;
          headerFooterDown += Centro(columnas, c1) + lineFeed;
          break;
        
        case (i == limiteArriba):
          // ##|+\+++++++++++++++++++##
          // ##|+/+++++++++++++++++++##
          aperturaCierreUp  += Izquierda(lado, c1) + "|" + Izquierda(i-1, c2) + "\\" + Derecha(tamanoDelCuerpo - (i+1), c2) + Izquierda(lado, c1) + lineFeed;
          aperturaCierreDown = Izquierda(lado, c1) + "|" + Izquierda(i-1, c2) + "/"  + Derecha(tamanoDelCuerpo - (i+1), c2) + Izquierda(lado, c1) + lineFeed + aperturaCierreDown;
          break;

        case (i > limiteArriba && i < limiteMedio):
          // ##|++\ooooooooooooooooo+## 
          // ##|++/ooooooooooooooooo+## 
          cuerpoUp  +=  Izquierda(lado, c1) + "|"  + Izquierda(i-1, c2) + "\\" + Derecha(tamanoDelCuerpo - (i+2), c3) + c2 + Izquierda(lado, c1) + lineFeed;
          cuerpoDown =  Izquierda(lado, c1) + "|"  + Izquierda(i-1, c2) +  "/" + Derecha(tamanoDelCuerpo - (i+2), c3) + c2 + Izquierda(lado, c1) + lineFeed + cuerpoDown;
          break;
      }
    }
    Shape += headerFooterUp + aperturaCierreUp + cuerpoUp;        // up part of the shape
    Shape += cuerpoDown + aperturaCierreDown + headerFooterDown;  // bottom part of the shape
    
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

