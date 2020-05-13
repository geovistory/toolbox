-- 1 rename information.statement -> role
Alter Table information.statement Rename To Role;

-- 2 rename information.statement_vt -> role_vt
Alter Table information.statement_vt Rename To role_vt;

-- 3 rename column information.role (fk_subject_info) -> (fk_temporal_entity)
Alter Table information.role Rename Column fk_subject_info To fk_temporal_entity;

-- 4 rename column information.role_vt (fk_subject_info) -> (fk_temporal_entity)
Alter Table information.role_vt Rename Column fk_subject_info To fk_temporal_entity;

-- 5 rename column information.role (fk_object_info) -> (fk_entity)
Alter Table information.role Rename Column fk_object_info To fk_entity;

-- 6 rename column information.role_vt (fk_object_info) -> (fk_entity)
Alter Table information.role_vt Rename Column fk_object_info To fk_entity;

-- 7 drop view information.v_statement
Drop View information.v_statement;

-- 8 create view information.v_role
Create Or Replace View information.v_role As
Select
    t1.pk_entity,
    t1.fk_property,
    t1.fk_property_of_property,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_subject_data,
    t1.fk_subject_tables_row,
    t1.fk_subject_tables_cell,
    t1.fk_object_data,
    t1.fk_object_tables_row,
    t1.fk_object_tables_cell,
    t2.is_in_project_count,
    t2.is_standard_in_project_count,
    t2.community_favorite_calendar,
    t1.notes,
    t1.tmsp_creation,
    t1.tmsp_last_modification,
    t1.sys_period
From
    information.role t1
    Left Join Lateral (
        Select
            count(info_proj_rel.pk_entity)::integer As is_in_project_count,
            coalesce(count(*) Filter (Where info_proj_rel.ord_num_of_domain = 0), 0::bigint)::integer As is_standard_in_project_count,
            mode() Within Group (Order By info_proj_rel.calendar) As community_favorite_calendar
        From
            projects.info_proj_rel
        Where
            info_proj_rel.fk_entity = t1.pk_entity
            And info_proj_rel.is_in_project = True Group By
                info_proj_rel.fk_entity) t2 On True;

-- 9 rename trigger function v_statement_find_or_create() -> v_role_find_or_create
Alter Function information.v_statement_find_or_create Rename To v_role_find_or_create;

--  fn-1 refactor function commons.get_entity_appellation
Create Or Replace Function commons.get_entity_appellation (
    pk_entity integer
)
    Returns character varying
    Language 'sql'
    Cost 100 Volatile
    As $BODY$
    Select
        t3.string
    From
        information.role t1,
        information.role t2,
        information.appellation t3
    Where
        t1.fk_entity = $1
        And t2.fk_temporal_entity = t1.fk_temporal_entity
        And t2.fk_property = 1113
        And t2.fk_entity = t3.pk_entity;

$BODY$;

--  fn-2 refactor function information.get_outgoing_roles_to_add
Drop Function information.get_outgoing_statements_to_add;

Create Or Replace Function information.get_outgoing_roles_to_add (
    entity_id integer,
    project_id integer
)
    Returns Table (
            pk_entity integer,
            fk_entity integer,
            fk_temporal_entity integer,
            calendar calendar_type
)
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        -- select profiles the project
        Select
            fk_profile
        From
            projects.dfh_profile_proj_rel
        Where
            fk_project = project_id
        Union
        Select
            5 As fk_profile -- GEOVISTORY BASICS
),
tw2 As (
    -- select properties of the project
    Select Distinct On (pk_property,
        has_domain,
        has_range)
        pk_property,
        has_domain,
        has_range,
        range_instances_max_quantifier
    From
        tw1 t1,
        data_for_history.api_property t2,
        data_for_history.v_property t3
    Where
        t1.fk_profile = t2.dfh_fk_profile
        And t3.pk_property = t2.dfh_pk_property
),
tw3 As (
    -- select all outgoing roles, joined with range and domain class
    Select
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t3.fk_class range_class,
        t1.fk_property,
        Case When t4.range_instances_max_quantifier = - 1 Then
            FLOAT8 '+infinity'
        When t4.range_instances_max_quantifier Is Null Then
            FLOAT8 '+infinity'
        Else
            t4.range_instances_max_quantifier
        End target_max_quantifier,
        t1.is_in_project_count,
        -- counts the items of same domain and property
        row_number() Over (Partition By t3.fk_class,
            t1.fk_property Order By is_in_project_count Desc) As rank,
        t1.community_favorite_calendar calendar
    From
        information.v_role t1,
        information.v_entity_class_map t2,
        information.v_entity_class_map t3,
        tw2 t4
    Where
        fk_temporal_entity = entity_id
        And t1.fk_temporal_entity = t2.pk_entity
        And t1.fk_entity = t3.pk_entity
        And t1.fk_property = t4.pk_property
        And t1.is_in_project_count > 0
        And t4.has_domain In (t2.fk_class, 50 -- make every class to a timespan class
)
        And t3.fk_class = t4.has_range
)
Select
    pk_entity,
    fk_entity,
    fk_temporal_entity,
    calendar
From
    tw3
Where
    target_max_quantifier >= rank;

$BODY$;

--  fn-3 ADD function information.relate_outgoing_roles_with_te_ens_to_project
Create Or Replace Function information.relate_outgoing_roles_with_te_ens_to_project (
    param_pk_roles integer[],
    param_pk_project integer,
    param_account_id integer,
    param_is_in_project boolean
)
    Returns Setof projects.info_proj_rel
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    /**
     * Changes relation of temporal entities to project that are domain of given roles.
     *
     * For each temporal entity, select:
     *
     * * General properties
     *
     * Appellations
     * - incoming roles of property 'has appellation for language' and is_in_projects_count > 0
     *	- temporal entities of class 'appellation use for language'
     *		- outgoing roles of those 'appellation use for languages',
     *			while in each group of property not more then the max quantifier allows
     *
     * Type
     * - max. one outgoing role fullfilling those criteria
     *		- it is of a has-type subproperty
     *		- it is the role with highes is_in_projects_count
     *		- is_in_projects_count > 0
     *
     * Text Properties
     * - All related text_properties that are in at least one project
     *
     * * Specific properties
     *
     * Outgoing Roles
     * - outgoing role of properties, fullfilling those criteria:
     *	- property is enabled by the given project
     *	- max number of roles per property is not bigger than max range quantifier
     *	- role is_in_projects_count > 0
     *
     */
    /*
     *
     */
    With tw01 As (
        -- select the ingoing roles
        Select
            pk_entity,
            fk_temporal_entity
        From
            information.v_role
        Where
            pk_entity In (
                Select
                    (unnest(param_pk_roles)))
),
tw02 As (
    -- select the ids of the temproal entities
    Select
        fk_temporal_entity As pk_entity
    From
        tw01
),
/*
 * General properties
 */
tw1 As (
    -- select roles 'has appellation for language'
    Select
        t1.pk_entity,
        t1.fk_temporal_entity
    From
        information.v_role t1,
        tw02 t2
    Where
        t1.fk_entity = t2.pk_entity
        And t1.fk_property = 1111
        And t1.is_in_project_count > 0
),
tw2 As (
    -- select temporal entities 'appellation use for language'
    Select
        fk_temporal_entity As pk_entity
    From
        tw1
),
tw3 As (
    -- select outgoing roles of those 'appellation use for languages'
    Select
        t2.pk_entity,
        calendar
    From
        tw2 t1
        Cross Join Lateral (
            Select
                *
            From
                information.get_outgoing_roles_to_add (t1.pk_entity, param_pk_project)) As t2
),
tw4 As (
    -- select has type role
    Select
        t1.pk_entity
    From
        information.v_role t1,
        data_for_history.v_property t2,
        tw02 t3
    Where
        t1.fk_temporal_entity = t3.pk_entity
        And t1.fK_property = t2.pk_property
        And t2.is_has_type_subproperty
        And t1.is_in_project_count > 0
    Order By
        t1.is_in_project_count Desc
    Limit 1
),
tw5 As (
    -- select text properties
    Select Distinct
        t1.pk_entity
    From
        information.text_property t1,
        projects.info_proj_rel t2,
        tw02 t3
    Where
        t1.fk_concerned_entity = t3.pk_entity
        And t1.pk_entity = t2.fk_entity
        And t2.is_in_project = True
),
/**
 * Specific properties
 */
