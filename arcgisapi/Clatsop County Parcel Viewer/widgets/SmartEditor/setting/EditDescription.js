// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/SmartEditor/setting/EditDescription.html":'\x3cdiv\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"editText"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/on dojo/query dojo/text!./EditDescription.html dijit/_TemplatedMixin jimu/BaseWidgetSetting dijit/Editor jimu/dijit/Popup esri/lang dojo/sniff jimu/utils dojo/_base/html dijit/_editor/plugins/LinkDialog dijit/_editor/plugins/ViewSource dijit/_editor/plugins/FontChoice dojox/editor/plugins/Preview dijit/_editor/plugins/TextColor dojox/editor/plugins/ToolbarLineBreak dojox/editor/plugins/FindReplace dojox/editor/plugins/PasteFromWord dojox/editor/plugins/InsertAnchor dojox/editor/plugins/Blockquote dojox/editor/plugins/UploadImage jimu/dijit/EditorChooseImage jimu/dijit/EditorTextColor jimu/dijit/EditorBackgroundColor".split(" "),function(g,
c,f,e,h,k,l,m,n,p,q,d,r){return g([l,k],{baseClass:"jimu-widget-smartEditor-edit-description",templateString:h,_configInfo:null,_fieldValid:null,_fieldValidations:null,__layerName:null,postCreate:function(){this.inherited(arguments);this._initEditor();this.resize();setTimeout(c.hitch(this,function(){this.resize()}),200)},popupEditDescription:function(){this._editorObj.focus();this._configInfo.editDescription&&null!==this._configInfo.editDescription&&this._editorObj.set("value",this._configInfo.editDescription);
var a=new n({titleLabel:p.substitute({layername:this._layerName},this.nls.editDescriptionPage.title),width:720,maxHeight:700,autoHeight:!0,content:this,buttons:[{label:this.nls.ok,onClick:c.hitch(this,function(){this._configInfo.editDescription=this._getText();this._editorObj.destroy();a.close()})},{label:this.nls.cancel,classNames:["jimu-btn-vacation"],onClick:c.hitch(this,function(){this._editorObj.destroy();a.close()})}],onClose:c.hitch(this,function(){})})},_getText:function(){return this._editorObj.focusNode.innerHTML},
_initEditor:function(){if(!this._editorObj)if(this._initEditorPluginsCSS(),this._editorObj=new m({plugins:["bold","italic","underline",d.getEditorTextColor("smartEditor"),d.getEditorBackgroundColor("smartEditor"),"|","justifyLeft","justifyCenter","justifyRight","justifyFull","|","insertOrderedList","insertUnorderedList","indent","outdent"],extraPlugins:["|","createLink","unlink","pastefromword","|","undo","redo","|","toolbarlinebreak",{name:"dijit._editor.plugins.FontChoice",command:"fontName",custom:"Arial;Comic Sans MS;Courier New;Garamond;Tahoma;Times New Roman;Verdana".split(";")},
"fontSize","formatBlock"],style:"font-family:Verdana;"},this.editText),this.own(f(this._editorObj,"focus",c.hitch(this,function(){}))),this.own(f(this._editorObj,"blur",c.hitch(this,function(){}))),this._editorObj.onLoadDeferred.then(c.hitch(this,function(){})),this._editorObj.startup(),8!==q("ie"))this._editorObj.resize({w:"100%",h:"100%"});else{var a=r.getMarginBox(this.editText);this._editorObj.resize({w:a.w,h:a.h})}},_initEditorPluginsCSS:function(){var a,b;a=document.getElementsByTagName("head")[0];
b=window.apiUrl+"dojox/editor/plugins/resources/css/TextColor.css";e('link[href\x3d"'+b+'"]',a)[0]||d.loadStyleLink("editor_plugins_resources_TextColor",b);b=window.apiUrl+"dojox/editor/plugins/resources/editorPlugins.css";e('link[href\x3d"'+b+'"]',a)[0]||d.loadStyleLink("editor_plugins_resources_editorPlugins",b);b=window.apiUrl+"dojox/editor/plugins/resources/css/PasteFromWord.css";e('link[href\x3d"'+b+'"]',a)[0]||d.loadStyleLink("editor_plugins_resources_PasteFromWord",b)}})});