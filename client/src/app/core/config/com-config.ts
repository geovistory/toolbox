/**
 * Contains configuration of keys used in the the commons-schema
 * that are relevant for the app logic.
 *
 * Example: the ui-context keys are used to query the order of properties in different contexts
 */
export class ComConfig {


    /***********************
     * Ui Contexts
    ************************/

    // Toolbox-wide context
    static readonly PK_UI_CONTEXT_ADD = 47;

    // DataUnits context
    static readonly PK_UI_CONTEXT_DATAUNITS_EDITABLE = 45;
    static readonly PK_UI_CONTEXT_DATAUNITS_CREATE = 46;

    // Sources context
    static readonly PK_UI_CONTEXT_SOURCES_EDITABLE = 229;
    static readonly PK_UI_CONTEXT_SOURCES_CREATE = 230;

    // Data Settings > Types context
    static readonly PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE = 231;
    static readonly PK_UI_CONTEXT_DATA_SETTINGS_TYPES_CREATE = 232;


    /***********************
     * Class Fields
    ************************/

    static readonly PK_CLASS_FIELD_WHEN = 48;
    static readonly PK_CLASS_FIELD_SHORT_TITLE = 217;
    static readonly PK_CLASS_FIELD_EXACT_REFERENCE = 218;
    static readonly PK_CLASS_FIELD_ENTITY_DEFINITION = 219;


    /***********************
     * System Types
    ************************/

    static readonly PK_SYSTEM_TYPE__TEXT_PROPERY__DEFINITION = 179;
}