tw6 As (
    -- select outgoing roles of the temporal entities
    Select
        t2.pk_entity,
        calendar
    From
        tw02 t1
        Cross Join Lateral (
            Select
                *
            From
                information.get_outgoing_roles_to_add (t1.pk_entity, param_pk_project)) As t2
),
tw7 As (
    -- union all entities to add to project
    Select
        pk_entity,
        Null::calendar_type calendar
    From
        tw02
Union
Select
    pk_entity,
    Null::calendar_type calendar
From
    tw1
Union
Select
    pk_entity,
    Null::calendar_type calendar
From
    tw2
Union
Select
    pk_entity,
    calendar calendar
From
    tw3
Union
Select
    pk_entity,
    Null::calendar_type calendar
From
    tw4
Union
Select
    pk_entity,
    Null::calendar_type calendar
From
    tw5
Union
Select
    pk_entity,
    calendar calendar
From
    tw6)
    Insert Into projects.info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
    Select
        param_pk_project,
        param_is_in_project,
        pk_entity,
        calendar,
        param_account_id
    From
        tw7 t1
    On Conflict On Constraint entity_version_project_rel_fk_entity_fk_project_key
        Do Update Set
            is_in_project = EXCLUDED.is_in_project,
            calendar = EXCLUDED.calendar,
            fk_last_modifier = EXCLUDED.fk_last_modifier
        Returning
            *;

$BODY$;

--  fn-4 ADD function information.add_pe_it_to_project
Create Or Replace Function information.add_pe_it_to_project (
    param_pk_entity integer,
    param_pk_project integer,
    param_account_id integer
)
    Returns void
    Language 'sql'
    Cost 100 Volatile
    As $BODY$
    /**
     * Adds a persistent item to a project, with general properties:
     *
     * Appellations
     * - incoming roles of property 'has appellation for language' and is_in_projects_count > 0
     *	- temporal entities of class 'appellation use for language'
     *		- outgoing roles of those 'appellation use for languages',
     *			while in each group of property not more then the max quantifier allows
     *
     * Type
     * - max. one outgoing role fullfilling those criteria
     *		- it is of a has-type subproperty
     *		- it is the role with highes is_in_projects_count
     *		- is_in_projects_count > 0
     *
     * Text Properties
     * - All related text_properties that are in at least one project
     */
    With tw1 As (
        -- select roles 'has appellation for language'
        Select
            pk_entity,
            fk_temporal_entity
        From
            information.v_role
        Where
            fk_entity = param_pk_entity
            And fk_property = 1111
            And is_in_project_count > 0
),
tw2 As (
    -- select temporal entities 'appellation use for language'
    Select
        fk_temporal_entity As pk_entity
    From
        tw1
),
tw3 As (
    -- select outgoing roles of those 'appellation use for languages'
    Select
        t2.pk_entity,
        calendar
    From
        tw2 t1
        Cross Join Lateral (
            Select
                *
            From
                information.get_outgoing_roles_to_add (t1.pk_entity, param_pk_project)) As t2
),
tw4 As (
    -- select has type role
    Select
        t1.pk_entity
    From
        information.v_role t1,
        data_for_history.v_property t2
    Where
        t1.fk_temporal_entity = param_pk_entity
        And t1.fK_property = t2.pk_property
        And t2.is_has_type_subproperty
        And t1.is_in_project_count > 0
    Order By
        t1.is_in_project_count Desc
    Limit 1
),
tw5 As (
    -- select text properties
    Select Distinct
        t1.pk_entity
    From
        information.text_property t1,
        projects.info_proj_rel t2
    Where
        t1.fk_concerned_entity = param_pk_entity
        And t1.pk_entity = t2.fk_entity
        And t2.is_in_project = True
),
tw6 As (
    -- union all entities to add to project
    Select
        param_pk_entity pk_entity,
        Null::calendar_type calendar
    Union
    Select
        pk_entity,
        Null::calendar_type calendar
    From
        tw1
    Union
    Select
        pk_entity,
        Null::calendar_type calendar
    From
        tw2
    Union
    Select
        pk_entity,
        calendar calendar
    From
        tw3
    Union
    Select
        pk_entity,
        Null::calendar_type calendar
    From
        tw4
    Union
    Select
        pk_entity,
        Null::calendar_type calendar
    From
        tw5)
    Insert Into projects.info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
    Select
        param_pk_project,
        True,
        pk_entity,
        calendar,
        param_account_id
    From
        tw6 t1
    On Conflict On Constraint entity_version_project_rel_fk_entity_fk_project_key
        Do Update Set
            is_in_project = EXCLUDED.is_in_project,
            calendar = EXCLUDED.calendar,
            fk_last_modifier = EXCLUDED.fk_last_modifier;

$BODY$;

--  fn-5 ADD function information.add_pe_its_to_project
Create Or Replace Function information.add_pe_its_to_projects (
    entity_pks integer[],
    project_pks integer[],
    account_id integer
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    pk_entity int;
    pk_project int;
Begin
    FOREACH pk_entity In Array entity_pks Loop
        FOREACH pk_project In Array project_pks Loop
            Perform
                information.add_pe_it_to_project (pk_entity, pk_project, account_id);
        End Loop;
    End Loop;
End
$BODY$;

--  fn-6 ADD function information.temporal_entity_find_or_create
Create Or Replace Function information.temporal_entity_find_or_create (
    param_fk_class integer,
    param_roles jsonb
)
    Returns information.temporal_entity
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    resulting_row information.temporal_entity;
Begin
    --     -- RAISE INFO 'input values: %', NEW;
    --     ------ if existing, store in result -----
    --     With tw1 As (
    --         -- select the fk_entities of the outgoing roles
    --         Select
    --             *
    --         From
    --             jsonb_to_recordset(param_roles) As x (fk_entity int,
    --                 fk_property int)
    -- ),
    -- tw2 As (
    --     -- select all temporal entities, being domain of a role and as such a candidate
    --     Select
    --         fk_temporal_entity
    --     From
    --         information.role t1,
    --         tw1 t2
    --     Where
    --         t1.fk_entity = t2.fk_entity
    --         And t1.fk_property = t2.fk_property
    -- ),
    -- existing_te_ens As (
    --     Select
    --         t2.fk_temporal_entity,
    --         array_agg(jsonb_build_object('fk_property', t2.fk_property, 'fk_entity', t2.fk_entity)) identity_defining_roles
    --     From
    --         tw2 t1,
    --         information.role t2,
    --         ( Select Distinct On (dfh_pk_property)
    --                 dfh_pk_property,
    --                 dfh_identity_defining
    --             From
    --                 data_for_history.api_property) t3
    --         Where
    --             t1.fk_temporal_entity = t2.fk_temporal_entity
    --             And t3.dfh_pk_property = t2.fk_property
    --             And t3.dfh_identity_defining = True
    --         Group By
    --             t2.fk_temporal_entity
    -- ),
    -- new_te_en As (
    --     Select
    --         array_agg(a.elements::jsonb) roles
    --     From (
    --         Select
    --             1 x,
    --             jsonb_array_elements_text(param_roles) elements) As a
    --     Group By
    --         a.x
    -- )
    -- Select
    --     teEn.*
    -- From
    --     Into resulting_row existing_te_ens
    --     -- Here we check if the roles for the new TeEn do completele contain all the identity defining roles of an existing TeEn
    --     Join new_te_en On new_te_en.roles @> existing_te_ens.identity_defining_roles
    --     Join information.temporal_entity As teEn On teEn.pk_entity = existing_te_ens.fk_temporal_entity
    -- Where
    --     teEn.fk_class = param_fk_class;
    --     -- RAISE EXCEPTION 'resulting_row: %', resulting_row;
    --     -- RAISE INFO 'result of select: %', resulting_row;
    --     ------- if not existing, insert and store in result -----
    --     If Not FOUND Then
    -- RAISE INFO 'Not found, creating new...';
    With _insert As (
Insert Into information.temporal_entity (fk_class)
            Values (param_fk_class)
            -- return all fields of the new row
        Returning
            *)
        Select
            *
        From
            Into resulting_row _insert;
    -- RAISE INFO 'result of insert: %', resulting_row  -- ;
    -- End If;
    Return resulting_row;
End;
$BODY$;

--  fn-7 refactor function information.v_role_find_or_create
Create Or Replace Function information.v_role_find_or_create ()
    Returns Trigger
    Language 'plpgsql'
    Cost 100 Volatile Not Leakproof
    As $BODY$
Declare
    resulting_pk integer;
    resulting_row information.v_role;
Begin
    -- RAISE INFO 'input values: %', NEW;
    ------ if existing, store in result -----
    Select
        pk_entity
    From
        Into resulting_pk information.role
    Where
        fk_property = NEW.fk_property
        And fk_property_of_property = NEW.fk_property_of_property
        And fk_temporal_entity = NEW.fk_temporal_entity
        And fk_subject_data = NEW.fk_subject_data
        And fk_subject_tables_row = NEW.fk_subject_tables_row
        And fk_subject_tables_cell = NEW.fk_subject_tables_cell
        And fk_entity = NEW.fk_entity
        And fk_object_data = NEW.fk_object_data
        And fk_object_tables_row = NEW.fk_object_tables_row
        And fk_object_tables_cell = NEW.fk_object_tables_cell;
    -- RAISE INFO 'result of select: %', resulting_row;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        -- RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.role (fk_property, fk_property_of_property, fk_temporal_entity, fk_subject_data, fk_subject_tables_row, fk_subject_tables_cell, fk_entity, fk_object_data, fk_object_tables_row, fk_object_tables_cell)
                Values (NEW.fk_property, NEW.fk_property_of_property, NEW.fk_temporal_entity, NEW.fk_subject_data, NEW.fk_subject_tables_row, NEW.fk_subject_tables_cell, NEW.fk_entity, NEW.fk_object_data, NEW.fk_object_tables_row, NEW.fk_object_tables_cell)
                -- return all fields of the new row
            Returning
                *)
            Select
                pk_entity
            From
                Into resulting_pk _insert;
        -- RAISE INFO 'result of insert: %', resulting_row;
    End If;
    Select
        *
    From
        Into resulting_row information.v_role
    Where
        pk_entity = resulting_pk;
    Return resulting_row;
