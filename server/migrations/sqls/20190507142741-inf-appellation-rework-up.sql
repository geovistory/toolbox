-------------------------------------------------------------------------
-- 1. DROP v_appellation and dependent views
-------------------------------------------------------------------------
DROP view warehouse.v_entity_preview;
DROP view warehouse.v_entity_preview_non_recursive;
DROP view warehouse.v_own_entity_label;
DROP view warehouse.v_own_full_text;
DROP VIEW information.v_appellation;

-------------------------------------------------------------------------
-- 2. Replace v_appellation and make use of the new string column
-------------------------------------------------------------------------
CREATE VIEW information.v_appellation AS
 SELECT appellation.pk_entity,
    appellation.schema_name,
    appellation.table_name,
    appellation.notes,
    appellation.fk_creator,
    appellation.fk_last_modifier,
    appellation.tmsp_creation,
    appellation.tmsp_last_modification,
    appellation.sys_period,
    appellation.fk_class,
    appellation.quill_doc,
    appellation.string
   FROM information.appellation;

-------------------------------------------------------------------------
-- 3. Replace v_appellation_find_or_create 
-------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION information.v_appellation_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
  DECLARE
    resulting_row information.v_appellation;
  BEGIN

    -- RAISE INFO 'input values: %', NEW;
      
    ------ if existing, store in result -----
    SELECT * FROM INTO resulting_row information.appellation
      WHERE 
      quill_doc::jsonb = NEW.quill_doc::jsonb
      AND fk_class = NEW.fk_class;
        
          -- RAISE INFO 'result of select: %', resulting_row;

    ------- if not existing, insert and store in result -----
      IF NOT FOUND THEN
        
            -- RAISE INFO 'Not found, creating new...';
      
          WITH _insert AS (
              INSERT INTO information.appellation (
                quill_doc, 
                fk_class
              ) 
              VALUES (
                NEW.quill_doc, 
                NEW.fk_class
              )
              -- return all fields of the new row
              RETURNING *
              ) 
          SELECT * FROM INTO resulting_row _insert;
      
            -- RAISE INFO 'result of insert: %', resulting_row;
    END IF;

  RETURN resulting_row;
    END;
    $BODY$;

CREATE TRIGGER _01_sync_quill_doc_and_string
      INSTEAD OF INSERT
    ON information.v_appellation
    FOR EACH ROW
    EXECUTE PROCEDURE commons.text__sync_quill_doc_and_string();

CREATE TRIGGER _02_find_or_create
    INSTEAD OF INSERT
    ON information.v_appellation
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_appellation_find_or_create();


-------------------------------------------------------------------------
-- 4. ADD VIEWS dropped above
-------------------------------------------------------------------------


