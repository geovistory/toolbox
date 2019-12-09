Create Or Replace Function warehouse.entity_preview_update_queue_worker ()
    Returns boolean
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    last_warehouse_update timestamp without time zone;
    last_project_modification timestamp without time zone;
    pk_update bigint;
    -- pk_entity of the update done by this function
Begin
    /*
     * Get the timestamp of the last warehouse.entity_preview_non_recursive update
     */
    Select
        tmsp_update_begin Into last_warehouse_update
    From
        warehouse.entity_preview_non_recursive_updates
    Order By
        pk_entity Desc
    Limit 1;
    -- set very early default
    If last_warehouse_update Is Null Then
        last_warehouse_update = '1970-01-01 00:00:00.000000'::timestamp;
    End If;

    /*
     * Get the timestamp of the last rojects.info_proj_rel modification
     */
    Select
        tmsp_last_modification::timestamp Into last_project_modification
    From
        projects.info_proj_rel
    Order By
        tmsp_last_modification Desc
    Limit 1;

    /*
     * Check if we need an update, i.e:
     * if last modification is newer than last update of warehouse
     */
    If (last_project_modification > last_warehouse_update) Then
        /*
         * Create a new record for this update.
         * the function now() is equivalent to transaction_timestamp() and
         * returns the start time of the current transaction.
         */
        Insert Into warehouse.entity_preview_non_recursive_updates (tmsp_update_begin)
        Values (now()::timestamp)
    Returning
        pk_entity Into pk_update;

        /*****
         * Perform the updates
         ******/
        Perform
            warehouse.do_updates_for_time_after (last_warehouse_update);

        /**********
         * Store the timestamp of after the update so that we have a log of the execution time
         * clock_timestamp() returns the actual current time,
         * and therefore its value changes even within a single SQL command.
         **********/
        Update
            warehouse.entity_preview_non_recursive_updates
        Set
            tmsp_update_end = clock_timestamp()::timestamp;

        /******
         * Return true for indicating that tehere has been an update
         *******/
        Return True;
    Else
        /*
         * Return false for indicating that there has been no update
         */
        Return False;
    End If;
End;
$BODY$;

