import {testdb} from '../testdb';
import {SysConfigValue} from '../../../models/sys-config/sys-config-value.model';
import {SYS_CONFIG_KEY} from '../../../controllers/sys-config.controller';

export async function createSysSystemConfig(config: SysConfigValue) {
  await testdb.execute(
    `DELETE FROM system.config WHERE key = $1`,
    [SYS_CONFIG_KEY]
  )
  return testdb.execute(
    `INSERT INTO system.config (key, config) VALUES ($1,$2)`,
    [SYS_CONFIG_KEY, config]
  )
}
