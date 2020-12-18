-- 1 add ord_num_of_range column. TODO: rename ord_num to ord_num_of_domain
ALTER TABLE projects.info_proj_rel DISABLE TRIGGER after_epr_upsert;

ALTER TABLE projects.info_proj_rel ADD COLUMN ord_num_of_range INT;
ALTER TABLE projects.info_proj_rel_vt ADD COLUMN ord_num_of_range INT;
UPDATE projects.info_proj_rel SET ord_num_of_range = ord_num;

ALTER TABLE projects.info_proj_rel RENAME COLUMN ord_num TO ord_num_of_domain;
ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN ord_num TO ord_num_of_domain;

ALTER TABLE projects.info_proj_rel ADD COLUMN ord_num_of_text_property INT;
ALTER TABLE projects.info_proj_rel_vt ADD COLUMN ord_num_of_text_property INT;
UPDATE projects.info_proj_rel AS t1
SET ord_num_of_text_property = ord_num_of_domain
FROM information.text_property As t2
WHERE t1.fk_entity = t2.pk_entity;

ALTER TABLE projects.info_proj_rel ENABLE TRIGGER after_epr_upsert;


-- 2 and 3
DROP VIEW projects.v_info_proj_rel;
CREATE OR REPLACE VIEW projects.v_info_proj_rel AS
 SELECT * FROM projects.info_proj_rel;

-- 4
DROP FUNCTION projects.v_info_proj_rel_update_or_creat();

-- 5

CREATE FUNCTION projects.v_info_proj_rel_update_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
  DECLARE
    resulting_pk integer;
    resulting_row projects.v_info_proj_rel;
  BEGIN

     RAISE INFO 'input values: %', NEW;

    ------ if existing, store in resulting_pk ... -----
    SELECT * FROM INTO resulting_row projects.v_info_proj_rel
      WHERE fk_entity = NEW.fk_entity
      AND fk_project = NEW.fk_project;


  ------ ... and update the found row -----

  IF FOUND THEN

   -- RAISE INFO 'result of select: %', resulting_row;
   -- RAISE INFO 'v %', COALESCE(NEW.entity_version, resulting_row.entity_version);

    UPDATE projects.info_proj_rel
    SET
          fk_entity_version = COALESCE(NEW.fk_entity_version, resulting_row.fk_entity_version),
          fk_entity_version_concat = COALESCE(NEW.fk_entity_version_concat, resulting_row.fk_entity_version_concat),
          is_in_project = COALESCE(NEW.is_in_project, resulting_row.is_in_project),
          is_standard_in_project = COALESCE(NEW.is_standard_in_project, resulting_row.is_standard_in_project),
          calendar = COALESCE(NEW.calendar, resulting_row.calendar),
          ord_num_of_domain = COALESCE(NEW.ord_num_of_domain, resulting_row.ord_num_of_domain),
          ord_num_of_range = COALESCE(NEW.ord_num_of_range, resulting_row.ord_num_of_range),
          ord_num_of_text_property = COALESCE(NEW.ord_num_of_text_property, resulting_row.ord_num_of_text_property),
          fk_creator = COALESCE(NEW.fk_creator, resulting_row.fk_creator),
          fk_last_modifier = COALESCE(NEW.fk_last_modifier, resulting_row.fk_last_modifier)
      WHERE pk_entity = resulting_row.pk_entity;

    ------- if not existing, insert and store in result -----
      ELSE

            -- RAISE INFO 'Not found, creating new...';

          WITH _insert AS (
              INSERT INTO projects.info_proj_rel (
                fk_project,
                fk_entity,
                fk_entity_version,
                fk_entity_version_concat,
                is_in_project,
                is_standard_in_project,
                calendar,
                ord_num_of_domain,
                ord_num_of_range,
                ord_num_of_text_property,
                entity_version,
                fk_creator,
                fk_last_modifier
                )
                VALUES (
                NEW.fk_project,
                NEW.fk_entity,
                NEW.fk_entity_version,
                NEW.fk_entity_version_concat,
                NEW.is_in_project,
                NEW.is_standard_in_project,
                NEW.calendar,
                NEW.ord_num_of_domain,
                NEW.ord_num_of_range,
                NEW.ord_num_of_text_property,
                1,
                NEW.fk_creator,
                NEW.fk_last_modifier
              )
              -- return all fields of the new row
              RETURNING *
              )
          SELECT pk_entity FROM INTO resulting_pk _insert;

            -- RAISE INFO 'result of insert: %', resulting_row;

    END IF;

  SELECT * FROM INTO resulting_row projects.v_info_proj_rel
  WHERE pk_entity = resulting_pk OR  pk_entity = resulting_row.pk_entity;

  RETURN resulting_row;
    END;
    $BODY$;


-- 6
CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON projects.v_info_proj_rel
    FOR EACH ROW
    EXECUTE PROCEDURE projects.v_info_proj_rel_update_or_create();
