CREATE OR REPLACE FUNCTION warehouse.entity_preview__upsert_entity_preview()
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
      _BOOL BOOLEAN;
      _result JSONB;
      _new_label TEXT;
      BEGIN

        _fk_project = NEW.fk_project;

        SELECT table_name INTO _table_name
        FROM information.entity e
        WHERE e.pk_entity = NEW.fk_entity;


        --------------------- text_property ---------------------
        IF (SELECT _table_name = 'text_property') THEN

          SELECT t.fk_concerned_entity into _fk_entity
          FROM information.text_property t
          WHERE t.pk_entity = NEW.fk_entity;

          RAISE INFO 'updated epr of text_property for entity: %, fk_project: %', _fk_entity, _fk_project;

          PERFORM
          -- fill own entity label
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),

          -- fill own full text
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, NULL::text]);


        --------------------- role -----------------------------
        ELSIF (SELECT _table_name = 'role') THEN

          SELECT r.fk_entity into _fk_entity
          FROM information.role r
          WHERE r.pk_entity = NEW.fk_entity;
          SELECT r.fk_temporal_entity into _fk_temporal_entity
          FROM information.role r
          WHERE r.pk_entity = NEW.fk_entity;

          RAISE INFO 'updated epr of role of pk_entity: %, fk_temporal_entity: %, fk_project: %', _fk_entity, _fk_temporal_entity, _fk_project;

          PERFORM

          -- fill own entity label
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_entity_label'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- fill own full text
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_own_full_text'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- fill time span
          warehouse.needs_update('entity_preview__fill_time_span'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__fill_time_span'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- create fk entity label
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_entity_label'::text, ARRAY[_fk_temporal_entity::text, NULL::text]),

          -- create related full texts
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_entity::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_temporal_entity::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_related_full_texts'::text, ARRAY[_fk_temporal_entity::text, NULL::text]);

        --------------------- entity_association -----------------
        ELSIF (SELECT _table_name = 'entity_association') THEN
          SELECT ea.fk_info_domain into _fk_info_domain
          FROM information.entity_association ea
          WHERE ea.pk_entity = NEW.fk_entity;
          SELECT ea.fk_info_range into _fk_info_range
          FROM information.entity_association ea
          WHERE ea.pk_entity = NEW.fk_entity;

          RAISE INFO 'updated epr of entity_association with fk_info_domain: %, fk_info_range: %, fk_project: %', _fk_info_domain, _fk_info_range, _fk_project;

          PERFORM

          -- create fk type
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_domain::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_domain::text, NULL::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_range::text, _fk_project::text]),
          warehouse.needs_update('entity_preview__create_fk_type'::text, ARRAY[_fk_info_range::text, NULL::text]);

        --------------------- temporal_entity or persistent_item -----------------
        ELSIF (SELECT _table_name IN ('temporal_entity', 'persistent_item')) THEN

          RAISE INFO 'updated crm entity with pk_entity: %, fk_project: %', NEW.fk_entity, _fk_project;

          IF (NEW.is_in_project = true) THEN
            PERFORM
            -- create fk type
            warehouse.needs_update('entity_preview__create'::text, ARRAY[NEW.fk_entity::text, _fk_project::text]),
            warehouse.needs_update('entity_preview__create'::text, ARRAY[NEW.fk_entity::text, NULL::text]);

          ELSIF (NEW.is_in_project = false) THEN

            DELETE FROM warehouse.entity_preview
            WHERE fk_project IS NOT DISTINCT FROM NEW.fk_project
            AND pk_entity = NEW.fk_entity;

          END IF;
        END IF;



      RETURN NEW;
    END;
    $BODY$;
