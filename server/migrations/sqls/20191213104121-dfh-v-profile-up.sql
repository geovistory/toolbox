Create Or Replace View data_for_history.v_profile As Select Distinct
    t1.dfh_pk_profile As pk_profile,
    t1.dfh_owned_by_project As owned_by_project,
    t1.dfh_is_ongoing_forced_publication As is_ongoing_forced_publication,
    t1.dfh_date_profile_published As date_profile_published,
    t1.dfh_date_profile_deprecated As date_profile_deprecated,
    t1.tmsp_last_dfh_update As tmsp_last_dfh_update
From
    data_for_history.api_profile t1;

