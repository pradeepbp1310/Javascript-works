//Circumference of a circle
function Circumference(r){
    var cal = 2*Math.PI*r;
    return cal;
}
console.log(Circumference(2));

//Radius of a circle
function radius(a){
    var r = Math.sqrt(a/Math.PI);
    return r;
}
console.log(radius(2));

//convert sring to integer
var conv = parseInt("1230", 2);
console.log(conv);

//Strings

//String Primitive ans String Object

var prim = "Pradeep";
var sObj = new String(prim);

console.log(typeof(prim));
console.log(typeof(sObj));

var primc = "2+2";
var sObjc = new String(primc);
console.log(eval(primc)); 
console.log(eval(sObjc));
console.log(eval(sObjc.valueOf()));

//objects
function person(name, age){
    this.name = name;
    this.age = age;
    this.remaining = codeyear;
}

function codeyear(){
    this.timetaken = 40 - this.age;
    return this.timetaken;
 }

var perObj = new person("Pradeep", 27);
console.log(perObj.remaining());

//Arrays

var myArray = [10, 20, 30];
myArray.push(50);
console.log(myArray[3]);

//functions

function add(x,y){
    z = x+y;
    return z;
}
console.log(add(2,5));

//area of a circle
function areaofCircle(radiuss){
    return radiuss*radiuss*(Math.PI);
}
console.log(areaofCircle(2));

//Find the sum of all the multiples of 3 or 5 below 1000.

function sum(){
    var sum = 0;
    for(i=1; i<1000;i++){
        if((i%3==0 || i%5==0)){
             sum = sum+i;
        }
    }
    return sum;
}
console.log(sum());

function addd(){
    var sum = 0;
    for(i=0; j=arguments.length, i<j; i++){
        sum+=arguments[i];
    }
    return sum;
}
console.log(addd(2,3,4,5));



function avg(){
    var sum = 0;
    for(var i=0; j= arguments.length,i<j; i++){
        sum+=arguments[i];
    }
    return sum/arguments.length;
}
console.log(avg(2,3,4,5,6));

//using spread syntax

function spreadavg(...args){
    sum=0;
    for(let value of args){
        sum+=value;
    }
    return sum/args.length;
}
console.log(spreadavg(2,3,4,5,6,9));