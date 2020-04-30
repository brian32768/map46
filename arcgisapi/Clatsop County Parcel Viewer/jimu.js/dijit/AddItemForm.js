// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:jimu/dijit/templates/AddItemForm.html":'\x3cdiv style\x3d"width: 100%" class\x3d"jimu-item-form"\x3e\r\n  \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"itemForm" encType\x3d"multipart/form-data" action\x3d"" method\x3d""\x3e\r\n    \x3cdiv class\x3d"line"\x3e\r\n      \x3cdiv class\x3d"input-label"\x3e${nls.title}\x3c/div\x3e\r\n      \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-attach-point\x3d"itemName"\r\n      required\x3d"true" class\x3d"input-item"/\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"line line-margin"\x3e\r\n      \x3cdiv class\x3d"input-label"\x3e${nls.folder}\x3c/div\x3e\r\n      \x3cinput data-dojo-attach-point\x3d"itemFolder" data-dojo-type\x3d"dijit/form/FilteringSelect" trim\x3d"true" class\x3d"input-item"\x3e\x3c/input\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"shelter" data-dojo-type\x3d"jimu/dijit/LoadingShelter" data-dojo-props\x3d\'hidden:true\'\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Deferred dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./templates/AddItemForm.html jimu/portalUtils jimu/portalUrlUtils dojo/data/ItemFileWriteStore dijit/form/ValidationTextBox dijit/form/FilteringSelect jimu/dijit/LoadingShelter".split(" "),function(f,d,g,e,h,k,l,m,n,p,q){return f([h,k,l],{baseClass:"jimu-item-form",templateString:m,appConfig:null,folderStore:null,portalUser:null,postMixInProperties:function(){this.nls=
window.jimuNls.common},postCreate:function(){this.inherited(arguments);var a=p.getStandardPortalUrl(this.appConfig.portalUrl);n.getPortal(a).getUser().then(d.hitch(this,function(a){this.portalUser=a;return a.getContent()})).then(d.hitch(this,function(a){this.folderStore=this._createFolderStore(a.folders,this.portalUser.username);this.itemFolder.set("store",this.folderStore);this.itemFolder.set("required",!0);this.itemFolder.set("searchAttr","name");this.itemFolder.set("displayedValue",this.portalUser.username)}))},
getName:function(){return this.itemName.get("value")},getFolderId:function(){return this.itemFolder.item?this.folderStore.getValue(this.itemFolder.item,"id"):""},showBusy:function(){this.shelter.show()},hideBusy:function(){this.shelter.hide()},validate:function(){var a=new e;this.itemForm.validate()?a.resolve({valid:!0}):a.resolve({valid:!1,message:"param requried"});return a},addItem:function(a,c){if(this.portalUser)return this.portalUser.addItem(a,c);var b=new e;b.resolve({error:{message:"portalUser is null"}});
return b},_createFolderStore:function(a,c){var b=new q({data:{identifier:"id",label:"name",items:[]}});b.newItem({name:c,id:""});g.forEach(a,function(a){b.newItem({name:a.title,id:a.id})});return b}})});