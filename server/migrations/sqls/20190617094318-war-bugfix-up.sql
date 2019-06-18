
CREATE OR REPLACE FUNCTION warehouse.update_class_preview__on_class_profile_view_upsert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
  DECLARE
      label text;
      entity_type text;
  BEGIN

  INSERT INTO warehouse.class_preview (dfh_pk_class, class_label, entity_type)
  SELECT v.dfh_pk_class, v.class_label, v.entity_type
  FROM information.v_class_preview as v
  WHERE v.dfh_pk_class = NEW.dfh_fk_class
  ON CONFLICT ON CONSTRAINT dfh_pk_class_unique
    DO
      UPDATE
        SET (class_label, entity_type) = (
            SELECT v.class_label, v.entity_type
            FROM information.v_class_preview as v
            WHERE v.dfh_pk_class = NEW.dfh_fk_class
          );

  RETURN NEW;

  END;
  $BODY$;
