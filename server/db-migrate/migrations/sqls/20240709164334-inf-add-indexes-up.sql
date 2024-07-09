CREATE INDEX IF NOT EXISTS statement_outgoing_field_idx ON information.statement (
    fk_subject_info,
    fk_subject_data,
    fk_subject_tables_cell,
    fk_subject_tables_row,
    fk_property
);
CREATE INDEX IF NOT EXISTS statement_incoming_field_idx ON information.statement (
    fk_object_info,
    fk_object_data,
    fk_object_tables_cell,
    fk_object_tables_row,
    fk_property
);