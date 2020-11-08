require('./__dotenv');
process.env.DATABASE_URL = process.env.TEMPLATE_DATABASE_URL;
require('./__execShell')('../db-migrate/down.sh');