End;
$BODY$;

Create Trigger on_insert
    Instead Of INSERT On information.v_role For Each Row
    Execute Procedure information.v_role_find_or_create ();

--  fn-8 refactor function commons.clone_sandbox_project
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
            And (t2.fk_subject_tables_cell != 0
                Or t2.fk_object_tables_cell != 0
                Or t2.fk_subject_tables_row != 0
                Or t2.fk_object_tables_row != 0
                Or t2.fk_subject_data != 0
                Or t2.fk_object_data != 0))
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
    Insert Into information.role (fk_temporal_entity, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_entity, fk_object_data, fk_object_tables_cell, fk_object_tables_row, metadata)
    -- select roles pointing to the new digital's fk_cloned_from
    Select
        coalesce(t2.fk_temporal_entity, 0),
        t3.pk_entity As fk_subject_data, -- pk of new digital
        coalesce(t2.fk_subject_tables_cell, 0),
        coalesce(t2.fk_subject_tables_row, 0),
        coalesce(t2.fk_property, 0),
        coalesce(t2.fk_property_of_property, 0),
        coalesce(t2.fk_entity, 0),
        coalesce(t2.fk_object_data, 0),
        coalesce(t2.fk_object_tables_cell, 0),
        coalesce(t2.fk_object_tables_row, 0),
        jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
    From
        projects.info_proj_rel t1,
        information.role t2,
        data.digital t3
    Where
        fk_project = pk_sandbox_project
        And t1.is_in_project = True
        And t1.fk_entity = t2.pk_entity
        And t2.fk_subject_data = (t3.metadata ->> 'fk_cloned_from')::int
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
        1 As fk_entity_version,
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
        And (t4.metadata ->> 'fk_cloned_from')::int = t3.pk_entity;

    /*
     * copy roles pointing to chunks, using the pk_entity of the above created, where fk_cloned_from
     * and add them to the project
     */
    Insert Into information.role (fk_temporal_entity, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_entity, fk_object_data, fk_object_tables_cell, fk_object_tables_row, metadata)
    -- select roles pointing to the new chunk's fk_cloned_from
    Select
        coalesce(t2.fk_temporal_entity, 0),
        t3.pk_entity As fk_subject_data, -- pk of new chunk
        coalesce(t2.fk_subject_tables_cell, 0),
        coalesce(t2.fk_subject_tables_row, 0),
        coalesce(t2.fk_property, 0),
        coalesce(t2.fk_property_of_property, 0),
        coalesce(t2.fk_entity, 0),
        coalesce(t2.fk_object_data, 0),
        coalesce(t2.fk_object_tables_cell, 0),
        coalesce(t2.fk_object_tables_row, 0),
        jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
    From
        projects.info_proj_rel t1,
        information.role t2,
        data.chunk t3
    Where
        t1.fk_project = pk_sandbox_project
        And t1.is_in_project = True
        And t1.fk_entity = t2.pk_entity
        And t2.fk_subject_data = (t3.metadata ->> 'fk_cloned_from')::int
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
        t1.fk_subject_data = t2.pk_entity
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

-- 10 rename column war.edge (fk_statement) -> (fk_role)
Alter Table war.edge Rename Column fk_statement To fk_role;

