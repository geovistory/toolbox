CREATE INDEX IF NOT EXISTS entity_preview_template_project_idx ON war.entity_preview_template(project);

CREATE INDEX IF NOT EXISTS entity_preview_template_fk_project_idx ON war.entity_preview_template(fk_project);

CREATE INDEX IF NOT EXISTS entity_preview_template_fk_class_idx ON war.entity_preview_template(fk_class);

CREATE INDEX IF NOT EXISTS entity_preview_template_entity_type_idx ON war.entity_preview_template(entity_type);

