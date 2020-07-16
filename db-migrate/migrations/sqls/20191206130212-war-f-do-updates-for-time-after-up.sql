Create Or Replace Function warehouse.do_updates_for_time_after (
    tmsp timestamp without time zone
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    t_row record;
Begin
    For t_row In (
        /**********
         * Selects the pk_entities that need to be updated.
         *
         * takes only the latest item for each pk_entity and project.
         * this helps to skip unneeded intermediate updates. For example:
         * Those update requests:
         * - entity 207386, project 24, is_in_project true
         * - entity 207386, project 24, is_in_project false
         * - entity 207386, project 82, is_in_project true
         * - entity 207386, project 24, is_in_project true
         *
         * is reduced to the latest ones per project and entity:
         * - entity 207386, project 24, is_in_project true
         * - entity 207386, project 82, is_in_project true
         *
         * also takes only pk_entity of persistent_item or temporal_entity
         * by joining a union of information.persistent_item and information.temporal_entity
         *
         * also takes only pk_entity of items that have a info_proj_rel.
         * this excludes entities that are related by project's properties (roles) but are not in project
         * themselfes.
         ***********/
        With tw1 As (
            Select
                t1.fk_entity,
                t1.fk_project,
                t1.tmsp_last_modification::timestamp
            From
                projects.info_proj_rel t1
            Where
                t1.tmsp_last_modification::timestamp >= tmsp),
            -- select fk_entity and fk_project of all affected persistent_items and temporal_entities
            tw2 As (
                -- persistent_items where info_proj_rel changed
                Select
                    t1.pk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.persistent_item t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- temporal_entities where info_proj_rel changed
                Select
                    t1.pk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.temporal_entity t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- domain entities of roles where info_proj_rel changed
                Select
                    t1.fk_temporal_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.role t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- range entities of roles where info_proj_rel changed
                Select
                    t1.fk_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.role t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- domain entities of entity_associations where info_proj_rel changed
                Select
                    t1.fk_info_domain As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.entity_association t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- range entities of entity_associations where info_proj_rel changed
                Select
                    t1.fk_info_range As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.entity_association t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity
                Union All
                -- concerned entities of text_properties where info_proj_rel changed
                Select
                    t1.fk_concerned_entity As fk_entity,
                    t2.fk_project,
                    t2.tmsp_last_modification
                From
                    information.text_property t1,
                    tw1 t2
                Where
                    t1.pk_entity = t2.fk_entity),
                tw3 As (
                    Select Distinct On (t1.fk_project,
                        t1.fk_entity)
                        t1.fk_project,
                        t1.fk_entity,
                        t2.is_in_project,
                        t1.tmsp_last_modification
                    From
                        tw2 t1,
                        projects.info_proj_rel t2
                    Where
                        t1.fk_entity = t2.fk_entity
                        And t1.fk_project = t2.fk_project
                    Order By
                        t1.fk_project,
                        t1.fk_entity,
                        t1.tmsp_last_modification Desc)
                /**********
                 * Group the remaining update request by is_in_project and fk_projects
                 ***********/
                Select
                    is_in_project,
                    fk_project,
                    array_agg(fk_entity) pk_entities --, count(pk_entity)
                From
                    tw3
                Group By
                    fk_project,
                    is_in_project)
            /*******
             * Perform the updates on entity_preview_non_recursive
             *******/
            Loop
                If (t_row.is_in_project = True) Then
                    Perform
                        warehouse.entity_preview_non_recursive__upsert (t_row.pk_entities,
                            t_row.fk_project);
                    --RAISE INFO 'upserted entity_preview_non_recursive for fk_project: %, pk_entities: %', t_row.fk_project, t_row.pk_entities;
                    ELSEIF (t_row.is_in_project = False) Then
                    Perform
                        warehouse.entity_preview_non_recursive__delete (t_row.pk_entities,
                            t_row.fk_project);
                End If;
            End Loop;
End;
$BODY$;

