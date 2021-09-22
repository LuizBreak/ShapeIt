import { PonerLetras } from "./utils.js";

function ShapeController(c1, c2, outputType, flash){

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