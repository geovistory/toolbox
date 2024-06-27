CREATE OR REPLACE FUNCTION pgwar.entity_preview_ts_vector()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
        BEGIN NEW.ts_vector = (
                SELECT
                setweight(to_tsvector(coalesce(NEW.entity_label, '')), 'A') ||
                setweight(to_tsvector(coalesce(NEW.type_label, '')), 'B') ||
                setweight(to_tsvector(coalesce(NEW.class_label, '')), 'B') ||
                setweight(to_tsvector(coalesce(NEW.full_text, '')), 'C')
            );
        RETURN NEW;
        END;            
$BODY$;

CREATE TRIGGER on_upsert_entity_preview_set_ts_vector
    BEFORE INSERT OR UPDATE OF entity_label, type_label, class_label, full_text
    ON pgwar.entity_preview
    FOR EACH ROW
    EXECUTE FUNCTION war.entity_preview_ts_vector();