import { Injectable } from '@angular/core';
import { DataFacade } from './data/data.facade';

@Injectable({
  providedIn: 'root'
})
export class StateFacade {
  constructor(
    public data: DataFacade,
  ) { }
}
