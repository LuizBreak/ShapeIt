export function PonerLetras(Tamano, LetraDeseada, flash=false) {

    var MiFila = "";
  
    for (var i = 0; i < Tamano; i++) {
      MiFila += LetraDeseada;
      // console.log(LetraDeseada);
      try {

        if (flash) process.stdout.write(LetraDeseada)
  
        // for (let index = 0; index < 200000; index++) {
        //   // Just a waiting time
        // }

        } catch (error) {
          // carry on 
      }
    }
    return MiFila;
}
export function reverseShape(str) {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"
  
  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}
export function getReversed (Shape){
  var reverseString = "";
  let splitString = Shape.split("\n");
  for (let index = splitString.length; index > 0; index--) {
    reverseString += splitString[index] + "\n";
  }
  return reverseString;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function helloWorld(name){
  return ("Hello " + name);
}