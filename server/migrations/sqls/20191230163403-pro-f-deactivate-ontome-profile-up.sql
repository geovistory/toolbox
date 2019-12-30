Create Or Replace Function projects.deactivate_ontome_profile_for_geovistory_project (
    profileId INT,
    projectId INT
)
    Returns void
    Language 'plpgsql'
    Cost 100 Volatile
    As $BODY$
Begin
    /**
     * Deactivate Profile
     */
    Update
        projects.dfh_profile_proj_rel
    Set
        enabled = False
    Where
        fk_profile = profileId
        And fk_project = projectId;

    /**
     * Deactivate Classes
     * (only classes that are not part of another ontome profile
     * activated by the geovistroy project)
     */
    -- select class profile relations
    With ctw1 As (
        Select Distinct
            t1.dfh_pk_class fk_class,
            t1.dfh_fk_profile fk_profile
        From
            data_for_history.api_class t1
),
-- select the classes of deactivation-profile
ctw2 As (
    Select
        pk_class,
        identifier_in_namespace
    From
        data_for_history.v_class t1,
        ctw1 t2
    Where
        t1.pk_class = t2.fk_class
        And t2.fk_profile = profileId
),
-- select the profiles the project has without deactivation-profile
ctw3 As (
    Select Distinct
        fk_profile
    From
        projects.dfh_profile_proj_rel
    Where
        fk_project = projectId
        And fk_profile != profileId
        And enabled = True
    Union
    Select
        5 As fk_profile -- GEOVISTORY BASICS
),
-- select the classes of the profiles of the project except the deactivation-profile
ctw4 As (
    Select Distinct
        pk_class,
        identifier_in_namespace
    From
        data_for_history.v_class t1,
        ctw1 t2,
        ctw3 t3
    Where
        t1.pk_class = t2.fk_class
        And t2.fk_profile = t3.fk_profile
),
-- select the classes to be deactivated
ctw5 As (
    Select
        pk_class
    From
        ctw2
    Except
    Select
        pk_class
    From
        ctw4)
Update
    projects.dfh_class_proj_rel t1
Set
    enabled_in_entities = False
From
    ctw5 t2
Where
    t1.fk_class = t2.pk_class
    And t1.fk_project = projectId;
End;
$BODY$;

