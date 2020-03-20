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
        Values (fk_project_default_language, pk_sandbox_project)
    On Conflict
        Do Nothing
    Returning
        pk_entity Into pk_new_project;

    /*
     * add label of project
     */
    Insert Into projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
        Values (pk_new_project, pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

    /*
     * add description of project
     */
    Insert Into projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
        Values (pk_new_project, pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

    /*
     * add dfh profiles to project
     */
    Insert Into projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
    Select
        pk_new_project As fk_project,
        fk_profile,
        enabled
    From
        projects.dfh_profile_proj_rel
    Where
        fk_project = pk_sandbox_project;

    /*
     * add dfh classes to project
     */
    Insert Into projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
    Select
        pk_new_project As fk_project,
        fk_class,
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
     * add all information to project except for roles referencing to data
     */
    With tw1 As (
        /*
         * select all info_proj_rel of sandbox except those that are
         * referencing an role associating entities in data schema
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
            information.role t2
        Where
            fk_project = pk_sandbox_project
            And t1.fk_entity = t2.pk_entity
            And (t2.fk_tables_subject Is Not Null
                Or t2.fk_tables_object Is Not Null
                Or t2.fk_data_subject Is Not Null
                Or t2.fk_data_object Is Not Null))
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
     * copy roles pointing to digitals, using the pk_entity of the above created, where fk_cloned_from
     * and add them to the project
     */
    Insert Into information.role (fk_data_subject, fk_data_object, fk_temporal_entity, fk_entity, fk_property, fk_tables_subject, fk_tables_object, metadata)
    -- select roles pointing to the new digital's fk_cloned_from
    Select
        t3.pk_entity As fk_data_subject, -- pk of new digital
        t2.fk_data_object,
        t2.fk_temporal_entity,
        t2.fk_entity,
        t2.fk_property,
        t2.fk_tables_subject,
        t2.fk_tables_object,
        jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
    From
        projects.info_proj_rel t1,
        information.role t2,
        data.digital t3
    Where
        fk_project = pk_sandbox_project
        And t1.is_in_project = True
        And t1.fk_entity = t2.pk_entity
        And t2.fk_data_subject = (t3.metadata ->> 'fk_cloned_from')::int
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
     * copy roles pointing to chunks, using the pk_entity of the above created, where fk_cloned_from
     * and add them to the project
     */
    Insert Into information.role (fk_data_subject, fk_data_object, fk_temporal_entity, fk_entity, fk_property, fk_tables_subject, fk_tables_object, metadata)
    -- select roles pointing to the new chunk's fk_cloned_from
    Select
        t3.pk_entity As fk_data_subject, -- pk of new digital
        t2.fk_data_object,
        t2.fk_temporal_entity,
        t2.fk_entity,
        t2.fk_property,
        t2.fk_tables_subject,
        t2.fk_tables_object,
        jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
    From
        projects.info_proj_rel t1,
        information.role t2,
        data.chunk t3
    Where
        t1.fk_project = pk_sandbox_project
        And t1.is_in_project = True
        And t1.fk_entity = t2.pk_entity
        And t2.fk_data_subject = (t3.metadata ->> 'fk_cloned_from')::int
        And t3.fk_namespace = pk_new_default_namespace;
    -- make sure this is a chunk of this new project's namespace
    /*
     * Add the roles pointing to data to the new project
     */
    Insert Into projects.info_proj_rel (fk_entity, fk_project, is_in_project)
    Select
        t1.pk_entity As fk_entity,
        pk_new_project As fk_project,
        True As is_in_project
    From
        information.role t1,
        data.entity t2
    Where
        t1.fk_data_subject = t2.pk_entity
        And t2.fk_namespace = pk_new_default_namespace;

    /*
     * Clone all entity_previews from sandbox project
     * so that warehouse for this project is ready instantly
     */
    Insert Into war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, fk_type, type_label, full_text, ts_vector, first_second, last_second, tmsp_last_modification)
    Select
        pk_entity,
        pk_new_project As fk_project,
        pk_new_project As project,
        fk_class,
        entity_type,
        class_label,
        entity_label,
        time_span,
        fk_type,
        type_label,
        full_text,
        ts_vector,
        first_second,
        last_second,
        tmsp_last_modification
    From
        war.entity_preview
    Where
        fk_project = pk_sandbox_project
    On Conflict On Constraint war_entity_preview_unique
        Do Nothing;

    /*
     * Clone analysis
     */
    Insert Into projects.analysis (fk_last_modifier, fk_project, fk_analysis_type, name, description, analysis_definition)
    Select
        account_id As fk_last_modifier,
        pk_new_project As fk_project,
        fk_analysis_type,
        name,
        description,
        analysis_definition
    From
        projects.analysis
    Where
        fk_project = pk_sandbox_project;
End;
$BODY$;

