/**
 * Contains configuration of keys used in the the system-schema
 * that are relevant for the app logic.
 *
 * Example: the ui-context keys are used to query the order of properties in different contexts
 */
export class SysConfig {

  /***********************
  * Remote Servives
  ************************/

  // Ontome URL (base url)
  static readonly ONTOME_URL = 'https://ontome.net'

  /***********************
   * Ui Contexts
  ************************/

  // Toolbox-wide context
  static readonly PK_UI_CONTEXT_ADD = 47;

  // Entities context
  static readonly PK_UI_CONTEXT_DATAUNITS_EDITABLE = 45;
  static readonly PK_UI_CONTEXT_DATAUNITS_CREATE = 46;

  // Sources context
  static readonly PK_UI_CONTEXT_SOURCES_EDITABLE = 210;
  static readonly PK_UI_CONTEXT_SOURCES_CREATE = 211;

  // Data Settings > Types context
  static readonly PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE = 212;
  static readonly PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE = 213;


  /***********************
   * Class Fields
  ************************/

  static readonly PK_CLASS_FIELD_WHEN = 48;
  static readonly PK_CLASS_FIELD_SHORT_TITLE = 217;
  static readonly PK_CLASS_FIELD_EXACT_REFERENCE = 218;
  static readonly PK_CLASS_FIELD_ENTITY_DEFINITION = 219;
  static readonly PK_CLASS_FIELD_COMMENT = 3364


  /***********************
   * System Types
  ************************/

  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__DEFINITION = 179;
  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL = 639;
  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION = 638;
  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_1_LABEL = 3509;
  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_1_URL = 3510;
  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_2_LABEL = 3511;
  static readonly PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_2_URL = 3512;

  static readonly PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS = 184;

  static readonly PK_SYSTEM_TYPE__LABEL_FOR_DATA = 3295;

  static readonly PK_SYSTEM_TYPE__DATA_TYPE_TEXT = 3292;
  static readonly PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC = 3293;

  static readonly PK_SYSTEM_TYPE__DIGITAL_TEXT = 3286;
  static readonly PK_SYSTEM_TYPE__DIGITAL_TABLE = 3287;


  /***********************
  * Analysis Types
  ************************/

  static readonly PK_ANALYSIS_TYPE__TIME_CONT = 3331;
  static readonly PK_ANALYSIS_TYPE__TABLE = 3332;
  static readonly PK_ANALYSIS_TYPE__MAP_TIME_CONT = 3333;
}
