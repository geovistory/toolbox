/* Replace with your SQL commands */
UPDATE
  projects.info_proj_rel
SET
  ord_num_of_range = ord_num_of_range + 1
WHERE
  ord_num_of_range IS NOT NULL;

UPDATE
  projects.info_proj_rel
SET
  ord_num_of_domain = ord_num_of_domain + 1
WHERE
  ord_num_of_domain IS NOT NULL;

