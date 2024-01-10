import {SYS_CONFIG_KEY} from '../../../controllers/backoffice/sys-config.controller';
import {SysConfigValue} from '../../../models/sys-config/sys-config-value.model';
import {TestDbFactory} from '../TestDbFactory';

export async function createSysSystemConfig(config: SysConfigValue) {
  await deleteSysSystemConfig();
  return TestDbFactory.datasource.execute(
    `INSERT INTO system.config (key, config) VALUES ($1,$2)`,
    [SYS_CONFIG_KEY, config]
  )
}


export async function deleteSysSystemConfig() {
  await TestDbFactory.datasource.execute(
    `DELETE FROM system.config WHERE key = $1`,
    [SYS_CONFIG_KEY]
  );
}

