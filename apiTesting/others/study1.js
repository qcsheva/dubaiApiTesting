//Example 1: create random 4 digit number js

var val = Math.floor(1000 + Math.random() * 9000);
console.log("random 4: " + val);

//Example 2: javascript 5 digit random number
var min = 10000;
var max = 90000;
var num = Math.floor(Math.random() * min) + max;

console.log("random 5: " + num)

//random phone number 
var phone = "0" + Math.floor(Math.random() * 1000000001);
console.log("phone number is: " + phone)

//javascript get random number in range
function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
console.log("phone random in range: " +"0" + getRandomNumberBetween(000000001,999999999))