--  fn-9 refactor function war.do_updates_for_difference_since
Create Or Replace Function war.do_updates_for_difference_since (
    tmsp timestamp Without time zone
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Declare
    t_row record;
    node_ids war.node_id[];
    t timestamptz := clock_timestamp();
    -- used for DEBUGGING
    enrich_loop_count int := 0;
Begin
    Create TEMP Table changed_info_proj_rel On Commit Drop As
    -- select recently modified info_proj_rels
    Select
        t1.fk_entity, t1.fk_project, t1.is_in_project, t1.tmsp_last_modification
    From
        projects.info_proj_rel t1
    Where
        t1.tmsp_last_modification::timestamp >= tmsp;
    Drop Table If Exists to_enrich;
    Create TEMP Table to_enrich (
        pk_entity int,
        fk_project int
    );

    /*
     * 1. Delete enriched_nodes and entity previews
     *
     * Delete the enriched_nodes and entity_previews of PeIt’s or TeEn’s that have a
     * recently been removed from their project (modified info_proj_rel where
     * is_in_project = false)
     *
     * Read this about temp tables on commit drop:
     * https://stackoverflow.com/questions/10596896/postgresql-thread-safety-for-temporary-tables
     */
    -- DEBUG
    Raise notice '#1.a querying removed_crm_entities...';
    Create TEMP Table removed_crm_entities On Commit Drop As
    With tw1 As (
        -- select recent info_proj_rel where is_in_project = false
        Select
            t1.fk_entity,
            t1.fk_project
        From
            changed_info_proj_rel t1
        Where
            t1.is_in_project = False
),
tw2 As (
-- join persistent_items
Select
    t2.fk_entity,
    t2.fk_project
From
    information.persistent_item t1,
    tw1 t2
    Where
        t1.pk_entity = t2.fk_entity
    Union All
    -- join temporal_entities
    Select
        t2.fk_entity,
        t2.fk_project
    From
        information.temporal_entity t1,
        tw1 t2
    Where
        t1.pk_entity = t2.fk_entity
        )
    Select
        fk_entity, fk_project
    From
        tw2;
    -- DEBUG TIME
    Raise notice '...#1.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#1.b deleting enriched_nodes and entity_previews...';
    -- START DEBUG
    -- show removed_crm_entities (PeIt's and TeEn's)
    For t_row In (
        Select
            *
        From
            removed_crm_entities)
        Loop
            Raise NOTICE 'Node to delete fk_project: %, fk_entity: %', t_row.fk_project, t_row.fk_entity;
        End Loop;
    -- END DEBUG
    -- delete enriched_nodes
    Delete From war.enriched_node t1 Using removed_crm_entities t2
    Where t1.pk_entity = t2.fk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project;
    -- delete entity_previews
    Delete From war.entity_preview t1 Using removed_crm_entities t2
    Where t1.pk_entity = t2.fk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project;
    -- DEBUG TIME
    Raise notice '...#1.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#2.a querying affected_nodes';

    /*
     * 2. Update enriched_node table
     *
     * all enriched_nodes that are possibly affected by the modifications since last update,
     * need to be updated or inserted. Enriched_nodes are possibly affected, if a PeIt or
     * TeEn is added to project, if a role or text_property related to that PeIt or TeEn
     * is changed in its relation to the project.
     */
    Create TEMP Table affected_nodes On Commit Drop As
    /**********
     * Selects the pk_entities of nodes that need to be updated or deleted
     ***********/ With tw1 As (
        Select
            t1.fk_entity,
            t1.fk_project,
            t1.is_in_project,
            t1.tmsp_last_modification
        From
            changed_info_proj_rel t1
),
-- select fk_entity and fk_project of all affected persistent_items and temporal_entities
tw2 As (
-- persistent_items where info_proj_rel changed
Select
    t1.pk_entity As fk_entity,
    t2.fk_project,
    t2.tmsp_last_modification,
    t2.is_in_project
From
    information.persistent_item t1,
    tw1 t2
    Where
        t1.pk_entity = t2.fk_entity And t2.is_in_project = True
    Union All
    -- temporal_entities where info_proj_rel changed
    Select
        t1.pk_entity As fk_entity,
        t2.fk_project,
        t2.tmsp_last_modification,
        t2.is_in_project
    From
        information.temporal_entity t1,
        tw1 t2
    Where
        t1.pk_entity = t2.fk_entity And t2.is_in_project = True
    Union All
    -- domain entities of roles where info_proj_rel changed
    Select
        t1.fk_temporal_entity As fk_entity,
        t2.fk_project,
        t2.tmsp_last_modification,
        t2.is_in_project
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
        t2.tmsp_last_modification,
        t2.is_in_project
    From
        information.role t1,
        tw1 t2
    Where
        t1.pk_entity = t2.fk_entity
    Union All
    -- concerned entities of text_properties where info_proj_rel changed
    Select
        t1.fk_concerned_entity As fk_entity,
        t2.fk_project,
        t2.tmsp_last_modification,
        t2.is_in_project
    From
        information.text_property t1,
        tw1 t2
    Where
        t1.pk_entity = t2.fk_entity
),
tw3 As (
Select Distinct On (t1.fk_project,
    t1.fk_entity )
    t1.fk_project,
    t1.fk_entity,
    t1.is_in_project,
    t1.tmsp_last_modification
From
    tw2 t1
Order By
    t1.fk_project,
    t1.fk_entity,
    t1.tmsp_last_modification Desc )
    /**********
     * Group the remaining update request by is_in_project and fk_projects
     ***********/
    Select
        is_in_project, fk_project, array_agg(fk_entity ) pk_entities --, count(pk_entity)
From
    tw3
Group By
    fk_project, is_in_project;
    -- DEBUG TIME
    Raise notice '...#2.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#2.b upserting affected_nodes...';

    /**
     * Loop over the affected nodes per project and upsert the enriched nodes
     * (the not recursive columns)
     */
    For t_row In (
        Select
            *
        From
            affected_nodes)
        Loop
            -- START DEBUG
            -- Show affected_nodes
            Raise NOTICE 'Nodes to upsert fk_project: %, pk_entities: %', t_row.fk_project, t_row.pk_entities;
            -- END DEBUG
            Insert Into to_enrich
            Select
                pk_entity,
                fk_project
            From
                war.enriched_nodes__upsert_some (t_row.pk_entities, t_row.fk_project);
        End Loop;
    -- DEBUG TIME
    Raise notice '...#2.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#3.a query removed_roles...';

    /*
     * 3. Delete edges
     *
     * Delete the edges of roles that have a recently been removed from their project
     * (modified info_proj_rel where is_in_project = false)
     */
    Create TEMP Table removed_roles On Commit Drop As
    -- select recent info_proj_rel to roles where is_in_project = false
    Select
        t1.fk_entity As fk_role, t1.fk_project, t2.fk_entity, t2.fk_temporal_entity
    From
        changed_info_proj_rel t1, information.role t2
    Where
        t1.is_in_project = False
        And t1.fk_entity = t2.pk_entity;
    -- Add the entities, related to removed roles, to to_enrich
    Insert Into to_enrich
    -- select domain persistent_items
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.persistent_item t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_temporal_entity
    Union All
    -- select range persistent_items
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.persistent_item t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_entity
    Union All
    -- select domain temporal_entities
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.temporal_entity t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_temporal_entity
    Union All
    -- select range temporal_entities
    Select
        t1.pk_entity,
        t2.fk_project
    From
        information.temporal_entity t1,
        removed_roles t2
    Where
        t1.pk_entity = t2.fk_entity;
    -- START DEBUG
    -- show removed_crm_entities (PeIt's and TeEn's)
    For t_row In (
        Select
            *
        From
            removed_roles)
        Loop
            Raise NOTICE 'Edges to delete fk_project: %, fk_role: %', t_row.fk_project, t_row.fk_role;
        End Loop;
    -- END DEBUG
    Raise notice '...#3.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#3.b delete edges...';
    Delete From war.edge t1 Using removed_roles t2
    Where t1.fk_project Is Not Distinct From t2.fk_project
        And t1.fk_role = t2.fk_role;
    -- DEBUG TIME
    Raise notice '...#3.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#4.a query affected roles...';

    /*
     * 4. Update edges
     *
     * All edges that are affected by the modifications since last update need to be updated or inserted.
     */
    Create TEMP Table updated_roles On Commit Drop As
    -- select recent info_proj_rel to roles where is_in_project = false
    Select
        array_agg( t1.fk_entity
    ) As fk_roles, t1.fk_project
From
    changed_info_proj_rel t1, information.role t2
Where
    t1.fk_entity = t2.pk_entity
    And t1.is_in_project = True
Group By
    t1.fk_project;
    Raise notice '...#4.a time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#4.b update edges...';
    -- Update the edges
    For t_row In (
        Select
            *
        From
            updated_roles)
        Loop
            -- DEBUG
            -- show the updated roles
            Raise NOTICE 'Updated roles fk_project: %, fk_roles: %', t_row.fk_project, t_row.fk_roles;
            Insert Into to_enrich
            Select
                fk_source,
                fk_project
            From
                war.edges__upsert_some (t_row.fk_roles, t_row.fk_project);
        End Loop;
    Raise notice '...#4.b time spent=%', clock_timestamp() - t;
    t = clock_timestamp();

    /*
     * 5. Enrich nodes
     *
     * Fill all recursive colums of all enriched_nodes that are not up to date.
     * After this step, the table enriched_node should be in a final state
     * so that the changes can be brought to the table entity_previews
     */
    -- START DEBUG
    Raise notice '#5 enrich nodes...';
    -- show removed_crm_entities (PeIt's and TeEn's)
    For t_row In (
        Select
            *
        From
            to_enrich)
        Loop
            Raise NOTICE 'Initial nodes to_enrich (before loop): fk_project%, pk_entity: %', t_row.fk_project, t_row.pk_entity;
        End Loop;
    -- END DEBUG
    /*******
     * enrich the enriched_nodes
     * Theory:
     * We have a tree of dependencies. The edges relate source to target nodes.
     * source (dependent) nodes depend on target (dependency) nodes.
     * Whenever an edge or a target node change, the source node needs to be (re-)enriched.
     *******/
    WHILE (
        Select
            (count(*) > 0
            And enrich_loop_count <= 50)
        From to_enrich)
    Loop
        -- breac
        -- get the war.node_id[] from to_enrich
        Select
            array_agg(Row (pk_entity, fk_project)::war.node_id) Into node_ids
        From ( Select Distinct
                pk_entity,
                fk_project
            From
                to_enrich) x;
        -- DEBUG
        -- Show node_ids to enrich
        Raise NOTICE 'node_ids from to_enrich %', node_ids;
        -- show number of iterations
        Raise NOTICE 'enrich_loop_count %', enrich_loop_count;
        enrich_loop_count = enrich_loop_count + 1;
        If enrich_loop_count = 50 Then
            Raise WARNING 'enrich_loop_count = 50. node_ids from to_enrich %', node_ids;
        End If;
        -- empty table to_enrich
        Delete From to_enrich;
        -- enrich the nodes and
        -- query keys of nodes that depend on changed nodes
        -- put those source nodes in to_enrich
        Insert Into to_enrich Select Distinct
            t1.fk_source,
            t1.fk_project
        From
            war.edge t1,
            (
                -- enrich the nodes
                Select
                    pk_entity,
                    fk_project
                From
                    war.enriched_nodes__enrich_some (node_ids)) t2
        Where
            t1.fk_target = t2.pk_entity
            And t1.fk_project Is Not Distinct From t2.fk_project;
    End Loop;
    Raise notice '...#5 time spent=%', clock_timestamp() - t;
    t = clock_timestamp();
    Raise notice '#6 update entity_previews...';

    /*
     * 6. Update entity_previews
     *
     * Update all entity_previews with all enriched_nodes where tmsp_last_modification
     * is more recent than last update_log.tmsp_update_end.
     */
    Create TEMP Table modified_enriched_node On Commit Drop As
    With tw1 As (
        -- select the modified enriched_node
        Select
            *
        From
            war.enriched_node t1
        Where
            t1.tmsp_last_modification > tmsp )
        -- Select the entity_previews that are different in one of the columns
        Select
            t1.pk_entity, t1.fk_project, t1.project, t1.entity_type, t1.fk_class, t1.class_label, t1.entity_label, t1.full_text, t1.ts_vector, t1.type_label, t1.fk_type, t1.time_span, t1.first_second, t1.last_second
        From
            tw1 t1
        Except
        Select
            t1.pk_entity, t1.fk_project, t1.project, t1.entity_type, t1.fk_class, t1.class_label, t1.entity_label, t1.full_text, t1.ts_vector, t1.type_label, t1.fk_type, t1.time_span, t1.first_second, t1.last_second
        From
            war.entity_preview t1, tw1 t2
        Where
            t1.pk_entity = t2.pk_entity
            And t1.fk_project Is Not Distinct From t2.fk_project;
    -- Update the edges that are different in one of the non recursive columns
    Update
        war.entity_preview t1
    Set
        pk_entity = t2.pk_entity,
        fk_project = t2.fk_project,
        project = t2.project,
        entity_type = t2.entity_type,
        fk_class = t2.fk_class,
        class_label = t2.class_label,
        entity_label = t2.entity_label,
        full_text = t2.full_text,
        ts_vector = t2.ts_vector,
        type_label = t2.type_label,
        fk_type = t2.fk_type,
        time_span = t2.time_span,
        first_second = t2.first_second,
        last_second = t2.last_second
    From
        modified_enriched_node t2
    Where
        t1.pk_entity = t2.pk_entity
        And t1.fk_project Is Not Distinct From t2.fk_project;
    -- Insert the created edges that do not yet exist
    Insert Into war.entity_preview
    Select
        t1.pk_entity,
        t1.fk_project,
        t1.project,
        t1.entity_type,
        t1.fk_class,
        t1.class_label,
        t1.entity_label,
        t1.full_text,
        t1.ts_vector,
        t1.type_label,
        t1.fk_type,
        t1.time_span,
        t1.first_second,
        t1.last_second
    From
        modified_enriched_node t1
    On Conflict
        Do Nothing;
    Raise notice '...#6 time spent=%', clock_timestamp() - t;
End;
$BODY$;

--  fn-10 refactor function war.edges__create_all
Create Or Replace Function war.edges__create_all ()
    Returns Setof war.edge
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        ---- outgoing edges of project
        Select
            t2.fk_project,
            t1.pk_entity As fk_role,
            t1.fk_temporal_entity As fk_source,
            t1.fk_entity As fk_target,
            t1.fk_property,
            t6.field_order As field_order_of_project,
            t7.field_order As field_order_of_default_project,
            Case When (Exists (
                    Select
                        pk_entity
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = t2.fk_project)) Then
                True
            Else
                False
            End project_has_own_field_order,
            t2.ord_num_of_range As ord_num_within_field,
            t1.is_in_project_count,
            Case When t5.is_has_type_subproperty Then
                'type'::war.edge_target_type
            Else
                'text'::war.edge_target_type
            End As target_provides
        From
            information.v_role t1,
            projects.info_proj_rel t2
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_temporal_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_temporal_entity) As t3 On True
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_entity) As t4 On True,
            data_for_history.v_property t5
        Left Join Lateral (
            Select
                j1.ord_num As field_order
            From
                projects.class_field_config j1
            Where
                j1.fk_property = t5.pk_property
                And j1.fk_domain_class = t5.has_domain
                And j1.fk_project = t2.fk_project) As t6 On True
        Left Join Lateral (
            Select
                j1.ord_num As field_order
            From
                projects.class_field_config j1
            Where
                j1.fk_property = t5.pk_property
                And j1.fk_domain_class = t5.has_domain
                And j1.fk_project = 375669 -- Default config project
) As t7 On True
    Where
        t1.pk_entity = t2.fk_entity
        And t2.is_in_project = True
        And t5.pk_property = t1.fk_property
        And t5.has_domain = t3.fk_class
        And t5.has_range = t4.fk_class
    Union All
    ---- ingoing edges of project
    Select
        t2.fk_project,
        t1.pk_entity As fk_role,
        t1.fk_entity As fk_source,
        t1.fk_temporal_entity As fk_target,
        t1.fk_property,
        t6.field_order As field_order_of_project,
        t7.field_order As field_order_of_default_project,
        Case When (Exists (
                Select
                    pk_entity
                From
                    projects.class_field_config j1
                Where
                    j1.fk_range_class = t5.has_range
                    And j1.fk_project = t2.fk_project)) Then
            True
        Else
            False
        End project_has_own_field_order,
        t2.ord_num_of_domain As ord_num_within_field,
        t1.is_in_project_count,
        'text'::war.edge_target_type As target_provides
    From
        information.v_role t1,
        projects.info_proj_rel t2
        Join Lateral (
            Select
                pk_entity,
                fk_class
            From
                information.persistent_item
            Where
                pk_entity = t1.fk_entity
            Union All
            Select
                pk_entity,
                fk_class
            From
                information.temporal_entity
            Where
                pk_entity = t1.fk_entity) As t3 On True
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_temporal_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_temporal_entity) As t4 On True,
                data_for_history.v_property t5
            Left Join Lateral (
                Select
                    j1.ord_num As field_order
                From
                    projects.class_field_config j1
                Where
                    j1.fk_property = t5.pk_property
                    And j1.fk_range_class = t5.has_range
                    And j1.fk_project = t2.fk_project) As t6 On True
            Left Join Lateral (
                Select
                    j1.ord_num As field_order
                From
                    projects.class_field_config j1
                Where
                    j1.fk_property = t5.pk_property
                    And j1.fk_range_class = t5.has_range
                    And j1.fk_project = 375669 -- Default config project
) As t7 On True
            Where
                t1.pk_entity = t2.fk_entity
                And t2.is_in_project = True
                And t5.pk_property = t1.fk_property
                And t5.has_range = t3.fk_class
                And t5.has_domain = t4.fk_class
)
    Select Distinct On (fk_source, fk_project, fk_target, fk_role)
    fk_source,
    fk_project,
    fk_target,
    target_provides,
    ord_num_within_field,
    Case When fk_property = 1111 Then
        - 9
    When project_has_own_field_order = True Then
        field_order_of_project
    Else
        field_order_of_default_project
    End As field_order,
    fk_role
