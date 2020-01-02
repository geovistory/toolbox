-- 1
Select
    commons.rename_versioned_table ('data_for_history',
        'profile',
        'api_profile');

-- 2
Alter Table data_for_history.api_profile
    Add Column requested_language varchar(4);

Alter Table data_for_history.api_profile_vt
    Add Column requested_language varchar(4);

-- 3
Alter Table data_for_history.api_profile
    Add Column dfh_profile_label_language varchar(4);

Alter Table data_for_history.api_profile_vt
    Add Column dfh_profile_label_language varchar(4);

-- 4
Alter Table data_for_history.api_profile
    Add Column dfh_profile_label text;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_profile_label text;

-- 5
Alter Table data_for_history.api_profile
    Add Column dfh_profile_definition_language varchar(4);

Alter Table data_for_history.api_profile_vt
    Add Column dfh_profile_definition_language varchar(4);

-- 6
Alter Table data_for_history.api_profile
    Add Column dfh_profile_definition text;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_profile_definition text;

-- 7
Alter Table data_for_history.api_profile
    Add Column dfh_owned_by_project INTEGER;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_owned_by_project INTEGER;

-- 8
Alter Table data_for_history.api_profile
    Add Column dfh_project_label_language varchar(4);

Alter Table data_for_history.api_profile_vt
    Add Column dfh_project_label_language varchar(4);

-- 9
Alter Table data_for_history.api_profile
    Add Column dfh_project_label text;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_project_label text;

-- 10
Alter Table data_for_history.api_profile
    Add Column dfh_is_ongoing_forced_publication Boolean;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_is_ongoing_forced_publication Boolean;

-- 11
Alter Table data_for_history.api_profile
    Add Column dfh_date_profile_published DATE;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_date_profile_published DATE;

-- 12
Alter Table data_for_history.api_profile
    Add Column dfh_date_profile_deprecated DATE;

Alter Table data_for_history.api_profile_vt
    Add Column dfh_date_profile_deprecated DATE;

-- 13
Alter Table data_for_history.api_profile
    Drop Column dfh_fk_is_subprofile_of;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_fk_is_subprofile_of;

-- 14
Alter Table data_for_history.api_profile
    Drop Column dfh_standard_label;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_standard_label;

-- 15
Alter Table data_for_history.api_profile
    Drop Column dfh_fk_project_of_belonging;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_fk_project_of_belonging;

-- 16
Alter Table data_for_history.api_profile
    Drop Column dfh_start_date;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_start_date;

-- 17
Alter Table data_for_history.api_profile
    Drop Column dfh_end_date;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_end_date;

-- 18
Alter Table data_for_history.api_profile
    Drop Column dfh_creation_time;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_creation_time;

-- 19
Alter Table data_for_history.api_profile
    Drop Column dfh_modification_time;

Alter Table data_for_history.api_profile_vt
    Drop Column dfh_modification_time;

-- 20
Alter Table data_for_history.api_profile
    Drop Constraint unique_dfh_pk_profile;

-- 21
Alter Table data_for_history.api_profile
    Add Constraint unique_dfh_pk_profile_requested_language Unique (dfh_pk_profile, requested_language);

