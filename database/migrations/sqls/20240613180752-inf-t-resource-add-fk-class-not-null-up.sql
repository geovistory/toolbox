UPDATE information.resource
SET fk_class = 0
WHERE fk_class IS NULL;

ALTER TABLE information.resource
ALTER COLUMN fk_class SET NOT NULL;