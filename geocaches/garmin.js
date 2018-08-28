// Read contents of a Garmin GPS
// 
function readTextFile(url)
{
    console.log("read " + url);

    // https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    fetch(url)
	.then(function(response) {
		console.log('status: ' + response.statusText);
		if (response.ok) {
		    console.log('read: ' + response.blob);
		} else {
		    console.log('read failed.');
		}
	    })
	.catch(function(error) {
		console.log("whoa there little doggie: " + error);
	    });

}

function intoArray (lines) {
    // splitting all text data into array "\n" is splitting data from each new line
    //and saving each new line as each element*

    var lineArr = lines.split('\n'); 

    //just to check if it works output lineArr[index] as below
    document.write(lineArr[2]);         
    document.write(lineArr[3]);
}

function get_photos() {
}

export function GetGPX() {
    //    var filename = 'file:///Users/bwilson/Projects/map46/geocaches/'
    var filename = 'http://localhost:1234/' + '20960850_Astoria-wpts.gpx';;
    readTextFile(filename);
}
