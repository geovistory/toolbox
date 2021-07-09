/* Replace with your SQL commands */

ALTER TABLE information.resource ADD COLUMN community_visibility JSONB;
ALTER TABLE information.resource_vt ADD COLUMN community_visibility JSONB;
