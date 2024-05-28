-- 4
ALTER TABLE information.time_primitive
  DROP CONSTRAINT time_primitive_unique_constraint;

ALTER TABLE information.time_primitive
  ADD CONSTRAINT time_primitive_unique_constraint UNIQUE (julian_day, duration, fk_class);

-- 1
ALTER TABLE information.time_primitive
  DROP COLUMN calendar;

ALTER TABLE information.time_primitive_vt
  DROP COLUMN calendar;

