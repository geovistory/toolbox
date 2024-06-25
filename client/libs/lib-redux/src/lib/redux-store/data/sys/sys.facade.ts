import { Injectable } from '@angular/core';
import { SysConfigFacade } from './config/sys-config.facade';

@Injectable({
  providedIn: 'root'
})
export class SysFacade {
  constructor(
    public config: SysConfigFacade,
    public systemRelevantClass: SysConfigFacade,
  ) { }
}
