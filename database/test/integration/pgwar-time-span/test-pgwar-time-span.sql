BEGIN;

SELECT plan(9);

-- Drop trigger after_insert_project_statement
DROP TRIGGER IF EXISTS after_insert_project_statement ON pgwar.project_statements;

-- Drop trigger after_update_project_statement
DROP TRIGGER IF EXISTS after_update_project_statement ON pgwar.project_statements;

-- Drop trigger after_delete_project_statement
DROP TRIGGER IF EXISTS after_delete_project_statement ON pgwar.project_statements;

-- Drop trigger after_modify_project_statements
DROP TRIGGER IF EXISTS after_modify_project_statements ON pgwar.project_statements;

-- initialize entity previews
INSERT INTO pgwar.entity_preview (pk_entity, fk_project, fk_class)
VALUES  (32, 999, 0),
        (33, 999, 0),
	    (34, 999, 0);

INSERT INTO pgwar.project_statements (pk_entity, fk_project, fk_subject_info, fk_property, object_value)
VALUES  (132, 999, 32, 72, '{
                                "timePrimitive": {
                                  "to": {
                                    "calJulian": "1890-12-20",
                                    "julianDay": 2411734,
                                    "calGregorian": "1891-01-01",
                                    "julianSecond": 208373817600,
                                    "calGregorianIso8601": "1891-01-01T00:00:00Z"
                                  },
                                  "from": {
                                    "calJulian": "1889-12-20",
                                    "julianDay": 2411369,
                                    "calGregorian": "1890-01-01",
                                    "julianSecond": 208342281600,
                                    "calGregorianIso8601": "1890-01-01T00:00:00Z"
                                  },
                                  "label": "1890-01-01 (1 year)",
                                  "fkClass": 335,
                                  "calendar": "gregorian",
                                  "duration": "1 year",
                                  "pkEntity": 835781,
                                  "julianDay": 2411369
                                }
                              }'::jsonb),
        (133, 999, 33, 72, '{
                                 "timePrimitive": {
                                   "to": {
                                     "calJulian": "1890-12-20",
                                     "julianDay": 2411734,
                                     "calGregorian": "1891-01-01",
                                     "julianSecond": 208373817600,
                                     "calGregorianIso8601": "1891-01-01T00:00:00Z"
                                   },
                                   "from": {
                                     "calJulian": "1889-12-20",
                                     "julianDay": 2411369,
                                     "calGregorian": "1890-01-01",
                                     "julianSecond": 208342281600,
                                     "calGregorianIso8601": "1890-01-01T00:00:00Z"
                                   },
                                   "label": "1890-01-01 (1 month)",
                                   "fkClass": 335,
                                   "calendar": "gregorian",
                                   "duration": "1 month",
                                   "pkEntity": 835781,
                                   "julianDay": 2411369
                                 }
                               }'::jsonb),
	    (134, 999, 34, 72, '{
                              "timePrimitive": {
                                "to": {
                                  "calJulian": "1890-12-20",
                                  "julianDay": 2411734,
                                  "calGregorian": "1891-01-01",
                                  "julianSecond": 208373817600,
                                  "calGregorianIso8601": "1891-01-01T00:00:00Z"
                                },
                                "from": {
                                  "calJulian": "1889-12-20",
                                  "julianDay": 2411369,
                                  "calGregorian": "1890-01-01",
                                  "julianSecond": 208342281600,
                                  "calGregorianIso8601": "1890-01-01T00:00:00Z"
                                },
                                "label": "1890-01-01 (1 day)",
                                "fkClass": 335,
                                "calendar": "gregorian",
                                "duration": "1 day",
                                "pkEntity": 835781,
                                "julianDay": 2411369
                              }
                            }'::jsonb);

