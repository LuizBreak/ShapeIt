import { PonerLetras } from "../utils/utils.js";

function MyController(desiredOperation, n1, n2) {

    // Este switch case espera recibir +, -, *, /
    switch(desiredOperation) {
        case "+":
        var resultado = AddNumbers(n1, n2);
        break;
        case "-":
            var resultado = SubstractNumbers(n1, n2);
            break;
        case "*":
            var resultado = MultipleNumbers(n1, n2);
            break;
        case "/":
            var resultado = DivideNumbers(n1, n2);
            break;
    }
    return BuildMessage(resultado);
}
function AddNumbers(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
}
function SubstractNumbers(n1, n2) {
    return parseFloat(n1) - parseFloat(n2);
}
function MultipleNumbers(n1, n2){
    return parseFloat(n1) * parseFloat(n2);
}
function DivideNumbers(n1, n2){
    return parseFloat(n1) / parseFloat(n2);
}
function BuildMessage(NumbersOfLoops) {

    var contenido = "";

    for (let i = 0; i < NumbersOfLoops ; i++) {
        contenido = contenido + PonerLetras(NumbersOfLoops, ".") + " Tour: <b>" + [i] + "</b> - Le resultat final est <b> " + NumbersOfLoops + "</b><br><br>";
    }

    for (let i = NumbersOfLoops; i > 0 ; i--) {
        contenido = contenido + PonerLetras(NumbersOfLoops, ".") + " Tour: <b>" + [i] + "</b> - Le resultat final est <b> " + NumbersOfLoops + "</b><br><br>";
    }    	
    return contenido;

}
export {MyController}