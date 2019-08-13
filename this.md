# 'this' 
- this is the window object basically in global execution context.
- this is usually used inside a function or method.
- this keyword is used to refer to an object that the function is bound to.
- this also contains the value or property of an object not just only the refernce
- this reference always refers a singular object and this holds the value of an object.

## Important point about this keyword
- 'this' is not assigned an value untill the object invokes the function where 'this' is defined
- this refers to the object where it is defined, it is not until an object invokes the function where this is defined, once function invoked, this assigns the value
- The value it is assigned is based exclusively on the object that invokes the this Function.

## Context of 'this'
- The object that invokes the this Function is in context, and we can change the context by invoking the this Function with another object; then this new object is in context.
- In strict mode this inside a function returns undefined by default where as in no strict mode this returns global window object by default
```javascript
// non-strict mode
function globalFn(){
console.log(this); // window object
}

//strict mode
function globalFn(){
'use strict';
console.log(this); // undefined
}
```
```javascript
let person = {
    firstName: 'Pradeep',
    lastName: 'Gowda',
    age: 28,
    getFullName: function () {
        // this represents person object here
        console.log(this.firstName + ' ' + this.lastName);
    }
}
// The "context", when invoking getFullName, is the person object, when we invoke the getFullName() method on the person object.
person.getFullName(); // Person object this

let anotherPerson = {
    firstName: 'Rohit',
    lastName: 'Sharma'
}

// We can use the apply/call method to set the "this" value explicitly—more on the apply() method later.
// "this" gets the value of whichever object invokes the "this" Function, hence: 
// person.getFullName.call(anotherPerson);
person.getFullName.apply(anotherPerson); // Rohit Sharma
// So the context is now anotherPerson because anotherPerson invoked the person.getFullName() method by virtue of using the apply()
```

## Scenarios when the this keyword becomes tricky
1. When we borrow a method that uses 'this'
1. When we assign a method that uses 'this' to a variable
1. When a function that uses 'this' is passed as a callback function
1. When 'this' is used inside a closure—an inner function.

### 1. Fix this when used in a method passed as a callback
button ($(“button”)) is an object on its own, and we are passing the user.clickHandler method to its click() method as a callback, we know that this inside our user.clickHandler method will no longer refer to the user object. this will now refer to the object where the user.clickHandler method is executed because this is defined inside the user.clickHandler method. And the object that is invoking user.clickHandler is the button object—user.clickHandler will be executed inside the button object’s click method.

Note that even though we are calling the clickHandler () method with user.clickHandler (which we have to do, since clickHandler is a method defined on user), the clickHandler () method itself will be executed with the button object as the context to which “this” now refers. So this now refers to is the button ($(“button”)) object.

At this point, it should be apparent that when the context changes—when we execute a method on some other object than where the object was originally defined, the this keyword no longer refers to the original object where “this” was originally defined, but it now refers to the object that invokes the method where this was defined.

```javascript
    // We have a simple object with a clickHandler method that we want to use when a button on the page is clicked
    var user = {
    data:[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],
    clickHandler:function (event) {
    var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1

    // This line is printing a random person's name and age from the data array
    console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    }
    }

    // The button is wrapped inside a jQuery $ wrapper, so it is now a jQuery object
    // And the output will be undefined because there is no data property on the button object
    $ ("button").click (user.clickHandler); // Cannot read property '0' of undefined

    // to fix this
    $("button").click (user.clickHandler.bind (user)); // P. Mickelson 43
```
### 2. Fix this inside closure
- this will only be available to outer function and can not be accessible by inner function that is closure 
```javascript
    var user = {
    tournament:"The Masters",
    data      :[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],

    clickHandler:function () {
    // the use of this.data here is fine, because "this" refers to the user object, and data is a property on the user object.

    this.data.forEach (function (person) {
    // But here inside the anonymous function (that we pass to the forEach method), "this" no longer refers to the user object.
    // This inner function cannot access the outer function's "this"
   
    console.log ("What is This referring to? " + this); //[object Window]
    console.log (person.name + " is playing at " + this.tournament);
    // T. Woods is playing at undefined
    // P. Mickelson is playing at undefined
    })
    }
    }

    user.clickHandler(); // What is "this" referring to? [object Window]
```