From
    tw1
Union All Select Distinct
    fk_source,
    Null::int As fk_project,
    fk_target,
    target_provides,
    --is_in_project_count as ord_num_within_field,
    Null::int As ord_num_within_field,
    Case When fk_property = 1111 Then
        - 9
    Else
        field_order_of_default_project
    End As field_order,
    fk_role
From
    tw1;

$BODY$;

--  fn-11 refactor function war.edges__create_some
Drop Function war.edges__create_some (integer[], integer);

Create Or Replace Function war.edges__create_some (
    param_pk_roles integer[],
    param_fk_project integer
)
    Returns Setof war.edge
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        ---- outgoing edges of project
        Select
            t2.fk_project,
            t1.pk_entity As fk_role,
            t1.fk_temporal_entity As fk_source,
            t1.fk_entity As fk_target,
            t1.fk_property,
            t6.field_order As field_order_of_project,
            t7.field_order As field_order_of_default_project,
            Case When (Exists (
                    Select
                        pk_entity
                    From
                        projects.class_field_config j1
                    Where
                        j1.fk_domain_class = t5.has_domain
                        And j1.fk_project = t2.fk_project)) Then
                True
            Else
                False
            End project_has_own_field_order,
            t2.ord_num_of_range As ord_num_within_field,
            t1.is_in_project_count,
            Case When t5.is_has_type_subproperty Then
                'type'::war.edge_target_type
            Else
                'text'::war.edge_target_type
            End As target_provides
        From
            information.v_role t1,
            projects.info_proj_rel t2
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_temporal_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_temporal_entity) As t3 On True
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_entity) As t4 On True,
            data_for_history.v_property t5
        Left Join Lateral (
            Select
                j1.ord_num As field_order
            From
                projects.class_field_config j1
            Where
                j1.fk_property = t5.pk_property
                And j1.fk_domain_class = t5.has_domain
                And j1.fk_project = t2.fk_project) As t6 On True
        Left Join Lateral (
            Select
                j1.ord_num As field_order
            From
                projects.class_field_config j1
            Where
                j1.fk_property = t5.pk_property
                And j1.fk_domain_class = t5.has_domain
                And j1.fk_project = 375669 -- Default config project
) As t7 On True
    Where
        t1.pk_entity = Any (param_pk_roles)
        And t2.fk_project = param_fk_project
        And t1.pk_entity = t2.fk_entity
        And t2.is_in_project = True
        And t5.pk_property = t1.fk_property
        And t5.has_domain = t3.fk_class
        And t5.has_range = t4.fk_class
    Union All
    ---- ingoing edges of project
    Select
        t2.fk_project,
        t1.pk_entity As fk_role,
        t1.fk_entity As fk_source,
        t1.fk_temporal_entity As fk_target,
        t1.fk_property,
        t6.field_order As field_order_of_project,
        t7.field_order As field_order_of_default_project,
        Case When (Exists (
                Select
                    pk_entity
                From
                    projects.class_field_config j1
                Where
                    j1.fk_range_class = t5.has_range
                    And j1.fk_project = t2.fk_project)) Then
            True
        Else
            False
        End project_has_own_field_order,
        t2.ord_num_of_domain As ord_num_within_field,
        t1.is_in_project_count,
        'text'::war.edge_target_type As target_provides
    From
        information.v_role t1,
        projects.info_proj_rel t2
        Join Lateral (
            Select
                pk_entity,
                fk_class
            From
                information.persistent_item
            Where
                pk_entity = t1.fk_entity
            Union All
            Select
                pk_entity,
                fk_class
            From
                information.temporal_entity
            Where
                pk_entity = t1.fk_entity) As t3 On True
            Join Lateral (
                Select
                    pk_entity,
                    fk_class
                From
                    information.persistent_item
                Where
                    pk_entity = t1.fk_temporal_entity
                Union All
                Select
                    pk_entity,
                    fk_class
                From
                    information.temporal_entity
                Where
                    pk_entity = t1.fk_temporal_entity) As t4 On True,
                data_for_history.v_property t5
            Left Join Lateral (
                Select
                    j1.ord_num As field_order
                From
                    projects.class_field_config j1
                Where
                    j1.fk_property = t5.pk_property
                    And j1.fk_range_class = t5.has_range
                    And j1.fk_project = t2.fk_project) As t6 On True
            Left Join Lateral (
                Select
                    j1.ord_num As field_order
                From
                    projects.class_field_config j1
                Where
                    j1.fk_property = t5.pk_property
                    And j1.fk_range_class = t5.has_range
                    And j1.fk_project = 375669 -- Default config project
) As t7 On True
            Where
                t1.pk_entity = Any (param_pk_roles)
                And t2.fk_project = param_fk_project
                And t1.pk_entity = t2.fk_entity
                And t2.is_in_project = True
                And t5.pk_property = t1.fk_property
                And t5.has_range = t3.fk_class
                And t5.has_domain = t4.fk_class
)
    Select Distinct On (fk_source, fk_project, fk_target, fk_role)
    fk_source,
    fk_project,
    fk_target,
    target_provides,
    ord_num_within_field,
    Case When fk_property = 1111 Then
        - 9
    When project_has_own_field_order = True Then
        field_order_of_project
    Else
        field_order_of_default_project
    End As field_order,
    fk_role
