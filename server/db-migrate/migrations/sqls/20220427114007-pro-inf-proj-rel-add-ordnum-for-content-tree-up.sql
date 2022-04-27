/* Replace with your SQL commands */
WITH tw0 AS (
  SELECT
    t2.pk_entity pk_info_proj_rel,
    ROW_NUMBER() OVER (PARTITION BY t1.fk_object_info,
      t2.fk_project ORDER BY t2.ord_num_of_domain ASC,
      t1.pk_entity ASC)
  FROM information.statement t1,
  projects.info_proj_rel t2
  WHERE t2.fk_entity = t1.pk_entity
  AND t1.fk_property = 1317)
UPDATE
  projects.info_proj_rel t1
SET
  ord_num_of_domain = tw0.ROW_NUMBER
FROM
  tw0
WHERE
  tw0.pk_info_proj_rel = pk_entity;

