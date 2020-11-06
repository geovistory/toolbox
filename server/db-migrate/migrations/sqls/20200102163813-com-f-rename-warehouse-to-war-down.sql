-- 3
Create Or Replace Function commons.clone_sandbox_project (
    account_id integer
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    pk_sandbox_project int;
    fk_project_default_language int;
    fk_system_type__project_label int;
    fk_system_type__project_description int;
    project_label varchar;
    project_description varchar;
    pk_new_project int;
    pk_new_default_namespace int;
Begin
    -- pk_entity of the sandbox project
    pk_sandbox_project = 375232;
    -- default language = english
    fk_project_default_language = 18889;
    -- system type for project label
    fk_system_type__project_label = 639;
    -- system type for project description
    fk_system_type__project_description = 638;
    -- the label of the new project
    project_label = 'Sandbox Project';
    -- the description of the new project
    project_description = 'This is a sandbox project. You can use it to explore the functionalities of Geovistory BETA and experiment with them. Enjoy!';

    /*
     * create the project
     */
    Insert Into projects.project (fk_language, fk_cloned_from_project)
    Values (fk_project_default_language, pk_sandbox_project) On Conflict Do NOTHING
Returning
    pk_entity Into pk_new_project;

    /*
     * add label of project
     */
    Insert Into projects.text_property (fk_entity, string, fk_system_type, fk_language)
    Values (pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

    /*
     * add description of project
     */
    Insert Into projects.text_property (fk_entity, string, fk_system_type, fk_language)
    Values (pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

    /*
     * add dfh to project
     */
    Insert Into projects.dfh_class_proj_rel (fk_project, fk_entity, enabled_in_entities)
Select
    pk_new_project As fk_project,
    fk_entity,
    enabled_in_entities
From
    projects.dfh_class_proj_rel
Where
    fk_project = pk_sandbox_project;

    /*
     * add default namespace to project
     */
    Insert Into data.namespace (fk_project, standard_label)
    Values (pk_new_project, 'Default Namespace')
Returning
    pk_entity Into pk_new_default_namespace;

    /*
     * add account to project
     */
    Insert Into public.account_project_rel (fk_project, account_id, Role)
    Values (pk_new_project, account_id, 'owner');

    /*
     * add all information to project except for entity_associations referencing to data
     */
    With tw1 As (
        /*
         * select all info_proj_rel of sandbox except those that are
         * referencing an entity_association associating entities in data schema
         */
        Select
            t1.pk_entity
        From
            projects.info_proj_rel t1
        Where
            fk_project = pk_sandbox_project
        Except
        Select
            t1.pk_entity
        From
            projects.info_proj_rel t1,
            information.entity_association t2
        Where
            fk_project = pk_sandbox_project
            And t1.fk_entity = t2.pk_entity
            And (t2.fk_cell_domain Is Not Null
                Or t2.fk_cell_range Is Not Null
                Or t2.fk_data_domain Is Not Null
                Or t2.fk_data_range Is Not Null))
    Insert Into projects.info_proj_rel (fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, calendar, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version)
Select
    pk_new_project As fk_project,
    t1.fk_entity,
    t1.fk_entity_version,
    t1.fk_entity_version_concat,
    t1.is_in_project,
    t1.is_standard_in_project,
    t1.calendar,
    t1.ord_num_of_domain,
    t1.ord_num_of_range,
    t1.ord_num_of_text_property,
    t1.entity_version
From
    projects.info_proj_rel t1,
    tw1 t2
Where
    t1.pk_entity = t2.pk_entity;

    /*
     * copy digitals from sandbox namespace to project's namespace, keeping track of the original pk_entity (in metadata, fk_cloned_from)
     */
    Insert Into data.digital (fk_namespace, fk_system_type, quill_doc, metadata)
    -- Select all digitals of sandbox project
    Select
        pk_new_default_namespace As fk_namespace,
        t2.fk_system_type,
        t2.quill_doc,
        jsonb_build_object('fk_cloned_from', t2.pk_entity)
    From
        data.namespace t1,
        data.digital t2
    Where
        t1.fk_project = pk_sandbox_project
        And t1.pk_entity = t2.fk_namespace;

    /*
     * copy entity_associations pointing to digitals, using the pk_entity of the above created, where fk_cloned_from
     * and add them to the project
     */
    Insert Into information.entity_association (fk_data_domain, fk_data_range, fk_info_domain, fk_info_range, fk_property, fk_cell_domain, fk_cell_range, metadata)
    -- select entity_associations pointing to the new digital's fk_cloned_from
    Select
        t3.pk_entity As fk_data_domain, -- pk of new digital
        t2.fk_data_range,
        t2.fk_info_domain,
        t2.fk_info_range,
        t2.fk_property,
        t2.fk_cell_domain,
        t2.fk_cell_range,
        jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
    From
        projects.info_proj_rel t1,
        information.entity_association t2,
        data.digital t3
    Where
        fk_project = pk_sandbox_project
        And t1.is_in_project = True
        And t1.fk_entity = t2.pk_entity
        And t2.fk_data_domain = (t3.metadata ->> 'fk_cloned_from')::int
        And t3.fk_namespace = pk_new_default_namespace;

    /*
     * copy chunks from sandbox namespace to project's namespace, keeping track of original pk_entity (in metadata, fk_cloned_from)
     */
    Insert Into data.chunk (fk_namespace, quill_doc, fk_text, fk_entity_version, metadata)
    -- Select all chunks of sandbox project
    Select
        pk_new_default_namespace As fk_namespace,
        t2.quill_doc,
        t4.pk_text,
        t4.entity_version,
        jsonb_build_object('fk_cloned_from', t2.pk_entity)
    From
        data.namespace t1,
        data.chunk t2,
        data.digital t3,
        data.digital t4
    Where
        t1.fk_project = pk_sandbox_project
        And t1.pk_entity = t2.fk_namespace
        And t3.pk_text = t2.fk_text
        And t3.entity_version = t2.fk_entity_version
        And (t4.metadata ->> 'fk_cloned_from')::int = t3.pk_entity;

    /*
     * copy entity_associations pointing to chunks, using the pk_entity of the above created, where fk_cloned_from
     * and add them to the project
     */
    Insert Into information.entity_association (fk_data_domain, fk_data_range, fk_info_domain, fk_info_range, fk_property, fk_cell_domain, fk_cell_range, metadata)
    -- select entity_associations pointing to the new chunk's fk_cloned_from
    Select
        t3.pk_entity As fk_data_domain, -- pk of new digital
        t2.fk_data_range,
        t2.fk_info_domain,
        t2.fk_info_range,
        t2.fk_property,
        t2.fk_cell_domain,
        t2.fk_cell_range,
        jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
    From
        projects.info_proj_rel t1,
        information.entity_association t2,
        data.chunk t3
    Where
        t1.fk_project = pk_sandbox_project
        And t1.is_in_project = True
        And t1.fk_entity = t2.pk_entity
        And t2.fk_data_domain = (t3.metadata ->> 'fk_cloned_from')::int
        And t3.fk_namespace = pk_new_default_namespace;
    -- make sure this is a chunk of this new project's namespace
    /*
     * Add the entity_associations pointing to data to the new project
     */
    Insert Into projects.info_proj_rel (fk_entity, fk_project, is_in_project)
Select
    t1.pk_entity As fk_entity,
    pk_new_project As fk_project,
    True As is_in_project
From
    information.entity_association t1,
    data.entity t2
Where
    t1.fk_data_domain = t2.pk_entity
    And t2.fk_namespace = pk_new_default_namespace;

    /*
     * Clone all entity_preview_non_recursive from sandbox project
     * so that warehouse for this project is ready instantly
     */
    Insert Into warehouse.entity_preview_non_recursive (pk_entity, fk_class, fk_project, table_name, class_label, own_full_text, own_entity_label, time_span, related_full_texts, fk_entity_label, fk_type)
Select
    pk_entity,
    fk_class,
    pk_new_project As fk_project,
    table_name,
    class_label,
    own_full_text,
    own_entity_label,
    time_span,
    related_full_texts,
    fk_entity_label,
    fk_type
From
    warehouse.entity_preview_non_recursive
Where
    fk_project = pk_sandbox_project On Conflict (pk_entity, coalesce(fk_project, 0))
    Do NOTHING;

    /*
     * Clone all entity_previews from sandbox project
     * so that warehouse for this project is ready instantly
     */
    Insert Into warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, own_full_text, fk_entity_label, fk_type, related_full_texts, full_text, ts_vector)
Select
    pk_entity,
    pk_new_project As fk_project,
    pk_new_project As project,
    fk_class,
    entity_type,
    class_label,
    entity_label,
    time_span,
    own_full_text,
    fk_entity_label,
    fk_type,
    related_full_texts,
    full_text,
    ts_vector
From
    warehouse.entity_preview
Where
    fk_project = pk_sandbox_project On Conflict On Constraint entity_preview_unique Do NOTHING;

    /*
     * Clone query
     */
    Insert Into projects.query (fk_last_modifier, name, description, query, fk_project, fk_cloned_from_query)
Select
    account_id As fk_last_modifier,
    name,
    description,
    query,
    pk_new_project As fk_project,
    pk_entity
From
    projects.query
Where
    fk_project = pk_sandbox_project;

    /*
     * Clone visual
     */
    Insert Into projects.visual (fk_last_modifier, name, description, visual, fk_project)
    With tw1 As (
        -- unnest all queryLayers
        Select
            pk_entity,
            visual,
            jsonb_array_elements(visual -> 'settings' -> 'queryLayers') As layer
        From
            projects.visual
        Where
            fk_project = pk_sandbox_project),
        tw2 As (
            -- replace the pk of original query with pk of new query and set queryVersion=1
            Select
                t1.pk_entity,
                t1.visual,
                jsonb_set(jsonb_set(t1.layer, '{queryPk}', t2.pk_entity::text::jsonb), '{queryVersion}', '1'::jsonb) As modified_layer
            From
                tw1 t1,
                projects.query t2
            Where
                t2.fk_project = pk_new_project
                And t2.fk_cloned_from_query = (t1.layer ->> 'queryPk')::integer),
            tw3 As (
                -- aggregate modified query layers and insert them into the visuals object
                Select
                    t1.pk_entity,
                    jsonb_set(t1.visual, '{settings,queryLayers}', jsonb_agg(t1.modified_layer)) As modified_visual
                From
                    tw2 t1
                Group By
                    t1.pk_entity,
                    t1.visual
)
            Select
                account_id As fk_last_modifier,
                t2.name,
                t2.description,
                t1.modified_visual As visual,
                pk_new_project As fk_project
            From
                tw3 t1,
                projects.visual t2
            Where
                t1.pk_entity = t2.pk_entity;
End;
$BODY$;

-- 2
Create Or Replace Function commons.analysis__time_chart_cont__czml_time_values (
    param_pk_entities integer[],
    param_project integer
)
    Returns jsonb
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    res jsonb;
Begin
    With tw0 As (
        -- temporal entities
        Select
            first_second,
            last_second,
            pk_entity
        From
            warehouse.entity_preview
        Where
            pk_entity = Any (param_pk_entities)
            And project = param_project
            And first_second Is Not Null
            And last_second Is Not Null
),
tw1 As (
    Select
        first_second julian_second,
        pk_entity
    From
        tw0
    Union
    Select
        last_second julian_second,
        pk_entity
    From
        tw0
    Order By
        1
),
tw2 As (
    Select Distinct On (julian_second)
        julian_second
    From
        tw1
),
tw3 As (
    Select
        julian_second,
        row_number() Over () pk,
        (row_number() Over () + 1) fk_next
From tw2
),
tw4 As (
    Select
        t1.julian_second x1,
        t2.julian_second x2
    From
        tw3 t1,
        tw3 t2
    Where
        t1.fk_next = t2.pk
),
tw5 As (
    Select
        t1.x1,
        t1.x2,
        -- for czml we need to remove a very little ms here to that the x vals stay unique
        commons.julian_second__to_iso_8601 (t1.x1 + 1) iso_x1,
        commons.julian_second__to_iso_8601 (t1.x2) iso_x2,
        coalesce(json_agg(t2.pk_entity) Filter (Where t2.pk_entity Is Not Null), '[]') As data,
        count(t2.pk_entity)
    From
        tw4 t1
    Left Join tw0 t2 On t2.first_second < t1.x2
        And t2.last_second > t1.x1
Group By
    t1.x1,
    t1.x2
Order By
    t1.x1
),
tw6 As (
    -- select the very first point
    Select
        x1 x,
        commons.julian_second__to_iso_8601 (x1 - 1) iso_x,
        0 y,
        '[]'::json As data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Order By
        x1
    Limit 1
),
tw7 As (
    -- select the very last point
    Select
        x2 x,
        commons.julian_second__to_iso_8601 (x2 + 1) iso_x,
        0 y,
        '[]'::json As data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Order By
        x1 Desc
    Limit 1
),
tw8 As (
    -- first point
    Select
        0,
        x,
        iso_x,
        y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw6
    Union All
    -- all other points
    Select
        2,
        x1 x,
        iso_x1 iso_x,
        count y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Union All
    Select
        1,
        x2 x,
        iso_x2 iso_x,
        count y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw5
    Union All
    -- last point
    Select
        3,
        x,
        iso_x,
        y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From
        tw7
    Order By
        x,
        1
),
tw9 As (
    Select
        row_number() Over () data_id,
        x,
        iso_x,
        y,
        data,
        x1,
        x2,
        iso_x1,
        iso_x2
    From tw8
)
Select
    json_build_object('data_lookup', coalesce(jsonb_object_agg(tw9.data_id, tw9.data), '{}'::jsonb), 'timeCzmlValues', coalesce(jsonb_agg(json_build_object('iso_x', tw9.iso_x, 'y', tw9.y, 'data_ref', tw9.data_id::text)), '[]'::jsonb), 'timeLinePoints', coalesce(jsonb_agg(json_build_object('x', tw9.x, 'y', tw9.y, 'data_ref', tw9.data_id::text)), '[]'::jsonb)) Into res
From
    tw9;
    Return res;
End;
$BODY$;

-- 1
Create Or Replace Function commons.analysis__create_temporal_distribution (
    param_pk_entities integer[],
    param_project integer
)
    Returns jsonb
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    res jsonb;
Begin
    With tw0 As (
        Select
            first_second,
            last_second,
            pk_entity
        From
            warehouse.entity_preview
        Where
            pk_entity = Any (param_pk_entities)
            And project = param_project
            And first_second Is Not Null
            And last_second Is Not Null
),
tw1 As (
    Select
        first_second julian_second,
        pk_entity
    From
        tw0
    Union
    Select
        last_second julian_second,
        pk_entity
    From
        tw0
    Order By
        1
),
tw2 As (
    Select Distinct On (julian_second)
        julian_second
    From
        tw1
),
tw3 As (
    Select
        julian_second,
        row_number() Over () pk,
        (row_number() Over () + 1) fk_next
From tw2
),
tw4 As (
    Select
        t1.julian_second x1,
        t2.julian_second x2
    From
        tw3 t1,
        tw3 t2
    Where
        t1.fk_next = t2.pk
),
tw5 As (
    Select
        t1.x1,
        t1.x2,
        -- for czml we need to remove a very little ms here to that the x vals stay unique
        json_strip_nulls (json_agg(t2.pk_entity)) As data,
        count(t2.pk_entity)
    From
        tw4 t1
    Left Join tw0 t2 On t2.first_second < t1.x2
        And t2.last_second > t1.x1
Group By
    t1.x1,
    t1.x2
Order By
    t1.x1
),
tw6 As (
    -- select the very first point
    Select
        x1 x,
        0 y,
        '[]'::json As data,
        x1,
        x2
    From
        tw5
    Order By
        x1
    Limit 1
),
tw7 As (
    -- select the very last point
    Select
        x2 x,
        0 y,
        '[]'::json As data,
        x1,
        x2
    From
        tw5
    Order By
        x1 Desc
    Limit 1
),
tw8 As (
    -- first point
    Select
        0,
        x,
        y,
        data,
        x1,
        x2
    From
        tw6
    Union All
    -- all other points
    Select
        2,
        x1 x,
        count y,
        data,
        x1,
        x2
    From
        tw5
    Union All
    Select
        1,
        x2 x,
        count y,
        data,
        x1,
        x2
    From
        tw5
    Union All
    -- last point
    Select
        3,
        x,
        y,
        data,
        x1,
        x2
    From
        tw7
    Order By
        x,
        1
)
Select
    jsonb_agg(json_build_object('x', x, 'y', y, 'data', data)) Into res
From
    tw8;
    Return coalesce(res, '[]'::jsonb);
End;
$BODY$;

