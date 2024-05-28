CREATE TEMP TABLE to_delete ON COMMIT DROP AS
SELECT
  t1.fk_object_info, t1.pk_entity statement_id, t2.pk_entity chunk_id, t4.pk_entity info_project_rel_id, t2.string chunk_string, t2.fk_text, t2.fk_namespace chunk_namespace, t3.fk_project chunk_namespace_project, t4.fk_project statement_project, t4.is_in_project, t5.pk_entity digital_id, t5.fk_namespace digital_namespace, t1.metadata
FROM
  information.statement t1, data.chunk t2, data.namespace t3, projects.info_proj_rel t4, data.digital t5
WHERE
  t1.fk_subject_data = t2.pk_entity
  AND t2.fk_namespace = t3.pk_entity
  AND t1.pk_entity = t4.fk_entity
  AND t5.pk_text = t2.fk_text
  AND t2.fk_namespace != t5.fk_namespace;

DELETE FROM projects.info_proj_rel t1 USING to_delete
WHERE to_delete.info_project_rel_id = t1.pk_entity;

DELETE FROM information.statement t1 USING to_delete
WHERE to_delete.statement_id = t1.pk_entity;

DELETE FROM projects.info_proj_rel t1 USING to_delete
WHERE to_delete.info_project_rel_id = t1.pk_entity;

DELETE FROM data.chunk t1 USING to_delete
WHERE to_delete.chunk_id = t1.pk_entity;


/* these can be used to test the result of the migration

-- should be zero
SELECT count(*)
FROM information.statement t1,
 data.chunk t2,
 data.namespace t3,
 projects.info_proj_rel t4,
 data.digital t5
WHERE t1.fk_subject_data = t2.pk_entity
AND t2.fk_namespace = t3.pk_entity
AND t1.pk_entity = t4.fk_entity
AND t5.pk_text = t2.fk_text
AND t2.fk_namespace != t5.fk_namespace;

-- number of chunks, statements and info_project_rels per project wrongly linked to a digital of another namespace
-- should be zero
SELECT count(*), t4.fk_project, t1.fk_object_info
FROM information.statement t1,
 data.chunk t2,
 data.namespace t3,
 projects.info_proj_rel t4,
 data.digital t5
WHERE t1.fk_subject_data = t2.pk_entity
AND t2.fk_namespace = t3.pk_entity
AND t1.pk_entity = t4.fk_entity
AND t5.pk_text = t2.fk_text
AND t2.fk_namespace != t5.fk_namespace
GROUP BY (t1.fk_object_info, t4.fk_project)
ORDER BY count(t2.pk_entity) desc;

-- count should be 3 in each project
SELECT count(*), t4.fk_project, t1.fk_object_info
FROM information.statement t1,
 data.chunk t2,
 data.namespace t3,
 projects.info_proj_rel t4,
 data.digital t5
WHERE t1.fk_subject_data = t2.pk_entity
AND t2.fk_namespace = t3.pk_entity
AND t1.pk_entity = t4.fk_entity
AND t5.pk_text = t2.fk_text
--AND t1.fk_object_info = 25442
AND t2.fk_namespace = t5.fk_namespace
GROUP BY (t1.fk_object_info, t4.fk_project)
ORDER BY count(t2.pk_entity) desc;


-- Should be 1416 for project 591
SELECT count(*), t4.fk_project, t1.fk_object_info
FROM information.statement t1,
 data.chunk t2,
 data.namespace t3,
 projects.info_proj_rel t4,
 data.digital t5
WHERE t1.fk_subject_data = t2.pk_entity
AND t2.fk_namespace = t3.pk_entity
AND t1.pk_entity = t4.fk_entity
AND t5.pk_text = t2.fk_text
AND t1.fk_object_info = 774022
AND t2.fk_namespace = t5.fk_namespace
GROUP BY (t1.fk_object_info, t4.fk_project)
ORDER BY count(t2.pk_entity) desc;
 */
