// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:jimu/dijit/templates/_FilterSet.html":'\x3cdiv\x3e\r\n\t\x3ctable class\x3d"header-table" cellspacing\x3d"0" cellpadding\x3d"0"\x3e\r\n\t\t\x3ctbody\x3e\r\n\t\t\t\x3ctr\x3e\r\n\t\t\t\t\x3ctd\x3e\r\n\t\t\t\t\t\x3cdiv\x3e\r\n\t\t\t\t\t\t\x3cspan\x3e${nls.strMatchMsgPart1}\x3c/span\x3e\r\n\t\t\t\t\t\t\x3cselect data-dojo-attach-point\x3d"allAnySelect"\x3e\r\n\t\t\t\t\t\t\t\x3coption value\x3d"AND" selected\x3e${nls.all}\x3c/option\x3e\r\n\t\t\t\t\t\t\t\x3coption value\x3d"OR"\x3e${nls.any}\x3c/option\x3e\r\n\t\t\t\t\t\t\x3c/select\x3e\r\n\t\t\t\t\t\t\x3cspan\x3e${nls.strMatchMsgPart2}\x3c/span\x3e\r\n\t\t\t\t\t\x3c/div\x3e\r\n\t\t\t\t\x3c/td\x3e\r\n\t\t\t\t\x3ctd style\x3d"width:15px;padding-right:10px;"\x3e\r\n\t\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"btnDelete" data-dojo-attach-event\x3d"onclick:_destroySelf"\r\n\t\t\t\t\t class\x3d"jimu-icon jimu-icon-delete"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3c/td\x3e\r\n\t\t\t\t\x3ctd style\x3d"width:15px;padding-right:14px;"\x3e\r\n\t\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"btnAdd" class\x3d"jimu-icon jimu-icon-add"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3c/td\x3e\r\n\t\t\t\x3c/tr\x3e\r\n\t\t\x3c/tbody\x3e\r\n\t\x3c/table\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"allExpsBox"\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./templates/_FilterSet.html dijit/registry dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/aspect dojo/query ./_SingleFilter".split(" "),function(g,h,k,l,m,e,b,c,d,n,p,f,q){return g([h,k,l],{templateString:m,baseClass:"jimu-filter-set",nls:null,url:null,layerInfo:null,stringFieldType:"",dateFieldType:"",numberFieldTypes:[],partsObj:null,OPERATORS:null,enableAskForValues:!1,isHosted:!1,
valueProviderFactory:null,postMixInProperties:function(){this.nls=window.jimuNls.filterBuilder;var a=this.nls.matchMsgSet.split("${any_or_all}");this.nls.strMatchMsgPart1=a[0]||"";this.nls.strMatchMsgPart2=a[1]||"";this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this._initSelf()},toJson:function(){var a=f(".jimu-single-filter",this.allExpsBox),a=d.map(a,b.hitch(this,function(a){return e.byNode(a).toJson()}));return d.every(a,b.hitch(this,function(a){return!!a}))&&0<a.length?
{logicalOperator:this.allAnySelect.value,parts:a}:null},showDelteIcon:function(){c.setStyle(this.btnDelete,"display","block")},hideDeleteIcon:function(){c.setStyle(this.btnDelete,"display","none")},_initSelf:function(){this.own(n(this.btnAdd,"click",b.hitch(this,this._addSingleFilter)));if(this.partsObj){this.allAnySelect.value=this.partsObj.logicalOperator;var a=this.partsObj.parts||[];0===a.length?(this._addSingleFilter(),this._addSingleFilter()):1===a.length?(this._addSingleFilter(a[0]),this._addSingleFilter()):
d.forEach(a,b.hitch(this,function(a){this._addSingleFilter(a)}))}else this._addSingleFilter(),this._addSingleFilter()},_addSingleFilter:function(a){a=new q({url:this.url,layerInfo:this.layerInfo,stringFieldType:this.stringFieldType,dateFieldType:this.dateFieldType,numberFieldTypes:this.numberFieldTypes,part:a,OPERATORS:this.OPERATORS,enableAskForValues:this.enableAskForValues,isHosted:this.isHosted,valueProviderFactory:this.valueProviderFactory,style:{margin:"15px auto 0 auto",border:0,background:"inherit"}});
a.placeAt(this.allExpsBox);a.startup();this.own(p.after(a,"_destroySelf",b.hitch(this,this._checkFilterNumbers)));this._checkFilterNumbers()},_checkFilterNumbers:function(){var a=f(".jimu-single-filter",this.allExpsBox),c=2<a.length;d.forEach(a,b.hitch(this,function(a){a=e.byNode(a);c?a.showDelteIcon():a.hideDeleteIcon()}))},_destroySelf:function(){this.destroy()}})});