-- create lang-strings
insert into information.lang_string (string,fk_language,fk_class,metadata)
WITH tw1 AS (
	select
	pk_entity,
	string,
	fk_language,
	case
	when fk_class_field = 217 then 784 -- has short title -> Short title – C15
	when fk_class_field = 218 then 783 -- has web address -> Uniform Resource Locator (URL) – C14
	when fk_class_field = 219 then 785 -- has definition -> Text – C16
	when fk_class_field = 3364 then 785 -- has comment -> Text – C16
	else null
	end as fk_class
	from information.text_property
)
select
	string,
	fk_language,
	fk_class,
	json_build_object(
		'from_text_properties', json_agg(pk_entity)
	) as metadata
from tw1
group by string, fk_language, fk_class
on conflict on constraint unique__fk_language__fk_class__string do update
set metadata = excluded.metadata;


-- create statements
insert into information.statement (fk_subject_info,fk_property,fk_object_info,metadata)
select
	t1.fk_concerned_entity as fk_subject_info,
	case
	when t1.fk_class_field = 217 then 1761 -- has short title – P17
	when t1.fk_class_field = 218 then 1760 -- has web address – P16
	when t1.fk_class_field = 219 then 1762 -- has definition – P18
	when t1.fk_class_field = 3364 then 1763 -- has comment – P19
	else null
	end as fk_property,
	t2.pk_entity as fk_object_info,
	json_build_object(
		'from_text_property', t1.pk_entity
	)
from
	information.text_property t1,
	information.lang_string t2
where
	t2.metadata::jsonb->'from_text_properties' @> jsonb_build_array(t1.pk_entity);

-- update info-proj-rels
WITH tw1 AS (
	select
	t1.pk_entity,
	t1.fk_entity as old_fk_entity,
	t2.pk_entity as new_fk_entity
	from
	projects.info_proj_rel t1,
	information.statement t2
	where
	t1.fk_entity = (t2.metadata->>'from_text_property')::int
)
update projects.info_proj_rel t1
set fk_entity = t2.new_fk_entity
from tw1 t2
where t1.pk_entity=t2.pk_entity;
