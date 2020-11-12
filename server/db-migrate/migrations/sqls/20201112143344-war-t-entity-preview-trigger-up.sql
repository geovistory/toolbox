-- 1
CREATE OR REPLACE FUNCTION war.entity_preview_ts_vector()
                RETURNS trigger
                LANGUAGE 'plpgsql'
                COST 100
                VOLATILE NOT LEAKPROOF
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

-- 2

CREATE TRIGGER ts_vector
    BEFORE INSERT OR UPDATE
    ON war.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE war.entity_preview_ts_vector();
