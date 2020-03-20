// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"widgets/IncidentAnalysis/setting/FeaturelayerSource":function(){define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin jimu/dijit/Message dojo/text!./FeaturelayerSource.html dojo/_base/lang dojo/_base/array dojox/form/CheckedMultiSelect dojo/on dojo/Evented".split(" "),function(m,n,d,g,h,f,k,l,p,q,r){return m([n,d,g,r],{templateString:f,baseClass:"imt-featurelayer-source",postCreate:function(){this.inherited(arguments);this._initUI()},_initUI:function(){var d=
this.map.itemInfo.itemData.operationalLayers,f=[];0===d.length&&new h({message:this.nls.missingLayerInWebMap});this.weatherLayersSelect=(new p({name:"selectLayers",multiple:!0,style:"width:100%;"})).placeAt(this.selectLayers);for(var g=0;g<d.length;g++){var c=l.filter(f,function(a){return a.label===d[g].title});null!==c&&0!==c.length||this.weatherLayersSelect.addOption({label:d[g].title,value:d[g].title})}if(this.weatherTabAdditionalLayers){var f=this.weatherTabAdditionalLayers.split(","),e=[];l.forEach(f,
k.hitch(this,function(a){e.push(k.trim(a))}));this.weatherLayersSelect.set("value",e)}this.own(q(this.btnOk,"click",k.hitch(this,function(){var a=this._getSelectedLayers();this.emit("ok",a)})));this.own(q(this.btnCancel,"click",k.hitch(this,function(){this.emit("cancel")})))},_getSelectedLayers:function(){var d="";l.forEach(this.weatherLayersSelect.options,k.hitch(this,function(f){f.selected&&(0<d.length&&(d+=","),d+=f.value)}));return d}})})},"dojox/form/CheckedMultiSelect":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/event dojo/dom-geometry dojo/dom-class dojo/dom-construct dojo/i18n dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/registry dijit/Menu dijit/MenuItem dijit/Tooltip dijit/form/_FormSelectWidget dijit/form/ComboButton dojo/text!dojox/form/resources/_CheckedMultiSelectMenuItem.html dojo/text!dojox/form/resources/_CheckedMultiSelectItem.html dojo/text!dojox/form/resources/CheckedMultiSelect.html dojo/i18n!dojox/form/nls/CheckedMultiSelect dijit/form/CheckBox".split(" "),
function(m,n,d,g,h,f,k,l,p,q,r,t,u,v,c,e,a,b,w,x,B){var y=m("dojox.form._CheckedMultiSelectItem",[p,q,r],{templateString:w,baseClass:"dojoxMultiSelectItem",option:null,parent:null,disabled:!1,readOnly:!1,postMixInProperties:function(){this._type=this.parent.multiple?{type:"checkbox",baseClass:"dijitCheckBox"}:{type:"radio",baseClass:"dijitRadio"};this.disabled||(this.disabled=this.option.disabled=this.option.disabled||!1);this.readOnly||(this.readOnly=this.option.readOnly=this.option.readOnly||!1);
this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this.labelNode.innerHTML=this.option.label},_changeBox:function(){this.get("disabled")||this.get("readOnly")||(this.parent.multiple?this.option.selected=this.checkBox.get("value")&&!0:this.parent.set("value",this.option.value),this.parent._updateSelection(),this.parent.focus())},_onClick:function(a){this.get("disabled")||this.get("readOnly")?g.stop(a):this.checkBox._onClick(a)},_updateBox:function(){this.checkBox.set("value",
this.option.selected)},_setDisabledAttr:function(a){this.disabled=a||this.option.disabled;this.checkBox.set("disabled",this.disabled);f.toggle(this.domNode,"dojoxMultiSelectDisabled",this.disabled)},_setReadOnlyAttr:function(a){this.checkBox.set("readOnly",a);this.readOnly=a}}),z=m("dojox.form._CheckedMultiSelectMenu",u,{multiple:!1,buildRendering:function(){this.inherited(arguments);var a=this.menuTableNode=this.domNode,b=this.domNode=k.create("div",{style:{overflowX:"hidden",overflowY:"scroll"}});
a.parentNode&&a.parentNode.replaceChild(b,a);f.remove(a,"dijitMenuTable");b.className=a.className+" dojoxCheckedMultiSelectMenu";a.className="dijitReset dijitMenuTable";a.setAttribute("role","listbox");b.setAttribute("role","presentation");b.appendChild(a)},resize:function(a){a&&(h.setMarginBox(this.domNode,a),"w"in a&&(this.menuTableNode.style.width="100%"))},onClose:function(){this.inherited(arguments);this.menuTableNode&&(this.menuTableNode.style.width="")},onItemClick:function(a,b){"undefined"==
typeof this.isShowingNow&&this._markActive();this.focusChild(a);if(a.disabled||a.readOnly)return!1;if(!this.multiple)this.onExecute();a.onClick(b)}}),A=m("dojox.form._CheckedMultiSelectMenuItem",v,{templateString:b,option:null,parent:null,iconClass:"",postMixInProperties:function(){this.parent.multiple?(this._iconClass="dojoxCheckedMultiSelectMenuCheckBoxItemIcon",this._type={type:"checkbox"}):(this._iconClass="",this._type={type:"hidden"});this.disabled=this.option.disabled;this.checked=this.option.selected;
this.label=this.option.label;this.readOnly=this.option.readOnly;this.inherited(arguments)},onChange:function(a){},_updateBox:function(){f.toggle(this.domNode,"dojoxCheckedMultiSelectMenuItemChecked",!!this.option.selected);this.domNode.setAttribute("aria-checked",this.option.selected);this.inputNode.checked=this.option.selected;this.parent.multiple||f.toggle(this.domNode,"dijitSelectSelectedOption",!!this.option.selected)},_onClick:function(a){this.disabled||this.readOnly||(this.parent.multiple?(this.option.selected=
!this.option.selected,this.parent.onChange(),this.onChange(this.option.selected)):this.option.selected||(d.forEach(this.parent.getChildren(),function(a){a.option.selected=!1}),this.option.selected=!0,this.parent.onChange(),this.onChange(this.option.selected)));this.inherited(arguments)}});return m("dojox.form.CheckedMultiSelect",e,{templateString:x,baseClass:"dojoxCheckedMultiSelect",required:!1,invalidMessage:"$_unset_$",_message:"",dropDown:!1,labelText:"",tooltipPosition:[],postMixInProperties:function(){this.inherited(arguments);
this._nlsResources=l.getLocalization("dojox.form","CheckedMultiSelect",this.lang);"$_unset_$"==this.invalidMessage&&(this.invalidMessage=this._nlsResources.invalidMessage)},_fillContent:function(){this.inherited(arguments);if(this.options.length&&!this.value&&this.srcNodeRef){var a=this.srcNodeRef.selectedIndex||0;this.value=this.options[0<=a?a:0].value}this.dropDown&&(f.toggle(this.selectNode,"dojoxCheckedMultiSelectHidden"),this.dropDownMenu=new z({id:this.id+"_menu",style:"display: none;",multiple:this.multiple,
onChange:n.hitch(this,"_updateSelection")}))},startup:function(){this.dropDown&&(this.dropDownButton=new a({label:this.labelText,dropDown:this.dropDownMenu,baseClass:"dojoxCheckedMultiSelectButton",maxHeight:this.maxHeight},this.comboButtonNode));this.inherited(arguments)},_onMouseDown:function(a){a.preventDefault()},validator:function(){return this.required?d.some(this.getOptions(),function(a){return a.selected&&null!=a.value&&0!=a.value.toString().length}):!0},validate:function(a){c.hide(this.domNode);
(a=this.isValid(a))||this.displayMessage(this.invalidMessage);return a},isValid:function(a){return this.validator()},getErrorMessage:function(a){return this.invalidMessage},displayMessage:function(a){c.hide(this.domNode);a&&c.show(a,this.domNode,this.tooltipPosition)},onAfterAddOptionItem:function(a,b){},_addOptionItem:function(a){var b;this.dropDown?(b=new A({option:a,parent:this.dropDownMenu}),this.dropDownMenu.addChild(b)):(b=new y({option:a,parent:this,disabled:this.disabled,readOnly:this.readOnly}),
this.wrapperDiv.appendChild(b.domNode));this.onAfterAddOptionItem(b,a)},_refreshState:function(){this.validate(this.focused)},onChange:function(a){this._refreshState()},reset:function(){this.inherited(arguments);c.hide(this.domNode)},_updateSelection:function(){this.inherited(arguments);this._handleOnChange(this.value);d.forEach(this._getChildren(),function(a){a._updateBox()});k.empty(this.containerNode);var a=this;d.forEach(this.value,function(b){b=k.create("option",{value:b,label:b,selected:"selected"});
k.place(b,a.containerNode)});if(this.dropDown&&this.dropDownButton){var b=0,c="";d.forEach(this.options,function(a){a.selected&&(b++,c=a.label)});this.dropDownButton.set("label",this.multiple?n.replace(this._nlsResources.multiSelectLabelText,{num:b}):c)}},_getChildren:function(){return this.dropDown?this.dropDownMenu.getChildren():d.map(this.wrapperDiv.childNodes,function(a){return t.byNode(a)})},invertSelection:function(a){this.multiple&&(d.forEach(this.options,function(a){a.selected=!a.selected}),
this._updateSelection())},_setDisabledAttr:function(a){this.inherited(arguments);this.dropDown&&this.dropDownButton.set("disabled",a);d.forEach(this._getChildren(),function(b){b&&b.set&&b.set("disabled",a)})},_setReadOnlyAttr:function(a){this.inherited(arguments);"readOnly"in this.attributeMap&&this[this.attributeMap.readOnly].setAttribute("readonly",a);this.readOnly=a;d.forEach(this._getChildren(),function(b){b&&b.set&&b.set("readOnly",a)})},uninitialize:function(){c.hide(this.domNode);d.forEach(this._getChildren(),
function(a){a.destroyRecursive()});this.inherited(arguments)}})})},"widgets/IncidentAnalysis/setting/FieldPicker":function(){define("dojo/_base/declare dijit/_WidgetsInTemplateMixin dijit/form/Select dojo/_base/array dojo/_base/lang dojo/_base/html dojo/dom-style dojo/on dojo/query jimu/BaseWidget jimu/dijit/Message esri/layers/FeatureLayer dojo/text!./FieldPicker.html dojo/Evented jimu/dijit/SimpleTable".split(" "),function(m,n,d,g,h,f,k,l,p,q,r,t,u,v){return m([q,n,v],{templateString:u,baseClass:"jimu-widget-IMT-setting",
advConfig:{},fieldsList:null,callerLayer:null,callerTab:null,callerOpLayers:null,layerList:null,constructor:function(c){this.map=c.map},postCreate:function(){this.inherited(arguments);this.startup()},startup:function(){this.operationsList=[{value:"sum",label:this.nls.sum},{value:"avg",label:this.nls.avg},{value:"min",label:this.nls.min},{value:"max",label:this.nls.max}];var c="";"summary"===this.callerTab.type?(k.set(this.chk_summary,"display","block"),c="Type"):k.set(this.chk_summary,"display","none");
var e=p("th",this.domNode);1<e.length&&(e[1].innerHTML=c);this.own(l(this.btnCancel,"click",h.hitch(this,function(){this.emit("cancel")})));this.own(l(this.btnOk,"click",h.hitch(this,function(){this.updateAdvConfig();this.emit("ok",this.advConfig)})));this.layerTables=[];this.summaryLayers=[];this.advConfig={};this._getAllValidLayers();this.own(l(this.btnAddField,"click",h.hitch(this,this._addTabRow)))},_updateGeomOptions:function(c){c&&(this.chk_area.set("disabled","esriGeometryPolygon"!==c),this.chk_length.set("disabled",
"esriGeometryPolyline"!==c))},_getAllValidLayers:function(){g.forEach(this.callerOpLayers,h.hitch(this,function(c){0<c.newSubLayers.length?this._recurseOpLayers(c.newSubLayers):c.id===this.callerLayer&&(this.layerList=c)}));if(this.layerList.layerObject.empty){var c=new t(this.layerList.layerObject.url);l(c,"load",h.hitch(this,function(){this._completeMapLayers(c)}))}else this._completeMapLayers(this.layerList)},_recurseOpLayers:function(c){g.forEach(c,h.hitch(this,function(c){0<c.newSubLayers.length?
this._recurseOpLayers(c.newSubLayers):c.id===this.callerLayer&&(this.layerList=c)}))},_completeMapLayers:function(c){if(c){console.log(c);var d,a;"undefined"===typeof c.layerObject?(a=c.geometryType,this.objectIdField=c.objectIdField,d={url:c.url,fields:[]},c=h.clone(c.fields)):(a=c.layerObject.geometryType,this.objectIdField=c.layerObject.objectIdField,d={url:c.layerObject.url,fields:[]},c=h.clone(c.layerObject.fields));this.advConfig=d;this._updateGeomOptions(a);this.advConfig.url&&(this._setFields(c),
this.callerTab.advConfig&&this.callerTab.advConfig.fields&&0<this.callerTab.advConfig.fields.length&&g.forEach(this.callerTab.advConfig.fields,h.hitch(this,function(a){"count"===a.type?this.chk_count.set("value",!0):"area"===a.type?this.chk_area.set("value",!0):"length"===a.type?this.chk_length.set("value",!0):(console.log(a.type,a.expression),this._populateTabTableRow(a.type,a.expression))})))}},_setFields:function(c){var d=["esriFieldTypeInteger","esriFieldTypeSmallInteger","esriFieldTypeDouble"];
"summary"!==this.callerTab.type&&(d.push("esriFieldTypeString"),d.push("esriFieldTypeDate"));var a=[];g.forEach(c,h.hitch(this,function(b){-1<d.indexOf(b.type)&&a.push({label:b.alias,value:b.name})}));1>a.length&&k.set(this.btnAddField,"display","none");this.fieldsList=h.clone(a)},_populateTabTableRow:function(c,d){var a=this.fieldTable.addRow({});a.success&&a.tr&&(a=a.tr,this._addTabFields(a),this._addTabTypes(a),a.selectFields.set("value",d),"summary"===this.callerTab.type&&a.selectTypes.set("value",
c))},_addTabRow:function(){if("summary"!==this.callerTab.type&&3<=this.fieldTable.getRows().length)new r({message:this.nls.max_records});else{var c=this.fieldTable.addRow({});c.success&&c.tr&&(c=c.tr,this._addTabFields(c),this._addTabTypes(c))}},_addTabFields:function(c){var e=h.clone(this.fieldsList),a=p(".simple-table-cell",c)[0];a&&(f.setStyle(a,"verticalAlign","middle"),e=new d({style:{width:"100%",height:"30px"},options:e}),e.placeAt(a),e.startup(),c.selectFields=e)},_addTabTypes:function(c){if("summary"===
this.callerTab.type){var e=h.clone(this.operationsList),a=p(".simple-table-cell",c)[1];a&&(f.setStyle(a,"verticalAlign","middle"),e=new d({style:{width:"100%",height:"30px"},options:e}),e.placeAt(a),e.startup(),c.selectTypes=e)}},updateAdvConfig:function(){var c=this.fieldTable.getRows(),d=[];"summary"!==this.callerTab.type?g.forEach(c,function(a){d.push({value:0,type:"out",expression:a.selectFields.value,label:a.selectFields.textDirNode.innerText})}):(this.chk_count.checked&&d.push({value:0,type:"count",
expression:this.objectIdField,label:this.nls.count}),this.chk_area.checked&&d.push({value:0,type:"area",expression:this.objectIdField,label:this.nls.area}),this.chk_length.checked&&d.push({value:0,type:"length",expression:this.objectIdField,label:this.nls.length}),g.forEach(c,h.hitch(this,function(a){d.push({value:0,type:a.selectTypes.value,expression:a.selectFields.value,label:a.selectFields.textDirNode.innerText})})));0<d.length?this.advConfig.fields=d:this.advConfig=null;console.log("ADVCONFIG",
this.advConfig)},destroy:function(){this.advConfig=null}})})},"widgets/IncidentAnalysis/setting/_build-generate_module":function(){define(["dojo/text!./Setting.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:widgets/IncidentAnalysis/setting/FeaturelayerSource.html":'\x3cdiv\x3e\r\n  \x3cdiv\x3e\r\n    \x3cspan class\x3d"label"\x3e${nls.selectLayers}: \x3c/span\x3e\r\n    \x3cdiv class\x3d"layerSelect" data-dojo-attach-point\x3d"selectLayers"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"footer"\x3e\r\n      \x3cdiv class\x3d"jimu-btn ok" data-dojo-attach-point\x3d"btnOk"\x3e${nls.ok}\x3c/div\x3e\r\n      \x3cdiv class\x3d"jimu-btn cancel" data-dojo-attach-point\x3d"btnCancel"\x3e${nls.cancel}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:dojox/form/resources/_CheckedMultiSelectMenuItem.html":'\x3ctr class\x3d"dijitReset dijitMenuItem" dojoAttachPoint\x3d"focusNode" role\x3d"menuitemcheckbox" tabIndex\x3d"-1"\r\n\tdojoAttachEvent\x3d"ondijitclick:_onClick"\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuItemIconCell" role\x3d"presentation"\r\n\t\t\x3e\x3cdiv src\x3d"${_blankGif}" alt\x3d"" class\x3d"dijitMenuItemIcon ${_iconClass}" dojoAttachPoint\x3d"iconNode"\r\n\t\t\t\x3e\x3cinput class\x3d"dojoxCheckedMultiSelectCheckBoxInput" dojoAttachPoint\x3d"inputNode" type\x3d"${_type.type}"\r\n\t\t/\x3e\x3c/div\x3e\x3c/td\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuItemLabel" colspan\x3d"2" dojoAttachPoint\x3d"containerNode,labelNode"\x3e\x3c/td\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuItemAccelKey" style\x3d"display: none" dojoAttachPoint\x3d"accelKeyNode"\x3e\x3c/td\r\n\t\x3e\x3ctd class\x3d"dijitReset dijitMenuArrowCell" role\x3d"presentation"\x3e\x26nbsp;\x3c/td\r\n\x3e\x3c/tr\x3e',
"url:dojox/form/resources/_CheckedMultiSelectItem.html":'\x3cdiv class\x3d"dijitReset ${baseClass}"\r\n\t\x3e\x3cinput class\x3d"${baseClass}Box" data-dojo-type\x3d"dijit.form.CheckBox" data-dojo-attach-point\x3d"checkBox" \r\n\t\tdata-dojo-attach-event\x3d"_onClick:_changeBox" type\x3d"${_type.type}" data-dojo-props\x3d\'disabled:${disabled}, readOnly:${readOnly}\' baseClass\x3d"${_type.baseClass}"\r\n\t/\x3e\x3cdiv class\x3d"dijitInline ${baseClass}Label" data-dojo-attach-point\x3d"labelNode" data-dojo-attach-event\x3d"onclick:_onClick"\x3e\x3c/div\r\n\x3e\x3c/div\x3e\r\n',
"url:dojox/form/resources/CheckedMultiSelect.html":'\x3cdiv class\x3d"dijit dijitReset dijitInline dijitLeft" id\x3d"widget_${id}"\r\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"comboButtonNode"\r\n\t\x3e\x3c/div\r\n\t\x3e\x3cdiv data-dojo-attach-point\x3d"selectNode" class\x3d"dijit dijitReset dijitInline ${baseClass}Wrapper" data-dojo-attach-event\x3d"onmousedown:_onMouseDown,onclick:focus"\r\n\t\t\x3e\x3cselect class\x3d"${baseClass}Select dojoxCheckedMultiSelectHidden" multiple\x3d"true" data-dojo-attach-point\x3d"containerNode,focusNode"\x3e\x3c/select\r\n\t\t\x3e\x3cdiv data-dojo-attach-point\x3d"wrapperDiv"\x3e\x3c/div\r\n\t\x3e\x3c/div\r\n\x3e\x3c/div\x3e',
"url:widgets/IncidentAnalysis/setting/FieldPicker.html":'\x3cdiv style\x3d"height:100%;width:100%;overflow:auto"\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"tableArea" class\x3d"tableArea"\x3e\r\n    \x3cdiv class\x3d"btn-add-section enable" data-dojo-attach-point\x3d"btnAddField"\x3e\r\n        \x3cspan class\x3d"btn-add-icon"\x3e\x3c/span\x3e\r\n        \x3cspan class\x3d"btn-add-label" id\x3d"divLayerTitle" data-dojo-attach-point\x3d"divLayerTitle"\x3e${nls.addField}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"fieldTable" data-dojo-type\x3d"jimu/dijit/SimpleTable" data-dojo-props\x3d\'fields:[{name:"layer",title:"Field","class":"label",type:"empty",width:"400px"},{name:"type",title:"Type","class":"sumlabel",type:"empty"},{name:"actions",title:"Actions","class":"actions",type:"actions",actions:["up","down","delete"],width:"150px"}]\'\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:20px" data-dojo-attach-point\x3d"chk_summary"\x3e\r\n    \x3cdiv class\x3d"col-1-3" data-dojo-attach-point\x3d"div_chkCount"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_count" title\x3d"${nls.count_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.count_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"col-1-3"  data-dojo-attach-point\x3d"div_chkArea"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_area" title\x3d"${nls.area_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.area_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"col-1-3"  data-dojo-attach-point\x3d"div_chkLength"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_length" title\x3d"${nls.length_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.length_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"footer"\x3e\r\n    \x3cdiv class\x3d"jimu-btn ok" data-dojo-attach-point\x3d"btnOk"\x3e${nls.ok}\x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-btn cancel" data-dojo-attach-point\x3d"btnCancel"\x3e${nls.cancel}\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/IncidentAnalysis/setting/Setting.html":'\x3cdiv style\x3d"width:100%;height:100%;"\x3e\r\n  \x3c!-- Tabs --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row"\x3e\r\n    \x3cdiv class\x3d"jimu-r-row"\x3e\r\n      \x3cdiv class\x3d"label" style\x3d"font-weight: bold;"\x3e\r\n        ${nls.tabs_section_Label}\r\n      \x3c/div\x3e\r\n      \x3chr/\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row"\x3e\r\n      \x3cdiv class\x3d"label"\x3e${nls.optional_lbl}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:10px"\x3e\r\n      \x3cdiv class\x3d"col-1-2"\x3e\r\n          \x3cspan class\x3d"label"\x3e${nls.incident_lbl}: \x3c/span\x3e\r\n          \x3cinput data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"incident_lbl" /\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-2"\x3e\r\n          \x3cspan class\x3d"label"\x3e${nls.locate_lbl}: \x3c/span\x3e\r\n          \x3cinput data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"locate_lbl" /\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"btn-add-section enable" data-dojo-attach-point\x3d"btnAddTab"\x3e\r\n      \x3cspan class\x3d"btn-add-icon"\x3e\x3c/span\x3e\r\n      \x3cspan class\x3d"btn-add-label"\x3e${nls.addTab}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"tabTable" data-dojo-type\x3d"jimu/dijit/SimpleTable" data-dojo-props\x3d\'fields:[{name:"layer",title:"${nls.layerName}","class":"label",type:"empty",width:"400px"},{name:"type",title:"${nls.layerType}","class":"label",type:"empty"},{name:"label",title:"${nls.layerLabel}","class":"label",type:"empty"},{name:"actions",title:"${nls.actions}","class":"actions",type:"actions",actions:["up","down","edit","delete"],width:"100px"}]\'\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3c!-- General Settings: Distances --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row"\x3e\r\n    \x3cdiv class\x3d"label" style\x3d"padding-top:15px;font-weight: bold;"\x3e\r\n      ${nls.general_setting_Label}\r\n    \x3c/div\x3e\r\n    \x3chr /\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:15px"\x3e\r\n      \x3cdiv class\x3d"col-1-4"\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.units_text_lbl}: \x3c/span\x3e\r\n        \x3cselect style\x3d"margin-left: 10px;" data-dojo-attach-point\x3d"selectUnits" data-dojo-type\x3d"dijit/form/Select"\x3e\r\n          \x3coption value\x3d"miles" selected\x3d"selected"\x3e${nls.miles}\x3c/option\x3e\r\n          \x3coption value\x3d"kilometers"\x3e${nls.kilometers}\x3c/option\x3e\r\n          \x3coption value\x3d"feet"\x3e${nls.feet}\x3c/option\x3e\r\n          \x3coption value\x3d"meters"\x3e${nls.meters}\x3c/option\x3e\r\n          \x3coption value\x3d"yards"\x3e${nls.yards}\x3c/option\x3e\r\n          \x3coption value\x3d"nauticalMiles"\x3e${nls.nauticalMiles}\x3c/option\x3e\r\n        \x3c/select\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-4"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_routing" title\x3d"${nls.routing_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.routing_checkBox}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-2-4"\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.maximum_distance_lbl}: \x3c/span\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" style\x3d"width:60px" data-dojo-attach-point\x3d"txt_maximumDistance" title\x3d"${nls.maximum_distance_lbl}" /\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:15px"\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cspan class\x3d"label"\x3e${nls.buffer_text_lbl}: \x3c/span\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cspan class\x3d"label"\x3e${nls.buffer_min_lbl}: \x3c/span\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cspan class\x3d"label"\x3e${nls.buffer_max_lbl}: \x3c/span\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:0px"\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cinput data-dojo-type\x3d"dijit/form/TextBox" data-dojo-attach-point\x3d"buffer_lbl" /\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-attach-point\x3d"buffer_min" /\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"col-1-3"\x3e\r\n            \x3cinput data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-attach-point\x3d"buffer_max" /\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cbr/\x3e\r\n  \x3c!-- Weather Settings --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row" data-dojo-attach-point\x3d"div_special_tab"\x3e\r\n    \x3cdiv class\x3d"label" style\x3d"padding-top:15px;font-weight: bold;"\x3e\r\n      ${nls.weather_Label}\r\n    \x3c/div\x3e\r\n    \x3chr /\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"padding-top:15px"\x3e\r\n      \x3cdiv class\x3d"col-1-3"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_weather" title\x3d"${nls.weather_checkBox}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.weather_checkBox}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-3"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_celsius" title\x3d"${nls.weather_celsius}" /\x3e\r\n        \x3cspan class\x3d"label"\x3e${nls.weather_celsius}\x3c/span\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-3"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"btnSource" data-dojo-attach-event\x3d"onclick:_onBtnSelectLayersClicked" class\x3d\'jimu-btn\'\x3e\r\n          ${nls.selectLayers}\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv style\x3d"padding-top:15px; padding-left:15px"\x3e\r\n      \x3cspan class\x3d"label"\x3e${nls.currentlySelectedLayer}:\x3c/span\x3e\r\n      \x3cspan class\x3d"label" data-dojo-attach-point\x3d"currentlySelectedLayer"\x3e\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3c!-- Layer Visibility Settings --\x3e\r\n  \x3cdiv class\x3d"jimu-r-row"\x3e\r\n    \x3cdiv style\x3d"padding-top:15px; padding-bottom: 10px"\x3e\r\n      \x3cinput data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-attach-point\x3d"chk_disable" title\x3d"${nls.disable_checkBox}" /\x3e\r\n      \x3cspan class\x3d"label"\x3e${nls.disable_checkBox}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:widgets/IncidentAnalysis/setting/css/style.css":'.jimu-widget-IMT-setting .btn-add-section {display: inline-block; overflow: hidden; height: 24px; margin-left: 1px; margin-bottom: 3px; cursor: pointer; font-size: 13px; color: #538ec8; margin-top: 8px;}.jimu-widget-IMT-setting .btn-add-section .btn-add-icon {height: 100%; width: 14px; background-repeat: no-repeat; background-position: center center; background-image: url(images/add.png); display: inline-block; vertical-align: top;}.jimu-widget-IMT-setting .btn-add-section .btn-add-label {height: 100%; line-height: 24px; vertical-align: middle; margin-left: 7px; text-decoration: underline; display: inline-block; vertical-align: top;}.claro .dojoxCheckedMultiSelect .dojoxCheckedMultiSelectWrapper {border: none !important; background-color: transparent !important;}.footer {text-align: right;}.removeButtonWithIcon {background-image: url("../images/filterdialog_icons.png"); background-repeat: no-repeat; background-position: -30px 0; width: 15px; height: 15px; margin: 0px 0px; display: block;}.upButton {background-image: url("../../../../jimu.js/css/images/up_enabled.png"); background-repeat: no-repeat; width: 15px; height: 15px; margin: 0px 0px; display: block;}.downButton {background-image: url("../../../../jimu.js/css/images/down_enabled.png"); background-repeat: no-repeat; width: 15px; height: 15px; margin: 0px 0px; display: block;}.colorButton {width: 15px; height: 15px; margin: 0px 0px; display: block; background-color: #00ff00;}.footer {padding-top: 5px; width: 100%; height: 30px;}.dojoxCheckedMultiSelect .dojoxCheckedMultiSelectWrapper {height: 400px;}.dojoxMultiSelectItem {padding-bottom: 5px; padding-top: 5px;}.dijitSelectLabel {text-align:left; text-overflow: ellipsis; overflow: hidden; max-width:300px;}',
"*now":function(m){m(['dojo/i18n!*preload*widgets/IncidentAnalysis/setting/nls/Setting*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/dom-style dojo/on dojo/query dijit/form/Select dijit/form/ValidationTextBox dijit/_WidgetsInTemplateMixin ./FeaturelayerSource ./FieldPicker jimu/BaseWidgetSetting jimu/dijit/Message jimu/dijit/Popup jimu/LayerInfos/LayerInfos jimu/dijit/SimpleTable".split(" "),function(m,n,d,g,h,f,k,l,p,q,r,t,u,v,c,e){return m([u,q],{baseClass:"jimu-widget-IMT-setting",opLayers:[],curRow:null,postCreate:function(){this.inherited(arguments);
this._getAllLayers();this.own(f(this.btnAddTab,"click",d.hitch(this,this._addTabRow)));this.own(f(this.tabTable,"actions-edit",d.hitch(this,function(a){this._onEditLayerClicked(a)})))},startup:function(){this.inherited(arguments)},setConfig:function(a){this.config=a;this.config.distanceUnits&&this.selectUnits.set("value",this.config.distanceUnits);this.config.maxDistance&&this.txt_maximumDistance.set("value",this.config.maxDistance);this.config.enableRouting&&this.chk_routing.set("value",!0);this.config.incidentLabel&&
this.incident_lbl.set("value",this.config.incidentLabel);this.config.locateLabel&&this.locate_lbl.set("value",this.config.locateLabel);this.tabTable.clear();for(a=0;a<this.config.tabs.length;a++){var b=this.config.tabs[a];b.type===this.config.special_layer.value?(this.chk_weather.set("value",!0),this.weatherTabAdditionalLayers=b.layers,this.currentlySelectedLayer.innerHTML=this.weatherTabAdditionalLayers):this._populateTabTableRow(b)}this.config.celsius&&this.chk_celsius.set("value",!0);this.buffer_lbl.set("value",
this.config.bufferLabel?this.config.bufferLabel:this.nls.buffer_lbl);this.buffer_max.set("value",this.config.bufferRange.maximum);this.buffer_min.set("value",this.config.bufferRange.minimum);this.config.disableLayerManagement&&this.chk_disable.set("value",!0)},getConfig:function(){this.config.distanceUnits=this.selectUnits.value;this.txt_maximumDistance.value&&(this.config.maxDistance=this.txt_maximumDistance.value);this.config.enableRouting=this.chk_routing.checked?!0:!1;this.config.incidentLabel=
this.incident_lbl.value;this.config.locateLabel=this.locate_lbl.value;var a=[],b={};this.chk_weather.checked&&(b.label=this.config.special_layer.label,b.type=this.config.special_layer.value,b.layers=this.weatherTabAdditionalLayers,b.url=this.config.special_layer.url,a.push(b));this.config.celsius=this.chk_celsius.checked?!0:!1;var c=this.tabTable.getRows();n.forEach(c,d.hitch(this,function(c){var d=c.selectLayers,w=c.selectTypes,f=c.labelText;b={};b.label=f.value;b.type=w.value;b.layers=d.value;b.title=
d.attr("displayedValue");c.tabInfo&&c.tabInfo.advConfig&&(b.advConfig=c.tabInfo.advConfig);a.push(b)}));this.config.tabs=a;this.config.bufferLabel=this.buffer_lbl.value;this.config.bufferRange.maximum=this.buffer_max.value;this.config.bufferRange.minimum=this.buffer_min.value;this.config.disableLayerManagement=this.chk_disable.checked?!0:!1;return this.config},_getAllLayers:function(){this.map.itemId&&e.getInstance(this.map,this.map.itemInfo).then(d.hitch(this,function(a){this.opLayers=a;this._setLayers();
this._setTypes();this.setConfig(this.config)}))},_setLayers:function(){var a=[];n.forEach(this.opLayers._layerInfos,d.hitch(this,function(b){0<b.newSubLayers.length?this._recurseOpLayers(b.newSubLayers,a):this._validateLayer(b)&&a.push({label:b.title,value:b.id})}));0===a.length?(h.set(this.btnAddTab,"display","none"),new v({message:this.nls.missingLayerInWebMap})):this.layer_options=d.clone(a)},_recurseOpLayers:function(a,b){n.forEach(a,d.hitch(this,function(a){0<a.newSubLayers.length?this._recurseOpLayers(a.newSubLayers,
b):this._validateLayer(a)&&b.push({label:a.title,value:a.id})}))},_validateLayer:function(a){var b=null;a.layerObject&&a.layerObject.url&&(a=a.layerObject.url,-1<a.indexOf("MapServer")||-1<a.indexOf("FeatureServer"))&&(b=a);return b},_setTypes:function(){this.analysis_options=[{value:"closest",label:this.nls.closest},{value:"proximity",label:this.nls.proximity},{value:"summary",label:this.nls.summary}]},_populateTabTableRow:function(a){var b=this.tabTable.addRow({});b.success&&b.tr&&(b=b.tr,this._addTabLayers(b),
this._addTabTypes(b),this._addTabLabel(b),b.selectLayers.set("value",a.layers),b.selectTypes.set("value",a.type),b.labelText.set("value",a.label),b.tabInfo=a)},_addTabRow:function(){var a=this.tabTable.addRow({});a.success&&a.tr&&(a=a.tr,this._addTabLayers(a),this._addTabTypes(a),this._addTabLabel(a))},_addTabLayers:function(a){var b=d.clone(this.layer_options),c=k(".simple-table-cell",a)[0];c&&(g.setStyle(c,"verticalAlign","middle"),b=new l({style:{width:"100%",height:"30px"},options:b}),b.placeAt(c),
b.startup(),a.selectLayers=b)},_addTabTypes:function(a){var b=d.clone(this.analysis_options),c=k(".simple-table-cell",a)[1];c&&(g.setStyle(c,"verticalAlign","middle"),b=new l({style:{width:"100%",height:"30px"},options:b}),b.placeAt(c),b.startup(),a.selectTypes=b)},_addTabLabel:function(a){var b=k(".simple-table-cell",a)[2];g.setStyle(b,"verticalAlign","middle");var c=new p({style:{width:"100%",height:"30px"}});c.placeAt(b);c.startup();a.labelText=c},_onBtnSelectLayersClicked:function(){var a=new r({nls:this.nls,
map:this.map,config:this.config,weatherTabAdditionalLayers:this.weatherTabAdditionalLayers,appConfig:this.appConfig}),b=new c({width:830,height:560,content:a,titleLabel:this.nls.selectLayers});this.own(f(a,"ok",d.hitch(this,function(c){this.weatherTabAdditionalLayers=c;this.currentlySelectedLayer.innerHTML=this.weatherTabAdditionalLayers;a.destroy();a=null;b.close()})));this.own(f(a,"cancel",d.hitch(this,function(){a.destroy();a=null;b.close()})))},_onEditLayerClicked:function(a){this.curRow=a;var b=
a.tabInfo;b||(b={},b.label=a.labelText.value,b.type=a.selectTypes.value,b.layers=a.selectLayers.value,b.advConfig={},a.tabInfo=b);if(b.type!==a.selectTypes.value||b.layers!==a.selectLayers.value)b.type=a.selectTypes.value,b.layers=a.selectLayers.value,b.advConfig={};var e=new t({nls:this.nls,callerLayer:a.selectLayers.value,callerTab:b,callerOpLayers:this.opLayers._layerInfos}),g=new c({width:830,height:560,content:e,titleLabel:this.nls.selectFields+": "+a.selectLayers.value});this.own(f(e,"ok",d.hitch(this,
function(a){this.curRow.tabInfo.advConfig=a;this.curRow=null;e.destroy();e=null;g.close()})));this.own(f(e,"cancel",d.hitch(this,function(){this.curRow=null;e.destroy();e=null;g.close()})))}})});