From
    tw1
Union All Select Distinct
    fk_source,
    Null::int As fk_project,
    fk_target,
    target_provides,
    --is_in_project_count as ord_num_within_field,
    Null::int As ord_num_within_field,
    Case When fk_property = 1111 Then
        - 9
    Else
        field_order_of_default_project
    End As field_order,
    fk_role
From
    tw1;

$BODY$;

--  fn-12 refactor function war.edges__upsert_some
Drop Function war.edges__upsert_some (integer[], integer);

Create Or Replace Function war.edges__upsert_some (
    param_pk_roles integer[],
    param_fk_project integer
)
    Returns Setof war.edge
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With tw1 As (
        -- Create edges on the fly
        Select
            *
        From
            war.edges__create_some (param_pk_roles, param_fk_project)
),
tw2 As (
    -- Select the edges that are different in one of the non recursive columns
    Select
        *
    From
        tw1 t1
    Except
    Select
        t1.*
    From
        war.edge t1,
        tw1 t2
    Where
        t1.fk_role = t2.fk_role
        And t1.fk_source = t2.fk_source
        And t1.fk_target = t2.fk_target
        And t1.fk_project Is Not Distinct From t2.fk_project
),
tw3 As (
    -- Update the edges that are different in one of the non recursive columns
    Update
        war.edge t1
    Set
        fk_source = t2.fk_source,
        fk_project = t2.fk_project,
        fk_target = t2.fk_target,
        target_provides = t2.target_provides,
        ord_num_within_field = t2.ord_num_within_field,
        field_order = t2.field_order,
        fk_role = t2.fk_role
    From
        tw2 t2
    Where
        t1.fk_role = t2.fk_role
        And t1.fk_source = t2.fk_source
        And t1.fk_target = t2.fk_target
        And t1.fk_project Is Not Distinct From t2.fk_project
    Returning
        t1.*
),
tw4 As (
    -- Insert the created edges that do not yet exist
    Insert Into war.edge
    Select
        *
    From
        tw1
    On Conflict
        Do Nothing
    Returning
        *
)
Select
    *
From
    tw3
Union
Select
    *
From
    tw4;

$BODY$;

Alter Function war.edges__upsert_some (integer[], integer) Owner To postgres;

--  fn-13 refactor function war.enriched_nodes__create_all
Create Or Replace Function war.enriched_nodes__create_all ()
    Returns Setof war.enriched_node
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With
    -- all entities per project with class label
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'peIt'::varchar As entity_type
        From
            information.persistent_item t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'teEn'::varchar As entity_type
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            And t1.pk_entity = t2.fk_entity
),
-- all entities
tw2 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type
    From
        tw1 t1
),
-- select all 'histP11 refers to name' roles
tw5 As (
    Select
        - 10 As field_order,
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
        t2.ord_num_of_domain,
        t2.ord_num_of_range,
        t1.is_in_project_count
    From
        information.v_role t1,
        projects.info_proj_rel t2
    Where
        t1.fk_property = 1113
        And t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
        Case t1.fk_class_field
        When 217 Then
            - 10
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            Null::int
        End As field_order,
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As "coalesce",
        t2.ord_num_of_text_property
    From
        information.v_text_property t1,
        projects.info_proj_rel t2
    Where
        t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.field_order, t7.field_order) As field_order,
        coalesce(t2.is_in_project_count, t7.is_in_project_count) As is_in_project_count,
    coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
    regexp_replace(coalesce(t3.string, t7.string), E'[\\n\\r]+', '', 'g') As string
From
    tw2 t1
    -- join outgoing roles
    Left Join tw5 t2 On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join text properties
        Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
            And t1.fk_project Is Not Distinct From t7.fk_project
),
-- own_entity_label per project
tw8 As (
    Select Distinct On (fk_project,
        pk_entity)
        fk_project,
        pk_entity,
        string As own_entity_label,
        field_order As own_entity_label_field_order
    From
        tw7
    Where
        string Is Not Null
    Order By
        fk_project,
        pk_entity,
        field_order Asc,
        ord_num Asc
),
-- own_full_text per project
tw9 As (
    Select
        fk_project,
        pk_entity,
        string_agg(string, '; ') As own_full_text
From
    tw7
    Where
        string Is Not Null
    Group By
        fk_project,
        pk_entity
        --ORDER BY field_order, ord_num
),
-- own_entity_label per repo
tw10 As (
    Select Distinct On (pk_entity)
        Null::int As fk_project,
        pk_entity,
        own_entity_label,
        own_entity_label_field_order
    From
        tw8
    Group By
        pk_entity,
        own_entity_label,
        own_entity_label_field_order
    Order By
        pk_entity,
        count(fk_project) Desc
),
-- own_full_text per repo
tw11 As (
    Select
        Null::int As fk_project,
        t1.pk_entity,
        string_agg(t1.string, '; ') As own_full_text
    From (
        Select
            pk_entity,
            string
        From
            tw7
        Where
            string Is Not Null
        Group By
            pk_entity,
            string
        Order By
            count(pk_entity) Desc) As t1
    Group By
        t1.pk_entity
),
-- project variant
tw12 As (
    Select Distinct On (t1.pk_entity,
        t1.fk_project)
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
        t2.own_entity_label,
        t2.own_entity_label_field_order,
        t3.own_full_text
    From
        tw7 t1
        Left Join tw8 t2 On t2.pk_entity = t1.pk_entity
            And t2.fk_project = t1.fk_project
        Left Join tw9 t3 On t3.pk_entity = t1.pk_entity
            And t3.fk_project = t1.fk_project
),
-- repo variant
tw13 As (
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        Null::integer As fk_project,
        t1.entity_type,
        t2.own_entity_label,
        t2.own_entity_label_field_order,
        t3.own_full_text
    From
        tw1 t1
    Left Join tw10 t2 On t2.pk_entity = t1.pk_entity
        Left Join tw11 t3 On t3.pk_entity = t1.pk_entity
),
tw14 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
        t1.own_full_text,
        t1.own_entity_label,
        t1.own_entity_label_field_order
    From
        tw12 t1
