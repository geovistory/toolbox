CREATE OR REPLACE FUNCTION commons.time_primitive__get_to_day(
	julian_day integer,
	duration calendar_granularities,
	calendar calendar_type)
    RETURNS int
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE

AS $BODY$
	DECLARE
		day_after_added_duration int;
	BEGIN

    IF(calendar IS NULL) THEN
      RAISE WARNING 'No calendar provided';
      IF(julian_day < 2299161) THEN
        calendar = 'julian';
      ELSE
        calendar = 'gregorian';
      END IF;
    END IF;

		IF(calendar = 'gregorian') THEN
			IF(duration = '1 day') THEN
				SELECT julian_day + 1 INTO day_after_added_duration;
			ELSIF(duration = '1 month') THEN
				SELECT to_char((('J' || julian_day::text)::DATE + INTERVAL '1 month'), 'J') INTO day_after_added_duration;
			ELSIF(duration = '1 year') THEN
				SELECT to_char((('J' || julian_day::text)::DATE + INTERVAL '1 year'), 'J') INTO day_after_added_duration;
			ELSE
				RAISE EXCEPTION 'duration not supported --> %', duration
					  USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
	  		END IF;

		ELSIF (calendar = 'julian') THEN

			IF(duration = '1 day') THEN
				SELECT  julian_day + 1 INTO day_after_added_duration;
			ELSIF(duration = '1 month') THEN
				SELECT commons.julian_cal__add_1_month(julian_day) INTO day_after_added_duration;
			ELSIF(duration = '1 year') THEN
				SELECT commons.julian_cal__add_1_year(julian_day) INTO day_after_added_duration;
			ELSE
				RAISE EXCEPTION 'duration not supported --> %', duration
					  USING HINT = 'Supported durations: "1 day", "1 month", "1 year"';
	  		END IF;

		ELSE
			RAISE EXCEPTION 'calendar not supported --> %', calendar
					  USING HINT = 'Supported calendars: "gregorian", "julian"';
		END IF;

		RETURN day_after_added_duration;
    END;
	$BODY$;
CREATE OR REPLACE FUNCTION commons.time_primitive__pretty_json(time_primitive information.time_primitive, calendar calendar_type)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
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
		SELECT commons.time_primitive__get_first_second(from_day) INTO from_second;
		SELECT concat(to_char(t.year, 'fm0000'),'-',to_char(t.month, 'fm00') , '-',to_char(t.day, 'fm00')) INTO from_julian_cal
		FROM commons.julian_cal__year_month_day( from_day ) t;
		SELECT to_char((('J' || from_day)::timestamp ), 'YYYY-MM-DD') into from_gregorian_cal;
		SELECT commons.julian_second__to_iso_8601(from_second) into from_gregorian_cal_iso8601;

		SELECT commons.time_primitive__get_to_day(from_day, time_primitive.duration, calendar) INTO to_day;
		SELECT commons.time_primitive__get_first_second(to_day) INTO to_second;
		SELECT concat(to_char(t.year, 'fm0000'),'-',to_char(t.month, 'fm00') , '-',to_char(t.day, 'fm00')) INTO to_julian_cal
		FROM commons.julian_cal__year_month_day( to_day ) t;
		SELECT to_char((('J' || to_day)::timestamp ), 'YYYY-MM-DD') into to_gregorian_cal;
		SELECT commons.julian_second__to_iso_8601(to_second) into to_gregorian_cal_iso8601;
		SELECT
			CASE WHEN calendar = 'gregorian' THEN
				concat(from_gregorian_cal, ' (', time_primitive.duration, ')')
			ELSE
				concat(from_julian_cal, ' (', time_primitive.duration, ')')
			END
		INTO label;

	RETURN jsonb_build_object(
		'pkEntity', time_primitive.pk_entity,
		'fkClass', time_primitive.fk_class,
		'julianDay', time_primitive.julian_day,
		'duration', time_primitive.duration,
		'calendar', calendar::text,
		'label', label,
		'from', jsonb_build_object(
			'julianDay', from_day,
			'julianSecond', from_second,
			'calGregorian', from_gregorian_cal,
			'calGregorianIso8601', from_gregorian_cal_iso8601,
			'calJulian', from_julian_cal
		),
		'to', jsonb_build_object(
			'julianDay', to_day,
			'julianSecond', to_second,
			'calGregorian', to_gregorian_cal,
			'calGregorianIso8601', to_gregorian_cal_iso8601,
			'calJulian', to_julian_cal
		)
	);
    END;
	$BODY$;
