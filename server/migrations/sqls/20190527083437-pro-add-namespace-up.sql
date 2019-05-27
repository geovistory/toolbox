INSERT INTO data.namespace (fk_project, standard_label)
WITH proj_without_nsmp AS (
	SELECT pk_entity FROM
	projects.project
	EXCEPT
	SELECT fk_project FROM
	data.namespace
)
SELECT pk_entity as fk_project, 'Default Namespace'
FROM proj_without_nsmp;
