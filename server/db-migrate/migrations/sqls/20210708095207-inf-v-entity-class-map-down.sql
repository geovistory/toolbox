
CREATE OR REPLACE VIEW information.v_entity_class_map
 AS
 SELECT appellation.pk_entity,
    appellation.fk_class,
    'appellation'::text AS table_name
   FROM information.appellation
UNION ALL
 SELECT language.pk_entity,
    language.fk_class,
    'language'::text AS table_name
   FROM information.language
UNION ALL
 SELECT persistent_item_backup.pk_entity,
    persistent_item_backup.fk_class,
    'persistent_item'::text AS table_name
   FROM information.persistent_item_backup
UNION ALL
 SELECT place.pk_entity,
    place.fk_class,
    'place'::text AS table_name
   FROM information.place
UNION ALL
 SELECT dimension.pk_entity,
    dimension.fk_class,
    'dimension'::text AS table_name
   FROM information.dimension
UNION ALL
 SELECT lang_string.pk_entity,
    lang_string.fk_class,
    'lang_string'::text AS table_name
   FROM information.lang_string
UNION ALL
 SELECT temporal_entity_backup.pk_entity,
    temporal_entity_backup.fk_class,
    'temporal_entity'::text AS table_name
   FROM information.temporal_entity_backup
UNION ALL
 SELECT time_primitive.pk_entity,
    time_primitive.fk_class,
    'time_primitive'::text AS table_name
   FROM information.time_primitive;
