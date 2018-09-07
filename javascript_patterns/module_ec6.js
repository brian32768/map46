// module_ec6.js

// Here is how modules work in EC6.
// All data and functions are private unless you make them public with
// the "export" decorator.  This makes sense to me in a C#/Java
// programmer kind of way that I am comfortable with. :-)

// Since this is not exported, it's not visible outside this module.
function private_getDatestamp() {
    var d = new Date();
    return d.toLocaleString();
}

// Returns "now" in a readable format in your container.
export function getDatestamp() {
    return private_getDatestamp();
}

console.log('module_ec6 loaded');
