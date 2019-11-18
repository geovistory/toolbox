"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains configuration of keys used in the the system-schema
 * that are relevant for the app logic.
 *
 * Example: the ui-context keys are used to query the order of properties in different contexts
 */
class SysConfig {
}
exports.SysConfig = SysConfig;
/***********************
 * Ui Contexts
************************/
// Toolbox-wide context
SysConfig.PK_UI_CONTEXT_ADD = 47;
// Entities context
SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE = 45;
SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE = 46;
// Sources context
SysConfig.PK_UI_CONTEXT_SOURCES_EDITABLE = 210;
SysConfig.PK_UI_CONTEXT_SOURCES_CREATE = 211;
// Data Settings > Types context
SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE = 212;
SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE = 213;
/***********************
 * Class Fields
************************/
SysConfig.PK_CLASS_FIELD_WHEN = 48;
SysConfig.PK_CLASS_FIELD_SHORT_TITLE = 217;
SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE = 218;
SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION = 219;
/***********************
 * System Types
************************/
SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DEFINITION = 179;
SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL = 639;
SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION = 638;
SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS = 184;
/***********************
* Analysis Types
************************/
SysConfig.PK_ANALYSIS_TYPE__TIME_CONT = 3331;
SysConfig.PK_ANALYSIS_TYPE__TABLE = 3332;
//# sourceMappingURL=sys-config.js.map