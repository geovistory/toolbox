CREATE OR REPLACE FUNCTION commons.time_primitive__pretty_json (time_primitive information.time_primitive)
  RETURNS jsonb
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  from_day int;
  from_second bigint;
  from_julian_cal varchar;
  from_gregorian_cal varchar;
  from_gregorian_cal_iso8601 varchar;
  to_day int;
  to_second bigint;
  to_julian_cal varchar;
  to_gregorian_cal varchar;
  to_gregorian_cal_iso8601 varchar;
  label varchar;
BEGIN
  from_day = time_primitive.julian_day;
  SELECT
    commons.time_primitive__get_first_second (from_day) INTO from_second;
  SELECT
    concat(to_char(t.year, 'fm0000'), '-', to_char(t.month, 'fm00'), '-', to_char(t.day, 'fm00')) INTO from_julian_cal
  FROM
    commons.julian_cal__year_month_day (from_day) t;
  SELECT
    to_char((('J' || from_day)::timestamp), 'YYYY-MM-DD') INTO from_gregorian_cal;
  SELECT
    commons.julian_second__to_iso_8601 (from_second) INTO from_gregorian_cal_iso8601;
  SELECT
    commons.time_primitive__get_to_day (from_day, time_primitive.duration, time_primitive.calendar) INTO to_day;
  SELECT
    commons.time_primitive__get_first_second (to_day) INTO to_second;
  SELECT
    concat(to_char(t.year, 'fm0000'), '-', to_char(t.month, 'fm00'), '-', to_char(t.day, 'fm00')) INTO to_julian_cal
  FROM
    commons.julian_cal__year_month_day (to_day) t;
  SELECT
    to_char((('J' || to_day)::timestamp), 'YYYY-MM-DD') INTO to_gregorian_cal;
  SELECT
    commons.julian_second__to_iso_8601 (to_second) INTO to_gregorian_cal_iso8601;
  SELECT
    CASE WHEN time_primitive.calendar = 'gregorian' THEN
      concat(from_gregorian_cal, ' (', time_primitive.duration, ')')
    ELSE
      concat(from_julian_cal, ' (', time_primitive.duration, ')')
    END INTO label;
  RETURN jsonb_build_object('pkEntity', time_primitive.pk_entity, 'fkClass', time_primitive.fk_class, 'julianDay', time_primitive.julian_day, 'duration', time_primitive.duration, 'calendar', time_primitive.calendar::text, 'label', label, 'from', jsonb_build_object('julianDay', from_day, 'julianSecond', from_second, 'calGregorian', from_gregorian_cal, 'calGregorianIso8601', from_gregorian_cal_iso8601, 'calJulian', from_julian_cal), 'to', jsonb_build_object('julianDay', to_day, 'julianSecond', to_second, 'calGregorian', to_gregorian_cal, 'calGregorianIso8601', to_gregorian_cal_iso8601, 'calJulian', to_julian_cal));
END;
$BODY$;

