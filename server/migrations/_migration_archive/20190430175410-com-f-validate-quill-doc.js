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
  CREATE OR REPLACE FUNCTION commons.validate_quill_doc(quillDoc jsonb) RETURNS boolean AS $f$
  DECLARE
    isValid boolean;
  BEGIN
    SELECT INTO isValid commons.validate_json_schema('{
      "$schema": "http://json-schema.org/draft-06/schema#",
      "definitions": {
        "QuillDoc": {
          "type": "object",
          "properties": {
            "latestId": {
              "type": "number"
            },
            "ops": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Op"
              }
            }
          },
          "required": [
            "latestId"
          ],
          "additionalProperties": false
        },
        "Op": {
          "type": "object",
          "properties": {
            "insert": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1
            },
            "attributes": {
              "type": "object",
              "properties": {
                "charid": {
                  "type": "string"
                },
                "blockid": {
                  "type": "string"
                }
              }
            }
          },
          "required": [
            "insert"
          ],
          "additionalProperties": false
        }
      },
      "$ref": "#/definitions/QuillDoc"
    }'::jsonb, quillDoc);
    RETURN isValid;
  END;
  $f$ LANGUAGE 'plpgsql' IMMUTABLE;
  
  
  
  
  `

  db.runSql(sql, callback)

};

exports.down = function (db, callback) {

  const sql = `
 
    DROP FUNCTION commons.validate_quill_doc(jsonb);


    `

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
