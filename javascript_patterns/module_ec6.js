// module_ec6.js

// Here is how modules work in EC6.
//
// All data and functions are private unless you make them public with
// the "export" decorator.
// This makes sense to me in a C#/Java programmer kind of way
// that I am comfprtable with. :-)

// Returns "now" in a readable format in your container.
export function getDatestamp() {
    var d = new Date();
    return d.toLocaleString();
}

// Here's a clumsy way I can call back to someone.
export function datestamp(callback) {
    callback(getDatestamp());
}

console.log('module_ec6 loaded');
