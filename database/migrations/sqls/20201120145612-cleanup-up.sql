

-- delete duplicates of outgoing property labels
DELETE FROM projects.text_property
WHERE pk_entity IN
    (
	SELECT pk_entity
    FROM
        (
			SELECT pk_entity, string,
			 ROW_NUMBER() OVER( PARTITION BY (fk_project,fk_dfh_property,fk_dfh_property_domain,fk_language)
			ORDER BY  pk_entity ) AS row_num
			FROM  projects.text_property
			 WHERE fk_system_type = 639
			 AND fk_project IS NOT NULL
			 AND fk_dfh_property IS NOT NULL
			 AND fk_dfh_property_domain IS NOT NULL
			 AND fk_language IS NOT NULL
		) t
        WHERE t.row_num > 1
	);

-- create uniq constraint for outgoing property labels
ALTER TABLE projects.text_property ADD CONSTRAINT uniq_outgoing_property_label UNIQUE (fk_project,fk_dfh_property,fk_dfh_property_domain,fk_language);


-- delete duplicates of incoming property labels
DELETE FROM projects.text_property
WHERE pk_entity IN
    (
	SELECT pk_entity
    FROM
        (
			SELECT pk_entity, string,
			 ROW_NUMBER() OVER( PARTITION BY (fk_project,fk_dfh_property,fk_dfh_property_range,fk_language)
			ORDER BY  pk_entity ) AS row_num
			FROM  projects.text_property
			 WHERE fk_system_type = 639
			 AND fk_project IS NOT NULL
			 AND fk_dfh_property IS NOT NULL
			 AND fk_dfh_property_range IS NOT NULL
			 AND fk_language IS NOT NULL
		) t
        WHERE t.row_num > 1
	);

-- create uniq constraint for incoming property labels
ALTER TABLE projects.text_property ADD CONSTRAINT uniq_incoming_property_label UNIQUE (fk_project,fk_dfh_property,fk_dfh_property_range,fk_language)
