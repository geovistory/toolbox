CREATE INDEX project_fk_language_idx ON projects.project(fk_language);

CREATE INDEX entity_preview_fk_project_idx ON pgwar.entity_preview(fk_project);

CREATE
OR REPLACE FUNCTION  pgwar.update_entity_class() RETURNS void AS $$
DECLARE
    _job_name text;
BEGIN
    _job_name := 'update-entity-class';

    -- initialize offset, if needed
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- get current offset
    WITH _offset AS (
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ),
     project_lang AS (
    -- select project/community id and its language
        SELECT 
            proj.pk_entity as fk_project,
            COALESCE(TRIM(iso6391), 'en') lang_code, -- language code or english
            proj.tmsp_last_modification AS project_modified,
            lang.tmsp_last_modification AS language_modified
        FROM projects.project proj
        LEFT JOIN information.language lang ON proj.fk_language = lang.pk_entity
        WHERE lang.pk_entity = proj.fk_language
        UNION 
        SELECT 0, 'en', NULL, NULL -- add a row for community in english
    ),
    class_metadata AS (
        -- get the class labels and entity type
        SELECT DISTINCT ON (cla.dfh_pk_class, cla.dfh_class_label_language)
                cla.dfh_pk_class AS fk_class,
                cla.dfh_class_label AS class_label,
                cla.dfh_class_label_language as lang_code,
                cla.tmsp_last_modification as class_modified,
                CASE WHEN 70 = ANY (cla.dfh_parent_classes || cla.dfh_ancestor_classes) 
                    THEN 'peIt' 
                    ELSE  'teEn'
                END entity_type,
                cla.dfh_parent_classes,
                cla.dfh_ancestor_classes
        FROM 	data_for_history.api_class cla
        ORDER BY 
                cla.dfh_pk_class, 
                cla.dfh_class_label_language, 
                cla.removed_from_api ASC, -- prioritize false over true
                cla.tmsp_last_modification DESC -- prioritize newer labels
            
    ),
    entity_preview_with_class_metadata AS (
        -- join entity previews with class metadata 
        SELECT 
                    ep.pk_entity,
                    ep.fk_project,
                    ep.fk_class,
                    COALESCE(meta.class_label, meta_en.class_label) AS class_label,
                    COALESCE(meta.entity_type, meta_en.entity_type) AS entity_type,
                    COALESCE(meta.dfh_parent_classes, meta_en.dfh_parent_classes) AS dfh_parent_classes,
                    COALESCE(meta.dfh_ancestor_classes, meta_en.dfh_ancestor_classes) AS dfh_ancestor_classes,
                    COALESCE(meta.class_modified, meta_en.class_modified) AS class_modified,
                    project_lang.project_modified,
                    project_lang.language_modified,
                    ep.tmsp_fk_class_modification
        FROM 		project_lang
        JOIN		pgwar.entity_preview ep ON project_lang.fk_project = ep.fk_project
        LEFT JOIN 	class_metadata meta ON ep.fk_class = meta.fk_class AND meta.lang_code = project_lang.lang_code
        LEFT JOIN 	class_metadata meta_en ON ep.fk_class = meta_en.fk_class AND meta_en.lang_code = 'en'
    )
    UPDATE  pgwar.entity_preview ep
    SET     class_label = meta.class_label,
            entity_type = meta.entity_type,
            parent_classes = to_jsonb(meta.dfh_parent_classes),
            ancestor_classes = to_jsonb(meta.dfh_ancestor_classes)
    FROM 	entity_preview_with_class_metadata meta,
            _offset
    WHERE   ep.pk_entity = meta.pk_entity
    AND     ep.fk_project = meta.fk_project
    AND (
            meta.class_modified > _offset.offset_tmsp OR
            meta.project_modified > _offset.offset_tmsp OR
            meta.language_modified > _offset.offset_tmsp OR
            meta.tmsp_fk_class_modification > _offset.offset_tmsp
        );
    

    -- set the offset
    UPDATE pgwar.offsets
    SET offset_tmsp = CURRENT_TIMESTAMP
	WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;
