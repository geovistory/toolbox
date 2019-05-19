ALTER TABLE system.system_relevant_class RENAME COLUMN required_by_contr_vocabs TO required_by_basics;
ALTER TABLE system.system_relevant_class_vt RENAME COLUMN required_by_contr_vocabs TO required_by_basics;

ALTER TABLE system.system_relevant_class ADD COLUMN excluded_from_entities BOOLEAN;
ALTER TABLE system.system_relevant_class_vt ADD COLUMN excluded_from_entities BOOLEAN;
