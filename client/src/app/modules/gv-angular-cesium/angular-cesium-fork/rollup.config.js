import angular from 'rollup-plugin-angular';

export default {
  entry: 'index.js',
  dest: 'bundles/angular-cesium.umd.js',
  sourceMap: true,
  format: 'umd',
  exports: 'named',
  onwarn: function (warning) {},
  moduleName: 'angularCesium',
  plugins: [
    angular(),
  ],
  globals: {
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/observable/ConnectableObservable': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observabl',
    'rxjs/add/observable/from': 'Rx.Observable',
    'rxjs/add/observable/merge': 'Rx.Observable',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/takeUntil': 'Rx.Observable.prototype',
    'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/delay': 'Rx.Observable.prototype',
    'rxjs/add/operator/publish': 'Rx.Observable.prototype',
    'rxjs/add/operator/merge': 'Rx.Observable.prototype',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'angular2parse': 'ng.parse',
    'json-string-mapper': 'jsonStringMapper',
    'geodesy': 'geodesy',
    'primitive-primitives': 'primitive_primitives',
  }
}
