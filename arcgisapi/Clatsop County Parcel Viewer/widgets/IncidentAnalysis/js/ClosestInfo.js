// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/_base/lang dojo/_base/Color dojo/_base/array dojo/dom-class dojo/dom-construct dojo/dom-style dojo/on esri/geometry/geometryEngine esri/graphic esri/layers/FeatureLayer esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/Font esri/symbols/TextSymbol esri/tasks/query".split(" "),function(A,m,v,l,h,n,B,r,w,x,C,y,z,D,E,F){return A("ClosestInfo",null,{constructor:function(b,c,a){this.tab=b;this.container=c;this.parent=a;this.graphicsLayer=this.distance=
this.incident=this.featureLayer=null;this.map=a.map;this.specialFields={}},updateForIncident:function(b,c,a){if(this.featureLayer)this.processIncident(b,c,a);else if(0<this.tab.tabLayers.length){var d=new C(this.tab.tabLayers[0].url);r(d,"load",m.hitch(this,function(){d.capabilities&&-1<d.capabilities.indexOf("Query")?(this.featureLayer=d,this.processIncident(b,c,a)):this._processError()}));r(this.parent.opLayers,"layerInfosFilterChanged",m.hitch(this,this._layerFilterChanged))}},_layerFilterChanged:function(b){if(null!==
this.featureLayer&&null!==this.incident&&null!==this.distance&&null!==this.graphicsLayer){var c=this.tab.tabLayers[0].id;l.forEach(b,m.hitch(this,function(a){c===a.id&&this.processIncident(this.incident,this.distance,this.graphicsLayer)}))}},processIncident:function(b,c,a){this.container.innerHTML="";h.add(this.container,"loading");var d=[];this.incident=b;this.distance=c;c=w.buffer(b.geometry,c,this.parent.config.distanceSettings[this.parent.config.distanceUnits]);this.graphicsLayer=a;this.graphicsLayer.clear();
var e=this.tab.tabLayers[0].id,f="";this.parent.opLayers.traversal(function(a){if(e===a.id&&a.getFilter())return f=a.getFilter(),!0});a=new F;a.returnGeometry=!0;a.geometry=c;a.where=f;a.outFields=this._getFields(this.featureLayer);a.outSpatialReference=this.parent.map.spatialReference;this.featureLayer.queryFeatures(a,m.hitch(this,function(a){var c=this._getFields(this.featureLayer);a=a.features;if(0<a.length){for(var g=0;g<a.length;g++){for(var e=a[g],f={DISTANCE:this._getDistance(b.geometry,e.geometry)},
h=0;h<c.length;h++)f[c[h]]=e.attributes[c[h]];e.attributes=f}a.sort(this._compareDistance);d.push(a[0])}this._processResults(d)}),m.hitch(this,this._processError))},_processError:function(){this.container.innerHTML="";h.remove(this.container,"loading");this.container.innerHTML=this.parent.nls.noFeaturesFound},_processResults:function(b){this.container.innerHTML="";h.remove(this.container,"loading");0===b.length&&(this.container.innerHTML=this.parent.nls.noFeaturesFound);var c=n.create("div",{id:"tpc",
style:"width:"+220*b.length+"px;"},this.container);h.add(c,"IMT_tabPanelContent");for(var a=this.parent.nls[this.parent.config.distanceUnits],d=0;d<b.length;d++){var e=d+1,f=b[d],g=f.geometry,q=g;"point"!==g.type&&(q=g.getExtent().getCenter());var f=f.attributes,p=a+": "+Math.round(100*f.DISTANCE)/100,g="",k=0,l;for(l in f)"DISTANCE"!==l&&3>k&&(g+=this._getFieldValue(l,f[l])+"\x3cbr/\x3e",k+=1);k=n.create("div",{id:"Feature_"+e},c);h.add(k,"IMTcolRec");var t=n.create("div",{},k);h.add(t,"IMTcolRecBar");
var u=n.create("div",{innerHTML:e},t);h.add(u,"IMTcolRecNum");B.set(u,"backgroundColor",this.parent.config.color);r(u,"click",m.hitch(this,this._zoomToLocation,q));p=n.create("div",{innerHTML:p},t);h.add(p,"IMTcolDistance");this.parent.config.enableRouting&&(p=n.create("div",{},t),h.add(p,"IMTcolDir"),r(p,"click",m.hitch(this,this._routeToIncident,q)));g=n.create("div",{innerHTML:g},k);h.add(g,"IMTcolInfo");g=new z(z.STYLE_SOLID,new v.fromString(this.parent.config.color),1);g=new y(y.STYLE_CIRCLE,
24,g,new v.fromString(this.parent.config.color));k=new D;k.family="Arial";k.size="12px";e=new E(e,k,"#ffffff");e.setOffset(0,-4);this.graphicsLayer.add(new x(q,g,f));this.graphicsLayer.add(new x(q,e,f))}},_getFields:function(b){var c=[];if(this.tab.advConfig&&this.tab.advConfig.fields&&0<this.tab.advConfig.fields.length)l.forEach(this.tab.advConfig.fields,function(a){c.push(a.expression)});else{var a;a=b.infoTemplate?b.infoTemplate.info.fieldInfos:b.fields;for(var d=0;d<a.length;d++){var e=a[d];"undefined"!==
typeof e.visible?e.visible&&c.push(e.fieldName):c.push(e.name)}}var f={};l.forEach(b.fields,function(a){if("esriFieldTypeDate"===a.type||a.domain)f[a.name]=a});this.specialFields=f;return c},_getFieldValue:function(b,c){var a=c;if(this.specialFields[b]){var d=this.specialFields[b];"esriFieldTypeDate"===d.type?a=(new Date(c)).toLocaleString():l.some(d.domain.codedValues,function(b){if(b.code===c)return a=b.name,!0})}return a},_getDistance:function(b,c){var a=0,d=this.parent.config.distanceUnits,a=
w.distance(b,c,9001);switch(d){case "miles":a*=6.21371E-4;break;case "kilometers":a*=.001;break;case "feet":a*=3.28084;break;case "yards":a*=1.09361;break;case "nauticalMiles":a*=5.39957E-4}return a},_compareDistance:function(b,c){return b.attributes.DISTANCE<c.attributes.DISTANCE?-1:b.attributes.DISTANCE>c.attributes.DISTANCE?1:0},_zoomToLocation:function(b){this.parent.zoomToLocation(b)},_routeToIncident:function(b){this.parent.routeToIncident(b)}})});