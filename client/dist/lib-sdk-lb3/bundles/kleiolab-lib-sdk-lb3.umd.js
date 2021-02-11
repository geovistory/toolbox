(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@kleiolab/lib-sdk-lb3/src/lib/sdk')) :
	typeof define === 'function' && define.amd ? define('@kleiolab/lib-sdk-lb3', ['exports', '@kleiolab/lib-sdk-lb3/src/lib/sdk'], factory) :
	(global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-sdk-lb3'] = {}), global.sdk));
}(this, (function (exports, sdk) { 'use strict';

	/*
	 * Public API Surface of lib-sdk-lb3
	 */

	/**
	 * Generated bundle index. Do not edit.
	 */

	Object.keys(sdk).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return sdk[k];
			}
		});
	});

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-sdk-lb3.umd.js.map
