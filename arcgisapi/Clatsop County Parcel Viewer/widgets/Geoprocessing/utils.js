// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/array","dojo/Deferred","esri/request"],function(g,h,f){var e={promisifyGetValue:function(a){var b=a.getValue;a.getValue=function(){var c=b.apply(a);if(null!==c&&c.then)return c;var d=new h;d.resolve(c);return d}},allowShareResult:function(a){return g.some(a.outputParams,function(a){return"GPRecordSet"===a.dataType||"GPFeatureRecordSetLayer"===a.dataType&&a.defaultValue&&a.defaultValue.geometryType})},getServiceDescription:function(a){var b;return f({url:a,content:{f:"json"},handleAs:"json",
callbackParamName:"callback"}).then(function(c){b=c;return e.getGPServerDescription(a).then(function(a){b.serverInfo=a;b.useResultMapServer=a.hasResultMapServer;return e.uploadSupported(a).then(function(a){b.serverInfo.supportsUpload=a.supportsUpload;"maxUploadFileSize"in a&&(b.serverInfo.maxUploadFileSize=a.maxUploadFileSize);return b})})})},getGPServerDescription:function(a){var b={url:e.getGPServerUrl(a),content:{f:"json"},handleAs:"json",callbackParamName:"callback"};return f(b,{useProxy:!1}).then(function(a){var d=
{};d.currentVersion=a.currentVersion||0;d.url=b.url;d.hasResultMapServer="esriExecutionTypeAsynchronous"===a.executionType&&"resultMapServerName"in a&&""!==a.resultMapServerName;d.resultMapServerName=a.resultMapServerName;return d})},getGPServerUrl:function(a){if(!/\/GPServer\/.+$/.test(a))return"";var b=a.search(/[\w]+[^\/]*$/g);return a.substr(0,b)},getResultMapServerUrl:function(a,b){if(!/\/rest\/services\//.test(a))return"";var c=a.search(/\/rest\/services\//);return a.substr(0,c+15)+b+"/MapServer"},
uploadSupported:function(a){if(10.1<=a.currentVersion)return f({url:a.url+"uploads/info",content:{f:"json"},handleAs:"json"}).then(function(a){return{supportsUpload:!0,maxUploadFileSize:a.maxUploadFileSize}},function(){return{supportsUpload:!1}});a=new h;a.resolve({supportsUpload:!1});return a},getResultMapLayers:function(a,b){var c={url:e.getResultMapServerUrl(a,b),content:{f:"json"},handleAs:"json",callbackParamName:"callback"};return f(c,{useProxy:!1}).then(function(a){var b=g.map(a.layers,function(a){return a.name});
g.forEach(a.tables,function(a){b.push(a.name)});return b})},useDynamicSchema:function(a,b){return"useDynamicSchema"in a?!0===a.useDynamicSchema:!0===b.useDynamicSchema}};return e});