// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/AttributeTable/utils":function(){define("dojo/_base/lang dojo/_base/array jimu/LayerInfos/LayerInfos dojo/Deferred dojo/promise/all exports dojo/store/Observable dojo/store/Cache dojo/store/Memory esri/lang ./table/FeatureLayerQueryStore jimu/utils".split(" "),function(g,l,r,p,h,e,f,u,t,n,x,m){function w(a,d){if(!a||!a.length)return d||[];if(!d||!d.length)return a;for(var k=[],b=0,c=a.length;b<c;b++)for(var q=a[b],v=0,e=d.length;v<e;v++)if(d[v].name===q.name){k.push(q);break}return k}
e.readLayerInfosObj=function(a){return r.getInstance(a,a.itemInfo)};e.readLayerInfosFromMap=function(a,d,k){var b=new p;r.getInstance(a,a.itemInfo).then(g.hitch(this,function(c){var q=[];d?c.traversalLayerInfosOfWebmap(function(b){q.push(b)}):c.traversal(function(b){q.push(b)});if(k){var a=[],e=c.getMapNotesLayerInfoArray();l.forEach(e,function(b){a.push(b.id);b.traversal(function(b){a.push(b.id)})});q=l.filter(q,function(b){return-1===a.indexOf(b.id)})}c=c.getTableInfoArray();q=q.concat(c);b.resolve(q)}),
g.hitch(this,function(c){console.error(c);b.reject(c)}));return b.promise};e.generateColumnsFromFields=function(a,d,k,b,c,q){function v(b){if(a&&n.isDefined(a.fieldInfos))for(var c=0,k=a.fieldInfos.length;c<k;c++){var q=a.fieldInfos[c];if(q.fieldName===b)return q.format}return null}var f={selectionHandle:{label:"",className:"selection-handle-column",hidden:!1,unhidable:!0,filed:"selection-handle-column",sortable:!1,_cache:{sortable:!1,statistics:!1}}};l.forEach(d,g.hitch(e,function(a,d,h){d="field"+
d;var t=!!a.domain,u="esriFieldTypeDate"===a.type,m=k&&a.name===k,p="esriFieldTypeDouble"===a.type||"esriFieldTypeSingle"===a.type||"esriFieldTypeInteger"===a.type||"esriFieldTypeSmallInteger"===a.type,y="esriFieldTypeString"===a.type;f[d]={label:a.alias||a.name,className:d,hidden:1===h.length?!1:!a.show&&n.isDefined(a.show),unhidable:1===h.length?!1:!a.show&&n.isDefined(a.show)&&a._pk,field:a.name,sortable:!1,_cache:{sortable:!!c,statistics:q&&!t&&p}};y?f[d].formatter=g.hitch(e,e.urlFormatter):u?
f[d].formatter=g.hitch(e,e.dateFormatter,v(a.name)):p&&(f[d].formatter=g.hitch(e,e.numberFormatter,v(a.name)));t?f[d].get=g.hitch(e,function(b,a){return this.getCodeValue(b.domain,a[b.name])},a):m?f[d].get=g.hitch(e,function(b,a,c){return this.getTypeName(c[b.name],a)},a,b):t||u||m||(f[d].get=g.hitch(e,function(b,a,c,k){var d=null;a&&c&&0<c.length&&(c=(c=l.filter(c,g.hitch(e,function(b){return b.id===k[a]})))&&c[0]||null)&&c.domains&&c.domains[b.name]&&c.domains[b.name].codedValues&&(d=this.getCodeValue(c.domains[b.name],
k[b.name]));return(b=null!==d?d:k[b.name])||isFinite(b)?b:""},a,k,b))}));return f};e.getTypeName=function(a,d){return m.fieldFormatter.getTypeName(a,d)};e.getCodeValue=function(a,d){return m.fieldFormatter.getCodedValue(a,d)};e.urlFormatter=function(a){return m.fieldFormatter.getFormattedUrl(a)};e.dateFormatter=function(a,d){return m.fieldFormatter.getFormattedDate(d,a)};e.numberFormatter=function(a,d){return m.fieldFormatter.getFormattedNumber(d,a)};e.readLayerObjectsFromMap=function(a,d,k){var b=
new p,c=[];this.readLayerInfosFromMap(a,d,k).then(g.hitch(this,function(a){l.forEach(a,g.hitch(this,function(b){c.push(b.getLayerObject())}));h(c).then(g.hitch(this,function(a){b.resolve(a)}),g.hitch(this,function(a){b.reject(a);console.error(a)}))}),g.hitch(this,function(a){b.reject(a)}));return b.promise};e.readSupportTableInfoFromLayerInfos=function(a){var d=new p,k=[];l.forEach(a,g.hitch(this,function(b){k.push(b.getSupportTableInfo())}));h(k).then(g.hitch(this,function(b){b=g.clone(b);l.forEach(b,
function(b,k){b.id=a[k].id});d.resolve(b)}),function(b){d.reject(b)});return d.promise};e.readConfigLayerInfosFromMap=function(a,d,k){var b=new p,c=[];this.readLayerInfosFromMap(a,d,k).then(g.hitch(this,function(a){var k=[];l.forEach(a,function(b){c.push(b.getSupportTableInfo())});h(c).then(g.hitch(this,function(c){l.forEach(c,g.hitch(this,function(b,c){b.isSupportedLayer&&(a[c].name=a[c].title,k.push(a[c]))}));b.resolve(k)}),g.hitch(this,function(a){b.reject(a)}))}),g.hitch(this,function(a){b.reject(a)}));
return b.promise};e.getConfigInfosFromLayerInfos=function(a){return l.map(a,function(a){return e.getConfigInfoFromLayerInfo(a)})};e.getConfigInfoFromLayerInfo=function(a){var d={};d.name=a.name||a.title;d.id=a.id;d.show=a.isShowInMap();d.layer={url:a.getUrl()};var k=a.getPopupInfo();k&&!k.description&&(d.layer.fields=l.map(k.fieldInfos,function(b){return{name:b.fieldName,alias:b.label,show:b.visible,format:b.format}}),a=g.getObject("layerObject.fields",!1,a),d.layer.fields=w(d.layer.fields,a),l.some(d.layer.fields,
function(b){return b.show})||(d.layer.fields&&0<d.layer.fields.length?d.layer.fields[0].show=!0:console.warn("We do not get fields info.")));return d};e.generateCacheStore=function(a,d,k,b,c){a=new x({layer:a,objectIds:a._objectIds||null,totalCount:d,batchCount:k,where:b||"1\x3d1",spatialFilter:c});d=new t;return new u(a,d,{})};e.generateMemoryStore=function(a,d){return new f(new t({data:a||[],idProperty:d}))};e.merge=function(a,d,k,b){for(var c=l.map(d,function(b){return b[k]}),q=0,e=a.length;q<
e;q++){var f=c.indexOf(a[q][k]);-1<f&&b(a[q],d[f])}};e.syncOrderWith=function(a,d,k){function b(b,a){return l.map(b,function(b){return b[a]})}if(!g.isArray(d)||!k)return a;for(var c=b(a,k),q=[],e=0,f=d.length;e<f;e++){var h=c.indexOf(d[e][k]);-1<h&&(q=q.concat(a.splice(h,1)),c=b(a,k))}return q.concat(a)}})},"dojo/store/Cache":function(){define(["../_base/lang","../when"],function(g,l){var r=function(p,h,e){e=e||{};return g.delegate(p,{query:function(f,g){var t=p.query(f,g);t.forEach(function(f){e.isLoaded&&
!e.isLoaded(f)||h.put(f)});return t},queryEngine:p.queryEngine||h.queryEngine,get:function(f,e){return l(h.get(f),function(t){return t||l(p.get(f,e),function(e){e&&h.put(e,{id:f});return e})})},add:function(e,g){return l(p.add(e,g),function(f){h.add(f&&"object"==typeof f?f:e,g);return f})},put:function(e,g){h.remove(g&&g.id||this.getIdentity(e));return l(p.put(e,g),function(f){h.put(f&&"object"==typeof f?f:e,g);return f})},remove:function(e,g){return l(p.remove(e,g),function(f){return h.remove(e,
g)})},evict:function(e){return h.remove(e)}})};g.setObject("dojo.store.Cache",r);return r})},"widgets/AttributeTable/table/FeatureLayerQueryStore":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array esri/tasks/query esri/tasks/QueryTask ./FeatureLayerQueryResult".split(" "),function(g,l,r,p,h,e){return g(null,{queryUrl:"",idProperty:"id",data:null,_entityData:null,constructor:function(e){g.safeMixin(this,e);this.data=[];this._entityData=[];this.layer=e.layer;this.objectIds=e.objectIds;
this.where=e.where;this.orderByFields=e.orderByFields;this.totalCount=e.totalCount;this.batchCount=e.batchCount||25;this.idProperty=this.layer.objectIdField;this.spatialFilter=e.spatialFilter;this.layer&&this.layer.url&&(this.queryTask=new h(this.layer.url))},get:function(e){return this.data[e]},getIdentity:function(e){return e[this.idProperty]},query:function(h,g){var f=new p,n=g&&g.start||0,u=g._export_count||this.batchCount,m=null;"function"===typeof h?m=h(this._entityData):"[object Array]"===
Object.prototype.toString.call(h)&&(m=h);this.objectIds?(m=m?m:this.objectIds,f.objectIds=m.length>=n+this.batchCount?m.slice(n,n+u):m.slice(n)):(m&&0<m.length?f.objectIds=m.length>=n+this.batchCount?m.slice(n,n+u):m.slice(n):(f.start=n,f.num=u,f.where=this.where,f.geometry=this.spatialFilter,f.spatialRelationship=p.SPATIAL_REL_INTERSECTS),(n=g.sort)&&0<n.length&&(n=r.map(n,function(a){return a.attribute+" "+(a.descending?"DESC":"ASC")}),f.orderByFields=n));f.returnGeometry="esriGeometryPoint"===
this.layer.geometryType;f.outFields=["*"];var w=this.totalCount,n=null,n=!f.where;if(!(f.objectIds&&0<f.objectIds.length)&&n)return new e([]);n=this.queryTask?this.queryTask.execute(f):this.layer.queryFeatures(f);n.total=n.then(l.hitch(this,function(a){var d=0,k=this.layer.objectIdField;if(this.objectIds){if(!k)for(d=0;d<a.fields.length;d++)if("esriFieldTypeOID"===a.fields[d].type){k=a.fields[d].name;break}for(var b={},d=0;d<a.features.length;d++)b[a.features[d].attributes[k]]=a.features[d];a.features=
r.map(f.objectIds,function(a){return b[a]})}for(d=0;d<a.features.length;d++)if(a.features[d]){var c=a.features[d];a.features[d]=l.mixin(l.clone(c.attributes),{geometry:c.geometry});this.data[a.features[d][k]]=a.features[d];this._entityData.push(a.features[d])}a=a.features;return w}),function(){console.log("FeatureLayerQueryStore queryFeatures failed.");return 0});return new e(n)}})})},"widgets/AttributeTable/table/FeatureLayerQueryResult":function(){define("esri/main dojo/_base/lang dojo/_base/kernel dojo/_base/Deferred dojo/DeferredList dojo/_base/array".split(" "),
function(g,l,r,p){var h=function(e){function f(f){e[f]||(e[f]=function(){var g=arguments;return p.when(e,function(e){Array.prototype.unshift.call(g,e.features||e);return h(r[f].apply(r,g))})})}if(!e)return e;e.then&&(e=l.delegate(e));e.total||(e.total=p.when(e,function(e){return g._isDefined(e.total)?e.total:e.length||0}));f("forEach");f("filter");f("map");f("some");f("every");return e};return h})},"widgets/AttributeTable/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html",
"dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/AttributeTable/setting/Setting.html":'\x3cdiv style\x3d"width:100%;"\x3e\r\n  \x3cdiv class\x3d"instruction"\x3e\r\n    \x3cp\x3e${nls.instruction}\x3c/p\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"tableLayerInfos" class\x3d"table-layer-infos"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"table-options jimu-ellipsis"\x3e\r\n    \x3cul\x3e\r\n      \x3cli\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"exportcsv" checked\r\n        data-dojo-type\x3d"jimu/dijit/CheckBox" label\x3d"${nls.exportCSV}"\x3e\x3c/div\x3e\r\n      \x3c/li\x3e\r\n      \x3cli\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"expand" data-dojo-type\x3d"jimu/dijit/CheckBox" label\x3d"${nls.expand}"\x3e\x3c/div\x3e\r\n      \x3c/li\x3e\r\n      \x3cli\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"filterByMapExtent" data-dojo-type\x3d"jimu/dijit/CheckBox" label\x3d"${nls.filterByExtent}"\x3e\x3c/div\x3e\r\n      \x3c/li\x3e\r\n    \x3c/ul\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/AttributeTable/setting/css/style.css":".jimu-widget-attributetable-setting{margin:0; padding:0; font-size:14px; width: 100%; height: 100%; position: relative; color: #596679;}.jimu-widget-attributetable-setting .instruction{font-size: 12px; margin-bottom: 10px;}.jimu-widget-attributetable-setting .show{width: 120px;}.jimu-widget-attributetable-setting .symbol{width: 200px;}.jimu-widget-attributetable-setting .table-layer-infos{width: 100%; height: 240px;}.jimu-widget-attributetable-setting .table-options ul{list-style-type: none; padding: 0;}.jimu-widget-attributetable-setting .jimu-checkbox{margin-right: 20px;}.jimu-widget-attributetable-setting .disable-checkbox{color: #e5e5e5;}",
"*now":function(g){g(['dojo/i18n!*preload*widgets/AttributeTable/setting/nls/Setting*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/dijit/SimpleTable dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/Deferred dojo/query jimu/dijit/Popup jimu/dijit/Message jimu/dijit/CheckBox jimu/dijit/LoadingShelter ../utils".split(" "),function(g,l,r,p,h,e,f,u,t,n,x,m,w,a,d){return g([r,l],{baseClass:"jimu-widget-attributetable-setting",currentFieldTable:null,_allLayerFields:null,_layerInfos:null,_tableInfos:null,_delayedLayerInfos:null,_delayedLayerInfosAfterInit:null,
_unSpportQueryCampsite:null,startup:function(){this.inherited(arguments);this.config.layerInfos||(this.config.layerInfos=[]);this._allLayerFields=[];this._layerInfos=[];this._tableInfos=[];this._delayedLayerInfos=[];this._delayedLayerInfosAfterInit=[];this._unSpportQueryCampsite={};this.displayFieldsTable=new p({fields:[{name:"show",title:this.nls.show,width:"auto",type:"checkbox","class":"show"},{name:"label",title:this.nls.label,width:"60%",type:"text"},{name:"url",title:"url",type:"text",hidden:!0},
{name:"index",title:"index",type:"text",hidden:!0},{name:"actions",title:this.nls.actions,type:"actions",width:"20%",actions:["edit"],"class":"symbol"},{name:"showAttachments",title:"",type:"checkbox",hidden:!0}],selectable:!0,autoHeight:!1});this.displayFieldsTable.placeAt(this.tableLayerInfos);e.setStyle(this.displayFieldsTable.domNode,{height:"100%"});this.shelter=new a({hidden:!0});this.shelter.placeAt(this.domNode.parentNode.parentNode||this.domNode);this.shelter.startup();this.shelter.show();
d.readLayerInfosObj(this.map).then(h.hitch(this,function(a){this.own(a.on("layerInfosChanged",h.hitch(this,this.onLayerInfosChanged)));this.own(u(this.displayFieldsTable,"actions-edit",h.hitch(this,this.editFieldsClick)));this.own(u(this.displayFieldsTable,"row-click",h.hitch(this,this._verifiedOnShowClick)));this.setConfig(this.config)}))},editFieldsClick:function(a){var b=n(".action-item-parent",a);if(b&&b.length)if(b=this.displayFieldsTable.getRowData(a),b.show){var c=parseInt(b.index,10);this.shelter.show();
this._getLayerFields(c).then(h.hitch(this,function(b){this.openFieldsDialog(a,b,c)}),h.hitch(this,function(b){console.error(b)})).always(h.hitch(this,function(){this.shelter.hide()}))}else var k=new m({message:this.nls.warning,buttons:[{label:this.nls.ok,onClick:h.hitch(this,function(){k.close()})}]})},_verifiedOnShowClick:function(a){var b=this.displayFieldsTable.getRowData(a),c=parseInt(b.index,10),k=null,k=this.config&&this.config.layerInfos&&0<this.config.layerInfos.length?this.config.layerInfos[c]:
this._layerInfos[c],c=-1<this._unSpportQueryCampsite.layerNames.indexOf(k.name||k.title);b.show&&c&&(new m({message:this.nls.unsupportQueryWarning}),b.show=!1,this.displayFieldsTable.editRow(a,b))},_getLayerFields:function(a){return this._layerInfos[a].getLayerObject().then(h.hitch(this,function(b){var c=this._allLayerFields[a];b=f.map(b.fields,function(b){return{name:b.name,alias:b.alias,show:!0}});d.merge(b,c,"name",function(b,a){h.mixin(b,a)});return b=d.syncOrderWith(b,c,"name")}))},openFieldsDialog:function(a,
b,c){var k=!1,d=this._layerInfos[c];(d=d&&d.layerObject)&&(k=d.hasAttachments&&d.objectIdField);var d=e.create("div"),f=this._createFieldsTable(b,c);e.place(f.domNode,d);var g=null;k&&(g=new w({label:this.nls.showAttachments,style:"margin-top:10px;"}),b=this.displayFieldsTable.getRowData(a),g.setValue(b.showAttachments),g.placeAt(d));this.currentFieldTable=f;b=600;g&&(b=640);var l=new x({titleLabel:this.nls.configureLayerFields,width:640,maxHeight:b,autoHeight:!0,content:d,buttons:[{label:this.nls.ok,
onClick:h.hitch(this,function(){this._allLayerFields[c]=f.getData();var b=g?g.getValue():!1;this.displayFieldsTable.editRow(a,{showAttachments:b});l.close();l=null})},{label:this.nls.cancel,classNames:["jimu-btn-vacation"],onClick:h.hitch(this,function(){l.close();l=null})}],onClose:function(){l=null}});f.startup()},_createFieldsTable:function(a){for(var b=null,c={fields:[{name:"show",title:this.nls.fieldVisibility,type:"checkbox","class":"show",onChange:h.hitch(this,function(a){var c=b.getData();
!f.some(c,h.hitch(this,function(a){return a.show}))&&(new m({message:this.nls.fieldCheckWarning}),c=b.getRowData(a))&&(c.show=!0,b.editRow(a,c))})},{name:"name",title:this.nls.fieldName,type:"text"},{name:"alias",title:this.nls.fieldAlias,editable:!0,type:"text"},{name:"actions",title:this.nls.fieldActions,type:"actions",actions:["up","down"],"class":"symbol"}],selectable:!0,autoHeight:!1,style:{height:"300px",maxHeight:"300px"}},b=new p(c),c=0;c<a.length;c++)a[c].show=void 0===a[c].show?!0:!!a[c].show,
b.addRow(a[c]);return b},setConfig:function(a){this.config=a;this.displayFieldsTable.clear();this._allLayerFields=[];this._processTableData().then(h.hitch(this,function(a){this._init(a);this.shelter.hide()}),h.hitch(this,function(a){new m({message:a.message||a})}))},onLayerInfosChanged:function(a,b,c){"added"===b&&c&&a&&c.getSupportTableInfo().then(h.hitch(this,function(a){a.isSupportedLayer&&(this._layerInfos&&0===this._layerInfos.length?this._delayedLayerInfos.push(c):this._layerInfos&&0<this._layerInfos.length&&
!this._getLayerInfoById(c.id)&&(this._delayedLayerInfosAfterInit.push(c),this._processDelayedLayerInfosAfterInit(this._delayedLayerInfosAfterInit)))}))},_processDelayedLayerInfosAfterInit:function(a){for(var b=this._layerInfos.length,c=0;c<a.length;c++){var e=d.getConfigInfoFromLayerInfo(a[c]);this.displayFieldsTable.addRow({label:e.name||e.title,url:e.layer.url,index:""+(b+c),show:e.show});this._allLayerFields.push(e.layer.fields);this._layerInfos.push(a[c])}},_processDelayedLayerInfos:function(){0<
this._delayedLayerInfos.length&&(f.forEach(this._delayedLayerInfos,h.hitch(this,function(a){this._getLayerInfoById(a.id)||this._layerInfos.push(a)})),this._delayedLayerInfos=[])},_processTableData:function(){var a=new t;d.readConfigLayerInfosFromMap(this.map,!0,!0).then(h.hitch(this,function(b){this._layerInfos=b;this._processDelayedLayerInfos();d.readSupportTableInfoFromLayerInfos(this._layerInfos).then(h.hitch(this,function(c){this._tableInfos=c;this.config&&this.config.layerInfos&&0<this.config.layerInfos.length?
(c=d.getConfigInfosFromLayerInfos(this._layerInfos),d.merge(c,this.config.layerInfos,"id",h.hitch(this,function(a,b){a.show=b.show;a.showAttachments=b.showAttachments;a.layer.url=b.layer.url;h.getObject("layer.fields.length",!1,a)&&h.getObject("layer.fields.length",!1,b)?(d.merge(a.layer.fields,b.layer.fields,"name",function(a,b){h.mixin(a,b)}),a.layer.fields=d.syncOrderWith(a.layer.fields,b.layer.fields,"name")):a.layer.fields=b.layer.fields})),this.config.layerInfos=c,this._unSpportQueryCampsite.fromConfig=
!0,this._unSpportQueryCampsite.layerNames=this._getUnsupportQueryLayerNames(this.config.layerInfos),a.resolve(c)):(this._unSpportQueryCampsite.fromConfig=!1,this._unSpportQueryCampsite.layerNames=this._getUnsupportQueryLayerNames(this._layerInfos),a.resolve(d.getConfigInfosFromLayerInfos(b)))}),function(b){console.error(b);a.reject(b)})}),h.hitch(this,function(b){console.error(b);a.reject(b)}));return a},_getUnsupportQueryLayerNames:function(a){var b=[];f.forEach(a,h.hitch(this,function(a){var c=
this._getSupportTableInfoById(a.id);c&&!c.isSupportQuery&&b.push(a.name||a.title)}));return b},_init:function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c].show&&this._getSupportTableInfoById(a[c].id).isSupportQuery;this.displayFieldsTable.addRow({label:a[c].name||a[c].title,url:a[c].layer.url,index:""+c,show:d,showAttachments:!!a[c].showAttachments});this._allLayerFields.push(a[c].layer.fields);this._unSpportQueryCampsite.fromConfig&&(d=(d=this._unSpportQueryCampsite.layerNames)&&-1<d.indexOf(a[c].name||
a[c].title),a[c].show&&d&&b.push(a[c].name||a[c].title))}this._unSpportQueryCampsite.fromConfig&&0<b.length&&new m({message:this.nls.unsupportQueryLayers+"\x3cbr\x3e\x3cbr\x3e"+b.toString()});this.config.hideExportButton?this.exportcsv.uncheck():this.exportcsv.check();this.config.initiallyExpand?this.expand.check():this.expand.uncheck();this._canUseOpenAtStart()&&(this.openAtStart?this.expand.check():this.expand.uncheck(),this.expand.status=!1,e.addClass(this.expand.domNode,"disable-checkbox"));this.config.filterByMapExtent?
this.filterByMapExtent.check():this.filterByMapExtent.uncheck()},_canUseOpenAtStart:function(){return this.closeable||!this.isOnScreen},_getLayerInfoById:function(a){for(var b=0,c=this._layerInfos.length;b<c;b++)if(this._layerInfos[b].id===a)return this._layerInfos[b]},_getSupportTableInfoById:function(a){for(var b=0,c=this._tableInfos.length;b<c;b++)if(this._tableInfos[b].id===a)return this._tableInfos[b]},getConfig:function(){var a=this.displayFieldsTable.getData(),b=[],c=a.length;if(this.config&&
this.config.layerInfos&&0<this.config.layerInfos.length)f.forEach(a,h.hitch(this,function(d,c){var e=this.config.layerInfos[c],f={};f.name=e.name||e.title;f.id=e.id;f.layer={};f.layer.url=a[c].url;f.layer.fields=this._allLayerFields[c];f.show=a[c].show;f.showAttachments=a[c].showAttachments;b.push(f)}));else for(var d=0;d<c;d++){var e={};e.name=this._layerInfos[d].name||this._layerInfos[d].title;e.id=this._layerInfos[d].id;e.layer={};e.layer.url=a[d].url;e.layer.fields=this._allLayerFields[d];e.show=
a[d].show;e.showAttachments=a[d].showAttachments;b.push(e)}this.config.layerInfos=b;this.config.hideExportButton=!this.exportcsv.getValue();this.config.filterByMapExtent=this.filterByMapExtent.getValue();this._canUseOpenAtStart()||(this.config.initiallyExpand=this.expand.getValue());return this.config}})});