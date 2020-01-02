Delete From data_for_history.api_profile;

Delete From data_for_history.api_profile_vt;

-- 21
Alter Table data_for_history.api_profile
    Drop Constraint unique_dfh_pk_profile_requested_language;

-- 20
Alter Table data_for_history.api_profile
    Add Constraint unique_dfh_pk_profile Unique (dfh_pk_profile);

-- 19
Alter Table data_for_history.api_profile
    Add Column dfh_modification_time timestamp without time zone;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_modification_time timestamp without time zone;

-- 18
Alter Table data_for_history.api_profile
    Add Column dfh_creation_time timestamp without time zone;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_creation_time timestamp without time zone;

-- 17
Alter Table data_for_history.api_profile
    Add Column dfh_end_date date;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_end_date date;

-- 16
Alter Table data_for_history.api_profile
    Add Column dfh_start_date date;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_start_date date;

-- 15
Alter Table data_for_history.api_profile
    Add Column dfh_fk_project_of_belonging integer;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_fk_project_of_belonging integer;

-- 14
Alter Table data_for_history.api_profile
    Add Column dfh_standard_label character varying(500);

Alter Table data_for_history.api_profile_vt
    Add Column dfh_standard_label character varying(500);

-- 13
Alter Table data_for_history.api_profile
    Add Column dfh_fk_is_subprofile_of INT;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_fk_is_subprofile_of INT;

-- 12
Alter Table data_for_history.api_profile
    Drop Column dfh_date_profile_deprecated;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_date_profile_deprecated;

-- 11
Alter Table data_for_history.api_profile
    Drop Column dfh_date_profile_published;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_date_profile_published;

-- 10
Alter Table data_for_history.api_profile
    Drop Column dfh_is_ongoing_forced_publication;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_is_ongoing_forced_publication;

-- 9
Alter Table data_for_history.api_profile
    Drop Column dfh_project_label;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_project_label;

-- 8
Alter Table data_for_history.api_profile
    Drop Column dfh_project_label_language;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_project_label_language;

-- 7
Alter Table data_for_history.api_profile
    Drop Column dfh_owned_by_project;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_owned_by_project;

-- 6
Alter Table data_for_history.api_profile
    Drop Column dfh_profile_definition;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_profile_definition;

-- 5
Alter Table data_for_history.api_profile
    Drop Column dfh_profile_definition_language;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_profile_definition_language;

-- 4
Alter Table data_for_history.api_profile
    Drop Column dfh_profile_label;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_profile_label;

-- 3
Alter Table data_for_history.api_profile
    Drop Column dfh_profile_label_language;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_profile_label_language;

-- 2
Alter Table data_for_history.api_profile
    Drop Column requested_language;

Alter Table data_for_history.api_profile_vt
    Drop Column requested_language;

-- 1
Select
    commons.rename_versioned_table ('data_for_history',
        'api_profile',
        'profile');

