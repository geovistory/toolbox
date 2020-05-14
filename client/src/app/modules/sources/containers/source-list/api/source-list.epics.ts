import { Injectable } from '@angular/core';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { SourceListComponent } from '../source-list.component';

@Injectable()
export class SourceListAPIEpics {
  constructor(
  ) { }

  public createEpics(c: SourceListComponent): Epic {
    return combineEpics(
    );
  }

}
