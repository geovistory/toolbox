-- 2
CREATE OR REPLACE FUNCTION warehouse.entity_preview__update_dependent_class_labels()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
      BEGIN

        RAISE INFO 'Called TRIGGER FUNCTION entity_preview__update_dependent_class_labels; dfh_pk_class: % class_label: %', NEW.dfh_pk_class, NEW.class_label;

        PERFORM warehouse.entity_preview__fill_dependent_class_labels(NEW.dfh_pk_class, NEW.class_label);

        RETURN NEW;
      END;
      $BODY$;

-- 1
DROP FUNCTION warehouse.entity_preview_non_recursive__update_class_labels;