CREATE OR REPLACE VIEW warehouse.v_own_full_text AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), field AS (
         SELECT e.pk_entity,
            e.fk_project,
            e.project,
            e.fk_class,
            e.table_name,
            e.entity_type,
            f.fk_property,
            f.fk_class_field,
            f.fk_class,
            f.field_order
           FROM information.v_ordered_fields_per_class f
             JOIN entities e ON f.fk_class = e.fk_class
          WHERE f.field_order IS NOT NULL
        ), string_from_role AS (
         SELECT all_roles.pk_entity,
            all_roles.fk_project,
            all_roles.project,
            all_roles.fk_class,
            all_roles.table_name,
            all_roles.entity_type,
            all_roles.fk_property,
            all_roles.fk_class_field,
            all_roles.fk_class_1 AS fk_class,
            all_roles.field_order,
            all_roles.string,
            all_roles.role_number
           FROM ( SELECT field.pk_entity,
                    field.fk_project,
                    field.project,
                    field.fk_class,
                    field.table_name,
                    field.entity_type,
                    field.fk_property,
                    field.fk_class_field,
                    field.fk_class_1 AS fk_class,
                    field.field_order,
                    COALESCE(appe.string, lang.notes) AS string,
                    row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY r.rank_for_pe_it) AS role_number
                   FROM field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
                     LEFT JOIN warehouse.v_roles_per_project_and_repo r ON field.fk_property = r.fk_property AND field.pk_entity = r.fk_temporal_entity AND NOT r.fk_project IS DISTINCT FROM field.fk_project
                     LEFT JOIN information.v_appellation appe ON r.fk_entity = appe.pk_entity
                     LEFT JOIN information.v_language lang ON r.fk_entity = lang.pk_entity) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
        ), string_from_text_prop AS (
         SELECT all_txtp.pk_entity,
            all_txtp.fk_project,
            all_txtp.project,
            all_txtp.fk_class,
            all_txtp.table_name,
            all_txtp.entity_type,
            all_txtp.fk_property,
            all_txtp.fk_class_field,
            all_txtp.fk_class_1 AS fk_class,
            all_txtp.field_order,
            all_txtp.string,
            all_txtp.txtp_number
           FROM ( SELECT field.pk_entity,
                    field.fk_project,
                    field.project,
                    field.fk_class,
                    field.table_name,
                    field.entity_type,
                    field.fk_property,
                    field.fk_class_field,
                    field.fk_class_1 AS fk_class,
                    field.field_order,
                    regexp_replace(txtp.string, '[

]+'::text, ''::text, 'g'::text) AS string,
                    row_number() OVER (PARTITION BY field.pk_entity, field.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
                   FROM field field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order)
                     LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON NOT field.fk_class_field IS DISTINCT FROM txtp.fk_class_field AND txtp.fk_concerned_entity = field.pk_entity AND NOT txtp.fk_project IS DISTINCT FROM field.fk_project) all_txtp(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
        ), all_stings AS (
         SELECT string_from_text_prop.pk_entity,
            string_from_text_prop.fk_project,
            string_from_text_prop.project,
            string_from_text_prop.fk_class,
            string_from_text_prop.table_name,
            string_from_text_prop.entity_type,
            string_from_text_prop.fk_property,
            string_from_text_prop.fk_class_field,
            string_from_text_prop.fk_class_1 AS fk_class,
            string_from_text_prop.field_order,
            string_from_text_prop.string,
            string_from_text_prop.txtp_number
           FROM string_from_text_prop string_from_text_prop(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
        UNION
         SELECT string_from_role.pk_entity,
            string_from_role.fk_project,
            string_from_role.project,
            string_from_role.fk_class,
            string_from_role.table_name,
            string_from_role.entity_type,
            string_from_role.fk_property,
            string_from_role.fk_class_field,
            string_from_role.fk_class_1 AS fk_class,
            string_from_role.field_order,
            string_from_role.string,
            string_from_role.role_number
           FROM string_from_role string_from_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, role_number)
        ), aggregated AS (
         SELECT all_stings.pk_entity,
            all_stings.fk_project,
            all_stings.project,
            string_agg(all_stings.string, ', '::text ORDER BY all_stings.field_order) AS own_full_text
           FROM all_stings all_stings(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, field_order, string, txtp_number)
          GROUP BY all_stings.pk_entity, all_stings.fk_project, all_stings.project
        )
 SELECT aggregated.pk_entity,
    aggregated.fk_project,
    aggregated.project,
    aggregated.own_full_text
   FROM aggregated;


CREATE OR REPLACE VIEW warehouse.v_own_entity_label AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), first_field AS (
         SELECT e.pk_entity,
            e.fk_project,
            e.project,
            e.fk_class,
            e.table_name,
            e.entity_type,
            f.fk_property,
            f.fk_class_field,
            f.fk_class
           FROM information.v_ordered_fields_per_class f
             JOIN entities e ON f.fk_class = e.fk_class
          WHERE f.field_order = 0
        ), string_from_first_role AS (
         SELECT all_roles.pk_entity,
            all_roles.fk_project,
            all_roles.project,
            all_roles.fk_class,
            all_roles.table_name,
            all_roles.entity_type,
            all_roles.fk_property,
            all_roles.fk_class_field,
            all_roles.fk_class_1 AS fk_class,
            all_roles.string_from_first_role,
            all_roles.role_number
           FROM ( SELECT first_field.pk_entity,
                    first_field.fk_project,
                    first_field.project,
                    first_field.fk_class,
                    first_field.table_name,
                    first_field.entity_type,
                    first_field.fk_property,
                    first_field.fk_class_field,
                    first_field.fk_class_1 AS fk_class,
                    COALESCE(appe.string, lang.notes) AS string_from_first_role,
                    row_number() OVER (PARTITION BY first_field.pk_entity, first_field.project ORDER BY r.rank_for_pe_it) AS role_number
                   FROM first_field first_field(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1)
                     LEFT JOIN warehouse.v_roles_per_project_and_repo r ON first_field.fk_property = r.fk_property AND first_field.pk_entity = r.fk_temporal_entity AND NOT r.fk_project IS DISTINCT FROM first_field.fk_project
                     LEFT JOIN information.v_appellation appe ON r.fk_entity = appe.pk_entity
                     LEFT JOIN information.v_language lang ON r.fk_entity = lang.pk_entity) all_roles(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
          WHERE all_roles.role_number = 1
        ), string_from_first_text_prop AS (
         SELECT all_txtp.p,
            all_txtp.pk_entity,
            all_txtp.fk_project,
            all_txtp.project,
            all_txtp.fk_class,
            all_txtp.table_name,
            all_txtp.entity_type,
            all_txtp.fk_property,
            all_txtp.fk_class_field,
            all_txtp.fk_class_1 AS fk_class,
            all_txtp.string_from_first_role,
            all_txtp.role_number,
            all_txtp.string_from_first_text_prop,
            all_txtp.txtp_number
           FROM ( SELECT COALESCE(string_from_first_role.fk_project, 0) AS p,
                    string_from_first_role.pk_entity,
                    string_from_first_role.fk_project,
                    string_from_first_role.project,
                    string_from_first_role.fk_class,
                    string_from_first_role.table_name,
                    string_from_first_role.entity_type,
                    string_from_first_role.fk_property,
                    string_from_first_role.fk_class_field,
                    string_from_first_role.fk_class_1 AS fk_class,
                    string_from_first_role.string_from_first_role,
                    string_from_first_role.role_number,
                    txtp.string AS string_from_first_text_prop,
                    row_number() OVER (PARTITION BY string_from_first_role.pk_entity, string_from_first_role.project ORDER BY txtp.tmsp_creation DESC) AS txtp_number
                   FROM string_from_first_role string_from_first_role(pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number)
                     LEFT JOIN warehouse.v_text_properties_per_project_and_repo txtp ON NOT string_from_first_role.fk_class_field IS DISTINCT FROM txtp.fk_class_field AND txtp.fk_concerned_entity = string_from_first_role.pk_entity AND NOT txtp.fk_project IS DISTINCT FROM string_from_first_role.fk_project) all_txtp(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number)
          WHERE all_txtp.txtp_number = 1
        )
 SELECT string_from_first_text_prop.pk_entity,
    string_from_first_text_prop.fk_project,
    COALESCE(string_from_first_text_prop.string_from_first_role, string_from_first_text_prop.string_from_first_text_prop) AS entity_label,
    string_from_first_text_prop.project
   FROM string_from_first_text_prop string_from_first_text_prop(p, pk_entity, fk_project, project, fk_class, table_name, entity_type, fk_property, fk_class_field, fk_class_1, string_from_first_role, role_number, string_from_first_text_prop, txtp_number);




CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS
 WITH entities AS (
         SELECT v_entities.pk_entity,
            v_entities.fk_project,
            v_entities.project,
            v_entities.fk_class,
            v_entities.table_name,
            v_entities.entity_type
           FROM warehouse.v_entities
        ), add_class_label AS (
         SELECT entities.pk_entity,
            entities.fk_project,
            entities.project,
            entities.fk_class,
            entities.table_name,
            entities.entity_type,
            c.class_label
           FROM entities
             JOIN warehouse.class_preview c ON c.dfh_pk_class = entities.fk_class
        ), add_own_entity_label AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            l.entity_label
           FROM add_class_label a
             LEFT JOIN warehouse.v_own_entity_label l ON a.pk_entity = l.pk_entity AND a.project = l.project
        ), add_time_span AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            t.time_span
           FROM add_own_entity_label a
             LEFT JOIN information.v_te_en_time_span_per_project_and_repo t ON a.pk_entity = t.fk_temporal_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
        ), add_own_full_text AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            a.time_span,
            t.own_full_text
           FROM add_time_span a
             LEFT JOIN warehouse.v_own_full_text t ON a.pk_entity = t.pk_entity AND a.project = t.project
        ), add_fk_entity_label AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            a.time_span,
            a.own_full_text,
            t.fk_entity_label
           FROM add_own_full_text a
             LEFT JOIN warehouse.v_fk_entity_label t ON a.pk_entity = t.pk_entity AND NOT a.fk_project IS DISTINCT FROM t.fk_project
        ), add_fk_type AS (
         SELECT a.pk_entity,
            a.fk_project,
            a.project,
            a.fk_class,
            a.table_name,
            a.entity_type,
            a.class_label,
            a.entity_label,
            a.time_span,
            a.own_full_text,
            a.fk_entity_label,
            t.fk_type
           FROM add_fk_entity_label a
             LEFT JOIN warehouse.v_fk_type t ON a.pk_entity = t.pk_entity AND a.project = t.project
        )
 SELECT add_fk_type.pk_entity,
    add_fk_type.fk_project,
    add_fk_type.project,
    add_fk_type.fk_class,
    add_fk_type.table_name,
    add_fk_type.entity_type,
    add_fk_type.class_label,
    add_fk_type.entity_label,
    add_fk_type.time_span,
    add_fk_type.own_full_text,
    add_fk_type.fk_entity_label,
    add_fk_type.fk_type
   FROM add_fk_type;



