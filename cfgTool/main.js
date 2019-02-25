(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/TextEditor.ts":
/*!*******************************!*\
  !*** ./src/app/TextEditor.ts ***!
  \*******************************/
/*! exports provided: window */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "window", function() { return window; });
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_0__);

/*
*  Copyright (C) 1998-2018 by Northwoods Software Corporation. All Rights Reserved.
*/

// HTML + JavaScript text editor menu, made with HTMLInfo
// This is a re-implementation of the default text editor
// This file exposes one instance of HTMLInfo, window.TextEditor
// See also TextEditor.html
var window = {
    'TextEditor': gojs__WEBPACK_IMPORTED_MODULE_0__["HTMLInfo"]
};
(function (window) {
    var TextEditor = new gojs__WEBPACK_IMPORTED_MODULE_0__["HTMLInfo"]();
    var textarea = document.createElement('textarea');
    textarea.id = "myTextArea";
    textarea.addEventListener('input', function (e) {
        var tool = TextEditor.tool;
        if (tool.textBlock === null)
            return;
        var tempText = tool.measureTemporaryTextBlock(textarea.value);
        var scale = textarea.textScale;
        textarea.style.width = 20 + tempText.measuredBounds.width * scale + 'px';
        textarea.style.height = 10 + tempText.measuredBounds.height * scale + "px";
        textarea.rows = tempText.lineCount;
    }, false);
    textarea.addEventListener('keydown', function (e) {
        var tool = TextEditor.tool;
        if (tool.textBlock === null)
            return;
        var keynum = e.which;
        if (keynum === 13) {
            if (tool.textBlock.isMultiline === false)
                e.preventDefault();
            tool.acceptText(gojs__WEBPACK_IMPORTED_MODULE_0__["TextEditingTool"].Enter);
            return;
        }
        else if (keynum === 9) {
            tool.acceptText(gojs__WEBPACK_IMPORTED_MODULE_0__["TextEditingTool"].Tab);
            e.preventDefault();
            return;
        }
        else if (keynum === 27) {
            tool.doCancel();
            if (tool.diagram !== null)
                tool.diagram.doFocus();
        }
    }, false);
    // handle focus:
    textarea.addEventListener('focus', function (e) {
        var tool = TextEditor.tool;
        // 捕获焦点后，将原字符串清空
        tool.textBlock.text = '';
        if (!tool || tool.currentTextEditor === null)
            return;
        if (tool.state === gojs__WEBPACK_IMPORTED_MODULE_0__["TextEditingTool"].StateActive) {
            tool.state = gojs__WEBPACK_IMPORTED_MODULE_0__["TextEditingTool"].StateEditing;
        }
        if (tool.selectsTextOnActivate) {
            textarea.select();
            textarea.setSelectionRange(0, 9999);
        }
    }, false);
    // Disallow blur.
    // If the textEditingTool blurs and the text is not valid,
    // we do not want focus taken off the element just because a user clicked elsewhere.
    textarea.addEventListener('blur', function (e) {
        var tool = TextEditor.tool;
        if (!tool || tool.currentTextEditor === null || tool.state === gojs__WEBPACK_IMPORTED_MODULE_0__["TextEditingTool"].StateNone)
            return;
        textarea.focus();
        if (tool.selectsTextOnActivate) {
            textarea.select();
            textarea.setSelectionRange(0, 9999);
        }
    }, false);
    TextEditor.valueFunction = function () { return textarea.value; };
    TextEditor.mainElement = textarea; // to reference it more easily
    // used to be in doActivate
    TextEditor.show = function (textBlock, diagram, tool) {
        if (!diagram || !diagram.div)
            return;
        if (!(textBlock instanceof gojs__WEBPACK_IMPORTED_MODULE_0__["TextBlock"]))
            return;
        TextEditor.tool = tool; // remember the TextEditingTool for use by listeners
        // This is called during validation, if validation failed:
        if (tool.state === gojs__WEBPACK_IMPORTED_MODULE_0__["TextEditingTool"].StateInvalid) {
            textarea.style.border = '3px solid red';
            textarea.focus();
            return;
        }
        // This part is called during initalization:
        var loc = textBlock.getDocumentPoint(gojs__WEBPACK_IMPORTED_MODULE_0__["Spot"].Center);
        var pos = diagram.position;
        var sc = diagram.scale;
        var textscale = textBlock.getDocumentScale() * sc;
        if (textscale < tool.minimumEditorScale)
            textscale = tool.minimumEditorScale;
        // Add slightly more width/height to stop scrollbars and line wrapping on some browsers
        // +6 is firefox minimum, otherwise lines will be wrapped improperly
        var textwidth = (textBlock.naturalBounds.width * textscale) + 6;
        var textheight = (textBlock.naturalBounds.height * textscale) + 2;
        var left = (loc.x - pos.x) * sc;
        var top = (loc.y - pos.y) * sc;
        textarea.value = textBlock.text;
        // the only way you can mix font and fontSize is if the font inherits and the fontSize overrides
        // in the future maybe have textarea contained in its own div
        diagram.div.style['font'] = textBlock.font;
        var paddingsize = 1;
        textarea.style.cssText =
            'position: absolute;' +
                'z-index: 100;' +
                'font: inherit;' +
                'fontSize: ' + (textscale * 100) + '%;' +
                'lineHeight: normal;' +
                'width: ' + (textwidth) + 'px;' +
                'height: ' + (textheight) + 'px;' +
                'left: ' + ((left - (textwidth / 2) | 0) - paddingsize) + 'px;' +
                'top: ' + ((top - (textheight / 2) | 0) - paddingsize) + 'px;' +
                'text-align: ' + textBlock.textAlign + ';' +
                'margin: 0;' +
                'padding: ' + paddingsize + 'px;' +
                'border: 0;' +
                'outline: none;' +
                'white-space: pre-wrap;' +
                'overflow: hidden;'; // for proper IE wrap
        textarea.textScale = textscale; // attach a value to the textarea, for convenience
        // Show:
        diagram.div.appendChild(textarea);
        // After adding, focus:
        textarea.focus();
        if (tool.selectsTextOnActivate) {
            textarea.select();
            textarea.setSelectionRange(0, 9999);
        }
    };
    TextEditor.hide = function (diagram, tool) {
        TextEditor.tool = null; // forget reference to TextEditingTool
        if (diagram.div)
            diagram.div.removeChild(textarea);
    };
    window.TextEditor = TextEditor;
})(window);


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var _instance_instance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instance/instance.component */ "./src/app/instance/instance.component.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project/project.component */ "./src/app/project/project.component.ts");
/* harmony import */ var _instance_mgt_instance_mgt_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instance-mgt/instance-mgt.component */ "./src/app/instance-mgt/instance-mgt.component.ts");
/* harmony import */ var _line_network_line_network_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./line-network/line-network.component */ "./src/app/line-network/line-network.component.ts");
/* harmony import */ var _product_mgt_product_mgt_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-mgt/product-mgt.component */ "./src/app/product-mgt/product-mgt.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: 'createproject', component: _project_project_component__WEBPACK_IMPORTED_MODULE_3__["ProjectComponent"] },
    { path: 'instanceManagement', component: _instance_mgt_instance_mgt_component__WEBPACK_IMPORTED_MODULE_4__["InstanceMgtComponent"] },
    { path: 'createInstance', component: _instance_instance_component__WEBPACK_IMPORTED_MODULE_2__["InstanceComponent"] },
    { path: 'createLineNetwork', component: _line_network_line_network_component__WEBPACK_IMPORTED_MODULE_5__["LineNetworkComponent"] },
    { path: 'createProduct', component: _product_mgt_product_mgt_component__WEBPACK_IMPORTED_MODULE_6__["ProductMgtComponent"] },
    { path: '**', pathMatch: 'full', redirectTo: '/createproject' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:30px;\r\n}\r\n\r\n.navStyle{\r\n  text-align: center;\r\n  font-family: \"calibri light\", Helvetica, Arial, sans-serif;\r\n  font-size:22px;\r\n}\r\n\r\n.mat-toolbar.mat-primary {\r\n  background: #41aaaa;\r\n}\r\n\r\n.adjustPos{\r\n  margin-top: 8px;\r\n}\r\n\r\n.common{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n}\r\n\r\n.common1{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n  width: 300px;\r\n}\r\n\r\n.titleBlock{\r\n  width:100%;\r\n  /*font-weight:bold;\r\n  background: rgb(235, 235, 210);\r\n  height:30px;\r\n  vertical-align: center;\r\n  height: 15px;\r\n  padding: 10px;\r\n  margin-left: 10px;*/\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\nli {\r\n  list-style-type:none;\r\n}\r\n\r\nul {\r\n  padding-left: 0px;\r\n}\r\n\r\nul li:hover{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\n.ui.grid{\r\n  margin: 0px;\r\n}\r\n\r\n.panel {\r\n  height: 100%;\r\n  padding: 64px 0 0;\r\n  box-sizing: border-box ;\r\n  position: relative;\r\n}\r\n\r\n.head {\r\n  height: 64px;\r\n  position: absolute;\r\n  top: 0 ;\r\n  left: 0 ;\r\n  width: 100%;\r\n}\r\n\r\n.mainPanel {\r\n  height: 100%;\r\n}\r\n\r\n.clickColor{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIscURBQXFEO0VBQ3JELGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsMERBQTBEO0VBQzFELGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLFlBQVk7RUFDWiwyQkFBMkI7RUFDM0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtFQUNWOzs7Ozs7cUJBTW1CO0VBQ25CLDBCQUEwQjtFQUMxQiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsd0JBQXdCO0VBQ3hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsT0FBTztFQUNQLFFBQVE7RUFDUixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZVN0eWxle1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTozMHB4O1xyXG59XHJcblxyXG4ubmF2U3R5bGV7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiBcImNhbGlicmkgbGlnaHRcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6MjJweDtcclxufVxyXG5cclxuLm1hdC10b29sYmFyLm1hdC1wcmltYXJ5IHtcclxuICBiYWNrZ3JvdW5kOiAjNDFhYWFhO1xyXG59XHJcblxyXG4uYWRqdXN0UG9ze1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxufVxyXG5cclxuLmNvbW1vbntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICBmb250LXNpemU6MjBweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMDMpO1xyXG59XHJcblxyXG4uY29tbW9uMXtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICBmb250LXNpemU6MjBweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMDMpO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnRpdGxlQmxvY2t7XHJcbiAgd2lkdGg6MTAwJTtcclxuICAvKmZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgYmFja2dyb3VuZDogcmdiKDIzNSwgMjM1LCAyMTApO1xyXG4gIGhlaWdodDozMHB4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxNXB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7Ki9cclxuICBwYWRkaW5nOiAxMHB4IDBweCAxMHB4IDBweDtcclxuICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjAzKTtcclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICM4ODg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5saSB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOm5vbmU7XHJcbn1cclxuXHJcbnVsIHtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG5cclxudWwgbGk6aG92ZXJ7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMDYpO1xyXG59XHJcblxyXG4udWkuZ3JpZHtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLnBhbmVsIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgcGFkZGluZzogNjRweCAwIDA7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveCA7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uaGVhZCB7XHJcbiAgaGVpZ2h0OiA2NHB4O1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDAgO1xyXG4gIGxlZnQ6IDAgO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWFpblBhbmVsIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5jbGlja0NvbG9ye1xyXG4gIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjA2KTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<div class=\"panel\">\r\n  <!--固定头-->\r\n  <div class=\"head\">\r\n    <mat-toolbar color=\"primary\">\r\n      <mat-toolbar-row>\r\n        <span class=\"adjustPos\">\r\n          <img class=\"icon\" [src]=\"siemensLogo\" />\r\n        </span>\r\n        &nbsp;&nbsp;&nbsp;&nbsp;\r\n        <span class=\"titleStyle\">Configuration Tool</span>\r\n        <div *ngFor=\"let step of steps\">\r\n          &nbsp;<i class=\"angle right icon\"></i>\r\n          <span class=\"navStyle\">{{step}}</span>\r\n        </div>\r\n      </mat-toolbar-row>\r\n    </mat-toolbar>\r\n  </div>\r\n\r\n  <!--主面板-->\r\n  <div class=\"mainPanel\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0\">\r\n      <div fxFlex=\"50px\" style=\"border:2px solid rgba(0,0,0,.03)\" >\r\n        <!--height:100%不能随便用，父组件的高度，如果该组件上还有其他组件，整体高度会超过父组件-->\r\n        <div #navDiv>\r\n          <ul>\r\n            <!--首页-->\r\n            <li>\r\n              <a style=\"display:table-cell; width: 44px; height:44px;text-align: center;vertical-align: middle;\" href=\"javascript:void(0)\" (click)=\"jumpHome($event)\" title=\"Plant Management\">\r\n                <i class=\"th list icon\"></i>\r\n              </a>\r\n            </li>\r\n            <!--产线实例管理-->\r\n            <li>\r\n              <a style=\"display:table-cell; width: 44px; height:44px;text-align: center;vertical-align: middle;\" href=\"javascript:void(0)\" (click)=\"jumpInstanceMgt($event)\" title=\"Line Management\">\r\n                <i class=\"linkify icon\"></i>\r\n              </a>\r\n            </li>\r\n            <!--产线网络配置-->\r\n            <li>\r\n              <a style=\"display:table-cell; width: 44px; height:44px;text-align: center;vertical-align: middle;\" href=\"javascript:void(0)\" (click)=\"jumpProduct($event)\" title=\"Plant View\">\r\n                <i class=\"share alternate icon\"></i>\r\n              </a>\r\n            </li>\r\n            \r\n            <!--python 语法检测-->\r\n            <!--<li>\r\n              <a style=\"display:table-cell; width: 44px; height:44px;text-align: center;vertical-align: middle;\" href=\"javascript:void(0)\" (click)=\"jumpPythonCheck($event)\" title=\"Python Check\">\r\n                <i class=\"search icon\"></i>\r\n              </a>\r\n            </li>-->\r\n          </ul>\r\n        </div>\r\n      </div>\r\n\r\n      <div style=\"margin-top:5px;margin-left:10px;width: 100%;\">\r\n        <router-outlet style=\"padding: 0px\"></router-outlet>\r\n      </div>\r\n  </div>\r\n\r\n  <span>{{'hello' | translate}}</span>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.service */ "./src/app/project.service.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration */ "./src/app/configuration.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(projectService, translate) {
        this.projectService = projectService;
        this.translate = translate;
        this.steps = [];
        this.siemensLogo = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].iconPosition + "siemens.png";
        this.translate.addLangs(['en', 'zh']);
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        $($(this.diagramRef.nativeElement).find("li")[0]).addClass("clickColor");
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.steps.push("Plant Management");
        this.projectService.createProject();
        // 为了改变标题栏
        this.projectService.eventEmit.subscribe(function (obj) {
            _this.steps = [];
            _this.steps.push("Line Management");
            _this.steps.push(obj.projectName);
            _this.projectService.createLine(obj.projectId, obj.projectName);
        });
    };
    AppComponent.prototype.jumpHome = function (obj) {
        this.changeStatus(obj);
        this.steps = [];
        this.steps.push("Plant Management");
        this.projectService.createProject();
    };
    AppComponent.prototype.jumpInstanceMgt = function (obj) {
        this.changeStatus(obj);
        this.steps = [];
        this.steps.push("Line Management");
        // "0XALLLINES"读全部line的标识
        this.projectService.createLine("0XALLLINES", "");
    };
    AppComponent.prototype.jumpProduct = function (obj) {
        this.changeStatus(obj);
        this.steps = [];
        this.steps.push("Plant View");
        this.projectService.createProduct();
    };
    AppComponent.prototype.jumpPythonCheck = function (obj) {
        this.changeStatus(obj);
        this.steps = [];
        this.steps.push("Python Lint Check");
        this.projectService.checkPyLint();
    };
    AppComponent.prototype.changeStatus = function (obj) {
        // 不能是obj.target
        $($(obj.currentTarget).parent()[0]).addClass("clickColor");
        $($(obj.currentTarget).parent()[0]).siblings().removeClass("clickColor");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('navDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], AppComponent.prototype, "diagramRef", void 0);
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project.service */ "./src/app/project.service.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _instance_instance_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./instance/instance.component */ "./src/app/instance/instance.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./project/project.component */ "./src/app/project/project.component.ts");
/* harmony import */ var _project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./project-cfg/project-cfg.component */ "./src/app/project-cfg/project-cfg.component.ts");
/* harmony import */ var _line_element_line_element_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./line-element/line-element.component */ "./src/app/line-element/line-element.component.ts");
/* harmony import */ var _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./io-device/io-device.component */ "./src/app/io-device/io-device.component.ts");
/* harmony import */ var _io_io_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./io/io.component */ "./src/app/io/io.component.ts");
/* harmony import */ var _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./scanner/scanner.component */ "./src/app/scanner/scanner.component.ts");
/* harmony import */ var _dynamicIoDevice_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./dynamicIoDevice.service */ "./src/app/dynamicIoDevice.service.ts");
/* harmony import */ var _dynamicLinePublish_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./dynamicLinePublish.service */ "./src/app/dynamicLinePublish.service.ts");
/* harmony import */ var _dynamicIoDevicePanel_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dynamicIoDevicePanel.service */ "./src/app/dynamicIoDevicePanel.service.ts");
/* harmony import */ var _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./dynamicProtocol.service */ "./src/app/dynamicProtocol.service.ts");
/* harmony import */ var _dynamicIoDevice_directive__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./dynamicIoDevice.directive */ "./src/app/dynamicIoDevice.directive.ts");
/* harmony import */ var _dynamicIoDevicePanel_directive__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./dynamicIoDevicePanel.directive */ "./src/app/dynamicIoDevicePanel.directive.ts");
/* harmony import */ var _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./dynamicProtocol.directive */ "./src/app/dynamicProtocol.directive.ts");
/* harmony import */ var _plc_plc_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./plc/plc.component */ "./src/app/plc/plc.component.ts");
/* harmony import */ var _instance_mgt_instance_mgt_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./instance-mgt/instance-mgt.component */ "./src/app/instance-mgt/instance-mgt.component.ts");
/* harmony import */ var _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./instance-cfg/instance-cfg.component */ "./src/app/instance-cfg/instance-cfg.component.ts");
/* harmony import */ var _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./hintdialog/hintdialog.component */ "./src/app/hintdialog/hintdialog.component.ts");
/* harmony import */ var _line_network_line_network_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./line-network/line-network.component */ "./src/app/line-network/line-network.component.ts");
/* harmony import */ var _lines_lines_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./lines/lines.component */ "./src/app/lines/lines.component.ts");
/* harmony import */ var _product_mgt_product_mgt_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./product-mgt/product-mgt.component */ "./src/app/product-mgt/product-mgt.component.ts");
/* harmony import */ var _product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./product-cfg/product-cfg.component */ "./src/app/product-cfg/product-cfg.component.ts");
/* harmony import */ var _button_button_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./button/button.component */ "./src/app/button/button.component.ts");
/* harmony import */ var _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./opcua/opcua.component */ "./src/app/opcua/opcua.component.ts");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ng2-file-upload */ "./node_modules/ng2-file-upload/index.js");
/* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _upload_dialog_upload_dialog_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./upload-dialog/upload-dialog.component */ "./src/app/upload-dialog/upload-dialog.component.ts");
/* harmony import */ var _optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./optconfirmdialog/optconfirmdialog.component */ "./src/app/optconfirmdialog/optconfirmdialog.component.ts");
/* harmony import */ var _usb_usb_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./usb/usb.component */ "./src/app/usb/usb.component.ts");
/* harmony import */ var _message_type2_message_type2_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./message-type2/message-type2.component */ "./src/app/message-type2/message-type2.component.ts");
/* harmony import */ var _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./changeover/changeover.component */ "./src/app/changeover/changeover.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm5/ngx-translate-http-loader.js");
/* harmony import */ var _box_bind_box_bind_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./box-bind/box-bind.component */ "./src/app/box-bind/box-bind.component.ts");
/* harmony import */ var _publish_publish_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./publish/publish.component */ "./src/app/publish/publish.component.ts");
/* harmony import */ var _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./plc-device/plc-device.component */ "./src/app/plc-device/plc-device.component.ts");
/* harmony import */ var _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./proximity-switch/proximity-switch.component */ "./src/app/proximity-switch/proximity-switch.component.ts");
/* harmony import */ var ngx_logger__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ngx-logger */ "./node_modules/ngx-logger/esm5/ngx-logger.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























































// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_46__["TranslateHttpLoader"](http);
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _instance_instance_component__WEBPACK_IMPORTED_MODULE_8__["InstanceComponent"],
                _project_project_component__WEBPACK_IMPORTED_MODULE_16__["ProjectComponent"],
                _project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_17__["ProjectCfgComponent"],
                _line_element_line_element_component__WEBPACK_IMPORTED_MODULE_18__["LineElementComponent"],
                _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_19__["IoDeviceComponent"],
                _io_io_component__WEBPACK_IMPORTED_MODULE_20__["IoComponent"],
                _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_21__["ScannerComponent"],
                _dynamicIoDevice_directive__WEBPACK_IMPORTED_MODULE_26__["DynamicComponentDirective"],
                _dynamicIoDevicePanel_directive__WEBPACK_IMPORTED_MODULE_27__["DynamicIoDevicePanelDirective"],
                _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_28__["DynamicProtocolDirective"],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_39__["FileDropDirective"],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_39__["FileSelectDirective"],
                _plc_plc_component__WEBPACK_IMPORTED_MODULE_29__["PlcComponent"],
                _instance_mgt_instance_mgt_component__WEBPACK_IMPORTED_MODULE_30__["InstanceMgtComponent"],
                _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_31__["InstanceCfgComponent"],
                _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_32__["HintdialogComponent"],
                _line_network_line_network_component__WEBPACK_IMPORTED_MODULE_33__["LineNetworkComponent"],
                _lines_lines_component__WEBPACK_IMPORTED_MODULE_34__["LinesComponent"],
                _product_mgt_product_mgt_component__WEBPACK_IMPORTED_MODULE_35__["ProductMgtComponent"],
                _product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_36__["ProductCfgComponent"],
                _button_button_component__WEBPACK_IMPORTED_MODULE_37__["ButtonComponent"],
                _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_38__["OpcuaComponent"],
                _upload_dialog_upload_dialog_component__WEBPACK_IMPORTED_MODULE_40__["UploadDialogComponent"],
                _optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_41__["OptconfirmdialogComponent"],
                _usb_usb_component__WEBPACK_IMPORTED_MODULE_42__["UsbComponent"],
                _message_type2_message_type2_component__WEBPACK_IMPORTED_MODULE_43__["MessageType2Component"],
                _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_44__["ChangeoverComponent"],
                _box_bind_box_bind_component__WEBPACK_IMPORTED_MODULE_47__["BoxBindComponent"],
                _publish_publish_component__WEBPACK_IMPORTED_MODULE_48__["PublishComponent"],
                _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_49__["PlcDeviceComponent"],
                _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_50__["ProximitySwitchComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_10__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_12__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSidenavModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_15__["HttpModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatStepperModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__["NgbModule"].forRoot(),
                _angular_http__WEBPACK_IMPORTED_MODULE_15__["HttpModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTooltipModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_45__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_45__["TranslateLoader"],
                        useFactory: HttpLoaderFactory,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClient"]]
                    }
                }),
                ngx_logger__WEBPACK_IMPORTED_MODULE_51__["LoggerModule"].forRoot({
                    serverLoggingUrl: '/api/logs',
                    level: ngx_logger__WEBPACK_IMPORTED_MODULE_51__["NgxLoggerLevel"].DEBUG,
                    serverLogLevel: ngx_logger__WEBPACK_IMPORTED_MODULE_51__["NgxLoggerLevel"].OFF
                })
            ],
            providers: [_project_service__WEBPACK_IMPORTED_MODULE_4__["ProjectService"], _dynamicIoDevice_service__WEBPACK_IMPORTED_MODULE_22__["DynamicComponentService"], _dynamicIoDevicePanel_service__WEBPACK_IMPORTED_MODULE_24__["DynamicIoDevicePanelService"], _dynamicLinePublish_service__WEBPACK_IMPORTED_MODULE_23__["DynamicLinePublishService"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"], _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_25__["DynamicProtocolService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
            entryComponents: [_instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_31__["InstanceCfgComponent"], _usb_usb_component__WEBPACK_IMPORTED_MODULE_42__["UsbComponent"], _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_19__["IoDeviceComponent"], _publish_publish_component__WEBPACK_IMPORTED_MODULE_48__["PublishComponent"], _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_49__["PlcDeviceComponent"],
                _project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_17__["ProjectCfgComponent"], _io_io_component__WEBPACK_IMPORTED_MODULE_20__["IoComponent"], _upload_dialog_upload_dialog_component__WEBPACK_IMPORTED_MODULE_40__["UploadDialogComponent"], _optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_41__["OptconfirmdialogComponent"], _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_44__["ChangeoverComponent"], _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_50__["ProximitySwitchComponent"],
                _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_21__["ScannerComponent"], _plc_plc_component__WEBPACK_IMPORTED_MODULE_29__["PlcComponent"], _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_38__["OpcuaComponent"], _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_32__["HintdialogComponent"], _product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_36__["ProductCfgComponent"], _button_button_component__WEBPACK_IMPORTED_MODULE_37__["ButtonComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/box-bind/box-bind.component.css":
/*!*************************************************!*\
  !*** ./src/app/box-bind/box-bind.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2JveC1iaW5kL2JveC1iaW5kLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/box-bind/box-bind.component.html":
/*!**************************************************!*\
  !*** ./src/app/box-bind/box-bind.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height: 100%;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"center center\" fxLayoutGap=\"0px\"\n  fxLayoutGap.xs=\"0\">\n\n  <div style=\"height: 170px;\" fxFlex=\"200px\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <p style=\"height: 30px;\">Box Serial Number:</p>\n    <p style=\"height: 30px;\">MindSphere Onboarding Key:</p>\n  </div>\n  <div style=\"height: 170px;\" fxFlex=\"300px\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<select [ngModel]=\"selectedCycle\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onCycleChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of cycles; let j = index\">{{item}}</option>\n    </select>-->\n    <input style=\"width:100%;height: 30px;;border:1px solid black\" [(ngModel)]=\"gwId\"/>\n    <textarea style=\"width: 300px;border:1px solid black\" matInput rows=\"10\" [(ngModel)]=\"onboardingKey\"></textarea>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/box-bind/box-bind.component.ts":
/*!************************************************!*\
  !*** ./src/app/box-bind/box-bind.component.ts ***!
  \************************************************/
/*! exports provided: BoxBindComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxBindComponent", function() { return BoxBindComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var classObj;
var BoxBindComponent = /** @class */ (function () {
    function BoxBindComponent(http) {
        this.http = http;
        // 保存从父组件传递过来的lineId
        this._lineId = "";
        this._saveFlag = "";
        this.gwId = "";
        this.onboardingKey = "";
        classObj = this;
    }
    Object.defineProperty(BoxBindComponent.prototype, "lineId", {
        // 父组件传递line id获得该line下的配置
        set: function (id) {
            if (id != "") {
                this._lineId = id;
                this.readBoxCfgById(id);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxBindComponent.prototype, "saveFlag", {
        set: function (str) {
            if (str != "") {
                this._saveFlag = str;
                this.saveBoxCfg();
            }
        },
        enumerable: true,
        configurable: true
    });
    BoxBindComponent.prototype.ngOnInit = function () {
    };
    BoxBindComponent.prototype.saveBoxCfg = function () {
        var boxCfg = new BoxCfg();
        boxCfg.setLineId(this._lineId);
        boxCfg.setGwId(this.gwId);
        boxCfg.setOnBoardingKey(this.onboardingKey);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].backendUrl + '/lines/' + this._lineId + '/boxBinding';
        return this.http.post(url, boxCfg, options)
            .subscribe(function (data) {
        }, function (err) {
        }, function () { });
    };
    BoxBindComponent.prototype.readBoxCfgById = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].backendUrl + '/lines/' + id + '/boxBinding';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    classObj._lineId = pros.lineId;
                    classObj.gwId = pros.gwId;
                    classObj.onboardingKey = pros.onboardingKey;
                }
            }
        }, function (err) {
        }, function () { return console.log('Call Complete'); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BoxBindComponent.prototype, "lineId", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BoxBindComponent.prototype, "saveFlag", null);
    BoxBindComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-box-bind',
            template: __webpack_require__(/*! ./box-bind.component.html */ "./src/app/box-bind/box-bind.component.html"),
            styles: [__webpack_require__(/*! ./box-bind.component.css */ "./src/app/box-bind/box-bind.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], BoxBindComponent);
    return BoxBindComponent;
}());

var BoxCfg = /** @class */ (function () {
    function BoxCfg() {
    }
    BoxCfg.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    BoxCfg.prototype.getLineId = function () {
        return this.lineId;
    };
    BoxCfg.prototype.setGwId = function (gwId) {
        this.gwId = gwId;
    };
    BoxCfg.prototype.getGwId = function () {
        return this.gwId;
    };
    BoxCfg.prototype.setOnBoardingKey = function (onboardingKey) {
        this.onboardingKey = onboardingKey;
    };
    BoxCfg.prototype.getOnboardingKey = function () {
        return this.onboardingKey;
    };
    return BoxCfg;
}());


/***/ }),

/***/ "./src/app/button/button.component.css":
/*!*********************************************!*\
  !*** ./src/app/button/button.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n  width:100%;\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n  text-align: center;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\n.button{\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  cursor: pointer;\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: transparent;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n  text-align: center;\r\n  margin: 0;\r\n  line-height: 36px;\r\n  border-radius: 2px;\r\n  -webkit-transform: translate3d(0,0,0);\r\n          transform: translate3d(0,0,0);\r\n  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n  background:rgb(224, 224,224);\r\n  width: 50px\r\n}\r\n\r\np {\r\n  margin-bottom: 2px;\r\n  margin-left: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtFQUNWLDBCQUEwQjtFQUMxQiwwQkFBMEI7RUFDMUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixVQUFVO0VBQ1Ysd0NBQXdDO0VBQ3hDLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIsU0FBUztFQUNULGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3Qiw4RkFBOEY7RUFDOUYsNEJBQTRCO0VBQzVCO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpdGxlQmxvY2t7XHJcbiAgd2lkdGg6MTAwJTtcclxuICBwYWRkaW5nOiAxMHB4IDBweCAxMHB4IDBweDtcclxuICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjAzKTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbmgyIHtcclxuICBtYXJnaW46MHB4IDEuMjVyZW07XHJcbiAgcGFkZGluZzogMHB4IDBweCAwcHggMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5idXR0b257XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcclxuICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgb3V0bGluZTogMDtcclxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbjogMDtcclxuICBsaW5lLWhlaWdodDogMzZweDtcclxuICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLDAsMCk7XHJcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcclxuICBiYWNrZ3JvdW5kOnJnYigyMjQsIDIyNCwyMjQpO1xyXG4gIHdpZHRoOiA1MHB4XHJcbn1cclxuXHJcbnAge1xyXG4gIG1hcmdpbi1ib3R0b206IDJweDtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/button/button.component.html":
/*!**********************************************!*\
  !*** ./src/app/button/button.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n  <!--标题行-->\n  <div class=\"titleBlock\">\n    <h2 style=\"font-size: 15px\">I/O Device Properties</h2>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n      <div style=\"height: 70px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <p style=\"height: 30px;\">Name</p>\n        <p style=\"height: 30px;\">Alias</p>\n      </div>\n      <div style=\"height: 70px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"ioDeviceName\" (blur)=\"copyToAlias()\">\n        <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"displayName\">\n      </div>\n    \n      <!--间距调整-->\n      <div></div>\n    </div>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Data source protocol selection:</p>\n    <select #mySelect style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onProtocolChange($event)\">\n      <option [value]=\"protocol.name\" *ngFor=\"let protocol of protocols;\">{{protocol.name}}</option>\n    </select>\n\n    <div style=\"height: 5px;width: 100%;\"></div>\n    <ng-template appDynamicProtocol ></ng-template>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Pre-processing Algorithm:</p>\n    <select #mySelectAlgo style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onAlgoChange($event)\">\n      <option [value]=\"algo.name\" *ngFor=\"let algo of algorithms;\">{{algo.name}}</option>\n    </select>\n  </div>\n\n  <!--封装第三行-->\n  <div style=\"width: 100%;height:50px;background: #F7F7F7;width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n    <button class=\"button\" (click)=\"saveInfo()\">Save</button>\n    <div></div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/button/button.component.ts":
/*!********************************************!*\
  !*** ./src/app/button/button.component.ts ***!
  \********************************************/
/*! exports provided: ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return ButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamicProtocol.service */ "./src/app/dynamicProtocol.service.ts");
/* harmony import */ var _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamicProtocol.directive */ "./src/app/dynamicProtocol.directive.ts");
/* harmony import */ var _io_io_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../io/io.component */ "./src/app/io/io.component.ts");
/* harmony import */ var _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plc/plc.component */ "./src/app/plc/plc.component.ts");
/* harmony import */ var _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../opcua/opcua.component */ "./src/app/opcua/opcua.component.ts");
/* harmony import */ var _deviceOpration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../deviceOpration */ "./src/app/deviceOpration.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(componentFactoryResolver, dynamicProtocolService) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.dynamicProtocolService = dynamicProtocolService;
        _this.selectedProtocol = "S7";
        _this.selectedAlgo = "Max";
        _this.operate = "new";
        _this.componentIns = {};
        _this.updateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        return _this;
    }
    ButtonComponent.prototype.setSelectedProtocol = function (selectedProtocol) {
        this.selectedProtocol = selectedProtocol;
    };
    ButtonComponent.prototype.setSelectedAlgo = function (selectedAlgo) {
        this.selectedAlgo = selectedAlgo;
    };
    ButtonComponent.prototype.setOperate = function (operate) {
        this.operate = operate;
    };
    ButtonComponent.prototype.setNodecfg = function (nodecfg) {
        this.nodecfg = nodecfg;
    };
    /**
     * 切换时调用
     * @param obj
     */
    ButtonComponent.prototype.onProtocolChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getProtocols()[index].getName();
        this.selectedProtocol = this.getConvertNameMap().get(name);
        this.displayProtocolCpt(this.selectedProtocol, "new", "");
    };
    ButtonComponent.prototype.onAlgoChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getAlgos()[index].getName();
        this.selectedAlgo = name;
    };
    ButtonComponent.prototype.displayProtocolCpt = function (componentName, operation, nodeCfg) {
        // 根据名称构造不同的组件
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicProtocolService.getComponent(componentName));
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentIns = componentRef.instance;
        if (operation == 'new') {
            // 自动补全功能
            if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.updateAutoCompleteOpcua(this.componentIns);
            }
        }
        else if (operation == 'echo') {
            if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                return;
            }
            var nodeObj = nodeCfg;
            // 根据不同的设备进行初始化
            if (this.componentIns instanceof _io_io_component__WEBPACK_IMPORTED_MODULE_3__["IoComponent"]) {
                //用于调节DIO与Digital I/O
                this.selectedProtocol = "Digital I/O";
            }
            else if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.selectedProtocol = "OPC UA";
                this.updateAutoCompleteOpcua(this.componentIns);
            }
            this.componentIns.cfgComponentInfo(nodeObj);
        }
    };
    ButtonComponent.prototype.ngOnInit = function () {
        this.initProtocol();
        this.initAlgos();
        this.initNameMap();
        this.displayProtocolCpt(this.selectedProtocol, this.operate, this.nodecfg);
    };
    ButtonComponent.prototype.initProtocol = function () {
        var p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("S7");
        p.setNo(0);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("Digital I/O");
        p.setNo(1);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("OPC UA");
        p.setNo(2);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("USB");
        p.setNo(3);
        this.getProtocols().push(p);
    };
    ButtonComponent.prototype.ngAfterViewInit = function () {
        // 根据节点的类型，回显select
        for (var i = 0; i < this.getProtocols().length; i++) {
            if (this.getProtocols()[i].getName() == this.selectedProtocol) {
                this.mySelect.nativeElement.selectedIndex = this.getProtocols()[i].getNo();
                break;
            }
        }
        // 根据节点的类型，回显select
        for (var i = 0; i < this.getAlgos().length; i++) {
            if (this.getAlgos()[i].getName() == this.selectedAlgo) {
                this.mySelectAlgo.nativeElement.selectedIndex = this.getAlgos()[i].getNo();
                break;
            }
        }
    };
    /**
     * 保存button配置信息
     */
    ButtonComponent.prototype.saveInfo = function () {
        var bi = new DeviceInfo();
        var ds = this.componentIns.saveComponentInfo();
        if (typeof (ds) == "undefined" || ds == null) {
            return;
        }
        bi.setIoDeviceId(this.getIoDeviceId());
        bi.setIoDeviceName(this.getIoDeviceName());
        bi.setDisplayName(this.getAlias());
        bi.setType(this.getType());
        var tmpDs = new DataSource();
        tmpDs.setProtocol(ds.protocol);
        tmpDs.setConfig(JSON.stringify(ds));
        bi.setDataSource(tmpDs);
        bi.setPreprocessing(this.selectedAlgo);
        this.updateEmitter.emit(bi);
        alert("Save success!");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ButtonComponent.prototype, "mySelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectAlgo'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ButtonComponent.prototype, "mySelectAlgo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicProtocolDirective"]),
        __metadata("design:type", _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicProtocolDirective"])
    ], ButtonComponent.prototype, "componentHost", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ButtonComponent.prototype, "updateEmitter", void 0);
    ButtonComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-button-clk-evt',
            template: __webpack_require__(/*! ./button.component.html */ "./src/app/button/button.component.html"),
            styles: [__webpack_require__(/*! ./button.component.css */ "./src/app/button/button.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__["DynamicProtocolService"]])
    ], ButtonComponent);
    return ButtonComponent;
}(_deviceOpration__WEBPACK_IMPORTED_MODULE_6__["DeviceOperation"]));

var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    DataSource.prototype.setConfig = function (config) {
        this.config = config;
    };
    return DataSource;
}());
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo() {
        this.dataSource = new DataSource();
    }
    DeviceInfo.prototype.getType = function () {
        return this.type;
    };
    DeviceInfo.prototype.setType = function (type) {
        this.type = type;
    };
    DeviceInfo.prototype.getDataSource = function () {
        return this.dataSource;
    };
    DeviceInfo.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
    };
    DeviceInfo.prototype.getPreprocessing = function () {
        return this.preprocessing;
    };
    DeviceInfo.prototype.setPreprocessing = function (preprocessing) {
        this.preprocessing = preprocessing;
    };
    DeviceInfo.prototype.setAlgorithm = function (algorithm) {
        this.preprocessing = algorithm;
    };
    DeviceInfo.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    DeviceInfo.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    DeviceInfo.prototype.getIoDeviceName = function () {
        return this.ioDeviceName;
    };
    DeviceInfo.prototype.setIoDeviceName = function (ioDeviceName) {
        this.ioDeviceName = ioDeviceName;
    };
    DeviceInfo.prototype.getDispalyName = function () {
        return this.displayName;
    };
    DeviceInfo.prototype.setDisplayName = function (displayName) {
        this.displayName = displayName;
    };
    return DeviceInfo;
}());


/***/ }),

/***/ "./src/app/changeover/changeover.component.css":
/*!*****************************************************!*\
  !*** ./src/app/changeover/changeover.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n    width:100%;\r\n    padding: 10px 0px 10px 0px;\r\n    background:rgba(0,0,0,.03);\r\n    text-align: center;\r\n  }\r\n  \r\n  h2 {\r\n    margin:0px 1.25rem;\r\n    padding: 0px 0px 0px 0px;\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n    color: black;\r\n  }\r\n  \r\n  .button{\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    cursor: pointer;\r\n    outline: 0;\r\n    -webkit-tap-highlight-color: transparent;\r\n    display: inline-block;\r\n    white-space: nowrap;\r\n    text-decoration: none;\r\n    vertical-align: baseline;\r\n    text-align: center;\r\n    margin: 0;\r\n    line-height: 36px;\r\n    border-radius: 2px;\r\n    -webkit-transform: translate3d(0,0,0);\r\n            transform: translate3d(0,0,0);\r\n    transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n    background:rgb(224, 224,224);\r\n    width: 50px\r\n  }\r\n  \r\n  p {\r\n    margin-bottom: 2px;\r\n    margin-left: 10px;\r\n  }\r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhbmdlb3Zlci9jaGFuZ2VvdmVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0lBQ1YsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtFQUNkOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLFVBQVU7SUFDVix3Q0FBd0M7SUFDeEMscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixxQ0FBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLDhGQUE4RjtJQUM5Riw0QkFBNEI7SUFDNUI7RUFDRjs7RUFFQTtJQUNFLGtCQUFrQjtJQUNsQixpQkFBaUI7RUFDbkIiLCJmaWxlIjoic3JjL2FwcC9jaGFuZ2VvdmVyL2NoYW5nZW92ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJsb2Nre1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGgyIHtcclxuICAgIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICBcclxuICAuYnV0dG9ue1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBsaW5lLWhlaWdodDogMzZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApO1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcclxuICAgIGJhY2tncm91bmQ6cmdiKDIyNCwgMjI0LDIyNCk7XHJcbiAgICB3aWR0aDogNTBweFxyXG4gIH1cclxuICBcclxuICBwIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gIH1cclxuICAiXX0= */"

/***/ }),

/***/ "./src/app/changeover/changeover.component.html":
/*!******************************************************!*\
  !*** ./src/app/changeover/changeover.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n  <!--标题行-->\n  <div class=\"titleBlock\">\n    <h2 style=\"font-size: 15px\">Edit changeOver</h2>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Trigger:</p>\n    <select #mySelectCo style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onVariableChange($event)\">\n      <option [value]=\"variable.name\" *ngFor=\"let variable of changeOverArr;\">{{variable.name}}</option>\n    </select>\n\n    <div style=\"height: 5px;width: 100%;\"></div>\n    \n    <div style=\"margin-left: 10px;\">\n      <mat-checkbox [(ngModel)]=\"status\" color=\"primary\">Reset Time:</mat-checkbox>\n      <select #mySelectTime style=\"width:162px;height: 30px;margin-left: 10px\" (change)=\"onTimeChange($event)\">\n        <option [value]=\"time.name\" *ngFor=\"let time of timeArr;\">{{time.name}}</option>\n      </select>\n    </div>\n\n    <div style=\"margin-left: 10px;\">\n      <!--<mat-checkbox [disabled]=\"hintDisable\" [(ngModel)]=\"hintStatus\" color=\"primary\">Trigger by I/O Device</mat-checkbox>-->\n      <mat-checkbox [(ngModel)]=\"hintStatus\" (change)=\"changeSelect($event)\" color=\"primary\">Trigger by I/O Device</mat-checkbox>\n    </div>\n\n    <div style=\"height: 5px;width: 100%;\"></div>\n    <div style=\"width: 100%;height:50px;background: #F7F7F7;width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n      <button class=\"button\" (click)=\"saveInfo()\">Save</button>\n      <div></div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/changeover/changeover.component.ts":
/*!****************************************************!*\
  !*** ./src/app/changeover/changeover.component.ts ***!
  \****************************************************/
/*! exports provided: ChangeoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeoverComponent", function() { return ChangeoverComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ChangeoverComponent = /** @class */ (function () {
    function ChangeoverComponent() {
        this.changeOverArr = new Array();
        this.timeArr = new Array();
        this.status = false;
        // 被选择中的change over变量
        this.selectedCoVar = "ProductID";
        // 选择的时间
        this.selectedTime = "00:00:00";
        //private hintDisable: boolean = true;
        this.hintStatus = false;
        this.coUpdateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.coInpsUpdateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ChangeoverComponent.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    ChangeoverComponent.prototype.setHintStatus = function (hintStatus) {
        this.hintStatus = hintStatus;
    };
    ChangeoverComponent.prototype.ngOnInit = function () {
        this.initChangeOverVar();
        this.initTimes();
    };
    ChangeoverComponent.prototype.initChangeOverVar = function () {
        var p = new SelectItem();
        p.setName("ProductID");
        p.setNo(0);
        this.changeOverArr.push(p);
        //p = new SelectItem();
        //p.setName("OrderID");
        //p.setNo(1);
        //this.changeOverArr.push(p);
    };
    ChangeoverComponent.prototype.changeSelect = function (obj) {
        var selectedStatus = obj.checked;
        this.hintStatus = selectedStatus;
        //this.changeOverInpService.eventEmitCoInps.emit({'status':selectedStatus});
        this.coInpsUpdateEmitter.emit({ 'status': selectedStatus });
    };
    ChangeoverComponent.prototype.initTimes = function () {
        var p = new SelectItem();
        p.setName("00:00:00");
        p.setNo(0);
        this.timeArr.push(p);
        p = new SelectItem();
        p.setName("08:00:00");
        p.setNo(1);
        this.timeArr.push(p);
        p = new SelectItem();
        p.setName("12:00:00");
        p.setNo(2);
        this.timeArr.push(p);
        p = new SelectItem();
        p.setName("18:00:00");
        p.setNo(3);
        this.timeArr.push(p);
    };
    /**
     * 切换时调用
     * @param obj
     */
    ChangeoverComponent.prototype.onVariableChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        this.selectedCoVar = this.changeOverArr[index].name;
    };
    ChangeoverComponent.prototype.onTimeChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        this.selectedTime = this.timeArr[index].name;
    };
    /**
     * 保存button配置信息
     */
    ChangeoverComponent.prototype.saveInfo = function () {
        var obj = {};
        obj["ioDeviceId"] = this.ioDeviceId;
        obj["event"] = this.selectedCoVar;
        var tmp = this.status == true ? this.selectedTime : "";
        obj["resetTime"] = tmp;
        obj["hintStatus"] = this.hintStatus;
        //this.changeOverService.eventEmitCoCfg.emit(obj);
        this.coUpdateEmitter.emit(obj);
    };
    ChangeoverComponent.prototype.ngAfterViewInit = function () {
        // 根据节点的类型，回显select
        for (var i = 0; i < this.changeOverArr.length; i++) {
            if (this.changeOverArr[i].name == this.selectedCoVar) {
                this.mySelectCo.nativeElement.selectedIndex = this.changeOverArr[i].no;
                break;
            }
        }
        for (var i = 0; i < this.timeArr.length; i++) {
            if (this.timeArr[i].name == this.selectedTime) {
                this.mySelectTime.nativeElement.selectedIndex = this.timeArr[i].no;
                break;
            }
        }
    };
    ChangeoverComponent.prototype.setStatus = function (status) {
        this.status = status;
    };
    ChangeoverComponent.prototype.setSelectedCoVar = function (selectedCoVar) {
        this.selectedCoVar = selectedCoVar;
    };
    ChangeoverComponent.prototype.setSelectedTime = function (selectedTime) {
        this.selectedTime = selectedTime;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectCo'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ChangeoverComponent.prototype, "mySelectCo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectTime'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ChangeoverComponent.prototype, "mySelectTime", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ChangeoverComponent.prototype, "coUpdateEmitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ChangeoverComponent.prototype, "coInpsUpdateEmitter", void 0);
    ChangeoverComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-changeover',
            template: __webpack_require__(/*! ./changeover.component.html */ "./src/app/changeover/changeover.component.html"),
            styles: [__webpack_require__(/*! ./changeover.component.css */ "./src/app/changeover/changeover.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ChangeoverComponent);
    return ChangeoverComponent;
}());

var SelectItem = /** @class */ (function () {
    function SelectItem() {
    }
    SelectItem.prototype.getName = function () {
        return name;
    };
    SelectItem.prototype.setName = function (name) {
        this.name = name;
    };
    SelectItem.prototype.setNo = function (no) {
        this.no = no;
    };
    return SelectItem;
}());


/***/ }),

/***/ "./src/app/configuration.ts":
/*!**********************************!*\
  !*** ./src/app/configuration.ts ***!
  \**********************************/
/*! exports provided: config, buttonsIFS, scannerIFS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttonsIFS", function() { return buttonsIFS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scannerIFS", function() { return scannerIFS; });
// iconPosition 打包时，需要在路径前加上实际部署项目名，如/cfgTool
// backendUrl configuration tool后端服务器地址, 需要在路径后加上, 如/daac
// publishServer 发布服务端地址, 需要在路径后加上, 如/daac
// openIFS 默认按钮开关
var config;
// 自执行函数，true本地执行，false Tomcat中执行
(function (local) {
    if (local)
        config = {
            iconPosition: "/cfgTool/assets/images/",
            backendUrl: "http://localhost:8080",
            publishServer: "http://localhost:8080",
            openIFS: false
        };
    else {
        config = {
            iconPosition: "/cfgTool/assets/images/",
            backendUrl: "http://localhost:8080/daac",
            publishServer: "http://localhost:8080/daac",
            openIFS: false
        };
    }
})(false);
// IFS 默认两个button
var buttonsIFS = [
    {
        datasource: {
            protocol: "OPCUA",
            name: "goodclick",
            url: "opc.tcp://192.168.17.167:55105",
            nodeId: "ns=6;s=button_1",
            cycle: "100ms",
            dataType: "INT"
        },
        output: "Value"
    },
    {
        datasource: {
            protocol: "OPCUA",
            name: "badclick",
            url: "opc.tcp://192.168.17.167:55105",
            nodeId: "ns=6;s=button_2",
            cycle: "100ms",
            dataType: "INT"
        },
        output: "Value"
    },
    {
        datasource: {
            protocol: "OPCUA",
            name: "Status",
            url: "opc.tcp://192.168.17.167:55105",
            nodeId: "ns=6;s=button_9",
            cycle: "100ms",
            dataType: "INT"
        },
        output: "Value"
    },
    {
        datasource: {
            protocol: "DIO",
            name: "input11",
            pin: "11",
            dir: "DIR_IN",
            trigger: "EDGE_NONE",
            cycle: "10ms",
            dataType: "INT"
        },
        output: "Value"
    }
];
// IFS 默认scanner配置
var scannerIFS = [{
        datasource: {
            protocol: "USB",
            name: "scanner0",
            port: "/dev/input/event2",
            cycle: "10ms",
            dataType: "STRING"
        },
        output: "Value"
    }];


/***/ }),

/***/ "./src/app/deviceOpration.ts":
/*!***********************************!*\
  !*** ./src/app/deviceOpration.ts ***!
  \***********************************/
/*! exports provided: DeviceOperation, Ptl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceOperation", function() { return DeviceOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ptl", function() { return Ptl; });
var DeviceOperation = /** @class */ (function () {
    function DeviceOperation() {
        this.ioDeviceName = "";
        // 用于展示
        this.displayName = "";
        // device的类型，如button、scanner等
        this.type = "";
        this.allDeviceIns = new Map();
        this.protocols = new Array();
        this.algorithms = new Array();
        this.convertNameMap = new Map();
        this.ipStrs = new Map();
        this.addressStrs = new Map();
        this.urlStrs = new Map();
        this.nodeIdStrs = new Map();
    }
    DeviceOperation.prototype.initAlgos = function () {
        var p = new Ptl();
        p.setName("Max");
        p.setNo(0);
        this.algorithms.push(p);
        p = new Ptl();
        p.setName("Min");
        p.setNo(1);
        this.algorithms.push(p);
        p = new Ptl();
        p.setName("Sum");
        p.setNo(2);
        this.algorithms.push(p);
    };
    DeviceOperation.prototype.initNameMap = function () {
        this.convertNameMap.set("OPC UA", "OPCUA");
        this.convertNameMap.set("Digital I/O", "DIO");
        this.convertNameMap.set("S7", "S7");
        this.convertNameMap.set("USB", "USB");
    };
    /**
     * 更新自动补全
     * @param componentIns
     */
    DeviceOperation.prototype.updateAutoCompletePlc = function (instance) {
        this.ipStrs.forEach(function (value, key, map) {
            instance.getIpOptions().push(key);
        });
        this.addressStrs.forEach(function (value, key, map) {
            instance.getAddressOptions().push(key);
        });
    };
    DeviceOperation.prototype.updateAutoCompleteOpcua = function (instance) {
        this.urlStrs.forEach(function (value, key, map) {
            instance.getUrlOptions().push(key);
        });
        this.nodeIdStrs.forEach(function (value, key, map) {
            instance.getNodeIdOptions().push(key);
        });
    };
    DeviceOperation.prototype.getProtocols = function () {
        return this.protocols;
    };
    DeviceOperation.prototype.getAlgos = function () {
        return this.algorithms;
    };
    DeviceOperation.prototype.getConvertNameMap = function () {
        return this.convertNameMap;
    };
    DeviceOperation.prototype.getIpStrs = function () {
        return this.ipStrs;
    };
    DeviceOperation.prototype.getAddressStrs = function () {
        return this.addressStrs;
    };
    DeviceOperation.prototype.getUrlStrs = function () {
        return this.urlStrs;
    };
    DeviceOperation.prototype.getNodeIdsStrs = function () {
        return this.nodeIdStrs;
    };
    DeviceOperation.prototype.setIpStrs = function (ipStrs) {
        this.ipStrs = ipStrs;
    };
    DeviceOperation.prototype.setAddressStrs = function (addressStrs) {
        this.addressStrs = addressStrs;
    };
    DeviceOperation.prototype.setUrlStrs = function (urlStrs) {
        this.urlStrs = urlStrs;
    };
    DeviceOperation.prototype.setNodeIdStrs = function (nodeIdStrs) {
        this.nodeIdStrs = nodeIdStrs;
    };
    DeviceOperation.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    DeviceOperation.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    DeviceOperation.prototype.setIoDeviceName = function (ioDeviceName) {
        this.ioDeviceName = ioDeviceName;
    };
    DeviceOperation.prototype.getIoDeviceName = function () {
        return this.ioDeviceName;
    };
    DeviceOperation.prototype.setAlias = function (displayName) {
        this.displayName = displayName;
    };
    DeviceOperation.prototype.getAlias = function () {
        return this.displayName;
    };
    DeviceOperation.prototype.setType = function (type) {
        this.type = type;
    };
    DeviceOperation.prototype.getType = function () {
        return this.type;
    };
    DeviceOperation.prototype.setAllDeviceIns = function (allDeviceIns) {
        this.allDeviceIns = allDeviceIns;
    };
    DeviceOperation.prototype.getAllDeviceIns = function () {
        return this.allDeviceIns;
    };
    DeviceOperation.prototype.copyToAlias = function () {
        if (this.ioDeviceName != "") {
            this.displayName = this.ioDeviceName;
        }
    };
    return DeviceOperation;
}());

var Ptl = /** @class */ (function () {
    function Ptl() {
    }
    Ptl.prototype.getName = function () {
        return this.name;
    };
    Ptl.prototype.setName = function (name) {
        this.name = name;
    };
    Ptl.prototype.setNo = function (no) {
        this.no = no;
    };
    Ptl.prototype.getNo = function () {
        return this.no;
    };
    return Ptl;
}());



/***/ }),

/***/ "./src/app/dynamicIoDevice.directive.ts":
/*!**********************************************!*\
  !*** ./src/app/dynamicIoDevice.directive.ts ***!
  \**********************************************/
/*! exports provided: DynamicComponentDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponentDirective", function() { return DynamicComponentDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynamicComponentDirective = /** @class */ (function () {
    function DynamicComponentDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DynamicComponentDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appDynamicComponent]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]])
    ], DynamicComponentDirective);
    return DynamicComponentDirective;
}());



/***/ }),

/***/ "./src/app/dynamicIoDevice.service.ts":
/*!********************************************!*\
  !*** ./src/app/dynamicIoDevice.service.ts ***!
  \********************************************/
/*! exports provided: DynamicComponentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponentService", function() { return DynamicComponentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _button_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button/button.component */ "./src/app/button/button.component.ts");
/* harmony import */ var _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scanner/scanner.component */ "./src/app/scanner/scanner.component.ts");
/* harmony import */ var _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./changeover/changeover.component */ "./src/app/changeover/changeover.component.ts");
/* harmony import */ var _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plc-device/plc-device.component */ "./src/app/plc-device/plc-device.component.ts");
/* harmony import */ var _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./proximity-switch/proximity-switch.component */ "./src/app/proximity-switch/proximity-switch.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DynamicComponentService = /** @class */ (function () {
    function DynamicComponentService() {
        this.components = {
            ButtonInstance: _button_button_component__WEBPACK_IMPORTED_MODULE_1__["ButtonComponent"],
            ScannerInstance: _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_2__["ScannerComponent"],
            PlcDeviceInstance: _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_4__["PlcDeviceComponent"],
            SwitchInstance: _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_5__["ProximitySwitchComponent"],
            coMsgGroups: _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_3__["ChangeoverComponent"]
        };
    }
    DynamicComponentService.prototype.getComponent = function (componentName) {
        return this.components[componentName];
    };
    DynamicComponentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], DynamicComponentService);
    return DynamicComponentService;
}());



/***/ }),

/***/ "./src/app/dynamicIoDevicePanel.directive.ts":
/*!***************************************************!*\
  !*** ./src/app/dynamicIoDevicePanel.directive.ts ***!
  \***************************************************/
/*! exports provided: DynamicIoDevicePanelDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicIoDevicePanelDirective", function() { return DynamicIoDevicePanelDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynamicIoDevicePanelDirective = /** @class */ (function () {
    function DynamicIoDevicePanelDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DynamicIoDevicePanelDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appDynamicIoDevicePanel]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]])
    ], DynamicIoDevicePanelDirective);
    return DynamicIoDevicePanelDirective;
}());



/***/ }),

/***/ "./src/app/dynamicIoDevicePanel.service.ts":
/*!*************************************************!*\
  !*** ./src/app/dynamicIoDevicePanel.service.ts ***!
  \*************************************************/
/*! exports provided: DynamicIoDevicePanelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicIoDevicePanelService", function() { return DynamicIoDevicePanelService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./io-device/io-device.component */ "./src/app/io-device/io-device.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynamicIoDevicePanelService = /** @class */ (function () {
    function DynamicIoDevicePanelService() {
        this.components = {
            'panel': _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_1__["IoDeviceComponent"]
        };
    }
    DynamicIoDevicePanelService.prototype.getComponent = function (componentName) {
        return this.components[componentName];
    };
    DynamicIoDevicePanelService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], DynamicIoDevicePanelService);
    return DynamicIoDevicePanelService;
}());



/***/ }),

/***/ "./src/app/dynamicLinePublish.service.ts":
/*!***********************************************!*\
  !*** ./src/app/dynamicLinePublish.service.ts ***!
  \***********************************************/
/*! exports provided: DynamicLinePublishService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicLinePublishService", function() { return DynamicLinePublishService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _publish_publish_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./publish/publish.component */ "./src/app/publish/publish.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DynamicLinePublishService = /** @class */ (function () {
    function DynamicLinePublishService() {
        this.components = {
            'panel': _publish_publish_component__WEBPACK_IMPORTED_MODULE_1__["PublishComponent"]
        };
    }
    DynamicLinePublishService.prototype.getComponent = function (componentName) {
        return this.components[componentName];
    };
    DynamicLinePublishService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], DynamicLinePublishService);
    return DynamicLinePublishService;
}());



/***/ }),

/***/ "./src/app/dynamicProtocol.directive.ts":
/*!**********************************************!*\
  !*** ./src/app/dynamicProtocol.directive.ts ***!
  \**********************************************/
/*! exports provided: DynamicProtocolDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicProtocolDirective", function() { return DynamicProtocolDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynamicProtocolDirective = /** @class */ (function () {
    function DynamicProtocolDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DynamicProtocolDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appDynamicProtocol]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]])
    ], DynamicProtocolDirective);
    return DynamicProtocolDirective;
}());



/***/ }),

/***/ "./src/app/dynamicProtocol.service.ts":
/*!********************************************!*\
  !*** ./src/app/dynamicProtocol.service.ts ***!
  \********************************************/
/*! exports provided: DynamicProtocolService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicProtocolService", function() { return DynamicProtocolService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _plc_plc_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plc/plc.component */ "./src/app/plc/plc.component.ts");
/* harmony import */ var _io_io_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./io/io.component */ "./src/app/io/io.component.ts");
/* harmony import */ var _usb_usb_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usb/usb.component */ "./src/app/usb/usb.component.ts");
/* harmony import */ var _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./opcua/opcua.component */ "./src/app/opcua/opcua.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DynamicProtocolService = /** @class */ (function () {
    function DynamicProtocolService() {
        this.components = {
            'S7': _plc_plc_component__WEBPACK_IMPORTED_MODULE_1__["PlcComponent"],
            'DIO': _io_io_component__WEBPACK_IMPORTED_MODULE_2__["IoComponent"],
            'OPCUA': _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_4__["OpcuaComponent"],
            'USB': _usb_usb_component__WEBPACK_IMPORTED_MODULE_3__["UsbComponent"]
        };
    }
    DynamicProtocolService.prototype.getComponent = function (componentName) {
        return this.components[componentName];
    };
    DynamicProtocolService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], DynamicProtocolService);
    return DynamicProtocolService;
}());



/***/ }),

/***/ "./src/app/hintdialog/hintdialog.component.css":
/*!*****************************************************!*\
  !*** ./src/app/hintdialog/hintdialog.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".post-form mat-form-field {\r\n  width: 100%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGludGRpYWxvZy9oaW50ZGlhbG9nLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC9oaW50ZGlhbG9nL2hpbnRkaWFsb2cuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb3N0LWZvcm0gbWF0LWZvcm0tZmllbGQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/hintdialog/hintdialog.component.html":
/*!******************************************************!*\
  !*** ./src/app/hintdialog/hintdialog.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content class=\"post-form\">\r\n  <p style=\"text-align: center;\">{{res}}</p>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n  <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224);left: 50%;\" mat-dialog-close>OK</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "./src/app/hintdialog/hintdialog.component.ts":
/*!****************************************************!*\
  !*** ./src/app/hintdialog/hintdialog.component.ts ***!
  \****************************************************/
/*! exports provided: HintdialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HintdialogComponent", function() { return HintdialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var HintdialogComponent = /** @class */ (function () {
    function HintdialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.res = data.statusText;
    }
    HintdialogComponent.prototype.ngOnInit = function () {
    };
    HintdialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-hintdialog',
            template: __webpack_require__(/*! ./hintdialog.component.html */ "./src/app/hintdialog/hintdialog.component.html"),
            styles: [__webpack_require__(/*! ./hintdialog.component.css */ "./src/app/hintdialog/hintdialog.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], HintdialogComponent);
    return HintdialogComponent;
}());



/***/ }),

/***/ "./src/app/instance-cfg/instance-cfg.component.css":
/*!*********************************************************!*\
  !*** ./src/app/instance-cfg/instance-cfg.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".post-form mat-form-field {\r\n  width: 100%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW5zdGFuY2UtY2ZnL2luc3RhbmNlLWNmZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztBQUNiIiwiZmlsZSI6InNyYy9hcHAvaW5zdGFuY2UtY2ZnL2luc3RhbmNlLWNmZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBvc3QtZm9ybSBtYXQtZm9ybS1maWVsZCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/instance-cfg/instance-cfg.component.html":
/*!**********************************************************!*\
  !*** ./src/app/instance-cfg/instance-cfg.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>\n  {{title}}\n</h2>\n\n<form [formGroup]=\"lineFormGroup\" (ngSubmit)=\"saveInfo()\">\n  <mat-dialog-content class=\"post-form\">\n    <mat-form-field>\n      <input matInput placeholder=\"Name\" formControlName=\"nameForm\" required />\n    </mat-form-field>\n\n    <mat-form-field>\n      <mat-select placeholder=\"Plant\" formControlName=\"plantForm\" required>\n        <mat-option *ngFor=\"let project of projects\" [value]=\"project.key\">\n          {{project.value}}\n        </mat-option>\n      </mat-select>\n    </mat-form-field>\n\n    <mat-form-field>\n      <textarea matInput placeholder=\"Description\" rows=\"5\" formControlName=\"desForm\"></textarea>\n      <mat-hint align=\"end\">Max 100 Characters!</mat-hint>\n    </mat-form-field>\n  </mat-dialog-content>\n\n  <mat-dialog-actions>\n    <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" type=\"submit\" [disabled]=\"!lineFormGroup.valid\">Save</button>\n    <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" mat-dialog-close>Cancel</button>\n  </mat-dialog-actions>\n</form>\n"

/***/ }),

/***/ "./src/app/instance-cfg/instance-cfg.component.ts":
/*!********************************************************!*\
  !*** ./src/app/instance-cfg/instance-cfg.component.ts ***!
  \********************************************************/
/*! exports provided: InstanceCfgComponent, Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceCfgComponent", function() { return InstanceCfgComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var InstanceCfgComponent = /** @class */ (function () {
    function InstanceCfgComponent(dialogRef, data, http) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.http = http;
        this.projects = [];
        this.lineFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            nameForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required),
            plantForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required),
            desForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]()
        });
        this.title = "Line";
        this.operate = data.operate;
        this.lineName = data.name;
        this.description = data.comment;
        this.selectedProjectId = data.project;
        this.id = data.id;
        this.lineFormGroup.get('nameForm').setValue(this.lineName);
        if (this.selectedProjectId == "0XALLLINES") {
            this.lineFormGroup.get('plantForm').setValue("");
        }
        else {
            this.lineFormGroup.get('plantForm').setValue(this.selectedProjectId);
        }
        this.lineFormGroup.get('desForm').setValue(this.description);
    }
    InstanceCfgComponent.prototype.ngOnInit = function () {
        this.readAllPlants();
    };
    /**
     * 读取已配置所有项目
     */
    InstanceCfgComponent.prototype.readAllPlants = function () {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_3__["config"].backendUrl + '/plants/';
        return this.http.get(url, options)
            .subscribe(function (response) {
            var pros = response.json();
            if (typeof (pros) != "undefined" && pros != null && pros.length > 0) {
                for (var i = 0; i < pros.length; i++) {
                    var obj = new KV();
                    obj.setKey(pros[i].plantId);
                    obj.setValue(pros[i].name);
                    _this.projects.push(obj);
                }
            }
        }, function (err) {
        }, function () { return console.log('Call Complete'); });
    };
    InstanceCfgComponent.prototype.saveInfo = function () {
        this.lineName = this.lineFormGroup.get('nameForm').value;
        this.selectedProjectId = this.lineFormGroup.get('plantForm').value;
        this.description = this.lineFormGroup.get('desForm').value;
        var ins = new Instance();
        if (this.operate == 'new') {
            var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
            var id = uuidv4().replace(/\-/g, "");
            ins.setLineId(id);
        }
        else if (this.operate == 'modify') {
            ins.setLineId(this.id);
        }
        var pn = this.getProjectName(this.projects, this.selectedProjectId);
        ins.setPlantName(pn);
        ins.setPlantId(this.selectedProjectId);
        ins.setName(this.lineName);
        ins.setDescription(this.description);
        this.saveLineToDB(ins, this.operate);
        //this.updateProject(this.selectedProjectId);
    };
    InstanceCfgComponent.prototype.getProjectName = function (projects, id) {
        var projectName = "";
        for (var i = 0; i < projects.length; i++) {
            if (projects[i].getKey() == id) {
                projectName = projects[i].getValue();
                break;
            }
        }
        return projectName;
    };
    InstanceCfgComponent.prototype.saveLineToDB = function (line, operation) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_3__["config"].backendUrl + '/lines/' + line.id + '/' + operation;
        return this.http.post(url, line, options)
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.dialogRef.close((line));
            }
        }, function (err) {
            alert("Failed to create!");
        }, function () { return console.log('Call Complete'); });
    };
    /**
     * 对应project下产线数量加1
     * @param id
     */
    InstanceCfgComponent.prototype.updateProject = function (projectId) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_3__["config"].backendUrl + '/plants/' + projectId + '/lineNum';
        return this.http.put(url, options)
            .subscribe(function (data) {
        }, function (err) {
            alert(err);
        }, function () { return console.log('Call Complete'); });
    };
    InstanceCfgComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-instance-cfg',
            template: __webpack_require__(/*! ./instance-cfg.component.html */ "./src/app/instance-cfg/instance-cfg.component.html"),
            styles: [__webpack_require__(/*! ./instance-cfg.component.css */ "./src/app/instance-cfg/instance-cfg.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"]])
    ], InstanceCfgComponent);
    return InstanceCfgComponent;
}());

var KV = /** @class */ (function () {
    function KV() {
    }
    KV.prototype.setKey = function (key) {
        this.key = key;
    };
    KV.prototype.getKey = function () {
        return this.key;
    };
    KV.prototype.setValue = function (value) {
        this.value = value;
    };
    KV.prototype.getValue = function () {
        return this.value;
    };
    return KV;
}());
var Instance = /** @class */ (function () {
    function Instance() {
        this.plantName = "";
        this.plantId = "";
        this.name = "";
        this.mtNum = 0;
    }
    Instance.prototype.setPlantId = function (plantId) {
        this.plantId = plantId;
    };
    Instance.prototype.getPlantId = function () {
        return this.plantId;
    };
    Instance.prototype.setPlantName = function (plantName) {
        this.plantName = plantName;
    };
    Instance.prototype.getPlantName = function () {
        return this.plantName;
    };
    Instance.prototype.setName = function (name) {
        this.name = name;
    };
    Instance.prototype.getName = function () {
        return this.name;
    };
    Instance.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    Instance.prototype.getLineId = function () {
        return this.lineId;
    };
    Instance.prototype.setDescription = function (description) {
        this.description = description;
    };
    Instance.prototype.getDescription = function () {
        return this.description;
    };
    Instance.prototype.setMtNum = function (mtNum) {
        this.mtNum = mtNum;
    };
    Instance.prototype.getMtNum = function () {
        return this.mtNum;
    };
    return Instance;
}());



/***/ }),

/***/ "./src/app/instance-mgt/instance-mgt.component.css":
/*!*********************************************************!*\
  !*** ./src/app/instance-mgt/instance-mgt.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:30px;\r\n}\r\n\r\n.mat-toolbar.mat-primary {\r\n  background: #41aaaa;\r\n}\r\n\r\n.adjustPos{\r\n  margin-top: 8px;\r\n}\r\n\r\n.common{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n}\r\n\r\n.common1{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n  width: 300px;\r\n}\r\n\r\n.titleBlock{\r\n  width:100%;\r\n  /*font-weight:bold;\r\n  background: rgb(235, 235, 210);\r\n  height:30px;\r\n  vertical-align: center;\r\n  height: 15px;\r\n  padding: 10px;\r\n  margin-left: 10px;*/\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\nli {\r\n  list-style-type:none;\r\n}\r\n\r\nul {\r\n  padding-left: 0px;\r\n}\r\n\r\nul li:hover{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\n.ui.grid{\r\n  margin: 0px;\r\n}\r\n\r\n.footer{\r\n  position: fixed;\r\n  bottom: 10px;\r\n  right:10px;\r\n}\r\n\r\n.iconStyle{\r\n  cursor:pointer;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW5zdGFuY2UtbWd0L2luc3RhbmNlLW1ndC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFEQUFxRDtFQUNyRCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLFlBQVk7RUFDWiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxZQUFZO0VBQ1osMkJBQTJCO0VBQzNCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFVBQVU7RUFDVjs7Ozs7O3FCQU1tQjtFQUNuQiwwQkFBMEI7RUFDMUIsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGNBQWM7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9pbnN0YW5jZS1tZ3QvaW5zdGFuY2UtbWd0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGVTdHlsZXtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6MzBweDtcclxufVxyXG5cclxuLm1hdC10b29sYmFyLm1hdC1wcmltYXJ5IHtcclxuICBiYWNrZ3JvdW5kOiAjNDFhYWFhO1xyXG59XHJcblxyXG4uYWRqdXN0UG9ze1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxufVxyXG5cclxuLmNvbW1vbntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICBmb250LXNpemU6MjBweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMDMpO1xyXG59XHJcblxyXG4uY29tbW9uMXtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICBmb250LXNpemU6MjBweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMDMpO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnRpdGxlQmxvY2t7XHJcbiAgd2lkdGg6MTAwJTtcclxuICAvKmZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgYmFja2dyb3VuZDogcmdiKDIzNSwgMjM1LCAyMTApO1xyXG4gIGhlaWdodDozMHB4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxNXB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7Ki9cclxuICBwYWRkaW5nOiAxMHB4IDBweCAxMHB4IDBweDtcclxuICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjAzKTtcclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICM4ODg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5saSB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOm5vbmU7XHJcbn1cclxuXHJcbnVsIHtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG5cclxudWwgbGk6aG92ZXJ7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMDYpO1xyXG59XHJcblxyXG4udWkuZ3JpZHtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLmZvb3RlcntcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYm90dG9tOiAxMHB4O1xyXG4gIHJpZ2h0OjEwcHg7XHJcbn1cclxuXHJcbi5pY29uU3R5bGV7XHJcbiAgY3Vyc29yOnBvaW50ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/instance-mgt/instance-mgt.component.html":
/*!**********************************************************!*\
  !*** ./src/app/instance-mgt/instance-mgt.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--主面板-->\r\n<div id=\"mainPanel\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0\">\r\n\r\n    <div id=\"project\" style=\"margin-top:5px;margin-left:10px;width: 100%;\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start start\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0px\">\r\n      <div class=\"ui four column grid\" style=\"width:100%;overflow:auto;\">\r\n        <div class=\"column\" *ngFor=\"let instance of instances\">\r\n          <div class=\"ui fluid card\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0px\">\r\n            <div style=\"width: 100%;\">\r\n                <p style=\"margin-left: 20px\">{{instance.plantName}}</p>\r\n            </div>\r\n            <div style=\"width: 100%;height: 168px;font-weight:bold;font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:20px;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"center center\">\r\n              <a id=\"{{instance.lineId}}\" href=\"javascript:void(0)\" (click)=\"jumpInstance($event)\">{{instance.name}}</a>\r\n            </div>\r\n            <div style=\"width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start center\">\r\n              <div fxFlex=\"80%\" style=\"margin-left: 20px;margin-bottom: 5px\">\r\n                <p>Message Type:{{instance.mtNum}}</p>\r\n              </div>\r\n              <div id=\"{{instance.lineId}}\" fxFlex=\"20%\" fxLayoutAlign=\"end start\" style=\"margin-right: 20px;margin-bottom: 5px\">\r\n                <!--<img class=\"iconStyle\" [src]=\"downloadIcon\" (click)=\"downloadInstance($event.target.parentElement.id)\" title=\"Download\"/>-->\r\n                <!--<img class=\"iconStyle\" [src]=\"resetIcon\" (click)=\"resetInstance($event.target.parentElement.id)\" title=\"Reset\"/>-->\r\n                <img class=\"iconStyle\" [src]=\"copyIcon\" (click)=\"copyInstance($event.target.parentElement.id)\" title=\"Copy\"/>\r\n                <img class=\"iconStyle\" [src]=\"editIcon\" (click)=\"modifyInstanceCfg($event.target.parentElement.id)\" title=\"Modify\"/>\r\n                <img class=\"iconStyle\" [src]=\"deleteIcon\" (click)=\"deleteInstance($event.target.parentElement.id)\" title=\"Delete\"/>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n<div class=\"footer\">\r\n  <img [src]=\"createInstanceIcon\" style=\"margin-right: 10px;float: right;cursor:pointer\" (click)=\"createInstance()\" title=\"New\"/>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/instance-mgt/instance-mgt.component.ts":
/*!********************************************************!*\
  !*** ./src/app/instance-mgt/instance-mgt.component.ts ***!
  \********************************************************/
/*! exports provided: InstanceMgtComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceMgtComponent", function() { return InstanceMgtComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../project.service */ "./src/app/project.service.ts");
/* harmony import */ var _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../instance-cfg/instance-cfg.component */ "./src/app/instance-cfg/instance-cfg.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../optconfirmdialog/optconfirmdialog.component */ "./src/app/optconfirmdialog/optconfirmdialog.component.ts");
/* harmony import */ var _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hintdialog/hintdialog.component */ "./src/app/hintdialog/hintdialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var classObj;
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var InstanceMgtComponent = /** @class */ (function () {
    function InstanceMgtComponent(projectService, dialog, http, activeRoute) {
        this.projectService = projectService;
        this.dialog = dialog;
        this.http = http;
        this.activeRoute = activeRoute;
        this.instances = [];
        this.insMap = new Map();
        this.createInstanceIcon = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].iconPosition + "circle_add.png";
        this.downloadIcon = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].iconPosition + "download.png";
        this.resetIcon = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].iconPosition + "reset.png";
        this.copyIcon = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].iconPosition + "copy.png";
        this.editIcon = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].iconPosition + "edit.png";
        this.deleteIcon = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].iconPosition + "delete.png";
    }
    InstanceMgtComponent.prototype.jumpInstance = function (obj) {
        var lineName = obj.currentTarget.text;
        var lineId = obj.currentTarget.id;
        this.projectService.createInstance(lineName, lineId);
    };
    InstanceMgtComponent.prototype.ngOnInit = function () {
        var _this = this;
        classObj = this;
        // 获得url传递的参数
        this.activeRoute.queryParams.subscribe(function (params) {
            _this.instances = [];
            _this.insMap.clear();
            _this.projectId = params['projectId'];
            _this.projectName = params['projectName'];
            _this.readAllLines(_this.projectId);
        });
    };
    InstanceMgtComponent.prototype.readAllLines = function (plantId) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/lines/' + plantId + '/plant';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "[]" && response['_body'] != "") {
                var lines = response.json();
                if (typeof (lines) != "undefined" && lines != null && lines.length > 0) {
                    for (var i = 0; i < lines.length; i++) {
                        var ins = new _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Instance"]();
                        ins.setPlantName(lines[i].plantName);
                        ins.setPlantId(lines[i].plantId);
                        ins.setDescription(lines[i].description);
                        ins.setName(lines[i].name);
                        ins.setLineId(lines[i].lineId);
                        ins.setMtNum(lines[i].mtNum);
                        _this.instances.push(ins);
                        _this.insMap.set(lines[i].lineId, ins);
                    }
                }
            }
        }, function (err) {
        }, function () { return console.log('Call Complete'); });
    };
    InstanceMgtComponent.prototype.ngAfterViewInit = function () {
    };
    /**
     * 创建line instance
     */
    InstanceMgtComponent.prototype.createInstance = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__["InstanceCfgComponent"], {
            data: {
                id: '',
                operate: 'new',
                name: '',
                project: this.projectId,
                comment: ''
            },
            hasBackdrop: true,
            disableClose: true,
            height: '400px',
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != "" && typeof (result) != "undefined") {
                var ins = new _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Instance"]();
                ins.setPlantName(result.plantName);
                ins.setPlantId(result.plantId);
                ins.setDescription(result.description);
                ins.setName(result.name);
                ins.setLineId(result.lineId);
                _this.instances.push(ins);
                _this.insMap.set(result.lineId, ins);
            }
        });
    };
    /**
     * 修改instance配置
     * @param cfgInfo
     */
    InstanceMgtComponent.prototype.modifyInstanceCfg = function (id) {
        var _this = this;
        var ins = this.insMap.get(id);
        var dialogRef = this.dialog.open(_instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__["InstanceCfgComponent"], {
            data: {
                id: id,
                operate: 'modify',
                name: ins.getName(),
                project: ins.getPlantId(),
                comment: ins.getDescription()
            },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != "" && typeof (result) != "undefined") {
                var id = result.lineId;
                for (var i = 0; i < _this.instances.length; i++) {
                    var tmpId = _this.instances[i].getLineId();
                    if (id == tmpId) {
                        _this.instances[i].setPlantName(result.plantName);
                        _this.instances[i].setPlantId(result.plantId);
                        _this.instances[i].setDescription(result.description);
                        _this.instances[i].setName(result.name);
                        _this.insMap.set(result.lineId, _this.instances[i]);
                        break;
                    }
                }
            }
        });
    };
    /**
     * 删除project
     * @param id
     */
    InstanceMgtComponent.prototype.deleteInstance = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(_optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_7__["OptconfirmdialogComponent"], {
            data: { "hintMgs": "Are you sure to delete?" },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if ("confirm" == result) {
                _this.delInsDB(id);
            }
        });
    };
    InstanceMgtComponent.prototype.delInsDB = function (id) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/lines/' + id;
        return this.http.delete(url, options)
            .subscribe(function (response) {
            var status = response['_body'];
            if (status == 1) {
                var dialogRef = _this.dialog.open(_hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_8__["HintdialogComponent"], {
                    data: { "statusText": "Can not delete line binded products!" },
                    hasBackdrop: true,
                    disableClose: true
                });
            }
            else if (status == 0) {
                classObj.insMap.delete(id);
                for (var i = 0; i < classObj.instances.length; i++) {
                    var tmpId = classObj.instances[i].getLineId();
                    if (id == tmpId) {
                        classObj.instances.splice(i, 1);
                        break;
                    }
                }
                alert('Delete success!');
            }
        }, function (err) { }, function () { });
    };
    InstanceMgtComponent.prototype.resetInstance = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(_optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_7__["OptconfirmdialogComponent"], {
            data: { "hintMgs": "Are you sure to reset?" },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if ("confirm" == result) {
                var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
                var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
                var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/lines/' + id + '/reset';
                return _this.http.delete(url, options)
                    .subscribe(function (response) {
                }, function (err) {
                }, function () {
                    alert("Reset success!");
                });
            }
        });
    };
    InstanceMgtComponent.prototype.copyInstance = function (id) {
        // 获得当前产线配置
        var curIns = this.insMap.get(id);
        var ins = new _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Instance"]();
        ins.setPlantName(curIns.getPlantName());
        ins.setPlantId(curIns.getPlantId());
        ins.setDescription(curIns.getDescription());
        ins.setName(curIns.getName() + "-copy");
        var uuid = uuidv4().replace(/\-/g, "");
        ins.setLineId(uuid);
        this.copyAndSaveLineAllInfo(id, ins);
    };
    InstanceMgtComponent.prototype.copyAndSaveLineAllInfo = function (id, ins) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/lines/' + id + '/allInfo';
        return this.http.post(url, ins, options)
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.instances = [];
                _this.insMap.clear();
                _this.readAllLines(_this.projectId);
                alert("Copy success!");
            }
        }, function (err) {
            alert("Failed to copy!");
        }, function () {
        });
    };
    InstanceMgtComponent.prototype.downloadInstance = function (id) {
        var curIns = this.insMap.get(id);
        var lineName = curIns.getName();
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/lines/' + id + '/download';
        return this.http.post(url, lineName, options)
            .subscribe(function (data) {
            var file = new Blob([data.text()], { type: 'application/json' });
            var link = document.createElement("a");
            // Blob转化为链接
            link.setAttribute("href", URL.createObjectURL(file));
            link.setAttribute("download", lineName + '.json');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, function (err) {
        }, function () {
            alert("Download success!");
        });
    };
    InstanceMgtComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-instance-mgt',
            template: __webpack_require__(/*! ./instance-mgt.component.html */ "./src/app/instance-mgt/instance-mgt.component.html"),
            styles: [__webpack_require__(/*! ./instance-mgt.component.css */ "./src/app/instance-mgt/instance-mgt.component.css")]
        }),
        __metadata("design:paramtypes", [_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _angular_http__WEBPACK_IMPORTED_MODULE_4__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], InstanceMgtComponent);
    return InstanceMgtComponent;
}());



/***/ }),

/***/ "./src/app/instance/instance.common.ts":
/*!*********************************************!*\
  !*** ./src/app/instance/instance.common.ts ***!
  \*********************************************/
/*! exports provided: MtCfg, LineMtCfg, DataSource, mappingTable, IoDeviceBindedRla, Message, LineIodevice, Model, LineMtRla, SimpleObj, LineInsNodeRla */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MtCfg", function() { return MtCfg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineMtCfg", function() { return LineMtCfg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mappingTable", function() { return mappingTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IoDeviceBindedRla", function() { return IoDeviceBindedRla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineIodevice", function() { return LineIodevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineMtRla", function() { return LineMtRla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleObj", function() { return SimpleObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineInsNodeRla", function() { return LineInsNodeRla; });
var MtCfg = /** @class */ (function () {
    function MtCfg() {
    }
    MtCfg.prototype.setEvent = function (event) {
        this.event = event;
    };
    MtCfg.prototype.getEvent = function () {
        return this.event;
    };
    MtCfg.prototype.setResetTime = function (resetTime) {
        this.resetTime = resetTime;
    };
    MtCfg.prototype.getResetTime = function () {
        return this.resetTime;
    };
    MtCfg.prototype.setHintStatus = function (hintStatus) {
        this.hintStatus = hintStatus;
    };
    MtCfg.prototype.getHintStatus = function () {
        return this.hintStatus;
    };
    return MtCfg;
}());

var LineMtCfg = /** @class */ (function () {
    function LineMtCfg() {
    }
    LineMtCfg.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    LineMtCfg.prototype.getLineId = function () {
        return this.lineId;
    };
    LineMtCfg.prototype.setType = function (type) {
        this.type = type;
    };
    LineMtCfg.prototype.getType = function () {
        return this.type;
    };
    LineMtCfg.prototype.setMtCfg = function (mtCfg) {
        this.mtCfg = mtCfg;
    };
    LineMtCfg.prototype.getMtCfg = function () {
        return this.mtCfg;
    };
    LineMtCfg.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    LineMtCfg.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    return LineMtCfg;
}());

var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    DataSource.prototype.setConfig = function (config) {
        this.config = config;
    };
    return DataSource;
}());

var mappingTable = /** @class */ (function () {
    function mappingTable() {
    }
    mappingTable.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
    };
    mappingTable.prototype.setMappingTable = function (mappingTable) {
        this.mappingTable = mappingTable;
    };
    return mappingTable;
}());

var IoDeviceBindedRla = /** @class */ (function () {
    function IoDeviceBindedRla() {
    }
    IoDeviceBindedRla.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    IoDeviceBindedRla.prototype.getLineId = function () {
        return this.lineId;
    };
    IoDeviceBindedRla.prototype.setStationId = function (stationId) {
        this.stationId = stationId;
    };
    IoDeviceBindedRla.prototype.getStationId = function () {
        return this.stationId;
    };
    IoDeviceBindedRla.prototype.setMtUniqId = function (mtUniqId) {
        this.mtUniqId = mtUniqId;
    };
    IoDeviceBindedRla.prototype.getMtUniqId = function () {
        return this.mtUniqId;
    };
    IoDeviceBindedRla.prototype.setMtInput = function (mtInput) {
        this.mtInput = mtInput;
    };
    IoDeviceBindedRla.prototype.getMtInput = function () {
        return this.mtInput;
    };
    IoDeviceBindedRla.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    IoDeviceBindedRla.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    return IoDeviceBindedRla;
}());

var Message = /** @class */ (function () {
    function Message() {
        this.inputs = [];
        this.outputs = [];
        this.status = false;
        this.disabled = false;
    }
    Message.prototype.setCategory = function (category) {
        this.category = category;
    };
    Message.prototype.setNodeKey = function (nodeKey) {
        this.nodeKey = nodeKey;
    };
    Message.prototype.setId = function (id) {
        this.id = id;
    };
    Message.prototype.setMsgTypeName = function (msgTypeName) {
        this.msgTypeName = msgTypeName;
    };
    Message.prototype.getMsgTypeName = function () {
        return this.msgTypeName;
    };
    Message.prototype.getInputs = function () {
        return this.inputs;
    };
    Message.prototype.getOutputs = function () {
        return this.outputs;
    };
    Message.prototype.getStatus = function () {
        return this.status;
    };
    Message.prototype.setStatus = function (status) {
        this.status = status;
    };
    Message.prototype.setInputs = function (inputs) {
        this.inputs = inputs;
    };
    return Message;
}());

var LineIodevice = /** @class */ (function () {
    function LineIodevice() {
        this.dataSource = new DataSource();
    }
    LineIodevice.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    LineIodevice.prototype.setIoDeviceName = function (ioDeviceName) {
        this.ioDeviceName = ioDeviceName;
    };
    LineIodevice.prototype.setDisplayName = function (displayName) {
        this.displayName = displayName;
    };
    LineIodevice.prototype.setType = function (type) {
        this.type = type;
    };
    LineIodevice.prototype.setPreprocessing = function (preprocessing) {
        this.preprocessing = preprocessing;
    };
    LineIodevice.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
    };
    LineIodevice.prototype.setMappingTable = function (mappingTable) {
        this.mappingTable = mappingTable;
    };
    return LineIodevice;
}());

var Model = /** @class */ (function () {
    function Model() {
    }
    Model.prototype.setLIneId = function (lineId) {
        this.lineId = lineId;
    };
    Model.prototype.setModel = function (model) {
        this.model = model;
    };
    return Model;
}());

var LineMtRla = /** @class */ (function () {
    function LineMtRla() {
    }
    //private mtModelId: string;
    LineMtRla.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    LineMtRla.prototype.getLineId = function () {
        return this.lineId;
    };
    LineMtRla.prototype.setMtUniqId = function (mtUniqId) {
        this.mtUniqId = mtUniqId;
    };
    LineMtRla.prototype.getMtUniqId = function () {
        return this.mtUniqId;
    };
    LineMtRla.prototype.setStationId = function (stationId) {
        this.stationId = stationId;
    };
    LineMtRla.prototype.getStationId = function () {
        return this.stationId;
    };
    LineMtRla.prototype.setStationName = function (stationName) {
        this.stationName = stationName;
    };
    LineMtRla.prototype.getStationName = function () {
        return this.stationName;
    };
    LineMtRla.prototype.setType = function (type) {
        this.type = type;
    };
    LineMtRla.prototype.getType = function () {
        return this.type;
    };
    LineMtRla.prototype.setMtId = function (mtId) {
        this.mtId = mtId;
    };
    LineMtRla.prototype.getMtId = function () {
        return this.mtId;
    };
    return LineMtRla;
}());

var SimpleObj = /** @class */ (function () {
    function SimpleObj() {
    }
    SimpleObj.prototype.setName = function (name) {
        this.name = name;
    };
    SimpleObj.prototype.setId = function (id) {
        this.id = id;
    };
    return SimpleObj;
}());

var LineInsNodeRla = /** @class */ (function () {
    function LineInsNodeRla() {
        this.nodeKeys = [];
    }
    LineInsNodeRla.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    LineInsNodeRla.prototype.getLineId = function () {
        return this.lineId;
    };
    LineInsNodeRla.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    LineInsNodeRla.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    LineInsNodeRla.prototype.setNodeKeys = function (nodeKeys) {
        this.nodeKeys = nodeKeys;
    };
    LineInsNodeRla.prototype.getNodeKeys = function () {
        return this.nodeKeys;
    };
    return LineInsNodeRla;
}());



/***/ }),

/***/ "./src/app/instance/instance.component.css":
/*!*************************************************!*\
  !*** ./src/app/instance/instance.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:30px;\r\n}\r\n\r\n.stepStyle{\r\n  width: 100%\r\n}\r\n\r\n.mat-toolbar.mat-primary {\r\n  background: #41aaaa;\r\n}\r\n\r\n.adjustPos{\r\n  margin-top: 8px;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  color: #797978;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\nli {\r\n  list-style-type:none;\r\n}\r\n\r\nul {\r\n  padding-left: 0px;\r\n}\r\n\r\nul li:hover{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\nhtml, body{\r\n  margin:0; height:100%;\r\n}\r\n\r\n.footer{\r\n  width: 100%;\r\n  height: 50px;\r\n  padding-right: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW5zdGFuY2UvaW5zdGFuY2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixxREFBcUQ7RUFDckQsY0FBYztBQUNoQjs7QUFFQTtFQUNFO0FBQ0Y7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxRQUFRLEVBQUUsV0FBVztBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCIiwiZmlsZSI6InNyYy9hcHAvaW5zdGFuY2UvaW5zdGFuY2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZVN0eWxle1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTozMHB4O1xyXG59XHJcblxyXG4uc3RlcFN0eWxle1xyXG4gIHdpZHRoOiAxMDAlXHJcbn1cclxuXHJcbi5tYXQtdG9vbGJhci5tYXQtcHJpbWFyeSB7XHJcbiAgYmFja2dyb3VuZDogIzQxYWFhYTtcclxufVxyXG5cclxuLmFkanVzdFBvc3tcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbn1cclxuXHJcbmgyIHtcclxuICBtYXJnaW46MHB4IDEuMjVyZW07XHJcbiAgcGFkZGluZzogMHB4IDBweCAwcHggMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBjb2xvcjogIzc5Nzk3ODtcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICM4ODg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5saSB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOm5vbmU7XHJcbn1cclxuXHJcbnVsIHtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG5cclxudWwgbGk6aG92ZXJ7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMDYpO1xyXG59XHJcblxyXG5odG1sLCBib2R5e1xyXG4gIG1hcmdpbjowOyBoZWlnaHQ6MTAwJTtcclxufVxyXG5cclxuLmZvb3RlcntcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/instance/instance.component.html":
/*!**************************************************!*\
  !*** ./src/app/instance/instance.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--主面板-->\r\n<div id=\"mainPanel\" style=\"height: 100%;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\r\n\r\n  <div id=\"rightPanel\" style=\"width: 100%\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\"\r\n    fxLayoutGap.xs=\"0\">\r\n    <!--step组件-->\r\n    <div class=\"stepStyle\">\r\n      <div class=\"ui tiny five steps\">\r\n        <a class=\"active step\" href=\"javascript:void(0);\">\r\n          <i class=\"object group icon\"></i>\r\n          <div class=\"content\">\r\n            <div class=\"title\" style=\"font-size: 15px\">Line Modeling</div>\r\n          </div>\r\n        </a>\r\n\r\n        <a class=\"step\" href=\"javascript:void(0);\">\r\n          <i class=\"treatment icon\"></i>\r\n          <div class=\"content\">\r\n            <div class=\"title\" style=\"font-size: 15px\">Message Type Setting</div>\r\n          </div>\r\n        </a>\r\n\r\n        <a class=\"step\" href=\"javascript:void(0);\">\r\n          <i class=\"retweet icon\"></i>\r\n          <div class=\"content\">\r\n            <div class=\"title\" style=\"font-size: 15px\">I/O Device Setting</div>\r\n          </div>\r\n        </a>\r\n\r\n        <a class=\"step\" href=\"javascript:void(0);\">\r\n          <i class=\"paperclip icon\"></i>\r\n          <div class=\"content\">\r\n            <div class=\"title\" style=\"font-size: 15px\">Box Binding</div>\r\n          </div>\r\n        </a>\r\n\r\n        <a class=\"step\" href=\"javascript:void(0);\">\r\n          <i class=\"share icon\"></i>\r\n          <div class=\"content\">\r\n            <div class=\"title\" style=\"font-size: 15px\">Publish</div>\r\n          </div>\r\n        </a>\r\n      </div>\r\n    </div>\r\n\r\n    <!--content区-->\r\n    <div style=\"width:100%;height: 100%;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"10px\"\r\n      fxLayoutGap.xs=\"0\">\r\n\r\n      <!--配置区-->\r\n      <!--gojs elements in hidden DIVs will not display until browser resize，改为ngIf-->\r\n      <!--单独ngStyle css设置为隐藏没有初始化，故不能显示-->\r\n      <div *ngIf=\"lineElementDsp\" [ngStyle]=\"lineElementBlock\" fxFlex=\"179.6px\">\r\n        <app-line-element></app-line-element>\r\n      </div>\r\n\r\n      <!--ngIf会刷新，步骤切换时，勾选的会掉，改为样式控制加刷新，单纯样式控制gojs节点刷新不出-->\r\n      <!--<div [ngStyle]=\"messageTypeCss\" fxFlex=\"364px\">\r\n          <app-message-type2 (msChange)=\"msSelectChange($event)\" [lineId]=\"lineIdMs\"></app-message-type2>\r\n        </div>-->\r\n      <div [ngStyle]=\"messageTypeCss\" fxFlex=\"179.6px\">\r\n        <app-message-type2 (msChange)=\"msSelectChange($event)\" [lineId]=\"lineIdMs\" [stationsStr]=\"stations\"></app-message-type2>\r\n      </div>\r\n      <!--<div *ngIf=\"messageDsp\" [ngStyle]=\"messageBlock\" fxFlex=\"179.6px\">\r\n          <app-message-type2></app-message-type2>\r\n        </div>-->\r\n\r\n      <div [ngStyle]=\"ioDeviceCss\" fxFlex=\"179.6px\">\r\n        <!--<app-io-device ></app-io-device>-->\r\n        <ng-template appDynamicIoDevicePanel ></ng-template>\r\n      </div>\r\n\r\n      <!--model-->\r\n      <div style=\"border:1px solid rgba(0,0,0,.09);width:100%\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start start\"\r\n        fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0\">\r\n\r\n        <div [ngStyle]=\"modelCss\" fxFlex=\"100%\" style=\"width:100%\">\r\n          <p style=\"float:left;color:rgba(128, 124, 124, 0.445)\">&nbsp;&nbsp;{{lineName}}</p>\r\n          <div #modelBlock style=\"height: 100%;\" class=\"testModel\"></div>\r\n        </div>\r\n\r\n        <div [ngStyle]=\"boxBindCss\" fxFlex=\"100%\" style=\"width:100%\">\r\n          <app-box-bind [lineId]=\"boxInfo\" [saveFlag]=\"saveBoxInfo\"></app-box-bind>\r\n        </div>\r\n\r\n        <div [ngStyle]=\"publishCss\" fxFlex=\"100%\" style=\"height:300px;width:100%\">\r\n          <app-publish [lineId]=\"publishInfo\"></app-publish>\r\n        </div>\r\n\r\n        <div class=\"footer\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"5px\" fxLayoutGap.xs=\"0\">\r\n          <div *ngIf=\"openIFS\">\r\n            <!--<button  mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"loadDefaultButton(0)\">Button1</button>\r\n                    <button  mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"loadDefaultButton(1)\">Button2</button>-->\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"loadDefaultButton(2)\">Button</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"loadDefaultButton(3)\">Sensor</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"loadDefaultScanner()\">Scanner</button>\r\n          </div>\r\n          <div *ngIf=\"lineElementDsp\">\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayMsgType()\">Next</button>\r\n          </div>\r\n          <div *ngIf=\"messageDsp\">\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayLineElement()\">Previous</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayIoDevice()\">Next</button>\r\n          </div>\r\n          <div *ngIf=\"ioDeviceDsp\">\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayMsgType()\">Previous</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayBoxCfgNext()\">Next</button>\r\n          </div>\r\n          <div *ngIf=\"boxBindDsp\">\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayIoDevice()\">Previous</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayPublish()\">Next</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"saveBoxCfg()\">Save</button>\r\n          </div>\r\n          <div *ngIf=\"publishDsp\">\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"displayBoxCfgPrevious()\">Previous</button>\r\n            <button mat-raised-button style=\"width:80px;background:rgb(250, 250, 250)\" (click)=\"publishModelData()\">Publish</button>\r\n          </div>\r\n          <button *ngIf=\"!publishDsp && !boxBindDsp\" mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" (click)=\"saveLineCfgData('save')\">Save</button>\r\n          <!--<button *ngIf=\"displayButton\" mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" (click)=\"publishModelData()\">Publish</button>-->\r\n        </div>\r\n      </div>\r\n\r\n      <!--Io device配置-->\r\n      <div [ngStyle]=\"ioDeviceCfg\" fxFlex=\"300px\" style=\"border:1px solid rgba(0,0,0,.09);overflow-y:auto\">\r\n        <ng-template appDynamicComponent></ng-template>\r\n      </div>\r\n\r\n      <!--增加间距-->\r\n      <div></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/instance/instance.component.ts":
/*!************************************************!*\
  !*** ./src/app/instance/instance.component.ts ***!
  \************************************************/
/*! exports provided: InstanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceComponent", function() { return InstanceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _dynamicIoDevice_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamicIoDevice.service */ "./src/app/dynamicIoDevice.service.ts");
/* harmony import */ var _dynamicIoDevicePanel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamicIoDevicePanel.service */ "./src/app/dynamicIoDevicePanel.service.ts");
/* harmony import */ var _dynamicLinePublish_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dynamicLinePublish.service */ "./src/app/dynamicLinePublish.service.ts");
/* harmony import */ var _dynamicIoDevice_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dynamicIoDevice.directive */ "./src/app/dynamicIoDevice.directive.ts");
/* harmony import */ var _dynamicIoDevicePanel_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dynamicIoDevicePanel.directive */ "./src/app/dynamicIoDevicePanel.directive.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../hintdialog/hintdialog.component */ "./src/app/hintdialog/hintdialog.component.ts");
/* harmony import */ var _button_button_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../button/button.component */ "./src/app/button/button.component.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../scanner/scanner.component */ "./src/app/scanner/scanner.component.ts");
/* harmony import */ var _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../plc-device/plc-device.component */ "./src/app/plc-device/plc-device.component.ts");
/* harmony import */ var _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../proximity-switch/proximity-switch.component */ "./src/app/proximity-switch/proximity-switch.component.ts");
/* harmony import */ var _TextEditor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../TextEditor */ "./src/app/TextEditor.ts");
/* harmony import */ var _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../changeover/changeover.component */ "./src/app/changeover/changeover.component.ts");
/* harmony import */ var _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../io-device/io-device.component */ "./src/app/io-device/io-device.component.ts");
/* harmony import */ var _instance_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./instance.common */ "./src/app/instance/instance.common.ts");
/* harmony import */ var ngx_logger__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-logger */ "./node_modules/ngx-logger/esm5/ngx-logger.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






















Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var lightText = 'whitesmoke';
var GO = gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].make;
// 相同的key，调用set方法，值会覆盖
// 保存节点和组的关系
var relationMap;
var classObj;
// 已经保存的ip
var storedIpsMap;
// 已经保存的address
var storedAddressesMap;
// 已经保存的ip
var storedUrlsMap;
// 已经保存的address
var storedNodeIdsMap;
// 保存变量及绑定的IOdevice
var iodeviceGroupMap;
var changeOverCfgMap;
// 保存iodevice实例的id和key
var deviceInsIdKey;
var InstanceComponent = /** @class */ (function () {
    function InstanceComponent(componentFactoryResolver, dynamicComponentService, dialog, http, activeRoute, dynamicIoDevicePanelService, dynamicLinePublishService, logger) {
        var _this = this;
        this.componentFactoryResolver = componentFactoryResolver;
        this.dynamicComponentService = dynamicComponentService;
        this.dialog = dialog;
        this.http = http;
        this.activeRoute = activeRoute;
        this.dynamicIoDevicePanelService = dynamicIoDevicePanelService;
        this.dynamicLinePublishService = dynamicLinePublishService;
        this.logger = logger;
        this.lineIdMs = "";
        this.publishInfo = "";
        this.boxInfo = "";
        this.saveBoxInfo = "";
        this.lineElementDsp = true;
        this.messageDsp = false;
        this.displayButton = false;
        //private messageTypeDsp: boolean = false;
        this.ioDeviceDsp = false;
        this.boxBindDsp = false;
        this.publishDsp = false;
        this.openIFS = false;
        this.hasIoDevicePanelInit = false;
        this.messageTypeCss = {
            'display': 'none'
        };
        this.ioDeviceCfg = {
            'display': 'none'
        };
        this.ioDeviceCss = {
            'border': '1px solid rgba(0,0,0,.09)',
            'display': 'none'
        };
        this.modelCss = {
            'display': 'block'
        };
        this.boxBindCss = {
            'display': 'none'
        };
        this.publishCss = {
            'display': 'none'
        };
        this.lineElementBlock = {};
        this.messageBlock = {};
        this.diagram = new gojs__WEBPACK_IMPORTED_MODULE_9__["Diagram"]();
        this.stationMtsMap = new Map();
        this.ioDevices = ['ButtonInstance', 'ScannerInstance', 'PlcDeviceInstance', 'SwitchInstance'];
        this.ioDeviceInsMap = new Map();
        this.nodeSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.modelChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        classObj = this;
        relationMap = new Map();
        changeOverCfgMap = new Map();
        storedIpsMap = new Map();
        storedAddressesMap = new Map();
        storedUrlsMap = new Map();
        storedNodeIdsMap = new Map();
        iodeviceGroupMap = new Map();
        this.ioDeviceInsMap = new Map();
        this.stationsMap = new Map();
        this.diagram = new gojs__WEBPACK_IMPORTED_MODULE_9__["Diagram"]();
        this.diagram.initialContentAlignment = gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Center;
        this.diagram.allowZoom = false;
        this.diagram.allowHorizontalScroll = false;
        this.diagram.allowVerticalScroll = false;
        this.diagram.toolManager.mouseWheelBehavior = gojs__WEBPACK_IMPORTED_MODULE_9__["ToolManager"].WheelNone, //鼠标滚轮事件禁止
            this.diagram.allowDrop = true; // necessary for dragging from Palette
        this.diagram.undoManager.isEnabled = true;
        this.diagram.animationManager.isEnabled = false;
        this.diagram.addDiagramListener("ViewportBoundsChanged", function (e) {
            var dia = e.diagram;
            dia.startTransaction("fix Parts");
            // only iterates through simple Parts in the diagram, not Nodes or Links
            dia.parts.each(function (part) {
                // and only on those that have the "_viewPosition" property set to a Point
                if (part['_viewPosition']) {
                    part.position = dia.transformViewToDoc(part['_viewPosition']);
                    part.scale = 1 / dia.scale;
                }
            });
            dia.commitTransaction("fix Parts");
        });
        // drag line element to line model, update station drop-down list
        this.diagram.addDiagramListener("ExternalObjectsDropped", function (e) {
            var node = e.diagram.selection.first();
            if (node instanceof gojs__WEBPACK_IMPORTED_MODULE_9__["Node"]) {
                var category = node.data.category;
                if (category == "OfGroups") {
                    var id = uuidv4().replace(/\-/g, "");
                    classObj.diagram.model.setDataProperty(node.data, "key", id);
                    classObj.getTopGroups();
                    var groupsStr = classObj.convertGroupMapToObj();
                    classObj.stations = groupsStr;
                }
                // can only stations be dragged to line model
                //else{
                //  classObj.diagram.startTransaction("delete node");
                //  classObj.diagram.remove(node);
                //  classObj.diagram.commitTransaction("delete node");
                //}
            }
        });
        this.diagram.addDiagramListener("ChangedSelection", function (e) {
            var node = e.diagram.selection.first();
        });
        this.diagram.addModelChangedListener(function (e) { return e.isTransactionFinished && _this.modelChanged.emit(e); });
        // modify station name, update station drop-down list
        this.diagram.addDiagramListener("textEdited", function (e) {
            var node = e.diagram.selection.first();
            if (node instanceof gojs__WEBPACK_IMPORTED_MODULE_9__["Node"]) {
                var category = node.data.category;
                var text = node.data.text;
                var id = node.data.key;
                if (category == "OfGroups") {
                    classObj.stationsMap.set(id, text);
                    var groupsStr = classObj.convertGroupMapToObj();
                    classObj.stations = groupsStr;
                }
            }
        });
        // default node template
        this.diagram.nodeTemplateMap.add("", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Node"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Auto", {
            name: "BODY"
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#AAAA96",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer",
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", {
            margin: 1
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            margin: 1,
            editable: false
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text").makeTwoWay())))));
        // drag button instance from iodevice panel to bind message type input
        this.diagram.nodeTemplateMap.add("ButtonInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Node"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Auto", {
            name: "BODY"
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#AAAA96",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer"
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", {
            margin: 1
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            margin: 1,
            editable: false
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text").makeTwoWay())))));
        // drag scanner instance from iodevice panel to bind message type input
        this.diagram.nodeTemplateMap.add("ScannerInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Node"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Auto", {
            name: "BODY"
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#AAAA96",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer"
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", {
            margin: 1
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            margin: 1,
            editable: false
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text").makeTwoWay())))));
        // drag plcdevice instance from iodevice panel to bind message type input
        this.diagram.nodeTemplateMap.add("PlcDeviceInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Node"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Auto", {
            name: "BODY"
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#AAAA96",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer"
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", {
            margin: 1
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            margin: 1,
            editable: false
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text").makeTwoWay())))));
        // drag switch instance from iodevice panel to bind message type input
        this.diagram.nodeTemplateMap.add("SwitchInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Node"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Auto", {
            name: "BODY"
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#AAAA96",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer"
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", {
            margin: 1
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            margin: 1,
            editable: false
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text").makeTwoWay())))));
        function highlightGroup(e, grp, show) {
            if (!grp)
                return;
            e.handled = true;
            if (show) {
                // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
                // instead depend on the DraggingTool.draggedParts or .copiedParts
                var tool = grp.diagram.toolManager.draggingTool;
                var map = tool.draggedParts || tool.copiedParts; // this is a Map
                // now we can check to see if the Group will accept membership of the dragged Parts
                if (grp.canAddMembers(map.toKeySet())) {
                    grp.isHighlighted = true;
                    return;
                }
            }
            grp.isHighlighted = false;
        }
        // 绑定device到messagetype 变量
        function bindDeviceToVar(e, grp) {
            if (grp !== null) {
                grp.diagram.selection.each(function (n) {
                    // 放入组中containing属性需要自己加入
                    grp.data.containing.push(n.data.key);
                    // 保存iodevice实例和model中节点的对应关系,一对多的关系
                    // 一个iodevice拖到两个input上，eg:{key:1111,id:111}--->{key:111,id:111},{key:1112,id:111}
                    var tmpNodeArr = deviceInsIdKey.get(n.data.id);
                    if (typeof (tmpNodeArr) == "undefined") {
                        var tmpArr = [];
                        tmpArr.push(n.data.key);
                        deviceInsIdKey.set(n.data.id, tmpArr);
                    }
                    else {
                        deviceInsIdKey.get(n.data.id).push(n.data.key);
                    }
                    classObj.logger.debug("Relationship of iodevice instance and input/iodevice nodes:", deviceInsIdKey);
                });
            }
            e.diagram.findTopLevelGroups().each(function (g) {
                grp.isSubGraphExpanded = true;
            });
            var ok = (grp !== null ?
                grp.addMembers(grp.diagram.selection, true) :
                e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok)
                e.diagram.currentTool.doCancel();
        }
        // line element group template
        this.diagram.groupTemplateMap.add("OfGroups", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Group"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), {
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp) {
                highlightGroup(e, grp, true);
            },
            mouseDragLeave: function (e, grp) {
                highlightGroup(e, grp, false);
            },
            computesBoundsAfterDrag: true,
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: function (e, grp) { },
            handlesDragDropForMembers: true,
            // Groups containing Groups lay out their members horizontally
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"], {
                //---------------chang the wrappingColumn value from 1 to "Infinity" if you want to show Horizontal----
                wrappingColumn: NaN,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](4, 4)
            })
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#879BAA",
            stroke: "#879BAA",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer",
            // allow many kinds of links
            fromLinkable: true,
            toLinkable: true,
            fromLinkableSelfNode: false,
            toLinkableSelfNode: false,
            fromLinkableDuplicates: true,
            toLinkableDuplicates: true
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Vertical", // title above Placeholder
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].Horizontal,
            background: "#879BAA"
        }, GO("SubGraphExpanderButton", {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Right,
            margin: 5
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Left,
            editable: true,
            margin: 5,
            font: "bold 18px sans-serif",
            opacity: 0.75,
            stroke: '879BAA',
            textEditor: _TextEditor__WEBPACK_IMPORTED_MODULE_16__["window"].TextEditor,
            textValidation: classObj.validName
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text", "text").makeTwoWay())), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        // message type group template
        this.diagram.groupTemplateMap.add("MsgGroups", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Group"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), {
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp) {
                highlightGroup(e, grp, true);
            },
            mouseDragLeave: function (e, grp) {
                highlightGroup(e, grp, false);
            },
            computesBoundsAfterDrag: true,
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: function (r, grp) { },
            handlesDragDropForMembers: true,
            // Groups containing Groups lay out their members horizontally
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"], {
                //---------------chang the wrappingColumn value from 1 to "Infinity" if you want to show Horizontal----
                wrappingColumn: 1,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](4, 4)
            })
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#BECDD7",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer"
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Vertical", // title above Placeholder
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].Horizontal,
            background: "#BECDD7"
        }, GO("SubGraphExpanderButton", {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Right,
            margin: 5
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Left,
            editable: false,
            margin: 5,
            font: "bold 18px sans-serif",
            opacity: 0.75,
            stroke: 'BECDD7'
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text", "text").makeTwoWay())), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        // message type input group template
        this.diagram.groupTemplateMap.add("InputGroups", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Group"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), {
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) {
                highlightGroup(e, grp, true);
            },
            mouseDragLeave: function (e, grp, next) {
                highlightGroup(e, grp, false);
            },
            computesBoundsAfterDrag: true,
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: bindDeviceToVar,
            handlesDragDropForMembers: true,
            // Groups containing Groups lay out their members horizontally
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"], {
                //---------------chang the wrappingColumn value from 1 to "Infinity" if you want to show Horizontal----
                wrappingColumn: 1,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](4, 4)
            })
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#D3E5EA",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer",
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Vertical", // title above Placeholder
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].Horizontal,
            background: "#D3E5EA"
        }, GO("SubGraphExpanderButton", {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Right,
            margin: 5
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Left,
            editable: false,
            margin: 5,
            font: "12px sans-serif",
            opacity: 0.75,
            stroke: 'D3E5EA'
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text", "text").makeTwoWay())), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        // changeover message type group template
        this.diagram.groupTemplateMap.add("coMsgGroups", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Group"], "Auto", {
            dragComputation: stayInFixedArea
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), {
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp) {
                highlightGroup(e, grp, true);
            },
            mouseDragLeave: function (e, grp) {
                highlightGroup(e, grp, false);
            },
            computesBoundsAfterDrag: true,
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: function (e, grp) { },
            handlesDragDropForMembers: true,
            // Groups containing Groups lay out their members horizontally
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"], {
                //---------------chang the wrappingColumn value from 1 to "Infinity" if you want to show Horizontal----
                wrappingColumn: 1,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](4, 4)
            })
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#BECDD7",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer"
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Vertical", // title above Placeholder
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].Horizontal,
            background: "#BECDD7"
        }, GO("SubGraphExpanderButton", {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Right,
            margin: 5
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Left,
            editable: false,
            margin: 5,
            font: "bold 18px sans-serif",
            opacity: 0.75,
            stroke: 'BECDD7'
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text", "text").makeTwoWay()), GO("Button", {
            "ButtonBorder.fill": "#BECDD7",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#BECDD7",
            "_buttonStrokeOver": "#BECDD7",
            click: classObj.configChangeOver,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Picture"], "assets/images/edit.png", {
            width: 16,
            height: 16,
        }))), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        // changeover input group template 
        this.diagram.groupTemplateMap.add("ChangeOver", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Group"], "Auto", new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), {
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) {
                highlightGroup(e, grp, true);
            },
            mouseDragLeave: function (e, grp, next) {
                highlightGroup(e, grp, false);
            },
            computesBoundsAfterDrag: true,
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: bindDeviceToVar,
            handlesDragDropForMembers: true,
            // Groups containing Groups lay out their members horizontally
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"], {
                //---------------chang the wrappingColumn value from 1 to "Infinity" if you want to show Horizontal----
                wrappingColumn: 1,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](4, 4)
            })
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#D3E5EA",
            stroke: "black",
            strokeWidth: 2,
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Vertical", // title above Placeholder
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].Horizontal,
            background: "#D3E5EA"
        }, GO("SubGraphExpanderButton", {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Right,
            margin: 5
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Left,
            editable: false,
            margin: 5,
            font: "12px sans-serif",
            opacity: 0.75,
            stroke: 'D3E5EA'
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text", "text").makeTwoWay())), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        this.diagram.groupTemplateMap.add("lineMtGroup", GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Group"], "Auto", {
            dragComputation: stayInFixedArea
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_9__["Point"].stringify), {
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp) {
                highlightGroup(e, grp, true);
            },
            mouseDragLeave: function (e, grp) {
                highlightGroup(e, grp, false);
            },
            computesBoundsAfterDrag: true,
            // when the selection is dropped into a Group, add the selected Parts into that Group;
            // if it fails, cancel the tool, rolling back any changes
            mouseDrop: function (e, grp) { },
            handlesDragDropForMembers: true,
            // Groups containing Groups lay out their members horizontally
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"], {
                //chang the wrappingColumn value from 1 to "Infinity" if you want to show Horizontal
                wrappingColumn: 1,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](4, 4)
            })
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("background", "isHighlighted", function (h) {
            return h ? "rgba(255,0,0,0.2)" : "transparent";
        }).ofObject(), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], "RoundedRectangle", {
            fill: "#BECDD7",
            stroke: "black",
            strokeWidth: 2,
            portId: "",
            cursor: "pointer",
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Vertical", // title above Placeholder
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Panel"], "Horizontal", // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_9__["GraphObject"].Horizontal,
            background: "#BECDD7"
        }, GO("SubGraphExpanderButton", {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Right,
            margin: 5
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Left,
            editable: false,
            margin: 5,
            font: "bold 18px sans-serif",
            opacity: 0.75,
            stroke: 'BECDD7'
        }, new gojs__WEBPACK_IMPORTED_MODULE_9__["Binding"]("text", "text").makeTwoWay())), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        // this function is the Node.dragComputation, to limit the movement of the parts
        function stayInFixedArea(part, pt, gridpt) {
            var diagram = part.diagram;
            if (diagram === null)
                return pt;
            // compute the document area without padding
            var v = diagram.documentBounds.copy();
            v.subtractMargin(diagram.padding);
            // get the bounds of the part being dragged
            var b = part.actualBounds;
            var loc = part.location;
            // now limit the location appropriately
            var x = Math.max(v.x, Math.min(pt.x, v.right - b.width)) + (loc.x - b.x);
            var y = Math.max(v.y, Math.min(pt.y, v.bottom - b.height)) + (loc.y - b.y);
            return new gojs__WEBPACK_IMPORTED_MODULE_9__["Point"](x, y);
        }
        this.diagram.linkTemplate =
            GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Link"], 
            // allow relinking
            {
                relinkableFrom: true,
                relinkableTo: true
            }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"]), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], {
                toArrow: "OpenTriangle"
            }));
        // 删除节点前触发事件
        this.diagram.addDiagramListener("SelectionDeleting", function (e) {
            e.diagram.selection.each(function (n) {
                if (n.data.category == "OfGroups") {
                    // 删除下拉列表中的station
                    classObj.getTopGroups();
                    classObj.stationsMap.delete(n.data.key);
                    var groupsStr = classObj.convertGroupMapToObj();
                    classObj.stations = groupsStr;
                    for (var i = 0; i < n.data.containing.length; i++) {
                        var variable = e.diagram.model.findNodeDataForKey(n.data.containing[i]);
                        //var paramTransfer = [variable, "add"]
                        //vcs.eventEmit.emit(paramTransfer);
                        if (i !== 0 && variable.containing !== null) {
                            for (var m = 0; m < variable.containing.length; m++) {
                                relationMap.delete(variable.containing[m]);
                                iodeviceGroupMap.delete(variable.containing[m]);
                            }
                        }
                    }
                }
                else if (n.data.category == "MsgGroups") {
                    //classObj.removeList(n.data.key,n.containingGroup.data.containing);
                    //var paramTransfer = [e.diagram.model.findNodeDataForKey(n.data.key), "add"]
                    //vcs.eventEmit.emit(paramTransfer);
                    for (var i = 0; i < n.data.containing.length; i++) {
                        relationMap.delete(n.data.containing[i]);
                        iodeviceGroupMap.delete(n.data.containing[i]);
                    }
                }
                else if (n.data.category == "Button" || n.data.category == "Scanner") {
                    relationMap.delete(n.data.key);
                    iodeviceGroupMap.delete(n.data.key);
                }
            });
        });
    }
    Object.defineProperty(InstanceComponent.prototype, "model", {
        get: function () {
            return this.diagram.model;
        },
        set: function (val) {
            this.diagram.model = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 校验名字不能为空或者全部为空格
     * @param textblock
     * @param oldstr
     * @param newstr
     */
    InstanceComponent.prototype.validName = function (textblock, oldstr, newstr) {
        if (newstr.length == 0) {
            return false;
        }
        else {
            var tmp = newstr.trim();
            if (tmp.length == 0) {
                return false;
            }
        }
        return true;
    };
    ;
    /**
     * 配置change over
     * @param e
     * @param obj
     */
    InstanceComponent.prototype.configChangeOver = function (e, obj) {
        var node = obj.part;
        var data = node.data;
        if (data) {
            var nodeKey = data.key;
            var category = data.category;
            var coCfg = changeOverCfgMap.get(nodeKey);
            // 在绑定iodevice时，会记录type,如果节点已经初始化，则不变
            if (typeof (coCfg) == "undefined" || coCfg == null) {
                coCfg = {
                    'ioDeviceId': nodeKey
                };
                changeOverCfgMap.set(nodeKey, {});
                classObj.displayDeviceComponent(category, 'new', coCfg);
            }
            else {
                classObj.displayDeviceComponent(category, 'echo', coCfg);
            }
        }
        classObj.displayIoDeviceCfgPanel();
    };
    InstanceComponent.prototype.imageConverter = function (prop, picture) {
        var node = picture.part;
        if (node.isTreeLeaf) {
            return "assets/images/document.png";
        }
        else {
            if (node.isTreeExpanded) {
                return "assets/images/openFolder.png";
            }
            else {
                return "assets/images/closedFolder.png";
            }
        }
    };
    InstanceComponent.prototype.showDetailsOrNot = function () {
        this.diagram.findTopLevelGroups().each(function (g) {
            if (!(g instanceof gojs__WEBPACK_IMPORTED_MODULE_9__["Group"]))
                return;
            if (g.isSubGraphExpanded == false) {
                g.isSubGraphExpanded = true;
            }
            else {
                g.isSubGraphExpanded = false;
            }
        });
    };
    InstanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.diagram.div = this.diagramRef.nativeElement;
        deviceInsIdKey = new Map();
        this.lineIdMs = "";
        this.publishInfo = "";
        //this.stationsMapStr = "";
        // 获得url传递的参数
        this.activeRoute.queryParams.subscribe(function (params) {
            _this.lineName = params['lineName'];
            _this.lineId = params['lineId'];
            _this.stationsMap.set(_this.lineId, _this.lineName);
        });
        // 初始化模型
        this.readModelById(this.lineId);
        this.readStationMtsById(this.lineId);
        this.readIoDeviceBindedById(this.lineId);
        this.readChangeOverById(this.lineId);
        this.readInsNodeRlaById(this.lineId);
    };
    InstanceComponent.prototype.processCo = function (message) {
        if (typeof (message.ioDeviceId) != "undefined" && message != "") {
            changeOverCfgMap.set(message.ioDeviceId, message);
            classObj.hiddenIoDeviceCfgPanel();
        }
    };
    InstanceComponent.prototype.processCoInps = function (message) {
        var status = message.status;
        var node;
        if (status) {
            changeOverCfgMap.forEach(function (value, groupKey, map) {
                node = {
                    key: "changeOverUnique",
                    text: "ChangeOver",
                    isGroup: true,
                    group: groupKey,
                    category: "ChangeOver",
                    containing: []
                };
            });
            classObj.diagram.model.startTransaction("create change over node");
            classObj.diagram.model.addNodeData(node);
            classObj.diagram.model.commitTransaction("create change over node");
        }
        else {
            var delGroup = this.diagram.findNodeForKey("changeOverUnique");
            this.diagram.model.startTransaction("delete change over node");
            this.diagram.remove(delGroup);
            this.diagram.model.commitTransaction("delete change over node");
        }
    };
    InstanceComponent.prototype.msSelectChange = function (obj) {
        //this.messageTypeVar = obj;
        this.putMsgTypeStation(obj);
    };
    /**
     * 将message type放入对应的station
     * @param obj
     */
    InstanceComponent.prototype.putMsgTypeStation = function (obj) {
        // 更新同一category下的message type, 先删除原节点，再增加新节点
        var Arr = [];
        var smg = JSON.parse(obj);
        if (smg.operate == "add") {
            var msgTpt = void 0;
            var inTpt = "InputGroups";
            var msg = void 0;
            if (smg.stationKey == classObj.lineId) {
                if (smg.category.toUpperCase() == "CHANGEOVER") {
                    msgTpt = "coMsgGroups";
                    inTpt = "ChangeOver";
                }
                else {
                    msgTpt = "lineMtGroup";
                }
                msg = {
                    key: smg.message.nodeKey,
                    text: smg.message.msgTypeName,
                    isGroup: true,
                    category: msgTpt,
                    containing: [],
                    loc: "100 10"
                };
            }
            else {
                msg = {
                    key: smg.message.nodeKey,
                    text: smg.message.msgTypeName,
                    isGroup: true,
                    group: smg.stationKey,
                    category: "MsgGroups",
                    containing: []
                };
            }
            Arr.push(msg);
            if (msgTpt != "coMsgGroups") {
                var inputs = smg.message.inputs;
                for (var i = 0; i < inputs.length; i++) {
                    var input = {
                        text: inputs[i],
                        isGroup: true,
                        group: smg.message.nodeKey,
                        category: inTpt,
                        containing: []
                    };
                    Arr.push(input);
                }
            }
            this.diagram.model.startTransaction("add node array");
            this.diagram.model.addNodeDataCollection(Arr);
            this.diagram.model.startTransaction("add node array");
            var mts = this.stationMtsMap.get(smg.stationKey);
            if (typeof (mts) == "undefined") {
                var tmpArr = [];
                tmpArr.push(smg.message);
                this.stationMtsMap.set(smg.stationKey, tmpArr);
            }
            else {
                mts.push(smg.message);
            }
        }
        else if (smg.operate == "update") {
            var delId = smg.nodeId;
            // 注意this.diagram.model.findNodeDataForKey和this.diagram.findNodeForKey
            var delGroup = this.diagram.findNodeForKey(delId);
            this.diagram.model.startTransaction("delete group");
            this.diagram.remove(delGroup);
            this.diagram.model.commitTransaction("delete group");
            var msg = {
                key: smg.message.nodeKey,
                text: smg.message.msgTypeName,
                isGroup: true,
                group: smg.stationKey,
                category: "MsgGroups",
                containing: []
            };
            Arr.push(msg);
            var inputs = smg.message.inputs;
            for (var i = 0; i < inputs.length; i++) {
                var input = {
                    text: inputs[i],
                    isGroup: true,
                    group: smg.message.nodeKey,
                    category: "InputGroups",
                    containing: []
                };
                Arr.push(input);
            }
            this.diagram.model.startTransaction("add node array");
            this.diagram.model.addNodeDataCollection(Arr);
            this.diagram.model.startTransaction("add node array");
            var mts = this.stationMtsMap.get(smg.stationKey);
            for (var i = 0; i < mts.length; i++) {
                if (mts[i].category == smg.category) {
                    mts.splice(i, 1);
                    i--;
                }
            }
            mts.push(smg.message);
        }
        else if (smg.operate == "delete") {
            var delId = smg.nodeId;
            // 注意this.diagram.model.findNodeDataForKey和this.diagram.findNodeForKey
            var delGroup = this.diagram.findNodeForKey(delId);
            this.diagram.model.startTransaction("delete group");
            this.diagram.remove(delGroup);
            this.diagram.model.commitTransaction("delete group");
            var mts = this.stationMtsMap.get(smg.stationKey);
            for (var i = 0; i < mts.length; i++) {
                if (mts[i].category == smg.category) {
                    mts.splice(i, 1);
                    i--;
                }
            }
        }
    };
    InstanceComponent.prototype.ngAfterViewInit = function () {
        this.initMainPanelHeight();
        var modelWidth = $($(".testModel")[0]).width() + 24;
        this.diagram.fixedBounds = new gojs__WEBPACK_IMPORTED_MODULE_9__["Rect"](0, 0, parseFloat(modelWidth), 150);
        this.diagram.add(GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Part"], {
            layerName: "Grid",
            _viewPosition: new gojs__WEBPACK_IMPORTED_MODULE_9__["Point"](0, 0)
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_9__["Shape"], {
            fill: "lightgray",
            strokeWidth: 0,
            desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_9__["Size"](parseFloat(modelWidth), 150)
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_9__["TextBlock"], {
            text: "Message Type for Production Line",
            alignment: gojs__WEBPACK_IMPORTED_MODULE_9__["Spot"].Center,
            margin: 5,
            font: "bold 18px sans-serif",
            stroke: 'black'
        })));
    };
    /**
     * 调节各模块的大小
     */
    InstanceComponent.prototype.initMainPanelHeight = function () {
        this.lineElementBlock = {
            border: '1px solid rgba(0,0,0,.09)'
        };
        this.messageBlock = {
            border: '1px solid rgba(0,0,0,.09)'
        };
    };
    InstanceComponent.prototype.findIndexinList = function (val, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] == val)
                return i;
        }
    };
    InstanceComponent.prototype.removeList = function (val, list) {
        var index = this.findIndexinList(val, list);
        if (index > -1) {
            list.splice(index, 1);
        }
    };
    /**
     * 展示line element step
     * @param event
     */
    InstanceComponent.prototype.displayLineElement = function () {
        $($(".step")[0]).addClass("active");
        $($(".step")[0]).siblings().removeClass("active");
        //$(event.currentTarget).addClass("active");
        //$(event.currentTarget).siblings().removeClass("active");
        this.lineElementDsp = true;
        //this.messageTypeDsp = false;
        this.messageTypeCss = {
            'display': 'none'
        };
        this.ioDeviceCfg = {
            'display': 'none',
        };
        this.ioDeviceCss = {
            'display': 'none',
        };
        this.ioDeviceDsp = false;
        this.messageDsp = false;
        this.displayButton = false;
        this.openIFS = false;
        // 重新调节画布的大小
        this.diagram.requestUpdate();
    };
    /**
     * 展示message type step
     * @param event
     */
    InstanceComponent.prototype.displayMsgType = function () {
        $($(".step")[1]).addClass("active");
        $($(".step")[1]).siblings().removeClass("active");
        //$(event.currentTarget).addClass("active");
        //$(event.currentTarget).siblings().removeClass("active");
        this.messageTypeCss = {
            'border': '1px solid rgba(0,0,0,.09)',
            'display': 'block'
        };
        this.ioDeviceCfg = {
            'display': 'none'
        };
        this.ioDeviceCss = {
            'display': 'none',
        };
        this.lineElementDsp = false;
        this.messageDsp = true;
        this.ioDeviceDsp = false;
        //this.messageTypeDsp = true;
        this.displayButton = false;
        this.openIFS = false;
        // 重新调节画布的大小
        this.diagram.requestUpdate();
        this.lineIdMs = this.lineId;
    };
    InstanceComponent.prototype.readStationMtsById = function (lineId) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + lineId + '/messagetype';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    // 获得所有mt
                    var msgTypesStr = pros.messages;
                    var mtMap = new Map();
                    for (var j = 0; j < msgTypesStr.length; j++) {
                        mtMap.set(msgTypesStr[j].mtId, msgTypesStr[j]);
                    }
                    var stationMtRlas = pros.lmrs;
                    for (var i = 0; i < stationMtRlas.length; i++) {
                        var tmpMsg = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["Message"]();
                        tmpMsg.setId(stationMtRlas[i].mtId);
                        tmpMsg.setNodeKey(stationMtRlas[i].mtUniqId);
                        var tmpM = mtMap.get(stationMtRlas[i].mtId);
                        tmpMsg.setMsgTypeName(tmpM.messageTypeName);
                        tmpMsg.setCategory(tmpM.category);
                        var mts = _this.stationMtsMap.get(stationMtRlas[i].stationId);
                        if (typeof (mts) == "undefined") {
                            var tmpArr = [];
                            tmpArr.push(tmpMsg);
                            _this.stationMtsMap.set(stationMtRlas[i].stationId, tmpArr);
                        }
                        else {
                            mts.push(tmpMsg);
                        }
                    }
                }
            }
        }, function (err) {
            console.log(err);
        }, function () { });
    };
    /**
     * 展示io device step
     * @param event
     */
    InstanceComponent.prototype.displayIoDevice = function () {
        $($(".step")[2]).addClass("active");
        $($(".step")[2]).siblings().removeClass("active");
        //$(event.currentTarget).addClass("active");
        //$(event.currentTarget).siblings().removeClass("active");
        this.ioDeviceDsp = true;
        this.lineElementDsp = false;
        this.messageDsp = false;
        this.boxBindDsp = false;
        //this.messageTypeDsp = false;
        this.displayButton = true;
        if (_configuration__WEBPACK_IMPORTED_MODULE_12__["config"].openIFS) {
            this.openIFS = true;
        }
        this.messageTypeCss = {
            'display': 'none'
        };
        this.ioDeviceCss = {
            'border': '1px solid rgba(0,0,0,.09)',
            'display': 'block',
        };
        this.boxBindCss = {
            'display': 'none'
        };
        this.modelCss = {
            'display': 'block'
        };
        //this.ioDeviceCfg = {
        //  'display': 'block'
        //};
        if (this.hasIoDevicePanelInit == false) {
            this.displayIoDevicePanel();
            this.hasIoDevicePanelInit = true;
        }
        // 重新调节画布的大小
        this.diagram.requestUpdate();
    };
    InstanceComponent.prototype.displayBoxCfg = function () {
        $($(".step")[3]).addClass("active");
        $($(".step")[3]).siblings().removeClass("active");
        //$(event.currentTarget).addClass("active");
        //$(event.currentTarget).siblings().removeClass("active");
        this.lineElementDsp = false;
        this.boxBindDsp = true;
        //this.messageTypeDsp = false;
        this.messageTypeCss = {
            'display': 'none'
        };
        this.ioDeviceCfg = {
            'display': 'none',
        };
        this.ioDeviceCss = {
            'display': 'none',
        };
        this.boxBindCss = {
            'display': 'block'
        };
        this.modelCss = {
            'display': 'none'
        };
        this.publishCss = {
            'display': 'none'
        };
        this.ioDeviceDsp = false;
        this.messageDsp = false;
        this.displayButton = false;
        this.openIFS = false;
    };
    InstanceComponent.prototype.displayBoxCfgNext = function () {
        this.displayBoxCfg();
        this.saveLineCfgData('next');
        this.boxInfo = this.lineId;
    };
    InstanceComponent.prototype.displayBoxCfgPrevious = function () {
        this.displayBoxCfg();
        this.publishDsp = false;
    };
    InstanceComponent.prototype.saveBoxCfg = function () {
        this.saveBoxInfo = "saveBoxCfg";
    };
    InstanceComponent.prototype.displayPublish = function () {
        $($(".step")[4]).addClass("active");
        $($(".step")[4]).siblings().removeClass("active");
        //$(event.currentTarget).addClass("active");
        //$(event.currentTarget).siblings().removeClass("active");
        this.lineElementDsp = false;
        this.boxBindDsp = false;
        this.publishDsp = true;
        //this.messageTypeDsp = false;
        this.messageTypeCss = {
            'display': 'none'
        };
        this.ioDeviceCfg = {
            'display': 'none',
        };
        this.ioDeviceCss = {
            'display': 'none',
        };
        this.boxBindCss = {
            'display': 'none'
        };
        this.modelCss = {
            'display': 'none'
        };
        this.publishCss = {
            'display': 'block'
        };
        this.ioDeviceDsp = false;
        this.messageDsp = false;
        this.displayButton = false;
        this.openIFS = false;
        this.publishInfo = this.lineId;
        this.saveBoxCfg();
    };
    InstanceComponent.prototype.displayIoDevicePanel = function () {
        // 根据名称构造不同的组件
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicIoDevicePanelService.getComponent("panel"));
        var viewContainerRef = this.ioDevicePanel.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.idpComponentIns = componentRef.instance;
        if (this.idpComponentIns instanceof _io_device_io_device_component__WEBPACK_IMPORTED_MODULE_18__["IoDeviceComponent"]) {
            this.idpComponentIns.setLineId(this.lineId);
            this.idpComponentIns.updateEmitter.subscribe(function (msg) {
                if (typeof (msg) != "undefined") {
                    var node = msg.data;
                    var operation = msg.operation;
                    // 避免本组件发送的干扰
                    if (msg != "" && typeof (operation) != "undefined") {
                        var nodeKey = node.key;
                        var type = node.category;
                        var nodeCfg = relationMap.get(nodeKey);
                        classObj.displayIoDeviceCfgPanel();
                        if (operation == "new") {
                            classObj.ioDeviceInsMap.set(nodeKey, node);
                            classObj.logger.debug("new iodevice model node info:", classObj.ioDeviceInsMap);
                            // 在绑定iodevice时，会记录type,如果节点已经初始化，则不变
                            if (typeof (nodeCfg) == "undefined" || nodeCfg == "") {
                                nodeCfg = {
                                    'ioDeviceId': nodeKey,
                                    'name': node.text,
                                    'alias': node.text
                                };
                                classObj.displayDeviceComponent(type, 'new', nodeCfg);
                            }
                            else {
                                classObj.displayDeviceComponent(type, 'echo', nodeCfg);
                            }
                        }
                        else if (operation == "copy") {
                            var newKey = msg.newKey;
                            var newName = msg.newName;
                            // 修改节点
                            var tmpN = JSON.parse(JSON.stringify(node));
                            tmpN.key = newKey;
                            tmpN.id = newKey;
                            tmpN.text = newKey;
                            classObj.ioDeviceInsMap.set(newKey, tmpN);
                            classObj.logger.debug("copy iodevice model node info:", classObj.ioDeviceInsMap);
                            if (typeof (nodeCfg) == "undefined" || nodeCfg == "") {
                                nodeCfg = {
                                    'ioDeviceId': newKey,
                                    'name': node.text,
                                    'alias': node.text
                                };
                                classObj.displayDeviceComponent(type, 'new', nodeCfg);
                            }
                            else {
                                // 深度拷贝，JSON转化后function会丢失
                                //let tmpNodeCfg = {};
                                //$.extend(true, tmpNodeCfg, nodeCfg);
                                var tmpNodeCfg = JSON.parse(JSON.stringify(nodeCfg));
                                tmpNodeCfg["ioDeviceId"] = newKey;
                                tmpNodeCfg["name"] = newName;
                                tmpNodeCfg["alias"] = newName;
                                classObj.displayDeviceComponent(type, 'copy', tmpNodeCfg);
                            }
                        }
                        else if (operation == "delete") {
                            classObj.ioDeviceInsMap.delete(nodeKey);
                        }
                    }
                }
            });
        }
    };
    /**
     * 展示io device配置面板
     */
    InstanceComponent.prototype.displayIoDeviceCfgPanel = function () {
        this.ioDeviceCfg = {
            'display': 'block'
        };
        // 重新调节画布的大小
        this.diagram.requestUpdate();
    };
    /**
     * 隐藏io device面板
     */
    InstanceComponent.prototype.hiddenIoDeviceCfgPanel = function () {
        this.ioDeviceCfg = {
            'display': 'none'
        };
        // 重新调节画布的大小
        this.diagram.requestUpdate();
    };
    /**
     * 判断是否为IOdevice
     * @param type
     * @param arr
     */
    InstanceComponent.prototype.isIoDevice = function (type, arr) {
        var res = false;
        arr.forEach(function (element) {
            if (element == type) {
                res = true;
            }
        });
        return res;
    };
    InstanceComponent.prototype.processDeviceCfg = function (message) {
        this.logger.debug("Result of iodevice instance configuration:", message);
        this.message = message;
        var flag = false;
        // 保存message的信息
        if (typeof (message.ioDeviceId) != "undefined" && message != "") {
            //if(typeof (message.mto) != "undefined"){
            //  flag = classObj.isMappingCfl(message);
            //}
            //if(!flag){
            //let m = $.extend(true, {}, message);
            relationMap.set(message.ioDeviceId, message);
            this.logger.debug("iodevice instance configuration map:", relationMap);
            var deviceAlias = message.displayName;
            // 根据名称构造不同的组件
            classObj.idpComponentIns.setAlias(deviceAlias);
            var protocol = message.dataSource.protocol;
            var tmpKeyArr = deviceInsIdKey.get(message.ioDeviceId);
            this.logger.debug("iodevice node id->key map:", relationMap);
            // 修改备份中iodevice名称
            classObj.ioDeviceInsMap.get(message.ioDeviceId).text = deviceAlias;
            if (typeof (tmpKeyArr) != "undefined") {
                for (var i = 0; i < tmpKeyArr.length; i++) {
                    var nodeData = classObj.diagram.model.findNodeDataForKey(tmpKeyArr[i]);
                    if (nodeData != null) {
                        classObj.diagram.model.startTransaction("modify node name");
                        classObj.diagram.model.setDataProperty(nodeData, "text", deviceAlias);
                        classObj.diagram.model.commitTransaction("modify node name");
                        //classObj.diagram.model.setDataProperty(nodeData, "unConfig", false);
                        //classObj.diagram.model.setDataProperty(nodeData, "config", true);
                        // 保存iodevice和所属组的关系
                        var groupName = classObj.diagram.model.getGroupKeyForNodeData(nodeData);
                        iodeviceGroupMap.set(message.ioDeviceId, groupName);
                    }
                }
            }
            if (typeof (protocol) != "undefined" && protocol != null) {
                if (protocol == "S7") {
                    storedIpsMap.set(message.dataSource.ip, 1); // 用于S7提示自动补全
                    storedAddressesMap.set(message.dataSource.address, 1);
                }
                else if (protocol == "OPCUA") {
                    storedUrlsMap.set(message.dataSource.url, 1); // 用于OPCUA提示自动补全
                    storedNodeIdsMap.set(message.dataSource.nodeId, 1);
                }
            }
            //} 
        }
        //if(!flag){
        classObj.hiddenIoDeviceCfgPanel();
        //}
    };
    /**
     * 拖拽device展示节点配置或者点击节点时，回显节点的配置
     * @param componentName
     * @param operation
     * @param nodeCfg
     */
    InstanceComponent.prototype.displayDeviceComponent = function (componentName, operation, nodeCfg) {
        // 根据名称构造不同的组件
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicComponentService.getComponent(componentName));
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        var componentIns = componentRef.instance;
        if (operation == 'new') {
            if (componentIns instanceof _button_button_component__WEBPACK_IMPORTED_MODULE_11__["ButtonComponent"] ||
                componentIns instanceof _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_13__["ScannerComponent"] ||
                componentIns instanceof _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_14__["PlcDeviceComponent"] ||
                componentIns instanceof _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_15__["ProximitySwitchComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.setIoDeviceName(nodeCfg.ioDeviceName);
                componentIns.setAlias(nodeCfg.displayName);
                componentIns.setType(componentName);
                // map 不能JSON.stringify
                componentIns.setAllDeviceIns(relationMap);
                componentIns.setIpStrs(storedIpsMap);
                componentIns.setAddressStrs(storedAddressesMap);
                componentIns.setUrlStrs(storedUrlsMap);
                componentIns.setNodeIdStrs(storedNodeIdsMap);
                componentIns.updateEmitter.subscribe(function (message) {
                    classObj.processDeviceCfg(message);
                });
            }
            else if (componentIns instanceof _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_17__["ChangeoverComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.coUpdateEmitter.subscribe(function (message) {
                    classObj.processCo(message);
                });
                componentIns.coInpsUpdateEmitter.subscribe(function (message) {
                    classObj.processCoInps(message);
                });
            }
        }
        else if (operation == 'echo' || operation == 'copy') {
            // 根据不同的设备进行初始化
            if (componentIns instanceof _button_button_component__WEBPACK_IMPORTED_MODULE_11__["ButtonComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.setIoDeviceName(nodeCfg.ioDeviceName);
                componentIns.setAlias(nodeCfg.displayName);
                componentIns.setType(componentName);
                componentIns.setIpStrs(storedIpsMap);
                componentIns.setAddressStrs(storedAddressesMap);
                componentIns.setUrlStrs(storedUrlsMap);
                componentIns.setNodeIdStrs(storedNodeIdsMap);
                if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                    return;
                }
                componentIns.setSelectedProtocol(nodeCfg.dataSource.protocol);
                componentIns.setSelectedAlgo(nodeCfg.preprocessing);
                componentIns.setOperate('echo');
                componentIns.setNodecfg(nodeCfg.dataSource);
                componentIns.updateEmitter.subscribe(function (message) {
                    classObj.processDeviceCfg(message);
                });
            }
            else if (componentIns instanceof _plc_device_plc_device_component__WEBPACK_IMPORTED_MODULE_14__["PlcDeviceComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.setIoDeviceName(nodeCfg.ioDeviceName);
                componentIns.setAlias(nodeCfg.displayName);
                componentIns.setType(componentName);
                componentIns.setIpStrs(storedIpsMap);
                componentIns.setAddressStrs(storedAddressesMap);
                componentIns.setUrlStrs(storedUrlsMap);
                componentIns.setNodeIdStrs(storedNodeIdsMap);
                if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                    return;
                }
                componentIns.setSelectedProtocol(nodeCfg.dataSource.protocol);
                componentIns.setSelectedAlgo(nodeCfg.preprocessing);
                componentIns.setOperate('echo');
                componentIns.setNodecfg(nodeCfg.dataSource);
                componentIns.updateEmitter.subscribe(function (message) {
                    classObj.processDeviceCfg(message);
                });
            }
            else if (componentIns instanceof _proximity_switch_proximity_switch_component__WEBPACK_IMPORTED_MODULE_15__["ProximitySwitchComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.setIoDeviceName(nodeCfg.ioDeviceName);
                componentIns.setAlias(nodeCfg.displayName);
                componentIns.setType(componentName);
                componentIns.setIpStrs(storedIpsMap);
                componentIns.setAddressStrs(storedAddressesMap);
                componentIns.setUrlStrs(storedUrlsMap);
                componentIns.setNodeIdStrs(storedNodeIdsMap);
                if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                    return;
                }
                componentIns.setSelectedProtocol(nodeCfg.dataSource.protocol);
                componentIns.setSelectedAlgo(nodeCfg.preprocessing);
                componentIns.setOperate('echo');
                componentIns.setNodecfg(nodeCfg.dataSource);
                componentIns.updateEmitter.subscribe(function (message) {
                    classObj.processDeviceCfg(message);
                });
            }
            else if (componentIns instanceof _scanner_scanner_component__WEBPACK_IMPORTED_MODULE_13__["ScannerComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.setIoDeviceName(nodeCfg.ioDeviceName);
                componentIns.setAlias(nodeCfg.displayName);
                componentIns.setType(componentName);
                componentIns.setAllDeviceIns(relationMap);
                componentIns.setIpStrs(storedIpsMap);
                componentIns.setAddressStrs(storedAddressesMap);
                componentIns.setUrlStrs(storedUrlsMap);
                componentIns.setNodeIdStrs(storedNodeIdsMap);
                if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                    return;
                }
                componentIns.setSelectedProtocol(nodeCfg.dataSource.protocol);
                componentIns.setSelectedAlgo(nodeCfg.preprocessing);
                componentIns.setOperate(operation);
                componentIns.setNodecfg(nodeCfg.dataSource);
                var tmpMM = void 0;
                if (typeof (nodeCfg.mappingTable.mappingTable) == "string") {
                    tmpMM = JSON.parse(nodeCfg.mappingTable.mappingTable);
                }
                else {
                    tmpMM = nodeCfg.mappingTable.mappingTable;
                }
                componentIns.setMappingTableObj({
                    "enabled": nodeCfg.mappingTable.enabled,
                    "mappingTable": tmpMM
                });
                componentIns.updateEmitter.subscribe(function (message) {
                    classObj.processDeviceCfg(message);
                });
            }
            else if (componentIns instanceof _changeover_changeover_component__WEBPACK_IMPORTED_MODULE_17__["ChangeoverComponent"]) {
                componentIns.setIoDeviceId(nodeCfg.ioDeviceId);
                componentIns.setHintStatus(nodeCfg.hintStatus);
                var event_1 = nodeCfg.event;
                var resetTime = nodeCfg.resetTime;
                componentIns.setSelectedCoVar(event_1);
                componentIns.coUpdateEmitter.subscribe(function (message) {
                    classObj.processCo(message);
                });
                componentIns.coInpsUpdateEmitter.subscribe(function (message) {
                    classObj.processCoInps(message);
                });
                if (resetTime == "") {
                    componentIns.setSelectedTime("00:00:00");
                    componentIns.setStatus(false);
                }
                else {
                    componentIns.setSelectedTime(resetTime);
                    componentIns.setStatus(true);
                }
            }
        }
    };
    InstanceComponent.prototype.publishModelData = function () {
        var _this = this;
        try {
            this.validVariablesDs();
        }
        catch (e) {
            alert("Some variables are not configured!");
            return;
        }
        this.saveLineCfgData("publish");
        var responseData = this.lineId;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        return this.http.post(_configuration__WEBPACK_IMPORTED_MODULE_12__["config"].publishServer + '/config/publish/line', responseData, options)
            .subscribe(function (data) {
            var pubStatus = 'Publish ' + data.statusText;
            var dialogRef = classObj.dialog.open(_hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_10__["HintdialogComponent"], {
                data: {
                    "statusText": pubStatus
                },
                hasBackdrop: true,
                disableClose: true,
                width: "200px"
            });
        }, function (err) {
            var dialogRef = classObj.dialog.open(_hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_10__["HintdialogComponent"], {
                data: {
                    "statusText": "Publish ERROR"
                },
                hasBackdrop: true,
                disableClose: true,
                width: "200px"
            });
        }, function () {
            _this.saveTimeToDB();
        });
    };
    InstanceComponent.prototype.saveTimeToDB = function () {
        var responseData = "save time";
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].publishServer + '/time/lineUpdate';
        return this.http.post(url, responseData, options)
            .subscribe(function (data) {
        }, function (err) { }, function () { return console.log("Update time success!"); });
    };
    // 校验变量是否配置完全
    InstanceComponent.prototype.validVariablesDs = function () {
        relationMap.forEach(function (value, key, map) {
            if (typeof (value.dataSource) == "undefined") {
                throw new Error("ending"); //报错，就跳出循环
            }
        });
    };
    InstanceComponent.prototype.saveLineCfgData = function (operation) {
        if (operation != "publish") {
            try {
                this.validVariablesDs();
            }
            catch (e) {
                alert("Some variables are not configured!");
                return;
            }
        }
        var m = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["Model"]();
        m.lineId = this.lineId;
        m.model = this.diagram.model.toJson();
        var lsml = this.convertStationMtsMapToArr(this.stationMtsMap);
        this.logger.debug("Relationship between messagetypes and line/stations:", lsml);
        var ioArr = this.convertIoDeviceMapToArr(relationMap);
        this.logger.debug("Configuration of iodevice instances:", ioArr);
        var ioRlaArr = this.convertIoDeviceBindedRla();
        this.logger.debug("Relationship of iodevice/input/messagetype/station/line:", ioRlaArr);
        var ioInsArr = this.convertIoDeviceModelInsToArr(this.ioDeviceInsMap);
        this.logger.debug("Relationship of iodevice instance model:", ioInsArr);
        var co = this.convertCoMapToObj(changeOverCfgMap);
        this.logger.debug("Configuration of changeover:", co);
        var cin = this.convertInsNodeMapToList(deviceInsIdKey);
        this.logger.debug("Relationship of iodevice instance and line model node:", cin);
        this.saveInsNodeRlaToDB(cin);
        this.saveChangeOverCfgToDB(co);
        this.saveIoDeviceModelInsToDB(ioInsArr);
        this.saveIoDeviceBindedRlaToDB(ioRlaArr);
        this.saveIodeviceInsToDB(ioArr);
        this.saveStationMtsToDB(lsml);
        this.saveModelToDB(m, operation);
    };
    InstanceComponent.prototype.saveIodeviceInsToDB = function (ioInstanceArr) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + classObj.lineId + '/iodevices';
        return this.http.post(url, ioInstanceArr, options)
            .subscribe(function (data) { }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.convertInsNodeMapToList = function (inmMap) {
        var arr = [];
        inmMap.forEach(function (value, key, map) {
            var t = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["LineInsNodeRla"]();
            t.setLineId(classObj.lineId);
            t.setIoDeviceId(key);
            for (var i = 0; i < value.length; i++) {
                t.getNodeKeys().push(value[i]);
            }
            arr.push(t);
        });
        return arr;
    };
    InstanceComponent.prototype.convertCoMapToObj = function (coMap) {
        var o = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["LineMtCfg"]();
        coMap.forEach(function (value, key, map) {
            o.setIoDeviceId(key);
            o.setLineId(classObj.lineId);
            o.setType("CHANGEOVER");
            var c = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["MtCfg"]();
            c.setEvent(value.event);
            c.setHintStatus(value.hintStatus);
            c.setResetTime(value.resetTime);
            o.setMtCfg(c);
        });
        return o;
    };
    InstanceComponent.prototype.convertIoDeviceModelInsToArr = function (ioDeviceInsMap) {
        var arr = [];
        ioDeviceInsMap.forEach(function (value, key, map) {
            // iodevice 没有配置则不保存
            if (typeof (relationMap.get(key)) != "undefined") {
                value["lineId"] = classObj.lineId;
                arr.push(value);
            }
        });
        return arr;
    };
    InstanceComponent.prototype.saveChangeOverCfgToDB = function (co) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + classObj.lineId + '/changeOver';
        return this.http.post(url, co, options)
            .subscribe(function (data) { }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.saveInsNodeRlaToDB = function (arr) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + classObj.lineId + '/lineInsNodeRla';
        return this.http.post(url, arr, options)
            .subscribe(function (data) { }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.saveIoDeviceModelInsToDB = function (ioInsArr) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + classObj.lineId + '/iodeviceModelIns';
        return this.http.post(url, ioInsArr, options)
            .subscribe(function (data) { }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.convertIoDeviceBindedRla = function () {
        var arr = [];
        var cursor = classObj.diagram.findTopLevelGroups();
        var _loop_1 = function () {
            var element = cursor.value;
            // station 级别
            if (element.category == "OfGroups") {
                element.memberParts.each(function (msgType) {
                    if (msgType instanceof gojs__WEBPACK_IMPORTED_MODULE_9__["Group"]) {
                        msgType.memberParts.each(function (input) {
                            if (input instanceof gojs__WEBPACK_IMPORTED_MODULE_9__["Group"]) {
                                input.memberParts.each(function (ioDevice) {
                                    var er = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["IoDeviceBindedRla"]();
                                    er.setLineId(classObj.lineId);
                                    er.setStationId(element.data.key);
                                    er.setMtUniqId(msgType.data.key);
                                    er.setMtInput(input.data.text);
                                    er.setIoDeviceId(ioDevice.data.id);
                                    arr.push(er);
                                });
                            }
                        });
                    }
                });
            }
            else if (element.category == "lineMtGroup" || element.category == "coMsgGroups") {
                element.memberParts.each(function (input) {
                    if (input instanceof gojs__WEBPACK_IMPORTED_MODULE_9__["Group"]) {
                        input.memberParts.each(function (ioDevice) {
                            var er = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["IoDeviceBindedRla"]();
                            er.setLineId(classObj.lineId);
                            er.setStationId(classObj.lineId);
                            er.setMtUniqId(element.data.key);
                            er.setMtInput(input.data.text);
                            er.setIoDeviceId(ioDevice.data.id);
                            arr.push(er);
                        });
                    }
                });
            }
        };
        while (cursor.next()) {
            _loop_1();
        }
        return arr;
    };
    InstanceComponent.prototype.convertIoDeviceMapToArr = function (iodeviceMap) {
        var ioArr = [];
        iodeviceMap.forEach(function (value, key, map) {
            var li = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["LineIodevice"]();
            li.setIoDeviceId(key);
            li.setDisplayName(value.displayName);
            li.setIoDeviceName(value.ioDeviceName);
            //let ds = new DataSource();
            //ds.setProtocol(value.dataSource.protocol);
            //delete value.datasource.protocol;
            //ds.setConfig(JSON.stringify(value.dataSource));
            li.setDataSource(value.dataSource);
            li.setType(value.type);
            li.setPreprocessing(value.preprocessing);
            if (typeof (value.mappingTable) != "undefined" &&
                value.mappingTable != null) {
                var mt = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["mappingTable"]();
                mt.setEnabled(value.mappingTable.enabled);
                if (typeof (value.mappingTable.mappingTable) != "string") {
                    mt.setMappingTable(JSON.stringify(value.mappingTable.mappingTable));
                }
                else {
                    mt.setMappingTable(value.mappingTable.mappingTable);
                }
                li.setMappingTable(mt);
            }
            ioArr.push(li);
        });
        return ioArr;
    };
    InstanceComponent.prototype.convertStationMtsMapToArr = function (rlaMap) {
        var lsml = [];
        rlaMap.forEach(function (value, key, map) {
            for (var i = 0; i < value.length; i++) {
                var tmpE = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["LineMtRla"]();
                tmpE.setLineId(classObj.lineId);
                tmpE.setMtId(value[i].id);
                tmpE.setStationId(key);
                tmpE.setStationName(classObj.stationsMap.get(key));
                var tmpType = classObj.lineId == key ? "line" : "station";
                tmpE.setType(tmpType);
                tmpE.setMtUniqId(value[i].nodeKey);
                lsml.push(tmpE);
            }
        });
        return lsml;
    };
    InstanceComponent.prototype.saveStationMtsToDB = function (stationMtsArr) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + classObj.lineId + '/messagetype';
        return this.http.post(url, stationMtsArr, options)
            .subscribe(function (data) { }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.saveIoDeviceBindedRlaToDB = function (ioRlaArr) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + classObj.lineId + '/iodeviceBindedRla';
        return this.http.post(url, ioRlaArr, options)
            .subscribe(function (data) { }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.saveModelToDB = function (model, operation) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + model.id + '/model';
        return this.http.post(url, model, options)
            .subscribe(function (data) {
            if (data.status == 200) {
                if (operation != "next") {
                    alert("save success!");
                }
            }
        }, function (err) { }, function () { });
    };
    InstanceComponent.prototype.readModelById = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + id + '/model';
        return this.http.get(url, options)
            .subscribe(function (response) {
            //let initFlag = false;
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    // fix the line messagetype drag area to the top-left corner 
                    classObj.diagram.initialPosition = new gojs__WEBPACK_IMPORTED_MODULE_9__["Point"](0, 0);
                    classObj.diagram.model = gojs__WEBPACK_IMPORTED_MODULE_9__["Model"].fromJson(pros.model);
                    //let nda = classObj.diagram.model.nodeDataArray;
                    //if(typeof(nda)!="undefined" && nda.length == 0){
                    //  for(let m=0;m<nda.length;m++){
                    //    if(nda[m]["key"] == this.lineId){
                    //initFlag = true;
                    //      break;
                    //    }
                    //  }
                    //}
                }
            }
            //else{
            //initFlag = true;
            //}
            //if(initFlag){
            // 默认构造Product Line message
            //let k = $($(".testModel")[0]).width();
            //let lineGroupObj = {key:this.lineId, text: "Message Type for Production Line",isGroup: true, category:"LineGroups",containing:[], loc:new go.Point(0, 0),size:"800 50"};
            //classObj.diagram.model.addNodeData(lineGroupObj);
            //}
            classObj.getTopGroups();
            var groupsStr = classObj.convertGroupMapToObj();
            classObj.stations = groupsStr;
        }, function (err) { }, function () { return console.log('Call Complete'); });
    };
    /**
     * 获得station map
     */
    InstanceComponent.prototype.getTopGroups = function () {
        var cursor = classObj.diagram.findTopLevelGroups();
        while (cursor.next()) {
            var group = cursor.value;
            var data = group.data;
            if (group.category == "OfGroups") {
                classObj.stationsMap.set(data.key, data.text);
            }
        }
    };
    /**
     * map 转化为对象数组
     */
    InstanceComponent.prototype.convertGroupMapToObj = function () {
        var arr = [];
        this.stationsMap.forEach(function (value, key, map) {
            var so = new _instance_common__WEBPACK_IMPORTED_MODULE_19__["SimpleObj"]();
            so.setId(key);
            so.setName(value);
            arr.push(so);
        });
        return JSON.stringify(arr);
    };
    InstanceComponent.prototype.readIoDeviceBindedById = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + id + '/iodevices';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    for (var i = 0; i < pros.length; i++) {
                        relationMap.set(pros[i].ioDeviceId, pros[i]);
                        storedIpsMap.set(pros[i].dataSource.ip, 1); // 用于S7提示自动补全
                        storedAddressesMap.set(pros[i].dataSource.address, 1);
                    }
                }
            }
        }, function (err) { }, function () { return console.log('Call Complete'); });
    };
    InstanceComponent.prototype.readChangeOverById = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + id + '/changeOver';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    var obj = {
                        'ioDeviceId': pros.ioDeviceId,
                        'event': pros.mtCfg.event,
                        'resetTime': pros.mtCfg.resetTime,
                        'hintStatus': pros.mtCfg.hintStatus
                    };
                    changeOverCfgMap.set(pros.ioDeviceId, obj);
                }
            }
        }, function (err) { }, function () { return console.log('Call Complete'); });
    };
    InstanceComponent.prototype.readInsNodeRlaById = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_7__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_12__["config"].backendUrl + '/lines/' + id + '/lineInsNodeRla';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "[]") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    for (var i = 0; i < pros.length; i++) {
                        deviceInsIdKey.set(pros[i].ioDeviceId, pros[i].nodeKeys);
                    }
                }
            }
        }, function (err) { }, function () { return console.log('Call Complete'); });
    };
    InstanceComponent.prototype.loadDefaultButton = function (num) {
        var curNode = relationMap.get(classObj.selectNodeKey);
        if (typeof (curNode) != "undefined" && curNode != null) {
            var type = curNode.type;
            if (type == "Button") {
                classObj.displayDeviceComponent('Button', 'echo', _configuration__WEBPACK_IMPORTED_MODULE_12__["buttonsIFS"][num]);
            }
        }
    };
    InstanceComponent.prototype.loadDefaultScanner = function () {
        var curNode = relationMap.get(classObj.selectNodeKey);
        if (typeof (curNode) != "undefined" && curNode != null) {
            var type = curNode.type;
            if (type == "Scanner") {
                classObj.displayDeviceComponent('Scanner', 'echo', _configuration__WEBPACK_IMPORTED_MODULE_12__["scannerIFS"][0]);
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modelBlock'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], InstanceComponent.prototype, "diagramRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_dynamicIoDevice_directive__WEBPACK_IMPORTED_MODULE_4__["DynamicComponentDirective"]),
        __metadata("design:type", _dynamicIoDevice_directive__WEBPACK_IMPORTED_MODULE_4__["DynamicComponentDirective"])
    ], InstanceComponent.prototype, "componentHost", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_dynamicIoDevicePanel_directive__WEBPACK_IMPORTED_MODULE_5__["DynamicIoDevicePanelDirective"]),
        __metadata("design:type", _dynamicIoDevicePanel_directive__WEBPACK_IMPORTED_MODULE_5__["DynamicIoDevicePanelDirective"])
    ], InstanceComponent.prototype, "ioDevicePanel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", gojs__WEBPACK_IMPORTED_MODULE_9__["Model"]),
        __metadata("design:paramtypes", [gojs__WEBPACK_IMPORTED_MODULE_9__["Model"]])
    ], InstanceComponent.prototype, "model", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], InstanceComponent.prototype, "nodeSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], InstanceComponent.prototype, "modelChanged", void 0);
    InstanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-instance',
            template: __webpack_require__(/*! ./instance.component.html */ "./src/app/instance/instance.component.html"),
            styles: [__webpack_require__(/*! ./instance.component.css */ "./src/app/instance/instance.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"],
            _dynamicIoDevice_service__WEBPACK_IMPORTED_MODULE_1__["DynamicComponentService"], _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"], _angular_http__WEBPACK_IMPORTED_MODULE_7__["Http"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"], _dynamicIoDevicePanel_service__WEBPACK_IMPORTED_MODULE_2__["DynamicIoDevicePanelService"],
            _dynamicLinePublish_service__WEBPACK_IMPORTED_MODULE_3__["DynamicLinePublishService"], ngx_logger__WEBPACK_IMPORTED_MODULE_20__["NGXLogger"]])
    ], InstanceComponent);
    return InstanceComponent;
}());



/***/ }),

/***/ "./src/app/io-device/io-device.component.css":
/*!***************************************************!*\
  !*** ./src/app/io-device/io-device.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-vertical-content {\r\n  padding: 0 24px 0px 24px;\r\n}\r\n\r\n.titleBlock {\r\n  padding: 10px 0px 10px 0px;\r\n  background: rgba(0, 0, 0, .09);\r\n  position: relative;\r\n}\r\n\r\n.titleStyle {\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size: 15px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW8tZGV2aWNlL2lvLWRldmljZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsMEJBQTBCO0VBQzFCLDhCQUE4QjtFQUM5QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIscURBQXFEO0VBQ3JELGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9pby1kZXZpY2UvaW8tZGV2aWNlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LXZlcnRpY2FsLWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDAgMjRweCAwcHggMjRweDtcclxufVxyXG5cclxuLnRpdGxlQmxvY2sge1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjA5KTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi50aXRsZVN0eWxlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/io-device/io-device.component.html":
/*!****************************************************!*\
  !*** ./src/app/io-device/io-device.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--iodevice分类面板-->\n<div style=\"height: 100%;\" fxLayout=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\"\n  fxLayoutGap.xs=\"0\">\n  <div class=\"titleBlock titleStyle\">\n    <h2 style=\"font-size: 15px\">I/O Device</h2>\n  </div>\n  <div #logicDevice style=\"width:100%;height: 100%;\">\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/io-device/io-device.component.ts":
/*!**************************************************!*\
  !*** ./src/app/io-device/io-device.component.ts ***!
  \**************************************************/
/*! exports provided: IoDeviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IoDeviceComponent", function() { return IoDeviceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// gojs $与jQuery冲突
var GO = gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].make;
var lightText = 'whitesmoke';
var classObj;
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var IoDeviceComponent = /** @class */ (function () {
    function IoDeviceComponent(http) {
        this.http = http;
        this.paletteDevice = new gojs__WEBPACK_IMPORTED_MODULE_3__["Palette"]();
        this.deviceCount = 0;
        this.selectNodeKey = "";
        this.lineId = "";
        this.hasIoDevicePanelInit = false;
        this.updateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        classObj = this;
        this.paletteDevice.layout = GO(gojs__WEBPACK_IMPORTED_MODULE_3__["GridLayout"], {
            wrappingColumn: 1,
            spacing: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](2, 2)
        });
        this.paletteDevice.toolManager.mouseWheelBehavior = gojs__WEBPACK_IMPORTED_MODULE_3__["ToolManager"].WheelNone, //鼠标滚轮事件禁止
            this.paletteDevice.allowDragOut = true; //允许拖拽出框
        this.paletteDevice.allowMove = false; // 不允许内部移动
        this.paletteDevice.undoManager.isEnabled = true;
        this.paletteDevice.initialContentAlignment = gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center;
        this.paletteDevice.animationManager.isEnabled = false;
        this.paletteDevice.addDiagramListener("ObjectSingleClicked", function (e) {
            var node = e.diagram.selection.first();
            if (node instanceof gojs__WEBPACK_IMPORTED_MODULE_3__["Node"]) {
                node.part.isSelected = false;
            }
        });
        this.paletteDevice.groupTemplateMap.add("OfGroups", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Group"], "Auto", {
            layout: GO(gojs__WEBPACK_IMPORTED_MODULE_3__["GridLayout"], {
                wrappingColumn: 1,
                alignment: gojs__WEBPACK_IMPORTED_MODULE_3__["GridLayout"].Position,
                cellSize: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](1, 1),
                spacing: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](0, 2)
            }),
            pickable: false,
            selectable: false
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Shape"], "Rectangle", {
            fill: null,
            stroke: null
        }), GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"].Vertical, // title above Placeholder
        {
            width: 168
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"].Horizontal, // button next to TextBlock
        {
            stretch: gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].Horizontal,
            background: "#607D8B",
            margin: 0
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"], {
            alignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center,
            margin: 5,
            font: "bold 10pt helvetica, bold arial, sans-serif",
            stroke: "#fff"
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("text", "text").makeTwoWay())), // end Horizontal Panel
        GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Placeholder"], {
            padding: 5,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].TopLeft
        })) // end Vertical Panel
        )); // end Group and call to add to template Map
        this.paletteDevice.nodeTemplateMap.add("", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Node"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Shape"], "Rectangle", {
            fill: "#00A9C9",
            stroke: null
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], "Horizontal", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"], {
            font: "bold 10pt Helvetica, Arial, sans-serif",
            verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center,
            stroke: lightText,
            margin: 5,
            stretch: gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].Fill,
            desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](125, 30),
            textAlign: "center",
            wrap: gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"].WrapFit,
            editable: true
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("text", "text").makeTwoWay()), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.createIoDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_add.png", {
            width: 16,
            height: 16,
        })))));
        this.paletteDevice.nodeTemplateMap.add("ButtonInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Node"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Shape"], "Rectangle", {
            fill: "#00A9C9",
            stroke: null
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], "Horizontal", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"], {
            font: "bold 10pt Helvetica, Arial, sans-serif",
            verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center,
            stroke: lightText,
            margin: 2,
            stretch: gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].Fill,
            desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](108, 30),
            textAlign: "center",
            wrap: gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"].WrapFit,
            editable: true
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("text", "text").makeTwoWay()), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.configDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_edit.png", {
            width: 16,
            height: 16,
        })), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.deleteDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_delete.png", {
            width: 16,
            height: 16,
        })))));
        this.paletteDevice.nodeTemplateMap.add("PlcDeviceInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Node"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Shape"], "Rectangle", {
            fill: "#00A9C9",
            stroke: null
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], "Horizontal", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"], {
            font: "bold 10pt Helvetica, Arial, sans-serif",
            verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center,
            stroke: lightText,
            margin: 2,
            stretch: gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].Fill,
            desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](108, 30),
            textAlign: "center",
            wrap: gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"].WrapFit,
            editable: true
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("text", "text").makeTwoWay()), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.configDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_edit.png", {
            width: 16,
            height: 16,
        })), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.deleteDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_delete.png", {
            width: 16,
            height: 16,
        })))));
        this.paletteDevice.nodeTemplateMap.add("SwitchInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Node"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Shape"], "Rectangle", {
            fill: "#00A9C9",
            stroke: null
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], "Horizontal", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"], {
            font: "bold 10pt Helvetica, Arial, sans-serif",
            verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center,
            stroke: lightText,
            margin: 2,
            stretch: gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].Fill,
            desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](108, 30),
            textAlign: "center",
            wrap: gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"].WrapFit,
            editable: true
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("text", "text").makeTwoWay()), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.configDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_edit.png", {
            width: 16,
            height: 16,
        })), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.deleteDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_delete.png", {
            width: 16,
            height: 16,
        })))));
        this.paletteDevice.nodeTemplateMap.add("ScannerInstance", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Node"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Shape"], "Rectangle", {
            fill: "#00A9C9",
            stroke: null
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("fill", "color")), GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Panel"], "Horizontal", GO(gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"], {
            font: "bold 10pt Helvetica, Arial, sans-serif",
            verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_3__["Spot"].Center,
            stroke: lightText,
            margin: 2,
            stretch: gojs__WEBPACK_IMPORTED_MODULE_3__["GraphObject"].Fill,
            desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_3__["Size"](86, 30),
            textAlign: "center",
            wrap: gojs__WEBPACK_IMPORTED_MODULE_3__["TextBlock"].WrapFit,
            editable: true
        }, new gojs__WEBPACK_IMPORTED_MODULE_3__["Binding"]("text", "text").makeTwoWay()), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.copyScannerInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_copy.png", {
            width: 16,
            height: 16,
        })), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.configDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_edit.png", {
            width: 16,
            height: 16,
        })), GO("Button", {
            "ButtonBorder.fill": "#00A9C9",
            "ButtonBorder.stroke": "transparent",
            "_buttonFillOver": "#00A9C9",
            "_buttonStrokeOver": "#00A9C9",
            click: classObj.deleteDeviceInstance,
        }, GO(gojs__WEBPACK_IMPORTED_MODULE_3__["Picture"], "assets/images/device_delete.png", {
            width: 16,
            height: 16,
        })))));
        var deviceDataArray = [{
                key: 1,
                text: "I/O Device Type",
                isGroup: true,
                category: "OfGroups"
            },
            {
                key: 2,
                text: "I/O Device Instance",
                isGroup: true,
                category: "OfGroups"
            },
            {
                text: "Push Button",
                category: "Button",
                unConfig: true,
                config: false,
                group: 1
            },
            {
                text: "Barcode Scanner",
                category: "Scanner",
                unConfig: true,
                config: false,
                group: 1
            },
            {
                text: "PLC",
                category: "PlcDevice",
                unConfig: true,
                config: false,
                group: 1
            },
            {
                text: "Proximity Switch",
                category: "Switch",
                unConfig: true,
                config: false,
                group: 1
            }
        ];
        classObj.paletteDevice.model = new gojs__WEBPACK_IMPORTED_MODULE_3__["GraphLinksModel"](deviceDataArray);
    }
    IoDeviceComponent.prototype.setAlias = function (v) {
        this._alias = v;
        if (v != "") {
            var nodeData = classObj.paletteDevice.model.findNodeDataForKey(classObj.selectNodeKey);
            if (nodeData != null) {
                // 需要加事务，否则修改完之后拖拽修改无效
                classObj.paletteDevice.startTransaction("modify node name");
                classObj.paletteDevice.model.setDataProperty(nodeData, "text", v);
                classObj.paletteDevice.commitTransaction("modify node name");
            }
        }
    };
    IoDeviceComponent.prototype.getAlias = function () {
        return this._alias;
    };
    IoDeviceComponent.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    IoDeviceComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
        }
    };
    IoDeviceComponent.prototype.configDeviceInstance = function (e, obj) {
        //  取消前一个节点选中
        var lastSelectNode = classObj.paletteDevice.findNodeForKey(classObj.selectNodeKey);
        if (typeof (lastSelectNode) != "undefined" && lastSelectNode != null) {
            lastSelectNode.part.isSelected = false;
        }
        obj.part.isSelected = true;
        var node = obj.part;
        var data = node.data;
        if (data) {
            classObj.selectNodeKey = data.key;
            classObj.updateEmitter.emit({
                "operation": "new",
                "data": data
            });
        }
    };
    IoDeviceComponent.prototype.copyScannerInstance = function (e, obj) {
        // 在iodevice面板中创建新的实例
        classObj.deviceCount += 1;
        var tmpId = uuidv4().replace(/\-/g, "");
        var nodeName = "Scanner" + classObj.deviceCount;
        var msg = {
            text: nodeName,
            category: "ScannerInstance",
            group: 2,
            id: tmpId,
            key: tmpId
        };
        classObj.paletteDevice.startTransaction("copy scanner instance");
        classObj.paletteDevice.model.addNodeData(msg);
        classObj.paletteDevice.commitTransaction("copy scanner instance");
        // 保存新实例的key
        classObj.selectNodeKey = tmpId;
        // 发送复制的节点信息
        var node = obj.part;
        var data = node.data;
        if (data) {
            classObj.updateEmitter.emit({
                "operation": "copy",
                "data": data,
                "newKey": tmpId,
                "newName": nodeName
            });
        }
    };
    IoDeviceComponent.prototype.deleteDeviceInstance = function (e, obj) {
        var nodeP = obj.part;
        classObj.paletteDevice.startTransaction("delete node");
        var node = classObj.paletteDevice.findNodeForKey(nodeP.data.key);
        classObj.paletteDevice.remove(node);
        classObj.paletteDevice.commitTransaction("delete node");
        classObj.updateEmitter.emit({
            "operation": "delete",
            "data": nodeP.data
        });
    };
    IoDeviceComponent.prototype.createIoDeviceInstance = function (e, obj) {
        classObj.deviceCount += 1;
        var tmpId = uuidv4().replace(/\-/g, "");
        var node = obj.part;
        var data = node.data;
        var category;
        if (data) {
            category = data.category;
            var msg = void 0;
            var nodeName = data.text + classObj.deviceCount;
            if (category == "Button") {
                // Id属性记录拖拽之前的模板Id，用于改名称同步
                msg = {
                    text: nodeName,
                    category: "ButtonInstance",
                    group: 2,
                    id: tmpId,
                    key: tmpId
                };
            }
            else if (category == "Scanner") {
                msg = {
                    text: nodeName,
                    category: "ScannerInstance",
                    group: 2,
                    id: tmpId,
                    key: tmpId
                };
            }
            else if (category == "PlcDevice") {
                msg = {
                    text: nodeName,
                    category: "PlcDeviceInstance",
                    group: 2,
                    id: tmpId,
                    key: tmpId
                };
            }
            else if (category == "Switch") {
                msg = {
                    text: nodeName,
                    category: "SwitchInstance",
                    group: 2,
                    id: tmpId,
                    key: tmpId
                };
            }
            classObj.paletteDevice.startTransaction("add node");
            classObj.paletteDevice.model.addNodeData(msg);
            classObj.paletteDevice.commitTransaction("add node");
        }
        //console.dir(classObj.paletteDevice.model.toJson());
    };
    IoDeviceComponent.prototype.queryIoDeviceInsDataArray = function (lineId) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].backendUrl + '/lines/' + lineId + '/iodeviceModelIns';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "[]") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    var arr = [];
                    for (var i = 0; i < pros.length; i++) {
                        delete pros[i].lineId;
                        arr.push(pros[i]);
                    }
                    classObj.paletteDevice.startTransaction("add node array");
                    classObj.paletteDevice.model.addNodeDataCollection(arr);
                    classObj.paletteDevice.startTransaction("add node array");
                    classObj.paletteDevice.requestUpdate();
                }
            }
        }, function (err) {
        }, function () { return console.log('queryIoDeviceInstanceModel Complete!'); });
    };
    IoDeviceComponent.prototype.ngOnInit = function () {
        this.paletteDevice.div = this.logicDeviceRef.nativeElement;
        if (this.hasIoDevicePanelInit == false) {
            this.queryIoDeviceInsDataArray(this.lineId);
            this.hasIoDevicePanelInit = true;
        }
    };
    IoDeviceComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], IoDeviceComponent.prototype, "updateEmitter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], IoDeviceComponent.prototype, "setAlias", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('logicDevice'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], IoDeviceComponent.prototype, "logicDeviceRef", void 0);
    IoDeviceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-io-device',
            template: __webpack_require__(/*! ./io-device.component.html */ "./src/app/io-device/io-device.component.html"),
            styles: [__webpack_require__(/*! ./io-device.component.css */ "./src/app/io-device/io-device.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], IoDeviceComponent);
    return IoDeviceComponent;
}());



/***/ }),

/***/ "./src/app/io/io.component.css":
/*!*************************************!*\
  !*** ./src/app/io/io.component.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n  width:100%;\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n  text-align: center;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\n.button{\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  cursor: pointer;\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: transparent;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n  text-align: center;\r\n  margin: 0;\r\n  line-height: 36px;\r\n  border-radius: 2px;\r\n  -webkit-transform: translate3d(0,0,0);\r\n          transform: translate3d(0,0,0);\r\n  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n  background:rgb(224, 224,224);\r\n  width: 50px\r\n}\r\n\r\np{\r\n  margin-left: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW8vaW8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDViwwQkFBMEI7RUFDMUIsMEJBQTBCO0VBQzFCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixzQkFBc0I7RUFDdEIscUJBQXFCO0VBQ3JCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsVUFBVTtFQUNWLHdDQUF3QztFQUN4QyxxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQix3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IsOEZBQThGO0VBQzlGLDRCQUE0QjtFQUM1QjtBQUNGOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvaW8vaW8uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJsb2Nre1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgcGFkZGluZzogMTBweCAwcHggMTBweCAwcHg7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5oMiB7XHJcbiAgbWFyZ2luOjBweCAxLjI1cmVtO1xyXG4gIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uYnV0dG9ue1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG91dGxpbmU6IDA7XHJcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW46IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSk7XHJcbiAgYmFja2dyb3VuZDpyZ2IoMjI0LCAyMjQsMjI0KTtcclxuICB3aWR0aDogNTBweFxyXG59XHJcblxyXG5we1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/io/io.component.html":
/*!**************************************!*\
  !*** ./src/app/io/io.component.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n\n<!--封装第二行-->\n<div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n  <div style=\"height: 210px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<p style=\"height: 30px;\">Name</p>-->\n    <!--<p style=\"height: 30px;\">Alias</p>-->\n    <p style=\"height: 30px;\">Pin</p>\n    <p style=\"height: 30px;\">Dir</p>\n    <p style=\"height: 30px;\">Trigger</p>\n    <p style=\"height: 30px;\">Cycle</p>\n    <p style=\"height: 30px;\">DataType</p>\n  </div>\n  <div style=\"height: 210px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"name\" (blur)=\"copyToAlias()\">-->\n    <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"alias\">-->\n    <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"pin\">\n    <select [ngModel]=\"selectedDir\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onDirChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of dirs; let j = index\">{{item}}</option>\n    </select>\n    <select [ngModel]=\"selectedTrigger\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onTriggerChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of triggers; let j = index\">{{item}}</option>\n    </select>\n    <select [ngModel]=\"selectedCycle\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onCycleChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of cycles; let j = index\">{{item}}</option>\n    </select>\n    <select [ngModel]=\"selectedDataType\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onDataTypeChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of dataTypes; let j = index\">{{item}}</option>\n    </select>\n  </div>\n\n  <!--间距-->\n  <div></div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/io/io.component.ts":
/*!************************************!*\
  !*** ./src/app/io/io.component.ts ***!
  \************************************/
/*! exports provided: IoComponent, IoInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IoComponent", function() { return IoComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IoInfo", function() { return IoInfo; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IoComponent = /** @class */ (function () {
    function IoComponent() {
        //private name: string="";
        //private alias: string="";
        this.pin = "";
        this.cycles = new Array();
        this.dataTypes = new Array();
        this.dirs = new Array();
        this.triggers = new Array();
        this.selectedCycle = "5s";
        this.selectedDataType = "INT";
        this.selectedDir = "DIR_OUT";
        this.selectedTrigger = "EDGE_RISING";
        this.cycles.push("10ms");
        this.cycles.push("100ms");
        this.cycles.push("500ms");
        this.cycles.push("1s");
        this.cycles.push("5s");
        this.cycles.push("10s");
        this.cycles.push("15s");
        this.cycles.push("30s");
        this.cycles.push("1m");
        this.dataTypes.push("BOOLEAN");
        this.dataTypes.push("INT");
        this.dataTypes.push("LONG");
        this.dataTypes.push("DOUBLE");
        this.dataTypes.push("STRING");
        this.dirs.push("DIR_OUT");
        this.dirs.push("DIR_IN");
        this.dirs.push("DIR_OUT_HIGH");
        this.dirs.push("DIR_OUT_LOW");
        this.triggers.push("EDGE_NONE");
        this.triggers.push("EDGE_BOTH");
        this.triggers.push("EDGE_RISING");
        this.triggers.push("EDGE_FALLING");
    }
    IoComponent.prototype.ngOnInit = function () {
    };
    //setName(name:string){
    //  this.name = name;
    //}
    //setAlias(alias){
    //  this.alias = alias;
    //}
    IoComponent.prototype.setPin = function (pin) {
        this.pin = pin;
    };
    IoComponent.prototype.setSelectedCycle = function (cycle) {
        this.selectedCycle = cycle;
    };
    IoComponent.prototype.setSelectedDataType = function (dataType) {
        this.selectedDataType = dataType;
    };
    IoComponent.prototype.setSelectedDir = function (dir) {
        this.selectedDir = dir;
    };
    IoComponent.prototype.setSelectedTrigger = function (trigger) {
        this.selectedTrigger = trigger;
    };
    IoComponent.prototype.onCycleChange = function (newVal) {
        this.selectedCycle = newVal;
    };
    IoComponent.prototype.onDataTypeChange = function (newVal) {
        this.selectedDataType = newVal;
    };
    IoComponent.prototype.onDirChange = function (newVal) {
        this.selectedDir = newVal;
    };
    IoComponent.prototype.onTriggerChange = function (newVal) {
        this.selectedTrigger = newVal;
    };
    IoComponent.prototype.cfgComponentInfo = function (nodeObj) {
        //this.setName(nodeObj.name);
        //this.setAlias(nodeObj.alias);
        var cfg;
        if (typeof (nodeObj.config) == "string") {
            cfg = JSON.parse(nodeObj.config);
        }
        else {
            cfg = nodeObj.config;
        }
        this.setPin(cfg.pin);
        this.setSelectedCycle(cfg.cycle);
        this.setSelectedDataType(cfg.dataType);
        this.setSelectedDir(cfg.dir);
        this.setSelectedTrigger(cfg.trigger);
    };
    //copyToAlias(){
    //  if(this.name != ""){
    //    this.alias = this.name;
    //  }
    //}
    IoComponent.prototype.saveComponentInfo = function () {
        if (this.judgeInputNull(this.pin.trim())) {
            alert("All properties need to be filled!");
            return;
        }
        else {
            var ii = new IoInfo();
            //ii.setName(this.name.trim());
            //ii.setAlias(this.alias.trim());
            ii.setPin(this.pin.trim());
            ii.setProtocol("DIO");
            if (this.selectedCycle != null && this.selectedCycle != "") {
                ii.setCycle(this.selectedCycle);
            }
            if (this.selectedDataType != null && this.selectedDataType != "") {
                ii.setDataType(this.selectedDataType);
            }
            if (this.selectedDir != null && this.selectedDir != "") {
                ii.setDir(this.selectedDir);
            }
            if (this.selectedTrigger != null && this.selectedTrigger != "") {
                ii.setTrigger(this.selectedTrigger);
            }
            return ii;
        }
    };
    IoComponent.prototype.judgeInputNull = function (input) {
        if (typeof (input) == undefined || input == null || input.trim() == "") {
            return true;
        }
        else {
            return false;
        }
    };
    IoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-button',
            template: __webpack_require__(/*! ./io.component.html */ "./src/app/io/io.component.html"),
            styles: [__webpack_require__(/*! ./io.component.css */ "./src/app/io/io.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], IoComponent);
    return IoComponent;
}());

var IoInfo = /** @class */ (function () {
    function IoInfo() {
        //this.name="";
        //this.alias="";
        this.pin = "";
        this.cycle = "5s";
        this.dataType = "INT";
        this.dir = "DIR_OUT";
        this.trigger = "EDGE_RISING";
    }
    //setName(name:string){
    // this.name = name;
    //}
    //getName(): string{
    //  return this.name;
    //}
    //setAlias(alias){
    //  this.alias=alias;
    //}
    //getAlias(){
    //  return this.alias;
    //}
    IoInfo.prototype.setPin = function (pin) {
        this.pin = pin;
    };
    IoInfo.prototype.getPin = function () {
        return this.pin;
    };
    IoInfo.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    IoInfo.prototype.setCycle = function (cycle) {
        this.cycle = cycle;
    };
    IoInfo.prototype.getCycle = function () {
        return this.cycle;
    };
    IoInfo.prototype.setDataType = function (dataType) {
        this.dataType = dataType;
    };
    IoInfo.prototype.getDataType = function () {
        return this.dataType;
    };
    IoInfo.prototype.setDir = function (dir) {
        this.dir = dir;
    };
    IoInfo.prototype.getDir = function () {
        return this.dir;
    };
    IoInfo.prototype.setTrigger = function (trigger) {
        this.trigger = trigger;
    };
    IoInfo.prototype.getTrigger = function () {
        return this.trigger;
    };
    return IoInfo;
}());



/***/ }),

/***/ "./src/app/line-element/line-element.component.css":
/*!*********************************************************!*\
  !*** ./src/app/line-element/line-element.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-vertical-content {\r\n  padding: 0 24px 0px 24px;\r\n}\r\n\r\n.titleBlock {\r\n  padding: 10px 0px 10px 0px;\r\n  background: rgba(0, 0, 0, .09);\r\n  position: relative;\r\n}\r\n\r\n.titleStyle {\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size: 15px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGluZS1lbGVtZW50L2xpbmUtZWxlbWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsMEJBQTBCO0VBQzFCLDhCQUE4QjtFQUM5QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIscURBQXFEO0VBQ3JELGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9saW5lLWVsZW1lbnQvbGluZS1lbGVtZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LXZlcnRpY2FsLWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDAgMjRweCAwcHggMjRweDtcclxufVxyXG5cclxuLnRpdGxlQmxvY2sge1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjA5KTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbi50aXRsZVN0eWxlIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/line-element/line-element.component.html":
/*!**********************************************************!*\
  !*** ./src/app/line-element/line-element.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height: 100%;\" fxLayout=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\"\n  fxLayoutGap.xs=\"0\">\n  <div class=\"titleStyle titleBlock\">\n    <h2 style=\"font-size: 15px\">Line Element</h2>\n  </div>\n  <div #myPaletteDiv style=\"width:100%;height: 100%;\">\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/line-element/line-element.component.ts":
/*!********************************************************!*\
  !*** ./src/app/line-element/line-element.component.ts ***!
  \********************************************************/
/*! exports provided: LineElementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineElementComponent", function() { return LineElementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var lightText = 'whitesmoke';
var GO = gojs__WEBPACK_IMPORTED_MODULE_1__["GraphObject"].make;
var LineElementComponent = /** @class */ (function () {
    function LineElementComponent() {
        this.palette = new gojs__WEBPACK_IMPORTED_MODULE_1__["Palette"]();
        this.palette.layout = GO(gojs__WEBPACK_IMPORTED_MODULE_1__["GridLayout"], {
            wrappingColumn: 1,
            alignment: gojs__WEBPACK_IMPORTED_MODULE_1__["GridLayout"].Position,
            cellSize: new gojs__WEBPACK_IMPORTED_MODULE_1__["Size"](1, 1),
            spacing: new gojs__WEBPACK_IMPORTED_MODULE_1__["Size"](0, 2)
        });
        this.palette.nodeTemplate =
            GO(gojs__WEBPACK_IMPORTED_MODULE_1__["Node"], 
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            GO(gojs__WEBPACK_IMPORTED_MODULE_1__["Panel"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_1__["Shape"], "Rectangle", { fill: "#00A9C9", stroke: null }, new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("figure", "fig")), GO(gojs__WEBPACK_IMPORTED_MODULE_1__["TextBlock"], {
                font: "bold 10pt Helvetica, Arial, sans-serif",
                verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_1__["Spot"].Center,
                stroke: lightText,
                margin: 5,
                stretch: gojs__WEBPACK_IMPORTED_MODULE_1__["GraphObject"].Fill,
                desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_1__["Size"](135, 20),
                textAlign: "center",
                wrap: gojs__WEBPACK_IMPORTED_MODULE_1__["TextBlock"].WrapFit,
                editable: true
            }, new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("text").makeTwoWay()))); // end Node
        var nodeDataArray = [{ text: "Material Buffer", isGroup: true, category: "OfGroups", containing: [] },
            { text: "ManualWorkplace", isGroup: true, category: "OfGroups", containing: [] },
            { text: "AutoWorkplace", isGroup: true, category: "OfGroups", containing: [] },
            { text: "Conveyor", isGroup: true, category: "OfGroups", containing: [] },
            { text: "ShippingStation", isGroup: true, category: "OfGroups", containing: [] }];
        this.palette.model = new gojs__WEBPACK_IMPORTED_MODULE_1__["TreeModel"](nodeDataArray);
    }
    LineElementComponent.prototype.ngOnInit = function () {
        this.palette.div = this.paletteRef.nativeElement;
    };
    LineElementComponent.prototype.ngAfterViewInit = function () {
        $(".mat-vertical-content").css("padding-bottom", "0px");
        $(".element canvas").css("left", "");
        //this.ajustPanelH();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myPaletteDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LineElementComponent.prototype, "paletteRef", void 0);
    LineElementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-line-element',
            template: __webpack_require__(/*! ./line-element.component.html */ "./src/app/line-element/line-element.component.html"),
            styles: [__webpack_require__(/*! ./line-element.component.css */ "./src/app/line-element/line-element.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], LineElementComponent);
    return LineElementComponent;
}());



/***/ }),

/***/ "./src/app/line-network/line-network.component.css":
/*!*********************************************************!*\
  !*** ./src/app/line-network/line-network.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".gsfBackground {\r\n  border-color: #f68ce6;\r\n  font-size: 16;\r\n  margin-bottom: 18;\r\n}\r\n\r\n.titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:30px;\r\n}\r\n\r\n.mat-toolbar.mat-primary {\r\n  background: #41aaaa;\r\n}\r\n\r\n.adjustPos{\r\n  margin-top: 8px;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  color: #797978;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\nli {\r\n  list-style-type:none;\r\n}\r\n\r\nul {\r\n  padding-left: 0px;\r\n}\r\n\r\nul li:hover{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\nhtml, body{\r\n  margin:0; height:100%;\r\n}\r\n\r\n.footer{\r\n  width: 100%;\r\n  padding-right: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGluZS1uZXR3b3JrL2xpbmUtbmV0d29yay5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQXFCO0VBQ3JCLGFBQWE7RUFDYixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIscURBQXFEO0VBQ3JELGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxRQUFRLEVBQUUsV0FBVztBQUN2Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxtQkFBbUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9saW5lLW5ldHdvcmsvbGluZS1uZXR3b3JrLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3NmQmFja2dyb3VuZCB7XHJcbiAgYm9yZGVyLWNvbG9yOiAjZjY4Y2U2O1xyXG4gIGZvbnQtc2l6ZTogMTY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTg7XHJcbn1cclxuXHJcbi50aXRsZVN0eWxle1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogXCJTZWdvZSBVSVwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTozMHB4O1xyXG59XHJcblxyXG4ubWF0LXRvb2xiYXIubWF0LXByaW1hcnkge1xyXG4gIGJhY2tncm91bmQ6ICM0MWFhYWE7XHJcbn1cclxuXHJcbi5hZGp1c3RQb3N7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG59XHJcblxyXG5oMiB7XHJcbiAgbWFyZ2luOjBweCAxLjI1cmVtO1xyXG4gIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgY29sb3I6ICM3OTc5Nzg7XHJcbn1cclxuXHJcbmEge1xyXG4gIGNvbG9yOiAjODg4O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxubGkge1xyXG4gIGxpc3Qtc3R5bGUtdHlwZTpub25lO1xyXG59XHJcblxyXG51bCB7XHJcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbn1cclxuXHJcbnVsIGxpOmhvdmVye1xyXG4gIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjA2KTtcclxufVxyXG5cclxuaHRtbCwgYm9keXtcclxuICBtYXJnaW46MDsgaGVpZ2h0OjEwMCU7XHJcbn1cclxuXHJcbi5mb290ZXJ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgcGFkZGluZy1yaWdodDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/line-network/line-network.component.html":
/*!**********************************************************!*\
  !*** ./src/app/line-network/line-network.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--主面板-->\n<div id=\"mainPanel\" style=\"height:100%;width:100%;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"10px\" fxLayoutGap.xs=\"0\">\n\n  <!--配置区-->\n  <!--存在hidden DIVs will not display until browser resize，改为ngIf-->\n  <div fxFlex=\"179.6px\" style=\"border: 1px solid rgba(0,0,0,.09)\" >\n    <app-lines></app-lines>\n  </div>\n\n  <!--model-->\n  <div style=\"border:1px solid rgba(0,0,0,.09);width:100%\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start start\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0\">\n    <div fxFlex=\"93%\" style=\"width:100%\">\n        <p style=\"float:left;color:rgba(128, 124, 124, 0.445)\">&nbsp;&nbsp;{{productName}}</p>\n        <div #modelBlock style=\"height: 100%;\"></div>\n    </div>\n\n    <div class=\"footer\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"5px\" fxLayoutGap.xs=\"0\">\n      <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\"(click)=\"saveModelData('save')\">Save</button>\n      <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" (click)=\"publishModelData()\">Publish</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/line-network/line-network.component.ts":
/*!********************************************************!*\
  !*** ./src/app/line-network/line-network.component.ts ***!
  \********************************************************/
/*! exports provided: LineNetworkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineNetworkComponent", function() { return LineNetworkComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hintdialog/hintdialog.component */ "./src/app/hintdialog/hintdialog.component.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var classObj;
var lineCountMap;
var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var LineNetworkComponent = /** @class */ (function () {
    function LineNetworkComponent(dialog, http, activeRoute) {
        var _this = this;
        this.dialog = dialog;
        this.http = http;
        this.activeRoute = activeRoute;
        this.diagram = new gojs__WEBPACK_IMPORTED_MODULE_1__["Diagram"]();
        this.nodeSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.modelChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        classObj = this;
        lineCountMap = new Map();
        var $ = gojs__WEBPACK_IMPORTED_MODULE_1__["GraphObject"].make;
        this.diagram = new gojs__WEBPACK_IMPORTED_MODULE_1__["Diagram"]();
        this.diagram.initialContentAlignment = gojs__WEBPACK_IMPORTED_MODULE_1__["Spot"].Center;
        this.diagram.toolManager.mouseWheelBehavior = gojs__WEBPACK_IMPORTED_MODULE_1__["ToolManager"].WheelNone, //鼠标滚轮事件禁止
            this.diagram.allowDrop = true; // necessary for dragging from Palette
        //this.diagram.model.makeUniqueKeyFunction = this.virtualUniqueKey;
        this.diagram.undoManager.isEnabled = true;
        //添加监听节点生成事件
        this.diagram.addDiagramListener("externalobjectsdropped", function (e) {
            var lineId;
            // 获得点击节点的键
            e.subject.each(function (n) {
                lineId = n.data.id;
            });
            if (lineCountMap.has(lineId)) {
                var num = lineCountMap.get(lineId);
                num++;
                lineCountMap.set(lineId, num);
            }
            else {
                lineCountMap.set(lineId, 1);
            }
        });
        this.diagram.addDiagramListener("SelectionDeleted", function (e) {
            e.subject.each(function (n) {
                // 如果是节点不是线
                if (n instanceof gojs__WEBPACK_IMPORTED_MODULE_1__["Node"]) {
                    var lineId = n.data.id;
                    // 更新line的map
                    var num = lineCountMap.get(lineId);
                    num--;
                    if (num > 0) {
                        lineCountMap.set(lineId, num);
                    }
                    else {
                        lineCountMap.delete(lineId);
                    }
                }
            });
        });
        this.diagram.addDiagramListener("ChangedSelection", function (e) {
            var node = e.diagram.selection.first();
            _this.nodeSelected.emit(node instanceof gojs__WEBPACK_IMPORTED_MODULE_1__["Node"] ? node : null);
            //    console.log(node.location.x);
        });
        this.diagram.addModelChangedListener(function (e) { return e.isTransactionFinished && _this.modelChanged.emit(e); });
        this.diagram.nodeTemplate =
            $(gojs__WEBPACK_IMPORTED_MODULE_1__["Node"], "Auto", { resizable: true }, new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("desiredSize", "size", gojs__WEBPACK_IMPORTED_MODULE_1__["Size"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_1__["Size"].stringify), new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("location", "loc", gojs__WEBPACK_IMPORTED_MODULE_1__["Point"].parse).makeTwoWay(gojs__WEBPACK_IMPORTED_MODULE_1__["Point"].stringify), $(gojs__WEBPACK_IMPORTED_MODULE_1__["Panel"], "Auto", {
                name: "BODY"
            }, $(gojs__WEBPACK_IMPORTED_MODULE_1__["Shape"], "RoundedRectangle", {
                fill: "#ADBECB",
                stroke: "black",
                strokeWidth: 2,
                portId: "",
                cursor: "pointer",
                // allow many kinds of links
                fromLinkable: true,
                toLinkable: true,
                fromLinkableSelfNode: true,
                toLinkableSelfNode: true,
                fromLinkableDuplicates: true,
                toLinkableDuplicates: true
            }, new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("fill", "color")), $(gojs__WEBPACK_IMPORTED_MODULE_1__["Panel"], "Horizontal", {
                margin: 1
            }, $(gojs__WEBPACK_IMPORTED_MODULE_1__["TextBlock"], {
                margin: 10,
                editable: false,
                font: "bold 15px sans-serif"
            }, new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("text").makeTwoWay()), $(gojs__WEBPACK_IMPORTED_MODULE_1__["TextBlock"], {
                stroke: "0xE8E8E8",
                margin: 2,
                editable: false,
                font: "12px sans-serif"
            }, new gojs__WEBPACK_IMPORTED_MODULE_1__["Binding"]("text", "category")))));
    }
    Object.defineProperty(LineNetworkComponent.prototype, "model", {
        get: function () {
            return this.diagram.model;
        },
        set: function (val) {
            this.diagram.model = val;
        },
        enumerable: true,
        configurable: true
    });
    LineNetworkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.diagram.div = this.diagramRef.nativeElement;
        // 获得url传递的参数
        this.activeRoute.queryParams.subscribe(function (params) {
            _this.productName = params['productName'];
            _this.productId = params['productId'];
        });
        this.readProductModelById(this.productId);
    };
    LineNetworkComponent.prototype.ngAfterViewInit = function () {
        this.initMainPanelHeight();
    };
    /**
     * 调节各模块的大小
     */
    LineNetworkComponent.prototype.initMainPanelHeight = function () {
        var bodyHeight = $("body").height();
        var divH = bodyHeight - 64;
        $("#mainPanel").height(divH);
    };
    /**
     * 代理解决跨域问题
     */
    LineNetworkComponent.prototype.publishModelData = function () {
        this.saveTimeToDB();
        this.saveModelData("publish");
        var responseData = this.productId;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["RequestOptions"]({ headers: headers });
        return this.http.post(_configuration__WEBPACK_IMPORTED_MODULE_6__["config"].publishServer + '/config/publish/product', responseData, options)
            .subscribe(function (data) {
            var pubStatus = 'Publish ' + data.statusText;
            var dialogRef = classObj.dialog.open(_hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_2__["HintdialogComponent"], {
                data: { "statusText": pubStatus },
                hasBackdrop: true,
                disableClose: true,
                width: "200px"
            });
        }, function (err) {
            var dialogRef = classObj.dialog.open(_hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_2__["HintdialogComponent"], {
                data: { "statusText": "Publish ERROR" },
                hasBackdrop: true,
                disableClose: true,
                width: "200px"
            });
        }, function () { return console.log('Call Complete'); });
    };
    LineNetworkComponent.prototype.saveTimeToDB = function () {
        var responseData = "save time";
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].publishServer + '/time/productUpdate';
        return this.http.post(url, responseData, options)
            .subscribe(function (data) {
        }, function (err) {
        }, function () { return console.log("Update time success!"); });
    };
    LineNetworkComponent.prototype.saveModelData = function (operation) {
        var responseData = this.diagram.model.toJson();
        var p = new ProductModel();
        p.setId(this.productId);
        p.setModel(responseData);
        // map 转化为对象数组
        var arr = [];
        lineCountMap.forEach(function (value, key, map) {
            var l = new LineNum();
            l.setLineId(key);
            l.setCount(value);
            arr.push(l);
        });
        p.setLines(JSON.stringify(arr));
        this.saveProductModelToDB(p, operation);
    };
    LineNetworkComponent.prototype.saveProductModelToDB = function (product, operation) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/products/' + product.id + '/model';
        return this.http.post(url, product, options)
            .subscribe(function (data) {
        }, function (err) {
        }, function () {
            if ("save" == operation)
                alert("Save success!");
        });
    };
    LineNetworkComponent.prototype.readProductModelById = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_3__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_6__["config"].backendUrl + '/products/' + id + '/model';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    classObj.diagram.model = gojs__WEBPACK_IMPORTED_MODULE_1__["Model"].fromJson(pros.model);
                    if (typeof (pros.lines) != "undefined"
                        && pros.lines != null && pros.lines != "") {
                        var lines = JSON.parse(pros.lines);
                        for (var i = 0; i < lines.length; i++) {
                            lineCountMap.set(lines[i].lineId, lines[i].count);
                        }
                    }
                }
            }
        }, function (err) {
        }, function () { return console.log('Call Complete'); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modelBlock'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LineNetworkComponent.prototype, "diagramRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", gojs__WEBPACK_IMPORTED_MODULE_1__["Model"]),
        __metadata("design:paramtypes", [gojs__WEBPACK_IMPORTED_MODULE_1__["Model"]])
    ], LineNetworkComponent.prototype, "model", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], LineNetworkComponent.prototype, "nodeSelected", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], LineNetworkComponent.prototype, "modelChanged", void 0);
    LineNetworkComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-line-network',
            template: __webpack_require__(/*! ./line-network.component.html */ "./src/app/line-network/line-network.component.html"),
            styles: [__webpack_require__(/*! ./line-network.component.css */ "./src/app/line-network/line-network.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"], _angular_http__WEBPACK_IMPORTED_MODULE_3__["Http"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], LineNetworkComponent);
    return LineNetworkComponent;
}());

var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    ProductModel.prototype.setId = function (id) {
        this.id = id;
    };
    ProductModel.prototype.setModel = function (model) {
        this.model = model;
    };
    ProductModel.prototype.setLines = function (lines) {
        this.lines = lines;
    };
    return ProductModel;
}());
var LineNum = /** @class */ (function () {
    function LineNum() {
    }
    LineNum.prototype.setLineId = function (lineId) {
        this.lineId = lineId;
    };
    LineNum.prototype.setCount = function (count) {
        this.count = count;
    };
    return LineNum;
}());


/***/ }),

/***/ "./src/app/lines/lines.component.css":
/*!*******************************************!*\
  !*** ./src/app/lines/lines.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".element{\r\n  width: 100%;\r\n  height:100%;\r\n  max-height: 100%;\r\n  position: relative;\r\n}\r\n\r\n.mat-vertical-content {\r\n  padding: 0 24px 0px 24px;\r\n}\r\n\r\n.titleBlock{\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.09);\r\n  position: relative;\r\n}\r\n\r\n.titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:15px;\r\n}\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGluZXMvbGluZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLDBCQUEwQjtFQUMxQiwwQkFBMEI7RUFDMUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFEQUFxRDtFQUNyRCxjQUFjO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvbGluZXMvbGluZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbGVtZW50e1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDoxMDAlO1xyXG4gIG1heC1oZWlnaHQ6IDEwMCU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4ubWF0LXZlcnRpY2FsLWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDAgMjRweCAwcHggMjRweDtcclxufVxyXG5cclxuLnRpdGxlQmxvY2t7XHJcbiAgcGFkZGluZzogMTBweCAwcHggMTBweCAwcHg7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wOSk7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4udGl0bGVTdHlsZXtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6MTVweDtcclxufVxyXG5cclxuXHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/lines/lines.component.html":
/*!********************************************!*\
  !*** ./src/app/lines/lines.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"titleStyle titleBlock\">\n  <h2 style=\"font-size: 15px\">Production Line</h2>\n</div>\n<!--selected=\"selectedProject\"不起作用-->\n<select #mySelect style=\"width:100%;height: 30px;\" (change)=\"onProjectChange($event)\">\n  <option [value]=\"project.name\" *ngFor=\"let project of projects;\">{{project.name}}</option>\n</select>\n<!--<mat-form-field>\n    <mat-select [(value)]=\"selectedProject\">\n        <mat-option *ngFor=\"let project of projects\" [value]=\"project\">\n            {{ project }}\n        </mat-option>\n    </mat-select>\n  </mat-form-field>-->\n<div #myPaletteDiv class=\"element\" >\n</div>\n"

/***/ }),

/***/ "./src/app/lines/lines.component.ts":
/*!******************************************!*\
  !*** ./src/app/lines/lines.component.ts ***!
  \******************************************/
/*! exports provided: LinesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinesComponent", function() { return LinesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../instance-cfg/instance-cfg.component */ "./src/app/instance-cfg/instance-cfg.component.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var lightText = 'whitesmoke';
var GO = gojs__WEBPACK_IMPORTED_MODULE_4__["GraphObject"].make;
var prjMap;
var proInsMap;
var LinesComponent = /** @class */ (function () {
    function LinesComponent(http) {
        this.http = http;
        this.palette = new gojs__WEBPACK_IMPORTED_MODULE_4__["Palette"]();
        this.projects = new Array();
        this.nodeDataArray = new Array();
        prjMap = new Map();
        proInsMap = new Map();
        this.palette.layout = GO(gojs__WEBPACK_IMPORTED_MODULE_4__["GridLayout"], { wrappingColumn: 1 });
        this.palette.nodeTemplate =
            GO(gojs__WEBPACK_IMPORTED_MODULE_4__["Node"], 
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            GO(gojs__WEBPACK_IMPORTED_MODULE_4__["Panel"], "Auto", GO(gojs__WEBPACK_IMPORTED_MODULE_4__["Shape"], "Rectangle", { fill: "#00A9C9", stroke: null }, new gojs__WEBPACK_IMPORTED_MODULE_4__["Binding"]("figure", "fig")), GO(gojs__WEBPACK_IMPORTED_MODULE_4__["TextBlock"], {
                font: "bold 10pt Helvetica, Arial, sans-serif",
                verticalAlignment: gojs__WEBPACK_IMPORTED_MODULE_4__["Spot"].Center,
                stroke: lightText,
                margin: 5,
                stretch: gojs__WEBPACK_IMPORTED_MODULE_4__["GraphObject"].Fill,
                desiredSize: new gojs__WEBPACK_IMPORTED_MODULE_4__["Size"](135, 30),
                textAlign: "center",
                wrap: gojs__WEBPACK_IMPORTED_MODULE_4__["TextBlock"].WrapFit,
                editable: false
            }, new gojs__WEBPACK_IMPORTED_MODULE_4__["Binding"]("text").makeTwoWay()))); // end Node
    }
    LinesComponent.prototype.ngOnInit = function () {
        this.palette.div = this.paletteRef.nativeElement;
        // "0XALLLINES"读全部line的标识
        this.readAllLines("0XALLLINES");
    };
    LinesComponent.prototype.readAllLines = function (projectId) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_3__["config"].backendUrl + '/lines/' + projectId + '/plant';
        return this.http.get(url, options)
            .subscribe(function (response) {
            var lines = response.json();
            if (typeof (lines) != "undefined" && lines != null && lines.length > 0) {
                for (var i = 0; i < lines.length; i++) {
                    var ins = new _instance_cfg_instance_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Instance"]();
                    ins.setLineId(lines[i].lineId);
                    ins.setPlantName(lines[i].plantName);
                    ins.setName(lines[i].name);
                    ins.setPlantId(lines[i].plantId);
                    if (!proInsMap.has(lines[i].plantId)) {
                        var tmp = [];
                        tmp.push(ins);
                        proInsMap.set(lines[i].plantId, tmp);
                    }
                    else {
                        proInsMap.get(lines[i].plantId).push(ins);
                    }
                }
            }
            proInsMap.forEach(function (value, key, map) {
                var p = new Prj();
                p.setName(value[0].getPlantName());
                p.setId(key);
                _this.projects.push(p);
            });
            for (var i = 0; i < _this.projects.length; i++) {
                _this.projects[i].setNo(i);
                var arr = proInsMap.get(_this.projects[i].id);
                var ls = [];
                for (var j = 0; j < arr.length; j++) {
                    ls.push({ "name": arr[j].getName(), "id": arr[j].getLineId() });
                }
                prjMap.set(i, ls);
            }
            //console.dir(prjMap);
        }, function (err) {
        }, function () {
            _this.dispLines(0);
        });
    };
    LinesComponent.prototype.ngAfterViewInit = function () {
        $(".mat-vertical-content").css("padding-bottom", "0px");
        $(".element canvas").css("left", "");
        // 设置gojs面板的高度
        var bHeight = $("body").height();
        var titleHeight = 50.4;
        var navHeight = 64;
        $(".element").height(bHeight - navHeight - titleHeight - 22);
    };
    LinesComponent.prototype.onProjectChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        this.dispLines(index);
    };
    LinesComponent.prototype.dispLines = function (index) {
        // 清空数组
        this.nodeDataArray = [];
        var selectedPrjName = "";
        for (var j = 0; j < this.projects.length; j++) {
            if (index == this.projects[j].no) {
                selectedPrjName = this.projects[j].name;
                break;
            }
        }
        var lines = prjMap.get(index);
        if (lines != null && lines.length > 0) {
            for (var i = 0; i < lines.length; i++) {
                //let name = lines[i] + '(' + selectedPrjName + ')';
                this.nodeDataArray.push({ text: lines[i].name, category: selectedPrjName, id: lines[i].id, size: "150 75" });
            }
            this.palette.model = new gojs__WEBPACK_IMPORTED_MODULE_4__["TreeModel"](this.nodeDataArray);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('myPaletteDiv'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LinesComponent.prototype, "paletteRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], LinesComponent.prototype, "mySelect", void 0);
    LinesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-lines',
            template: __webpack_require__(/*! ./lines.component.html */ "./src/app/lines/lines.component.html"),
            styles: [__webpack_require__(/*! ./lines.component.css */ "./src/app/lines/lines.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], LinesComponent);
    return LinesComponent;
}());

var Prj = /** @class */ (function () {
    function Prj() {
    }
    Prj.prototype.setName = function (name) {
        this.name = name;
    };
    Prj.prototype.setNo = function (no) {
        this.no = no;
    };
    Prj.prototype.setId = function (id) {
        this.id = id;
    };
    return Prj;
}());


/***/ }),

/***/ "./src/app/message-type2/message-type2.component.css":
/*!***********************************************************!*\
  !*** ./src/app/message-type2/message-type2.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-vertical-content {\r\n  padding: 0 24px 0px 24px;\r\n}\r\n\r\n.titleBlock {\r\n  padding: 10px 0px 10px 0px;\r\n  background: rgba(0, 0, 0, .09);\r\n  position: relative;\r\n}\r\n\r\n.titleStyle {\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size: 15px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVzc2FnZS10eXBlMi9tZXNzYWdlLXR5cGUyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsOEJBQThCO0VBQzlCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxREFBcUQ7RUFDckQsZUFBZTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL21lc3NhZ2UtdHlwZTIvbWVzc2FnZS10eXBlMi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC12ZXJ0aWNhbC1jb250ZW50IHtcclxuICBwYWRkaW5nOiAwIDI0cHggMHB4IDI0cHg7XHJcbn1cclxuXHJcbi50aXRsZUJsb2NrIHtcclxuICBwYWRkaW5nOiAxMHB4IDBweCAxMHB4IDBweDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC4wOSk7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4udGl0bGVTdHlsZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/message-type2/message-type2.component.html":
/*!************************************************************!*\
  !*** ./src/app/message-type2/message-type2.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--样式隐藏时，刷新gojs, 否则节点显示不出来，需要改变浏览器大小-->\n<div style=\"height: 100%;\" fxLayout=\"column\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\"\n  fxLayoutGap.xs=\"0\">\n\n  <div class=\"titleStyle titleBlock\">\n    <h2 style=\"font-size: 15px;cursor:pointer\" (click)=\"fileUpload()\">Message Type</h2>\n  </div>\n\n  <select #mySelectStation style=\"width:100%;height: 30px;\" (change)=\"onElementChange($event)\">\n    <option [value]=\"ele.name\" *ngFor=\"let ele of elements;\">{{ele.name}}</option>\n  </select>\n\n  <!--加height: 100%才会出滚动条-->\n  <div style=\"overflow-y: auto;height: 100%;\">\n    <mat-expansion-panel *ngFor=\"let gmessage of groupMessages\">\n      <mat-expansion-panel-header>\n        <mat-panel-title>\n          {{gmessage.category}}\n        </mat-panel-title>\n      </mat-expansion-panel-header>\n\n      <!--<mat-radio-group name={{gmessage.category}} [(ngModel)]=\"gmessage.value\">-->\n      <div *ngFor=\"let message of gmessage.messages;let i = index\">\n        <!--用作间距-->\n        <div style=\"width:100%;height:10px\"></div>\n        <mat-checkbox id={{message.mtId}} name={{gmessage.category}} [disabled]=\"message.disabled\" [(ngModel)]=\"message.status\"\n          (change)=\"changeSelect($event)\" color=\"primary\">{{message.messageTypeName}}</mat-checkbox>\n        <!--<mat-radio-button value={{i}} id={{message.mtId}} (change)=\"changeSelect($event)\" color=\"primary\">{{message.messageTypeName}}</mat-radio-button>-->\n        <div style=\"height: 100px;width:120px;border:1px solid #757575;\">\n\n          <!--输入-->\n          <div>\n            <!--display:inline-block针对当前元素，非子元素-->\n            <div *ngFor=\"let input of message.inputs\">\n              <i class=\"caret right icon\"></i>\n              <p style=\"display:inline-block;margin: 0px;font-family: 'Segoe UI', Helvetica, Arial, sans-serif;\">{{input}}</p>\n            </div>\n          </div>\n\n          <!--输出-->\n          <div fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start end\" fxLayoutGap.xs=\"0px\">\n            <div *ngFor=\"let output of message.outputs\">\n              <p style=\"display:inline-block;margin: 0px;font-family: 'Segoe UI', Helvetica, Arial, sans-serif;\">{{output.Name}}</p>\n              <i class=\"caret right icon\"></i>\n            </div>\n          </div>\n\n        </div>\n      </div>\n      <!--</mat-radio-group>-->\n    </mat-expansion-panel>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/message-type2/message-type2.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/message-type2/message-type2.component.ts ***!
  \**********************************************************/
/*! exports provided: MessageType2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType2Component", function() { return MessageType2Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _upload_dialog_upload_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../upload-dialog/upload-dialog.component */ "./src/app/upload-dialog/upload-dialog.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gojs */ "./node_modules/gojs/release/go.js");
/* harmony import */ var gojs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(gojs__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GO = gojs__WEBPACK_IMPORTED_MODULE_5__["GraphObject"].make;
var lightText = 'whitesmoke';
// 键为Mt id, 值为mt
var idMsgTypeMap;
// 按照category对message type分类，键为Mt类型，值为mt数组
var groupMessageMap;
// station绑定的message type, 键为station id, 值为mt数组
var stationMsgsBindedMap;
// 保存当前对象
var classObj;
// 
var msgTypesStr;
// 只在line上展示的message type类型
var mtOnlyLine = ["PRODUCTID", "ORDERID", "CHANGEOVER"];
var MessageType2Component = /** @class */ (function () {
    function MessageType2Component(http, dialog) {
        this.http = http;
        this.dialog = dialog;
        this.createProjectIcon = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].iconPosition + "circle_add.png";
        // station 下拉列表
        this.elements = new Array();
        // 保存从父组件传递过来的lineId
        this._lineId = "";
        this.msChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        classObj = this;
        this.groupMessages = [];
        idMsgTypeMap = new Map();
        groupMessageMap = new Map();
        stationMsgsBindedMap = new Map();
        msgTypesStr = "";
    }
    Object.defineProperty(MessageType2Component.prototype, "lineId", {
        // 父组件传递line id获得该line下的配置
        set: function (id) {
            this._lineId = id;
            if (id != "") {
                this.selectedStationKey = id;
                this.readStationMtsById(this._lineId);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageType2Component.prototype, "stationsStr", {
        get: function () {
            return this._stationsStr;
        },
        set: function (stationsStr) {
            this._stationsStr = stationsStr;
            if (typeof (stationsStr) != "undefined"
                && stationsStr != "") {
                var newMap = new Map();
                var oldMap = new Map();
                var stations = [];
                var s = JSON.parse(stationsStr);
                // 保存当前模型中的最上层节点
                for (var i = 0; i < s.length; i++) {
                    var e = new Ele();
                    e.setId(s[i].id);
                    e.setName(s[i].name);
                    e.setNo(i);
                    newMap.set(s[i].id, e);
                    stations.push(e);
                }
                // 通过比较，将旧的下拉列表中，在新模型中不存在的节点删掉，存在的节点更新
                for (var i = 0; i < classObj.elements.length; i++) {
                    var tmpId = classObj.elements[i].getId();
                    var tmpNewNode = newMap.get(tmpId);
                    if (typeof (tmpNewNode) == "undefined") {
                        classObj.elements.splice(i, 1);
                        i--;
                    }
                    else {
                        classObj.elements[i].setName(tmpNewNode.getName());
                        oldMap.set(tmpId, tmpNewNode);
                    }
                }
                // 将新模型中的新节点添加到下拉列表中
                for (var i = 0; i < stations.length; i++) {
                    var tmpOldNode = oldMap.get(stations[i].getId());
                    if (typeof (tmpOldNode) == "undefined") {
                        classObj.elements.push(stations[i]);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * station 切换
     * @param obj
     */
    MessageType2Component.prototype.onElementChange = function (obj) {
        // 获得gojs, 父group key
        var index = obj.currentTarget.selectedIndex;
        for (var j = 0; j < this.elements.length; j++) {
            if (index == this.elements[j].no) {
                classObj.selectedStationKey = this.elements[j].id + '';
                break;
            }
        }
        // message type 回显
        this.convertStrToMsg(msgTypesStr, index);
    };
    MessageType2Component.prototype.convertStrToMsg = function (msgs, index) {
        var hasProductID = false;
        var hasChangeOver = false;
        var hasOrderID = false;
        if (index == 0) {
            var lineNodesMap = stationMsgsBindedMap.get(this._lineId);
            if (typeof (lineNodesMap) != "undefined") {
                if (lineNodesMap.has("PRODUCTID")) {
                    hasProductID = true;
                }
                if (lineNodesMap.has("CHANGEOVER")) {
                    hasChangeOver = true;
                }
                if (lineNodesMap.has("ORDERID")) {
                    hasOrderID = true;
                }
            }
        }
        // 清空数据
        groupMessageMap = new Map();
        classObj.groupMessages = [];
        for (var i = 0; i < msgs.length; i++) {
            var msgTypeName = msgs[i].messageTypeName;
            var mtId = msgs[i].mtId;
            var category = msgs[i].category;
            var inputs = msgs[i].inputs;
            // ProductID默认勾选
            msgs[i].status = false;
            var tmp = new Message();
            tmp.setMsgTypeName(msgTypeName);
            tmp.getInputs().push.apply(tmp.getInputs(), inputs);
            // 将所有message type放入内存
            idMsgTypeMap.set(mtId, tmp);
            // station不展示ProductID/OrderID/ChangeOver
            if (index == 0 || (index > 0 && !classObj.contains(mtOnlyLine, category))) {
                // 针对line默认绑定ProductID
                if (index == 0) {
                    if (category.toUpperCase() == "PRODUCTID") {
                        msgs[i].disabled = true;
                        var stationMtMap = stationMsgsBindedMap.get(classObj.selectedStationKey);
                        if (typeof (stationMtMap) == "undefined") {
                            msgs[i].status = true;
                            if (!hasProductID) {
                                this.changeSelectMt(mtId, category, msgs[i].status, msgTypeName, inputs);
                            }
                        }
                        else {
                            var orderMt = stationMtMap.get("PRODUCTID");
                            if (typeof (orderMt) == "undefined") {
                                msgs[i].status = true;
                                if (!hasOrderID) {
                                    this.changeSelectMt(mtId, category, msgs[i].status, msgTypeName, inputs);
                                }
                            }
                        }
                    }
                    else if (category.toUpperCase() == "CHANGEOVER") {
                        msgs[i].disabled = true;
                        msgs[i].status = true;
                        if (!hasChangeOver) {
                            this.changeSelectMt(mtId, category, msgs[i].status, msgTypeName, inputs);
                        }
                    }
                }
                // 根据category对message type分组
                if (groupMessageMap.has(category)) {
                    groupMessageMap.get(category).push(msgs[i]);
                }
                else {
                    var tmpArr = [];
                    tmpArr.push(msgs[i]);
                    groupMessageMap.set(category, tmpArr);
                }
            }
        }
        // map转对象数组，前台展示
        groupMessageMap.forEach(function (value, key, map) {
            var tmp = new GroupMessage();
            tmp.setCategory(key);
            // select勾选
            var cateMsgMap = stationMsgsBindedMap.get(classObj.selectedStationKey);
            if (typeof (cateMsgMap) != "undefined") {
                var selectedMsg = cateMsgMap.get(key);
                if (typeof (selectedMsg) != "undefined") {
                    var selectedMsgId = selectedMsg.mtId;
                    for (var i = 0; i < value.length; i++) {
                        if (selectedMsgId == value[i].mtId) {
                            value[i].status = true;
                            break;
                        }
                    }
                }
            }
            tmp.setMessages(value);
            classObj.groupMessages.push(tmp);
        });
    };
    MessageType2Component.prototype.contains = function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                return true;
            }
        }
    };
    /**
     * messagetype切换勾选时
     * @param obj
     */
    MessageType2Component.prototype.changeSelect = function (obj) {
        //this.nodeDataArray = [];
        // 获得message type的类型，如FPY
        var category = obj.source.name;
        var selectedStatus = obj.checked;
        // 获得点击的message type名称
        var msgTypeName = obj.source._elementRef.nativeElement.innerText.trim();
        var mtId = obj.source.id;
        this.changeSelectMt(mtId, category, selectedStatus, msgTypeName, "");
    };
    MessageType2Component.prototype.changeSelectMt = function (mtId, category, selectedStatus, msgTypeName, mtInputs) {
        // 获得内存中的message type定义
        var messageTmp = idMsgTypeMap.get(mtId);
        var inputs;
        if (typeof (messageTmp) != "undefined" && messageTmp != "") {
            inputs = messageTmp.getInputs();
        }
        else {
            inputs = mtInputs;
        }
        // 设置model中key值
        var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
        var uid = uuidv4().replace(/\-/g, "");
        // 构建model中需要展示的内容
        var smg = new StationMsgGroup();
        smg.setCategory(category);
        smg.setStationKey(classObj.selectedStationKey);
        var m = new Message();
        if (selectedStatus == true) {
            m.setMsgTypeName(msgTypeName);
            m.setNodeKey(uid);
            m.setInputs(inputs);
            m.setStatus(true);
            m.setId(mtId);
            m.setCategory(category);
            smg.setMessage(m);
            var tmpMap = new Map();
            if (!stationMsgsBindedMap.has(classObj.selectedStationKey)) {
                smg.setOperation("add");
            }
            else {
                tmpMap = stationMsgsBindedMap.get(classObj.selectedStationKey);
                var delNode = void 0;
                var tmpPO = void 0;
                if (tmpMap.has(category)) {
                    // 替换同一个category中的不同message type
                    delNode = tmpMap.get(category);
                }
                else if (category.toUpperCase() == "PRODUCTID" || category.toUpperCase() == "ORDERID") {
                    tmpPO = category.toUpperCase() == "PRODUCTID" ? "ORDERID" : "PRODUCTID";
                    // 替换同一个category中的不同message type
                    delNode = tmpMap.get(tmpPO);
                }
                if (typeof (delNode) != "undefined") {
                    // 同一category下，去掉旧checkbox反选
                    var oldMtId = delNode.mtId;
                    classObj.cancelCategoryMtSelect(oldMtId);
                    tmpMap.delete(tmpPO);
                    // 旧Id
                    smg.setOperation("update");
                    smg.setNodeId(delNode.id);
                }
            }
            // 内存中保存，各category下message type
            // 每个category只能选择一个message type实例
            tmpMap.set(category, { "id": uid, "mtId": mtId });
            stationMsgsBindedMap.set(classObj.selectedStationKey, tmpMap);
        }
        else {
            // 从内存中移除
            var tmpMap = stationMsgsBindedMap.get(classObj.selectedStationKey);
            var delNode = tmpMap.get(category);
            smg.setOperation("delete");
            smg.setNodeId(delNode.id);
            tmpMap.delete(category);
        }
        // 发送到model
        this.msChange.emit(JSON.stringify(smg));
    };
    /**
     * 取消同一category下，旧MT勾选
     * @param mtId
     */
    MessageType2Component.prototype.cancelCategoryMtSelect = function (mtId) {
        for (var i = 0; i < classObj.groupMessages.length; i++) {
            var tmpMessages = classObj.groupMessages[i].messages;
            for (var j = 0; j < tmpMessages.length; j++) {
                if (mtId == tmpMessages[j].mtId) {
                    tmpMessages[j].status = false;
                    return;
                }
            }
        }
    };
    MessageType2Component.prototype.ngOnInit = function () {
    };
    /**
     *获得该line上配置的message和勾选的变量
     * @param lineId
     */
    MessageType2Component.prototype.readStationMtsById = function (lineId) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].backendUrl + '/lines/' + lineId + '/messagetype';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    // 获得所有mt
                    msgTypesStr = pros.messages;
                    var mtMap = new Map();
                    for (var j = 0; j < msgTypesStr.length; j++) {
                        mtMap.set(msgTypesStr[j].mtId, msgTypesStr[j]);
                    }
                    // 将保存的关系转化为map
                    stationMsgsBindedMap = new Map();
                    var stationMtRlas = pros.lmrs;
                    for (var i = 0; i < stationMtRlas.length; i++) {
                        var tmpM = mtMap.get(stationMtRlas[i].mtId);
                        if (!stationMsgsBindedMap.has(stationMtRlas[i].stationId)) {
                            var tmpMap = new Map();
                            tmpMap.set(tmpM.category, { "id": stationMtRlas[i].mtUniqId, "mtId": stationMtRlas[i].mtId });
                            stationMsgsBindedMap.set(stationMtRlas[i].stationId, tmpMap);
                        }
                        else {
                            stationMsgsBindedMap.get(stationMtRlas[i].stationId).set(tmpM.category, { "id": stationMtRlas[i].mtMtUniqId, "mtId": stationMtRlas[i].mtId });
                        }
                    }
                    _this.convertStrToMsg(msgTypesStr, 0);
                }
            }
        }, function (err) {
            console.log(err);
        }, function () {
        });
    };
    MessageType2Component.prototype.ngAfterViewInit = function () {
    };
    /**
     * 点击按钮上传文件
     */
    MessageType2Component.prototype.fileUpload = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_upload_dialog_upload_dialog_component__WEBPACK_IMPORTED_MODULE_3__["UploadDialogComponent"], {
            disableClose: true,
            hasBackdrop: true,
            height: '400px',
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(function (value) {
            if (typeof (value) != "undefined" && value != null && value.length > 0) {
                msgTypesStr = value;
                _this.convertStrToMsg(value, 0);
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectStation'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MessageType2Component.prototype, "mySelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MessageType2Component.prototype, "lineId", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MessageType2Component.prototype, "stationsStr", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], MessageType2Component.prototype, "msChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('uploadEl'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MessageType2Component.prototype, "uploadElRef", void 0);
    MessageType2Component = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-message-type2',
            template: __webpack_require__(/*! ./message-type2.component.html */ "./src/app/message-type2/message-type2.component.html"),
            styles: [__webpack_require__(/*! ./message-type2.component.css */ "./src/app/message-type2/message-type2.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"]])
    ], MessageType2Component);
    return MessageType2Component;
}());

var Message = /** @class */ (function () {
    function Message() {
        this.inputs = [];
        this.outputs = [];
        //this.changeOver = false;
        this.status = false;
        this.disabled = false;
    }
    Message.prototype.setCategory = function (category) {
        this.category = category;
    };
    Message.prototype.setNodeKey = function (nodeKey) {
        this.nodeKey = nodeKey;
    };
    Message.prototype.setId = function (id) {
        this.id = id;
    };
    Message.prototype.setMsgTypeName = function (msgTypeName) {
        this.msgTypeName = msgTypeName;
    };
    Message.prototype.getMsgTypeName = function () {
        return this.msgTypeName;
    };
    Message.prototype.getInputs = function () {
        return this.inputs;
    };
    Message.prototype.getOutputs = function () {
        return this.outputs;
    };
    //getChangeOver():boolean{
    //  return this.changeOver;
    //}
    //setChangeOver(changeOver:boolean){
    //  this.changeOver = changeOver;
    //}
    Message.prototype.getStatus = function () {
        return this.status;
    };
    Message.prototype.setStatus = function (status) {
        this.status = status;
    };
    Message.prototype.setInputs = function (inputs) {
        this.inputs = inputs;
    };
    return Message;
}());
var StationMsgGroup = /** @class */ (function () {
    function StationMsgGroup() {
        // add表示新增节点，update表示更新，delete表示删除
        this.operate = "add";
    }
    StationMsgGroup.prototype.setCategory = function (category) {
        this.category = category;
    };
    StationMsgGroup.prototype.setNodeId = function (nodeId) {
        this.nodeId = nodeId;
    };
    StationMsgGroup.prototype.setOperation = function (operate) {
        this.operate = operate;
    };
    StationMsgGroup.prototype.setStationKey = function (stationKey) {
        this.stationKey = stationKey;
    };
    StationMsgGroup.prototype.setMessage = function (message) {
        this.message = message;
    };
    StationMsgGroup.prototype.setStationName = function (stationName) {
        this.stationName = stationName;
    };
    return StationMsgGroup;
}());
var GroupMessage = /** @class */ (function () {
    function GroupMessage() {
        this.display = true;
    }
    GroupMessage.prototype.setCategory = function (category) {
        this.category = category;
    };
    GroupMessage.prototype.setDisplay = function (display) {
        this.display = display;
    };
    GroupMessage.prototype.setMessages = function (messages) {
        this.messages = messages;
    };
    return GroupMessage;
}());
var Ele = /** @class */ (function () {
    function Ele() {
    }
    Ele.prototype.setName = function (name) {
        this.name = name;
    };
    Ele.prototype.setNo = function (no) {
        this.no = no;
    };
    Ele.prototype.setId = function (id) {
        this.id = id;
    };
    Ele.prototype.getId = function () {
        return this.id;
    };
    Ele.prototype.getNo = function () {
        return this.no;
    };
    Ele.prototype.getName = function () {
        return this.name;
    };
    return Ele;
}());


/***/ }),

/***/ "./src/app/opcua/opcua.component.css":
/*!*******************************************!*\
  !*** ./src/app/opcua/opcua.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n  width:100%;\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n  text-align: center;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\n.button{\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  cursor: pointer;\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: transparent;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n  text-align: center;\r\n  margin: 0;\r\n  line-height: 36px;\r\n  border-radius: 2px;\r\n  -webkit-transform: translate3d(0,0,0);\r\n          transform: translate3d(0,0,0);\r\n  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n  background:rgb(224, 224,224);\r\n  width: 50px\r\n}\r\n\r\np{\r\n  margin-left: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3BjdWEvb3BjdWEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDViwwQkFBMEI7RUFDMUIsMEJBQTBCO0VBQzFCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixzQkFBc0I7RUFDdEIscUJBQXFCO0VBQ3JCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsVUFBVTtFQUNWLHdDQUF3QztFQUN4QyxxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQix3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IsOEZBQThGO0VBQzlGLDRCQUE0QjtFQUM1QjtBQUNGOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvb3BjdWEvb3BjdWEuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJsb2Nre1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgcGFkZGluZzogMTBweCAwcHggMTBweCAwcHg7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5oMiB7XHJcbiAgbWFyZ2luOjBweCAxLjI1cmVtO1xyXG4gIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uYnV0dG9ue1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG91dGxpbmU6IDA7XHJcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW46IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSk7XHJcbiAgYmFja2dyb3VuZDpyZ2IoMjI0LCAyMjQsMjI0KTtcclxuICB3aWR0aDogNTBweFxyXG59XHJcblxyXG5we1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/opcua/opcua.component.html":
/*!********************************************!*\
  !*** ./src/app/opcua/opcua.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n\n  <!--封装第二行-->\n  <div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n    <div style=\"height: 170px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n      <!--<p style=\"height: 30px;\">Name</p>-->\n      <!--<p style=\"height: 30px;\">Alias</p>-->\n      <p style=\"height: 30px;\">Endpoint URL</p>\n      <p style=\"height: 30px;\">Node ID</p>\n      <p style=\"height: 30px;\">Cycle</p>\n      <p style=\"height: 30px;\">DataType</p>\n    </div>\n    <div style=\"height: 170px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n      <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"name\" (blur)=\"copyToAlias()\">-->\n      <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n      <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"ip\">-->\n      <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"alias\">-->\n      <div>\n        <input style=\"width:170px;height: 30px;border:1px solid #9A9A9A\" [formControl]=\"urlControl\" [matAutocomplete]=\"autoUrl\" [(ngModel)]=\"url\">\n        <mat-autocomplete #autoUrl=\"matAutocomplete\">\n          <mat-option *ngFor=\"let option1 of urlFilteredOptions | async\" [value]=\"option1\">\n            {{option1}}\n          </mat-option>\n        </mat-autocomplete>\n      </div>\n      <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"address\">-->\n      <div>\n        <input style=\"width:170px;height: 30px;border:1px solid #9A9A9A\" [formControl]=\"nodeIdControl\" [matAutocomplete]=\"autoNodeId\" [(ngModel)]=\"nodeId\">\n        <mat-autocomplete #autoNodeId=\"matAutocomplete\">\n          <mat-option *ngFor=\"let option2 of nodeIdFilteredOptions | async\" [value]=\"option2\">\n            {{option2}}\n          </mat-option>\n        </mat-autocomplete>\n      </div>\n      <select [ngModel]=\"selectedCycle\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onCycleChange($event)\">\n        <option [value]=\"item\" *ngFor=\"let item of cycles; let j = index\">{{item}}</option>\n      </select>\n      <select [ngModel]=\"selectedDataType\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onDataTypeChange($event)\">\n        <option [value]=\"item\" *ngFor=\"let item of dataTypes; let j = index\">{{item}}</option>\n      </select>\n    </div>\n\n    <!--间距调整-->\n    <div></div>\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/opcua/opcua.component.ts":
/*!******************************************!*\
  !*** ./src/app/opcua/opcua.component.ts ***!
  \******************************************/
/*! exports provided: OpcuaComponent, OpcuaInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpcuaComponent", function() { return OpcuaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpcuaInfo", function() { return OpcuaInfo; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OpcuaComponent = /** @class */ (function () {
    function OpcuaComponent() {
        //private name: string="";
        //private alias: string="";
        this.protocol = "OPCUA";
        this.url = "";
        this.nodeId = "";
        this.cycles = new Array();
        this.dataTypes = new Array();
        // url自动补全
        this.urlControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.urlOptions = [];
        // address自动补全
        this.nodeIdControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.nodeIdOptions = [];
        this.selectedCycle = "5s";
        this.selectedDataType = "INT";
        this.cycles.push("10ms");
        this.cycles.push("100ms");
        this.cycles.push("500ms");
        this.cycles.push("1s");
        this.cycles.push("5s");
        this.cycles.push("10s");
        this.cycles.push("15s");
        this.cycles.push("30s");
        this.cycles.push("1m");
        this.dataTypes.push("BOOLEAN");
        this.dataTypes.push("INT");
        this.dataTypes.push("LONG");
        this.dataTypes.push("DOUBLE");
        this.dataTypes.push("STRING");
    }
    OpcuaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.urlFilteredOptions = this.urlControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (val) { return _this.urlFilter(val); }));
        this.nodeIdFilteredOptions = this.nodeIdControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (val) { return _this.nodeIdFilter(val); }));
    };
    OpcuaComponent.prototype.ngAfterViewInit = function () {
        $("input.mat-input-element").css("border", "");
    };
    OpcuaComponent.prototype.urlFilter = function (val) {
        return this.urlOptions.filter(function (option) {
            return option.toLowerCase().includes(val.toLowerCase());
        });
    };
    OpcuaComponent.prototype.nodeIdFilter = function (val) {
        return this.nodeIdOptions.filter(function (option) {
            return option.toLowerCase().includes(val.toLowerCase());
        });
    };
    OpcuaComponent.prototype.onCycleChange = function (newVal) {
        this.selectedCycle = newVal;
    };
    OpcuaComponent.prototype.onDataTypeChange = function (newVal) {
        this.selectedDataType = newVal;
    };
    //setName(name: string){
    //  this.name = name;
    //}
    //setAlias(alias: string){
    //  this.alias = alias;
    //}
    OpcuaComponent.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    OpcuaComponent.prototype.setUrl = function (url) {
        this.url = url;
    };
    OpcuaComponent.prototype.setNodeId = function (nodeId) {
        this.nodeId = nodeId;
    };
    OpcuaComponent.prototype.setSelectedCycle = function (cycle) {
        this.selectedCycle = cycle;
    };
    OpcuaComponent.prototype.setSelectedDataType = function (dataType) {
        this.selectedDataType = dataType;
    };
    OpcuaComponent.prototype.getUrlOptions = function () {
        return this.urlOptions;
    };
    OpcuaComponent.prototype.getNodeIdOptions = function () {
        return this.nodeIdOptions;
    };
    OpcuaComponent.prototype.cfgComponentInfo = function (nodeObj) {
        //this.setName(nodeObj.name);
        //this.setAlias(nodeObj.alias);
        this.setProtocol(nodeObj.protocol);
        var cfg;
        if (typeof (nodeObj.config) == "string") {
            cfg = JSON.parse(nodeObj.config);
        }
        else {
            cfg = nodeObj.config;
        }
        this.setUrl(cfg.url);
        this.setNodeId(cfg.nodeId);
        this.setSelectedCycle(cfg.cycle);
        this.setSelectedDataType(cfg.dataType);
    };
    //copyToAlias(){
    //  if(this.name != ""){
    //    this.alias = this.name;
    //  }
    //}
    OpcuaComponent.prototype.saveComponentInfo = function () {
        if (this.judgeInputNull(this.url.trim())
            || this.judgeInputNull(this.nodeId.trim())) {
            alert("All properties need to be filled!");
            return;
        }
        else {
            var oi = new OpcuaInfo();
            //oi.setName(this.name.trim());
            //oi.setAlias(this.alias.trim());
            oi.setProtocol("OPCUA");
            oi.setUrl(this.url.trim());
            oi.setNodeId(this.nodeId.trim());
            if (this.selectedCycle != null && this.selectedCycle != "") {
                oi.setCycle(this.selectedCycle);
            }
            if (this.selectedDataType != null && this.selectedDataType != "") {
                oi.setDataType(this.selectedDataType);
            }
            return oi;
        }
    };
    OpcuaComponent.prototype.judgeInputNull = function (input) {
        if (typeof (input) == undefined || input == null || input.trim() == "") {
            return true;
        }
        else {
            return false;
        }
    };
    OpcuaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-opcua',
            template: __webpack_require__(/*! ./opcua.component.html */ "./src/app/opcua/opcua.component.html"),
            styles: [__webpack_require__(/*! ./opcua.component.css */ "./src/app/opcua/opcua.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], OpcuaComponent);
    return OpcuaComponent;
}());

var OpcuaInfo = /** @class */ (function () {
    function OpcuaInfo() {
        //this.name="";
        //this.alias="";
        this.url = "";
        this.nodeId = "";
        this.cycle = "5s";
        this.dataType = "INT";
    }
    //setName(name:string){
    //  this.name = name;
    //}
    //setAlias(alias){
    //  this.alias = alias;
    //}
    //getName(): string{
    // return this.name;
    //}
    //getAlias(){
    // return this.alias;
    //}
    OpcuaInfo.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    OpcuaInfo.prototype.getProtocol = function () {
        return this.protocol;
    };
    OpcuaInfo.prototype.setUrl = function (url) {
        this.url = url;
    };
    OpcuaInfo.prototype.getUrl = function () {
        return this.url;
    };
    OpcuaInfo.prototype.setNodeId = function (nodeId) {
        this.nodeId = nodeId;
    };
    OpcuaInfo.prototype.getNodeId = function () {
        return this.nodeId;
    };
    OpcuaInfo.prototype.setCycle = function (cycle) {
        this.cycle = cycle;
    };
    OpcuaInfo.prototype.getCycle = function () {
        return this.cycle;
    };
    OpcuaInfo.prototype.setDataType = function (dataType) {
        this.dataType = dataType;
    };
    OpcuaInfo.prototype.getDataType = function () {
        return this.dataType;
    };
    return OpcuaInfo;
}());



/***/ }),

/***/ "./src/app/optconfirmdialog/optconfirmdialog.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/optconfirmdialog/optconfirmdialog.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".post-form mat-form-field {\r\n  width: 100%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvb3B0Y29uZmlybWRpYWxvZy9vcHRjb25maXJtZGlhbG9nLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC9vcHRjb25maXJtZGlhbG9nL29wdGNvbmZpcm1kaWFsb2cuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wb3N0LWZvcm0gbWF0LWZvcm0tZmllbGQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/optconfirmdialog/optconfirmdialog.component.html":
/*!******************************************************************!*\
  !*** ./src/app/optconfirmdialog/optconfirmdialog.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-dialog-content class=\"post-form\">\n  <p style=\"text-align: center;\">{{res}}</p>\n</mat-dialog-content>\n\n<mat-dialog-actions>\n  <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" (click)=\"deleteConfirmation()\">Confirm</button>\n  <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" mat-dialog-close>Cancel</button>\n</mat-dialog-actions>\n"

/***/ }),

/***/ "./src/app/optconfirmdialog/optconfirmdialog.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/optconfirmdialog/optconfirmdialog.component.ts ***!
  \****************************************************************/
/*! exports provided: OptconfirmdialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptconfirmdialogComponent", function() { return OptconfirmdialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var OptconfirmdialogComponent = /** @class */ (function () {
    function OptconfirmdialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.res = data.hintMgs;
    }
    OptconfirmdialogComponent.prototype.ngOnInit = function () {
    };
    OptconfirmdialogComponent.prototype.deleteConfirmation = function () {
        this.dialogRef.close(("confirm"));
    };
    OptconfirmdialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-optconfirmdialog',
            template: __webpack_require__(/*! ./optconfirmdialog.component.html */ "./src/app/optconfirmdialog/optconfirmdialog.component.html"),
            styles: [__webpack_require__(/*! ./optconfirmdialog.component.css */ "./src/app/optconfirmdialog/optconfirmdialog.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], OptconfirmdialogComponent);
    return OptconfirmdialogComponent;
}());



/***/ }),

/***/ "./src/app/plc-device/plc-device.component.css":
/*!*****************************************************!*\
  !*** ./src/app/plc-device/plc-device.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n    width:100%;\r\n    padding: 10px 0px 10px 0px;\r\n    background:rgba(0,0,0,.03);\r\n    text-align: center;\r\n  }\r\n  \r\n  h2 {\r\n    margin:0px 1.25rem;\r\n    padding: 0px 0px 0px 0px;\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n    color: black;\r\n  }\r\n  \r\n  .button{\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    cursor: pointer;\r\n    outline: 0;\r\n    -webkit-tap-highlight-color: transparent;\r\n    display: inline-block;\r\n    white-space: nowrap;\r\n    text-decoration: none;\r\n    vertical-align: baseline;\r\n    text-align: center;\r\n    margin: 0;\r\n    line-height: 36px;\r\n    border-radius: 2px;\r\n    -webkit-transform: translate3d(0,0,0);\r\n            transform: translate3d(0,0,0);\r\n    transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n    background:rgb(224, 224,224);\r\n    width: 50px\r\n  }\r\n  \r\n  p {\r\n    margin-bottom: 2px;\r\n    margin-left: 10px;\r\n  }\r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGxjLWRldmljZS9wbGMtZGV2aWNlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0lBQ1YsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtFQUNkOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLFVBQVU7SUFDVix3Q0FBd0M7SUFDeEMscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixxQ0FBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLDhGQUE4RjtJQUM5Riw0QkFBNEI7SUFDNUI7RUFDRjs7RUFFQTtJQUNFLGtCQUFrQjtJQUNsQixpQkFBaUI7RUFDbkIiLCJmaWxlIjoic3JjL2FwcC9wbGMtZGV2aWNlL3BsYy1kZXZpY2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJsb2Nre1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGgyIHtcclxuICAgIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICBcclxuICAuYnV0dG9ue1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBsaW5lLWhlaWdodDogMzZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApO1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcclxuICAgIGJhY2tncm91bmQ6cmdiKDIyNCwgMjI0LDIyNCk7XHJcbiAgICB3aWR0aDogNTBweFxyXG4gIH1cclxuICBcclxuICBwIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gIH1cclxuICAiXX0= */"

/***/ }),

/***/ "./src/app/plc-device/plc-device.component.html":
/*!******************************************************!*\
  !*** ./src/app/plc-device/plc-device.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n  <!--标题行-->\n  <div class=\"titleBlock\">\n    <h2 style=\"font-size: 15px\">I/O Device Properties</h2>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n      <div style=\"height: 70px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <p style=\"height: 30px;\">Name</p>\n        <p style=\"height: 30px;\">Alias</p>\n      </div>\n      <div style=\"height: 70px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"ioDeviceName\" (blur)=\"copyToAlias()\">\n        <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"displayName\">\n      </div>\n    \n      <!--间距调整-->\n      <div></div>\n    </div>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Data source protocol selection:</p>\n    <select #mySelect style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onProtocolChange($event)\">\n      <option [value]=\"protocol.name\" *ngFor=\"let protocol of protocols;\">{{protocol.name}}</option>\n    </select>\n\n    <div style=\"height: 5px;width: 100%;\"></div>\n    <ng-template appDynamicProtocol ></ng-template>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Pre-processing Algorithm:</p>\n    <select #mySelectAlgo style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onAlgoChange($event)\">\n      <option [value]=\"algo.name\" *ngFor=\"let algo of algorithms;\">{{algo.name}}</option>\n    </select>\n  </div>\n\n  <!--封装第三行-->\n  <div style=\"width: 100%;height:50px;background: #F7F7F7;width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n    <button class=\"button\" (click)=\"saveInfo()\">Save</button>\n    <div></div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/plc-device/plc-device.component.ts":
/*!****************************************************!*\
  !*** ./src/app/plc-device/plc-device.component.ts ***!
  \****************************************************/
/*! exports provided: PlcDeviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlcDeviceComponent", function() { return PlcDeviceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamicProtocol.service */ "./src/app/dynamicProtocol.service.ts");
/* harmony import */ var _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamicProtocol.directive */ "./src/app/dynamicProtocol.directive.ts");
/* harmony import */ var _io_io_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../io/io.component */ "./src/app/io/io.component.ts");
/* harmony import */ var _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plc/plc.component */ "./src/app/plc/plc.component.ts");
/* harmony import */ var _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../opcua/opcua.component */ "./src/app/opcua/opcua.component.ts");
/* harmony import */ var _deviceOpration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../deviceOpration */ "./src/app/deviceOpration.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var PlcDeviceComponent = /** @class */ (function (_super) {
    __extends(PlcDeviceComponent, _super);
    function PlcDeviceComponent(componentFactoryResolver, dynamicProtocolService) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.dynamicProtocolService = dynamicProtocolService;
        _this.selectedProtocol = "S7";
        _this.selectedAlgo = "Max";
        _this.operate = "new";
        _this.componentIns = {};
        _this.updateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        return _this;
    }
    PlcDeviceComponent.prototype.setSelectedProtocol = function (selectedProtocol) {
        this.selectedProtocol = selectedProtocol;
    };
    PlcDeviceComponent.prototype.setSelectedAlgo = function (selectedAlgo) {
        this.selectedAlgo = selectedAlgo;
    };
    PlcDeviceComponent.prototype.setOperate = function (operate) {
        this.operate = operate;
    };
    PlcDeviceComponent.prototype.setNodecfg = function (nodecfg) {
        this.nodecfg = nodecfg;
    };
    /**
     * 切换时调用
     * @param obj
     */
    PlcDeviceComponent.prototype.onProtocolChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getProtocols()[index].getName();
        this.selectedProtocol = this.getConvertNameMap().get(name);
        this.displayProtocolCpt(this.selectedProtocol, "new", "");
    };
    PlcDeviceComponent.prototype.onAlgoChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getAlgos()[index].getName();
        this.selectedAlgo = name;
    };
    PlcDeviceComponent.prototype.displayProtocolCpt = function (componentName, operation, nodeCfg) {
        // 根据名称构造不同的组件
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicProtocolService.getComponent(componentName));
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentIns = componentRef.instance;
        if (operation == 'new') {
            // 自动补全功能
            if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.updateAutoCompleteOpcua(this.componentIns);
            }
        }
        else if (operation == 'echo') {
            if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                return;
            }
            var nodeObj = nodeCfg;
            // 根据不同的设备进行初始化
            if (this.componentIns instanceof _io_io_component__WEBPACK_IMPORTED_MODULE_3__["IoComponent"]) {
                //用于调节DIO与Digital I/O
                this.selectedProtocol = "Digital I/O";
            }
            else if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.selectedProtocol = "OPC UA";
                this.updateAutoCompleteOpcua(this.componentIns);
            }
            this.componentIns.cfgComponentInfo(nodeObj);
        }
    };
    PlcDeviceComponent.prototype.ngOnInit = function () {
        this.initProtocol();
        this.initAlgos();
        this.initNameMap();
        this.displayProtocolCpt(this.selectedProtocol, this.operate, this.nodecfg);
    };
    PlcDeviceComponent.prototype.initProtocol = function () {
        var p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("S7");
        p.setNo(0);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("OPC UA");
        p.setNo(2);
        this.getProtocols().push(p);
    };
    PlcDeviceComponent.prototype.ngAfterViewInit = function () {
        // 根据节点的类型，回显select
        for (var i = 0; i < this.getProtocols().length; i++) {
            if (this.getProtocols()[i].getName() == this.selectedProtocol) {
                this.mySelect.nativeElement.selectedIndex = this.getProtocols()[i].getNo();
                break;
            }
        }
        // 根据节点的类型，回显select
        for (var i = 0; i < this.getAlgos().length; i++) {
            if (this.getAlgos()[i].getName() == this.selectedAlgo) {
                this.mySelectAlgo.nativeElement.selectedIndex = this.getAlgos()[i].getNo();
                break;
            }
        }
    };
    /**
     * 保存button配置信息
     */
    PlcDeviceComponent.prototype.saveInfo = function () {
        var bi = new DeviceInfo();
        var ds = this.componentIns.saveComponentInfo();
        if (typeof (ds) == "undefined" || ds == null) {
            return;
        }
        bi.setIoDeviceId(this.getIoDeviceId());
        bi.setIoDeviceName(this.getIoDeviceName());
        bi.setDisplayName(this.getAlias());
        bi.setType(this.getType());
        var tmpDs = new DataSource();
        tmpDs.setProtocol(ds.protocol);
        tmpDs.setConfig(JSON.stringify(ds));
        bi.setDataSource(tmpDs);
        bi.setPreprocessing(this.selectedAlgo);
        this.updateEmitter.emit(bi);
        alert("Save success!");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PlcDeviceComponent.prototype, "mySelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectAlgo'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PlcDeviceComponent.prototype, "mySelectAlgo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicProtocolDirective"]),
        __metadata("design:type", _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicProtocolDirective"])
    ], PlcDeviceComponent.prototype, "componentHost", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], PlcDeviceComponent.prototype, "updateEmitter", void 0);
    PlcDeviceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-plc-device',
            template: __webpack_require__(/*! ./plc-device.component.html */ "./src/app/plc-device/plc-device.component.html"),
            styles: [__webpack_require__(/*! ./plc-device.component.css */ "./src/app/plc-device/plc-device.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__["DynamicProtocolService"]])
    ], PlcDeviceComponent);
    return PlcDeviceComponent;
}(_deviceOpration__WEBPACK_IMPORTED_MODULE_6__["DeviceOperation"]));

var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    DataSource.prototype.setConfig = function (config) {
        this.config = config;
    };
    return DataSource;
}());
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo() {
        this.dataSource = new DataSource();
    }
    DeviceInfo.prototype.getType = function () {
        return this.type;
    };
    DeviceInfo.prototype.setType = function (type) {
        this.type = type;
    };
    DeviceInfo.prototype.getDataSource = function () {
        return this.dataSource;
    };
    DeviceInfo.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
    };
    DeviceInfo.prototype.getPreprocessing = function () {
        return this.preprocessing;
    };
    DeviceInfo.prototype.setPreprocessing = function (preprocessing) {
        this.preprocessing = preprocessing;
    };
    DeviceInfo.prototype.setAlgorithm = function (algorithm) {
        this.preprocessing = algorithm;
    };
    DeviceInfo.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    DeviceInfo.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    DeviceInfo.prototype.getIoDeviceName = function () {
        return this.ioDeviceName;
    };
    DeviceInfo.prototype.setIoDeviceName = function (ioDeviceName) {
        this.ioDeviceName = ioDeviceName;
    };
    DeviceInfo.prototype.getDispalyName = function () {
        return this.displayName;
    };
    DeviceInfo.prototype.setDisplayName = function (displayName) {
        this.displayName = displayName;
    };
    return DeviceInfo;
}());


/***/ }),

/***/ "./src/app/plc/plc.component.css":
/*!***************************************!*\
  !*** ./src/app/plc/plc.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n  width:100%;\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n  text-align: center;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\n.button{\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  cursor: pointer;\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: transparent;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n  text-align: center;\r\n  margin: 0;\r\n  line-height: 36px;\r\n  border-radius: 2px;\r\n  -webkit-transform: translate3d(0,0,0);\r\n          transform: translate3d(0,0,0);\r\n  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n  background:rgb(224, 224,224);\r\n  width: 50px\r\n}\r\n\r\np{\r\n  margin-left: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGxjL3BsYy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtFQUNWLDBCQUEwQjtFQUMxQiwwQkFBMEI7RUFDMUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixVQUFVO0VBQ1Ysd0NBQXdDO0VBQ3hDLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIsU0FBUztFQUNULGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3Qiw4RkFBOEY7RUFDOUYsNEJBQTRCO0VBQzVCO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9wbGMvcGxjLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGVCbG9ja3tcclxuICB3aWR0aDoxMDAlO1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDMpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmJ1dHRvbntcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBvdXRsaW5lOiAwO1xyXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAzNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsMCwwKTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllciguNCwwLC4yLDEpO1xyXG4gIGJhY2tncm91bmQ6cmdiKDIyNCwgMjI0LDIyNCk7XHJcbiAgd2lkdGg6IDUwcHhcclxufVxyXG5cclxucHtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/plc/plc.component.html":
/*!****************************************!*\
  !*** ./src/app/plc/plc.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n\n<!--封装第二行-->\n<div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n  <div style=\"height: 170px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<p style=\"height: 30px;\">Name</p>-->\n    <!--<p style=\"height: 30px;\">Alias</p>-->\n    <!--<p style=\"height: 30px;\">Protocol</p>-->\n    <p style=\"height: 30px;\">IP</p>\n    <p style=\"height: 30px;\">Address</p>\n    <p style=\"height: 30px;\">Cycle</p>\n    <p style=\"height: 30px;\">DataType</p>\n  </div>\n  <div style=\"height: 170px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"name\" (blur)=\"copyToAlias()\">-->\n    <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n    <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"alias\">-->\n    <div>\n      <input style=\"width:170px;height: 30px;border:1px solid #9A9A9A\" [formControl]=\"ipControl\" [matAutocomplete]=\"autoIp\" [(ngModel)]=\"ip\">\n      <mat-autocomplete #autoIp=\"matAutocomplete\">\n        <mat-option *ngFor=\"let option1 of ipFilteredOptions | async\" [value]=\"option1\">\n          {{option1}}\n        </mat-option>\n      </mat-autocomplete>\n    </div>\n    <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"address\">-->\n    <div>\n      <input style=\"width:170px;height: 30px;border:1px solid #9A9A9A\" [formControl]=\"addressControl\" [matAutocomplete]=\"autoAddress\" [(ngModel)]=\"address\">\n      <mat-autocomplete #autoAddress=\"matAutocomplete\">\n        <mat-option *ngFor=\"let option2 of addressFilteredOptions | async\" [value]=\"option2\">\n          {{option2}}\n        </mat-option>\n      </mat-autocomplete>\n    </div>\n    <select [ngModel]=\"selectedCycle\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onCycleChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of cycles; let j = index\">{{item}}</option>\n    </select>\n    <select [ngModel]=\"selectedDataType\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onDataTypeChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of dataTypes; let j = index\">{{item}}</option>\n    </select>\n  </div>\n\n  <!--间距调整-->\n  <div></div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/plc/plc.component.ts":
/*!**************************************!*\
  !*** ./src/app/plc/plc.component.ts ***!
  \**************************************/
/*! exports provided: PlcComponent, PlcInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlcComponent", function() { return PlcComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlcInfo", function() { return PlcInfo; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlcComponent = /** @class */ (function () {
    function PlcComponent() {
        //private name: string="";
        this.protocol = "S7";
        //private alias: string="";
        this.ip = "";
        this.address = "";
        this.cycles = new Array();
        this.dataTypes = new Array();
        // ip自动补全
        this.ipControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.ipOptions = [];
        // address自动补全
        this.addressControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.addressOptions = [];
        this.selectedCycle = "5s";
        this.selectedDataType = "INT";
        this.cycles.push("10ms");
        this.cycles.push("100ms");
        this.cycles.push("500ms");
        this.cycles.push("1s");
        this.cycles.push("5s");
        this.cycles.push("10s");
        this.cycles.push("15s");
        this.cycles.push("30s");
        this.cycles.push("1m");
        this.dataTypes.push("BOOLEAN");
        this.dataTypes.push("INT");
        this.dataTypes.push("LONG");
        this.dataTypes.push("DOUBLE");
        this.dataTypes.push("STRING");
    }
    PlcComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ipFilteredOptions = this.ipControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (val) { return _this.ipFilter(val); }));
        this.addressFilteredOptions = this.addressControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (val) { return _this.addressFilter(val); }));
    };
    PlcComponent.prototype.ngAfterViewInit = function () {
        $("input.mat-input-element").css("border", "");
    };
    PlcComponent.prototype.ipFilter = function (val) {
        return this.ipOptions.filter(function (option) {
            if (typeof (option) != "undefined") {
                option.toLowerCase().includes(val.toLowerCase());
            }
        });
    };
    PlcComponent.prototype.addressFilter = function (val) {
        return this.addressOptions.filter(function (option) {
            if (typeof (option) != "undefined") {
                option.toLowerCase().includes(val.toLowerCase());
            }
        });
    };
    PlcComponent.prototype.onCycleChange = function (newVal) {
        this.selectedCycle = newVal;
    };
    PlcComponent.prototype.onDataTypeChange = function (newVal) {
        this.selectedDataType = newVal;
    };
    //setName(name: string){
    //  this.name = name;
    //}
    //setAlias(alias: string){
    //  this.alias = alias;
    //}
    PlcComponent.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    PlcComponent.prototype.setIp = function (ip) {
        this.ip = ip;
    };
    PlcComponent.prototype.setAddress = function (address) {
        this.address = address;
    };
    PlcComponent.prototype.setSelectedCycle = function (cycle) {
        this.selectedCycle = cycle;
    };
    PlcComponent.prototype.setSelectedDataType = function (dataType) {
        this.selectedDataType = dataType;
    };
    PlcComponent.prototype.getIpOptions = function () {
        return this.ipOptions;
    };
    PlcComponent.prototype.getAddressOptions = function () {
        return this.addressOptions;
    };
    PlcComponent.prototype.cfgComponentInfo = function (nodeObj) {
        var obj;
        //this.setName(nodeObj.name);
        //this.setAlias(nodeObj.alias);
        this.setProtocol(nodeObj.protocol);
        if (typeof (nodeObj.config) == "string") {
            obj = JSON.parse(nodeObj.config);
        }
        else {
            obj = nodeObj.config;
        }
        this.setIp(obj.ip);
        this.setAddress(obj.address);
        this.setSelectedCycle(obj.cycle);
        this.setSelectedDataType(obj.dataType);
    };
    //copyToAlias(){
    //  if(this.name != ""){
    //    this.alias = this.name;
    //  }
    //}
    PlcComponent.prototype.saveComponentInfo = function () {
        if (this.judgeInputNull(this.ip.trim())
            || this.judgeInputNull(this.address.trim())) {
            alert("All properties need to be filled!");
            return;
        }
        else {
            var pi = new PlcInfo();
            //pi.setName(this.name.trim());
            //pi.setAlias(this.alias.trim());
            pi.setProtocol("S7");
            pi.setIp(this.ip.trim());
            pi.setAddress(this.address.trim());
            if (this.selectedCycle != null && this.selectedCycle != "") {
                pi.setCycle(this.selectedCycle);
            }
            if (this.selectedDataType != null && this.selectedDataType != "") {
                pi.setDataType(this.selectedDataType);
            }
            return pi;
        }
    };
    PlcComponent.prototype.judgeInputNull = function (input) {
        if (typeof (input) == undefined || input == null || input.trim() == "") {
            return true;
        }
        else {
            return false;
        }
    };
    PlcComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-plc',
            template: __webpack_require__(/*! ./plc.component.html */ "./src/app/plc/plc.component.html"),
            styles: [__webpack_require__(/*! ./plc.component.css */ "./src/app/plc/plc.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PlcComponent);
    return PlcComponent;
}());

var PlcInfo = /** @class */ (function () {
    function PlcInfo() {
        //this.name="";
        //this.alias="";
        this.ip = "";
        this.address = "";
        this.cycle = "5s";
        this.dataType = "INT";
    }
    //setName(name:string){
    //  this.name = name;
    //}
    //getName(): string{
    //  return this.name;
    //}
    //setAlias(alias){
    //  this.alias = alias;
    //}
    //getAlias(): string{
    //  return this.alias;
    //}
    PlcInfo.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    PlcInfo.prototype.getProtocol = function () {
        return this.protocol;
    };
    PlcInfo.prototype.setIp = function (ip) {
        this.ip = ip;
    };
    PlcInfo.prototype.getIp = function () {
        return this.ip;
    };
    PlcInfo.prototype.setAddress = function (address) {
        this.address = address;
    };
    PlcInfo.prototype.getAddress = function () {
        return this.address;
    };
    PlcInfo.prototype.setCycle = function (cycle) {
        this.cycle = cycle;
    };
    PlcInfo.prototype.getCycle = function () {
        return this.cycle;
    };
    PlcInfo.prototype.setDataType = function (dataType) {
        this.dataType = dataType;
    };
    PlcInfo.prototype.getDataType = function () {
        return this.dataType;
    };
    return PlcInfo;
}());



/***/ }),

/***/ "./src/app/product-cfg/product-cfg.component.css":
/*!*******************************************************!*\
  !*** ./src/app/product-cfg/product-cfg.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".post-form mat-form-field {\r\n  width: 100%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdC1jZmcvcHJvZHVjdC1jZmcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYiIsImZpbGUiOiJzcmMvYXBwL3Byb2R1Y3QtY2ZnL3Byb2R1Y3QtY2ZnLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucG9zdC1mb3JtIG1hdC1mb3JtLWZpZWxkIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/product-cfg/product-cfg.component.html":
/*!********************************************************!*\
  !*** ./src/app/product-cfg/product-cfg.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>\n  {{title}}\n</h2>\n\n<form [formGroup]=\"productFormGroup\" (ngSubmit)=\"saveInfo()\">\n  <mat-dialog-content class=\"post-form\">\n  <mat-form-field>\n    <input matInput placeholder=\"Name\" formControlName=\"nameForm\" required/>\n  </mat-form-field>\n  <mat-form-field>\n    <textarea matInput placeholder=\"Description\" rows=\"5\" formControlName=\"desForm\"></textarea>\n    <mat-hint align=\"end\">Max 100 Characters!</mat-hint>\n  </mat-form-field>\n  </mat-dialog-content>\n\n  <mat-dialog-actions>\n  <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" type=\"submit\" [disabled]=\"!productFormGroup.valid\">Save</button>\n  <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" mat-dialog-close>Cancel</button>\n  </mat-dialog-actions>\n</form>\n"

/***/ }),

/***/ "./src/app/product-cfg/product-cfg.component.ts":
/*!******************************************************!*\
  !*** ./src/app/product-cfg/product-cfg.component.ts ***!
  \******************************************************/
/*! exports provided: ProductCfgComponent, Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCfgComponent", function() { return ProductCfgComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ProductCfgComponent = /** @class */ (function () {
    function ProductCfgComponent(dialogRef, http, data) {
        this.dialogRef = dialogRef;
        this.http = http;
        this.data = data;
        this.productFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            nameForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required),
            desForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]()
        });
        this.title = "Plant View";
        this.operate = data.operate;
        this.name = data.name;
        this.description = data.comment;
        this.id = data.id;
        this.productFormGroup.get('nameForm').setValue(this.name);
        this.productFormGroup.get('desForm').setValue(this.description);
    }
    ProductCfgComponent.prototype.ngOnInit = function () {
    };
    ProductCfgComponent.prototype.saveInfo = function () {
        this.name = this.productFormGroup.get('nameForm').value;
        this.description = this.productFormGroup.get('desForm').value;
        var pro = new Product();
        if (this.operate == 'new') {
            var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
            var id = uuidv4().replace(/\-/g, "");
            pro.setId(id);
        }
        else if (this.operate == 'modify') {
            pro.setId(this.id);
        }
        pro.setName(this.name);
        pro.setDescription(this.description);
        this.saveProjectToDB(pro);
    };
    ProductCfgComponent.prototype.saveProjectToDB = function (product) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_3__["config"].backendUrl + '/products/' + product.id;
        return this.http.post(url, product, options)
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.dialogRef.close((product));
            }
        }, function (err) {
            alert("Failed to create!");
        }, function () { return console.log('Call Complete'); });
    };
    ProductCfgComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-cfg',
            template: __webpack_require__(/*! ./product-cfg.component.html */ "./src/app/product-cfg/product-cfg.component.html"),
            styles: [__webpack_require__(/*! ./product-cfg.component.css */ "./src/app/product-cfg/product-cfg.component.css")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], Object])
    ], ProductCfgComponent);
    return ProductCfgComponent;
}());

var Product = /** @class */ (function () {
    function Product() {
        this.name = "";
        this.status = "init";
    }
    Product.prototype.setName = function (name) {
        this.name = name;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.setStatus = function (status) {
        this.status = status;
    };
    Product.prototype.setId = function (id) {
        this.id = id;
    };
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.setDescription = function (description) {
        this.description = description;
    };
    Product.prototype.getDescription = function () {
        return this.description;
    };
    return Product;
}());



/***/ }),

/***/ "./src/app/product-mgt/product-mgt.component.css":
/*!*******************************************************!*\
  !*** ./src/app/product-mgt/product-mgt.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:30px;\r\n}\r\n\r\n.mat-toolbar.mat-primary {\r\n  background: #41aaaa;\r\n}\r\n\r\n.adjustPos{\r\n  margin-top: 8px;\r\n}\r\n\r\n.common{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n}\r\n\r\n.common1{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n  width: 300px;\r\n}\r\n\r\n.titleBlock{\r\n  width:100%;\r\n  /*font-weight:bold;\r\n  background: rgb(235, 235, 210);\r\n  height:30px;\r\n  vertical-align: center;\r\n  height: 15px;\r\n  padding: 10px;\r\n  margin-left: 10px;*/\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\nli {\r\n  list-style-type:none;\r\n}\r\n\r\nul {\r\n  padding-left: 0px;\r\n}\r\n\r\nul li:hover{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\n.ui.grid{\r\n  margin: 0px;\r\n}\r\n\r\n.footer{\r\n  position: fixed;\r\n  bottom: 10px;\r\n  right:10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZHVjdC1tZ3QvcHJvZHVjdC1tZ3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixxREFBcUQ7RUFDckQsY0FBYztBQUNoQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxZQUFZO0VBQ1osMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsWUFBWTtFQUNaLDJCQUEyQjtFQUMzQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1Y7Ozs7OztxQkFNbUI7RUFDbkIsMEJBQTBCO0VBQzFCLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix3QkFBd0I7RUFDeEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWixVQUFVO0FBQ1oiLCJmaWxlIjoic3JjL2FwcC9wcm9kdWN0LW1ndC9wcm9kdWN0LW1ndC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpdGxlU3R5bGV7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgZm9udC1zaXplOjMwcHg7XHJcbn1cclxuXHJcbi5tYXQtdG9vbGJhci5tYXQtcHJpbWFyeSB7XHJcbiAgYmFja2dyb3VuZDogIzQxYWFhYTtcclxufVxyXG5cclxuLmFkanVzdFBvc3tcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbn1cclxuXHJcbi5jb21tb257XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgZm9udC1zaXplOjIwcHg7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsLjAzKTtcclxufVxyXG5cclxuLmNvbW1vbjF7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgZm9udC1zaXplOjIwcHg7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwwLDAsLjAzKTtcclxuICB3aWR0aDogMzAwcHg7XHJcbn1cclxuXHJcbi50aXRsZUJsb2Nre1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgLypmb250LXdlaWdodDpib2xkO1xyXG4gIGJhY2tncm91bmQ6IHJnYigyMzUsIDIzNSwgMjEwKTtcclxuICBoZWlnaHQ6MzBweDtcclxuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xyXG4gIGhlaWdodDogMTVweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4OyovXHJcbiAgcGFkZGluZzogMTBweCAwcHggMTBweCAwcHg7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbn1cclxuXHJcbmgyIHtcclxuICBtYXJnaW46MHB4IDEuMjVyZW07XHJcbiAgcGFkZGluZzogMHB4IDBweCAwcHggMHB4O1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbmEge1xyXG4gIGNvbG9yOiAjODg4O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxubGkge1xyXG4gIGxpc3Qtc3R5bGUtdHlwZTpub25lO1xyXG59XHJcblxyXG51bCB7XHJcbiAgcGFkZGluZy1sZWZ0OiAwcHg7XHJcbn1cclxuXHJcbnVsIGxpOmhvdmVye1xyXG4gIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjA2KTtcclxufVxyXG5cclxuLnVpLmdyaWR7XHJcbiAgbWFyZ2luOiAwcHg7XHJcbn1cclxuXHJcbi5mb290ZXJ7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGJvdHRvbTogMTBweDtcclxuICByaWdodDoxMHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/product-mgt/product-mgt.component.html":
/*!********************************************************!*\
  !*** ./src/app/product-mgt/product-mgt.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--主面板-->\r\n<div id=\"mainPanel\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0\">\r\n  <div id=\"project\" style=\"margin-top:5px;margin-left:10px;width: 100%;\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start start\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0px\">\r\n    <div class=\"ui four column grid\" style=\"width:100%;overflow:auto;\">\r\n      <div class=\"column\" *ngFor=\"let product of products\">\r\n        <div class=\"ui fluid card\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0px\">\r\n          <div style=\"width: 100%;height: 168px;font-weight:bold;font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:20px;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"center center\">\r\n            <a id=\"{{product.id}}\" href=\"javascript:void(0)\" (click)=\"jumpCreateProduct($event)\">{{product.name}}</a>\r\n          </div>\r\n          <div style=\"width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start center\">\r\n            <div fxFlex=\"80%\" style=\"margin-left: 20px;margin-bottom: 5px\">\r\n            </div>\r\n            <div id=\"{{product.id}}\" fxFlex=\"20%\" fxLayoutAlign=\"end start\" style=\"margin-right: 20px;margin-bottom: 5px\">\r\n              <img class=\"icon\" [src]=\"editIcon\" (click)=\"modifyProductCfg($event.target.parentElement.id)\" />\r\n              <img class=\"icon\" [src]=\"deleteIcon\" (click)=\"deleteProduct($event.target.parentElement.id)\" />\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"footer\">\r\n<img [src]=\"createProductIcon\" style=\"margin-right: 10px;float: right;cursor:pointer\" (click)=\"createProduct()\" title=\"New\"/>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/product-mgt/product-mgt.component.ts":
/*!******************************************************!*\
  !*** ./src/app/product-mgt/product-mgt.component.ts ***!
  \******************************************************/
/*! exports provided: ProductMgtComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductMgtComponent", function() { return ProductMgtComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../project.service */ "./src/app/project.service.ts");
/* harmony import */ var _product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../product-cfg/product-cfg.component */ "./src/app/product-cfg/product-cfg.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../optconfirmdialog/optconfirmdialog.component */ "./src/app/optconfirmdialog/optconfirmdialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProductMgtComponent = /** @class */ (function () {
    function ProductMgtComponent(projectService, dialog, http) {
        this.projectService = projectService;
        this.dialog = dialog;
        this.http = http;
        this.products = [];
        this.proMap = new Map();
        this.createProductIcon = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].iconPosition + "circle_add.png";
        this.editIcon = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].iconPosition + "edit.png";
        this.deleteIcon = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].iconPosition + "delete.png";
    }
    ProductMgtComponent.prototype.ngOnInit = function () {
        this.readAllProducts();
    };
    ProductMgtComponent.prototype.ngAfterViewInit = function () {
    };
    ProductMgtComponent.prototype.readAllProducts = function () {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].backendUrl + '/products/';
        return this.http.get(url, options)
            .subscribe(function (response) {
            var pros = response.json();
            if (typeof (pros) != "undefined" && pros != null && pros.length > 0) {
                for (var i = 0; i < pros.length; i++) {
                    var p = new _product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Product"]();
                    p.setName(pros[i].name);
                    p.setId(pros[i].id);
                    p.setDescription(pros[i].description);
                    _this.products.push(p);
                    _this.proMap.set(pros[i].id, p);
                }
            }
        }, function (err) {
        }, function () { return console.log('Call Complete'); });
    };
    /**
     * 创建product
     */
    ProductMgtComponent.prototype.createProduct = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_2__["ProductCfgComponent"], {
            data: {
                id: '',
                operate: 'new',
                name: '',
                comment: ''
            },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != "" && typeof (result) != "undefined") {
                var pro = new _product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Product"]();
                pro.setName(result.name);
                pro.setDescription(result.description);
                pro.setId(result.id);
                _this.products.push(pro);
                _this.proMap.set(result.id, pro);
            }
        });
    };
    /**
     * 修改product配置
     * @param cfgInfo
     */
    ProductMgtComponent.prototype.modifyProductCfg = function (id) {
        var _this = this;
        var pro = this.proMap.get(id);
        var dialogRef = this.dialog.open(_product_cfg_product_cfg_component__WEBPACK_IMPORTED_MODULE_2__["ProductCfgComponent"], {
            data: {
                id: id,
                operate: 'modify',
                name: pro.getName(),
                comment: pro.getDescription()
            },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != "" && typeof (result) != "undefined") {
                var id = result.id;
                for (var i = 0; i < _this.products.length; i++) {
                    var tmpId = _this.products[i].getId();
                    if (id == tmpId) {
                        _this.products[i].setName(result.name);
                        _this.products[i].setDescription(result.description);
                        _this.proMap.set(result.id, _this.products[i]);
                        break;
                    }
                }
            }
        });
    };
    /**
     * 删除product
     * @param id
     */
    ProductMgtComponent.prototype.deleteProduct = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(_optconfirmdialog_optconfirmdialog_component__WEBPACK_IMPORTED_MODULE_6__["OptconfirmdialogComponent"], {
            data: { "hintMgs": "Are you sure to delete?" },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if ("confirm" == result) {
                _this.proMap.delete(id);
                for (var i = 0; i < _this.products.length; i++) {
                    var tmpId = _this.products[i].getId();
                    if (id == tmpId) {
                        _this.products.splice(i, 1);
                        break;
                    }
                }
                _this.delProductDB(id);
            }
        });
    };
    ProductMgtComponent.prototype.delProductDB = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].backendUrl + '/products/' + id;
        return this.http.delete(url, options)
            .subscribe(function (response) {
        }, function (err) {
        }, function () { alert('Delete success!'); });
    };
    ProductMgtComponent.prototype.jumpCreateProduct = function (obj) {
        var productName = obj.currentTarget.text;
        var productId = obj.currentTarget.id;
        this.projectService.createLineNetwork(productName, productId);
    };
    ProductMgtComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-mgt',
            template: __webpack_require__(/*! ./product-mgt.component.html */ "./src/app/product-mgt/product-mgt.component.html"),
            styles: [__webpack_require__(/*! ./product-mgt.component.css */ "./src/app/product-mgt/product-mgt.component.css")]
        }),
        __metadata("design:paramtypes", [_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _angular_http__WEBPACK_IMPORTED_MODULE_4__["Http"]])
    ], ProductMgtComponent);
    return ProductMgtComponent;
}());



/***/ }),

/***/ "./src/app/project-cfg/project-cfg.component.css":
/*!*******************************************************!*\
  !*** ./src/app/project-cfg/project-cfg.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".post-form mat-form-field {\r\n  width: 100%;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC1jZmcvcHJvamVjdC1jZmcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7QUFDYiIsImZpbGUiOiJzcmMvYXBwL3Byb2plY3QtY2ZnL3Byb2plY3QtY2ZnLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucG9zdC1mb3JtIG1hdC1mb3JtLWZpZWxkIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/project-cfg/project-cfg.component.html":
/*!********************************************************!*\
  !*** ./src/app/project-cfg/project-cfg.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>\n    {{title}}\n</h2>\n\n<form [formGroup]=\"plantFormGroup\" (ngSubmit)=\"saveInfo()\">\n  <mat-dialog-content class=\"post-form\">\n    <mat-form-field>\n      <input matInput placeholder=\"Name\" formControlName=\"nameForm\" required/>\n    </mat-form-field>\n    <mat-form-field>\n      <textarea matInput placeholder=\"Description\" rows=\"5\" formControlName=\"desForm\"></textarea>\n      <mat-hint align=\"end\">Max 100 Characters!</mat-hint>\n    </mat-form-field>\n  </mat-dialog-content>\n\n  <mat-dialog-actions>\n    <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" type=\"submit\" [disabled]=\"!plantFormGroup.valid\">Save</button>\n    <button mat-raised-button style=\"width:80px;background:rgb(224, 224,224)\" mat-dialog-close>Cancel</button>\n  </mat-dialog-actions>\n</form>\n"

/***/ }),

/***/ "./src/app/project-cfg/project-cfg.component.ts":
/*!******************************************************!*\
  !*** ./src/app/project-cfg/project-cfg.component.ts ***!
  \******************************************************/
/*! exports provided: ProjectCfgComponent, Plant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectCfgComponent", function() { return ProjectCfgComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plant", function() { return Plant; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ProjectCfgComponent = /** @class */ (function () {
    function ProjectCfgComponent(dialogRef, http, data) {
        this.dialogRef = dialogRef;
        this.http = http;
        this.data = data;
        this.plantFormGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            nameForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required),
            desForm: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]()
        });
        this.title = "Plant";
        this.operate = data.operate;
        this.name = data.name;
        this.description = data.comment;
        this.id = data.id;
        this.plantFormGroup.get('nameForm').setValue(this.name);
        this.plantFormGroup.get('desForm').setValue(this.description);
    }
    ProjectCfgComponent.prototype.ngOnInit = function () {
    };
    ProjectCfgComponent.prototype.saveInfo = function () {
        this.name = this.plantFormGroup.get('nameForm').value;
        this.description = this.plantFormGroup.get('desForm').value;
        var pro = new Plant();
        if (this.operate == 'new') {
            var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
            var id = uuidv4().replace(/\-/g, "");
            pro.setPlantId(id);
        }
        else if (this.operate == 'modify') {
            pro.setPlantId(this.id);
        }
        pro.setName(this.name);
        pro.setDescription(this.description);
        // 保存数据到后台
        this.savePlantToDB(pro, this.operate);
    };
    ProjectCfgComponent.prototype.savePlantToDB = function (plant, operation) {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_3__["config"].backendUrl + '/plants/' + plant.plantId + '/' + operation;
        return this.http.post(url, plant, options)
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.dialogRef.close((plant));
            }
        }, function (err) {
            alert("Failed to create!");
        }, function () { return console.log('Call savePlantToDB Complete!'); });
    };
    ProjectCfgComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project-cfg',
            template: __webpack_require__(/*! ./project-cfg.component.html */ "./src/app/project-cfg/project-cfg.component.html"),
            styles: [__webpack_require__(/*! ./project-cfg.component.css */ "./src/app/project-cfg/project-cfg.component.css")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], Object])
    ], ProjectCfgComponent);
    return ProjectCfgComponent;
}());

var Plant = /** @class */ (function () {
    function Plant() {
        this.name = "";
        this.lineNum = 0;
        this.status = 0;
    }
    Plant.prototype.setName = function (name) {
        this.name = name;
    };
    Plant.prototype.getName = function () {
        return this.name;
    };
    Plant.prototype.setLineNum = function (lineNum) {
        this.lineNum = lineNum;
    };
    Plant.prototype.getLineNum = function () {
        return this.lineNum;
    };
    Plant.prototype.setStatus = function (status) {
        this.status = status;
    };
    Plant.prototype.setPlantId = function (plantId) {
        this.plantId = plantId;
    };
    Plant.prototype.getPlantId = function () {
        return this.plantId;
    };
    Plant.prototype.setDescription = function (description) {
        this.description = description;
    };
    Plant.prototype.getDescription = function () {
        return this.description;
    };
    return Plant;
}());



/***/ }),

/***/ "./src/app/project.service.ts":
/*!************************************!*\
  !*** ./src/app/project.service.ts ***!
  \************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProjectService = /** @class */ (function () {
    function ProjectService(router, dialog) {
        this.router = router;
        this.dialog = dialog;
        this.eventEmit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * 项目管理
     */
    ProjectService.prototype.createProject = function () {
        this.router.navigate(['/createProject'], { replaceUrl: true });
    };
    /**
     * 产品线管理
     */
    ProjectService.prototype.createLine = function (projectId, projectName) {
        this.router.navigate(['/instanceManagement'], { queryParams: { 'projectId': projectId, 'projectName': projectName }, replaceUrl: true });
    };
    /**
     * 创建产线实例
     */
    ProjectService.prototype.createInstance = function (lineName, lineId) {
        this.router.navigate(['/createInstance'], { queryParams: { 'lineName': lineName, 'lineId': lineId }, replaceUrl: true });
    };
    ProjectService.prototype.createLineNetwork = function (productName, productId) {
        this.router.navigate(['/createLineNetwork'], { queryParams: { 'productName': productName, 'productId': productId }, replaceUrl: true });
    };
    ProjectService.prototype.createProduct = function () {
        this.router.navigate(['/createProduct'], { replaceUrl: true });
    };
    ProjectService.prototype.checkPyLint = function () {
        this.router.navigate(['/checkPyLint'], { replaceUrl: true });
    };
    ProjectService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ProjectService);
    return ProjectService;
}());



/***/ }),

/***/ "./src/app/project/project.component.css":
/*!***********************************************!*\
  !*** ./src/app/project/project.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleStyle{\r\n  text-align: center;\r\n  font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n  font-size:30px;\r\n}\r\n\r\n.mat-toolbar.mat-primary {\r\n  background: #41aaaa;\r\n}\r\n\r\n.adjustPos{\r\n  margin-top: 8px;\r\n}\r\n\r\n.common{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n}\r\n\r\n.common1{\r\n  text-align: center;\r\n  font-weight:bold;\r\n  font-size:20px;\r\n  width: 200px;\r\n  background: rgba(0,0,0,.03);\r\n  width: 300px;\r\n}\r\n\r\n.titleBlock{\r\n  width:100%;\r\n  /*font-weight:bold;\r\n  background: rgb(235, 235, 210);\r\n  height:30px;\r\n  vertical-align: center;\r\n  height: 15px;\r\n  padding: 10px;\r\n  margin-left: 10px;*/\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\nli {\r\n  list-style-type:none;\r\n}\r\n\r\nul {\r\n  padding-left: 0px;\r\n}\r\n\r\nul li:hover{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\n.ui.grid{\r\n  margin: 0px;\r\n}\r\n\r\n.footer{\r\n  position: fixed;\r\n  bottom: 10px;\r\n  right:10px;\r\n}\r\n\r\n.clickColor{\r\n  background:rgba(0,0,0,0.06);\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvamVjdC9wcm9qZWN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIscURBQXFEO0VBQ3JELGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsWUFBWTtFQUNaLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLFlBQVk7RUFDWiwyQkFBMkI7RUFDM0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsVUFBVTtFQUNWOzs7Ozs7cUJBTW1CO0VBQ25CLDBCQUEwQjtFQUMxQiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsd0JBQXdCO0VBQ3hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osVUFBVTtBQUNaOztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCIiwiZmlsZSI6InNyYy9hcHAvcHJvamVjdC9wcm9qZWN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGVTdHlsZXtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICBmb250LXNpemU6MzBweDtcclxufVxyXG5cclxuLm1hdC10b29sYmFyLm1hdC1wcmltYXJ5IHtcclxuICBiYWNrZ3JvdW5kOiAjNDFhYWFhO1xyXG59XHJcblxyXG4uYWRqdXN0UG9ze1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxufVxyXG5cclxuLmNvbW1vbntcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICBmb250LXNpemU6MjBweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMDMpO1xyXG59XHJcblxyXG4uY29tbW9uMXtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6Ym9sZDtcclxuICBmb250LXNpemU6MjBweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwuMDMpO1xyXG4gIHdpZHRoOiAzMDBweDtcclxufVxyXG5cclxuLnRpdGxlQmxvY2t7XHJcbiAgd2lkdGg6MTAwJTtcclxuICAvKmZvbnQtd2VpZ2h0OmJvbGQ7XHJcbiAgYmFja2dyb3VuZDogcmdiKDIzNSwgMjM1LCAyMTApO1xyXG4gIGhlaWdodDozMHB4O1xyXG4gIHZlcnRpY2FsLWFsaWduOiBjZW50ZXI7XHJcbiAgaGVpZ2h0OiAxNXB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7Ki9cclxuICBwYWRkaW5nOiAxMHB4IDBweCAxMHB4IDBweDtcclxuICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjAzKTtcclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICM4ODg7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5saSB7XHJcbiAgbGlzdC1zdHlsZS10eXBlOm5vbmU7XHJcbn1cclxuXHJcbnVsIHtcclxuICBwYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG5cclxudWwgbGk6aG92ZXJ7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuMDYpO1xyXG59XHJcblxyXG4udWkuZ3JpZHtcclxuICBtYXJnaW46IDBweDtcclxufVxyXG5cclxuLmZvb3RlcntcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYm90dG9tOiAxMHB4O1xyXG4gIHJpZ2h0OjEwcHg7XHJcbn1cclxuXHJcbi5jbGlja0NvbG9ye1xyXG4gIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjA2KTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/project/project.component.html":
/*!************************************************!*\
  !*** ./src/app/project/project.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--主面板-->\r\n<div id=\"mainPanel\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start stretch\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0\">\r\n    <div id=\"project\" style=\"margin-top:5px;margin-left:10px;width: 100%;\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start start\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0px\">\r\n      <div class=\"ui four column grid\" style=\"width:100%;overflow:auto;\">\r\n        <div class=\"column\" *ngFor=\"let plant of plants\">\r\n          <div class=\"ui fluid card\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"0px\" fxLayoutGap.xs=\"0px\">\r\n            <div style=\"width: 100%;height: 168px;font-weight:bold;font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:20px;\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"center center\">\r\n              <!--<p style=\"color: #888;\">{{project.name}}</p>-->\r\n              <a id=\"{{plant.plantId}}\" href=\"javascript:void(0)\" (click)=\"jumpCreateLine($event)\">{{plant.name}}</a>\r\n            </div>\r\n            <div style=\"width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start center\">\r\n              <div fxFlex=\"80%\" style=\"margin-left: 20px;margin-bottom: 5px\">\r\n                <p>Lines:{{plant.lineNum}}</p>\r\n              </div>\r\n              <div id=\"{{plant.plantId}}\" fxFlex=\"20%\" fxLayoutAlign=\"end start\" style=\"margin-right: 20px;margin-bottom: 5px\">\r\n                <img class=\"icon\" [src]=\"editIcon\" (click)=\"modifyPlantCfg($event.target.parentElement.id)\" />\r\n                <img class=\"icon\" [src]=\"deleteIcon\" (click)=\"deletePlant($event.target.parentElement.id)\" />\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n<div class=\"footer\">\r\n  <img [src]=\"createProjectIcon\" style=\"margin-right: 10px;float: right;cursor:pointer\" (click)=\"createPlant()\" title=\"New\"/>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/project/project.component.ts":
/*!**********************************************!*\
  !*** ./src/app/project/project.component.ts ***!
  \**********************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../project.service */ "./src/app/project.service.ts");
/* harmony import */ var _project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../project-cfg/project-cfg.component */ "./src/app/project-cfg/project-cfg.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
/* harmony import */ var _hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hintdialog/hintdialog.component */ "./src/app/hintdialog/hintdialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(projectService, dialog, http) {
        this.projectService = projectService;
        this.dialog = dialog;
        this.http = http;
        this.plants = [];
        this.proMap = new Map();
        this.createProjectIcon = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].iconPosition + "circle_add.png";
        this.editIcon = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].iconPosition + "edit.png";
        this.deleteIcon = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].iconPosition + "delete.png";
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.readAllPlants();
    };
    /**
     * 读取已配置所有项目
     */
    ProjectComponent.prototype.readAllPlants = function () {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].backendUrl + '/plants/';
        return this.http.get(url, options)
            .subscribe(function (response) {
            var pros = response.json();
            if (typeof (pros) != "undefined" && pros != null && pros.length > 0) {
                for (var i = 0; i < pros.length; i++) {
                    var p = new _project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Plant"]();
                    p.setName(pros[i].name);
                    p.setLineNum(pros[i].lineNum);
                    p.setPlantId(pros[i].plantId);
                    p.setDescription(pros[i].description);
                    _this.plants.push(p);
                    _this.proMap.set(pros[i].plantId, p);
                }
            }
        }, function (err) {
            alert("Can't connect to the backend!");
        }, function () { return console.log('Call readAllPlants Complete'); });
    };
    ProjectComponent.prototype.ngAfterViewInit = function () { };
    /**
     * 创建plant
     */
    ProjectComponent.prototype.createPlant = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_2__["ProjectCfgComponent"], {
            data: {
                id: '',
                operate: 'new',
                name: '',
                comment: ''
            },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != "" && typeof (result) != "undefined") {
                var pro = new _project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_2__["Plant"]();
                pro.setName(result.name);
                pro.setDescription(result.description);
                pro.setPlantId(result.plantId);
                _this.plants.push(pro);
                _this.proMap.set(result.plantId, pro);
            }
        });
    };
    /**
     * 修改plant配置
     * @param cfgInfo
     */
    ProjectComponent.prototype.modifyPlantCfg = function (id) {
        var _this = this;
        var pro = this.proMap.get(id);
        var dialogRef = this.dialog.open(_project_cfg_project_cfg_component__WEBPACK_IMPORTED_MODULE_2__["ProjectCfgComponent"], {
            data: {
                id: id,
                operate: 'modify',
                name: pro.getName(),
                comment: pro.getDescription()
            },
            hasBackdrop: true,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != "" && typeof (result) != "undefined") {
                var id = result.plantId;
                for (var i = 0; i < _this.plants.length; i++) {
                    var tmpId = _this.plants[i].getPlantId();
                    if (id == tmpId) {
                        _this.plants[i].setName(result.name);
                        _this.plants[i].setDescription(result.description);
                        _this.proMap.set(result.plantId, _this.plants[i]);
                        break;
                    }
                }
            }
        });
    };
    /**
     * 删除plant
     * @param id
     */
    ProjectComponent.prototype.deletePlant = function (id) {
        var tmpPro = this.proMap.get(id);
        var tmpLineNum = tmpPro.getLineNum();
        if (tmpLineNum > 0) {
            var dialogRef = this.dialog.open(_hintdialog_hintdialog_component__WEBPACK_IMPORTED_MODULE_6__["HintdialogComponent"], {
                data: {
                    "statusText": "Can not delete plant with lines!"
                },
                hasBackdrop: true,
                disableClose: true
            });
        }
        else {
            this.proMap.delete(id);
            for (var i = 0; i < this.plants.length; i++) {
                var tmpId = this.plants[i].getPlantId();
                if (id == tmpId) {
                    this.plants.splice(i, 1);
                    break;
                }
            }
            this.delPlant(id);
        }
    };
    ProjectComponent.prototype.delPlant = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["Headers"]({
            'Content-Type': 'application/json'
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_4__["RequestOptions"]({
            headers: headers
        });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_5__["config"].backendUrl + '/plants/' + id;
        return this.http.delete(url, options)
            .subscribe(function (response) {
        }, function (err) { }, function () { return console.log('Call Complete'); });
    };
    ProjectComponent.prototype.jumpCreateLine = function (obj) {
        var projectId = obj.currentTarget.id;
        var projectName = obj.currentTarget.text;
        $($(".mainPanel ul li")[1]).addClass("clickColor");
        $($(".mainPanel ul li")[1]).siblings().removeClass("clickColor");
        //$(".mainPanel ul li a").get(1).click();
        // 采用事件为了改变标题
        this.projectService.eventEmit.emit({
            "projectId": projectId,
            "projectName": projectName
        });
        //this.projectService.createLine(projectId, projectName);
    };
    ProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project',
            template: __webpack_require__(/*! ./project.component.html */ "./src/app/project/project.component.html"),
            styles: [__webpack_require__(/*! ./project.component.css */ "./src/app/project/project.component.css")]
        }),
        __metadata("design:paramtypes", [_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], _angular_http__WEBPACK_IMPORTED_MODULE_4__["Http"]])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/proximity-switch/proximity-switch.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/proximity-switch/proximity-switch.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n    width:100%;\r\n    padding: 10px 0px 10px 0px;\r\n    background:rgba(0,0,0,.03);\r\n    text-align: center;\r\n  }\r\n  \r\n  h2 {\r\n    margin:0px 1.25rem;\r\n    padding: 0px 0px 0px 0px;\r\n    font-size: 15px;\r\n    font-weight: bold;\r\n    color: black;\r\n  }\r\n  \r\n  .button{\r\n    box-sizing: border-box;\r\n    position: relative;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    cursor: pointer;\r\n    outline: 0;\r\n    -webkit-tap-highlight-color: transparent;\r\n    display: inline-block;\r\n    white-space: nowrap;\r\n    text-decoration: none;\r\n    vertical-align: baseline;\r\n    text-align: center;\r\n    margin: 0;\r\n    line-height: 36px;\r\n    border-radius: 2px;\r\n    -webkit-transform: translate3d(0,0,0);\r\n            transform: translate3d(0,0,0);\r\n    transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n    background:rgb(224, 224,224);\r\n    width: 50px\r\n  }\r\n  \r\n  p {\r\n    margin-bottom: 2px;\r\n    margin-left: 10px;\r\n  }\r\n  \r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJveGltaXR5LXN3aXRjaC9wcm94aW1pdHktc3dpdGNoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxVQUFVO0lBQ1YsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtFQUNkOztFQUVBO0lBQ0Usc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLFVBQVU7SUFDVix3Q0FBd0M7SUFDeEMscUJBQXFCO0lBQ3JCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixxQ0FBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLDhGQUE4RjtJQUM5Riw0QkFBNEI7SUFDNUI7RUFDRjs7RUFFQTtJQUNFLGtCQUFrQjtJQUNsQixpQkFBaUI7RUFDbkIiLCJmaWxlIjoic3JjL2FwcC9wcm94aW1pdHktc3dpdGNoL3Byb3hpbWl0eS1zd2l0Y2guY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJsb2Nre1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGgyIHtcclxuICAgIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gIH1cclxuICBcclxuICAuYnV0dG9ue1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBvdXRsaW5lOiAwO1xyXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBsaW5lLWhlaWdodDogMzZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApO1xyXG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm94LXNoYWRvdyAyODBtcyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcclxuICAgIGJhY2tncm91bmQ6cmdiKDIyNCwgMjI0LDIyNCk7XHJcbiAgICB3aWR0aDogNTBweFxyXG4gIH1cclxuICBcclxuICBwIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDJweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gIH1cclxuICAiXX0= */"

/***/ }),

/***/ "./src/app/proximity-switch/proximity-switch.component.html":
/*!******************************************************************!*\
  !*** ./src/app/proximity-switch/proximity-switch.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n  <!--标题行-->\n  <div class=\"titleBlock\">\n    <h2 style=\"font-size: 15px\">I/O Device Properties</h2>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n      <div style=\"height: 70px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <p style=\"height: 30px;\">Name</p>\n        <p style=\"height: 30px;\">Alias</p>\n      </div>\n      <div style=\"height: 70px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"ioDeviceName\" (blur)=\"copyToAlias()\">\n        <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"displayName\">\n      </div>\n    \n      <!--间距调整-->\n      <div></div>\n    </div>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Data source protocol selection:</p>\n    <select #mySelect style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onProtocolChange($event)\">\n      <option [value]=\"protocol.name\" *ngFor=\"let protocol of protocols;\">{{protocol.name}}</option>\n    </select>\n\n    <div style=\"height: 5px;width: 100%;\"></div>\n    <ng-template appDynamicProtocol ></ng-template>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Pre-processing Algorithm:</p>\n    <select #mySelectAlgo style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onAlgoChange($event)\">\n      <option [value]=\"algo.name\" *ngFor=\"let algo of algorithms;\">{{algo.name}}</option>\n    </select>\n  </div>\n\n  <!--封装第三行-->\n  <div style=\"width: 100%;height:50px;background: #F7F7F7;width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n    <button class=\"button\" (click)=\"saveInfo()\">Save</button>\n    <div></div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/proximity-switch/proximity-switch.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/proximity-switch/proximity-switch.component.ts ***!
  \****************************************************************/
/*! exports provided: ProximitySwitchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProximitySwitchComponent", function() { return ProximitySwitchComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamicProtocol.service */ "./src/app/dynamicProtocol.service.ts");
/* harmony import */ var _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dynamicProtocol.directive */ "./src/app/dynamicProtocol.directive.ts");
/* harmony import */ var _io_io_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../io/io.component */ "./src/app/io/io.component.ts");
/* harmony import */ var _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plc/plc.component */ "./src/app/plc/plc.component.ts");
/* harmony import */ var _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../opcua/opcua.component */ "./src/app/opcua/opcua.component.ts");
/* harmony import */ var _deviceOpration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../deviceOpration */ "./src/app/deviceOpration.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var ProximitySwitchComponent = /** @class */ (function (_super) {
    __extends(ProximitySwitchComponent, _super);
    function ProximitySwitchComponent(componentFactoryResolver, dynamicProtocolService) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.dynamicProtocolService = dynamicProtocolService;
        _this.selectedProtocol = "S7";
        _this.selectedAlgo = "Max";
        _this.operate = "new";
        _this.componentIns = {};
        _this.updateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        return _this;
    }
    ProximitySwitchComponent.prototype.setSelectedProtocol = function (selectedProtocol) {
        this.selectedProtocol = selectedProtocol;
    };
    ProximitySwitchComponent.prototype.setSelectedAlgo = function (selectedAlgo) {
        this.selectedAlgo = selectedAlgo;
    };
    ProximitySwitchComponent.prototype.setOperate = function (operate) {
        this.operate = operate;
    };
    ProximitySwitchComponent.prototype.setNodecfg = function (nodecfg) {
        this.nodecfg = nodecfg;
    };
    /**
     * 切换时调用
     * @param obj
     */
    ProximitySwitchComponent.prototype.onProtocolChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getProtocols()[index].getName();
        this.selectedProtocol = this.getConvertNameMap().get(name);
        this.displayProtocolCpt(this.selectedProtocol, "new", "");
    };
    ProximitySwitchComponent.prototype.onAlgoChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getAlgos()[index].getName();
        this.selectedAlgo = name;
    };
    ProximitySwitchComponent.prototype.displayProtocolCpt = function (componentName, operation, nodeCfg) {
        // 根据名称构造不同的组件
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicProtocolService.getComponent(componentName));
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentIns = componentRef.instance;
        if (operation == 'new') {
            // 自动补全功能
            if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.updateAutoCompleteOpcua(this.componentIns);
            }
        }
        else if (operation == 'echo') {
            if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                return;
            }
            var nodeObj = nodeCfg;
            // 根据不同的设备进行初始化
            if (this.componentIns instanceof _io_io_component__WEBPACK_IMPORTED_MODULE_3__["IoComponent"]) {
                //用于调节DIO与Digital I/O
                this.selectedProtocol = "Digital I/O";
            }
            else if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.selectedProtocol = "OPC UA";
                this.updateAutoCompleteOpcua(this.componentIns);
            }
            this.componentIns.cfgComponentInfo(nodeObj);
        }
    };
    ProximitySwitchComponent.prototype.ngOnInit = function () {
        this.initProtocol();
        this.initAlgos();
        this.initNameMap();
        this.displayProtocolCpt(this.selectedProtocol, this.operate, this.nodecfg);
    };
    ProximitySwitchComponent.prototype.initProtocol = function () {
        var p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("S7");
        p.setNo(0);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("Digital I/O");
        p.setNo(1);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("OPC UA");
        p.setNo(2);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("USB");
        p.setNo(3);
        this.getProtocols().push(p);
    };
    ProximitySwitchComponent.prototype.ngAfterViewInit = function () {
        // 根据节点的类型，回显select
        for (var i = 0; i < this.getProtocols().length; i++) {
            if (this.getProtocols()[i].getName() == this.selectedProtocol) {
                this.mySelect.nativeElement.selectedIndex = this.getProtocols()[i].getNo();
                break;
            }
        }
        // 根据节点的类型，回显select
        for (var i = 0; i < this.getAlgos().length; i++) {
            if (this.getAlgos()[i].getName() == this.selectedAlgo) {
                this.mySelectAlgo.nativeElement.selectedIndex = this.getAlgos()[i].getNo();
                break;
            }
        }
    };
    /**
     * 保存button配置信息
     */
    ProximitySwitchComponent.prototype.saveInfo = function () {
        var bi = new DeviceInfo();
        var ds = this.componentIns.saveComponentInfo();
        if (typeof (ds) == "undefined" || ds == null) {
            return;
        }
        bi.setIoDeviceId(this.getIoDeviceId());
        bi.setIoDeviceName(this.getIoDeviceName());
        bi.setDisplayName(this.getAlias());
        bi.setType(this.getType());
        var tmpDs = new DataSource();
        tmpDs.setProtocol(ds.protocol);
        tmpDs.setConfig(JSON.stringify(ds));
        bi.setDataSource(tmpDs);
        bi.setPreprocessing(this.selectedAlgo);
        this.updateEmitter.emit(bi);
        alert("Save success!");
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProximitySwitchComponent.prototype, "mySelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectAlgo'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ProximitySwitchComponent.prototype, "mySelectAlgo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicProtocolDirective"]),
        __metadata("design:type", _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicProtocolDirective"])
    ], ProximitySwitchComponent.prototype, "componentHost", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ProximitySwitchComponent.prototype, "updateEmitter", void 0);
    ProximitySwitchComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-proximity-switch',
            template: __webpack_require__(/*! ./proximity-switch.component.html */ "./src/app/proximity-switch/proximity-switch.component.html"),
            styles: [__webpack_require__(/*! ./proximity-switch.component.css */ "./src/app/proximity-switch/proximity-switch.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__["DynamicProtocolService"]])
    ], ProximitySwitchComponent);
    return ProximitySwitchComponent;
}(_deviceOpration__WEBPACK_IMPORTED_MODULE_6__["DeviceOperation"]));

var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    DataSource.prototype.setConfig = function (config) {
        this.config = config;
    };
    return DataSource;
}());
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo() {
        this.dataSource = new DataSource();
    }
    DeviceInfo.prototype.getType = function () {
        return this.type;
    };
    DeviceInfo.prototype.setType = function (type) {
        this.type = type;
    };
    DeviceInfo.prototype.getDataSource = function () {
        return this.dataSource;
    };
    DeviceInfo.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
    };
    DeviceInfo.prototype.getPreprocessing = function () {
        return this.preprocessing;
    };
    DeviceInfo.prototype.setPreprocessing = function (preprocessing) {
        this.preprocessing = preprocessing;
    };
    DeviceInfo.prototype.setAlgorithm = function (algorithm) {
        this.preprocessing = algorithm;
    };
    DeviceInfo.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    DeviceInfo.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    DeviceInfo.prototype.getIoDeviceName = function () {
        return this.ioDeviceName;
    };
    DeviceInfo.prototype.setIoDeviceName = function (ioDeviceName) {
        this.ioDeviceName = ioDeviceName;
    };
    DeviceInfo.prototype.getDispalyName = function () {
        return this.displayName;
    };
    DeviceInfo.prototype.setDisplayName = function (displayName) {
        this.displayName = displayName;
    };
    return DeviceInfo;
}());


/***/ }),

/***/ "./src/app/publish/publish.component.css":
/*!***********************************************!*\
  !*** ./src/app/publish/publish.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleStyle {\r\n    text-align: center;\r\n    font-family: \"Segoe UI\", Helvetica, Arial, sans-serif;\r\n    font-size: 15px;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHVibGlzaC9wdWJsaXNoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIscURBQXFEO0lBQ3JELGVBQWU7RUFDakIiLCJmaWxlIjoic3JjL2FwcC9wdWJsaXNoL3B1Ymxpc2guY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZVN0eWxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlNlZ29lIFVJXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/publish/publish.component.html":
/*!************************************************!*\
  !*** ./src/app/publish/publish.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height: 100%;\" fxLayout=\"column\" fxLayout.xs=\"row\" fxLayoutAlign=\"center center\" fxLayoutGap=\"0px\"\n  fxLayoutGap.xs=\"0\">\n  <div style=\"width: 1000px;border:1px solid rgba(0,0,0,.09);\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n    <div style=\"height: 170px;\" fxFlex=\"50%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n      <h2 style=\"height: 50px;width: 100%;text-align:center\">Line Information:</h2>\n      <p style=\"height: 30px;width: 100%;text-align:center\">Plant Name:</p>\n      <p style=\"height: 30px;width: 100%;text-align:center\">Line Name:</p>\n      <p style=\"height: 30px;width: 100%;text-align:center\">Box Serial Number:</p>\n      <p style=\"height: 30px;width: 100%;text-align:center\">Publish Status:</p>\n    </div>\n    <div style=\"height: 170px;\" fxFlex=\"50%\" fxLayout=\"column\" fxLayoutAlign=\"start center\" fxLayoutGap=\"10px\">\n      <p style=\"height: 50px;\"></p>\n      <p style=\"height: 30px;text-align:center\">{{plantName}}</p>\n      <p style=\"height: 30px;text-align:center\">{{lineName}}</p>\n      <p style=\"height: 30px;text-align:center\">{{boxSerialNumber}}</p>\n      <p style=\"height: 30px;text-align:center\">{{publishStatus}}</p>\n    </div>\n  </div>\n\n</div>"

/***/ }),

/***/ "./src/app/publish/publish.component.ts":
/*!**********************************************!*\
  !*** ./src/app/publish/publish.component.ts ***!
  \**********************************************/
/*! exports provided: PublishComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublishComponent", function() { return PublishComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var classObj;
var PublishComponent = /** @class */ (function () {
    function PublishComponent(http) {
        this.http = http;
        // 保存从父组件传递过来的lineId
        this._lineId = "";
        this.plantName = "";
        this.lineName = "";
        this.boxSerialNumber = "";
        this.publishStatus = "Not Published";
        classObj = this;
    }
    Object.defineProperty(PublishComponent.prototype, "lineId", {
        // 父组件传递line id获得该line下的配置
        set: function (id) {
            this._lineId = id;
            if (id != "") {
                this.readPublishInfoById(this._lineId);
            }
        },
        enumerable: true,
        configurable: true
    });
    PublishComponent.prototype.ngOnInit = function () {
    };
    PublishComponent.prototype.readPublishInfoById = function (lineId) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_2__["config"].backendUrl + '/lines/' + lineId + '/publishCfg';
        return this.http.get(url, options)
            .subscribe(function (response) {
            if (response['_body'] != "") {
                var pros = response.json();
                if (typeof (pros) != "undefined" && pros != null) {
                    classObj.plantName = pros.plantName;
                    classObj.lineName = pros.lineName;
                    classObj.boxSerialNumber = pros.boxSerialNumber;
                }
            }
        }, function (err) {
        }, function () { return console.log('Call Complete'); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PublishComponent.prototype, "lineId", null);
    PublishComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-publish',
            template: __webpack_require__(/*! ./publish.component.html */ "./src/app/publish/publish.component.html"),
            styles: [__webpack_require__(/*! ./publish.component.css */ "./src/app/publish/publish.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], PublishComponent);
    return PublishComponent;
}());



/***/ }),

/***/ "./src/app/scanner/scanner.component.css":
/*!***********************************************!*\
  !*** ./src/app/scanner/scanner.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n  width:100%;\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n  text-align: center;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\n.button{\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  cursor: pointer;\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: transparent;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n  text-align: center;\r\n  margin: 0;\r\n  line-height: 36px;\r\n  border-radius: 2px;\r\n  -webkit-transform: translate3d(0,0,0);\r\n          transform: translate3d(0,0,0);\r\n  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n  background:rgb(224, 224,224);\r\n  width: 50px\r\n}\r\n\r\np {\r\n  margin-bottom: 2px;\r\n  margin-left: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2Nhbm5lci9zY2FubmVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFVO0VBQ1YsMEJBQTBCO0VBQzFCLDBCQUEwQjtFQUMxQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsd0JBQXdCO0VBQ3hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLFVBQVU7RUFDVix3Q0FBd0M7RUFDeEMscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsd0JBQXdCO0VBQ3hCLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixxQ0FBNkI7VUFBN0IsNkJBQTZCO0VBQzdCLDhGQUE4RjtFQUM5Riw0QkFBNEI7RUFDNUI7QUFDRjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9zY2FubmVyL3NjYW5uZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJsb2Nre1xyXG4gIHdpZHRoOjEwMCU7XHJcbiAgcGFkZGluZzogMTBweCAwcHggMTBweCAwcHg7XHJcbiAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wMyk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5oMiB7XHJcbiAgbWFyZ2luOjBweCAxLjI1cmVtO1xyXG4gIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uYnV0dG9ue1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG91dGxpbmU6IDA7XHJcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW46IDA7XHJcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwwLDApO1xyXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJveC1zaGFkb3cgMjgwbXMgY3ViaWMtYmV6aWVyKC40LDAsLjIsMSk7XHJcbiAgYmFja2dyb3VuZDpyZ2IoMjI0LCAyMjQsMjI0KTtcclxuICB3aWR0aDogNTBweFxyXG59XHJcblxyXG5wIHtcclxuICBtYXJnaW4tYm90dG9tOiAycHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/scanner/scanner.component.html":
/*!************************************************!*\
  !*** ./src/app/scanner/scanner.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n  <!--������-->\n  <div class=\"titleBlock\">\n    <h2 style=\"font-size: 15px\">I/O Device Properties</h2>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n      <div style=\"height: 70px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <p style=\"height: 30px;\">Name</p>\n        <p style=\"height: 30px;\">Alias</p>\n      </div>\n      <div style=\"height: 70px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"ioDeviceName\" (blur)=\"copyToAlias()\">\n        <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n        <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"displayName\">\n      </div>\n    \n      <!--间距调整-->\n      <div></div>\n    </div>\n  </div>\n  \n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Data source protocol selection:</p>\n    <select #mySelect style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onProtocolChange($event)\">\n      <option [value]=\"protocol.name\" *ngFor=\"let protocol of protocols;\">{{protocol.name}}</option>\n    </select>\n\n    <div style=\"height: 5px;width: 100%;\"></div>\n    <ng-template appDynamicProtocol ></ng-template>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Pre-processing Algorithm:</p>\n    <select #mySelectAlgo style=\"width:280px;height: 30px;margin-left: 10px\" (change)=\"onAlgoChange($event)\">\n      <option [value]=\"algo.name\" *ngFor=\"let algo of algorithms;\">{{algo.name}}</option>\n    </select>\n  </div>\n\n  <div style=\"width:100%;background: #F7F7F7;\">\n    <p style=\"font-family: 'Segoe UI', Helvetica, Arial, sans-serif;font-size:15px;font-weight: bold\">Mapping Table:</p>\n    <mat-checkbox  style=\"margin-left:10px;\" [(ngModel)]=\"mappingTableObj.enabled\" color=\"primary\">Enabled</mat-checkbox>\n    <div id=\"{{mapping.id}}\" *ngFor=\"let mapping of mappingTableObj.mappingTable;let i = index\" style=\"margin-left:10px;\">\n      <input type=\"text\" style=\"width:80px\" [(ngModel)]=\"mapping.key\">\n      <p style=\"display: inline;margin-right: 10px\">-></p>\n      <input type=\"text\" style=\"width:80px\" [(ngModel)]=\"mapping.value\">\n      <img src=\"assets/images/mapping_delete.png\" style=\"cursor:pointer\" (click)=\"deleteMapping($event.target.parentElement.id)\" title=\"Delete\"/>\n    </div>\n\n    <div style=\"margin-left:10px\">\n      <img src=\"assets/images/mapping_add.png\" style=\"cursor:pointer\" (click)=\"createNewMapping()\" title=\"Add\"/>\n    </div>\n  </div>\n\n  <div style=\"width: 100%;height:50px;background: #F7F7F7;width: 100%\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n    <button class=\"button\" (click)=\"saveInfo()\">Save</button>\n    <div></div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/scanner/scanner.component.ts":
/*!**********************************************!*\
  !*** ./src/app/scanner/scanner.component.ts ***!
  \**********************************************/
/*! exports provided: ScannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScannerComponent", function() { return ScannerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dynamicProtocol.service */ "./src/app/dynamicProtocol.service.ts");
/* harmony import */ var _io_io_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../io/io.component */ "./src/app/io/io.component.ts");
/* harmony import */ var _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dynamicProtocol.directive */ "./src/app/dynamicProtocol.directive.ts");
/* harmony import */ var _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../plc/plc.component */ "./src/app/plc/plc.component.ts");
/* harmony import */ var _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../opcua/opcua.component */ "./src/app/opcua/opcua.component.ts");
/* harmony import */ var _deviceOpration__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../deviceOpration */ "./src/app/deviceOpration.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var uuidv4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
var ScannerComponent = /** @class */ (function (_super) {
    __extends(ScannerComponent, _super);
    function ScannerComponent(componentFactoryResolver, dynamicProtocolService) {
        var _this = _super.call(this) || this;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.dynamicProtocolService = dynamicProtocolService;
        _this.selectedProtocol = "S7";
        _this.selectedAlgo = "Max";
        _this.operate = "new";
        _this.mappingTableObj = new MappingTableObj();
        _this.componentIns = {};
        _this.curAllDeviceIns = [];
        _this.oldKeyStr = new Map();
        _this.updateEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        return _this;
    }
    ScannerComponent.prototype.setSelectedProtocol = function (selectedProtocol) {
        this.selectedProtocol = selectedProtocol;
    };
    ScannerComponent.prototype.setSelectedAlgo = function (selectedAlgo) {
        this.selectedAlgo = selectedAlgo;
    };
    ScannerComponent.prototype.setOperate = function (operate) {
        this.operate = operate;
    };
    ScannerComponent.prototype.setNodecfg = function (nodecfg) {
        this.nodecfg = nodecfg;
    };
    ScannerComponent.prototype.setMappingTableObj = function (mappingTableObj) {
        this.mappingTableObj = mappingTableObj;
    };
    ScannerComponent.prototype.onProtocolChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getProtocols()[index].getName();
        this.selectedProtocol = this.getConvertNameMap().get(name);
        this.displayProtocolCpt(this.selectedProtocol, "new", "");
    };
    ScannerComponent.prototype.onAlgoChange = function (obj) {
        var index = obj.currentTarget.selectedIndex;
        var name = this.getAlgos()[index].getName();
        this.selectedAlgo = name;
    };
    ScannerComponent.prototype.displayProtocolCpt = function (componentName, operation, nodeCfg) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicProtocolService.getComponent(componentName));
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        var componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentIns = componentRef.instance;
        this.curAllDeviceIns = this.convertMapToArr(this.getAllDeviceIns());
        if (operation == 'new') {
            if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.updateAutoCompleteOpcua(this.componentIns);
            }
        }
        else if (operation == 'echo' || operation == 'copy') {
            if (typeof (nodeCfg) == 'undefined' || nodeCfg == null) {
                return;
            }
            var nodeObj = nodeCfg;
            this.oldKeyStr = this.getAllMappingKeys(this.mappingTableObj.mappingTable);
            if (this.componentIns instanceof _io_io_component__WEBPACK_IMPORTED_MODULE_2__["IoComponent"]) {
                this.selectedProtocol = "Digital I/O";
            }
            else if (this.componentIns instanceof _plc_plc_component__WEBPACK_IMPORTED_MODULE_4__["PlcComponent"]) {
                this.updateAutoCompletePlc(this.componentIns);
            }
            else if (this.componentIns instanceof _opcua_opcua_component__WEBPACK_IMPORTED_MODULE_5__["OpcuaComponent"]) {
                this.selectedProtocol = "OPC UA";
                this.updateAutoCompleteOpcua(this.componentIns);
            }
            this.componentIns.cfgComponentInfo(nodeObj);
        }
    };
    ScannerComponent.prototype.getAllMappingKeys = function (mappingTable) {
        var m = new Map();
        var arr;
        if (typeof (mappingTable) == "string") {
            arr = JSON.parse(mappingTable);
        }
        else {
            arr = mappingTable;
        }
        for (var i = 0; i < arr.length; i++) {
            var s = JSON.stringify(arr[i].key);
            m.set(s.substring(1, s.length - 1), 1);
        }
        return m;
    };
    ScannerComponent.prototype.convertMapToArr = function (allDeviceIns) {
        var tmpArr = [];
        allDeviceIns.forEach(function (value, key, map) {
            tmpArr.push(value);
        });
        return JSON.parse(JSON.stringify(tmpArr));
    };
    ScannerComponent.prototype.ngOnInit = function () {
        this.initProtocol();
        this.initAlgos();
        this.initNameMap();
        this.displayProtocolCpt(this.selectedProtocol, this.operate, this.nodecfg);
    };
    ScannerComponent.prototype.initProtocol = function () {
        var p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("S7");
        p.setNo(0);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("Digital I/O");
        p.setNo(1);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("OPC UA");
        p.setNo(2);
        this.getProtocols().push(p);
        p = new _deviceOpration__WEBPACK_IMPORTED_MODULE_6__["Ptl"]();
        p.setName("USB");
        p.setNo(3);
        this.getProtocols().push(p);
    };
    ScannerComponent.prototype.ngAfterViewInit = function () {
        for (var i = 0; i < this.getProtocols().length; i++) {
            if (this.getProtocols()[i].getName() == this.selectedProtocol) {
                this.mySelect.nativeElement.selectedIndex = this.getProtocols()[i].getNo();
                break;
            }
        }
        for (var i = 0; i < this.getAlgos().length; i++) {
            if (this.getAlgos()[i].getName() == this.selectedAlgo) {
                this.mySelectAlgo.nativeElement.selectedIndex = this.getAlgos()[i].getNo();
                break;
            }
        }
    };
    ScannerComponent.prototype.saveInfo = function () {
        var bi = new DeviceInfo();
        var ds = this.componentIns.saveComponentInfo();
        if (typeof (ds) == "undefined" || ds == null) {
            return;
        }
        bi.setIoDeviceId(this.getIoDeviceId());
        bi.setIoDeviceName(this.getIoDeviceName());
        bi.setDisplayName(this.getAlias());
        bi.setType(this.getType());
        var tmpDs = new DataSource();
        tmpDs.setProtocol(ds.protocol);
        tmpDs.setConfig(JSON.stringify(ds));
        bi.setDataSource(tmpDs);
        bi.setPreprocessing(this.selectedAlgo);
        var tmpMappings = this.mappingTableObj.mappingTable;
        for (var i = 0; i < tmpMappings.length; i++) {
            if (tmpMappings[i].key == "" || tmpMappings[i].value == "") {
                tmpMappings.splice(i, 1);
                i--;
            }
        }
        //let k = $.extend(true, {}, this.mappingTableObj);
        bi.setMappingTable(this.mappingTableObj);
        var flag = false;
        if (this.operate == "new" || this.operate == "copy") {
            flag = this.isMappingCfl(ds, tmpMappings);
        }
        else {
            for (var i = 0; i < this.mappingTableObj.mappingTable.length; i++) {
                if (typeof (this.oldKeyStr.get(this.mappingTableObj.mappingTable[i].key)) == "undefined") {
                    var tt = [];
                    tt.push(this.mappingTableObj.mappingTable[i]);
                    if (this.isMappingCfl(ds, tt)) {
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (flag) {
            alert("The Mapping Table has overlaped!");
        }
        else {
            //this.deviceCfgService.eventEmitDcs.emit(bi);
            this.updateEmitter.emit(bi);
        }
    };
    ScannerComponent.prototype.isMappingCfl = function (dataSource, mappingsTable) {
        var tmpMap = new Map();
        var tmpDataSourceStr = JSON.stringify(dataSource);
        for (var i = 0; i < this.curAllDeviceIns.length; i++) {
            var ins = this.curAllDeviceIns[i];
            var tmpDs = ins.dataSource.config;
            var tmpDsStr = void 0;
            if (typeof (tmpDs) != "string") {
                tmpDsStr = JSON.stringify(tmpDs);
            }
            else {
                tmpDsStr = tmpDs;
            }
            if (tmpDataSourceStr == tmpDsStr
                && ins.mappingTable != null) {
                var o = ins.mappingTable.mappingTable;
                var ar = void 0;
                if (typeof (o) == "string") {
                    ar = JSON.parse(o);
                }
                else {
                    ar = o;
                }
                for (var i_1 = 0; i_1 < ar.length; i_1++) {
                    tmpMap.set(ar[i_1].key, {});
                }
            }
        }
        for (var j = 0; j < mappingsTable.length; j++) {
            var tmpKey = mappingsTable[j].key;
            if (typeof (tmpMap.get(tmpKey)) != "undefined" && tmpKey) {
                return true;
            }
        }
        return false;
    };
    ScannerComponent.prototype.createNewMapping = function () {
        var id = uuidv4().replace(/\-/g, "");
        var mo = new MappingObject();
        mo.setId(id);
        this.mappingTableObj.mappingTable.push(mo);
    };
    ScannerComponent.prototype.deleteMapping = function (blockId) {
        for (var i = 0; i < this.mappingTableObj.mappingTable.length; i++) {
            var tmpId = this.mappingTableObj.mappingTable[i].id;
            if (blockId == tmpId) {
                this.mappingTableObj.mappingTable.splice(i, 1);
                break;
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelect'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ScannerComponent.prototype, "mySelect", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('mySelectAlgo'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], ScannerComponent.prototype, "mySelectAlgo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_3__["DynamicProtocolDirective"]),
        __metadata("design:type", _dynamicProtocol_directive__WEBPACK_IMPORTED_MODULE_3__["DynamicProtocolDirective"])
    ], ScannerComponent.prototype, "componentHost", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], ScannerComponent.prototype, "updateEmitter", void 0);
    ScannerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-scanner',
            template: __webpack_require__(/*! ./scanner.component.html */ "./src/app/scanner/scanner.component.html"),
            styles: [__webpack_require__(/*! ./scanner.component.css */ "./src/app/scanner/scanner.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _dynamicProtocol_service__WEBPACK_IMPORTED_MODULE_1__["DynamicProtocolService"]])
    ], ScannerComponent);
    return ScannerComponent;
}(_deviceOpration__WEBPACK_IMPORTED_MODULE_6__["DeviceOperation"]));

var DataSource = /** @class */ (function () {
    function DataSource() {
    }
    DataSource.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    DataSource.prototype.setConfig = function (config) {
        this.config = config;
    };
    return DataSource;
}());
var DeviceInfo = /** @class */ (function () {
    function DeviceInfo() {
        this.dataSource = new DataSource();
        this.mappingTable = new MappingTableObj();
    }
    DeviceInfo.prototype.getType = function () {
        return this.type;
    };
    DeviceInfo.prototype.setType = function (type) {
        this.type = type;
    };
    DeviceInfo.prototype.getDataSource = function () {
        return this.dataSource;
    };
    DeviceInfo.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
    };
    DeviceInfo.prototype.getPreprocessing = function () {
        return this.preprocessing;
    };
    DeviceInfo.prototype.setPreprocessing = function (preprocessing) {
        this.preprocessing = preprocessing;
    };
    DeviceInfo.prototype.setMappingTable = function (mappingTable) {
        this.mappingTable = mappingTable;
    };
    DeviceInfo.prototype.getIoDeviceId = function () {
        return this.ioDeviceId;
    };
    DeviceInfo.prototype.setIoDeviceId = function (ioDeviceId) {
        this.ioDeviceId = ioDeviceId;
    };
    DeviceInfo.prototype.getIoDeviceName = function () {
        return this.ioDeviceName;
    };
    DeviceInfo.prototype.setIoDeviceName = function (ioDeviceName) {
        this.ioDeviceName = ioDeviceName;
    };
    DeviceInfo.prototype.getDispalyName = function () {
        return this.displayName;
    };
    DeviceInfo.prototype.setDisplayName = function (displayName) {
        this.displayName = displayName;
    };
    return DeviceInfo;
}());
var MappingTableObj = /** @class */ (function () {
    function MappingTableObj() {
        this.mappingTable = new Array();
        this.enabled = false;
    }
    MappingTableObj.prototype.getMappingTable = function () {
        return this.mappingTable;
    };
    MappingTableObj.prototype.getEnabled = function () {
        return this.enabled;
    };
    MappingTableObj.prototype.setMappingTable = function (mappingTable) {
        this.mappingTable = mappingTable;
    };
    MappingTableObj.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
    };
    return MappingTableObj;
}());
var MappingObject = /** @class */ (function () {
    function MappingObject() {
        this.key = "";
        this.value = "";
    }
    MappingObject.prototype.setId = function (id) {
        this.id = id;
    };
    MappingObject.prototype.getId = function () {
        return this.id;
    };
    MappingObject.prototype.setKey = function (key) {
        this.key = key;
    };
    MappingObject.prototype.getKey = function () {
        return this.key;
    };
    MappingObject.prototype.setValue = function (value) {
        this.value = value;
    };
    MappingObject.prototype.getValue = function () {
        return this.value;
    };
    return MappingObject;
}());


/***/ }),

/***/ "./src/app/upload-dialog/upload-dialog.component.css":
/*!***********************************************************!*\
  !*** ./src/app/upload-dialog/upload-dialog.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table {\r\n  width: 100%;\r\n  max-width: 100%;\r\n  margin-bottom: 20px;\r\n}\r\n\r\na {\r\n  color: #888;\r\n  text-decoration: none;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXBsb2FkLWRpYWxvZy91cGxvYWQtZGlhbG9nLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsZUFBZTtFQUNmLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxxQkFBcUI7QUFDdkIiLCJmaWxlIjoic3JjL2FwcC91cGxvYWQtZGlhbG9nL3VwbG9hZC1kaWFsb2cuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbmEge1xyXG4gIGNvbG9yOiAjODg4O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/upload-dialog/upload-dialog.component.html":
/*!************************************************************!*\
  !*** ./src/app/upload-dialog/upload-dialog.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Import Message Type</h2>\r\n\r\n<mat-dialog-content>\r\n  <img class=\"icon\" [src]=\"importIcon\" (click)=\"importFile()\" title=\"Import Message\"/>\r\n  <input #uploadEl id=\"fileUpload\" style=\"width:30px;display:none\" type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple />\r\n\r\n  <table class=\"table\">\r\n    <thead>\r\n    <tr style=\"background: rgb(224, 224,224)\">\r\n        <th width=\"70%\">Name</th>\r\n        <th width=\"30%\">Operation</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr style=\"background: rgb(241, 241, 241)\" *ngFor=\"let item of uploader.queue\">\r\n        <td style=\"text-align: center\" ><strong>{{ item?.file?.name }}</strong></td>\r\n        <td nowrap style=\"text-align: center\">\r\n          <img class=\"icon\" [src]=\"deleteIcon\" (click)=\"item.remove()\" title=\"Delete\"/>\r\n        </td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n</mat-dialog-content>\r\n\r\n<mat-dialog-actions>\r\n  <button mat-raised-button style=\"background:rgb(224, 224,224)\" (click)=\"uploadFile()\">Upload all</button>\r\n  <button mat-raised-button style=\"background:rgb(224, 224,224)\" mat-dialog-close (click)=\"saveInfo()\">Close</button>\r\n</mat-dialog-actions>\r\n"

/***/ }),

/***/ "./src/app/upload-dialog/upload-dialog.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/upload-dialog/upload-dialog.component.ts ***!
  \**********************************************************/
/*! exports provided: UploadDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadDialogComponent", function() { return UploadDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../configuration */ "./src/app/configuration.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UploadDialogComponent = /** @class */ (function () {
    function UploadDialogComponent(http, dialogRef) {
        this.http = http;
        this.dialogRef = dialogRef;
        // itemAlias需和Java后台参数名一致
        this.uploader = new ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileUploader"]({
            url: _configuration__WEBPACK_IMPORTED_MODULE_4__["config"].backendUrl + "/messagetype/uploadFile",
            method: "POST",
            itemAlias: "file",
            autoUpload: false
        });
        this.importIcon = _configuration__WEBPACK_IMPORTED_MODULE_4__["config"].iconPosition + "import.png";
        this.deleteIcon = _configuration__WEBPACK_IMPORTED_MODULE_4__["config"].iconPosition + "delete.png";
    }
    UploadDialogComponent.prototype.ngOnInit = function () {
        this.uploader.onCompleteAll = function () {
            alert("Upload success!");
        };
    };
    UploadDialogComponent.prototype.readAllMsType = function () {
        var _this = this;
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/json' });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["RequestOptions"]({ headers: headers });
        var url = _configuration__WEBPACK_IMPORTED_MODULE_4__["config"].backendUrl + '/messagetypes/';
        return this.http.get(url, options)
            .subscribe(function (response) {
            _this.messages = response.json();
        }, function (err) {
        }, function () {
            _this.dialogRef.close((_this.messages));
        });
    };
    UploadDialogComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // 解决两次提交同一文件时，提交不成功的问题
        this.uploader.onAfterAddingFile = (function (item) {
            _this.uploadElRef.nativeElement.value = '';
        });
    };
    UploadDialogComponent.prototype.uploadFile = function () {
        this.uploader.uploadAll();
    };
    UploadDialogComponent.prototype.importFile = function () {
        $("#fileUpload").click();
    };
    UploadDialogComponent.prototype.saveInfo = function () {
        this.readAllMsType();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('uploadEl'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], UploadDialogComponent.prototype, "uploadElRef", void 0);
    UploadDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-upload-dialog',
            template: __webpack_require__(/*! ./upload-dialog.component.html */ "./src/app/upload-dialog/upload-dialog.component.html"),
            styles: [__webpack_require__(/*! ./upload-dialog.component.css */ "./src/app/upload-dialog/upload-dialog.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"]])
    ], UploadDialogComponent);
    return UploadDialogComponent;
}());



/***/ }),

/***/ "./src/app/usb/usb.component.css":
/*!***************************************!*\
  !*** ./src/app/usb/usb.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".titleBlock{\r\n  width:100%;\r\n  padding: 10px 0px 10px 0px;\r\n  background:rgba(0,0,0,.03);\r\n  text-align: center;\r\n}\r\n\r\nh2 {\r\n  margin:0px 1.25rem;\r\n  padding: 0px 0px 0px 0px;\r\n  font-size: 15px;\r\n  font-weight: bold;\r\n  color: black;\r\n}\r\n\r\n.button{\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n  cursor: pointer;\r\n  outline: 0;\r\n  -webkit-tap-highlight-color: transparent;\r\n  display: inline-block;\r\n  white-space: nowrap;\r\n  text-decoration: none;\r\n  vertical-align: baseline;\r\n  text-align: center;\r\n  margin: 0;\r\n  line-height: 36px;\r\n  border-radius: 2px;\r\n  -webkit-transform: translate3d(0,0,0);\r\n          transform: translate3d(0,0,0);\r\n  transition: background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);\r\n  background:rgb(224, 224,224);\r\n  width: 50px\r\n}\r\n\r\np{\r\n  margin-left: 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNiL3VzYi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVTtFQUNWLDBCQUEwQjtFQUMxQiwwQkFBMEI7RUFDMUIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHdCQUF3QjtFQUN4QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHNCQUFzQjtFQUN0QixxQkFBcUI7RUFDckIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixVQUFVO0VBQ1Ysd0NBQXdDO0VBQ3hDLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIsU0FBUztFQUNULGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3Qiw4RkFBOEY7RUFDOUYsNEJBQTRCO0VBQzVCO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC91c2IvdXNiLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGl0bGVCbG9ja3tcclxuICB3aWR0aDoxMDAlO1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4IDEwcHggMHB4O1xyXG4gIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDMpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuaDIge1xyXG4gIG1hcmdpbjowcHggMS4yNXJlbTtcclxuICBwYWRkaW5nOiAwcHggMHB4IDBweCAwcHg7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmJ1dHRvbntcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xyXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gIHVzZXItc2VsZWN0OiBub25lO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBvdXRsaW5lOiAwO1xyXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAzNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsMCwwKTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIC40cyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3gtc2hhZG93IDI4MG1zIGN1YmljLWJlemllciguNCwwLC4yLDEpO1xyXG4gIGJhY2tncm91bmQ6cmdiKDIyNCwgMjI0LDIyNCk7XHJcbiAgd2lkdGg6IDUwcHhcclxufVxyXG5cclxucHtcclxuICBtYXJnaW4tbGVmdDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/usb/usb.component.html":
/*!****************************************!*\
  !*** ./src/app/usb/usb.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"rightPanel\" fxLayout=\"column\" fxLayoutAlign=\"start start\"\n      fxLayoutGap=\"5px\">\n\n<!--封装第二行-->\n<div fxFlexAlign=\"stretch\" fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"end start\" fxLayoutGap=\"10px\">\n  <div style=\"height: 130px;\" fxFlex=\"40%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<p style=\"height: 30px;\">Name</p>-->\n    <!--<p style=\"height: 30px;\">Alias</p>-->\n    <p style=\"height: 30px;\">Port</p>\n    <p style=\"height: 30px;\">Cycle</p>\n    <p style=\"height: 30px;\">DataType</p>\n  </div>\n  <div style=\"height: 130px;\" fxFlex=\"60%\" fxLayout=\"column\" fxLayoutAlign=\"start start\" fxLayoutGap=\"10px\">\n    <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"name\" (blur)=\"copyToAlias()\">-->\n    <!--<input style=\"width:100%;height: 30px;\" [(ngModel)]=\"alias\">-->\n    <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"protocol\" disabled=\"disabled\">-->\n    <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"ip\">-->\n    <input style=\"width:100%;height: 30px;\" [(ngModel)]=\"port\">\n    <!--<input style=\"width:100%;height: 30px;\" type=\"text\" [(ngModel)]=\"address\">-->\n    <select [ngModel]=\"selectedCycle\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onCycleChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of cycles; let j = index\">{{item}}</option>\n    </select>\n    <select [ngModel]=\"selectedDataType\" style=\"width:100%;height: 30px;\" (ngModelChange)=\"onDataTypeChange($event)\">\n      <option [value]=\"item\" *ngFor=\"let item of dataTypes; let j = index\">{{item}}</option>\n    </select>\n  </div>\n\n  <!--间距调整-->\n  <div></div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/usb/usb.component.ts":
/*!**************************************!*\
  !*** ./src/app/usb/usb.component.ts ***!
  \**************************************/
/*! exports provided: UsbComponent, UsbInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsbComponent", function() { return UsbComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsbInfo", function() { return UsbInfo; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UsbComponent = /** @class */ (function () {
    function UsbComponent() {
        //private name: string="";
        this.port = "";
        //private alias: string="";
        this.cycles = new Array();
        this.dataTypes = new Array();
        this.selectedCycle = "5s";
        this.selectedDataType = "STRING";
        this.cycles.push("10ms");
        this.cycles.push("100ms");
        this.cycles.push("500ms");
        this.cycles.push("1s");
        this.cycles.push("5s");
        this.cycles.push("10s");
        this.cycles.push("15s");
        this.cycles.push("30s");
        this.cycles.push("1m");
        this.dataTypes.push("BOOLEAN");
        this.dataTypes.push("INT");
        this.dataTypes.push("LONG");
        this.dataTypes.push("DOUBLE");
        this.dataTypes.push("STRING");
    }
    UsbComponent.prototype.ngOnInit = function () {
    };
    UsbComponent.prototype.ngAfterViewInit = function () {
        $("input.mat-input-element").css("border", "");
    };
    UsbComponent.prototype.onCycleChange = function (newVal) {
        this.selectedCycle = newVal;
    };
    UsbComponent.prototype.onDataTypeChange = function (newVal) {
        this.selectedDataType = newVal;
    };
    //setName(name: string){
    ///  this.name = name;
    //}
    ///setAlias(alias){
    //  this.alias = alias;
    //}
    UsbComponent.prototype.setPort = function (port) {
        this.port = port;
    };
    UsbComponent.prototype.setSelectedCycle = function (cycle) {
        this.selectedCycle = cycle;
    };
    UsbComponent.prototype.setSelectedDataType = function (dataType) {
        this.selectedDataType = dataType;
    };
    UsbComponent.prototype.cfgComponentInfo = function (nodeObj) {
        //this.setName(nodeObj.name);
        //this.setAlias(nodeObj.alias);
        var cfg;
        if (typeof (nodeObj.config) == "string") {
            cfg = JSON.parse(nodeObj.config);
        }
        else {
            cfg = nodeObj.config;
        }
        this.setPort(cfg.port);
        this.setSelectedCycle(cfg.cycle);
        this.setSelectedDataType(cfg.dataType);
    };
    //copyToAlias(){
    // if(this.name != ""){
    //   this.alias = this.name;
    //  }
    //}
    UsbComponent.prototype.saveComponentInfo = function () {
        if (this.judgeInputNull(this.port.trim())) {
            alert("All properties need to be filled!");
            return;
        }
        else {
            var ui = new UsbInfo();
            ui.setProtocol("USB");
            //ui.setName(this.name.trim());
            //ui.setAlias(this.alias.trim());
            ui.setPort(this.port.trim());
            if (this.selectedCycle != null && this.selectedCycle != "") {
                ui.setCycle(this.selectedCycle);
            }
            if (this.selectedDataType != null && this.selectedDataType != "") {
                ui.setDataType(this.selectedDataType);
            }
            return ui;
        }
    };
    UsbComponent.prototype.judgeInputNull = function (input) {
        if (typeof (input) == undefined || input == null || input.trim() == "") {
            return true;
        }
        else {
            return false;
        }
    };
    UsbComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usb',
            template: __webpack_require__(/*! ./usb.component.html */ "./src/app/usb/usb.component.html"),
            styles: [__webpack_require__(/*! ./usb.component.css */ "./src/app/usb/usb.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], UsbComponent);
    return UsbComponent;
}());

var UsbInfo = /** @class */ (function () {
    function UsbInfo() {
        //this.name="";
        //this.alias="";
        this.port = "";
        this.cycle = "5s";
        this.dataType = "STRING";
    }
    //setName(name:string){
    //  this.name = name;
    //}
    //getName(): string{
    //  return this.name;
    //}
    //setAlias(alias){
    // this.alias=alias;
    //}
    //getAlias(){
    //  return this.alias;
    //}
    UsbInfo.prototype.setPort = function (port) {
        this.port = port;
    };
    UsbInfo.prototype.getPort = function () {
        return this.port;
    };
    UsbInfo.prototype.setCycle = function (cycle) {
        this.cycle = cycle;
    };
    UsbInfo.prototype.getCycle = function () {
        return this.cycle;
    };
    UsbInfo.prototype.setDataType = function (dataType) {
        this.dataType = dataType;
    };
    UsbInfo.prototype.getDataType = function () {
        return this.dataType;
    };
    UsbInfo.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
    };
    UsbInfo.prototype.getProtocol = function () {
        return this.protocol;
    };
    return UsbInfo;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\angular_pro\daac-configuration-tool-v2\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map