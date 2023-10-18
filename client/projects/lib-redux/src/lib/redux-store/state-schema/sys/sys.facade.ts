import { Injectable } from '@angular/core';
import { SysConfigFacade } from './config/sys-config.facade';

@Injectable()
export class SysFacade {
  constructor(
    public config: SysConfigFacade,
  ) { }
}
