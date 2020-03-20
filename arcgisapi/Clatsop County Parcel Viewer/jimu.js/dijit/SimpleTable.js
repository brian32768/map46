// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dijit/_WidgetBase dijit/_TemplatedMixin dojo/Evented dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/query dijit/registry jimu/utils jimu/dijit/CheckBox".split(" "),function(r,t,u,v,g,d,h,m,k,n,p,q){return r([t,u,v],{baseClass:"jimu-simple-table",declaredClass:"jimu.dijit.SimpleTable",templateString:'\x3cdiv\x3e\x3cdiv class\x3d"head-section" data-dojo-attach-point\x3d"headDiv"\x3e\x3cdiv class\x3d"table-div" data-dojo-attach-point\x3d"headTableDiv"\x3e\x3ctable class\x3d"table" cellspacing\x3d"0" data-dojo-attach-point\x3d"tableInHeadSection"\x3e\x3ccolgroup data-dojo-attach-point\x3d"headColgroup"\x3e\x3c/colgroup\x3e\x3cthead class\x3d"simple-table-thead simple-table-title"  data-dojo-attach-point\x3d"thead"\x3e\x3c/thead\x3e\x3c/table\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"body-section" data-dojo-attach-point\x3d"bodyDiv"\x3e\x3cdiv class\x3d"table-div" data-dojo-attach-point\x3d"bodyTableDiv"\x3e\x3ctable class\x3d"table" cellspacing\x3d"0"data-dojo-attach-point\x3d"tableInBodySection"\x3e\x3ccolgroup data-dojo-attach-point\x3d"bodyColgroup"\x3e\x3c/colgroup\x3e\x3ctbody class\x3d"simple-table-tbody" data-dojo-attach-point\x3d"tbody"\x3e\x3c/tbody\x3e\x3c/table\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e',
_name:null,_rowIndex:0,_rowHeight:30,_headHeight:36,REPEATING_ERROR:"REPEATING_ERROR",_classSimpleTableRow:"simple-table-row",_classFirstSimpleTableRow:"first-simple-table-row",_classLastSimpleTableRow:"last-simple-table-row",_classJimuStateDisabled:"jimu-state-disabled",_classRowUpDiv:"row-up-div",_classRowDownDiv:"row-down-div",_classVerticalScroll:"vertical-scroll",autoHeight:!0,selectable:!1,fields:null,postMixInProperties:function(){this.nls=window.jimuNls.simpleTable},postCreate:function(){this.inherited(arguments);
this._initSelf()},startup:function(){this.inherited(arguments);this.updateUI()},_initSelf:function(){this.own(p.bindClickAndDblclickEvents(this.tableInBodySection,g.hitch(this,function(a){if(a=p.getAncestorDom(a.target||a.srcElement,function(a){return d.hasClass(a,"simple-table-row")&&d.hasClass(a,"not-empty")},this.tbody))this.selectRow(a),this._onClickRow(a)}),g.hitch(this,function(a){if(a=p.getAncestorDom(a.target||a.srcElement,function(a){return d.hasClass(a,"simple-table-row")&&d.hasClass(a,
"not-empty")},this.tbody))this.selectRow(a),this._onDblClickRow(a)})));var a=Math.random().toString();this._name="jimu_table_"+a.slice(2,a.length);if(this.fields&&0<this.fields.length){var b=d.create("tr",{},this.thead);h.forEach(this.fields,g.hitch(this,function(a){var c="auto";"actions"===a.type&&(a.name="actions");a.hidden?c=1:void 0!==a.width&&null!==a.width?c=a.width:"actions"!==a.type||a.name||(a.width=this._calculateActionsWidth(a)+20,c=a.width);d.create("col",{width:c},this.headColgroup);
d.create("col",{width:c},this.bodyColgroup);c=d.create("th",{innerHTML:a.title,title:a.title},b);if("checkbox"===a.type){c.innerHTML="";var f=new q({label:a.title}),l=k(".checkbox",f.domNode)[0];l&&(l.style.marginTop="10px");this.own(m(f.domNode,"click",g.hitch(this,function(){f.getValue()?this._checkAllTdCheckBoxes(a.name):this._uncheckAllTdCheckBoxes(a.name)})));f.placeAt(c)}d.addClass(c,"simple-table-field");a.hidden&&d.addClass(c,"hidden-column");a["class"]&&d.addClass(c,a["class"]);d.addClass(c,
a.name)}))}else this.fields=null},_getThCheckBox:function(a){var b=null;a=k(".simple-table-field."+a+" .jimu-checkbox",this.thead)[0];return b=n.byNode(a)},_getAllEnabledTdCheckBoxes:function(a){a=k(".simple-table-cell."+a+" .jimu-checkbox",this.tbody);a=h.map(a,function(a){return n.byNode(a)});return a=h.filter(a,function(a){return a.getStatus()})},_checkAllTdCheckBoxes:function(a){a=this._getAllEnabledTdCheckBoxes(a);h.forEach(a,function(a){a.getValue()||a.setValue(!0)})},_uncheckAllTdCheckBoxes:function(a){a=
this._getAllEnabledTdCheckBoxes(a);h.forEach(a,function(a){a.getValue()&&a.setValue(!1)})},_delaySyncThCheckBoxStatusWithAllTdCheckBoxes:function(a){setTimeout(g.hitch(this,function(){this._syncThCheckBoxStatusWithAllTdCheckBoxes(a)}),100)},_syncThCheckBoxStatusWithAllTdCheckBoxes:function(a){var b=this._getAllEnabledTdCheckBoxes(a),b=h.filter(b,g.hitch(this,function(a){return a.getStatus()}));0!==b.length&&(a=this._getThCheckBox(a),h.every(b,function(a){return a.getValue()})?a.getValue()||a.setValue(!0):
a.getValue()&&a.setValue(!1))},clear:function(){var a=this._getNotEmptyRows(),b=h.map(a,g.hitch(this,function(a){return this.getRowData(a)}));d.empty(this.tbody);h.forEach(a,g.hitch(this,function(a,d){this._onDeleteRow(a,b[d])}));this.updateUI();this._rowIndex=0;this._onClearRows(a)},addRows:function(a){var b=[];this.fields&&a&&0<a.length&&h.forEach(a,g.hitch(this,function(a){b.push(this.addRow(a,-1,!0))}));this.updateUI();return b},addRow:function(a,b,c){this._rowIndex++;var e={success:!1,tr:null,
errorCode:null,errorMessage:null,repeatFields:null};if(!this.fields||"object"!==typeof a)return e;var f=h.filter(this.fields,g.hitch(this,function(a){return"text"===a.type&&!0===a.unique})),f=h.filter(f,g.hitch(this,function(b){return 0<this.getRowDataArrayByFieldValue(b.name,a[b.name]).length}));if(0<f.length)return e.errorCode=this.REPEATING_ERROR,e.errorMessage="repeating data",e.repeatFields=f,e;var l=d.create("tr",{"class":"simple-table-row not-empty"},this.tbody);d.setAttr(l,"rowId","row"+this._rowIndex);
h.forEach(this.fields,g.hitch(this,function(b){var c=a[b.name],e=b.type,f=null;"actions"===e?f=this._createActionsTd(l,b):("text"===e?f=this._createTextTd(l,b,c):"radio"===e?f=this._createRadioTd(l,b,c):"checkbox"===e?f=this._createCheckboxTd(l,b,c):"empty"===e?f=this._createEmptyTd(l,b):"extension"===e&&(f=this._createExtensionTd(l,b,c)),b.hidden&&d.addClass(f,"hidden-column"))}));c||(this.updateUI(),c=this.getRows(),"number"===typeof b&&0<=b&&b<c.length&&d.place(l,c[b],"before"));e.success=!0;e.tr=
l;e.errorMessage=null;this._onAddRow(l);return e},deleteRow:function(a){if(a){var b=this.getRowData(a);d.destroy(a);this.updateUI();this._onDeleteRow(a,b)}},selectRow:function(a){this.selectable&&(k(".simple-table-row",this.tbody).removeClass("jimu-state-active"),d.addClass(a,"jimu-state-active"),this._onSelectRow(a))},updateUI:function(){this._updateRowClassName();this._updateHeight();d.removeClass(this.domNode,this._classVerticalScroll);0<this.bodyDiv.clientHeight&&this.bodyDiv.clientHeight<this.bodyDiv.scrollHeight&&
d.addClass(this.domNode,this._classVerticalScroll);h.forEach(this.fields,g.hitch(this,function(a){"checkbox"===a.type&&this._delaySyncThCheckBoxStatusWithAllTdCheckBoxes(a.name)}))},_updateHeadTableWidth:function(){if(this.domNode){var a=d.getContentBox(this.tableInBodySection).w,b="100%";"number"===typeof a&&0<a&&(b=a+"px");d.setStyle(this.tableInHeadSection,"width",b)}},_updateHeight:function(){if(this.autoHeight){var a=this.getRows();d.setStyle(this.domNode,"height",this._headHeight+this._rowHeight*
(0<a.length?a.length:1)+1+"px")}},_updateRowClassName:function(){var a=k("."+this._classFirstSimpleTableRow,this.tbody)[0];a&&(a=k("."+this._classRowUpDiv,a)[0])&&d.removeClass(a,this._classJimuStateDisabled);(a=k("."+this._classLastSimpleTableRow,this.tbody)[0])&&(a=k("."+this._classRowDownDiv,a)[0])&&d.removeClass(a,this._classJimuStateDisabled);a=k("."+this._classSimpleTableRow,this.tbody);a.removeClass("odd");a.removeClass("even");a.removeClass(this._classFirstSimpleTableRow);a.removeClass(this._classLastSimpleTableRow);
h.forEach(a,g.hitch(this,function(a,b){0===b%2?d.addClass(a,"odd"):d.addClass(a,"even")}));if(0<a.length){var b=a[0];d.addClass(b,this._classFirstSimpleTableRow);(b=k("."+this._classRowUpDiv,b)[0])&&d.addClass(b,this._classJimuStateDisabled);a=a[a.length-1];d.addClass(a,this._classLastSimpleTableRow);(a=k("."+this._classRowDownDiv,a)[0])&&d.addClass(a,this._classJimuStateDisabled)}},_createTextTd:function(a,b,c){var d=null;return d=b.editable?this._createEditableTextTd(a,b,c):this._createNormalTextTd(a,
b,c)},_createNormalTextTd:function(a,b,c){var e=d.toDom('\x3ctd class\x3d"simple-table-cell normal-text-td"\x3e\x3cdiv class\x3d"normal-text-div"\x3e\x3c/div\x3e\x3c/td\x3e');d.addClass(e,b.name);var f=k("div",e)[0];f.innerHTML=c||"";f.title=c||"";b["class"]&&d.addClass(e,b["class"]);d.place(e,a);return e},_createEditableTextTd:function(a,b,c){var e=d.toDom('\x3ctd class\x3d"editable-text-td '+b.name+'"\x3e\x3cdiv class\x3d"editable-div"\x3e\x3c/div\x3e\x3cinput class\x3d"editable-input" type\x3d"text" style\x3d"display:none;" /\x3e\x3c/td\x3e');
d.addClass(e,"simple-table-cell");d.place(e,a);b["class"]&&d.addClass(e,b["class"]);var f=k("div",e)[0],l=k("input",e)[0];f.innerHTML=c||"";""!==f.innerHTML&&(f.title=f.innerText||f.innerHTML);l.value=f.innerHTML;this.own(m(f,"dblclick",g.hitch(this,function(a){a.stopPropagation();l.value=f.innerText||f.innerHTML;d.setStyle(f,"display","none");d.setStyle(l,"display","inline");l.focus()})));this.own(m(l,"blur",g.hitch(this,function(){l.value=g.trim(l.value);var c=f.innerText||f.innerHTML,e=l.value;
""!==e?b.unique?0<this.getRowDataArrayByFieldValue(b.name,e,a).length?l.value=c:f.innerHTML=e:f.innerHTML=e:l.value=c;d.setStyle(l,"display","none");d.setStyle(f,"display","block")})));return e},_createRadioTd:function(a,b,c){var e=d.toDom('\x3ctd class\x3d"radio-td '+b.name+'"\x3e\x3cinput class\x3d"jimu-radio-btn" type\x3d"radio" /\x3e\x3c/td\x3e');d.addClass(e,"simple-table-cell");d.place(e,a);b["class"]&&d.addClass(e,b["class"]);a=k("input",e)[0];a.name=b.radio&&"row"===b.radio?this._name+this._rowIndex:
this._name+b.name;a.checked=!0===c;return e},_createCheckboxTd:function(a,b,c){var e=d.toDom('\x3ctd class\x3d"checkbox-td '+b.name+'"\x3e\x3c/td\x3e');d.addClass(e,"simple-table-cell");d.place(e,a);b["class"]&&d.addClass(e,b["class"]);var f=new q({onChange:g.hitch(this,function(){this._delaySyncThCheckBoxStatusWithAllTdCheckBoxes(b.name);"function"===typeof b.onChange&&setTimeout(g.hitch(this,function(){b.onChange(a,f)}),200)})});this.own(m(f,"status-change",g.hitch(this,function(){this._delaySyncThCheckBoxStatusWithAllTdCheckBoxes(b.name)})));
this._setValueForCheckBox(f,c);f.placeAt(e);return e},_createActionsTd:function(a,b){var c=d.toDom('\x3ctd class\x3d"actions-td"\x3e\x3cdiv class\x3d"action-item-parent jimu-float-leading"\x3e\x3c/div\x3e\x3c/td\x3e');d.addClass(c,"simple-table-cell");var e=k(".action-item-parent",c)[0];d.place(c,a);b["class"]&&d.addClass(c,b["class"]);h.forEach(b.actions,g.hitch(this,function(b){"up"===b?(b=d.create("div",{"class":"action-item jimu-float-leading row-up-div jimu-icon jimu-icon-up"},e),b.title=this.nls.moveUp,
this.own(m(b,"click",g.hitch(this,function(b){b.stopPropagation();if(this.onBeforeRowUp(a)){b=k(".simple-table-row",this.tbody);var c=h.indexOf(b,a);0<c&&(b=b[c-1])&&(d.place(a,b,"before"),this.updateUI(),this.emit("row-up",a))}})))):"down"===b?(b=d.create("div",{"class":"action-item jimu-float-leading row-down-div jimu-icon jimu-icon-down"},e),b.title=this.nls.moveDown,this.own(m(b,"click",g.hitch(this,function(b){b.stopPropagation();if(this.onBeforeRowDown(a)){b=k(".simple-table-row",this.tbody);
var c=h.indexOf(b,a);c<b.length-1&&(b=b[c+1])&&(d.place(a,b,"after"),this.updateUI(),this.emit("row-down",a))}})))):"edit"===b?(b=d.create("div",{"class":"action-item jimu-float-leading row-edit-div jimu-icon jimu-icon-edit"},e),b.title=this.nls.edit,this.own(m(b,"click",g.hitch(this,function(b){b.stopPropagation();this.onBeforeRowEdit(a)&&this._onActionsEdit(a)})))):"delete"===b&&(b=d.create("div",{"class":"action-item jimu-float-leading row-delete-div jimu-icon jimu-icon-delete"},e),b.title=this.nls.deleteRow,
this.own(m(b,"click",g.hitch(this,function(b){b.stopPropagation();this.onBeforeRowDelete(a)&&this.deleteRow(a)}))))}));var f=this._calculateActionsWidth(b)+"px";d.setStyle(e,"width",f);return c},_calculateActionsWidth:function(a){return 20*h.map(a.actions,function(a){return"up"===a||"down"===a||"edit"===a||"delete"===a}).length},_createEmptyTd:function(a,b){var c=d.create("td",{"class":b.name},a);d.addClass(c,"simple-table-cell");d.addClass(c,"empty-text-td");b["class"]&&d.addClass(c,b["class"]);
return c},_createExtensionTd:function(a,b,c){a=d.create("td",{"class":b.name},a);d.addClass(a,"simple-table-cell");d.addClass(a,"extension-td");b["class"]&&d.addClass(a,b["class"]);b.create&&"function"===typeof b.create&&b.create(a);b.setValue&&"function"===typeof b.setValue&&b.setValue(a,c);return a},editRow:function(a,b){var c={success:!1,tr:null,errorCode:null,errorMessage:null,repeatFields:null};if(!this.fields||"object"!==typeof b||!d.isDescendant(a,this.tbody))return c;var e=g.mixin([],this.fields),
e=h.filter(e,g.hitch(this,function(a){return"text"===a.type&&!0===a.unique})),e=h.filter(e,g.hitch(this,function(c){return 0<this.getRowDataArrayByFieldValue(c.name,b[c.name],a).length}));if(0<e.length)return c.errorCode=this.REPEATING_ERROR,c.errorMessage="repeating data",c.repeatFields=e,c;var f=k(".simple-table-cell",a);h.forEach(this.fields,g.hitch(this,function(a,c){if(b.hasOwnProperty(a.name)){var d=f[c],e=b[a.name],g=a.type;"text"===g?a.editable?this._editEditableText(d,a,e):this._editNormalText(d,
a,e):"radio"===g?this._editRadio(d,a,e):"checkbox"===g?this._editCheckbox(d,a,e):"extension"===g&&this._editExtension(d,a,e)}}));c.success=!0;c.tr=a;c.errorMessage=null;this._onEditRow(a);return c},_editNormalText:function(a,b,c){a=k("div",a)[0];a.innerHTML=c||"";a.title=a.innerHTML},_editEditableText:function(a,b,c){b=k("div",a)[0];b.innerHTML=c||"";k("input",a)[0].value=b.innerHTML},_editRadio:function(a,b,c){k("input",a)[0].checked=!0===c},_editCheckbox:function(a,b,c){a=k(".jimu-checkbox",a)[0];
a=n.byNode(a);this._setValueForCheckBox(a,c)},_setValueForCheckBox:function(a,b){null===b?a.setStatus(!1):(a.setStatus(!0),b!==a.getValue()&&a.setValue(b))},_editExtension:function(a,b,c){b.setValue&&"function"===typeof b.setValue&&b.setValue(a,c)},_getAllRows:function(){return k(".simple-table-row",this.tbody)},_getNotEmptyRows:function(){var a=this._getAllRows();return h.filter(a,g.hitch(this,function(a){return!d.hasClass(a,"empty")}))},_getEmptyRows:function(){var a=this._getAllRows();return h.filter(a,
g.hitch(this,function(a){return d.hasClass(a,"empty")}))},getRows:function(){return this._getNotEmptyRows()},getSelectedRow:function(){var a=null,b=k(".simple-table-row",this.tbody),b=h.filter(b,g.hitch(this,function(a){return!d.hasClass(a,"empty")&&d.hasClass(a,"jimu-state-active")}));0<b.length&&(a=b[0]);return a},getSelectedRowData:function(){var a=null,b=this.getSelectedRow();b&&(a=this._getRowDataByTr(b));return a},getData:function(a){var b=this._getNotEmptyRows();a&&(b=h.filter(b,g.hitch(this,
function(b){return b!==a})));return h.map(b,g.hitch(this,function(a){return this._getRowDataByTr(a)}))},getRowData:function(a){return this._getRowDataByTr(a)},_getRowDataByTr:function(a){var b=null;if(a)b={};else return null;h.forEach(this.fields,g.hitch(this,function(c){var d=c.type;if("actions"!==d){var f=c.name;b[f]=null;var g=k(".simple-table-cell."+f,a)[0];g&&("text"===d?(c=k("div",g)[0],b[f]=c.innerText||c.innerHTML):"radio"===d?(c=k("input",g)[0],b[f]=c.checked):"checkbox"===d?(c=k(".jimu-checkbox",
g)[0],c=n.byNode(c),c.getStatus()?b[f]=c.getValue():b[f]=null):"extension"===d&&c.getValue&&"function"===typeof c.getValue&&(b[f]=c.getValue(g,c)))}}));return b},getRowDataArrayByFieldValue:function(a,b,c){var d=[];if(!this.fields||!h.some(this.fields,g.hitch(this,function(b){return b.name===a})))return[];c=this.getData(c);return d=h.filter(c,g.hitch(this,function(c){return c[a]==b}))},moveToTop:function(a){a&&a.parentNode===this.tbody&&d.place(a,this.tbody,"first")},_onClickRow:function(a){this.emit("row-click",
a)},_onDblClickRow:function(a){this.emit("row-dblclick",a)},_onSelectRow:function(a){this.emit("row-select",a)},_onAddRow:function(a){this.emit("row-add",a)},_onEditRow:function(a){this.emit("row-edit",a)},_onDeleteRow:function(a,b){this.emit("row-delete",a,b)},_onEnterRow:function(a){this.emit("row-enter",a)},_onClearRows:function(a){this.emit("rows-clear",a)},_onActionsEdit:function(a){this.emit("actions-edit",a)},onBeforeRowUp:function(a){return!0},onBeforeRowDown:function(a){return!0},onBeforeRowEdit:function(a){return!0},
onBeforeRowDelete:function(a){return!0}})});