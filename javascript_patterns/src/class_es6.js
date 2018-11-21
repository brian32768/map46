// class_es6.js javascript_patterns
//
// Implementing a class in ES6 format.

export class Thing {
    constructor(n) {
	    this.length =
	    this.width  =
	    this.height = 0; // Things always start off dimensionless.
	    this.name   = n;
        this._first = true;
    }

    get first() {
        return this._first;
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

let tt = new TallThing("abra", 10);
console.log("tt first = ", tt.first);

console.log('class_es6 loaded');
