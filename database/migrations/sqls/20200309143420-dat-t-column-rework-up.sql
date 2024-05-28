-- 1 rename column fk_column_type --> fk_column_content_type
Alter Table data.column Rename Column fk_column_type To fk_column_content_type;

Alter Table data.column_vt Rename Column fk_column_type To fk_column_content_type;

-- 2 update system_types where st_column_name was 'fk_column_type'
Update
    system.system_type
Set
    st_column_name = 'fk_column_content_type'
Where
    st_column_name = 'fk_column_type'
    And st_table_name = 'column'
    And st_schema_name = 'data';

-- 3 add column fk_column_relationship_type
Alter Table data. "column"
    Add Column fk_column_relationship_type integer Not Null Default 3367;

Alter Table data. "column_vt"
    Add Column fk_column_relationship_type integer;

