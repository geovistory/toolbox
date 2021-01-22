BEGIN;
WITH tw1 AS (
	SELECT
	array_agg(distinct t3.account_id) accounts,
	array_agg(distinct t3.fk_project) projects,
	t1.fk_subject_info,
	t2.pk_entity pk_rel,
	t2.fk_project,
	t2.calendar,
	t0.duration,
	t0.julian_day,
	(to_json(commons.julian_cal__year_month_day(t0.julian_day))->>'day')::int day_according_to_jul,
	to_char((('J' || t0.julian_day)::timestamp ), 'DD')::int day_according_to_greg
	FROM information.time_primitive t0,
		information."statement" t1,
		projects.info_proj_rel t2,
		account_project_rel t3

	WHERE t0.pk_entity=t1.fk_object_info
	AND t1.pk_entity=t2.fk_entity
	AND t2.fk_project = t3.fk_project
	GROUP BY
	t2.pk_entity,
	t2.fk_project,
	t2.calendar,
	t1.fk_subject_info,
	t0.duration,
	t0.julian_day
),
tw2 AS (
	SELECT
		t1.accounts,
		t1.projects,
		t1.fk_subject_info,
		t1.pk_rel,
		to_char((('J' || t1.julian_day)::timestamp ), 'YYYY-MM-DD') greg_proleptic,
		t1.calendar,
		t1.duration,
		CASE WHEN (t1.julian_day < 2299161) THEN
			'julian'
		ELSE
			'gregorian'
		END cal_according_to_threshold,
		CASE WHEN t1.duration IN ('1 month','1 year') THEN
			CASE WHEN day_according_to_jul = 1 THEN
				'julian'
			WHEN day_according_to_greg = 1 THEN
				'gregorian'
			ELSE
				'error: no cal gives first day'
			END

		END cal_according_to_day_in_month
	FROM tw1 t1
),
tw3 AS (
	SELECT
	t1.*,
	COALESCE(t1.cal_according_to_day_in_month, t1.cal_according_to_threshold)::calendar_type new_calendar,
	t1.calendar::text = cal_according_to_day_in_month cal_day_in_month_match,
	t1.calendar::text = cal_according_to_threshold cal_threshold_match,
	CASE WHEN t1.calendar IS NOT NULL THEN
		'calendar provided'
		WHEN t1.cal_according_to_day_in_month IS NOT NULL THEN
		'calendar deducable'
		ELSE
		'calendar guessable'
	END quality
	FROM tw2 t1
)
UPDATE projects.info_proj_rel t1
SET calendar = t2.new_calendar
FROM tw3 t2
WHERE t1.pk_entity = t2.pk_rel
AND t1.calendar IS NULL
--SELECT count(*), t1.quality
--FROM tw3 t1
--GROUP BY
--t1.quality
