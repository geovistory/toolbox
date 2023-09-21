import { Injectable } from '@angular/core';
import { combineEpics, Epic } from 'redux-observable-es6-compat';



@Injectable({
  providedIn: 'root'
})
export class ProEpics {
  constructor(
  ) { }

  public createEpics(): Epic {
    return combineEpics(

    )
  }
}
