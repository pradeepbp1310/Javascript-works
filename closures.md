# Closure
Closure is a function inside a function. Simple, right? If you think closure is more than an inner function then you are right.

## What is Closure?
A Closure is an inner function which means a function defined within another function. A closure has access to 3 scope chains
1. It has access to Outer function's variable
2. It has access to Global variables 
3. It has access to its own variables

Note: A closure can not call outer function's arguements object, however, it can call outer function's parameters directly.

```javascript
function getName(firstName, lastName) {
    let nameIs = 'My name is ';
    // formName() is a closure which means inner function
    function formName() {
        // This function has access to outer function's i.e getName() variable nameIs and 
        // parameters firstName and lastName
        console.log(`${nameIs + firstName + " " + lastName}`);
    }
    return formName();
}
getName('Pradeep', 'B P');
```

## Closures Rules and Side Effects

### 1. Closure have an access to outer function variables even after the outer function is executed
Because of the function uses same scope chain. The closure can be called later which will have access to variables and parameters of outer function

```javascript
function addNumber(num1){
let text = 'Total of two numbers is ';
return function summingNum(num2){
return `${text} ${num1 + num2}`;
}
}
let add = addNumber(2); // This will return the closure which holds the variable text and parameter num1.
// Lets break down a bit, it looks like this
// summingNum(num2){
// return `Total of two numbers is  ${2 + num2}`;
// }

// Now lets pass parameter to closure 
add(5) // 7

// or we can pass parameter to closure like this
addNumber(2)(5) // 7
```
![alt text](https://github.com/pradeepbp1310/100-days-of-javascript/blob/master/day_39_Closures/closures.png)

### 2. Closures stores the references to the outer function's variables
Closure do not save the actual value, rather it stores the references of the outer function variable. So that closure will get the changed variable value from the outer function if there is a change before the closure is executed.

```javascript
function salary(){
let baseSalary = 2000;
return {
  getSalary: function(){
    return 'My salary now is '+ baseSalary;
  },
  hikeSalary: function(newSalary){
  // Setting outer function baseSalary variable with new value
    baseSalary = newSalary
  }
}
}
let mySal = salary();
// Intially executed and got the baseSalary variable value from outer function
console.log(mySal.getSalary()); // My salary now is 2000

mySal.hikeSalary(3000); // Setting new baseSalary value

//Changed to new baseSalary value means it stores references of the variables
console.log(mySal.getSalary()); // My salary now is 3000 
```

### Closures will go wrong in some cases
In the previous example as we see closure will have the references of updated outer function variables as a result they can also lead to bugs when the outer function’s variable changes with a for loop

```javascript
function heroes(arr){
let power = 100;
for(var i = 0; i< arr.length; i++){
	arr[i]["id"] = function(){
		return power + i;
	}
}
return arr; // by the time this function returns the value of the i will be 3
//  arr() closure function has access to the outer function's heroes() variables by reference, not by value
}
let herArr = [{name: 'Dravid', id: 0}, {name: 'Souvarv', id: 0}, {name: 'Sri', id: 0}];
let p = heroes(herArr);
console.log(p[0].id()); // 103
```

1. This can be fixed using let declaration in for loop
```javascript
function heroes(arr){
let power = 100;
for(let i = 0; i< arr.length; i++){
	arr[i]["id"] = function(){
		return power + i;
	}
}
return arr; // by the time this function returns the value of the i will be 3
}
let herArr = [{name: 'Dravid', id: 0}, {name: 'Souvarv', id: 0}, {name: 'Sri', id: 0}];
let p = heroes(herArr);
console.log(p[0].id()); // 100
```
2. This can be fixed using IIFE
```javascript
function heroes(arr){
var power = 100;
for(var i = 0; i< arr.length; i++){
	arr[i]["id"] = function(j){
	return function () {
	return power + i;
	}();	
	}(i);
}
return arr; // by the time this function returns the value of the i will be 3
}
var herArr = [{name: 'Dravid', id: 0}, {name: 'Souvarv', id: 0}, {name: 'Sri', id: 0}];
var p = heroes(herArr);
console.log(p[0].id()); // 100
```

```
// The inner function add remembers the value of x passed onto outer function makeAdd even after the makeAdd function invoked
function makeAdd(x){
	return function add(y){
		return x + y;
	}
}

let plusTen = makeAdd(10);
let plusOne = makeAdd(1);

plusTen(20);
plusOne(29);

```

### Refernces
- [http://javascriptissexy.com/understand-javascript-closures-with-ease/](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
- [https://stackoverflow.com/questions/111102/how-do-javascript-closures-work](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work)
