// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

(function(a,b){"function"===typeof define&&define.amd?define([],b):"object"===typeof exports?module.exports=b():a.rasterFunctions=b()})(this,function(){return{createColormapParams:function(a){a||(a={});return{rasterFunction:"Colormap",rasterFunctionArguments:{Raster:a.raster||"$$",Colormap:a.colormap||[]}}},createRemapParams:function(a){a||(a={});return{rasterFunction:"Remap",rasterFunctionArguments:{Raster:a.Raster||"$$",UseTable:!1,InputRanges:a.InputRanges||[],OutputValues:a.OutputValues||[],NoDataRanges:a.NoDataRanges||
[],AllowUnmatched:!0}}},createLocalParams:function(a,b){b||(b={});var c={rasterFunction:"Local",rasterFunctionArguments:{Operation:a,ExtentType:0,CellsizeType:1,Rasters:b.rasters||[]}};b.outputPixelType&&(c.outputPixelType=b.outputPixelType);return c},createWeightedSumParams:function(a,b){var c=a.map(function(a){var b=this.createRemapParams(a);return this.createLocalParams(3,{rasters:[b,a.weight]})},this),c=this.createLocalParams(55,{rasters:c}),c=this.createLocalParams(49,{rasters:[c],outputPixelType:"U8"});
return this.createColormapParams({raster:c,colormap:b})}}});