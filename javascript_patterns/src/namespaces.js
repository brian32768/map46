// namespaces.js javascriopt_patterns
// Testing namespaces in JavaScript
//

var totally_global = true;

class Kiddie {
    constructor() {
        console.log("Behold a child!");
        this.txt = 'This be my content!';
    }
}

export default class MyNamespace {
    constructor() {
        this.instance = 'Wrap me up and throw me in the freezer.';
        console.log("Behold a new MyNamespace object!")
    }
}

// This makes totally_global a static
MyNamespace.totally = totally_global;

// This makes a class nested inside the static KidClass
MyNamespace.KidClass = Kiddie;
