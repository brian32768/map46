// module_es6.js
//
// Here is how modules work in ES6.
//
// All data and functions are private unless you make them public with
// the "export" decorator.  This makes sense to me in a C#/Java
// programmer kind of way that I am comfortable with. :-)

// Since this is not exported, it's not visible outside this module.
function private_getDatestamp() {
    // Return a string containing the timestamp for "now".
    var d = new Date();
    return d.toLocaleString();
}

export function getDatestamp() {
    // Return a string containing the timestamp for "now".
    
    // Use the "private" function to get the string.
    return private_getDatestamp();
}

console.log('module_es6 loaded');
