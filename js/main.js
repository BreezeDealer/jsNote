/**
 * person
 */
var Person = (function () {
    function Person() {
    }
    Person.prototype.consPructor = function (age) {
        return age;
    };
    return Person;
}());
var isDone = false;
var name = "Gene";
var age = 37;
var sentence = "Hello, my name is " + name + ".\n\nI'll be " + (age + 1) + " years old next month.";
