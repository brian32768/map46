// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(function(){function d(c,b){this.wrapper=c;this.wrapperId=c.id;this.timeoutTimerId=this.intervalTimerId=null;this.isAnimating=!1;this.animationProgress=this.animationStep=0;this.beforeAnimation=[];this.afterAnimation=[];this.digitsNumber=b.digitsNumber||6;this.direction=b.direction||d.ScrollDirection.Mixed;this.value=b.value||"";this.characterSet=b.characterSet||d.DefaultCharacterSets.allCharacters;this.characterNumber=this.characterSet.length;this.animationDuration=b.animationDuration||50;
var a=["wrapper","left","inner","right","marker"];this.extraClassName={};for(var g=0;g<a.length;g++)this.extraClassName[a[g]]=b.extraClassName?"string"===typeof b.extraClassName?b.extraClassName:b.extraClassName[a[g]]||"":"";this.onLoad=b.onLoad||null;this.onValueChanged=b.onValueChanged||null;var e=this;this.imageLoadCounter=0;this.charsImage=new Image;this.charsImage.onload=function(){e.finishLoading()};this.charsImage.src=b.charsImageUrl;this.markerImage=new Image;this.markerImage.onload=function(){e.finishLoading()};
this.markerImage.src=b.markerImageUrl}d.DefaultCharacterSets={numericUp:"0123456789",numericDown:"9876543210",alphabeticUp:" ABCDEFGHIJKLMNOPQRSTUVWXYZ",alphabeticDown:"ZYXWVUTSRQPONMLKJIHGFEDCBA ",alphanumericUp:"0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ",alphanumericDown:"9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA ",calculator:"0123456789.,+-*/\x3d ",qwertyKeybord:" QWERTYUIOPASDFGHJKLZXCVBNM1234567890-\x3d[]\\;',./~`!@#$%^\x26*()_+{}|:\"\x3c\x3e?",allCharacters:" ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-\x3d[]\\;',./~`!@#$%^\x26*()_+{}|:\"\x3c\x3e?"};
d.ScrollDirection={Downwards:-1,Mixed:0,Upwards:1};d.prototype.finishLoading=function(){this.imageLoadCounter++;if(2===this.imageLoadCounter&&this.charsImage.width&&this.markerImage.width){this.digitWidth=this.charsImage.width;this.digitHeight=Math.ceil(this.charsImage.height/this.characterNumber);this.offsetHeight=(this.markerImage.height-this.digitHeight)/2;this.makrer=document.createElement("DIV");this.makrer.className="counter_marker"+(this.extraClassName.marker?" ":"")+this.extraClassName.marker;
this.makrer.style.backgroundImage="url('"+this.markerImage.src+"')";this.makrer.style.width=this.digitWidth*this.digitsNumber+this.digitsNumber+"px";this.makrer.style.height=this.markerImage.height+"px";this.wrapper.className=this.wrapper.className+(this.extraClassName.marker?" ":"")+this.extraClassName.marker;this.wrapper.style.width=this.makrer.style.width;this.wrapper.style.height=this.makrer.style.height;this.wrapper.appendChild(this.makrer);for(var c=0,b=0,c=0;c<this.digitsNumber;c++){var a=
document.createElement("DIV");a.id=this.wrapperId+"_"+c;a.className="counter_character";a.className=0===c?a.className+(" counter_character_left"+(this.extraClassName.left?" ":"")+this.extraClassName.left):c===this.digitsNumber-1?a.className+(" counter_character_right"+(this.extraClassName.right?" ":"")+this.extraClassName.right):a.className+(" counter_character_inner"+(this.extraClassName.inner?" ":"")+this.extraClassName.inner);a.style.backgroundImage="url('"+this.charsImage.src+"')";a.style.width=
this.digitWidth+"px";a.style.height=this.markerImage.height+"px";a.style.top=-this.markerImage.height+"px";this.wrapper.appendChild(a);b+=d._parseInt(d._elementCurrentStyle(a,"margin-left"));b+=d._parseInt(d._elementCurrentStyle(a,"margin-right"));b+=d._parseInt(d._elementCurrentStyle(a,"border-left-width"));b+=d._parseInt(d._elementCurrentStyle(a,"border-right-width"));b+=this.digitWidth}this.makrer.style.width=b+"px";this.wrapper.style.width=b+"px";if(null!==this.onLoad)this.onLoad();this.setValue(this.value,
100)}};d.prototype.animate=function(c){this.animationProgress=c?1:this.animationProgress+this.animationStep;1<=this.animationProgress&&(this.animationProgress=1,this.timeoutTimerId&&clearTimeout(this.timeoutTimerId),this.intervalTimerId&&clearTimeout(this.intervalTimerId),this.isAnimating=!1,this.intervalTimerId=this.timeoutTimerId=null);c=0;var b=this.wrapper.id+"_";for(c=0;c<this.beforeAnimation.length;c++){var a=d._getDijitById(this,b+(this.digitsNumber-c-1));if(a){var g=0,g=1>this.animationProgress?
this.beforeAnimation[c]+(this.afterAnimation[c]-this.beforeAnimation[c])*this.animationProgress:this.afterAnimation[c];a.style.backgroundPosition="0px "+d._parseInt(g)+"px"}}};d.prototype.setValue=function(c,b){if(2===this.imageLoadCounter&&this.charsImage.width&&this.markerImage.width){this.timeoutTimerId&&clearTimeout(this.timeoutTimerId);this.intervalTimerId&&clearTimeout(this.intervalTimerId);var a=0,g=this.wrapper.id+"_",e;this.beforeAnimation=[];this.afterAnimation=[];for(a=this.digitsNumber-
1;0<=a;a--)e=d._getDijitById(this,g+(this.digitsNumber-a-1)),this.beforeAnimation[a]=Number(e.style.backgroundPosition.substr(4).replace("px",""));for(var h=this.value.toString?this.value.toString():String(this.value),k=c.toString?c.toString():String(c),a=this.digitsNumber-1;0<=a;a--){e=d._getDijitById(this,g+(this.digitsNumber-a-1));e=-1;0<=h.length-a-1&&(e=h.charAt(h.length-a-1).toUpperCase(),e=this.characterSet.indexOf(e));-1===e&&(e=this.characterSet.indexOf(" "));-1===e&&(e=this.characterSet.indexOf("0"));
-1===e&&(e=0);var f=-1;0<=k.length-a-1&&(f=k.charAt(k.length-a-1).toUpperCase(),f=this.characterSet.indexOf(f));-1===f&&(f=this.characterSet.indexOf(" "));-1===f&&(f=this.characterSet.indexOf("0"));-1===f&&(f=0);this.afterAnimation[a]=Math.round(-this.digitHeight*f+this.offsetHeight);0===this.direction?Math.abs(e-f)>this.characterNumber/2&&(this.beforeAnimation[a]=f<e?this.beforeAnimation[a]+this.digitHeight*this.characterNumber:this.beforeAnimation[a]-this.digitHeight*this.characterNumber):-1===
this.direction?this.beforeAnimation[a]>this.afterAnimation[a]&&(this.beforeAnimation[a]-=this.digitHeight*this.characterNumber):1===this.direction&&this.beforeAnimation[a]<this.afterAnimation[a]&&(this.beforeAnimation[a]+=this.digitHeight*this.characterNumber)}this.value=c;if(null!==this.onValueChanged)this.onValueChanged();b&&0<parseInt(b,10)||(b=1E3);this.isAnimating=!0;a=this.animationDuration;this.animationStep=a/b;this.animationProgress=0;var l=this;b>a&&(this.intervalTimerId=setInterval(function(){l.animate(!1)},
a));this.timeoutTimerId=setTimeout(function(){l.animate(!0)},b)}else if(this.value=c,null!==this.onValueChanged)this.onValueChanged()};d._parseInt=function(c){c=parseInt(c,10);isNaN(c)&&(c=0);return c};d._elementCurrentStyle=function(c,b){if(c.currentStyle){for(var a=0,d="",e=!1,a=0;a<b.length;a++)!b.charAt(a)||"-"===b.charAt(a)&&"-"===b.charAt(a).toString()?e=!0:(d=b.charAt(a).toString?d+(e?b.charAt(a).toString().toUpperCase():b.charAt(a).toString()):d+(e?b.charAt(a).toUpperCase():b.charAt(a)),e=
!1);return c.currentStyle[d]}return getComputedStyle(c,null).getPropertyValue(b)};d._getDijitById=function(c,b){for(var a=c.wrapper.childNodes,d=0;d<a.length;d++){var e=a[d];if(e.id===b)return e}return null};return d});