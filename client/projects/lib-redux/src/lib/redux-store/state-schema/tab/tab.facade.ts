import { Injectable } from '@angular/core';
import { TabCellFacade } from './entity_preview/tab-cell.facade';

@Injectable()
export class TabFacade {
  constructor(
    public entityPreview: TabCellFacade,
  ) { }
}
