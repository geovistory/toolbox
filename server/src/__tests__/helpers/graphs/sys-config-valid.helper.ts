import {createSysSystemConfig} from '../atomic/sys-system-config.helper';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';

export async function updateSysConfig() {
  await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_VALID)
}
