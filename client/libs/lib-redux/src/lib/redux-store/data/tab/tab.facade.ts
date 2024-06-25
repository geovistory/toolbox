import { Injectable } from '@angular/core';
import { TabCellFacade } from './cell/tab-cell.facade';

@Injectable({
  providedIn: 'root'
})
export class TabFacade {
  constructor(
    public cell: TabCellFacade,
  ) { }
}
