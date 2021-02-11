(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@kleiolab/lib-sdk-lb4/src/lib/sdk-lb4')) :
	typeof define === 'function' && define.amd ? define('@kleiolab/lib-sdk-lb4', ['exports', '@kleiolab/lib-sdk-lb4/src/lib/sdk-lb4'], factory) :
	(global = global || self, factory((global.kleiolab = global.kleiolab || {}, global.kleiolab['lib-sdk-lb4'] = {}), global.sdkLb4));
}(this, (function (exports, sdkLb4) { 'use strict';

	/**
	 * @fileoverview added by tsickle
	 * Generated from: public-api.ts
	 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
	 */

	/**
	 * @fileoverview added by tsickle
	 * Generated from: kleiolab-lib-sdk-lb4.ts
	 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
	 */

	Object.defineProperty(exports, 'APIS', {
		enumerable: true,
		get: function () {
			return sdkLb4.APIS;
		}
	});
	Object.defineProperty(exports, 'AccountService', {
		enumerable: true,
		get: function () {
			return sdkLb4.AccountService;
		}
	});
	Object.defineProperty(exports, 'AnalysisService', {
		enumerable: true,
		get: function () {
			return sdkLb4.AnalysisService;
		}
	});
	Object.defineProperty(exports, 'AnalysisTableExportRequest', {
		enumerable: true,
		get: function () {
			return sdkLb4.AnalysisTableExportRequest;
		}
	});
	Object.defineProperty(exports, 'ApiModule', {
		enumerable: true,
		get: function () {
			return sdkLb4.ApiModule;
		}
	});
	Object.defineProperty(exports, 'BASE_PATH', {
		enumerable: true,
		get: function () {
			return sdkLb4.BASE_PATH;
		}
	});
	Object.defineProperty(exports, 'COLLECTION_FORMATS', {
		enumerable: true,
		get: function () {
			return sdkLb4.COLLECTION_FORMATS;
		}
	});
	Object.defineProperty(exports, 'ColDef', {
		enumerable: true,
		get: function () {
			return sdkLb4.ColDef;
		}
	});
	Object.defineProperty(exports, 'Configuration', {
		enumerable: true,
		get: function () {
			return sdkLb4.Configuration;
		}
	});
	Object.defineProperty(exports, 'ContentTreeService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ContentTreeService;
		}
	});
	Object.defineProperty(exports, 'DatChunkControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DatChunkControllerService;
		}
	});
	Object.defineProperty(exports, 'DatChunkService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DatChunkService;
		}
	});
	Object.defineProperty(exports, 'DatColumnService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DatColumnService;
		}
	});
	Object.defineProperty(exports, 'DatDigitalService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DatDigitalService;
		}
	});
	Object.defineProperty(exports, 'DatNamespaceService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DatNamespaceService;
		}
	});
	Object.defineProperty(exports, 'DfhClassControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DfhClassControllerService;
		}
	});
	Object.defineProperty(exports, 'DfhLabelService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DfhLabelService;
		}
	});
	Object.defineProperty(exports, 'DfhProfileService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DfhProfileService;
		}
	});
	Object.defineProperty(exports, 'DfhPropertyControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.DfhPropertyControllerService;
		}
	});
	Object.defineProperty(exports, 'FactoidControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.FactoidControllerService;
		}
	});
	Object.defineProperty(exports, 'GetTablePageOptions', {
		enumerable: true,
		get: function () {
			return sdkLb4.GetTablePageOptions;
		}
	});
	Object.defineProperty(exports, 'ImportTableControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ImportTableControllerService;
		}
	});
	Object.defineProperty(exports, 'InfLanguageService', {
		enumerable: true,
		get: function () {
			return sdkLb4.InfLanguageService;
		}
	});
	Object.defineProperty(exports, 'InfPersistentItemService', {
		enumerable: true,
		get: function () {
			return sdkLb4.InfPersistentItemService;
		}
	});
	Object.defineProperty(exports, 'InfPlaceService', {
		enumerable: true,
		get: function () {
			return sdkLb4.InfPlaceService;
		}
	});
	Object.defineProperty(exports, 'InfStatementService', {
		enumerable: true,
		get: function () {
			return sdkLb4.InfStatementService;
		}
	});
	Object.defineProperty(exports, 'InfTemporalEntityService', {
		enumerable: true,
		get: function () {
			return sdkLb4.InfTemporalEntityService;
		}
	});
	Object.defineProperty(exports, 'InfTextPropertyService', {
		enumerable: true,
		get: function () {
			return sdkLb4.InfTextPropertyService;
		}
	});
	Object.defineProperty(exports, 'PaginatedStatementsControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.PaginatedStatementsControllerService;
		}
	});
	Object.defineProperty(exports, 'PingControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.PingControllerService;
		}
	});
	Object.defineProperty(exports, 'ProClassFieldConfigService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProClassFieldConfigService;
		}
	});
	Object.defineProperty(exports, 'ProDfhClassProjRelService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProDfhClassProjRelService;
		}
	});
	Object.defineProperty(exports, 'ProDfhProfileProjRelService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProDfhProfileProjRelService;
		}
	});
	Object.defineProperty(exports, 'ProInfoProjRelService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProInfoProjRelService;
		}
	});
	Object.defineProperty(exports, 'ProProjectService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProProjectService;
		}
	});
	Object.defineProperty(exports, 'ProTextPropertyService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProTextPropertyService;
		}
	});
	Object.defineProperty(exports, 'ProjectConfigurationService', {
		enumerable: true,
		get: function () {
			return sdkLb4.ProjectConfigurationService;
		}
	});
	Object.defineProperty(exports, 'PubAccountService', {
		enumerable: true,
		get: function () {
			return sdkLb4.PubAccountService;
		}
	});
	Object.defineProperty(exports, 'QueryFilterData', {
		enumerable: true,
		get: function () {
			return sdkLb4.QueryFilterData;
		}
	});
	Object.defineProperty(exports, 'QueryPathSegment', {
		enumerable: true,
		get: function () {
			return sdkLb4.QueryPathSegment;
		}
	});
	Object.defineProperty(exports, 'RamListService', {
		enumerable: true,
		get: function () {
			return sdkLb4.RamListService;
		}
	});
	Object.defineProperty(exports, 'SchemaObjectService', {
		enumerable: true,
		get: function () {
			return sdkLb4.SchemaObjectService;
		}
	});
	Object.defineProperty(exports, 'SysClassFieldService', {
		enumerable: true,
		get: function () {
			return sdkLb4.SysClassFieldService;
		}
	});
	Object.defineProperty(exports, 'SysClassHasTypePropertyService', {
		enumerable: true,
		get: function () {
			return sdkLb4.SysClassHasTypePropertyService;
		}
	});
	Object.defineProperty(exports, 'SysConfigValueObjectType', {
		enumerable: true,
		get: function () {
			return sdkLb4.SysConfigValueObjectType;
		}
	});
	Object.defineProperty(exports, 'SysSystemRelevantClassService', {
		enumerable: true,
		get: function () {
			return sdkLb4.SysSystemRelevantClassService;
		}
	});
	Object.defineProperty(exports, 'SysSystemTypeService', {
		enumerable: true,
		get: function () {
			return sdkLb4.SysSystemTypeService;
		}
	});
	Object.defineProperty(exports, 'SystemConfigurationService', {
		enumerable: true,
		get: function () {
			return sdkLb4.SystemConfigurationService;
		}
	});
	Object.defineProperty(exports, 'TColFilterNum', {
		enumerable: true,
		get: function () {
			return sdkLb4.TColFilterNum;
		}
	});
	Object.defineProperty(exports, 'TColFilterTxt', {
		enumerable: true,
		get: function () {
			return sdkLb4.TColFilterTxt;
		}
	});
	Object.defineProperty(exports, 'TableService', {
		enumerable: true,
		get: function () {
			return sdkLb4.TableService;
		}
	});
	Object.defineProperty(exports, 'TimePrimitiveWithCal', {
		enumerable: true,
		get: function () {
			return sdkLb4.TimePrimitiveWithCal;
		}
	});
	Object.defineProperty(exports, 'WarEntityPreviewControllerService', {
		enumerable: true,
		get: function () {
			return sdkLb4.WarEntityPreviewControllerService;
		}
	});
	Object.defineProperty(exports, 'WarStatementGeoJson', {
		enumerable: true,
		get: function () {
			return sdkLb4.WarStatementGeoJson;
		}
	});
	Object.defineProperty(exports, 'WarStatementTimePrimitiveVT', {
		enumerable: true,
		get: function () {
			return sdkLb4.WarStatementTimePrimitiveVT;
		}
	});

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kleiolab-lib-sdk-lb4.umd.js.map
