// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/Print/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/Print/setting/Setting.html":'\x3cdiv style\x3d"width:100%;height:100%;"\x3e\r\n  \x3cdiv class\x3d"settings-section" data-dojo-attach-point\x3d"searchesSection"\x3e\r\n    \x3ctable class\x3d"setting-table input-table" cellspacing\x3d"0"\x3e\r\n      \x3ctbody\x3e\r\n        \x3ctr\x3e\r\n\r\n        \x3ctd class\x3d"first"\x3e*${nls.serviceURL}\x3c/td\x3e\r\n          \x3ctd class\x3d"second"\x3e\r\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox"\r\n            data-dojo-attach-point\x3d"serviceURL"\r\n            required\x3d"true" data-dojo-props\x3d"style:{width:\'100%\'}"/\x3e\r\n          \x3c/td\x3e\r\n\r\n          \x3ctd\x3e\x3cdiv data-dojo-attach-point\x3d"checkProcessDiv" style\x3d"display:none"\x3e\r\n            \x26nbsp;\x26nbsp;\x3cimg data-dojo-attach-point\x3d"checkImg" width\x3d"20px" height\x3d"20px" src\x3d""\x3e\x3c/div\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.defaultTitle}\x3c/td\x3e\r\n          \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox"\r\n            data-dojo-attach-point\x3d"defaultTitle" data-dojo-attach-event\x3d"Blur:_onTitleBlur" placeHolder\x3d"ArcGIS WebMap"\r\n            data-dojo-props\x3d\'style:{width:"100%"}\'/\x3e\r\n          \x3c/td\x3e\r\n        \x3c/tr\x3e\r\n        \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.defaultAuthor}\x3c/td\x3e\r\n          \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" placeHolder\x3d"Web AppBuilder for ArcGIS"\r\n            data-dojo-attach-point\x3d"defaultAuthor" data-dojo-attach-event\x3d"Blur:_onAuthorBlur" data-dojo-props\x3d\'style:{width:"100%"}\'/\x3e\r\n          \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.defaultCopyright}\x3c/td\x3e\r\n          \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n            \x3ctextarea data-dojo-attach-point\x3d"defaultCopyright" name\x3d"copyright"\r\n                      data-dojo-attach-event\x3d"Blur:_onCopyrightBlur"\r\n                      data-dojo-type\x3d"dijit/form/SimpleTextarea"\r\n                      style\x3d"width:100%;height:60px;resize:none;"\x3e\x3c/textarea\x3e\r\n          \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr style\x3d"display: none"\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.defaultFormat}\x3c/td\x3e\r\n          \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n            \x3cselect data-dojo-type\x3d"dijit/form/ComboBox" data-dojo-attach-point\x3d"defaultFormat"\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr style\x3d"display: none"\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.defaultLayout}\x3c/td\x3e\r\n          \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n            \x3cselect data-dojo-type\x3d"dijit/form/ComboBox" data-dojo-attach-point\x3d"defaultLayout"\x3e\r\n            \x3c/select\x3e\r\n          \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3ctr style\x3d"display: none"\x3e\r\n          \x3ctd class\x3d"first"\x3e${nls.advancedOption}\x3c/td\x3e\r\n          \x3ctd class\x3d"second" colspan\x3d"2"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"showAdvancedOptionChk"\r\n                data-dojo-type\x3d"jimu/dijit/CheckBox"\r\n                data-dojo-props\x3d"checked:true"\x3e\r\n          \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n      \x3c/tbody\x3e\r\n    \x3c/table\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e',
"url:widgets/Print/setting/css/style.css":".jimu-widget-print-setting{margin:0; padding:0; font-size:15px;}.jimu-widget-print-setting .dijitArrowButtonContainer{width: 17px;}.jimu-widget-print-setting .setting-table \x3e thead \x3e tr \x3e th,.jimu-widget-print-setting .setting-table \x3e tbody \x3e tr \x3e td{height:40px; line-height:40px; vertical-align:middle;}.jimu-widget-print-setting .input-table \x3e tbody \x3e tr \x3e .first{width:auto; text-align: right; padding-right:15px; min-width: 200px;}.jimu-widget-print-setting .input-table \x3e tbody \x3e tr \x3e .second{width:650px;}",
"*now":function(g){g(['dojo/i18n!*preload*widgets/Print/setting/nls/Setting*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare jimu/BaseWidgetSetting dijit/_WidgetsInTemplateMixin dojo/_base/lang dojo/on dojo/Deferred dojo/dom-style dojo/dom-attr esri/request jimu/dijit/Message jimu/portalUtils jimu/portalUrlUtils jimu/utils dojo/store/Memory dijit/form/ValidationTextBox dijit/form/ComboBox jimu/dijit/CheckBox dijit/form/SimpleTextarea".split(" "),function(g,p,q,d,r,t,e,u,v,m,w,k,c,n){return g([p,q],{baseClass:"jimu-widget-print-setting",memoryFormat:new n,memoryLayout:new n,_portalPrintTaskURL:null,
validUrl:!0,startup:function(){this.inherited(arguments);this.setConfig(this.config);u.set(this.checkImg,"src",require.toUrl("jimu")+"/images/loading.gif");this.serviceURL.validator=d.hitch(this,this.validator);this.own(r(this.serviceURL,"Change",d.hitch(this,this.onUrlChange)))},validator:function(a){if(!this.validUrl)return this.serviceURL.invalidMessage=this.nls.urlNotAvailable,!1;var b=k.getNewPrintUrl(this.appConfig.portalUrl);if(a===b||/^https?:\/\/.+sharing\/tools\/newPrint$/.test(a)||/^https?:\/\/.+\/GPServer\//.test(a))return!0;
this.serviceURL.invalidMessage=this.nls.notPrintTask;return!1},onUrlChange:function(){this.validUrl=!0;if(this.serviceURL.validate()){var a=this.serviceURL.get("value");if(a){e.set(this.checkProcessDiv,"display","");this.memoryFormat.data={};this.memoryLayout.data={};this.defaultFormat.set("store",this.memoryFormat);this.defaultLayout.set("store",this.memoryLayout);this.defaultFormat.set("value","");this.defaultLayout.set("value","");e.set(this.defaultFormat.domNode.parentNode.parentNode,"display",
"none");e.set(this.defaultLayout.domNode.parentNode.parentNode,"display","none");var b=k.setHttpProtocol(this.serviceURL.get("value")),l=k.getNewPrintUrl(this.appConfig.portalUrl);b===l||/sharing\/tools\/newPrint$/.test(b)?e.set(this.checkProcessDiv,"display","none"):this._getPrintTaskInfo(a)}}},_getPrintTaskInfo:function(a){v({url:a,content:{f:"json"},handleAs:"json",callbackParamName:"callback",timeout:6E4,load:d.hitch(this,this._handlePrintInfo),error:d.hitch(this,this._handleError)})},_handleError:function(){e.set(this.checkProcessDiv,
"display","none");this.validUrl=!1;this.serviceURL.validate()},_handlePrintInfo:function(a){e.set(this.checkProcessDiv,"display","none");e.set(this.defaultFormat.domNode.parentNode.parentNode,"display","");e.set(this.defaultLayout.domNode.parentNode.parentNode,"display","");var b=!1;if(a&&a.parameters)for(var l=a.parameters.length,c=0;c<l;c++){var d=a.parameters[c];if("Format"===d.name||"Layout_Template"===d.name){for(var f=a.parameters[c].choiceList,g=f.length,b=[],h=0;h<g;h++)b.push({name:f[h],
id:f[h]});f=a.parameters[c].defaultValue;"Format"===d.name?(this.memoryFormat.data=b,this.defaultFormat.set("store",this.memoryFormat),this.config.serviceURL===this.serviceURL.get("value")&&this.config.defaultFormat?this.defaultFormat.set("value",this.config.defaultFormat):this.defaultFormat.set("value",f)):(this.memoryLayout.data=b,this.defaultLayout.set("store",this.memoryLayout),this.config.serviceURL===this.serviceURL.get("value")&&this.config.defaultLayout?this.defaultLayout.set("value",this.config.defaultLayout):
this.defaultLayout.set("value",f));b=!0}}b||(this.validUrl=!1,this.serviceURL.validate())},setConfig:function(a){this.config=a;this.loadPrintURL(a);a.defaultTitle?this.defaultTitle.set("value",c.stripHTML(a.defaultTitle)):this.defaultTitle.set("value","ArcGIS WebMap");a.defaultAuthor?this.defaultAuthor.set("value",c.stripHTML(a.defaultAuthor)):this.defaultTitle.set("value","Web AppBuilder for ArcGIS");a.defaultCopyright&&this.defaultCopyright.set("value",c.stripHTML(a.defaultCopyright))},_onTitleBlur:function(){this.defaultTitle.set("value",
c.stripHTML(this.defaultTitle.get("value")))},_onAuthorBlur:function(){this.defaultAuthor.set("value",c.stripHTML(this.defaultAuthor.get("value")))},_onCopyrightBlur:function(){this.defaultCopyright.set("value",c.stripHTML(this.defaultCopyright.get("value")))},getConfig:function(){if(!this.serviceURL.validate()){var a=new m({message:this.nls.warning,buttons:[{label:this.nls.ok,onClick:d.hitch(this,function(){a.close()})}]});return!1}this.config.serviceURL=this.serviceURL.get("value");this.config.defaultTitle=
c.stripHTML(this.defaultTitle.get("value"));this.config.defaultAuthor=c.stripHTML(this.defaultAuthor.get("value"));this.config.defaultCopyright=c.stripHTML(this.defaultCopyright.get("value"));this.config.defaultFormat=this.defaultFormat.get("value");this.config.defaultLayout=this.defaultLayout.get("value");return this.config},loadPrintURL:function(){this._getPrintTaskURL(this.appConfig.portalUrl).then(d.hitch(this,function(a){this.serviceURL.set("value",a)}))},_getPrintTaskURL:function(a){var b=new t;
if(this.config&&this.config.serviceURL)return b.resolve(this.config.serviceURL),b;w.getPortalSelfInfo(a).then(d.hitch(this,function(a){(a=a&&a.helperServices&&a.helperServices.printTask&&a.helperServices.printTask.url)?b.resolve(a):b.reject("error")}),d.hitch(this,function(a){new m({message:this.nls.portalConnectionError||a&&a.message||"portal connection error"});b.reject("error");console.error(a)}));return b}})});