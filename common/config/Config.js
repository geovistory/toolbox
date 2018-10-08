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
    },


    /**
     * Primary Key of Namespace "Geovistory Ongoing"
     */
    PK_NAMESPACE__GEOVISTORY_ONGOING: 80409,

    /**
     * System Types (commons.system_type)
     */
    PROPERTY_LABEL_SG: 184,
    PROPERTY_LABEL_PL: 185,
    PROPERTY_LABEL_INVERSED_SG: 186,
    PROPERTY_LABEL_INVERSED_PL: 187,

    CLASS_LABEL: 188


}
module.exports = Config;