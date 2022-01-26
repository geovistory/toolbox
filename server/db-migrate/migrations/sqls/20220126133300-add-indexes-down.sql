/* ADD INDEXES TO STATEMENT TABLE*/

DROP INDEX information.statement_fk_subject_tables_cell_idx;

DROP INDEX information.statement_fk_property_idx;


/* ADD INDEXES TO PARENT CELL TABLE*/

DROP INDEX tables.cell_pk_cell_idx;

DROP INDEX tables.cell_fk_row_idx;

DROP INDEX tables.cell_fk_column_idx;
