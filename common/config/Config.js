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
        219: 100098, // Manifestation Product Type
    },


    /**
     * Primary Key of Namespace "Geovistory Ongoing"
     */
    PK_NAMESPACE__GEOVISTORY_ONGOING: 80409,

    /**
     * System Types (commons.system_type)
     */
    PROPERTY_LABEL_SG: 180,
    PROPERTY_LABEL_PL: 181,
    PROPERTY_LABEL_INVERSED_SG: 182,
    PROPERTY_LABEL_INVERSED_PL: 183,

    CLASS_LABEL: 184


}
module.exports = Config;