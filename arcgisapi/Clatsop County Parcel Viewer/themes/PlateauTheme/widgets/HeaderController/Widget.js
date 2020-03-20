// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"themes/PlateauTheme/widgets/HeaderController/PopupTileNodes":function(){define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/on dojo/dom-construct dojo/query dijit/_WidgetBase dijit/_TemplatedMixin jimu/dijit/ViewStack dojox/gesture/swipe dojox/gesture/tap jimu/utils".split(" "),function(n,e,p,a,l,b,m,t,v,c,k,g,w){var u=0;return n([t,v],{baseClass:"jimu-header-more-popup",templateString:'\x3cdiv\x3e\x3cdiv class\x3d"pages" data-dojo-attach-point\x3d"pagesNode"\x3e\x3c/div\x3e\x3cdiv class\x3d"points jimu-corner-bottom"\x3e\x3cdiv class\x3d"points-inner"data-dojo-attach-point\x3d"pointsNode"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e',
margin:4,postCreate:function(){this.nodes=[];this.pages=[];this.createCloseBtn()},startup:function(){this.viewStack=new c({views:[],viewType:"dom"},this.pagesNode);this.viewStack.startup();l(this.pagesNode,k.end,e.hitch(this,function(a){u<this.maximumPages-1&&a.dx&&0>a.dx?(u++,this._selectPage(u)):a.dx&&0<a.dx&&0<u&&(u--,this._selectPage(u))}));this.resize()},resize:function(){var b=this._calculateGridParam(),c;null!==b?(a.setStyle(this.domNode,w.getPositionStyle(b.position)),this.nodeWidth=b.cellSize-
this.margin,this.oldGridParam&&this.oldGridParam.rows===b.rows&&this.oldGridParam.cols===b.cols||(this.clearPages(),this.createPages(b)),this.nodes.forEach(e.hitch(this,function(a,c){this.setItemNodePosition(a,c,b)})),this.oldGridParam=b,c=m("div.close",this.domNode)[0],a.setStyle(c,{width:.25*this.nodeWidth+"px",height:.25*this.nodeWidth+"px"})):(this.oldGridParam=null,a.setStyle(this.domNode,w.getPositionStyle({left:0,top:0,width:0,height:0,zIndex:111})),this.nodeWidth=0);!window.appInfo.isRunInMobile&&
760<window.innerWidth&&this.numWidget&&8>=this.numWidget.length&&this.hide()},setItemNodePosition:function(b,c,r){var f,q,g=48,k=16;f=0===c%r.cols?0:this.margin/2;q=c%(r.rows*r.cols)<r.cols?0:this.margin/2;c={};"number"===typeof this.nodeWidth&&(c.width=this.nodeWidth+"px",c.height=this.nodeWidth+"px");"number"===typeof f&&(window.isRTL?c.marginRight=f+"px":c.marginLeft=f+"px");"number"===typeof q&&(c.marginTop=q+"px");if(f=m("img",b)[0])r.iconScaled&&(g*=this.nodeWidth/120),a.setStyle(f,{width:g+
"px",height:g+"px"});if(g=m("div.node-label",b)[0])r.showLabel?(r.iconScaled&&(k*=this.nodeWidth/120),a.setStyle(g,{"font-size":k+"px",display:"block"})):a.setStyle(g,{"font-size":k+"px",display:"none"});a.setStyle(b,c)},clearPages:function(){p.forEach(this.pages,function(a){this.viewStack.removeView(a.pageNode)},this);b.empty(this.pointsNode);this.pages=[];this.nodes=[]},createPages:function(a){var c,q,f,g;this.maximumPages=c=Math.ceil(this.items.length/(a.rows*a.cols));for(q=0;q<c;q++)f=b.create("div",
{"class":"page"}),this.createPageItems(q,f,a),this.viewStack.addView(f),1<c&&(g=b.create("div",{"class":"point"},this.pointsNode),this.own(l(g,"click",e.hitch(this,this._onPageNodeClick,q)))),this.pages.push({pageNode:f,pointNode:g});0<this.viewStack.views.length&&this._selectPage(0)},_onPageNodeClick:function(a){this._selectPage(a)},_selectPage:function(b){1<this.pages.length&&(m(".point",this.domNode).removeClass("point-selected  jimu-main-background"),a.addClass(this.pages[b].pointNode,"point-selected jimu-main-background"));
this.viewStack.switchView(this.pages[b].pageNode)},createPageItems:function(a,b,c){var f,g,k;f=this.items.length;g=c.rows*c.cols;c=(a+1)*g;k=c-f;c=Math.min(c,f);for(a*=g;a<c;a++)this.createItemNode(a,b);for(a=f;a<f+k;a++)this.createEmptyItemNode(b)},createItemNode:function(a,c){var k,f;f=this.items[a];k=b.create("div",{"class":"icon-node jimu-float-leading jimu-main-background",title:f.label,settingId:f.id},c);b.create("img",{src:f.icon},k);b.create("div",{"class":"node-label",title:f.label,innerHTML:w.stripHTML(f.label)},
k);k.config=f;this.own(l(k,g,e.hitch(this,function(){this.onNodeClicked(k)})));this.nodes.push(k)},createEmptyItemNode:function(a){a=b.create("div",{"class":"icon-node jimu-float-leading  jimu-main-background"},a);this.nodes.push(a);return a},createCloseBtn:function(){var a;a=b.create("div",{"class":"close"},this.domNode);b.create("div",{"class":"close-inner jimu-main-background"},a);l(a,"click",e.hitch(this,function(){this.hide()}));return a},hide:function(){u=0;a.setStyle(this.domNode,"display",
"none")},show:function(){a.setStyle(this.domNode,"display","block")},onNodeClicked:function(a){this.hide()},_calculateGridParam:function(){var b,c,g,f,k=!1,l=!0;b=a.getContentBox(jimuConfig.mapId);c=Math.min(b.w,b.h)-40;if(360<=c)f=120;else{f=Math.floor(c/3);if(10>f)return null;k=!0;80>f&&(l=!1)}c=Math.floor((b.h-40)/f);g=Math.floor((b.w-40)/f);c=4<c?4:c;c=3>c?3:c;g=3>c?3:4<g?4:g;return{rows:c,cols:g,cellSize:f,iconScaled:k,showLabel:l,position:{top:(b.h-f*c)/2,bottom:(b.h-f*c)/2,left:(b.w-f*g)/2,
right:(b.w-f*g)/2,width:f*g-this.margin*(g-1)/2,height:f*c-this.margin*(c-1)/2,zIndex:111}}}})})},"dojox/gesture/swipe":function(){define(["dojo/_base/kernel","dojo/_base/declare","./Base","../main"],function(n,e,p,a){n.experimental("dojox.gesture.swipe");n=e(p,{defaultEvent:"swipe",subEvents:["end"],press:function(a,b){b.touches&&2<=b.touches.length?delete a.context:(a.context||(a.context={x:0,y:0,t:0}),a.context.x=b.screenX,a.context.y=b.screenY,a.context.t=(new Date).getTime(),this.lock(b.currentTarget))},
move:function(a,b){this._recognize(a,b,"swipe")},release:function(a,b){this._recognize(a,b,"swipe.end");delete a.context;this.unLock()},cancel:function(a,b){delete a.context;this.unLock()},_recognize:function(a,b,m){a.context&&(a=this._getSwipeInfo(a,b))&&(a.type=m,this.fire(b.target,a))},_getSwipeInfo:function(a,b){var m,e,l={};e=a.context;l.time=(new Date).getTime()-e.t;m=b.screenX-e.x;e=b.screenY-e.y;if(0===m&&0===e)return null;l.dx=m;l.dy=e;return l}});a.gesture.swipe=new n;a.gesture.swipe.Swipe=
n;return a.gesture.swipe})},"dojox/gesture/Base":function(){define("dojo/_base/kernel dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/dom dojo/on dojo/touch dojo/has ../main".split(" "),function(n,e,p,a,l,b,m,t,v){n.experimental("dojox.gesture.Base");a.getObject("gesture",!0,v);return e(null,{defaultEvent:" ",subEvents:[],touchOnly:!1,_elements:null,constructor:function(b){a.mixin(this,b);this.init()},init:function(){this._elements=[];if(!t("touch")&&this.touchOnly)console.warn("Gestures:[",
this.defaultEvent,"] is only supported on touch devices!");else{var a=this.defaultEvent;this.call=this._handle(a);this._events=[a];p.forEach(this.subEvents,function(b){this[b]=this._handle(a+"."+b);this._events.push(a+"."+b)},this)}},_handle:function(a){var c=this;return function(g,k){var e=arguments;2<e.length&&(g=e[1],k=e[2]);if(g&&(g.nodeType||g.attachEvent||g.addEventListener)){var m=c._add(g,a,k);return{remove:function(){m.remove();c._remove(g,a)}}}return b(g,a,k)}},_add:function(c,k,g){var e=
this._getGestureElement(c);if(!e){var e={target:c,data:{},handles:{}},l=a.hitch(this,"_process",e,"press"),n=a.hitch(this,"_process",e,"move"),p=a.hitch(this,"_process",e,"release"),t=a.hitch(this,"_process",e,"cancel"),f=e.handles;this.touchOnly?(f.press=b(c,"touchstart",l),f.move=b(c,"touchmove",n),f.release=b(c,"touchend",p),f.cancel=b(c,"touchcancel",t)):(f.press=m.press(c,l),f.move=m.move(c,n),f.release=m.release(c,p),f.cancel=m.cancel(c,t));this._elements.push(e)}e.handles[k]=e.handles[k]?++e.handles[k]:
1;return b(c,k,g)},_getGestureElement:function(a){for(var b=0,c;b<this._elements.length;b++)if(c=this._elements[b],c.target===a)return c},_process:function(a,b,g){g._locking=g._locking||{};g._locking[this.defaultEvent]||this.isLocked(g.currentTarget)||("INPUT"==g.target.tagName&&"radio"!=g.target.type&&"checkbox"!=g.target.type||"TEXTAREA"==g.target.tagName||g.preventDefault(),g._locking[this.defaultEvent]=!0,this[b](a.data,g))},press:function(a,b){},move:function(a,b){},release:function(a,b){},cancel:function(a,
b){},fire:function(a,e){a&&e&&(e.bubbles=!0,e.cancelable=!0,b.emit(a,e.type,e))},_remove:function(a,b){var c=this._getGestureElement(a);if(c&&c.handles){c.handles[b]--;var e=c.handles;p.some(this._events,function(a){return 0<e[a]})||(this._cleanHandles(e),c=p.indexOf(this._elements,c),0<=c&&this._elements.splice(c,1))}},_cleanHandles:function(a){for(var b in a)a[b].remove&&a[b].remove(),delete a[b]},lock:function(a){this._lock=a},unLock:function(){this._lock=null},isLocked:function(a){return this._lock&&
a?this._lock!==a&&l.isDescendant(a,this._lock):!1},destroy:function(){p.forEach(this._elements,function(a){this._cleanHandles(a.handles)},this);this._elements=null}})})},"dojox/gesture/tap":function(){define(["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","./Base","../main"],function(n,e,p,a,l){n.experimental("dojox.gesture.tap");n=e(a,{defaultEvent:"tap",subEvents:["hold","doubletap"],holdThreshold:500,doubleTapTimeout:250,tapRadius:10,press:function(a,e){if(e.touches&&2<=e.touches.length)clearTimeout(a.tapTimeOut),
delete a.context;else{var b=e.target;this._initTap(a,e);a.tapTimeOut=setTimeout(p.hitch(this,function(){this._isTap(a,e)&&this.fire(b,{type:"tap.hold"});delete a.context}),this.holdThreshold)}},release:function(a,e){if(a.context&&this._isTap(a,e))switch(a.context.c){case 1:this.fire(e.target,{type:"tap"});break;case 2:this.fire(e.target,{type:"tap.doubletap"})}clearTimeout(a.tapTimeOut)},_initTap:function(a,e){a.context||(a.context={x:0,y:0,t:0,c:0});var b=(new Date).getTime();b-a.context.t<=this.doubleTapTimeout?
a.context.c++:(a.context.c=1,a.context.x=e.screenX,a.context.y=e.screenY);a.context.t=b},_isTap:function(a,e){if(!a.context)return!1;var b=Math.abs(a.context.y-e.screenY);return Math.abs(a.context.x-e.screenX)<=this.tapRadius&&b<=this.tapRadius}});l.gesture.tap=new n;l.gesture.tap.Tap=n;return l.gesture.tap})},"themes/PlateauTheme/widgets/HeaderController/_build-generate_module":function(){define(["dojo/text!./Widget.html","dojo/text!./css/style.css","dojo/i18n!./nls/strings"],function(){})},"url:themes/PlateauTheme/widgets/HeaderController/Widget.html":'\x3cdiv\x3e\r\n  \x3c!-- solve the bug of style delay loading --\x3e\r\n  \x3cdiv class\x3d"header-section jimu-float-leading" data-dojo-attach-point\x3d"headerNode"\x3e\r\n    \x3cimg class\x3d"logo jimu-float-leading jimu-leading-margin1" data-dojo-attach-point\x3d"logoNode" data-dojo-attach-event\x3d"onload:_onLogoLoad"\x3e\r\n    \x3cdiv class\x3d"titles jimu-float-leading jimu-leading-margin1" data-dojo-attach-point\x3d"titlesNode"\x3e\r\n      \x3cdiv class\x3d"jimu-title jimu-float-leading" data-dojo-attach-point\x3d"titleNode"\x3e\x3c/div\x3e\r\n      \x3cdiv class\x3d"jimu-subtitle jimu-float-leading jimu-leading-margin2" data-dojo-attach-point\x3d"subtitleNode"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"links jimu-float-leading jimu-leading-margin1" data-dojo-attach-point\x3d"linksNode"\x3e\r\n      \x3cdiv class\x3d"dynamic-section jimu-float-leading" data-dojo-attach-point\x3d"dynamicLinksNode"\x3e\x3c/div\x3e\r\n      \x3cdiv class\x3d"signin-section jimu-float-leading" data-dojo-attach-point\x3d"signInSectionNode"\x3e\r\n        \x3ca href\x3d"#" class\x3d"jimu-link" data-dojo-attach-event\x3d"onclick:_onSigninClick"\r\n        data-dojo-attach-point\x3d"signinLinkNode"\x3e${nls.signin}\x3c/a\x3e\r\n        \x3ca href\x3d"" target\x3d"_blank" class\x3d"jimu-link" data-dojo-attach-event\x3d"onclick:_onUserNameClick" data-dojo-attach-point\x3d"userNameLinkNode"\x3e\x3c/a\x3e\r\n        \x3ca href\x3d"#" class\x3d"jimu-link" data-dojo-attach-event\x3d"onclick:_onSignoutClick" data-dojo-attach-point\x3d"signoutLinkNode"\x3e${nls.signout}\x3c/a\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"container-section jimu-float-leading jimu-main-background" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n',
"url:themes/PlateauTheme/widgets/HeaderController/css/style.css":'.jimu-widget-header-controller {box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.4);}.jimu-widget-header-controller .header-section {height: 100%; overflow: hidden; width: calc(100% - 360px);}.jimu-widget-header-controller .container-section {height: 100%; min-width: 80px;}.jimu-widget-header-controller .logo {cursor: pointer;}.jimu-widget-header-controller .hide-logo {display: none;}.jimu-widget-header-controller .titles {height: 100%; overflow: hidden;}.jimu-widget-header-controller .jimu-title {text-align: center; height: 100%;}.jimu-widget-header-controller .jimu-subtitle {text-align: center; height: 100%;}.jimu-widget-header-controller .links {height: 100%; overflow: hidden;}.jimu-widget-header-controller .dynamic-section, .jimu-widget-header-controller .signin-section {height: 100%;}.jimu-widget-header-controller .links .jimu-link {height: 100%;}.jimu-widget-header-controller .signin-section .jimu-link {color: #d9dde0;}.jimu-widget-header-controller .icon-node {cursor: pointer; opacity: 1; text-align: center; border-right: 1px solid #323e4f;}.jimu-widget-header-controller .icon-node img {height: 20px; width: 20px;}.jimu-widget-header-controller .icon-node:first-child {border: none;}.jimu-widget-header-controller .icon-node:hover {opacity: 1;}.jimu-widget-header-controller .icon-node.jimu-state-selected {background-color: #697a8c; opacity: 1; border: none; border-top: 2px solid #8491a1;}.jimu-widget-header-controller .drop-triangle {position: absolute; width: 0px; height: 0px; bottom: 1px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid white;}.jimu-widget-header-controller .jimu-drop-menu {box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.4);}.jimu-widget-header-controller .jimu-drop-menu .menu-item {overflow: hidden; border-top: 1px solid rgba(0, 0, 0, 0.2);}.jimu-widget-header-controller .jimu-drop-menu .menu-item:hover {background-color: rgba(0, 0, 0, 0.2);}.jimu-widget-header-controller .jimu-drop-menu .menu-item img {width: 24px; height: 24px; cursor: pointer; margin: 8px;}.jimu-widget-header-controller .jimu-drop-menu .menu-item .label {cursor: pointer; margin-top: 12px; font-size: 14px; color: white; min-width: 50px; text-align: center; white-space: nowrap; max-width: 300px; text-overflow: ellipsis; overflow: hidden; padding-right: 8px;}.jimu-rtl .jimu-widget-header-controller .jimu-drop-menu .menu-item .label{padding-left: 8px;}.popup-links .popup-title {}.popup-links .logo {height: 30px;}.popup-links .title {color: #fff; text-align: center; font-size: 16px; width: 71.42857142857143%; overflow: hidden; white-space: nowrap; height: 100%;}.popup-links .line {width: 100%; height: 4px; border-bottom: 1px solid #393c40;}.popup-links .link-section {width: 100%; height: 66px;}.popup-links a {color: #fff; margin-left: 20px; font-size: 14px; height: 100%; width: 95%; overflow: hidden; display: inline-block;}.popup-links .link-section.signin a {color: #d9dde0;}.jimu-header-more-popup {position: absolute; border-radius: 2px; z-index: 111; background-color: #FFFFFF;}.jimu-header-more-popup .pages {position: relative; overflow: hidden; padding: 2px;}.jimu-header-more-popup .points {position: absolute; overflow: hidden; bottom: -15px; left: 0px; right: 0px; text-align: center; background-color: #bababa;}.jimu-header-more-popup .points-inner {display: inline-block; overflow: hidden;}.jimu-header-more-popup .point {float: left; width: 8px; height: 8px; margin-left: 5px; border-radius: 4px; background-color: #f2f6f9; cursor: pointer;}.jimu-header-more-popup .point-selected {background-color: #485566;}.jimu-header-more-popup .page {position: relative; overflow: hidden;}.jimu-header-more-popup .close {position: absolute; top: -04.46428571428571%; right: -04.46428571428571%; border-radius: 50%; background-color: #FFFFFF; cursor: pointer;}.jimu-rtl .jimu-header-more-popup .close {left: -04.46428571428571%; right: auto;}.jimu-header-more-popup .close-inner {width: 80%; height: 80%; margin-left: 10%; margin-top: 10%; border-radius: 50%; background-image: url("images/close.png"); background-repeat: no-repeat; background-position: center center; background-size: 13px;}.jimu-header-more-popup .icon-node {cursor: pointer;}.jimu-header-more-popup .icon-node.jimu-state-selected {background-color: red;}.jimu-header-more-popup img {width: 48px; height: 48px; margin: auto; margin-top: 25%; display: block;}.jimu-header-more-popup .node-label {width: 100%; text-align: center; font-size: 16px; margin-top: 5px; color: white; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block; height: 20px;}@media screen and (max-width:320px){.jimu-header-more-popup .close-inner {background-size: 9px;}}@media screen and (max-width:760px) {.jimu-header-more-popup .node-label {font-size: 13px !important; height: 17px;} .jimu-widget-header-controller .header-section {width: calc(100% - 90px) !important;}}.jimu-more-icon-cover {z-index: 110; position: absolute; left: 0; top: 0; width: 100%; height: 100%;}.jimu-widget-header-controller .esriCTHidden {display: none;}.jimu-widget-header-controller .widget-open-symbol {height: 4px; width: 4px; border-radius: 4px; margin: auto; color: #FFF; background-color: #FFF;}',
"*now":function(n){n(['dojo/i18n!*preload*themes/PlateauTheme/widgets/HeaderController/nls/Widget*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/html dojo/aspect dojo/query dojo/on dojo/Deferred dojo/mouse dojo/topic dojo/dom-construct dojo/dom-geometry jimu/BaseWidget jimu/PoolControllerMixin jimu/tokenUtils jimu/portalUtils jimu/portalUrlUtils jimu/utils jimu/dijit/Message ./PopupTileNodes dijit/registry dojo/NodeList-manipulate".split(" "),function(n,e,p,a,l,b,m,t,v,c,k,g,w,u,q,y,r,f,z,A,B){return n([w,u],{baseClass:"jimu-widget-header-controller jimu-main-background",
maxIconCount:-1,createMoreIcon:!1,switchableElements:{},height:40,openedId:"",moveTopOnActive:!1,postCreate:function(){this.inherited(arguments);this._processGroupSetting();this.switchableElements.title=this.titleNode;this.position&&this.position.height&&(this.height=this.position.height);a.setStyle(this.signInSectionNode,"display","none");this.appConfig&&this.appConfig.logo?(this.logoNode.src=this.appConfig.logo,a.removeClass(this.logoNode,"hide-logo")):(this.logoNode.src="",a.addClass(this.logoNode,
"hide-logo"));this.appConfig.title&&(this.appConfig.title=f.sanitizeHTML(this.appConfig.title));this.appConfig.subtitle&&(this.appConfig.subtitle=f.sanitizeHTML(this.appConfig.subtitle));this.switchableElements.title.innerHTML=this.appConfig.title?this.appConfig.title:"";this.switchableElements.title.title=this.appConfig.title?this.appConfig.title:"";this.appConfig.subtitle&&""!==e.trim(this.appConfig.subtitle)?(this.switchableElements.subtitle=this.subtitleNode,this.switchableElements.subtitle.innerHTML=
this.appConfig.subtitle):(this.subtitleNode.innerHTML="",a.setStyle(this.subtitleNode,"display","none"));this._createDynamicLinks(this.appConfig.links);this._setElementsSize();this.own(m(this.domNode,v.enter,e.hitch(this,function(){var a="",h=r.getServerByUrl(this.appConfig&&this.appConfig.portalUrl||"");r.isArcGIScom(h)&&(h="ArcGIS.com");h&&(a=this.nls.signInTo+" "+h);this.signinLinkNode.title=a})))},startup:function(){this.inherited(arguments);this.resize()},onAction:function(a,h){if("highLight"===
a&&h){var d=b('div[settingid\x3d"'+h.widgetId+'"]',this.domNode)[0];this._highLight(d)}"removeHighLight"===a&&this._removeHighLight()},onSignIn:function(d){this.inherited(arguments);a.setStyle(this.signinLinkNode,"display","none");a.setStyle(this.userNameLinkNode,"display","");a.setStyle(this.signoutLinkNode,"display","");this.userNameLinkNode.innerHTML=d.userId;a.setAttr(this.userNameLinkNode,"href",this.appConfig.portalUrl+"home/user.html");this.popupLinkNode&&(a.setStyle(this.popupSigninNode,"display",
"none"),a.setStyle(this.popupUserNameNode,"display",""),a.setStyle(this.popupSignoutNode,"display",""),b("a",this.popupUserNameNode).html(d.userId).attr("href",this.appConfig.portalUrl+"home/user.html"));this.resize()},onSignOut:function(){this.inherited(arguments);this._onSignOut(this.nls.signin);y.getPortal(this.appConfig.portalUrl).loadSelfInfo().then(e.hitch(this,function(a){this._onSignOut(this.nls.signInTo+" "+a.name)}),e.hitch(this,function(a){console.error(a)}))},_onSignOut:function(d){a.setStyle(this.signinLinkNode,
"display","");a.setAttr(this.signinLinkNode,"innerHTML",d);a.setStyle(this.userNameLinkNode,"display","none");a.setStyle(this.signoutLinkNode,"display","none");this.userNameLinkNode.innerHTML="";this.popupLinkNode&&(a.setStyle(this.popupSigninNode,"display",""),a.setAttr(this.popupSigninNode,"innerHTML",d),a.setStyle(this.popupUserNameNode,"display","none"),a.setStyle(this.popupSignoutNode,"display","none"),b("a",this.popupUserNameNode).html(""));this.resize()},resize:function(){var d=0,h=a.getStyle(this.headerNode,
"float"),x=a.getStyle(this.logoNode,"float"),f=a.getStyle(this.titlesNode,"float"),g=a.getStyle(this.linksNode,"float");h&&"none"!==h&&x&&"none"!==x&&f&&"none"!==f&&g&&"none"!==g?this._resize():setTimeout(e.hitch(this,this.resize),200);b(".jimu-widget-attributetable")[0]&&(d=b(".jimu-widget-attributetable")[0].clientHeight);d?c.publish("changeMapPosition",{bottom:d}):c.publish("changeMapPosition",{bottom:"0px"})},_resize:function(){var d=a.getContentBox(this.domNode);this._showSwitchableElements(["title",
"links","subtitle"]);this._updateTitleNodeWidth();this._getTitleContainerWidth(d);this._createIconNodes(d);this._updateTitleNodeWidth();this.morePane&&this.morePane.resize();this.popupLinkNode&&a.setStyle(jimuConfig.layoutId,{left:a.getContentBox(this.popupLinkNode).w+"px"})},_updateTitleNodeWidth:function(){var d;d=a.getContentBox(this.domNode);d=this._getHeaderContainerWidth(d)-this._getLogoWidth()-this._getTitlesWidth()-this._getSubtitleWidth()-this._getLinkWidth();d=this._getTitlesWidth()+d+40;
"none"===a.getStyle(this.subtitleNode,"display")&&(d+=20,"none"===a.getStyle(this.linksNode,"display")&&(d+=20));150>d?a.setStyle(this.titleNode,"max-width","150px"):a.setStyle(this.titleNode,"max-width",d+"px")},destroy:function(){this.timeoutHandle&&(clearTimeout(this.timeoutHandle),this.timeoutHandle=null);this.morePane&&this.morePane.destroy();this.moreIconPaneCoverNode&&(a.destroy(this.moreIconPaneCoverNode),this.moreIconPaneCoverNode=null);this.popupLinkNode&&this.popupLinksVisible&&this._hidePopupLink();
a.destroy(this.popupLinkNode);this.inherited(arguments)},onAppConfigChanged:function(a,h,b){switch(h){case "attributeChange":this._onAttributeChange(a,b);break;default:return}this.appConfig=a;this.resize()},getOpenedIds:function(){this.inherited(arguments);return""===this.openedId?[]:[this.openedId]},setOpenedIds:function(a){if(0!==a.length){var d=this.getConfigById(a[0]);d&&(this.openedId=a[0],d.widgets&&"openAll"===d.openType?this._showIconContent(d):d.widgets||this._showIconContent(d))}},_onLogoLoad:function(){this.resize()},
_highLight:function(a){this.hlDiv&&this._removeHighLight();if(a){var d=g.getMarginBox(a);this.hlDiv=k.create("div",{style:{position:"absolute",left:d.l+"px",top:d.t+"px",width:d.w+"px",height:d.h+"px"},"class":"icon-highlight"},a,"before")}},_removeHighLight:function(){this.hlDiv&&(k.destroy(this.hlDiv),this.hlDiv=null)},_onAttributeChange:function(d,h){var b;"title"in h&&h.title!==this.appConfig.title&&(b=f.sanitizeHTML(h.title),this.titleNode.innerHTML=b,this.titleNode.title=b);"subtitle"in h&&
h.subtitle!==this.appConfig.subtitle&&(this.subtitleNode.innerHTML=f.sanitizeHTML(h.subtitle));"logo"in h&&h.logo!==this.appConfig.logo&&(h.logo?(a.setAttr(this.logoNode,"src",h.logo),a.removeClass(this.logoNode,"hide-logo")):(a.removeAttr(this.logoNode,"src"),a.addClass(this.logoNode,"hide-logo")));"links"in h&&this._createDynamicLinks(h.links)},_setElementsSize:function(){a.setStyle(this.logoNode,{height:"30px",marginTop:(this.height-30)/2+"px"});a.setStyle(this.titleNode,{lineHeight:this.height+
"px"});a.setStyle(this.subtitleNode,{lineHeight:this.height+"px"});b(".jimu-link",this.domNode).style({lineHeight:this.height+"px"})},_processGroupSetting:function(){this._setMapCanvasAreaToDefault();p.forEach(this.appConfig.widgetPool.groups,function(a){var d;a:{if(this.config.groupSetting)for(d=0;d<this.config.groupSetting.length;d++)if(this.config.groupSetting[d].label===a.label){d=this.config.groupSetting[d].type;break a}d="openAll"}a.openType=d},this)},_createDynamicLinks:function(d){if(window.isRTL){var b=
[];p.forEach(d,function(a){b.unshift(a)});d=b}a.empty(this.dynamicLinksNode);0>=d.length?(a.setStyle(this.linksNode,"display","none"),this.switchableElements.hasOwnProperty("links")&&delete this.switchableElements.links):(this.switchableElements.links=this.linksNode,p.forEach(d,function(d){a.create("a",{href:d.url,target:"_blank",innerHTML:f.sanitizeHTML(d.label),"class":"jimu-link jimu-align-leading jimu-leading-margin1",style:{lineHeight:this.height+"px"}},this.dynamicLinksNode)},this))},_showSwitchableElements:function(d){var b=
this.switchableElements,c;for(c in b)b.hasOwnProperty(c)&&(-1<d.indexOf(c)?(a.setStyle(b[c],"display","block"),b[c].visible=!0):(a.setStyle(b[c],"display","none"),b[c].visible=!1));this.logoClickHandle&&this.logoClickHandle.remove();0>d.indexOf("links")?this.logoClickHandle=m(this.logoNode,"click",e.hitch(this,this._onLogoClick)):(this.popupLinksVisible&&this._hidePopupLink(),a.setStyle(this.logoNode,{cursor:"default"}))},_switchSignin:function(){var a=q.getPortalCredential(this.appConfig.portalUrl);
if(a)this.onSignIn(a);else this.onSignOut()},_onLogoClick:function(){this.popupLinkNode&&a.destroy(this.popupLinkNode);this.popupLinkNode=this._createPopupLinkNode();this.popupLinksVisible?this._hidePopupLink():this._showPopupLink()},_hidePopupLink:function(){a.setStyle(this.popupLinkNode,"display","none");window.isRTL?a.setStyle(jimuConfig.layoutId,{right:0}):a.setStyle(jimuConfig.layoutId,{left:0});this.popupLinksVisible=!1},_showPopupLink:function(){a.setStyle(this.popupLinkNode,"display","");
window.isRTL?a.setStyle(jimuConfig.layoutId,{right:a.getContentBox(this.popupLinkNode).w+"px"}):a.setStyle(jimuConfig.layoutId,{left:a.getContentBox(this.popupLinkNode).w+"px"});this.popupLinksVisible=!0},_createPopupLinkNode:function(){var d,b;a.getContentBox(jimuConfig.mainPageId);d=a.create("div",{"class":"popup-links jimu-main-background",style:{position:"absolute",zIndex:100,top:0,bottom:0}},jimuConfig.mainPageId);window.isRTL?a.setStyle(d,{right:0,left:"50px"}):a.setStyle(d,{left:0,right:"50px"});
b=a.create("div",{"class":"popup-title",style:{height:this.height+"px",width:"100%"}},d);a.create("img",{"class":"logo jimu-float-leading jimu-leading-margin1",src:this.appConfig.logo?this.appConfig.logo:this.folderUrl+"images/app-logo.png",style:{width:"30px",height:"30px",marginTop:(this.height-30)/2+"px"}},b);a.create("div",{"class":"title jimu-float-leading jimu-leading-margin1",innerHTML:f.sanitizeHTML(this.appConfig.title),style:{lineHeight:this.height+"px"}},b);p.forEach(this.appConfig.links,
function(a){this._createLinkNode(d,a,!1)},this);this._createLinkNode(d,{label:"",url:"#"},!1);return d},_createLinkNode:function(d,b,c){d=a.place('\x3cdiv class\x3d"jimu-link"\x3e\x3c/div\x3e',d);a.place('\x3cdiv class\x3d"line"\x3e\x3c/div\x3e',d);c=a.place('\x3cdiv class\x3d"'+(c?"link-section signin":"link-section")+'"\x3e\x3c/div\x3e',d);a.create("a",{href:b.url,"class":"jimu-ellipsis",target:"_blank",innerHTML:f.sanitizeHTML(b.label),title:f.sanitizeHTML(b.label),style:{lineHeight:"66px"}},c);
return d},_onSigninClick:function(){q.signInPortal(this.appConfig.portalUrl,this.appConfig.appId)},_onSignoutClick:function(){this.appConfig.mode?new z({message:this.nls.cantSignOutTip}):q.signOutAll()},_onUserNameClick:function(){},_getHeaderSectionWidth:function(){return a.getMarginBox(this.headerNode).w},_getIconContainerWidth:function(){return a.getMarginBox(this.containerNode).w},_getTitlesWidth:function(){return a.getMarginBox(this.titlesNode).w},_getLinkWidth:function(){return a.getMarginBox(this.linksNode).w},
_getLogoWidth:function(){return a.getMarginBox(this.logoNode).w+12},_getSubtitleWidth:function(){return a.getMarginBox(this.subtitleNode).w},_getHeaderContainerWidth:function(a){var d=this._getIconContainerWidth(),b=this._getLogoWidth();return a.w-d-b},_getTitleContainerWidth:function(a){a=this._getHeaderContainerWidth(a);var d=this._getTitlesWidth(),b=this._getLinkWidth();a<d+b&&(this.switchableElements.hasOwnProperty("links")&&this.switchableElements.links.visible?(this._showSwitchableElements(["title",
"subtitle"]),d=this._getTitlesWidth(),a<d&&this._showSwitchableElements(["title"])):this._showSwitchableElements(["title"]))},_createIconNodes:function(d,c){b(".icon-node",this.containerNode).remove();this._closeDropMenu();var h,e,f=this.getAllConfigs();this.iconWidth=d.h;this._getTitleContainerWidth(d);h=360;h=760>=window.innerWidth?90:360;a.setStyle(this.containerNode,{width:h+"px"});this.maxIconCount=760>=window.innerWidth?2:Math.floor(8);this.maxIconCount>=f.length?(this.headerIconCount=f.length,
this.createMoreIcon=!1):(this.headerIconCount=this.maxIconCount-1,this.createMoreIcon=!0);if(this.createMoreIcon){this._createIconNode({label:this.nls.more});if(!this.openAtStartWidget)for(h=0;h<f.length;h++)f[h].openAtStart&&(e=f[h]);!c&&this.openedId&&this.getConfigById(this.openedId)&&(e=this.getConfigById(this.openedId));e&&this._moveConfigToHeader(e)}var g;for(h=this.headerIconCount-1;0<=h;h--){e=f[h];var k=this._createIconNode(e);e.openAtStart&&(g=k)}g&&!this.openAtStartWidget&&(this._onIconClick(g),
this.openAtStartWidget=g.config.name);this.openedId&&this.getConfigById(this.openedId)&&!1===this.getConfigById(this.openedId).inPanel&&(f=this._getIconNodeById(this.openedId),g=this.widgetManager.getWidgetById(this.openedId),f&&g?this._setOffPanelWidgetPosition(f,g):(this.widgetManager.closeWidget(this.openedId),this.openedId=""))},_createIconNode:function(d){var c,f,g;f=d.label===this.nls.more?this.folderUrl+"images/more_icon.png":d.icon;c=a.create("div",{"class":"icon-node jimu-float-trailing",
title:d.label,settingId:d.id,style:{width:"45px",height:this.height+"px",textAlign:"center"}},this.containerNode);g=a.create("div",{"class":"widget-symbol-div",style:{width:"100%"}},c);a.create("img",{src:f,style:{marginTop:(this.height-30)/2+3+"px",marginBottom:"3px"}},g);f=a.create("div",{"class":"widget-open-symbol esriCTHidden"},c);d.label===this.nls.more?m(c,"click",e.hitch(this,this._showMorePane,d)):m(c,"click",e.hitch(this,function(){this._onIconClick(c)}));c.config=d;c.config.widgets&&1<
c.config.widgets.length&&"dropDown"===c.config.openType&&this._createDropTriangle(c);this.openedId===d.id&&(a.addClass(c,"jimu-state-selected"),b(".widget-open-symbol",this.domNode).addClass("esriCTHidden"),a.removeClass(f,"esriCTHidden"),c.config.widgets&&1<c.config.widgets.length&&"dropDown"===c.config.openType&&this._openDropMenu(c));return c},_createDropTriangle:function(d){var b=a.getMarginBox(d);a.create("div",{"class":"drop-triangle",style:{left:b.l+b.w/2-4+"px"}},d)},_onIconClick:function(a){a.config.widgets&&
1!==a.config.widgets.length&&"openAll"!==a.config.openType?this.dropMenuNode?this._closeDropMenu():this._openDropMenu(a):this.openedId&&this.openedId===a.config.id?this._switchNodeToClose(this.openedId):this.openedId?this._switchNodeToClose(this.openedId).then(e.hitch(this,function(){this._closeDropMenu();this._switchNodeToOpen(a.config.id)})):this._switchNodeToOpen(a.config.id)},_closeDropMenu:function(){this.dropMenuNode&&(a.destroy(this.dropMenuNode),this.dropMenuNode=null)},_openDropMenu:function(d){this.dropMenuNode=
a.create("div",{"class":"jimu-drop-menu jimu-main-background",title:d.config.label,style:{position:"absolute",zIndex:"101"}});a.place(this.dropMenuNode,this.containerNode);p.forEach(d.config.widgets,function(a){this._createDropMenuItem(a)},this);this._setDropMenuPosition(d);this.morePane&&this.morePane.hide()},_createDropMenuItem:function(d){var b=a.create("div",{"class":"menu-item",title:f.sanitizeHTML(d.label),style:{height:this.height+"px"}},this.dropMenuNode);a.create("img",{"class":"jimu-float-leading",
src:d.icon},b);a.create("div",{"class":"label jimu-float-leading",innerHTML:f.sanitizeHTML(d.label)},b);this.own(m(b,"click",e.hitch(this,function(){this._closeDropMenu();this.openedId?this._switchNodeToClose(this.openedId).then(e.hitch(this,function(){this._showIconContent(b.config)})):this._showIconContent(b.config)})));b.config=d;return b},_setDropMenuPosition:function(b){var d={},d=a.getMarginBox(this.dropMenuNode),d=this._getDropdownPosition(b,d);d.zIndex=101;a.setStyle(this.dropMenuNode,f.getPositionStyle(d))},
_getDropdownPosition:function(b,c){var d={},e=a.getMarginBox(b),f=a.getMarginBox(this.domNode);d.top=this.height+1;window.isRTL?d.right=0>e.l+e.w-c.w?0:e.l+e.w-c.w:e.l+c.w>f.w?d.right=0:d.left=e.l;return d},_switchNodeToOpen:function(d){d=this._getIconNodeById(d);b(".icon-node",this.domNode).removeClass("jimu-state-selected");b(".widget-open-symbol",this.domNode).addClass("esriCTHidden");a.addClass(d,"jimu-state-selected");a.removeClass(d.children[1],"esriCTHidden");this._showIconContent(d.config)},
_switchNodeToClose:function(a){b(".icon-node",this.domNode).removeClass("jimu-state-selected");this._setMapCanvasAreaToDefault();b(".widget-open-symbol",this.domNode).addClass("esriCTHidden");var d=this.appConfig.getConfigElementById(a);if(d)return!1===d.inPanel?(this.widgetManager.closeWidget(a),this.openedId="",a=new t,a.resolve(),a):this.panelManager.closePanel(a+"_panel");a=new t;a.resolve();return a},_setMapCanvasAreaToDefault:function(){if(window.appInfo.isRunInMobile){var a=0;b(".jimu-widget-attributetable")[0]&&
(a=b(".jimu-widget-attributetable")[0].clientHeight);a?c.publish("changeMapPosition",{bottom:a}):c.publish("changeMapPosition",{bottom:"0px"})}else c.publish("changeMapPosition",{right:"0px"})},_setMapCanvasArea:function(){if(window.appInfo.isRunInMobile){var a=0;b(".jimu-widget-attributetable")[0]&&(a=b(".jimu-widget-attributetable")[0].clientHeight);if(this.panelManager&&this.panelManager.panels&&this.panelManager.panels[0]&&"normal"===this.panelManager.panels[0].windowState){var e=this.panelManager.getPositionOnMobile(this);
a&&a>e.top?c.publish("changeMapPosition",{bottom:a}):c.publish("changeMapPosition",{bottom:e.top})}else 36<a?c.publish("changeMapPosition",{bottom:a}):window.hasOwnProperty("ontouchstart")||void 0!==window.ontouchstart||760>=window.innerWidth?c.publish("changeMapPosition",{bottom:"36px"}):c.publish("changeMapPosition",{bottom:"0px"})}else this.panelManager&&this.panelManager.activePanel&&"minimized"===this.panelManager.activePanel.windowState?c.publish("changeMapPosition",{right:"0px"}):(c.publish("changeMapPosition",
{right:"360px"}),this._resizeAttributeTableinRTL())},_resizeAttributeTableinRTL:function(){b(".jimu-widget-attributetable")[0]&&(window.isRTL?a.setStyle(b(".jimu-widget-attributetable")[0],"right","0px"):a.setStyle(b(".jimu-widget-attributetable")[0],"left","0px"),b(".dijitTabContainer",b(".jimu-widget-attributetable")[0])[0]&&B.byId(b(".dijitTabContainer",b(".jimu-widget-attributetable")[0])[0].id).resize())},_getIconNodeById:function(a){a=b('.icon-node[settingId\x3d"'+a+'"]',this.domNode);if(0!==
a.length)return a[0]},_unSelectIcon:function(a){b('.icon-node[settingId\x3d"'+a+'"]',this.domNode).removeClass("jimu-state-selected");this.openedId=""},_showIconContent:function(d){!1===d.inPanel?this.widgetManager.loadWidget(d).then(e.hitch(this,function(c){this.openedId=d.id;var f=this._getIconNodeById(d.id);a.setStyle(c.domNode,"zIndex",101);this._setOffPanelWidgetPosition(f,c);this.widgetManager.openWidget(c);this.own(l.after(c,"onClose",e.hitch(this,function(){b(".widget-open-symbol",this.domNode).addClass("esriCTHidden");
this._setMapCanvasAreaToDefault();this._unSelectIcon(d.id)})))})):(this._setMapCanvasArea(),this.panelManager.showPanel(d).then(e.hitch(this,function(c){var f;this.openedId=d.id;f=this._getIconNodeById(this.openedId);b(".icon-node",this.domNode).removeClass("jimu-state-selected");b(".widget-open-symbol",this.domNode).addClass("esriCTHidden");a.addClass(f,"jimu-state-selected");a.removeClass(f.children[1],"esriCTHidden");this.own(l.after(c,"onClose",e.hitch(this,function(){this._unSelectIcon(d.id);
this._setMapCanvasAreaToDefault()})))})))},_setOffPanelWidgetPosition:function(a,b){var d=this._getDropdownPosition(a,this.widgetManager.getWidgetMarginBox(b));b.setPosition(d,this.containerNode)},_showMorePane:function(){var b,c,f=[],g=this.getAllConfigs();for(b=this.headerIconCount;b<g.length;b++)c=g[b],c.id!==this.openedId&&f.push(c);this.morePane&&this.morePane.destroy();this.moreIconPaneCoverNode&&a.destroy(this.moreIconPaneCoverNode);this._closeDropMenu();this.morePane=new A({openedId:this.openedId,
items:f,numWidget:g});this._createCoverNode();a.place(this.morePane.domNode,jimuConfig.mapId);this.morePane.startup();l.after(this.morePane,"onNodeClicked",e.hitch(this,function(b){this._moveConfigToHeader(b.config);this._createIconNodes(a.getContentBox(this.domNode),b.config.id);this._onIconClick(this._getIconNodeById(b.config.id))}),!0);l.after(this.morePane,"hide",e.hitch(this,function(){a.destroy(this.moreIconPaneCoverNode)}),!0)},_moveConfigToHeader:function(a){var b=this.getAllConfigs(),c=a.index;
a.index=b[this.headerIconCount-1].index;b[this.headerIconCount-1].index=c},_createCoverNode:function(){this.moreIconPaneCoverNode=a.create("div",{"class":"jimu-more-icon-cover"},jimuConfig.layoutId)}})});