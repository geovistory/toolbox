-- 4
DROP TRIGGER after_epr_upsert ON projects.info_proj_rel;

-- 3
DROP FUNCTION warehouse.after_info_proj_rel_upsert;

-- 2
CREATE FUNCTION warehouse.entity_preview__upsert_entity_preview()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
  _table_name VARCHAR;
  _fk_project INT;
  _fk_entity INT;
  _fk_temporal_entity INT;
  _fk_info_domain INT;
  _fk_info_range INT;
  _domain_is_in_project BOOLEAN;
  _range_is_in_project BOOLEAN;
  _BOOL BOOLEAN;
  _result JSONB;
  _new_label TEXT;
BEGIN
  _fk_project = NEW.fk_project;
  SELECT
    table_name INTO _table_name
  FROM
    information.entity e
  WHERE
    e.pk_entity = NEW.fk_entity;
  --------------------- text_property ---------------------
  IF (
      SELECT
        _table_name = 'text_property') THEN
      SELECT
        t.fk_concerned_entity INTO _fk_entity
      FROM
        information.text_property t
      WHERE
        t.pk_entity = NEW.fk_entity;
    RAISE INFO 'updated epr of text_property for entity: %, fk_project: %', _fk_entity, _fk_project;
    PERFORM
      -- fill own entity label
      warehouse.needs_update ('entity_preview__fill_own_entity_label'::text,
        ARRAY[_fk_entity::text, _fk_project::text]),
      warehouse.needs_update ('entity_preview__fill_own_entity_label'::text,
        ARRAY[_fk_entity::text, NULL::text]),
      -- fill own full text
      warehouse.needs_update ('entity_preview__fill_own_full_text'::text,
        ARRAY[_fk_entity::text, _fk_project::text]),
      warehouse.needs_update ('entity_preview__fill_own_full_text'::text,
        ARRAY[_fk_entity::text, NULL::text]);
    --------------------- role -----------------------------
  ELSIF (
      SELECT
        _table_name = 'role') THEN
      SELECT
        r.fk_entity INTO _fk_entity
      FROM
        information.role r
      WHERE
        r.pk_entity = NEW.fk_entity;
    SELECT
      r.fk_temporal_entity INTO _fk_temporal_entity
    FROM
      information.role r
    WHERE
      r.pk_entity = NEW.fk_entity;
    SELECT
      is_in_project INTO _domain_is_in_project
    FROM
      projects.info_proj_rel
    WHERE
      fk_entity = _fk_temporal_entity
      AND fk_project = _fk_project;
    SELECT
      is_in_project INTO _range_is_in_project
    FROM
      projects.info_proj_rel
    WHERE
      fk_entity = _fk_entity
      AND fk_project = _fk_project;
    RAISE INFO 'updated epr of role of pk_entity: %, fk_temporal_entity: %, fk_project: %', _fk_entity, _fk_temporal_entity, _fk_project;
    ------------ init update of preview of domain entity ---------
    ------------ in repo
    PERFORM
      -- fill own entity label
      warehouse.needs_update ('entity_preview__fill_own_entity_label'::text,
        ARRAY[_fk_temporal_entity::text, NULL::text]),
      -- fill own full text
      warehouse.needs_update ('entity_preview__fill_own_full_text'::text,
        ARRAY[_fk_temporal_entity::text, NULL::text]),
      -- fill time span
      warehouse.needs_update ('entity_preview__fill_time_span'::text,
        ARRAY[_fk_temporal_entity::text, NULL::text]),
      -- create fk entity label
      warehouse.needs_update ('entity_preview__create_fk_entity_label'::text,
        ARRAY[_fk_temporal_entity::text, NULL::text]),
      -- create related full texts
      warehouse.needs_update ('entity_preview__create_related_full_texts'::text,
        ARRAY[_fk_temporal_entity::text, NULL::text]);
    ------------ in project
    IF (_domain_is_in_project = TRUE) THEN
      PERFORM
        -- fill own entity label
        warehouse.needs_update ('entity_preview__fill_own_entity_label'::text,
          ARRAY[_fk_temporal_entity::text, _fk_project::text]),
        -- fill own full text
        warehouse.needs_update ('entity_preview__fill_own_full_text'::text,
          ARRAY[_fk_temporal_entity::text, _fk_project::text]),
        -- fill time span
        warehouse.needs_update ('entity_preview__fill_time_span'::text,
          ARRAY[_fk_temporal_entity::text, _fk_project::text]),
        -- create fk entity label
        warehouse.needs_update ('entity_preview__create_fk_entity_label'::text,
          ARRAY[_fk_temporal_entity::text, _fk_project::text]),
        -- create related full texts
        warehouse.needs_update ('entity_preview__create_related_full_texts'::text,
          ARRAY[_fk_temporal_entity::text, _fk_project::text]);
    END IF;
    IF (
        SELECT
          information.is_persistent_item_or_temporal_entity (_fk_entity) = TRUE) THEN
        ------------ init update of preview of range entity ---------
        ------------ in repo
        PERFORM
          -- fill own entity label
          warehouse.needs_update ('entity_preview__fill_own_entity_label'::text,
            ARRAY[_fk_entity::text, NULL::text]),
          -- fill own full text
          warehouse.needs_update ('entity_preview__fill_own_full_text'::text,
            ARRAY[_fk_entity::text, NULL::text]),
          -- create fk entity label
          warehouse.needs_update ('entity_preview__create_fk_entity_label'::text,
            ARRAY[_fk_entity::text, NULL::text]),
          -- create related full texts
          warehouse.needs_update ('entity_preview__create_related_full_texts'::text,
            ARRAY[_fk_entity::text, NULL::text]);
      ------------ in project
      IF (_range_is_in_project = TRUE) THEN
        PERFORM
          -- fill own entity label
          warehouse.needs_update ('entity_preview__fill_own_entity_label'::text,
            ARRAY[_fk_entity::text, _fk_project::text]),
          -- fill own full text
          warehouse.needs_update ('entity_preview__fill_own_full_text'::text,
            ARRAY[_fk_entity::text, _fk_project::text]),
          -- create fk entity label
          warehouse.needs_update ('entity_preview__create_fk_entity_label'::text,
            ARRAY[_fk_entity::text, _fk_project::text]),
          -- create related full texts
          warehouse.needs_update ('entity_preview__create_related_full_texts'::text,
            ARRAY[_fk_entity::text, _fk_project::text]);
      END IF;
    END IF;
    --------------------- entity_association -----------------
  ELSIF (
      SELECT
        _table_name = 'entity_association') THEN
      SELECT
        ea.fk_info_domain INTO _fk_info_domain
      FROM
        information.entity_association ea
      WHERE
        ea.pk_entity = NEW.fk_entity;
    SELECT
      ea.fk_info_range INTO _fk_info_range
    FROM
      information.entity_association ea
    WHERE
      ea.pk_entity = NEW.fk_entity;
    RAISE INFO 'updated epr of entity_association with fk_info_domain: %, fk_info_range: %, fk_project: %', _fk_info_domain, _fk_info_range, _fk_project;
    PERFORM
      -- create fk type
      warehouse.needs_update ('entity_preview__create_fk_type'::text,
        ARRAY[_fk_info_domain::text, _fk_project::text]),
      warehouse.needs_update ('entity_preview__create_fk_type'::text,
        ARRAY[_fk_info_domain::text, NULL::text]),
      warehouse.needs_update ('entity_preview__create_fk_type'::text,
        ARRAY[_fk_info_range::text, _fk_project::text]),
      warehouse.needs_update ('entity_preview__create_fk_type'::text,
        ARRAY[_fk_info_range::text, NULL::text]);
    --------------------- temporal_entity or persistent_item -----------------
  ELSIF (
      SELECT
        _table_name IN ('temporal_entity',
          'persistent_item')) THEN
      RAISE INFO 'updated crm entity with pk_entity: %, fk_project: %', NEW.fk_entity, _fk_project;
    IF (NEW.is_in_project = TRUE) THEN
      PERFORM
        -- create fk type
        warehouse.needs_update ('entity_preview__create'::text,
          ARRAY[NEW.fk_entity::text, _fk_project::text]),
        warehouse.needs_update ('entity_preview__create'::text,
          ARRAY[NEW.fk_entity::text, NULL::text]);
    ELSIF (NEW.is_in_project = FALSE) THEN
      DELETE FROM warehouse.entity_preview
      WHERE fk_project IS NOT DISTINCT FROM NEW.fk_project
        AND pk_entity = NEW.fk_entity;
    END IF;
  END IF;
  RETURN NEW;
END;
$BODY$;

-- 1
CREATE TRIGGER after_epr_upsert
    AFTER INSERT OR UPDATE
    ON projects.info_proj_rel
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__upsert_entity_preview();
