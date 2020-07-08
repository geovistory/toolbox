ALTER TABLE system.system_relevant_class RENAME COLUMN required_by_basics TO required_by_contr_vocabs;
ALTER TABLE system.system_relevant_class_vt RENAME COLUMN required_by_basics TO required_by_contr_vocabs;

ALTER TABLE system.system_relevant_class DROP COLUMN excluded_from_entities;
ALTER TABLE system.system_relevant_class_vt DROP COLUMN excluded_from_entities;
