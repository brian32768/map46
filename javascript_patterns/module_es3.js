// module_es3.js
//
/* 
 This is the old way (one old way) of defining a module.
 I find it obscure. Reminds me of perl, the world moved on,
 syntax should be as readable as possible, but maybe
 that's just me.

 Some people love it,
 see http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
*/

export var m_es3 = (function() {

    // Private declarations go here.
    function private_getDatestamp() {
	var d = new Date();
	return d.toLocaleString();
    }

    // Public declarations go here.
    return {
	getDatestamp: function() {
	    return private_getDatestamp();
	}
    }
})();

