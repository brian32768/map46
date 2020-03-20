// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dojo/_base/lang dojo/_base/html dojo/on dojo/_base/Color dijit/TooltipDialog dijit/popup dojox/widget/ColorPicker".split(" "),function(h,k,l,c,d,f,e,m,g,n){return h([k,l],{baseClass:"jimu-color-picker-btn",declaredClass:"jimu.dijit.ColorPickerButton",templateString:'\x3cdiv\x3e\x3cdiv class\x3d"color-node" data-dojo-attach-point\x3d"colorNode"\x3e\x3c/div\x3e\x3cdiv class\x3d"seperator"\x3e\x3c/div\x3e\x3cdiv class\x3d"action-node" data-dojo-attach-point\x3d"actionNode"\x3e\x3c/div\x3e\x3c/div\x3e',
_isTooltipDialogOpened:!1,color:null,showHex:!0,showHsv:!0,showRgb:!0,ensureMode:!1,postMixInProperties:function(){this.nls=window.jimuNls.common},postCreate:function(){this.inherited(arguments);this.color?this.color instanceof e||(this.color=new e(this.color)):this.color=new e("#ccc");d.setStyle(this.colorNode,"backgroundColor",this.color.toHex());this.colorNode.title=this.color.toHex();this.showLabel&&this._changeLabel(this.color);this._createTooltipDialog(this.domNode);this._hideTooltipDialog();
this.own(f(this.colorNode,"click",c.hitch(this,this._onNodeClick)));this.own(f(this.actionNode,"click",c.hitch(this,this._onNodeClick)));this.own(f(document.body,"click",c.hitch(this,function(a){this.isPartOfPopup(a.target||a.srcElement)||this._hideTooltipDialog()})))},_onNodeClick:function(a){a.stopPropagation();a.preventDefault();this._isTooltipDialogOpened?this._hideTooltipDialog():this._showTooltipDialog()},destroy:function(){g.close(this.tooltipDialog);this.picker.destroy();this.tooltipDialog.destroy();
this.inherited(arguments)},isPartOfPopup:function(a){var b=this.tooltipDialog.domNode;return a===b||d.isDescendant(a,b)},hideTooltipDialog:function(){this._hideTooltipDialog()},_showTooltipDialog:function(){g.open({parent:this.getParent(),popup:this.tooltipDialog,around:this.domNode});this._isTooltipDialogOpened=!0},_hideTooltipDialog:function(){g.close(this.tooltipDialog);this._isTooltipDialogOpened=!1},_createTooltipDialog:function(){var a=d.create("div");this.tooltipDialog=new m({content:a});d.addClass(this.tooltipDialog.domNode,
"jimu-color-picker-dialog");this.picker=new n({showHex:this.showHex,showRgb:this.showRgb,showHsv:this.showHsv,value:this.color.toHex(),onChange:c.hitch(this,function(a){this.ensureMode||(a=new e(a),this.setColor(a))})});this.picker.placeAt(a);this.picker.startup();if(this.ensureMode){var b=d.create("div",{"class":"jimu-btn jimu-btn-vacation jimu-float-trailing jimu-leading-margin1",title:this.nls.cancel,innerHTML:this.nls.cancel},a);this.own(f(b,"click",c.hitch(this,function(){this._hideTooltipDialog()})));
b=d.create("div",{"class":"jimu-btn jimu-float-trailing jimu-leading-margin1",title:this.nls.ok,innerHTML:this.nls.ok},a);this.own(f(b,"click",c.hitch(this,function(){var a=this.picker.get("value");this.setColor(new e(a));this._hideTooltipDialog()})));a=d.create("div",{"class":"jimu-btn jimu-float-trailing jimu-leading-margin1",title:this.nls.apply,innerHTML:this.nls.apply},a);this.own(f(a,"click",c.hitch(this,function(){var a=this.picker.get("value");this.setColor(new e(a))})))}},setColor:function(a){if(a instanceof
e){var b=this.color,c="";b&&(c=b.toHex());b=a.toHex();this.color=a;d.setStyle(this.colorNode,"backgroundColor",b);c!==b&&(this.picker.set("value",b),this.onChange(new e(b)))}},getColor:function(){return this.color},onChange:function(a){}})});