require('./__dotenv');
const chooseDB = require('./__choosedb');
const helpers = require('./__helpers');
const execShell = require('./__execShell');
const prompts = require('prompts');
const path = require('path');
const pg = require('pg');

async function getUserInputs() {
  const response = await prompts([
    {
      type: 'text',
      message: 'Backup file',
      name: 'file',
      description: 'File to restore from',
      initial: path.join(__dirname, '../../deployment/reviewdb.backup'),
    },
    {
      type: 'number',
      message: 'Number of parallel restore jobs',
      name: 'jobs',
      initial: 6,
    },
    {
      type: prev => (!prev ? null : 'confirm'),
      name: 'confirm',
      description: (prev, values) => logPreview(values),
      message: (prev, values) => `Start restoring?`,
    },
  ]);

  if (!response.confirm) process.exit();

  return response;
}

function logPreview(res) {
  const dbUrlPreview = helpers.createDbUrlPreview(process.env.DATABASE_URL);
  console.log(`
  Your command: pg_restore -j ${res.jobs} --no-owner -d ${dbUrlPreview} ${res.file} --verbose
  REMARK: All schemas are dropped before restore command is called!

  `);
}
function createCommand(res) {
  return `pg_restore -j ${res.jobs} --no-owner -d ${process.env.DATABASE_URL} ${res.file} --verbose`;
}

async function start() {
  await chooseDB();
  const res = await getUserInputs();
  const cmd = createCommand(res);
  await dropSchemas();
  await execShell.fromScript(cmd);
}

start()
  .then(_ => console.log('Successfully restored backup!'))
  .catch(err => console.error(err));

async function dropSchemas() {
  const c = new pg.Client({connectionString: process.env.DATABASE_URL});
  await c.connect();
  await c.query(`CREATE OR REPLACE FUNCTION public.drop_all ()
  RETURNS VOID  AS
  $$
  DECLARE rec RECORD;
  BEGIN
      -- Get all the schemas
       FOR rec IN
       select schema_name
       from information_schema.schemata

        -- You can exclude the schema which you don't want to drop by adding another condition here
        where schema_name !~* 'information_schema|pg_catalog|pg_toast'
          LOOP
            EXECUTE 'DROP SCHEMA ' || rec.schema_name || ' CASCADE';
          END LOOP;
          RETURN;
  END;
  $$ LANGUAGE plpgsql;

select public.drop_all();

CREATE SCHEMA public;`);
}