Union All
Select
    t1.pk_entity,
    t1.fk_class,
    t1.fk_project,
    t1.entity_type,
    t1.own_full_text,
    t1.own_entity_label,
    t1.own_entity_label_field_order
From
    tw13 t1
),
/**
 * Add time spans
 */
tw15 As (
    -- get first and last second of all time primitives
    Select
        t1.pk_entity,
        t1.julian_day,
        t1.duration,
        commons.time_primitive__get_first_second (t1.julian_day) As first_second,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'gregorian') As last_second_gregorian,
    commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'julian') As last_second_julian
From
    information.time_primitive t1
),
-- select roles with time primitive, first and last second
tw16 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t3.fk_project,
        t3.calendar,
        t2.julian_day,
        t2.duration,
        t2.first_second,
        Case When t3.calendar = 'gregorian' Then
            t2.last_second_gregorian
        Else
            t2.last_second_julian
        End last_second
    From
        information.role t1,
        tw15 t2,
        projects.info_proj_rel t3
    Where
        t1.pk_entity = t3.fk_entity
        And (t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153]))
        And t2.pk_entity = t1.fk_entity
        And t3.is_in_project = True
    Union All ( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            Null::integer As fk_project,
            t1.community_favorite_calendar,
            t2.julian_day,
            t2.duration,
            t2.first_second,
            Case When t1.community_favorite_calendar = 'gregorian' Then
                t2.last_second_gregorian
            Else
                t2.last_second_julian
            End last_second
        From
            information.v_role t1
            Join tw15 t2 On t2.pk_entity = t1.fk_entity
        Where
            t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw17 As (
    Select
        tw16.fk_project,
        tw16.fk_temporal_entity,
        min(tw16.first_second) first_second,
    max(tw16.last_second) last_second,
    jsonb_object_agg(
        Case When tw16.fk_property = 71 Then
            'p81'::text
        When tw16.fk_property = 72 Then
            'p82'::text
        When tw16.fk_property = 150 Then
            'p81a'::text
        When tw16.fk_property = 151 Then
            'p81b'::text
        When tw16.fk_property = 152 Then
            'p82a'::text
        When tw16.fk_property = 153 Then
            'p82b'::text
        Else
            tw16.fk_property::text
        End, json_build_object('julianDay', tw16.julian_day, 'duration', tw16.duration, 'calendar', tw16.calendar)) As time_span
From
    tw16
Group By
    tw16.fk_project,
    tw16.fk_temporal_entity)
/*
 * time spans and class label added
 **/
Select
    t1.pk_entity,
    t1.fk_project,
    coalesce(t1.fk_project, 0),
    t1.fk_class,
    t3.label As class_label,
    t1.entity_type,
    t1.own_entity_label,
    t1.own_full_text,
    t2.time_span,
    t2.first_second,
    t2.last_second,
    t1.own_entity_label_field_order,
    t1.own_entity_label As entity_label,
    Null::integer fk_type,
    Null::text type_label,
    Null::text full_text,
    Null::tsvector ts_vector,
    Null::timestamp With time zone tmsp_last_modification
From
    tw14 t1
    Left Join tw17 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
    Join war.v_class_preview t3 On t1.fk_class = t3.fk_class
        And t1.fk_project Is Not Distinct From t3.fk_project
$BODY$;

--  fn-14 refactor function war.enriched_nodes__create_some
Create Or Replace Function war.enriched_nodes__create_some (
    param_pk_entities integer[],
    param_fk_project integer
)
    Returns Setof war.enriched_node
    Language 'sql'
    Cost 100 Volatile Rows 1000
    As $BODY$
    With
    -- all entities per project
    tw1 As (
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'peIt'::varchar As entity_type
        From
            information.persistent_item t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            And t1.pk_entity = Any (param_pk_entities)
            And t1.pk_entity = t2.fk_entity
            And t2.fk_project = param_fk_project
        Union
        Select
            t1.pk_entity,
            t1.fk_class,
            t2.fk_project,
            'teEn'::varchar As entity_type
        From
            information.temporal_entity t1,
            projects.info_proj_rel t2
        Where
            t2.is_in_project = True
            And t1.pk_entity = Any (param_pk_entities)
            And t1.pk_entity = t2.fk_entity
            And t2.fk_project = param_fk_project
),
-- select all 'histP11 refers to name' roles
tw5 As (
    Select
        - 10 As field_order,
        t1.pk_entity,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t1.fk_property,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
From
    information.v_role t1,
    projects.info_proj_rel t2
    Where
        t1.fk_property = 1113
        And t1.fk_temporal_entity = Any (param_pk_entities)
        And t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- select all text_properties per project with ord_num
tw6 As (
    Select
        Case t1.fk_class_field
        When 217 Then
            - 10
        When 218 Then
            - 8
        When 219 Then
            - 7
        Else
            Null::int
        End As field_order,
        t1.pk_entity,
        t1.fk_concerned_entity,
        t1.fk_language,
        t1.fk_class_field,
        t1.quill_doc,
        t1.string,
        t1.is_in_project_count,
        t2.fk_project,
        coalesce(t2.fk_project, 0) As "coalesce",
    t2.ord_num_of_text_property
From
    information.v_text_property t1,
    projects.info_proj_rel t2
    Where
        t1.fk_concerned_entity = Any (param_pk_entities)
        And t2.fk_entity = t1.pk_entity
        And t2.is_in_project = True
),
-- join directly related things and create string
tw7 As (
    Select
        t1.*,
        coalesce(t2.field_order, t7.field_order) As field_order,
    coalesce(t2.is_in_project_count, t7.is_in_project_count) As is_in_project_count,
    coalesce(t2.ord_num_of_range, t7.ord_num_of_text_property) As ord_num,
    regexp_replace(coalesce(t3.string, t7.string), E'[\\n\\r]+', '', 'g') As string
From
    tw1 t1
    -- join outgoing roles
    Left Join tw5 t2 On t1.fk_project Is Not Distinct From t2.fk_project
        And t2.fk_temporal_entity = t1.pk_entity
        -- join appellation with outgoing roles
    Left Join information.appellation t3 On t2.fk_entity = t3.pk_entity
    -- join text properties
        Left Join tw6 t7 On t1.pk_entity = t7.fk_concerned_entity
            And t1.fk_project Is Not Distinct From t7.fk_project
),
-- own_entity_label per project
tw8 As (
    Select Distinct On (fk_project,
        pk_entity)
        fk_project,
        pk_entity,
        string As own_entity_label,
        field_order As own_entity_label_field_order
    From
        tw7
    Where
        string Is Not Null
    Order By
        fk_project,
        pk_entity,
        field_order Asc,
        ord_num Asc
),
-- own_full_text per project
tw9 As (
    Select
        fk_project,
        pk_entity,
        string_agg(string, '; ') As own_full_text
From
    tw7
    Where
        string Is Not Null
    Group By
        fk_project,
        pk_entity
        --ORDER BY field_order, ord_num
),
-- own_entity_label per repo
tw10 As (
    Select Distinct On (pk_entity)
        Null::int As fk_project,
        pk_entity,
        own_entity_label,
        own_entity_label_field_order
    From
        tw8
    Group By
        pk_entity,
        own_entity_label,
        own_entity_label_field_order
    Order By
        pk_entity,
        count(fk_project) Desc
),
-- own_full_text per repo
tw11 As (
    Select
        Null::int As fk_project,
        t1.pk_entity,
        string_agg(t1.string, '; ') As own_full_text
    From (
        Select
            pk_entity,
            string
        From
            tw7
        Where
            string Is Not Null
        Group By
            pk_entity,
            string
        Order By
            count(pk_entity) Desc) As t1
    Group By
        t1.pk_entity
),
-- project variant
tw12 As (
    Select Distinct On (t1.pk_entity,
        t1.fk_project)
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
        t2.own_entity_label,
        t2.own_entity_label_field_order,
        t3.own_full_text
    From
        tw7 t1
        Left Join tw8 t2 On t2.pk_entity = t1.pk_entity
            And t2.fk_project = t1.fk_project
            And t2.fk_project = param_fk_project
        Left Join tw9 t3 On t3.pk_entity = t1.pk_entity
            And t3.fk_project = t1.fk_project
            And t3.fk_project = param_fk_project
),
-- repo variant
tw13 As (
    Select Distinct On (pk_entity)
        t1.pk_entity,
        t1.fk_class,
        Null::integer As fk_project,
        t1.entity_type,
        t2.own_entity_label,
        t2.own_entity_label_field_order,
        t3.own_full_text
    From
        tw1 t1
    Left Join tw10 t2 On t2.pk_entity = t1.pk_entity
        Left Join tw11 t3 On t3.pk_entity = t1.pk_entity
),
tw14 As (
    Select
        t1.pk_entity,
        t1.fk_class,
        t1.fk_project,
        t1.entity_type,
        t1.own_full_text,
        t1.own_entity_label,
        t1.own_entity_label_field_order
    From
        tw12 t1
Union All
Select
    t1.pk_entity,
    t1.fk_class,
    t1.fk_project,
    t1.entity_type,
    t1.own_full_text,
    t1.own_entity_label,
    t1.own_entity_label_field_order
From
    tw13 t1
),
/**
 * Add time spans
 */
tw15 As (
    -- get first and last second of all time primitives
    Select
        t1.pk_entity,
        t1.julian_day,
        t1.duration,
        commons.time_primitive__get_first_second (t1.julian_day) As first_second,
        commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'gregorian') As last_second_gregorian,
    commons.time_primitive__get_last_second (t1.julian_day, t1.duration, 'julian') As last_second_julian
From
    information.time_primitive t1
),
-- select roles with time primitive, first and last second
tw16 As (
    Select
        t1.fk_temporal_entity,
        t1.fk_property,
        t3.fk_project,
        t3.calendar,
        t2.julian_day,
        t2.duration,
        t2.first_second,
        Case When t3.calendar = 'gregorian' Then
            t2.last_second_gregorian
        Else
            t2.last_second_julian
        End last_second
    From
        information.role t1
        Join Lateral (
            Select
                j1.pk_entity,
                j1.julian_day,
                j1.duration,
                commons.time_primitive__get_first_second (j1.julian_day) As first_second,
            commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'gregorian') As last_second_gregorian,
            commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'julian') As last_second_julian
    From
        information.time_primitive j1
    Where
        j1.pk_entity = t1.fk_entity) t2 On t1.fk_temporal_entity = Any (param_pk_entities)
    And (t1.fk_property = Any (Array[71,
            72,
            150,
            151,
            152,
            153]))
    And t2.pk_entity = t1.fk_entity,
    projects.info_proj_rel t3
    Where
        t1.pk_entity = t3.fk_entity
        And t3.is_in_project = True
    Union All ( Select Distinct On (t1.fk_temporal_entity,
            t1.fk_property)
            t1.fk_temporal_entity,
            t1.fk_property,
            Null::integer As fk_project,
            t1.community_favorite_calendar,
            t2.julian_day,
            t2.duration,
            t2.first_second,
            Case When t1.community_favorite_calendar = 'gregorian' Then
                t2.last_second_gregorian
            Else
                t2.last_second_julian
            End last_second
        From
            information.v_role t1
            Join Lateral (
                Select
                    j1.pk_entity,
                    j1.julian_day,
                    j1.duration,
                    commons.time_primitive__get_first_second (j1.julian_day) As first_second,
                    commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'gregorian') As last_second_gregorian,
                commons.time_primitive__get_last_second (j1.julian_day, j1.duration, 'julian') As last_second_julian
            From
                information.time_primitive j1
            Where
                j1.pk_entity = t1.fk_entity) t2 On t1.fk_temporal_entity = Any (param_pk_entities)
            And t1.fk_property = Any (Array[71,
                72,
                150,
                151,
                152,
                153])
            And t1.is_in_project_count > 0
        Order By
            t1.fk_temporal_entity,
            t1.fk_property,
            t1.is_in_project_count Desc,
            t1.tmsp_creation Desc)
),
-- create time spans, first_second and last_second
tw17 As (
    Select
        tw16.fk_project,
        tw16.fk_temporal_entity,
        min(tw16.first_second) first_second,
        max(tw16.last_second) last_second,
        jsonb_object_agg(
            Case When tw16.fk_property = 71 Then
                'p81'::text
            When tw16.fk_property = 72 Then
                'p82'::text
            When tw16.fk_property = 150 Then
                'p81a'::text
            When tw16.fk_property = 151 Then
                'p81b'::text
            When tw16.fk_property = 152 Then
                'p82a'::text
            When tw16.fk_property = 153 Then
                'p82b'::text
            Else
                tw16.fk_property::text
            End, json_build_object('julianDay', tw16.julian_day, 'duration', tw16.duration, 'calendar', tw16.calendar)) As time_span
    From
        tw16
    Group By
        tw16.fk_project,
        tw16.fk_temporal_entity)
