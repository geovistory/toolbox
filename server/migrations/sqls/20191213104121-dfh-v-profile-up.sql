Create Or Replace View data_for_history.v_profile As Select Distinct
    t1.dfh_pk_profile,
    t1.dfh_owned_by_project,
    t1.dfh_is_ongoing_forced_publication,
    t1.dfh_date_profile_published,
    t1.dfh_date_profile_deprecated
From
    data_for_history.api_profile t1;

