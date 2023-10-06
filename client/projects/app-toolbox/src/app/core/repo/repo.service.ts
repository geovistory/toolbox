import { Injectable } from '@angular/core';
import { InfSelector } from "@kleiolab/lib-queries";
import { IAppState } from "@kleiolab/lib-redux";
import { NgRedux } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  inf$: InfSelector;
  constructor(ngRedux: NgRedux<IAppState>) {

    this.inf$ = new InfSelector(ngRedux, new BehaviorSubject('repo'))

  }
}
