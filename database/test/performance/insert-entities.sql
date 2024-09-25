-- Dummy-test used to check if the test setup is working
BEGIN;

/********* 
 ***** HELPER FUNCTIONS to create meaningful data 
 *********/
-- Function to get the class ID based on the label
CREATE
OR REPLACE FUNCTION commons.get_class_id(label text) RETURNS int AS $$
BEGIN -- Inspired by https://github.com/geovistory/geovpylib/blob/master/geovpylib/pks/classes.py
    IF label = 'person' THEN RETURN 21;

END IF;

IF label = 'aial' THEN RETURN 365;

END IF;

-- Return NULL if the label does not match
RETURN NULL;

END;

$$ LANGUAGE plpgsql;

-- Function to get the property ID based on the label
CREATE
OR REPLACE FUNCTION commons.get_property_id(label text) RETURNS int AS $$
BEGIN -- Inspired by https://github.com/geovistory/geovpylib/blob/master/geovpylib/pks/properties.py
    IF label = 'aial_isAppelationForLanguageOf_entity' THEN RETURN 1111;

END IF;

IF label = 'aial_usedInLanguage_language' THEN RETURN 1112;

END IF;

IF label = 'aial_refersToName_appellation' THEN RETURN 1113;

END IF;

-- Return NULL if the label does not match
RETURN NULL;

END;

$$ LANGUAGE plpgsql;

-- Function to create a new entity and return its ID. The created entity is added to the project.
CREATE
OR REPLACE FUNCTION commons.create_entity(fk_class int, fk_project int, fk_account int) RETURNS int AS $$
DECLARE id int;

BEGIN
INSERT INTO information.resource (fk_class, community_visibility)
VALUES (fk_class, '{"toolbox":true, "dataApi":true}') RETURNING pk_entity INTO id;

-- Add the created entity to the project
INSERT INTO projects.info_proj_rel (
        fk_entity,
        fk_project,
        is_in_project,
        fk_last_modifier,
        fk_creator
    )
SELECT id,
    fk_project,
    true,
    fk_account,
    fk_account;

RETURN id;

END;

$$ LANGUAGE plpgsql;

-- Function to create a new appellation and return its ID
CREATE
OR REPLACE FUNCTION commons.create_appellation(string text) RETURNS int AS $$
DECLARE id int;

BEGIN
INSERT INTO information.appellation (string, fk_class)
VALUES (string, 40) RETURNING pk_entity INTO id;

RETURN id;

END;

$$ LANGUAGE plpgsql;

-- Function to create a new statement and return its ID. The created statement is added to the project.
CREATE
OR REPLACE FUNCTION commons.create_statement(
    fk_subject_info int,
    fk_property int,
    fk_object_info int,
    fk_project int,
    fk_account int
) RETURNS int AS $$
DECLARE id int;

BEGIN
INSERT INTO information.statement (
        fk_subject_info,
        fk_property,
        fk_object_info
    )
VALUES (fk_subject_info, fk_property, fk_object_info) RETURNING pk_entity INTO id;

-- Add the created statement to the project
INSERT INTO projects.info_proj_rel (
        fk_entity,
        fk_project,
        is_in_project,
        fk_last_modifier,
        fk_creator
    )
SELECT id,
    fk_project,
    true,
    fk_account,
    fk_account;

RETURN id;

END;

$$ LANGUAGE plpgsql;

-- Function to create a person entity with a name (aial) and add all created items to the project
CREATE
OR REPLACE FUNCTION commons.create_person(project_id int, account_id int) RETURNS int AS $$
DECLARE -- Declare variables here
    person_id int;

aial_id int;

string_id int;

BEGIN -- Create person
SELECT commons.create_entity(
        commons.get_class_id('person'),
        project_id,
        account_id
    ) INTO person_id;

-- Create appellation in a language (aial)
SELECT commons.create_entity(
        commons.get_class_id('aial'),
        project_id,
        account_id
    ) INTO aial_id;

-- -- Create string
SELECT commons.create_appellation(concat('person ', person_id)) INTO string_id;

-- -- Create statement aial -> is appellation of -> person
PERFORM commons.create_statement(
    aial_id,
    commons.get_property_id('aial_isAppelationForLanguageOf_entity'),
    person_id,
    project_id,
    account_id
);

-- -- Create statement aial -> has name -> string
PERFORM commons.create_statement(
    aial_id,
    commons.get_property_id('aial_refersToName_appellation'),
    string_id,
    project_id,
    account_id
);

-- Return the person ID
RETURN person_id;

END;

$$ LANGUAGE plpgsql;

/********* 
 ***** END OF HELPER FUNCTIONS
 *********/
SELECT plan(1);

PREPARE create_person AS
SELECT commons.create_person(591, 7);

SELECT performs_within(
        'create_person',
        10, --avg ms
        10, --within -> max 20 ms
        100,
        'Assert that inserting a person with a name takes less than 20ms'
    );

SELECT *
FROM finish();

ROLLBACK;