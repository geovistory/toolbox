require('./__dotenv');
const prompts = require('prompts');

async function chooseCommand() {
  const response = await prompts({
    type: 'select',
    name: 'command',
    message: 'Which command should be used?',
    choices: [
      {
        title: 'compose up (full stack)',
        description: `docker-compose -f docker-compose.all-local.yaml --project-name geov_base up -d`,
        value:
          'docker-compose -f docker-compose.all-local.yaml --project-name geov_base up -d',
      },
      {
        title: 'compose up --build (full stack)',
        description: `docker-compose -f docker-compose.all-local.yaml --project-name geov_base up -d --build`,
        value:
          'docker-compose -f docker-compose.all-local.yaml --project-name geov_base up -d --build',
      },
    ],
  });
  if (!response.command) process.exit();

  return response.command;
}

async function start() {
  const command = await chooseCommand();

  console.log('Run command:');
  console.log(command);
  await require('./__execShell').fromScript(command);
}

start().catch(err => {
  console.log(`***************************************`);
  console.error('Error:');
  console.error(err);
  console.log(`***************************************`);
  process.exit(1);
});
