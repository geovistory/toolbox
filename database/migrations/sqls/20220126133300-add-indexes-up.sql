/* ADD INDEXES TO PARENT CELL TABLE*/

CREATE INDEX cell_fk_column_idx
    ON tables.cell USING btree
    (fk_column ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX cell_fk_row_idx
    ON tables.cell USING btree
    (fk_row ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX cell_pk_cell_idx
    ON tables.cell USING btree
    (pk_cell ASC NULLS LAST);

/* ADD INDEXES TO STATEMENT TABLE*/

CREATE INDEX statement_fk_property_idx
    ON information.statement USING btree
    (fk_property ASC NULLS LAST);

CREATE INDEX statement_fk_subject_tables_cell_idx
    ON information.statement USING btree
    (fk_subject_tables_cell ASC NULLS LAST);
