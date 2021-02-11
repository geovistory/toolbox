import { Injectable } from '@angular/core';
import { combineEpics, Epic } from 'redux-observable-es6-compat';


@Injectable()
export class TabEpics {
  constructor() { }
  public createEpics(): Epic {
    return combineEpics()
  }
}
