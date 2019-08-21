'use strict';

module.exports = function (ProClassFieldConfig) {


  ProClassFieldConfig.byProject = function (pkProject, ctx, cb) {

    const sql = `
    WITH tw1 AS (
      SELECT * FROM
      projects.class_field_config
      WHERE fk_project IS NULL
      UNION ALL
      SELECT * FROM
      projects.class_field_config
      WHERE fk_project = $1
    )
    SELECT DISTINCT ON (fk_class, tw1.fk_app_context, tw1.fk_property, tw1.property_is_outgoing, tw1.fk_class_field, tw1.fk_class_for_class_field)
	  	tw1.pk_entity,
      CASE WHEN tw1.property_is_outgoing = true THEN
        t2.dfh_has_domain
        WHEN tw1.property_is_outgoing = false THEN
        t2.dfh_has_range
        ELSE
        tw1.fk_class_for_class_field
      END fk_class,
      tw1.fk_app_context,
      tw1.fk_property,
      tw1.property_is_outgoing,
      tw1.fk_class_field,
      tw1.ord_num,
      tw1.fk_project
      FROM
      tw1
    LEFT JOIN
      data_for_history.property t2 ON t2.dfh_pk_property = tw1.fk_property
    WHERE
      tw1.ord_num IS NOT NULL
      ORDER BY
      fk_class, tw1.fk_app_context, tw1.fk_property, tw1.property_is_outgoing, tw1.fk_class_field, tw1.fk_class_for_class_field, tw1.ord_num, tw1.fk_project;
    `


    ProClassFieldConfig.dataSource.connector.execute(sql, [pkProject], (err, resultObjects) => {
      if (err) return cb(err, resultObjects);
      cb(false, resultObjects)
    });

  };


  ProClassFieldConfig.on('attached', function () {

    ProClassFieldConfig.patchOrCreate = function (data, cxt, cb) {
      var sql;
      var params = []
      function addParam(val){
        params.push(val)
        return '$' + params.length
      }
      if(data.pk_entity){
        sql = `
          UPDATE projects.class_field_config
          SET
            fk_app_context = ${addParam(data['fk_app_context'])},
            fk_class_field = ${addParam(data['fk_class_field'])},
            fk_class_for_class_field = ${addParam(data['fk_class_for_class_field'])},
            fk_project = ${addParam(data['fk_project'])},
            fk_property = ${addParam(data['fk_property'])},
            ord_num = ${addParam(data['ord_num'])},
            property_is_outgoing = ${addParam(data['property_is_outgoing'])}
          WHERE pk_entity = ${addParam(data['pk_entity'])}
          RETURNING *;
        `
      }
      else {
        sql = `
        INSERT INTO projects.class_field_config (
          fk_app_context,
          fk_class_field,
          fk_class_for_class_field,
          fk_project,
          fk_property,
          ord_num,
          property_is_outgoing
        ) VALUES (
          ${addParam(data["fk_app_context"])},
          ${addParam(data["fk_class_field"])},
          ${addParam(data["fk_class_for_class_field"])},
          ${addParam(data["fk_project"])},
          ${addParam(data["fk_property"])},
          ${addParam(data["ord_num"])},
          ${addParam(data["property_is_outgoing"])}
        )


      `
      }

      ProClassFieldConfig.dataSource.connector.execute(sql, params, (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects)
      });

    }
  })
};
