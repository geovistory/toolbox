
CREATE TABLE war.field_change
(
    fk_project integer NOT NULL,
    fk_source_info integer NOT NULL,
    fk_property integer NOT NULL,
    fk_property_of_property integer NOT NULL,
    is_outgoing boolean NOT NULL,
    tmsp_last_modification timestamp with time zone NOT NULL
);

ALTER TABLE war.field_change
    ADD CONSTRAINT field_change_uniq UNIQUE (fk_project, fk_source_info,fk_property,fk_property_of_property,is_outgoing);

CREATE UNIQUE INDEX field_change_uniq_idx
    ON war.field_change USING btree
    (fk_project, fk_source_info,fk_property,fk_property_of_property,is_outgoing);

CREATE OR replace FUNCTION war.field_change__notify_upsert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	item json;
BEGIN

	FOR item in SELECT row_to_json(new_table) FROM new_table
	LOOP
	PERFORM pg_notify('field_change'::text, item::text);
 	end LOOP;

RETURN NEW;
END;
$BODY$;



CREATE TRIGGER after_update_field_change
    AFTER UPDATE
    ON war.field_change
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE PROCEDURE war.field_change__notify_upsert();


CREATE TRIGGER after_insert_field_change
    AFTER inseRT
    ON war.field_change
    REFERENCING NEW TABLE AS new_table
    FOR EACH STATEMENT
    EXECUTE PROCEDURE war.field_change__notify_upsert();

