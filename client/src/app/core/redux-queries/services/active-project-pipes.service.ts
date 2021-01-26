import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState, ProProject, InfLanguage } from 'app/core';
import { filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { cache } from 'app/shared';
import { SchemaSelectorsService } from './schema-selectors.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectPipesService {
  public pkProject$: Observable<number>;

  constructor(
    ngRedux: NgRedux<IAppState>,
    private s: SchemaSelectorsService
  ) {
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']).pipe(
      filter(p => p !== undefined),
      distinctUntilChanged((x, y) => {
        return x === y
      })
    );
  }
  @cache({ refCount: false }) pipeActiveProject(): Observable<ProProject> {
    return this.pkProject$.pipe(
      switchMap(pkProject => this.s.pro$.project$.by_pk_entity$.key(pkProject.toString()))
    ).pipe(filter(l => !!l))
  }
  @cache({ refCount: false }) pipeActiveDefaultLanguage(): Observable<InfLanguage> {
    return this.pipeActiveProject().pipe(
      filter(p => !!p),
      switchMap(project => this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString()))
    ).pipe(filter(l => !!l))
  }
}