CREATE OR REPLACE VIEW warehouse.v_entity_preview AS
 WITH previews_non_recursive AS (
         SELECT v_entity_preview_non_recursive.pk_entity,
            v_entity_preview_non_recursive.fk_project,
            v_entity_preview_non_recursive.project,
            v_entity_preview_non_recursive.fk_class,
            v_entity_preview_non_recursive.table_name,
            v_entity_preview_non_recursive.entity_type,
            v_entity_preview_non_recursive.class_label,
            v_entity_preview_non_recursive.entity_label,
            v_entity_preview_non_recursive.time_span,
            v_entity_preview_non_recursive.own_full_text,
            v_entity_preview_non_recursive.fk_entity_label,
            v_entity_preview_non_recursive.fk_type
           FROM warehouse.v_entity_preview_non_recursive
        ), fill_entity_label AS (
         SELECT t1.pk_entity,
            t1.fk_project,
            t1.project,
            t1.fk_class,
            t1.entity_type,
            t1.class_label,
            COALESCE(t1.entity_label, t2.entity_label) AS entity_label,
            t1.time_span,
            t1.own_full_text,
            t1.fk_entity_label,
            t1.fk_type
           FROM previews_non_recursive t1
             LEFT JOIN previews_non_recursive t2 ON t1.fk_entity_label = t2.pk_entity AND t1.project = t2.project
        ), fill_type_label AS (
         SELECT t1.pk_entity,
            t1.fk_project,
            t1.project,
            t1.fk_class,
            t1.entity_type,
            t1.class_label,
            t1.entity_label,
            t1.time_span,
            t1.own_full_text,
            t1.fk_entity_label,
            t1.fk_type,
            t2.entity_label AS type_label
           FROM fill_entity_label t1
             LEFT JOIN fill_entity_label t2 ON t1.fk_type = t2.pk_entity AND t1.project = t2.project
        ), full_text_dependencies AS (
         SELECT r.fk_temporal_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text,
            pre.own_full_text
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON e.pk_entity = r.fk_entity AND e.table_name::text = 'persistent_item'::text
             LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
        UNION
         SELECT r.fk_entity AS pk_entity,
            r.project,
            r.fk_project,
            e.pk_entity AS pk_related_full_text,
            pre.own_full_text
           FROM warehouse.v_roles_per_project_and_repo r
             JOIN information.entity e ON e.pk_entity = r.fk_temporal_entity AND e.table_name::text = 'temporal_entity'::text
             LEFT JOIN previews_non_recursive pre ON pre.pk_entity = e.pk_entity AND pre.project = r.project
        ), aggregated_related_full_texts AS (
         SELECT full_text_dependencies.pk_entity,
            full_text_dependencies.project,
            full_text_dependencies.fk_project,
            jsonb_object_agg(full_text_dependencies.pk_related_full_text::text, full_text_dependencies.own_full_text) AS related_full_texts
           FROM full_text_dependencies
          GROUP BY full_text_dependencies.pk_entity, full_text_dependencies.project, full_text_dependencies.fk_project
        ), related_full_text AS (
         SELECT t1.pk_entity,
            t1.fk_project,
            t1.project,
            t1.fk_class,
            t1.entity_type,
            t1.class_label,
            t1.entity_label,
            t1.time_span,
            t1.own_full_text,
            t1.fk_entity_label,
            t1.fk_type,
            t1.type_label,
            t2.related_full_texts
           FROM fill_type_label t1
             LEFT JOIN aggregated_related_full_texts t2 ON t1.pk_entity = t2.pk_entity AND t1.project = t2.project
        ), add_full_text AS (
         SELECT f.pk_entity,
            f.fk_project,
            f.project,
            f.fk_class,
            f.entity_type,
            f.class_label,
            f.entity_label,
            f.time_span,
            f.own_full_text,
            f.fk_entity_label,
            f.fk_type,
            f.type_label,
            f.related_full_texts,
            ( SELECT array_to_string(ARRAY[f.own_full_text, array_to_string(array_agg(jsonb_each_text.value), ', '::text)], ', '::text) AS array_to_string
                   FROM jsonb_each_text(f.related_full_texts) jsonb_each_text(key, value)) AS full_text
           FROM related_full_text f
        ), add_ts_vector AS (
         SELECT t.pk_entity,
            t.fk_project,
            t.project,
            t.fk_class,
            t.entity_type,
            t.class_label,
            t.entity_label,
            t.time_span,
            t.own_full_text,
            t.fk_entity_label,
            t.fk_type,
            t.type_label,
            t.related_full_texts,
            t.full_text,
            (setweight(to_tsvector(COALESCE(t.entity_label, ''::text)), 'A'::"char") || setweight(to_tsvector(COALESCE(t.type_label, t.class_label::text, ''::text)), 'B'::"char")) || setweight(to_tsvector(COALESCE(t.full_text, ''::text)), 'C'::"char") AS ts_vector
           FROM add_full_text t
        )
 SELECT add_ts_vector.pk_entity,
    add_ts_vector.fk_project,
    add_ts_vector.project,
    add_ts_vector.fk_class,
    add_ts_vector.entity_type,
    add_ts_vector.class_label,
    add_ts_vector.entity_label,
    add_ts_vector.time_span,
    add_ts_vector.own_full_text,
    add_ts_vector.fk_entity_label,
    add_ts_vector.fk_type,
    add_ts_vector.type_label,
    add_ts_vector.related_full_texts,
    add_ts_vector.full_text,
    add_ts_vector.ts_vector
   FROM add_ts_vector;

