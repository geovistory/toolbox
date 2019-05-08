    
CREATE OR REPLACE FUNCTION commons.modernize_quill_doc(orig jsonb) RETURNS jsonb AS $f$
    DECLARE
      newJ jsonb;
      latestId int;
      newOps jsonb;
      oldOp jsonb;
      char text;
    BEGIN
      newOps = jsonb_build_array();
      latestId = (orig->>'latestId')::int;
      
      -- LOOP over ops
      FOR oldOp IN SELECT * FROM jsonb_array_elements((orig->'contents'->>'ops')::jsonb)
        LOOP
      
        -- IF insert length > 1
        IF((SELECT char_length(oldOp->>'insert') > 1)) THEN
          RAISE NOTICE 'Parsing Item % % %', oldOp->>'insert', oldOp->>'attributes', (SELECT char_length(oldOp->>'insert') > 1);
          
          
          -- LOOP over insert characters
          FOREACH char IN ARRAY (SELECT chars FROM (SELECT regexp_split_to_array(oldOp->>'insert','')) AS x(chars))
          LOOP 
            latestId = latestId + 1;																					  
            newOps = newOps || jsonb_build_object(
              'insert', char,
              'attributes', jsonb_set(COALESCE(oldOp->'attributes', '{}'::jsonb ), '{node}'::text[], latestId::text::jsonb)
            );
                                                            
          END LOOP;
                                    
        ELSE 
          -- 
          IF(oldOp->'attributes' ? 'node') THEN																							  
            newOps = newOps || jsonb_build_object(
              'insert', oldOp->'insert',
              'attributes', jsonb_set(COALESCE(oldOp->'attributes', '{}'::jsonb ), '{node}'::text[], (oldOp->'attributes'->>'node')::int::text::jsonb)
            );
          ELSIF (oldOp ? 'attributes') THEN
            newOps = newOps || jsonb_build_object(
              'insert', oldOp->'insert',
              'attributes', oldOp->'attributes'
            );																						  
          ELSE
            newOps = newOps || jsonb_build_object(
              'insert', oldOp->'insert'
            );
          END IF;
                                                      
        END IF;
        
      END LOOP;
      
      RAISE NOTICE 'New Ops: %', newOps;

      newJ = jsonb_build_object('latestId',latestId, 'ops', newOps);

      RETURN newJ;
    END;
    $f$ LANGUAGE 'plpgsql' IMMUTABLE;