/*
 * time spans and class label added
 **/
Select
    t1.pk_entity,
    t1.fk_project,
    coalesce(t1.fk_project, 0),
t1.fk_class,
t3.label As class_label,
t1.entity_type,
t1.own_entity_label,
t1.own_full_text,
t2.time_span,
t2.first_second,
t2.last_second,
t1.own_entity_label_field_order,
t1.own_entity_label As entity_label,
Null::integer fk_type,
Null::text type_label,
Null::text full_text,
Null::tsvector ts_vector,
Null::timestamp With time zone tmsp_last_modification
From
    tw14 t1
    Left Join tw17 t2 On t1.pk_entity = t2.fk_temporal_entity
        And t1.fk_project Is Not Distinct From t2.fk_project
    Join war.v_class_preview t3 On t1.fk_class = t3.fk_class
        And t1.fk_project Is Not Distinct From t3.fk_project
$BODY$;

-- 11 rename indexes and constraints
Alter Index information.statement_pk_entity_idx Rename To role_pk_entity_idx;

Alter Index information.statement_fk_object_info_idx Rename To role_fk_entity_idx;

Alter Index information.statement_fk_subject_info_idx Rename To role_fk_temporal_entity_idx;

Alter Table information.role Rename Constraint information_statement_pk_entity_unique To information_role_pk_entity_unique;

-- 12 recreate vm_statement
Drop Materialized View war.vm_statement;

Create Materialized View war.vm_statement Tablespace pg_default As
With tw1 As (
    Select
        t1.pk_entity,
        t1.fk_property,
        t1.fk_entity,
        t1.fk_temporal_entity,
        t2.is_in_project_count,
        t1.notes,
        t1.tmsp_creation,
        t1.tmsp_last_modification,
        t1.sys_period
    From
        information.role t1
        Left Join Lateral (
            Select
                count(info_proj_rel.pk_entity)::integer As is_in_project_count
            From
                projects.info_proj_rel
            Where
                info_proj_rel.fk_entity = t1.pk_entity
                And info_proj_rel.is_in_project = True
            Group By
                info_proj_rel.fk_entity) t2 On True
)
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    t2.fk_project,
    coalesce(t2.fk_project, 0) As project,
    t2.ord_num_of_domain,
    t2.ord_num_of_range,
    t1.is_in_project_count
From
    tw1 t1,
    projects.info_proj_rel t2
Where
    t2.fk_entity = t1.pk_entity
    And t2.is_in_project = True
Union
Select
    t1.pk_entity,
    t1.fk_entity,
    t1.fk_temporal_entity,
    t1.fk_property,
    Null::integer As fk_project,
    0 As project,
    Null::integer As ord_num_of_domain,
    Null::integer As ord_num_of_range,
    t1.is_in_project_count
From
    tw1 t1
Where
    t1.is_in_project_count > 0 With DATA;

Create Index vm_statement_fk_entity_idx On war.vm_statement Using btree (fk_entity) Tablespace pg_default;

Create Index vm_statement_fk_project_idx On war.vm_statement Using btree (fk_project) Tablespace pg_default;

Create Index vm_statement_fk_property_idx On war.vm_statement Using btree (fk_property) Tablespace pg_default;

Create Index vm_statement_fk_temporal_entity_idx On war.vm_statement Using btree (fk_temporal_entity) Tablespace pg_default;

Create Index vm_statement_pk_entity_idx On war.vm_statement Using btree (pk_entity) Tablespace pg_default;

Create Unique Index vm_statement_pk_entity_project_idx On war.vm_statement Using btree (pk_entity, project) Tablespace pg_default;

