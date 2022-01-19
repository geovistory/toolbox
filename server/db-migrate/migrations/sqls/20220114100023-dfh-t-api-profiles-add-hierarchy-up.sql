ALTER TABLE data_for_history.api_profile
  ADD COLUMN dfh_is_root_profile BOOLEAN DEFAULT FALSE;

ALTER TABLE data_for_history.api_profile_vt
  ADD COLUMN dfh_is_root_profile BOOLEAN DEFAULT FALSE;

ALTER TABLE data_for_history.api_profile
  ADD COLUMN dfh_fk_root_profile INT;

ALTER TABLE data_for_history.api_profile_vt
  ADD COLUMN dfh_fk_root_profile INT;

