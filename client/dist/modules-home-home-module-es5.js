function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-home-home-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home/pages/home.component.html":
  /*!**********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home/pages/home.component.html ***!
    \**********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppModulesHomePagesHomeComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<gv-navbar>\n  <ol class=\"breadcrumb\">\n    <li class=\"breadcrumb-item\">\n      <i class=\"fa fa-home\"></i> Home</li>\n  </ol>\n</gv-navbar>\n\n<div *ngIf=\"!(account)\" class=\"container mt-5\">\n  <div class=\"row\">\n    <div class=\"col text-center\">\n      <h1>\n        <div class=\"gv-icon gv-icon-geovistory-logo text-primary\"></div>\n        Geovistory Toolbox\n      </h1>\n    </div>\n  </div>\n  <div class=\"row mt-5\">\n    <div class=\"col text-center\">\n      <p>\n        Store, visualize and share historical and geographical data.\n      </p>\n    </div>\n  </div>\n  <div class=\"row mt-5\">\n    <div class=\"col text-center\">\n      <a class=\"btn btn-primary mr-2\" routerLink=\"/login\">Login</a>\n      <a class=\"btn btn-link\" routerLink=\"/registration\">Register</a>\n    </div>\n  </div>\n  <div class=\"row powered-by\">\n    <div class=\"col text-center mat-text-secondary\">\n      <ng-container *ngTemplateOutlet=\"poweredBy\"></ng-container>\n    </div>\n  </div>\n</div>\n\n<div *ngIf=\"account\" class=\"container mt-5\">\n  <div id=\"userDashboard\" class=\"container mt-5\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-3\">\n        <i id=\"userImage\" class=\"d-none d-sm-none d-md-block fa fa-user-circle pull-right\" aria-hidden=\"true\"></i>\n      </div>\n      <div class=\"col-md-9\">\n        <h2>Welcome to Geovistory Toolbox {{account.username}}</h2>\n        <p class=\"text-muted\">{{account.email}}</p>\n      </div>\n    </div>\n    <div class=\"row mt-5 justify-content-center\">\n      <div class=\"col-md-6\">\n        <a class=\"btn btn-outline-primary mr-2\" routerLink=\"/projects\">Your Projects</a>\n        <a class=\"btn btn-outline-secondary\" routerLink=\"/account\">Personal Settings</a>\n      </div>\n    </div>\n    <div class=\"row powered-by justify-content-center\">\n      <div class=\"col-md-6 mat-text-secondary\">\n        <ng-container *ngTemplateOutlet=\"poweredBy\"></ng-container>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #poweredBy>\n  Powered by <a href=\"https://kleiolab.ch\" title=\"KleioLab GmbH – Company website\" target=\"_blank\">KleioLab</a>\n</ng-template>\n";
    /***/
  },

  /***/
  "./src/app/modules/home/home-routing.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/modules/home/home-routing.module.ts ***!
    \*****************************************************/

  /*! exports provided: HomeRoutingModule */

  /***/
  function srcAppModulesHomeHomeRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function () {
      return HomeRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _pages_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./pages/home.component */
    "./src/app/modules/home/pages/home.component.ts");

    var routes = [{
      path: '',
      component: _pages_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"]
    }];

    var HomeRoutingModule = function HomeRoutingModule() {
      _classCallCheck(this, HomeRoutingModule);
    };

    HomeRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], HomeRoutingModule);
    /***/
  },

  /***/
  "./src/app/modules/home/home.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/modules/home/home.module.ts ***!
    \*********************************************/

  /*! exports provided: HomeModule */

  /***/
  function srcAppModulesHomeHomeModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeModule", function () {
      return HomeModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../shared/components/navbar/navbar.module */
    "./src/app/shared/components/navbar/navbar.module.ts");
    /* harmony import */


    var _home_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./home-routing.module */
    "./src/app/modules/home/home-routing.module.ts");
    /* harmony import */


    var _pages_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./pages/home.component */
    "./src/app/modules/home/pages/home.component.ts");

    var HomeModule = function HomeModule() {
      _classCallCheck(this, HomeModule);
    };

    HomeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _shared_components_navbar_navbar_module__WEBPACK_IMPORTED_MODULE_3__["NavbarModule"], _home_routing_module__WEBPACK_IMPORTED_MODULE_4__["HomeRoutingModule"]],
      declarations: [_pages_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"]]
    })], HomeModule);
    /***/
  },

  /***/
  "./src/app/modules/home/pages/home.component.scss":
  /*!********************************************************!*\
    !*** ./src/app/modules/home/pages/home.component.scss ***!
    \********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppModulesHomePagesHomeComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".gv-icon.gv-icon-geovistory-logo {\n  font-size: 6rem;\n  margin-bottom: 2rem; }\n\n.powered-by {\n  margin-top: 10rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hZG1pbi9Db2RlL2dlb3Zpc3RvcnkvY2xpZW50L3NyYy9hcHAvbW9kdWxlcy9ob21lL3BhZ2VzL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsbUJBQW1CLEVBQUE7O0FBRXJCO0VBQ0UsaUJBQWlCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL2hvbWUvcGFnZXMvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ndi1pY29uLmd2LWljb24tZ2VvdmlzdG9yeS1sb2dvIHtcbiAgZm9udC1zaXplOiA2cmVtO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuLnBvd2VyZWQtYnkge1xuICBtYXJnaW4tdG9wOiAxMHJlbTtcbn1cbiJdfQ== */";
    /***/
  },

  /***/
  "./src/app/modules/home/pages/home.component.ts":
  /*!******************************************************!*\
    !*** ./src/app/modules/home/pages/home.component.ts ***!
    \******************************************************/

  /*! exports provided: HomeComponent */

  /***/
  function srcAppModulesHomePagesHomeComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomeComponent", function () {
      return HomeComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var app_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! app/core */
    "./src/app/core/index.ts");

    var HomeComponent =
    /*#__PURE__*/
    function () {
      function HomeComponent(activeAccountService) {
        _classCallCheck(this, HomeComponent);

        this.activeAccountService = activeAccountService;
      }

      _createClass(HomeComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          this.activeAccountService.getAccount().subscribe(function (account) {
            _this.account = account;
          });
        }
      }]);

      return HomeComponent;
    }();

    HomeComponent.ctorParameters = function () {
      return [{
        type: app_core__WEBPACK_IMPORTED_MODULE_2__["ActiveAccountService"]
      }];
    };

    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'gv-home',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./home.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home/pages/home.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./home.component.scss */
      "./src/app/modules/home/pages/home.component.scss")).default]
    })], HomeComponent);
    /***/
  }
}]);
//# sourceMappingURL=modules-home-home-module-es5.js.map