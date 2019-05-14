 CREATE OR REPLACE FUNCTION commons.modernize_quill_doc(orig jsonb) RETURNS jsonb AS $f$
    DECLARE
      newJ jsonb;
      latestId int;
      newOps jsonb;
      oldOp jsonb;
      char text;
    BEGIN
      newOps = jsonb_build_array();
      latestId = 0;
      
      -- LOOP over ops
      FOR oldOp IN SELECT * FROM jsonb_array_elements((orig->'contents'->>'ops')::jsonb)
        LOOP
      
          RAISE NOTICE 'Parsing Item % % %', oldOp->>'insert', oldOp->>'attributes', (SELECT char_length(oldOp->>'insert') > 1);
          
          
          -- LOOP over insert characters
          FOREACH char IN ARRAY (SELECT chars FROM (SELECT regexp_split_to_array(oldOp->>'insert','')) AS x(chars))
          LOOP 
            latestId = latestId + 1;	
			
			IF char = E'\n' THEN
				newOps = newOps || jsonb_build_object(
				  'insert', char,
				  'attributes', jsonb_set(COALESCE(oldOp->'attributes', '{}'::jsonb), '{blockid}'::text[],  to_json(latestId::text)::jsonb)
				);
			ELSE
				 newOps = newOps || jsonb_build_object(
				  'insert', char,
				  'attributes', jsonb_set(COALESCE(oldOp->'attributes', '{}'::jsonb) - 'node', '{charid}'::text[], to_json(latestId::text)::jsonb)
				);
			END IF;
          END LOOP;
      
        
      END LOOP;
      
      RAISE NOTICE 'New Ops: %', newOps;
		
	  
      newJ = jsonb_build_object('latestId',latestId, 'ops', newOps);

      RETURN newJ;
    END;
    $f$ LANGUAGE 'plpgsql' IMMUTABLE;