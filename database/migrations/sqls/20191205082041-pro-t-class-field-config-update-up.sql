-- 1
Alter Table projects.class_field_config
    Add Column fk_domain_class INT;

Alter Table projects.class_field_config
    Add Column fk_range_class INT;

Alter Table projects.class_field_config_vt
    Add Column fk_domain_class INT;

Alter Table projects.class_field_config_vt
    Add Column fk_range_class INT;

-- 2
Alter Table projects.class_field_config
    Add Column fk_property_deprecated INT;

Alter Table projects.class_field_config_vt
    Add Column fk_property_deprecated INT;

-- 3 fill fk_property_deprecated with fk_property
Update
    projects.class_field_config
Set
    fk_property_deprecated = fk_property;

-- 4  fill fk_domain_class with domain of property (if property_is_outgoing = true)
With tw1 As (
    Select
        t1.pk_entity,
        t2.dfh_has_domain
    From
        projects.class_field_config t1,
        data_for_history.v_property t2
    Where
        t1.fk_property = t2.dfh_pk_property
        And t1.fk_property Is Not Null
        And t1.property_is_outgoing = True)
Update
    projects.class_field_config t1
Set
    fk_domain_class = t2.dfh_has_domain
From
    tw1 t2
Where
    t2.pk_entity = t1.pk_entity;

-- 5 fill fk_range_class with range of property (if property_is_outgoing = false)
With tw1 As (
    Select
        t1.pk_entity,
        t2.dfh_has_range
    From
        projects.class_field_config t1,
        data_for_history.v_property t2
    Where
        t1.fk_property = t2.dfh_pk_property
        And t1.fk_property Is Not Null
        And t1.property_is_outgoing = False)
Update
    projects.class_field_config t1
Set
    fk_range_class = t2.dfh_has_range
From
    tw1 t2
Where
    t2.pk_entity = t1.pk_entity;

-- 6 drop the unique constraints
Drop Index projects.ui_context_config_for_prop_and_proj_uni_idx;

Drop Index projects.ui_context_config_for_prop_no_proj_uni_idx;

Drop Index projects.ui_context_config_for_prop_set_and_proj_uni_idx;

Drop Index projects.ui_context_config_for_prop_set_no_proj_uni_idx;

-- 7 drop the foreign key constraint referencing the dfh_pk_property (should be added after updateing dfh schema)
Alter Table projects.class_field_config
    Drop Constraint ui_context_config_fk_property_fkey;

-- 8 fill fk_property with: fk_property_of_origin or opriginal pk_property
With tw1 As (
    Select
        t1.pk_entity,
        t2.fk_property As new_fk_property
    From
        projects.class_field_config t1,
        data_for_history.v_property t2
    Where
        t1.fk_property = t2.dfh_pk_property
        And t1.fk_property Is Not Null)
Update
    projects.class_field_config t1
Set
    fk_property = t2.new_fk_property
From
    tw1 t2
Where
    t2.pk_entity = t1.pk_entity;

-- 9 fill fk_project with pk of 'default configuration project'
Update
    projects.class_field_config
Set
    fk_project = 375669;

-- 10 add fk_project not null constraint
Alter Table projects.class_field_config
    Alter Column fk_project Set Not Null;

-- 11 add unique constraints
Create Unique Index On projects.class_field_config
Using btree (fk_app_context, fk_project, fk_property, fk_domain_class, fk_range_class);

-- 12 create backup
Create Table projects._backup_class_field_config As
Select
    *
From
    projects.class_field_config;

-- 13 Delete superfluous fields
Delete From projects.class_field_config;

Insert Into projects.class_field_config
    WITH tw1 AS (
      SELECT * FROM
      projects._backup_class_field_config
    )
    SELECT DISTINCT ON (
	   tw1.fk_app_context,
       tw1.fk_property,
	   tw1.fk_domain_class,
	   tw1.fk_range_class,
       tw1.fk_class_for_class_field,
       tw1.fk_project
	)
   *
  	FROM
      tw1
    WHERE
      tw1.ord_num IS NOT NULL
      ORDER BY
       tw1.fk_app_context,
       tw1.fk_property,
	   tw1.fk_domain_class,
	   tw1.fk_range_class,
       tw1.fk_class_for_class_field,
       tw1.fk_project,
	   tw1.ord_num desc
