UPDATE
  system.config t1
SET
  config = replace(t2.config::text, 'valueObjectType', 'mapsToListType')::jsonb
FROM
  system.config t2
WHERE
  t1.pk_entity = t2.pk_entity;

