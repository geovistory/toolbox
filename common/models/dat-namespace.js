'use strict';
const Config = require('../config/Config');

module.exports = function (DatNamespace) {

    // /**
    //  * This remote method is used to show the list of namespaces available
    //  * in Project > Data Settings > Class Settings
    //  * 
    //  * It finds Namespaces that have at least one type instance that is used 
    //  * to type the given class or where the Namespace belongs to the given project. 
    //  * Root Namespaces are excluded.
    //  * 
    //  */
    // DatNamespace.findWhereProjectOrHasTypes = (pk_class, pk_project, cb) => {


    //     const sql = `
    //     -- Find Namespaces that have at least one type instance that is used to type the given class
       
    //     SELECT n1.pk_entity, n1.standard_label, n1.fk_root_namespace, n1.fk_project FROM information.namespace as n1 
    //     INNER JOIN information.type_namespace_rel as rel ON rel.fk_namespace = n1.pk_entity
    //     INNER JOIN information.persistent_item as pi ON rel.fk_persistent_item = pi.pk_entity
    //     INNER JOIN data_for_history.property as pr ON pr.dfh_has_range = pi.fk_class
    //     -- TODO: Replace searching for property as soon as we have the association of class and type class in data
    //     WHERE pr.dfh_pk_property = $1 and n1.fk_root_namespace IS NOT NULL
       
    //     UNION
       
    //     -- Find Namespaces that belong to the given project
      
    //     SELECT n2.pk_entity, n2.standard_label, n2.fk_root_namespace, n2.fk_project FROM information.namespace as n2 
    //     WHERE n2.fk_project = $2 and n2.fk_root_namespace IS NOT NULL
      
    //     UNION
      
    //     -- Find Geovistory Ongoing Namespace
        
    //     SELECT n3.pk_entity, n3.standard_label, n3.fk_root_namespace, n3.fk_project FROM information.namespace as n3 
    //     WHERE n3.pk_entity = $3
    //     `

    //     // Get Property Pk
    //     // TODO: Replace use of Config.PK_CLASS_PK_HAS_TYPE_MAP as soon as we 
    //     // have the association of class and type class in data
    //     const pk_property = Config.PK_CLASS_PK_HAS_TYPE_MAP[pk_class] || -1;

    //     const pk_geovistory_ongoing = Config.PK_NAMESPACE__GEOVISTORY_ONGOING;

    //     const params = [pk_property, pk_project, pk_geovistory_ongoing];

    //     DatNamespace.dataSource.connector.execute(sql, params, (err, resultObjects) => {
    //         cb(err, resultObjects);
    //     });
    // }

};
