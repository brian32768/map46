// mock.js

// Here's a function in a module.
// It returns "now" in a readable format in your container.

export function getDatestamp() {
    var d = new Date();
    return d.toLocaleString();
}

// Here's a clumsy way I can call back to someone.
export function datestamp(containerfiller) {
    containerfiller(getDatestamp());
}

console.log('mock loaded');
