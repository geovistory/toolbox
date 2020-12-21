-- 3
Alter Table data. "column"
    Drop Column fk_column_relationship_type;

Alter Table data. "column_vt"
    Drop Column fk_column_relationship_type;

-- 2
Update
    system.system_type
Set
    st_column_name = 'fk_column_type'
Where
    st_column_name = 'fk_column_content_type'
    And st_table_name = 'column'
    And st_schema_name = 'data';

-- 1
Alter Table data.column Rename Column fk_column_content_type To fk_column_type;

Alter Table data.column_vt Rename Column fk_column_content_type To fk_column_type;