Solution to maintain this inside anonymous functions:
```javascript
    var user = {
    tournament:"The Masters",
    data      :[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],

    clickHandler:function (event) {
    // To capture the value of "this" when it refers to the user object, we have to set it to another variable here:
    // We set the value of "this" to theUserObj variable, so we can use it later
    var theUserObj = this;
    this.data.forEach (function (person) {
    // Instead of using this.tournament, we now use theUserObj.tournament
    console.log (person.name + " is playing at " + theUserObj.tournament);
    })
	// or
	//this.data.forEach (function (person) {
    //console.log (person.name + " is playing at " + theUserObj.tournament);
    //}, this) // pass this as an argument
    }

    }
    user.clickHandler();
    // T. Woods is playing at The Masters
    //  P. Mickelson is playing at The Masters

    // A common practice amongst JavaScript users is to use this code
    var that = this;
	var self = this;
```

### 3. Fix this when method is assigned to a variable
```javascript
// This data variable is a global variable
    var data = [
    {name:"Samantha", age:12},
    {name:"Alexis", age:14}
    ];

    var user = {
    // this data variable is a property on the user object
    data    :[
    {name:"T. Woods", age:37},
    {name:"P. Mickelson", age:43}
    ],
    showData:function (event) {
    var randomNum = ((Math.random () * 2 | 0) + 1) - 1; // random number between 0 and 1

    // This line is adding a random person from the data array to the text field
    console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
    }
    }

    // Assign the user.showData to a variable
    var showUserData = user.showData;

    // When we execute the showUserData function, the values printed to the console are from the global data array, not from the data array in the user object
    //
    showUserData (); // Samantha 12 (from the global data array)
```

```javascript
  // Bind the showData method to the user object
    var showUserData = user.showData.bind (user);
 // Now we get the value from the user object, because the this keyword is bound to the user object
    showUserData (); // P. Mickelson 43
```
### 4. Fix this when borrowing methods
```javascript
 // We have two objects. One of them has a method called avg () that the other doesn't have
    // So we will borrow the (avg()) method
    var gameController = {
    scores  :[20, 34, 55, 46, 77],
    avgScore:null,
    players :[
    {name:"Tommy", playerID:987, age:23},
    {name:"Pau", playerID:87, age:33}
    ]
    }

    var appController = {
    scores  :[900, 845, 809, 950],
    avgScore:null,
    avg     :function () {

    var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
    return prev + cur;
    });

    this.avgScore = sumOfScores / this.scores.length;
    }
    }

    //If we run the code below,
    // the gameController.avgScore property will be set to the average score from the appController object "scores" array
   
    // Don't run this code, for it is just for illustration; we want the appController.avgScore to remain null
    gameController.avgScore = appController.avg();
```
The avg method’s “this” keyword will not refer to the gameController object, it will refer to the appController object because it is being invoked on the appController.

Solution for fixing this when borrowing methods:
To fix the issue and make sure that this inside the appController.avg () method refers to gameController, we can use the apply () method thus:

```javascript
  // Note that we are using the apply () method, so the 2nd argument has to be an array—the arguments to pass to the appController.avg () method.
   appController.avg.apply (gameController, gameController.scores);

    // The avgScore property was successfully set on the gameController object, even though we borrowed the avg () method from the appController object
    console.log (gameController.avgScore); // 46.4

    // appController.avgScore is still null; it was not updated, only gameController.avgScore was updated
    console.log (appController.avgScore); // null
```

// Some more examples
```javascript
function displayBox(){
	console.log(this.name);
}

var name = 'im a global varibale';

var obj1 = {
	name: 'Pradeep',
	myMeth: displayBox
}

var obj2 = {
	name: 'Rahul'
}

displayBox(); // im a global varibale
obj1.myMeth(); // Pradeep
displayBox.call(obj2); // Rahul
new displayBox(); // undefined
```

## Refernces
- ['this' in detail](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
- ['mdn this'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
