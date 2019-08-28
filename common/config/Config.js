/**
 * This config file contains parameters that refence to keys used in
 * the database.
 *
 * It can be used by the server and by the client application.
 *
 */
const Config = {

    /**
     * This parameter maps the primary keys of classes
     * with the primary keys of the property leading to a type class.
     *
     * Example:
     * histC8 Geographical Place --> histP8 has geographical place type
     */
    PK_CLASS_PK_HAS_TYPE_MAP: {
        363: 1110, // Geographical Place
        441: 1190, // Built Work
        220: 1205, // Manifestation Singleton
        219: 1206, // Manifestation Product Type
        218: 1214, // Expression
        68: 1204, // Group
        212: 1066, // Geographical Localisation
    },


    /**
     * Primary Key of Namespace "Geovistory Ongoing"
     */
    PK_NAMESPACE__GEOVISTORY_ONGOING: 80409,

    /**
     * System Types (system.system_type)
     */
    PROPERTY_LABEL_SG: 180,
    PROPERTY_LABEL_PL: 181,
    PROPERTY_LABEL_INVERSED_SG: 182,
    PROPERTY_LABEL_INVERSED_PL: 183,
    PK_SYSTEM_TYPE__TEXT_PROPERTY__DEFINITION: 179,
    PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL: 639,
    PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION: 638,

    CLASS_LABEL: 184,

    /**
     * Primary Key of Namespace "Geovistory Ongoing"
     */
    // This project is cloned when a new project is created
    PK_PROJECT_OF_TEMPLATE_PROJECT: 173,

    // This project contains default cofigs: class_configs, labels
    PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT: 375669,

    // This project is the sandbox project that is cloned when a new account is created
    PK_PROJECT_OF_SANDBOX_PROJECT: 375232
}
module.exports = Config;
