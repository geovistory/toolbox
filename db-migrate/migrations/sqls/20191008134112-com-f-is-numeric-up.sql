CREATE OR REPLACE FUNCTION commons.isnumeric(
	text)
    RETURNS boolean
    LANGUAGE 'plpgsql'

    COST 100
    IMMUTABLE STRICT
AS $BODY$
DECLARE x NUMERIC;
BEGIN
    x = $1::NUMERIC;
    RETURN TRUE;
EXCEPTION WHEN others THEN
    RETURN FALSE;
END;
$BODY$;


CREATE OR REPLACE FUNCTION commons.get_entity_appellation(
	pk_entity integer)
    RETURNS character varying
    LANGUAGE 'sql'

    COST 100
    VOLATILE
AS $BODY$
SELECT t3.string
FROM information.role t1,
     information.role t2,
     information.appellation t3

WHERE t1.fk_entity = $1
AND t2.fk_temporal_entity = t1.fk_temporal_entity
AND t2.fk_property = 1113
AND t2.fk_entity = t3.pk_entity;
$BODY$;
