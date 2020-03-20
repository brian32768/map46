// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/Evented dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dojo/sniff esri/SpatialReference jimu/BaseWidget dijit/_TemplatedMixin ./utils ./ItemNode jimu/dijit/ImageChooser".split(" "),function(k,l,c,d,m,e,n,h,p,q,f,g,r){var t=window.Sortable;return l([p,q,k],{baseClass:"dojoDndSource dojoDndTarget dojoDndContainer bookmarker-nodes",templateString:"\x3cdiv\x3e\x3c/div\x3e",nls:null,_CHANGING_IMG_BM:null,postCreate:function(){this.inherited(arguments);this.drawerHandle=
d.create("div",{"class":"drawer-handle",innerHTML:"\x3cdiv class\x3d'separate-line'\x3e\x3c/div\x3e"},this.domNode);this.bookMarkerContainer=d.create("div",{"class":"custom editing"},this.domNode);this.imageChooserContainer=d.create("div",{"class":"hide"},this.domNode)},startup:function(){this.inherited(arguments);this.sortableBookMarkerNodes=t.create(this.bookMarkerContainer,{handle:".drag-masker",filter:".disable-drag .hide",sort:!0,disabled:!1,animation:100,onSort:c.hitch(this,function(){this.saveBookMarkersBySortable();
this.emit("sort",this.bookmarks)})});this.imageChooser=new r({cropImage:!1,showSelfImg:!0,goldenWidth:108,goldenHeight:71,maxSize:100,label:this.nls.selectFile,format:["image/gif","image/png","image/jpeg"]},this.imageChooserContainer);this.imageChooser.startup();this.own(e(this.imageChooser,"imageChange",c.hitch(this,"_onImageChange")))},toggleMobile:function(a){(this._IS_MOBILE=a)?this.sortableBookMarkerNodes.option("disabled",!0):this.sortableBookMarkerNodes.option("disabled",!1)},refresh:function(a){this.bookmarks=
a;f.updateBookmarks(this.bookmarks);this.displayBookmarks(this.bookmarks);this.toggleDrawer()},add:function(){var a=f.getAutoRenameBeforeAdd("bookmark",this.bookmarks),b={name:"bookmark",displayName:a,extent:this.map.extent.toJson(),isSaveExtent:!0};"bookmark"!==a&&(b._autoRename=!0);this._doAddBookmark(b);this.bookmarks.unshift(b);b.itemNode&&b.itemNode.domNode&&d.place(b.itemNode.domNode,this.bookMarkerContainer,"first");this.displayBookmarks(this.bookmarks);this.toggleDrawer();this.bookmarks.forEach(c.hitch(this,
function(a,b){0===b?(g.enableEditable(a),g.focusLabel(a)):g.disableEditable(a)}));this.emit("added",this.bookmarks)},_doAddBookmark:function(a){var b=f.createBookMarkNode(a,this.nls,this.folderUrl,{enableEditLabel:!0,editBtn:!1,changeImgBtn:!0});a.itemNode=b;this.own(e(b,"thumbnail-click",c.hitch(this,c.partial(this._onNodeBoxClick,a))));this.own(e(b,"label-click",c.hitch(this,c.partial(this._onLebelClick,a))));this.own(e(b,"label-blur",c.hitch(this,c.partial(this._onLabelBlur,a))));this.own(e(b,
"delete",c.hitch(this,c.partial(this._onBookmarkDeleteImmediately,a))));this.own(e(b,"change-img",c.hitch(this,c.partial(this._onBookmarkChangeImg,a))));this.own(e(b,"rename",c.hitch(this,c.partial(this._onRename,a))));return b},filter:function(a){this._LAST_FILTER_STR=a;f.filter(a,this.bookmarks)},displayBookmarks:function(a){f.empty(a,this.bookMarkerContainer);m.forEach(a,function(a){a&&this._doAddBookmark(a)},this);a.forEach(c.hitch(this,function(a){a&&a.itemNode&&a.itemNode.domNode&&d.place(a.itemNode.domNode,
this.bookMarkerContainer,"last")}))},saveBookMarkersBySortable:function(a){for(var b=this.sortableBookMarkerNodes.toArray(),c=[],d=0,e=b.length;d<e;d++){var g=f.findBookMarkByUID(b[d],this.bookmarks);g&&c.push(g.bookmark)}this.bookmarks=c;a&&a.isRefresh&&this.displayBookmarks(this.bookmarks)},_isListMode:function(){if(this.domNode){var a=this.domNode.parentElement||this.domNode.parentNode;if(a)return d.hasClass(a,"list")}return!1},_onNodeBoxClick:function(a){require(["esri/geometry/Extent"],c.hitch(this,
function(b){if(!1!==a.isSaveExtent){var c=a.extent;c.spatialReference?new h(c.spatialReference):new h({wkid:4326});this.map.setExtent(new b(c))}!0===a.isSaveLayers&&f.layerInfosRestoreState(a.layerOptions)}))},_onLebelClick:function(a){this._isListMode()||!0===this._IS_MOBILE?this._onNodeBoxClick(a):g.focusLabel(a)},_onLabelBlur:function(a){var b=a.itemNode.nodeLabel.get("value");a.displayName=b;a.name=b;this.emit("label-blur",this.bookmarks);this.filter(this._LAST_FILTER_STR)},_onBookmarkDeleteImmediately:function(a){this.removeBookMarks([a])},
removeBookMarks:function(a){for(var b=0,c=a.length;b<c;b++){var d=f.findBookMark(a[b],this.bookmarks);d&&d.bookmark&&(d.bookmark.itemNode&&d.bookmark.itemNode.destroy(),this.bookmarks.splice(d.idx,1))}this.emit("delete",this.bookmarks);this.toggleDrawer()},_onBookmarkChangeImg:function(a){this._CHANGING_IMG_BM=a;a=this.imageChooser.mask;if(n("safari")){var b=document.createEvent("MouseEvents");b.initEvent("click",!0,!0);a.dispatchEvent(b)}else a.click()},_onImageChange:function(a){this._CHANGING_IMG_BM&&
this._CHANGING_IMG_BM.itemNode&&(""!==a&&(this._CHANGING_IMG_BM.itemNode.changeImg(a),this._CHANGING_IMG_BM.thumbnail=a),this.emit("change-img",this.bookmarks))},_onRename:function(a){g.focusLabel(a)},toggleDrawer:function(){!0===f.isBookmarksDataEmpty(this.bookmarks)?d.addClass(this.domNode,"hide"):d.removeClass(this.domNode,"hide")},hideDrawer:function(){d.addClass(this.bookMarkerContainer,"hide")},showDrawer:function(){d.removeClass(this.bookMarkerContainer,"hide")}})});