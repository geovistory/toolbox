Create Or Replace View war.v_property_preview As With tw0 As (
    Select
        project.pk_entity,
        project.fk_language
    From
        projects.project
    Union All
    Select
        NULL::integer As int4,
        18889
),
tw1 As (
    Select
        t2.fk_dfh_property As fk_property,
        t1.pk_entity As fk_project,
        t2.string As label,
        1 As rank,
        'project label'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        t1.pk_entity = t2.fk_project
        And t2.fk_dfh_property Is Not Null
        And t2.fk_language = t1.fk_language
    Union All
    Select
        t2.fk_dfh_property As fk_property,
        t1.pk_entity As fk_project,
        t2.string As label,
        2 As rank,
        'default project label in default lang'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        375669 = t2.fk_project
        And t2.fk_dfh_property Is Not Null
        And t2.fk_language = t1.fk_language
    Union All
    Select
        t3.fk_property,
        t1.pk_entity As fk_project,
        t3.label,
        3 As rank,
        'ontome label in default lang'::text As text
    From
        tw0 t1,
        information.language t2,
        data_for_history.v_label t3
    Where
        t3.fk_property Is Not Null
        And t3.language::bpchar = t2.iso6391
        And t3.type = 'label'::text
    Union All
    Select
        t2.fk_dfh_property As fk_property,
        t1.pk_entity As fk_project,
        t2.string As label,
        4 As rank,
        'default project label in en'::text As text
    From
        tw0 t1,
        projects.text_property t2
    Where
        375669 = t2.fk_project
        And t2.fk_dfh_property Is Not Null
        And t2.fk_language = 18889
    Union All
    Select
        t3.fk_property,
        t1.pk_entity As fk_project,
        t3.label,
        3 As rank,
        'ontome label in en'::text As text
    From
        tw0 t1,
        data_for_history.v_label t3
    Where
        t3.fk_property Is Not Null
        And t3.language::text = 'en'::text
        And t3.type = 'label'::text
)
Select Distinct On (tw1.fk_project, tw1.fk_property)
    tw1.fk_property,
    tw1.fk_project,
    tw1.label
From
    tw1
Order By
    tw1.fk_project,
    tw1.fk_property,
    tw1.rank;

