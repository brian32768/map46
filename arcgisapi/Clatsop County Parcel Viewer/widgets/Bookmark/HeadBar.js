// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/Bookmark/HeadBar.html":'\x3cdiv\x3e\r\n\t\x3cdiv class\x3d"header"\x3e\r\n\t\t\x3cdiv data-dojo-attach-point\x3d"editableBtns" class\x3d"editable-btns"\x3e\r\n\t\t\t\x3cdiv data-dojo-attach-point\x3d"addBtn" class\x3d"add hide" title\x3d"${nls.labelBookmarkName}"\x3e${nls.addBtn}\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\r\n\t\t\x3cdiv class\x3d"oper-btns"\x3e\r\n\t\t\t\x3cdiv data-dojo-attach-point\x3d"filter" class\x3d"filter-container hide"\x3e\r\n\t\t\t\t\x3cdiv class\x3d"filter-input"\x3e\r\n\t\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"filterInput" data-dojo-type\x3d"dijit/form/ValidationTextBox"\r\n\t\t\t\t\t\tplaceHolder\x3d"${nls.searchBookmark}" required\x3d"false"\x3e\x3c/div\x3e\r\n\t\t\t\t\t\x3cdiv class\x3d"search" data-dojo-attach-point\x3d"filterBtn" title\x3d"${nls.searchBookmark}"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3c/div\x3e\r\n\t\t\t\x3c/div\x3e\r\n\t\t\t\x3c!--\x3cdiv data-dojo-attach-point\x3d"commonFunBtns" class\x3d"common-fun-btns"\x3e\r\n\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"syncBtn" class\x3d"head-btns sync-btn" title\x3d"${nls.syncTip}"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"backToInitBtn" class\x3d"head-btns back-to-init hide" title\x3d""\x3e\x3c/div\x3e--\x3e\r\n\t\t\t\x3cdiv data-dojo-attach-point\x3d"displayMode" class\x3d"display-mode"\x3e\r\n\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"cardsBtn" class\x3d"head-btns cards hide" title\x3d"${nls.cardsTips}"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"listBtn" class\x3d"head-btns list hide" title\x3d"${nls.listTips}"\x3e\x3c/div\x3e\r\n\t\t\t\x3c/div\x3e\r\n\t\t\x3c/div\x3e\r\n\t\t\x3c!--\x3cdiv data-dojo-attach-point\x3d"editBtns" class\x3d"edit-btns"\x3e\r\n\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"renameBtn" class\x3d"head-btns rename" title\x3d"rename"\x3e\x3c/div\x3e\r\n\t\t\t\t\x3cdiv data-dojo-attach-point\x3d"deleteBtn" class\x3d"head-btns delete" title\x3d"delete"\x3e\x3c/div\x3e\r\n\t\t\t\x3c/div\x3e\r\n\t\t\x3c/div\x3e--\x3e\r\n\t\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/Evented dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./HeadBar.html ./utils".split(" "),function(e,f,b,a,c,g,h,k,l,m){return f([g,h,k,e],{baseClass:"dojoDndSource dojoDndTarget dojoDndContainer",templateString:l,nls:null,map:null,bookmarksContainer:null,layout:null,isAddingBookmark:!1,editingName:!1,initMapState:null,postMixInProperties:function(){this.nls=b.mixin(this.nls,window.jimuNls.common)},
startup:function(){this.inherited(arguments);this.refreshUI();this.own(c(this.addBtn,"click",b.hitch(this,function(){this.addingBookmark()})));this.own(c(this.filterInput,"blur",b.hitch(this,this.onFilterChange)));this.own(c(this.filterInput,"keyUp",b.hitch(this,this.onFilterChange)));this.own(c(this.cardsBtn,"click",b.hitch(this,function(){this._toggleLayoutBtnDisplay("cards")})));this.own(c(this.listBtn,"click",b.hitch(this,function(){this._toggleLayoutBtnDisplay("list")})))},refreshUI:function(){this.editable?
(a.addClass(this.domNode,"editable"),a.removeClass(this.addBtn,"hide")):(a.removeClass(this.domNode,"editable"),a.addClass(this.addBtn,"hide"));this._toggleLayoutBtnDisplay(this.layout.defaultMode);!1!==this.editable||!0===this.layout.list&&!0===this.layout.cards?a.removeClass(this.domNode,"hide"):a.addClass(this.domNode,"hide")},_toggleLayoutBtnDisplay:function(d){a.addClass(this.listBtn,"hide");a.addClass(this.cardsBtn,"hide");"list"===d?this.listMode():this.cardsMode();!0===this.layout.list&&!0===
this.layout.cards?("list"===d?a.removeClass(this.cardsBtn,"hide"):a.removeClass(this.listBtn,"hide"),a.addClass(this.displayMode,"two-modes")):a.removeClass(this.displayMode,"two-modes")},cardsMode:function(){a.removeClass(this.bookmarksContainer,"list");a.addClass(this.bookmarksContainer,"cards");a.addClass(this.domNode,"list");a.removeClass(this.domNode,"cards");this.emit("layout-cards")},listMode:function(){a.removeClass(this.bookmarksContainer,"cards");a.addClass(this.bookmarksContainer,"list");
a.addClass(this.domNode,"cards");a.removeClass(this.domNode,"list");this.emit("layout-list")},toogleMobileDisplay:function(d){d?a.addClass(this.displayMode,"hide"):a.removeClass(this.displayMode,"hide")},addingBookmark:function(){this.isAddingBookmark=!0;this.emit("add")},onFilterChange:function(){var a=this.filterInput.getValue();this.emit("filter-change",a)},onFilterBlur:function(){var a=this.filterInput.getValue();this.emit("filter-blur",a)},updateInitMapState:function(){this.initMapState={extent:this.map.extent.toJson(),
layers:{}};this.initMapState.layers=m.getlayerInfos()},_listenExtentChangeOnce:function(){this.own(c.once(this.map,"extent-change",b.hitch(this,function(){a.addClass(this.backToInitBtn,"marked")})))}})});