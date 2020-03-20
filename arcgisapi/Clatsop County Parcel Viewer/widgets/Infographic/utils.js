// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define([],function(){return{checkDSIsVaild:function(a,d,c){var b=!0;a?"DATA_SOURCE_FROM_FRAMEWORK"===a.dataSourceType?c&&c.dataSource&&c.dataSource.dataSources?c.dataSource.dataSources[a.frameWorkDsId]||(b=!1):b=!1:"DATA_SOURCE_FEATURE_LAYER_FROM_MAP"===a.dataSourceType&&((a=a.layerId)&&d?d.getLayer(a)||(b=!1):b=!1):b=!1;return b}}});