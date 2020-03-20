// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/_base/array dojo/_base/declare ./BlankValueProvider ./SimpleValueProvider ./TwoNumbersValueProvider ./TwoDatesValueProvider ./ListValueProvider ./NumberListValueProvider jimu/LayerInfos/LayerInfos".split(" "),function(f,l,r,t,u,v,w,x,y,z){var n={stringOperatorIs:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",codedValueProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",
supportAskForValue:!0,filterCodedValueIfPossible:!0}},stringOperatorIsNot:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},stringOperatorStartsWith:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0,supportCaseSensitive:!0}},stringOperatorEndsWith:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0,
supportCaseSensitive:!0}},stringOperatorContains:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0,supportCaseSensitive:!0}},stringOperatorDoesNotContain:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0,supportCaseSensitive:!0}},stringOperatorIsBlank:{value:{normalProviderType:"BLANK_VALUE_PROVIDER"}},stringOperatorIsNotBlank:{value:{normalProviderType:"BLANK_VALUE_PROVIDER"}},numberOperatorIs:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",codedValueProviderType:"LIST_VALUE_PROVIDER",
supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},numberOperatorIsNot:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},numberOperatorIsAtLeast:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},
field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},numberOperatorIsLessThan:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},numberOperatorIsAtMost:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},
unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},numberOperatorIsGreaterThan:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"},unique:{normalProviderType:"LIST_VALUE_PROVIDER",supportAskForValue:!0,filterCodedValueIfPossible:!0}},numberOperatorIsBetween:{value:{normalProviderType:"TWO_NUMBERS_VALUE_PROVIDER",supportAskForValue:!0}},numberOperatorIsNotBetween:{value:{normalProviderType:"TWO_NUMBERS_VALUE_PROVIDER",
supportAskForValue:!0}},numberOperatorIsBlank:{value:{normalProviderType:"BLANK_VALUE_PROVIDER"}},numberOperatorIsNotBlank:{value:{normalProviderType:"BLANK_VALUE_PROVIDER"}},dateOperatorIsOn:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"}},dateOperatorIsNotOn:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"}},dateOperatorIsBefore:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",
supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"}},dateOperatorIsAfter:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"}},dateOperatorIsOnOrBefore:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"}},dateOperatorIsOnOrAfter:{value:{normalProviderType:"SIMPLE_VALUE_PROVIDER",supportAskForValue:!0},field:{normalProviderType:"LIST_VALUE_PROVIDER"}},
dateOperatorInTheLast:{value:{normalProviderType:"NUMBER_LIST_VALUE_PROVIDER",supportAskForValue:!0}},dateOperatorNotInTheLast:{value:{normalProviderType:"NUMBER_LIST_VALUE_PROVIDER",supportAskForValue:!0}},dateOperatorIsBetween:{value:{normalProviderType:"TWO_DATES_VALUE_PROVIDER",supportAskForValue:!0}},dateOperatorIsNotBetween:{value:{normalProviderType:"TWO_DATES_VALUE_PROVIDER",supportAskForValue:!0}},dateOperatorIsBlank:{value:{normalProviderType:"BLANK_VALUE_PROVIDER"}},dateOperatorIsNotBlank:{value:{normalProviderType:"BLANK_VALUE_PROVIDER"}}},
e=r([],{nls:null,layerInfo:null,popupInfo:null,url:null,layerDefinition:null,featureLayerId:null,constructor:function(a){f.mixin(this,a);this.nls=window.jimuNls.filterBuilder;a=z.getInstanceSync();this.featureLayerId&&(this.layerInfo=a.getLayerOrTableInfoById(this.featureLayerId))&&(this.popupInfo=this.layerInfo.getPopupInfo())},getSupportedValueTypes:function(a,b){var d=[],c=n[b];c&&(c.value&&d.push("value"),c.field&&0<this._getSameShortTypeFieldNames(a).length&&d.push("field"),c.unique&&this.url&&
(this._isStreamServer(this.url)||10.1<=parseFloat(this.layerDefinition.currentVersion)&&d.push("unique")));return d},_isStreamServer:function(a){a=(a||"").replace(/\/*$/g,"");return/\/StreamServer$/gi.test(a)},_getSameShortTypeFieldNames:function(a){var b=[],d=this._getFieldInfo(this.layerDefinition,a),c=e.getShortTypeByEsriType(d.type);l.forEach(this.layerDefinition.fields,f.hitch(this,function(d){d.name!==a&&e.getShortTypeByEsriType(d.type)===c&&b.push(d.name)}));return b},getValueProvider:function(a,
b){var d=null,c=f.clone(n[a.operator]);if(c){var h=a.valueObj.type,e=a.fieldObj.name,p=this._getFieldInfo(this.layerDefinition,e),m=c[h],g=m.normalProviderType,q=null,k=this._getCodedValues(p);k||this.layerDefinition.typeIdField&&this.layerDefinition.typeIdField.toUpperCase()===e.toUpperCase()&&(k=this._getSubTypes(this.layerDefinition));"field"===h?(h=this._getSameShortTypeFieldNames(e),0<h.length&&(q=l.map(h,f.hitch(this,function(a){return{value:a,label:a}})))):k&&0<k.length&&m.codedValueProviderType&&
(g=m.codedValueProviderType);c={nls:this.nls,url:this.url,layerDefinition:this.layerDefinition,partObj:a,fieldInfo:p,codedValues:k,staticValues:q,layerInfo:this.layerInfo,popupInfo:this.popupInfo,operatorInfo:c,filterCodedValueIfPossible:!!m.filterCodedValueIfPossible,runtime:b};"BLANK_VALUE_PROVIDER"===g?d=new t(c):"SIMPLE_VALUE_PROVIDER"===g?d=new u(c):"TWO_NUMBERS_VALUE_PROVIDER"===g?d=new v(c):"TWO_DATES_VALUE_PROVIDER"===g?d=new w(c):"LIST_VALUE_PROVIDER"===g?(c.showNullValues=!1,d=new x(c)):
"NUMBER_LIST_VALUE_PROVIDER"===g&&(d=new y(c))}return d},_getFieldInfo:function(a,b){for(var d=a.fields,c=0;c<d.length;c++){var e=d[c];if(b===e.name)return e}return null},_getCodedValues:function(a){var b=null;(a=a.domain)&&"codedValue"===a.type&&a.codedValues&&0<a.codedValues.length&&(b=a.codedValues,b=l.map(b,f.hitch(this,function(a){return{value:a.code,label:a.name}})));return b},_getSubTypes:function(a){var b=null;a.typeIdField&&a.types&&0<a.types.length&&(b=l.map(a.types,f.hitch(this,function(a){return{value:a.id,
label:a.name}})));return b}});e.getOperatorInfo=function(a){return f.clone(n[a])};e.getOperatorsByShortType=function(a){var b=[];"string"===a?b="stringOperatorIs stringOperatorIsNot stringOperatorStartsWith stringOperatorEndsWith stringOperatorContains stringOperatorDoesNotContain stringOperatorIsBlank stringOperatorIsNotBlank".split(" "):"number"===a?b="numberOperatorIs numberOperatorIsNot numberOperatorIsAtLeast numberOperatorIsLessThan numberOperatorIsAtMost numberOperatorIsGreaterThan numberOperatorIsBetween numberOperatorIsNotBetween numberOperatorIsBlank numberOperatorIsNotBlank".split(" "):
"date"===a&&(b="dateOperatorIsOn dateOperatorIsNotOn dateOperatorIsBefore dateOperatorIsAfter dateOperatorIsOnOrBefore dateOperatorIsOnOrAfter dateOperatorInTheLast dateOperatorNotInTheLast dateOperatorIsBetween dateOperatorIsNotBetween dateOperatorIsBlank dateOperatorIsNotBlank".split(" "));return b};e.getShortTypeByEsriType=function(a){var b=null;"esriFieldTypeString"===a?b="string":"esriFieldTypeDate"===a?b="date":0<=["esriFieldTypeOID","esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle",
"esriFieldTypeDouble"].indexOf(a)&&(b="number");return b};return e});