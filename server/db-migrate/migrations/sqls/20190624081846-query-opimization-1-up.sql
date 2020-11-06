-- 0
CREATE OR REPLACE VIEW information.v_role_tmp AS
	 SELECT t1.pk_entity,
    t1.fk_property,
    t1.fk_entity,
    t1.fk_temporal_entity,
   	t2.is_in_project_count,
   	t2.is_standard_in_project_count,
   	t2.community_favorite_calendar,
    t1.notes,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period,
    p.dfh_range_instances_max_quantifier AS range_max_quantifier,
    p.dfh_domain_instances_max_quantifier AS domain_max_quantifier
   FROM information.role t1
   JOIN data_for_history.property p ON t1.fk_property = p.dfh_pk_property
   LEFT JOIN LATERAL (
		 SELECT
		 	count(pk_entity) is_in_project_count,
		 	COALESCE(count(*) FILTER (WHERE ord_num = 0), 0::bigint) AS is_standard_in_project_count,
		 	mode() WITHIN GROUP (ORDER BY calendar) AS community_favorite_calendar
		 FROM projects.info_proj_rel
		 WHERE fk_entity = t1.pk_entity AND is_in_project = true
		 GROUP BY fk_entity
	 ) AS t2 ON TRUE;


CREATE OR REPLACE FUNCTION information.v_role_tmp_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_role_tmp;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;

      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.role
        WHERE
            fk_entity = NEW.fk_entity
            AND fk_temporal_entity = NEW.fk_temporal_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN

              -- RAISE INFO 'Not found, creating new...';

            WITH _insert AS (
                INSERT INTO information.role (
                    fk_entity,
                    fk_temporal_entity,
                    fk_property
                )
                VALUES (
                    NEW.fk_entity,
                    NEW.fk_temporal_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                )
            SELECT pk_entity FROM INTO resulting_pk _insert;

              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

  SELECT * FROM INTO resulting_row information.v_role_tmp
  WHERE pk_entity = resulting_pk;
RETURN resulting_row;
  END;
  $BODY$;

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_role_tmp
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_role_tmp_find_or_create();

-- 1
CREATE OR REPLACE VIEW warehouse.v_roles_per_project_and_repo_no_rank AS
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    epr.fk_project,
    COALESCE(epr.fk_project, 0) AS project
   FROM information.v_role_tmp r
     LEFT JOIN projects.info_proj_rel epr ON epr.fk_entity = r.pk_entity AND epr.is_in_project = true
UNION
 SELECT DISTINCT r.fk_entity,
    r.fk_temporal_entity,
    r.fk_property,
    NULL::integer AS fk_project,
    0 AS project
   FROM information.v_role_tmp r
  WHERE r.is_in_project_count > 0;
