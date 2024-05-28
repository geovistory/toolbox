-- 1
CREATE OR REPLACE FUNCTION commons.julian_cal__is_leap_year(year integer)
    RETURNS  boolean
    LANGUAGE 'plpgsql'
	AS $BODY$ BEGIN
		-- year is the year BC: no year 0.
		IF(year > 0) THEN
			-- if devisable by 4 without remainder
			RETURN ((year % 4) = 0);
		ELSE
 			-- if devisable by 4 without remainder = -1
			RETURN ((year % 4) = -1);
		END IF;

	END;
	$BODY$;

-- 2
CREATE OR REPLACE FUNCTION commons.julian_cal__year_and_day_of_year(
	julian_day integer)
    RETURNS TABLE (
		year integer,
		day_of_year integer
	)
    LANGUAGE 'plpgsql'
	AS $BODY$
	DECLARE
	 	-- number of full 4 year cycles
		n4 integer;
		-- number of days of the last uncomplete 4 years cycle
    	r4 integer;
		-- number of full years of the last uncomplete 4 years cycle
    	n1 integer;
		-- number of days in the last year, zero-based (begins with 0)
    	day_of_year integer;
		-- number of years (counted from julian year 0 (=4713 BC))
		julian_year integer;
		-- year in christian counting
		year integer;
	BEGIN
		/*
		* Inspired by
		* https://de.wikipedia.org/wiki/Umrechnung_zwischen_julianischem_Datum_und_julianischem_Kalender
		*/

		-- number of full 4 year cycles
		n4 = floor((julian_day + (3 * 365)) / 1461::numeric)::integer;

		-- number of days of the last uncomplete 4 years cycle
	 	r4 = (julian_day + (3 * 365)) % 1461 ;

		-- number of full years of the last uncomplete 4 years cycle
    	n1 = floor(r4 / 365::numeric);

    	-- number of days in the last year
		day_of_year = r4 % 365;

		IF (n1 = 4) THEN
      		n1 = 3;
      		day_of_year = 365;
    	END IF;

	 	-- number of years (counted from julian year 0 (=4713 BC))
    	julian_year = 4 * n4 + n1;

		-- if BC
		IF (julian_year <= 4715) THEN
		  -- resulting year
		  year = julian_year - 4716;
		  -- if AD
		ELSE
		  year = julian_year - 4715;
		END IF;

		RETURN QUERY (SELECT year, day_of_year);
    END;
	$BODY$;

-- 3
CREATE OR REPLACE FUNCTION commons.julian_cal__add_1_year(
	julian_day integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
	AS $BODY$
	DECLARE
		_year integer;
	BEGIN
		SELECT year INTO _year from commons.julian_cal__year_and_day_of_year(julian_day);
		IF (_year % 4) = 0 THEN
			RETURN julian_day + 366;
		ELSE
			RETURN julian_day + 365;
		END IF;
    END;
	$BODY$;

-- 4
CREATE OR REPLACE FUNCTION commons.julian_cal__month_and_day_of_month(year integer, day_of_year integer)
    RETURNS  TABLE (
		month integer,
		day_of_month integer
	)
    LANGUAGE 'plpgsql'
	AS $BODY$
	DECLARE
		-- true, if year is a leap year according to julian calendar
		is_leap boolean;
	 	-- month corrections (note that january has index 0)
	 	month_correnctions int[];
		-- month correction
	 	mc int;
		-- leap year correction
		lc int;
		-- resulting month, one-based (begins with 1)
		month int;
    	-- resulting day of month, one-based (begins with 1)
		day_of_month int;

	BEGIN
		-- leap year
		is_leap = commons.julian_cal__is_leap_year(year);

		-- month corrections (note that january has index 0)
    	month_correnctions = ARRAY[-1, 0, -2, -1, -1, 0, 0, 1, +2, +2, +3, +3];
		-- resulting month
    	month = floor((day_of_year + 1) / 30::numeric) + 1;
		-- month correction
		mc = month_correnctions[month];
		-- leap year correction
		IF (is_leap = true AND month > 2)  THEN
			lc = 1;
    	ELSE
			lc = 0;
		END IF;
    	-- resulting day
		day_of_month = day_of_year - 30 * (month - 1) - (lc + mc);

		-- check if month and day still valid
		IF (month > 12 OR day_of_month < 1) THEN

			month = month-1;

			IF (month < 1) THEN
			is_leap = NOT is_leap;
			END IF;

			-- leap year correction
			IF (is_leap = true AND month > 2)  THEN
				lc = 1;
			ELSE
				lc = 0;
			END IF;
			-- month correction
			mc = month_correnctions[month];

			-- resulting day
			day_of_month = day_of_year - 30 * (month - 1) - (lc + mc);

		END IF;

		RETURN QUERY SELECT month, day_of_month;

    END;
	$BODY$;

-- 5
CREATE TYPE year_and_day_of_year AS (
	year integer,
    day_of_year integer
);

-- 6
CREATE TYPE month_and_day_of_month AS (
	month integer,
    day_of_month integer
);

-- 7
CREATE OR REPLACE FUNCTION commons.julian_cal__year_month_day(julian_day integer)
    RETURNS TABLE (
		year integer,
		month integer,
		day integer
	)
    LANGUAGE 'plpgsql'
	AS $BODY$
	DECLARE
		-- year and day_of_year according to julian calendar
		y year_and_day_of_year;
		-- month and day_of_month according to julian calendar
		m month_and_day_of_month;
	BEGIN

		SELECT * FROM commons.julian_cal__year_and_day_of_year(julian_day) INTO y;
		SELECT * FROM commons.julian_cal__month_and_day_of_month(y.year, y.day_of_year) INTO m;

		RETURN QUERY SELECT y.year, m.month, m.day_of_month;

    END;
	$BODY$;

-- 8
CREATE TYPE year_month_day AS (
	year integer,
	month integer,
  day integer
);

-- 9
CREATE OR REPLACE FUNCTION commons.julian_cal__add_1_month(	julian_day integer)
    RETURNS integer
    LANGUAGE 'plpgsql'
	AS $BODY$
	DECLARE
		x year_month_day;
		is_leap boolean;
		days_in_month int[];
	BEGIN
		SELECT * from commons.julian_cal__year_month_day(julian_day) INTO x;
		is_leap = commons.julian_cal__is_leap_year(x.year);

		IF (is_leap = false) THEN
			days_in_month = ARRAY[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		ELSE
			days_in_month = ARRAY[31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		END IF;

		RETURN julian_day + days_in_month[x.month];
    END;
	$BODY$;

-- 10
CREATE OR REPLACE FUNCTION commons.time_primitive__get_first_second(julian_day integer)
    RETURNS bigint
    LANGUAGE 'sql'
	AS $BODY$
	 SELECT (julian_day::bigint * 86400::bigint) ; -- 86400 = 60 * 60 * 24 = number of seconds per day
    $BODY$;

-- 11
CREATE OR REPLACE FUNCTION commons.time_primitive__get_last_second(
	julian_day integer,
	duration calendar_granularities,
	calendar calendar_type)
    RETURNS bigint
    LANGUAGE 'plpgsql'
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

		-- calculate the first second of the day after the added duration and subtract one second
		-- so that we get the last second of the duration
		RETURN commons.time_primitive__get_first_second(day_after_added_duration) - 1;
    END;
	$BODY$;

