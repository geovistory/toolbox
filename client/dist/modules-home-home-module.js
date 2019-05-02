(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-home-home-module"],{

/***/ "./src/app/modules/home/home-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/home/home-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _pages_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/home.component */ "./src/app/modules/home/pages/home.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _pages_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    }
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/home/home.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/home/home.module.ts ***!
  \*********************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/navbar/navbar.module */ "./src/app/shared/components/navbar/navbar.module.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/modules/home/home-routing.module.ts");
/* harmony import */ var _pages_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/home.component */ "./src/app/modules/home/pages/home.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_2__["NavbarModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_3__["HomeRoutingModule"],
            ],
            declarations: [
                _pages_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"]
            ]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/modules/home/pages/home.component.html":
/*!********************************************************!*\
  !*** ./src/app/modules/home/pages/home.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<gv-navbar>\n  <ol class=\"breadcrumb\">\n    <li class=\"breadcrumb-item\">\n      <i class=\"fa fa-home\"></i> Home</li>\n  </ol>\n</gv-navbar>\n\n<div *ngIf=\"!account\" class=\"container mt-5\">\n  <div class=\"row\">\n    <div class=\"col text-center\">\n      <h1>Geovistory Toolbox</h1>\n    </div>\n  </div>\n  <div class=\"row mt-5\">\n    <div class=\"col text-center\">\n      <p>\n        Store, visualize and share historical and geographical data.\n      </p>\n    </div>\n  </div>\n  <div class=\"row mt-5\">\n    <div class=\"col text-center\">\n      <a class=\"btn btn-primary mr-2\" routerLink=\"/login\">Login</a>\n      <a class=\"btn btn-link\" routerLink=\"/registration\">Register</a>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"account\" class=\"container mt-5\">\n  <div id=\"userDashboard\" class=\"container mt-5\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-3\">\n        <i id=\"userImage\" class=\"d-none d-sm-none d-md-block fa fa-user-circle pull-right\" aria-hidden=\"true\"></i>\n      </div>\n      <div class=\"col-md-9\">\n        <h2>Welcome to Geovistory Toolbox {{account.username}}</h2>\n        <p class=\"text-muted\">{{account.email}}</p>\n      </div>\n    </div>\n    <div class=\"row mt-5 justify-content-center\">\n      <div class=\"col-md-6\">\n        <a class=\"btn btn-outline-primary mr-2\" routerLink=\"/projects\">Your Projects</a>\n        <a class=\"btn btn-outline-secondary\" routerLink=\"/account\">Personal Settings</a>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/modules/home/pages/home.component.scss":
/*!********************************************************!*\
  !*** ./src/app/modules/home/pages/home.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvaG9tZS9wYWdlcy9ob21lLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/home/pages/home.component.ts":
/*!******************************************************!*\
  !*** ./src/app/modules/home/pages/home.component.ts ***!
  \******************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var app_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core */ "./src/app/core/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(activeAccountService) {
        this.activeAccountService = activeAccountService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeAccountService.getAccount().subscribe(function (account) {
            _this.account = account;
        });
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'gv-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/modules/home/pages/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/modules/home/pages/home.component.scss")]
        }),
        __metadata("design:paramtypes", [app_core__WEBPACK_IMPORTED_MODULE_1__["ActiveAccountService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ })

}]);
//# sourceMappingURL=modules-home-home-module.js.map