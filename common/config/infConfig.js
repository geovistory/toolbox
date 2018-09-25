/**
 * This config file contains parameters that refence to keys used in
 * the database schema information.
 * 
 * It can be used by the server and by the client application.
 * 
 */
const InfConfig = {

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
    }

}
module.exports = InfConfig;