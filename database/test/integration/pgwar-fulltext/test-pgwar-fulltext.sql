-- schedule the cron job
SELECT * FROM dblink(
	'dbname=postgres', -- the database with pg_cron installed
	'SELECT cron.schedule_in_database(''my-test-job'', ''1 seconds'', ''SELECT pgwar.update_fulltexts()'', ''' || current_database() ||''');'
) AS dl(schedule_in_database int);



BEGIN;
-- create seed data


SELECT plan(1);
-- wait 2 seconds for the cron job to create the fulltext

-- test

-- Finish the tests and clean up.
SELECT *
FROM finish();

ROLLBACK;


-- unschedule all cron jobs
SELECT * FROM dblink(
	'dbname=postgres',
	'SELECT cron.unschedule(jobid) FROM cron.job;'
) AS dl(unschedule bool);
