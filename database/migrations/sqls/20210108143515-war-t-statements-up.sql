-- 1
CREATE TABLE war.statement
(
    pk_entity integer,
    fk_project integer,
    project integer NOT NULL DEFAULT 0,
    fk_property integer,
    fk_object_info  integer,
    fk_subject_info  integer,
    ord_num_of_domain  integer,
    ord_num_of_range integer,
    is_in_project_count integer
);


CREATE INDEX statement_fk_object_info_idx
    ON war.statement USING btree
    (fk_object_info);

CREATE INDEX statement_fk_project_idx
    ON war.statement USING btree
    (fk_project);

CREATE INDEX statement_fk_property_idx
    ON war.statement USING btree
    (fk_property);

CREATE INDEX statement_fk_subject_info_idx
    ON war.statement USING btree
    (fk_subject_info);

CREATE INDEX statement_pk_entity_idx
    ON war.statement USING btree
    (pk_entity);

CREATE UNIQUE INDEX statement_pk_entity_project_idx
    ON war.statement USING btree
    (pk_entity, project);
