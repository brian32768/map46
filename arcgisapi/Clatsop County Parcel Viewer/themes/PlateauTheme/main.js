// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://@sbaseurl@/jsapi/jsapi/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"themes/PlateauTheme/_build-generate_module":function(){define(["dojo/text!./common.css","dojo/text!./styles/default/style.css","dojo/i18n!./nls/strings"],function(){})},"url:themes/PlateauTheme/common.css":'.jimu-foldable-dijit {position: relative;}.jimu-foldable-dijit .jimu-panel-title {position: relative;}.jimu-foldable-dijit \x3e .jimu-panel-content {position: absolute; left: 0; right: 0; bottom: 0; -ms-overflow-x: hidden; -ms-overflow-y: auto; overflow-x: hidden; overflow-y: auto;}.foldable-widget-frame {overflow: hidden;}.jimu-foldable-panel {position: absolute;}.jimu-foldable-panel \x3e .jimu-panel-title {color: white; cursor: pointer; background-color: #485566; box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.4); position: relative; font-weight: bold;}.jimu-foldable-panel .title-label {height: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: absolute; left: 16px; right: 110px;}.jimu-foldable-panel .close-btn, .jimu-foldable-panel .max-btn, .jimu-foldable-panel .foldable-btn {width: 35px; height: 100%; border-radius: 11px; opacity: 1; background-position: center; background-repeat: no-repeat;}.jimu-foldable-panel .close-btn {background-image: url("panels/FoldablePanel/images/x.png");}.jimu-foldable-panel .max-btn {background-image: url("panels/FoldablePanel/images/max.png");}.jimu-foldable-panel .max-btn.maximized {background-image: url("panels/FoldablePanel/images/normal.png");}.jimu-foldable-panel .foldable-btn {background-image: url("panels/FoldablePanel/images/fold_up.png");}.jimu-foldable-panel .foldable-btn.folded {background-image: url("panels/FoldablePanel/images/fold_down.png");}.jimu-ismobile .jimu-foldable-panel .foldable-btn {background-image: url("panels/FoldablePanel/images/fold_down.png");}.jimu-ismobile .jimu-foldable-panel .foldable-btn.folded {background-image: url("panels/FoldablePanel/images/fold_up.png");}.jimu-foldable-panel .jimu-widget-frame .foldable-btn {background-image: url("panels/FoldablePanel/images/minus.png");}.jimu-foldable-panel .jimu-widget-frame .foldable-btn.folded {background-image: url("panels/FoldablePanel/images/plus.png");}.jimu-foldable-panel .close-tip {position: absolute; left: 0; top: 0;}.foldable-widget-frame \x3e .title {color: #86909c; background-color: #d9dde0; cursor: pointer;}.foldable-widget-frame \x3e .title \x3e .title-label {font-size: 14px;}.jimu-rtl .jimu-foldable-panel .title-label {left: 110px; right: 16px;}.jimu-on-screen-widget-panel .jimu-panel-title, .jimu-panel-title {background-color: #e4e4e4; color: #333333;}.jimu-on-screen-widget-panel .jimu-panel-title .close-btn {background-image: url("panels/FoldablePanel/images/x.png") !important;}.jimu-on-screen-widget-panel \x3e .jimu-panel-title \x3e .fold-down {background: url("panels/FoldablePanel/images/fold_down.png") no-repeat center center !important;}.jimu-on-screen-widget-panel \x3e .jimu-panel-title \x3e .fold-up {background: url("panels/FoldablePanel/images/fold_up.png") no-repeat center center !important;}.esriCTBorderBottom {border-bottom: 1px solid;}.jimu-dockable-panel{background-color: rgba(0, 0, 0, 0.8); overflow: visible;}.jimu-dockable-panel\x3e.jimu-container{width: 100%; height: 100%; position: relative;}.jimu-dockable-panel\x3e.bar{background-position: center center; background-repeat: no-repeat; cursor: pointer;}.jimu-dockable-panel\x3e.bar.max{background-color: rgba(0, 0, 0, 0.8);}.jimu-dockable-panel\x3e.bar.min{background-color: rgba(0, 0, 0, 0.6);}.jimu-dockable-panel\x3e.bar.min:hover{background-color: rgba(0, 0, 0, 0.8);}.jimu-dockable-panel\x3e.nav{width: 25px; height: 25px; background-position: center center; background-repeat: no-repeat; cursor: pointer;}.jimu-widget-header-controller .header-section{background-color: #FFFFFF;}.jimu-simple-panel {}.jimu-panel {border-radius: 0 !important; box-shadow: none !important;}.jimu-title {max-width: 300px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}@media screen and (max-width:700px) {.jimu-panel {border: 1px solid;} .jimu-leading-margin5 {margin-left: 1em;} .jimu-title, .popup-links .title, .popup-links a {max-width: 225px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}}@media screen and (max-width:360px) {.jimu-title, .popup-links .title, .popup-links a {max-width: 150px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}}.jimu-main-bgcolor {background-color: White !important;}.jimu-widget-header-controller .icon-node.jimu-state-selected {background-color: transparent !important; border-top: none !important;}.jimu-widget-header-controller {box-shadow: none !important;}.jimu-widget-header-controller .icon-node {border: none !important;}.jimu-widget-placeholder {border-radius: 5px; opacity: 1; border: none;}.jimu-widget-placeholder {opacity: 1; background-color: rgba(0, 0, 0, 0.2);}.jimu-widget-placeholder .inner {width: 25px; height: 25px; line-height: 25px; border-radius: 15px; opacity: 1; background-color: rgba(0, 0, 0, 1);}.jimu-widget-header-controller .container-section {float: right !important;}.jimu-widget-homebutton .HomeButton .home {background-image: url("./images/home.png");}.jimu-widget-mylocation .place-holder {background-image: url("./images/locate.png");}.HomeButton .loading {background-image: url("./images/home-spinner.gif") !important;}',
"url:themes/PlateauTheme/styles/default/style.css":".jimu-main-background {background-color: rgb(70, 70, 70)!important;}.jimu-widget-header-controller .jimu-title, .jimu-widget-header-controller .jimu-subtitle {color: rgb(70, 70, 70);}.jimu-widget-header-controller .links .jimu-link {color: rgb(70, 70, 70);}.jimu-widget-header-controller {border-bottom: 1px solid rgb(70, 70, 70);}.jimu-widget-zoomslider, .jimu-widget-extent-navigate {background-color: rgb(70, 70, 70);}.vertical.jimu-widget-zoomslider .zoom-in, .jimu-widget-extent-navigate.vertical .previous {border-bottom: 1px solid #ffffff !important;}.jimu-widget-homebutton .HomeButton .home, .jimu-widget-mylocation, .jimu-widget-mylocation .place-holder, .jimu-widget-zoomslider.vertical .zoom-in, .jimu-widget-zoomslider.vertical .zoom-out, .jimu-widget-extent-navigate.vertical .operation {background-color: rgb(70, 70, 70) !important;}.jimu-panel {border-color: rgb(70, 70, 70);}.jimu-preload-widget-icon-panel \x3e .jimu-panel-title, .jimu-foldable-panel \x3e .jimu-panel-title, .jimu-title-panel \x3e .title {color: rgb(70, 70, 70); background-color: #ffffff; border-color: rgb(70, 70, 70); border-bottom: 2px solid;}.popup-links .title, .popup-links a, .popup-links, .popup-links .line {color: rgb(70, 70, 70); border-color: rgb(70, 70, 70);}.jimu-widget-attributetable-bar {border-color: rgb(70, 70, 70) !important; border-bottom-color: #fff !important;}.jimu-widget-attributetable-bar.open {border: 1px solid rgb(70, 70, 70) !important; border-bottom: none !important;}.jimu-widget-attributetable-move {border-top: 1px solid rgb(70, 70, 70);}.esriOverviewMap.ovwBR .ovwContainer {border-top: 1px solid rgb(70, 70, 70); border-left: 1px solid rgb(70, 70, 70);}.jimu-tab\x3e.control\x3e.tab.jimu-state-selected {background-color: #fff; color: rgb(70, 70, 70); border: none; border-top: 1px solid rgb(70, 70, 70);}.jimu-tab\x3e.control\x3e.tab {background-color: #fff; color: rgb(70, 70, 70); border: 1px solid rgb(70, 70, 70); border-left: none;}.jimu-tab\x3e.control\x3e.tab.jimu-state-selected+.tab {border-left: 1px solid rgb(70, 70, 70); border-right: none;}.jimu-rtl .jimu-tab\x3e.control\x3e.tab {border-right: none;}.jimu-rtl .jimu-tab\x3e.control\x3e.tab {border-left: 1px solid rgb(70, 70, 70);}.jimu-rtl .jimu-tab\x3e.control\x3e.tab.jimu-state-selected+.tab{border-left: none; border-right: 1px solid rgb(70, 70, 70);}.jimu-rtl .jimu-tab\x3e.control\x3e.tab.jimu-state-selected {border-right: none; border-left: none;}",
"*now":function(a){a(['dojo/i18n!*preload*themes/PlateauTheme/nls/main*["ar","bs","cs","da","de","en","el","es","et","fi","fr","he","hi","hr","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sr","sv","th","tr","zh-cn","vi","zh-hk","zh-tw","ROOT"]'])},"*noref":1}});define([],function(){});