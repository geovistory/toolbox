CREATE OR REPLACE FUNCTION commons.string_to_quill_doc(
	text text)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    IMMUTABLE
AS $BODY$
    DECLARE
      latestId int;
      ops jsonb;
      char text;
    BEGIN
      ops = jsonb_build_array();
      latestId = 1;

      -- LOOP over text characters
      FOREACH char IN ARRAY (SELECT
        CASE
          WHEN chars= ARRAY[''] THEN ARRAY[]::text[]
          ELSE chars
        END
        FROM (SELECT regexp_split_to_array(text,'')) AS x(chars))
      LOOP

      IF char = E'\n' THEN
        ops = ops || jsonb_build_object(
          'insert', char,
          'attributes', jsonb_build_object('blockid',  to_json(latestId::text)::jsonb)
        );
      ELSE
        ops = ops || jsonb_build_object(
          'insert', char,
          'attributes', jsonb_build_object('charid',  to_json(latestId::text)::jsonb)
        );
      END IF;

      latestId = latestId + 1;
      END LOOP;

        ops = ops || jsonb_build_object(
        'insert', E'\n',
        'attributes', jsonb_build_object('blockid', to_json(latestId::text)::jsonb)
      );

      RETURN jsonb_build_object('latestId',latestId, 'ops', ops);
    END;
    $BODY$;
