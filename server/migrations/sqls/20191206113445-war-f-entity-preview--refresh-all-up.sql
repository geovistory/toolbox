/* Replace with your SQL commands */
Create Or Replace Function warehouse.entity_preview__refresh_all ()
    Returns boolean
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Begin
    -- performs a complete refresh of entity preview from scratch
    Perform
        warehouse.entity_preview_non_recursive__refresh ();
    Perform
        warehouse.entity_preview__update_all ();
    Return True;
End;
$BODY$;

