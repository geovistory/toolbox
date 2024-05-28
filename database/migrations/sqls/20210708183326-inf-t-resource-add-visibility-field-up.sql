/* Replace with your SQL commands */
ALTER TABLE information.resource
  ADD COLUMN community_visibility JSONB;

ALTER TABLE information.resource_vt
  ADD COLUMN community_visibility JSONB;

UPDATE
  information.resource
SET
  community_visibility = '{"toolbox":true,"website":false,"dataApi":false}';

