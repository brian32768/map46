// This is an example of how to use "default".
// Invoke a new instance with
//   import A from 'A';
//   let a = new A();
//   note that A can be renamed, import ANOTHER from 'A';

export default class {
    constructor() {
    }

    toString() {
	return 'This is an A object.';
    }
}

// This is an example of how to explicitly export something.
// Invoke it with something like this:
//   import {B} from 'A';
//   let a = new A();

export class B {
    constructor() {
    }

    toString() {
	return 'This is object B';
    }
}

export const C = 27;


// Both of these patterns can live in one js file but to use both you need two lines
// eg
// import Aye from 'A';
// import { B as Bee, C as See } from 'A';
//
// this does not work
// import { A,B,C } from 'A';
