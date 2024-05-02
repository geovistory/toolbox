import {SYS_CONFIG_KEY} from '../../../controllers/backoffice/sys-config.controller';
import {TestDbFactory} from '../TestDbFactory';



export async function deleteSysSystemConfig() {
  await TestDbFactory.datasource.execute(
    `DELETE FROM system.config WHERE key = $1`,
    [SYS_CONFIG_KEY]
  );
}
