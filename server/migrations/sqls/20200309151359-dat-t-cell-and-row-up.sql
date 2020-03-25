Alter Table data.values_association
    Drop Constraint If Exists values_association_fk_domain_cell_fkey;

Alter Table data.values_association
    Drop Constraint If Exists values_association_fk_range_cell_fkey;

Drop Table If Exists data.cell;

Drop Table If Exists data.cell_vt;

Drop Materialized View If Exists importer.huygens_data_table_json_prospect;

Drop Table If Exists data.row;

Drop Table If Exists data.row_vt;

