/* Replace with your SQL commands */
-- 1 add column
ALTER TABLE information.time_primitive
  ADD COLUMN calendar calendar_type;

ALTER TABLE information.time_primitive_vt
  ADD COLUMN calendar calendar_type;

-- 2 fill calendar data
-- messy first: at time of writing 4 out of 15k have mixed calendars
-- resetting them according to threshold julian_day
WITH tw1 AS (
  SELECT
    t1.pk_entity AS pk_tp,
    t1.julian_day,
    count(t3.calendar) FILTER (WHERE t3.calendar = 'gregorian') gregorian_count,
    count(t3.calendar) FILTER (WHERE t3.calendar = 'julian') julian_count
  FROM
    information.time_primitive t1,
    information.statement t2,
    projects.info_proj_rel t3
  WHERE
    t1.pk_entity = t2.fk_object_info
    AND t2.pk_entity = t3.fk_entity
    AND t3.calendar IS NOT NULL
  GROUP BY
    t1.pk_entity, -- tp
    t1.julian_day
),
tw2 AS (
  SELECT
    t1.pk_tp,
    CASE WHEN t1.julian_day < 2299161 THEN
      'julian'::calendar_type
    ELSE
      'gregorian'::calendar_type
    END calendar
  FROM
    tw1 t1
  WHERE
    gregorian_count > 0
    AND julian_count > 0)
UPDATE
  information.time_primitive t1
SET
  calendar = t2.calendar
FROM
  tw2 t2
WHERE
  t1.pk_entity = t2.pk_tp;

-- clean second
WITH tw1 AS (
  SELECT DISTINCT ON (t1.pk_entity)
    t1.pk_entity AS pk_tp,
    t3.calendar
  FROM
    information.time_primitive t1,
    information.statement t2,
    projects.info_proj_rel t3
  WHERE
    t1.pk_entity = t2.fk_object_info
    AND t2.pk_entity = t3.fk_entity
    AND t3.calendar IS NOT NULL)
UPDATE
  information.time_primitive t1
SET
  calendar = t2.calendar
FROM
  tw1 t2
WHERE
  t1.pk_entity = t2.pk_tp;

-- cleanup the ones that have no relation to a stmt with a info_proj_rel
UPDATE
  information.time_primitive t1
SET
  calendar = (
    CASE WHEN t1.julian_day < 2299161 THEN
      'julian'::calendar_type
    ELSE
      'gregorian'::calendar_type
    END)
WHERE
  calendar IS NULL;

-- 3 set calendar column to not null
ALTER TABLE information.time_primitive
  ALTER COLUMN calendar SET NOT NULL;

-- 4 update uniq contraint
ALTER TABLE information.time_primitive
  DROP CONSTRAINT time_primitive_unique_constraint;

ALTER TABLE information.time_primitive
  ADD CONSTRAINT time_primitive_unique_constraint UNIQUE (julian_day, duration, calendar, fk_class);

