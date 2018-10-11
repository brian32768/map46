// class_es6.js
//
// Implementing a class in ES6 format.

export class Thing {
    constructor(n) {
	this.length =
	this.width  = 
	this.height = 0; // Things always start off dimensionless.
	this.name   = n;
    }

    toString() {
	return ('This is a thing called "' + this.name + '"');
    }

    volume() {
	return (this.length * this.width * this.height);
    }

    // This looks like a method but it's static
    // so use "Thing.foo()" not "thing.foo()" to access it.
    static foo() {
	return 100;
    }
}

// I can add some static data too, not just methods.
Thing.bar = '101';


// Inheritance or 'subclass' if you prefer
export class TallThing extends Thing {
    constructor(name, h) {
	super(name); // NB you HAVE to call super in a derived class constructor.
	this.height = h;
	this.length = this.width  = 1; // tall things always have dimensions.
    }
}

console.log('class_es6 loaded');
