ALTER TABLE war.statement
    ADD CONSTRAINT statement_pk_entity_project_key UNIQUE (pk_entity, project);
