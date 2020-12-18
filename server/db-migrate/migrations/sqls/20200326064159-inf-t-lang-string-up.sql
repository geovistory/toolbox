-- 1 (Inherits all for the string from table commons.text)
Create Table information.lang_string (
    fk_language integer Not Null,
    fk_class integer Not Null,
    entity_version integer Default 1,
    Foreign Key (fk_language) References information.language (pk_entity)
)
Inherits (
    information.entity,
    commons.text
);

-- 2
Create Index On information.lang_string (pk_entity);

Create Index On information.lang_string (fk_language);

Create Trigger update_entity_version_key
    Before Update On information.lang_string For Each Row
    Execute Procedure commons.update_entity_version_key ();

Create Trigger sync_quill_doc_and_string
    Before Insert Or Update On information.lang_string For Each Row
    Execute Procedure commons.text__sync_quill_doc_and_string ();

Alter Table information.lang_string
    Add Constraint unique__fk_language__fk_class__string Unique (fk_language, fk_class, string);

-- 3
Select
    commons.init_entity_child_table ('information.lang_string');

-- 4
Alter Table information.lang_string_vt INHERIT commons.text_vt;

-- 5
Create View information.v_lang_string As
Select
    *
From
    information.lang_string;

-- 6
Create Function information.v_lang_string_find_or_create ()
    Returns Trigger
    Language 'plpgsql'
    Cost 100 Volatile Not Leakproof
    As $BODY$
Declare
    resulting_pk integer;
    resulting_row information.v_lang_string;
Begin
    ------ if existing, store in result -----
    Select
        pk_entity
    From
        Into resulting_pk information.lang_string
    Where
        fk_class Is Not Distinct From NEW.fk_class
        And fk_language Is Not Distinct From NEW.fk_language
        And string = coalesce(NEW.string, commons.quill_doc_to_string (NEW.quill_doc));
    -- RAISE INFO 'resulting_pk: %', resulting_pk;
    ------- if not existing, insert and store in result -----
    If Not FOUND Then
        --RAISE INFO 'Not found, creating new...';
        With _insert As (
Insert Into information.lang_string (fk_class, fk_language, string, quill_doc)
                Values (NEW.fk_class, NEW.fk_language, NEW.string, NEW.quill_doc)
                -- return all fields of the new row
            Returning
                *)
            Select
                pk_entity
            From
                Into resulting_pk _insert;
        -- RAISE INFO 'result of insert: %', resulting_row;
    End If;
    Select
        *
    From
        Into resulting_row information.v_lang_string
    Where
        pk_entity = resulting_pk;
    Return resulting_row;
End;
$BODY$;

-- 7
Create Trigger on_insert
    Instead Of INSERT On information.v_lang_string For Each Row
    Execute Procedure information.v_lang_string_find_or_create ();

