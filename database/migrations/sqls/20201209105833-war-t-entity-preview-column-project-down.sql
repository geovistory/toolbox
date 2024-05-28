ALTER TABLE war.entity_preview
  ALTER COLUMN project DROP DEFAULT;

ALTER TABLE war.entity_preview
  ALTER COLUMN project drop NOT NULL;

