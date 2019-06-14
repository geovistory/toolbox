/* Replace with your SQL commands */
CREATE INDEX ON projects.info_proj_rel (fk_entity);

CREATE INDEX ON projects.info_proj_rel (fk_project);

CREATE INDEX ON information.role (fk_entity);

CREATE INDEX ON information.role (fk_temporal_entity);

CREATE INDEX ON information.entity_association (fk_info_domain);

CREATE INDEX ON information.entity_association (fk_info_range);

CREATE INDEX ON information.text_property (fk_concerned_entity);
