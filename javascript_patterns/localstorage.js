/*
  localstorage.js

  Thanks to Tania Rascia https://www.taniarascia.com/how-to-use-local-storage-with-javascript/
*/
const cakeval = 'caketext';

var btn      = document.getElementById('cake');
var clearbtn = document.getElementById('clearcake');

var txt = document.getElementById('caketext');

var count = localStorage.getItem(cakeval);
if (count != null) {
    // Show stored value on load, if there is one.
    txt.innerText = count;
    console.log("Loading cake count from storage.");
}

btn.onclick = clickHandler;
clearbtn.onclick = clearStore;

function clickHandler(evt) {
    var count = localStorage.getItem(cakeval);
    if (count == null) {
	count = 0;
    }
    txt.innerText = ++count;
    localStorage.setItem(cakeval, count);
    console.log("click cake");
}

function clearStore(evt) {
    localStorage.removeItem(cakeval);
    txt.innerText = '';
    console.log("cleared cake");
}
