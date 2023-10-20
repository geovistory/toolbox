import { Injectable } from '@angular/core';
import { DataFacade } from './data/data.facade';
import { UiFacade } from './ui/ui.facade';

@Injectable({
  providedIn: 'root'
})
export class StateFacade {
  constructor(
    public data: DataFacade,
    public ui: UiFacade
  ) { }
}
