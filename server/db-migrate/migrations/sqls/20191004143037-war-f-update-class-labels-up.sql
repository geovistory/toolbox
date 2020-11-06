-- 1
CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__update_class_labels(
	pk_class integer,
	param_class_label text DEFAULT NULL::text)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$
  DECLARE
    new_class_label TEXT;
  BEGIN

    ---------------------- REPO & PROJECTS VERSIONS ----------------------

    RAISE INFO 'entity_preview_non_recursive__update_class_labels of pk_class: %', pk_class;

    -- get new_class_label
    IF (param_class_label IS NULL) THEN
      SELECT class_label INTO new_class_label
      FROM warehouse.class_preview
      WHERE dfh_pk_class = pk_class;
    ELSE
      new_class_label = param_class_label;
    END IF;

    RAISE INFO 'new_class_label: %', new_class_label;

    -- update all dependent entity_previews with new_class_label (if DISTINCT)
    UPDATE warehouse.entity_preview_non_recursive
    SET class_label = new_class_label
    WHERE fk_class = pk_class
    AND class_label IS DISTINCT FROM new_class_label;

    RETURN true;
  END;
  $BODY$;

-- 2
CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_class_labels()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
      BEGIN

        RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; dfh_pk_class: % class_label: %', NEW.dfh_pk_class, NEW.class_label;

        PERFORM warehouse.entity_preview_non_recursive__update_class_labels(NEW.dfh_pk_class, NEW.class_label);

        RETURN NEW;
      END;
      $BODY$;