-- add full text for two of the entities
INSERT INTO pgwar.statement (pk_entity, fk_subject_info, fk_property, object_value)
VALUES (132, 32, 72, '{
                   "timePrimitive": {
                     "to": {
                       "calJulian": "1890-12-20",
                       "julianDay": 2411734,
                       "calGregorian": "1891-01-01",
                       "julianSecond": 208373817600,
                       "calGregorianIso8601": "1891-01-01T00:00:00Z"
                     },
                     "from": {
                       "calJulian": "1889-12-20",
                       "julianDay": 2411369,
                       "calGregorian": "1890-01-01",
                       "julianSecond": 208342281600,
                       "calGregorianIso8601": "1890-01-01T00:00:00Z"
                     },
                     "label": "1890-01-01 (1 year)",
                     "fkClass": 335,
                     "calendar": "gregorian",
                     "duration": "1 year",
                     "pkEntity": 835781,
                     "julianDay": 2411369
                   }
                 }'::jsonb),
        (133, 33, 72, '{
                    "timePrimitive": {
                      "to": {
                        "calJulian": "1890-12-20",
                        "julianDay": 2411734,
                        "calGregorian": "1891-01-01",
                        "julianSecond": 208373817600,
                        "calGregorianIso8601": "1891-01-01T00:00:00Z"
                      },
                      "from": {
                        "calJulian": "1889-12-20",
                        "julianDay": 2411369,
                        "calGregorian": "1890-01-01",
                        "julianSecond": 208342281600,
                        "calGregorianIso8601": "1890-01-01T00:00:00Z"
                      },
                      "label": "1890-01-01 (1 month)",
                      "fkClass": 335,
                      "calendar": "gregorian",
                      "duration": "1 month",
                      "pkEntity": 835781,
                      "julianDay": 2411369
                    }
                  }'::jsonb),
	(134, 34, 72, '{
                 "timePrimitive": {
                   "to": {
                     "calJulian": "1890-12-20",
                     "julianDay": 2411734,
                     "calGregorian": "1891-01-01",
                     "julianSecond": 208373817600,
                     "calGregorianIso8601": "1891-01-01T00:00:00Z"
                   },
                   "from": {
                     "calJulian": "1889-12-20",
                     "julianDay": 2411369,
                     "calGregorian": "1890-01-01",
                     "julianSecond": 208342281600,
                     "calGregorianIso8601": "1890-01-01T00:00:00Z"
                   },
                   "label": "1890-01-01 (1 day)",
                   "fkClass": 335,
                   "calendar": "gregorian",
                   "duration": "1 day",
                   "pkEntity": 835781,
                   "julianDay": 2411369
                 }
               }'::jsonb);

-- run the update task
SELECT pgwar.update_time_span();

SELECT is(
		time_span,
        '{
           "p82": {
             "calendar": "gregorian",
             "duration": "1 year",
             "julianDay": 2411369
           }
         }'::jsonb,
		'time span json is correctly constructed'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 32
	AND fk_project = 999;

SELECT is(
		time_span,
        '{
           "p82": {
             "calendar": "gregorian",
             "duration": "1 month",
             "julianDay": 2411369
           }
         }'::jsonb,
		'time span json is correctly constructed'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 33
	AND fk_project = 999;

SELECT is(
		time_span,
        '{
           "p82": {
             "calendar": "gregorian",
             "duration": "1 day",
             "julianDay": 2411369
           }
         }'::jsonb,
		'time span json is correctly constructed'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 34
	AND fk_project = 999;

SELECT is(
		first_second,
        208342281600,
		'first_second is correct in entity_preview'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 32
	AND fk_project = 999;

SELECT is(
		first_second,
        208342281600,
        'first_second is correct in entity_preview'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 33
	AND fk_project = 999;

SELECT is(
		first_second,
        208342281600,
        'first_second is correct in entity_preview'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 34
	AND fk_project = 999;

SELECT is(
		last_second,
        208373817600,
		'last_second is correct in entity_preview'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 32
	AND fk_project = 999;

SELECT is(
		last_second,
        208344873600,
        'last_second is correct in entity_preview'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 33
	AND fk_project = 999;

SELECT is(
		last_second,
        208342368000,
        'last_second is correct in entity_preview'
	)
FROM pgwar.entity_preview
WHERE pk_entity = 34
	AND fk_project = 999;


-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;