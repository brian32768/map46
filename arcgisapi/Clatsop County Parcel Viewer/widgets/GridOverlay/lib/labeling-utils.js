// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define(["./mgrs","esri/geometry/Point"],function(e,g){var h=document.createElement("canvas").getContext("2d");return{getWidthOfText:function(b,c,a){h.font=a+"px "+c;return h.measureText(b).width},padZero:function(b,c){for(b=b.toString();b.length<c;)b="0"+b;return b},getScreenSize:function(b,c){var a=b.getExtent(),d=new g([a.xmin,a.ymin],a.spatialReference),a=new g([a.xmax,a.ymax],a.spatialReference),d=c.toScreen(d),a=c.toScreen(a);return{width:Math.abs(a.x-d.x),height:Math.abs(a.y-d.y)}},distanceFromMapEdge:function(b,
c){var a,d,f;d=c.toScreen(b);"undefined"===typeof e&&(e=!0);a=Math.min(Math.abs(c.width-d.x),Math.abs(d.x));d=Math.min(Math.abs(c.height-d.y),Math.abs(d.y));e&&(f=Math.round(1E4*b.getLatitude())/1E4,84===f||-80===f)&&(d=0);return{horizontal:a,vertical:d,total:Math.sqrt(a*a+d*d)}},screenDistanceBetweenPoints:function(b,c,a){b=a.toScreen(b);a=a.toScreen(c);c=Math.abs(b.x-a.x);b=Math.abs(b.y-a.y);return{horizontal:c,vertical:b,total:Math.sqrt(c*c+b*b)}}}});