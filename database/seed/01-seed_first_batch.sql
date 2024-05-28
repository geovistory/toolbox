-- creaet a temp table to store timestamps for performance measurements
CREATE TEMP TABLE performance_time (
    id text,
    start_time timestamp,
    end_time timestamp
);

--------------------------- Insert a first batch of 10k statements --------------------------------------
-- set the number of statements to create

-- capture start date
INSERT INTO performance_time (id, start_time) VALUES ('seed_data_1_to_10k',  clock_timestamp());


INSERT INTO information.statement (fk_subject, fk_object, object_string) 
SELECT 
    nr as fk_subject, 
    CASE WHEN nr % 4 = 0 THEN null ELSE nr+1 END as fk_object,
    CASE WHEN nr % 4 = 0 THEN  concat('Foo of ', (nr-3)::text) ELSE null END as object_string 
FROM generate_series(1,10000) as nr;

-- capture end date
UPDATE performance_time SET end_time=clock_timestamp() WHERE id = 'seed_data_1_to_10k';

DO $$
DECLARE
    my_message TEXT;
BEGIN
    SELECT EXTRACT(MILLISECOND FROM (end_time - start_time))::text into my_message
    FROM performance_time 
    WHERE id = 'seed_data_1_to_10k';

    -- Print an informational message
    RAISE INFO 'Inserted 10k statements in %ms', my_message;
END;
$$;

