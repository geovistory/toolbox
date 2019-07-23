-- 6
DROP TRIGGER on_insert ON projects.v_info_proj_rel;

-- 5
DROP FUNCTION projects.v_info_proj_rel_update_or_create();

-- 4

CREATE FUNCTION projects.v_info_proj_rel_update_or_creat()
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
          ord_num = COALESCE(NEW.ord_num, resulting_row.ord_num),
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
                ord_num,
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
                NEW.ord_num,
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


-- 3
DROP VIEW projects.v_info_proj_rel;
CREATE OR REPLACE VIEW projects.v_info_proj_rel AS
 SELECT info_proj_rel.pk_entity,
    info_proj_rel.schema_name,
    info_proj_rel.table_name,
    info_proj_rel.entity_version,
    info_proj_rel.notes,
    info_proj_rel.fk_creator,
    info_proj_rel.fk_last_modifier,
    info_proj_rel.tmsp_creation,
    info_proj_rel.tmsp_last_modification,
    info_proj_rel.sys_period,
    info_proj_rel.fk_entity,
    info_proj_rel.fk_entity_version,
    info_proj_rel.fk_entity_version_concat,
    info_proj_rel.is_in_project,
    info_proj_rel.is_standard_in_project,
    info_proj_rel.calendar,
    info_proj_rel.ord_num_of_domain AS ord_num,
    info_proj_rel.fk_project
   FROM projects.info_proj_rel;

-- 2
CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON projects.v_info_proj_rel
    FOR EACH ROW
    EXECUTE PROCEDURE projects.v_info_proj_rel_update_or_creat();

-- 1
ALTER TABLE projects.info_proj_rel  DROP COLUMN ord_num_of_range;
ALTER TABLE projects.info_proj_rel_vt  DROP COLUMN ord_num_of_range;

ALTER TABLE projects.info_proj_rel RENAME COLUMN ord_num_of_domain TO ord_num;
ALTER TABLE projects.info_proj_rel_vt RENAME COLUMN ord_num_of_domain TO ord_num;

ALTER TABLE projects.info_proj_rel  DROP COLUMN ord_num_of_text_property;
ALTER TABLE projects.info_proj_rel_vt  DROP COLUMN ord_num_of_text_property;
