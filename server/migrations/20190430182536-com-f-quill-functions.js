'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


exports.up = function (db, callback) {

  const sql = `    
      
    CREATE OR REPLACE FUNCTION commons.text_to_quill_doc(text text) RETURNS jsonb AS $f$
    DECLARE
      latestId int;
      ops jsonb;
      char text;
    BEGIN
      ops = jsonb_build_array();
      latestId = 1;

      -- LOOP over text characters
      FOREACH char IN ARRAY (SELECT chars FROM (SELECT regexp_split_to_array(text,'')) AS x(chars))
      LOOP 
        ops = ops || jsonb_build_object(
          'insert', char,
          'attributes', jsonb_build_object('node', latestId::text::jsonb)
        );
      latestId = latestId + 1;
      END LOOP;

        ops = ops || jsonb_build_object(
        'insert', E'\n',
        'attributes', jsonb_build_object('node', latestId::text::jsonb)
      );

      RETURN jsonb_build_object('latestId',latestId, 'ops', ops);
    END;
    $f$ LANGUAGE 'plpgsql' IMMUTABLE;


    CREATE OR REPLACE FUNCTION commons.quill_doc_to_text(
      text_property_quill_doc jsonb,
      OUT string text)
        RETURNS text
        LANGUAGE 'sql'
    AS $BODY$
        
          SELECT TRIM( TRAILING E'\n' FROM STRING_AGG(l.ops->>'insert', ''))
          FROM (SELECT jsonb_array_elements(text_property_quill_doc->'ops') as ops) as l
    $BODY$;


  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    DROP FUNCTION commons.quill_doc_to_text(jsonb);
    DROP FUNCTION commons.text_to_quill_doc(text);
    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
