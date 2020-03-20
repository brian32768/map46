// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/MyLocation/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/MyLocation/setting/Setting.html":'\x3cdiv style\x3d"width:100%;"\x3e\r\n  \x3ctable class\x3d"setting-table input-table" cellspacing\x3d"0"\x3e\r\n    \x3ctbody\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"first"\x3e\r\n          \x3cdiv class\x3d"cb" data-dojo-type\x3d"jimu/dijit/CheckBox" data-dojo-attach-point\x3d"highlightLocation"\x3e\x3c/div\x3e\r\n          \x3cdiv class\x3d"cb-label"\x3e${nls.highlightLocation}\x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3c!--\x3ctd class\x3d"second"\x3e\x3c/td\x3e--\x3e\r\n        \x3ctd class\x3d"third"\x3e\r\n          \x3cdiv class\x3d"help-icon"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"first"\x3e\r\n          \x3cdiv class\x3d"cb" data-dojo-type\x3d"jimu/dijit/CheckBox" data-dojo-attach-point\x3d"useTracking"\x3e\x3c/div\x3e\r\n          \x3cdiv class\x3d"cb-label"\x3e${nls.useTracking}\x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3c!--\x3ctd class\x3d"second"\x3e\x3c/td\x3e--\x3e\r\n        \x3ctd class\x3d"third"\x3e\r\n          \x3cdiv class\x3d"help-icon"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"first"\x3e\r\n          \x3cspan class\x3d"inputs-label"\x3e${nls.timeout}\x3c/span\x3e\r\n          \x3cdiv class\x3d"config-group"\x3e\r\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" required\x3d"true" placeHolder\x3d"15000"\r\n                   data-dojo-attach-point\x3d"timeout" data-dojo-props\x3d\'style:{width:"100px"}, constraints:{min:10}\'/\x3e\r\n            \x3cspan style\x3d"margin: 0 10px"\x3e(ms)\x3c/span\x3e\r\n          \x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3c!--\x3ctd class\x3d"second"\x3e\x3c/td\x3e--\x3e\r\n        \x3ctd class\x3d"third"\x3e\r\n          \x3cdiv class\x3d"help-icon"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr\x3e\r\n        \x3ctd class\x3d"first"\x3e\r\n          \x3cspan class\x3d"inputs-label"\x3e${nls.zoomScale}\x3c/span\x3e\r\n          \x3cdiv class\x3d"config-group"\x3e\r\n            \x3cspan\x3e1: \x3c/span\x3e\r\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" required\x3d"true" placeHolder\x3d"50000"\r\n                   data-dojo-attach-point\x3d"scale" data-dojo-props\x3d\'style:{width:"150px"},\r\n                   constraints:{min:1,pattern:"##############0.################"}\'/\x3e\r\n          \x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3c!--\x3ctd class\x3d"second"\x3e\x3c/td\x3e--\x3e\r\n        \x3ctd class\x3d"third"\x3e\r\n          \x3cdiv class\x3d"help-icon"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n    \x3c/tbody\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/MyLocation/setting/css/style.css":".jimu-widget-mylocation-setting{margin:0; padding:0; font-size:15px;}.jimu-widget-mylocation-setting .setting-table \x3e thead \x3e tr \x3e th,.jimu-widget-mylocation-setting .setting-table \x3e tbody \x3e tr \x3e td{height:40px; line-height:40px; vertical-align:middle;}.jimu-widget-mylocation-setting .input-table \x3e tbody \x3e tr \x3e .first{width:auto; text-align: left; padding-right:15px; position: relative;}.jimu-widget-mylocation-setting .input-table \x3e tbody \x3e tr \x3e .first .cb,.cb-label{vertical-align: middle; line-height: 20px; height: 20px; display: inline-block; padding-left: 5px;}.jimu-widget-mylocation-setting .input-table \x3e tbody \x3e tr \x3e .first .inputs-label{min-width: 150px; padding-right: 20px; display: inline-block;}.jimu-widget-mylocation-setting .input-table \x3e tbody \x3e tr \x3e .first .config-group{position: absolute; display: inline-block; top: 50%; -webkit-transform: translate(0%, -50%); -ms-transform: translate(0%, -50%); transform: translate(0%, -50%); min-width: 200px;}.jimu-widget-mylocation-setting .input-table \x3e tbody \x3e tr \x3e .second{width:200px;}.jimu-widget-mylocation-setting .input-table \x3e tbody \x3e tr \x3e .third{width:35px;}",
"*now":function(b){b(['dojo/i18n!*preload*widgets/MyLocation/setting/nls/Setting*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/dijit/Message dijit/form/NumberTextBox jimu/dijit/CheckBox".split(" "),function(b,c,d,e){return b([d,c],{baseClass:"jimu-widget-mylocation-setting",startup:function(){this.inherited(arguments);this.config.locateButton||(this.config.locateButton={});this.config.locateButton.geolocationOptions||(this.config.locateButton.geolocationOptions={});this.setConfig(this.config)},setConfig:function(a){this.config=a;a.locateButton.geolocationOptions&&
a.locateButton.geolocationOptions.timeout&&this.timeout.set("value",a.locateButton.geolocationOptions.timeout);a.locateButton.highlightLocation||"undefined"===typeof a.locateButton.highlightLocation?this.highlightLocation.setValue(!0):this.highlightLocation.setValue(!1);a.locateButton.useTracking||"undefined"===typeof a.locateButton.useTracking?this.useTracking.setValue(!0):this.useTracking.setValue(!1);a.locateButton.scale&&this.scale.set("value",a.locateButton.scale)},getConfig:function(){if(!this.timeout.value||
!this.scale.value)return new e({message:this.nls.warning}),!1;this.config.locateButton.geolocationOptions.timeout=parseInt(this.timeout.value,10);this.config.locateButton.highlightLocation=this.highlightLocation.checked;this.config.locateButton.useTracking=this.useTracking.checked;this.config.locateButton.scale=parseFloat(this.scale.value);return this.config}})});