// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/RelatedTableCharts/ChartLayout.html":'\x3cdiv\x3e\r\n    \x3cdiv class\x3d"esriCTLayoutContent"\x3e\r\n        \x3cdiv class\x3d"esriCTLabels"\x3e\r\n            \x3cdiv class\x3d"esriCTLayoutHeaderTitle" data-dojo-attach-point\x3d"layoutHeaderTitle"\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTChartContainer" data-dojo-attach-point\x3d"chartContainer"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTLegendContainer" data-dojo-attach-point\x3d"legendContainer"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"legendNode"\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTChartDescription" data-dojo-attach-point\x3d"chartDescription"\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("jimu/BaseWidgetSetting jimu/utils dojo/dom-attr dojo/dom-construct dojo/dom-style dojo/_base/declare dojo/_base/lang dijit/_WidgetsInTemplateMixin dojo/text!./ChartLayout.html dojox/charting/Chart dojox/charting/plot2d/Pie dojox/charting/action2d/Tooltip dojox/charting/action2d/Highlight dojox/charting/action2d/MoveSlice dojox/charting/plot2d/Spider dojox/charting/widget/SelectableLegend dojox/charting/action2d/Magnify dojox/charting/plot2d/Bars dojox/charting/axis2d/Default".split(" "),function(r,
t,l,h,k,u,q,v,w,m,x,n,p,y,z,A,B){return u([r,v],{baseClass:"jimu-widget-RelatedTableCharts-layout",templateString:w,postCreate:function(){this.inherited(arguments)},startup:function(){this._createChartLayout()},_createChartLayout:function(){this._setNodeValue(this.layoutHeaderTitle,this.config.chartConfig.chartTitle,!0);this._setNodeValue(this.chartDescription,this.config.chartConfig.description,!1);this._initChart()},resizeChart:function(a){this.chart&&setTimeout(q.hitch(this,function(){"PieChart"!==
this.config.chartConfig.chartType?this.chart.resize():this._initChart();this.onChartResize()}),a)},_setNodeValue:function(a,c,b){var d=c;this.config.isPreview||(d=this._getFieldValues(c,this.config.selectedFeature.attributes));d?(d=t.sanitizeHTML(d),l.set(a,"innerHTML",d),b&&l.set(a,"title",d)):k.set(a,"display","none")},_initChart:function(){switch(this.config.chartConfig.chartType){case "BarChart":this._createBarChart();break;case "PieChart":this._createPieChart();break;case "PolarChart":this._createPolarChart();
break;default:l.set(this.chartContainer,"innerHTML",this.nls.errMsgNoFeaturesFound)}},_getBarChartContainerHeight:function(){var a=30;0<this.config.chartData.chartSeries.length&&(a=30*this.config.chartData.chartSeries.length);150>=a&&(a+=100);return a+"px"},_createBarChart:function(){var a,c={},b={};a=40;var d,e,f={};h.empty(this.chartContainer);a=this._getBarChartContainerHeight();a=new m(h.create("div",{style:"overflow:hidden; width:100%; height:"+a},this.chartContainer));a.addPlot("default",{type:"Bars",
gap:4,minBarSize:10,maxBarSize:15});b=k.get(this.chartDescription,"fontFamily");d=k.get(this.chartDescription,"fontSize");e=k.get(this.chartDescription,"color");c={labels:this.config.chartData.chartLabels,maxLabelCharCount:30,trailingSymbol:"...",natural:!0,majorTickStep:1,minorTicks:!1,fixUpper:!0,includeZero:!1,vertical:!0,titleFontColor:e,titleFont:"normal normal normal "+d+" "+b,font:"normal normal normal 9px "+b};b={fixLower:"major",fixUpper:"major",minorTicks:!1,includeZero:!0,titleFontColor:e,
titleFont:"normal normal normal "+d+" "+b,font:"normal normal normal 9px "+b};this.config.isPreview?(b.titleGap=5,c.majorTick={length:0},b.majorTick={length:0},c.majorLabels=!1,b.majorLabels=!1,c.minorLabels=!1,b.minorLabels=!1,c.title=this.config.chartConfig.labelYAxis,b.title=this.config.chartConfig.labelXAxis,f.stroke={width:0}):(new n(a,"default"),c.title=this._getFieldValues(this.config.chartConfig.labelYAxis,this.config.selectedFeature.attributes),b.title=this._getFieldValues(this.config.chartConfig.labelXAxis,
this.config.selectedFeature.attributes),f.stroke={width:1});b.titleOrientation="away";a.addAxis("y",c);a.addAxis("x",b);this.config.chartData.selectedTheme&&a.setTheme(this.config.chartData.selectedTheme);this.config.chartData.fill&&(f.fill=this.config.chartData.fill);a.addSeries(this.config.chartConfig.dataSeriesField,this.config.chartData.chartSeries,f,{plot:"default"});new p(a,"default");a.render();this.chart=a;this.onChartCreated()},_createPieChart:function(){var a,c={};h.empty(this.chartContainer);
a=h.create("div",{style:"width:100%; height:100%; overflow:auto"},this.chartContainer);a=new m(a);c={type:x,labels:!0,ticks:!0,fixed:!0,precision:0,labelWiring:"#ccc",labelStyle:"columns",htmlLabels:!0,startAngle:-10,maxLabelCharCount:20,trailingSymbol:"..."};"esriCTEmptyOption"===this.config.chartConfig.labelField&&(c.labels=!1);a.addPlot("default",c);this.config.isPreview||new n(a,"default");this.config.chartData.fill?a.addSeries(this.config.chartConfig.dataSeriesField,this.config.chartData.chartSeries,
{fill:this.config.chartData.fill},{plot:"default"}):a.addSeries(this.config.dataSeriesField,this.config.chartData.chartSeries,{plot:"default"});this.config.chartData.selectedTheme&&a.setTheme(this.config.chartData.selectedTheme);new y(a,"default");new p(a,"default");a.render();this.chart=a;this.onChartCreated()},_createPolarChart:function(){var a,c,b,d=.2,e=!1;this.chart&&this.chart.destroy();h.empty(this.chartContainer);k.set(this.chartContainer,"direction","inherit");a=h.create("div",{style:"width:100%; height:100%; overflow:hidden"},
this.chartContainer);b=k.get(this.chartDescription,"fontFamily");a=new m(a);this.config.chartConfig.showPolygonFill||(d=0);a.addPlot("default",{type:z,labelOffset:-10,divisions:5,seriesFillAlpha:d,markerSize:3,precision:0,spiderType:"polygon",axisFont:"normal normal normal 9px/25px "+b});this.config.chartData.selectedTheme?a.setTheme(this.config.chartData.selectedTheme):this.config.chartConfig.chartColor.colorInfo&&this.config.chartConfig.chartColor.colorInfo.layerField&&(e=!0);for(d=0;d<this.config.chartData.chartSeries.length;d++)for(c in b=
this.config.chartData.chartSeries[d],b)b.hasOwnProperty(c)&&(this.config.chartData.fill?a.addSeries(c,b[c],{fill:this.config.chartData.fill}):b[c].fill?a.addSeries(c,b[c],{fill:b[c].fill,legend:b[c].legendLabel}):a.addSeries(c,b[c]));this.config.isPreview||new n(a,"default");new p(a,"default");new B(a,"default",{duration:800,scale:1.5});a.render();this.chart=a;!this.config.isPreview&&e&&(k.set(this.legendContainer,"display","block"),this._createChartLegend(a));this.onChartCreated()},_createChartLegend:function(a){setTimeout(q.hitch(this,
function(){this.legend&&(this.legend.destroy(),this.legend=null);h.empty(this.legendNode);this.legend=new A({chart:a,horizontal:!0},h.create("div",{},this.legendNode))}),1500)},onChartCreated:function(){},onChartResize:function(){},_getFieldValues:function(a,c){var b,d="",e,f,g;a=a.replace(/(\n|\r|\r\n)/g,"\x3cbr\x3e");e=a.split("{");for(f=0;f<e.length;f++)if(0===f)d+=e[f];else if(-1!==e[f].indexOf("}"))for(b=e[f].split("}"),g=0;g<b.length;g++)if(0===g){if(c[b[g]]||0===c[b[g]])d+=c[b[g]]}else d=1===
g?d+b[g]:d+("}"+b[g]);else d+="{";return d}})});