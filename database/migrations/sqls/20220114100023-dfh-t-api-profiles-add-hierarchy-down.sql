ALTER TABLE data_for_history.api_profile
  DROP COLUMN dfh_is_root_profile;

ALTER TABLE data_for_history.api_profile_vt
  DROP COLUMN dfh_is_root_profile;

ALTER TABLE data_for_history.api_profile
  DROP COLUMN dfh_fk_root_profile;

ALTER TABLE data_for_history.api_profile_vt
  DROP COLUMN dfh_fk_root_profile;

