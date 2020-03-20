// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/Bookmark/setting/Edit.html":'\x3cdiv class\x3d"edit-page jimu-widget-bookmark"\x3e\r\n  \x3cdiv class\x3d"info"\x3e\r\n    \x3cdiv class\x3d"image"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"imageChooserBase"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"text"\x3e\r\n      \x3cdiv class\x3d"lebel"\x3e\r\n        \x3cspan\x3e${nls.title}\x3c/span\x3e\x3cspan class\x3d"start"\x3e*\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-attach-point\x3d"displayName" required\x3d"true" placeHolder\x3d${nls.title} data-dojo-props\x3d\'style:{width:"100%"}\' class\x3d"title"/\x3e\r\n      \x3cdiv class\x3d"tips"\x3e(${nls.thumbnailHint})\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv class\x3d"options hide"\x3e\r\n    \x3cdiv\x3e${nls.options}\x3c/div\x3e\r\n    \x3cdiv class\x3d"itmes" data-dojo-attach-point\x3d"saveExtent"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"itmes btns"\x3e\r\n      \x3cdiv class\x3d"" data-dojo-attach-point\x3d"saveLayers"\x3e\x3c/div\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"setBtn"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e  \r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv class\x3d"extent-chooser" style\x3d"height: 400px" data-dojo-attach-point\x3d"extentChooserNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting esri/geometry/Extent jimu/dijit/ImageChooser ./ExtentAndLayersChooser ./LayersChooser jimu/utils ../utils dojo/text!./Edit.html jimu/dijit/CheckBox".split(" "),function(h,c,e,d,k,l,m,b,n,p,q,f,r,g){return h([l,k],{baseClass:"jimu-Bookmark-Edit",ImageChooser:null,templateString:r,extent:{},portalUrl:null,itemId:null,isInWebmap:!1,mapOptions:null,layerOptions:null,postCreate:function(){this.inherited(arguments);
this.imageChooser=new b({cropImage:!0,defaultSelfSrc:this.folderUrl+"images/thumbnail_default.png",showSelfImg:!0,format:[b.GIF,b.JPEG,b.PNG],goldenWidth:100,goldenHeight:60});this._initOptins();this.own(d(this.displayName,"change",c.hitch(this,"_onNameChange")));this.own(d(this.displayName,"keyUp",c.hitch(this,"_onNameChange")));e.addClass(this.imageChooser.domNode,"img-chooser");e.place(this.imageChooser.domNode,this.imageChooserBase,"replace")},startup:function(){this.displayName&&this.displayName.focusNode&&
this.displayName.focusNode.focus&&this.displayName.focusNode.focus();this.inherited(arguments)},_initOptins:function(){this.saveExtent=new g({label:this.nls.saveExtent,checked:!0},this.saveExtent);this.saveLayers=new g({label:this.nls.savelayers,checked:!1},this.saveLayers);this.own(d(this.saveLayers,"change",c.hitch(this,"_changeSetBtnStyle")));this.layersChooser=new p({nls:this.nls,layers:this._getLayers(),enable:this.saveLayers.getValue()});this.layersChooser.placeAt(this.setBtn);this.layersChooser.startup();
this.own(d(this.layersChooser,"change",c.hitch(this,"_setLayers")))},_changeSetBtnStyle:function(){this.saveLayers.getValue()?this.layersChooser.enableMeun():this.layersChooser.disableMeun()},setLayersChooserLayers:function(a){this.layerOptions=a;this.layersChooser.setLayers(this.layerOptions)},_setLayers:function(a){this.layerOptions=a;f.layerInfosRestoreState(a)},_getLayers:function(){return f.getlayerInfos()},setConfig:function(a){var b={portalUrl:this.portalUrl,itemId:this.itemId};a.displayName&&
this.displayName.set("value",a.displayName);if(a.thumbnail){var e=q.processUrlInWidgetConfig(a.thumbnail,this.folderUrl);this.imageChooser.setDefaultSelfSrc(e)}a.extent&&(b.initExtent=new m(a.extent));this.mapOptions&&this.mapOptions.lods&&(b.lods=this.mapOptions.lods);a.isInWebmap&&(this.isInWebmap=!0);this.extentChooser=new n(b,this.extentChooserNode);this.own(d(this.extentChooser,"extentChange",c.hitch(this,this._onExtentChange)));"undefined"===typeof a.isSaveExtent&&(a.isSaveExtent=!0);f.setCheckboxWithoutEvent(this.saveExtent,
a.isSaveExtent);"undefined"===typeof a.isSaveLayers&&(a.isSaveLayers=!1);f.setCheckboxWithoutEvent(this.saveLayers,a.isSaveLayers);this._changeSetBtnStyle();a.layerOptions&&this.setLayersChooserLayers(a.layerOptions)},getConfig:function(){return{displayName:this.displayName.get("value"),name:this.displayName.get("value"),extent:this.extentChooser.getExtent(),thumbnail:this.imageChooser.imageData,isInWebmap:this.isInWebmap,isSaveExtent:this.saveExtent.getValue(),isSaveLayers:this.saveLayers.getValue(),
layerOptions:this.layerOptions}},_onNameChange:function(){this._checkRequiredField()},_onExtentChange:function(a){this.currentExtent=a},_checkRequiredField:function(){this.displayName.get("value")?this.popup&&this.popup.enableButton(0):this.popup&&this.popup.disableButton(0)}})});