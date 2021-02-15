import { Injectable } from '@angular/core';
import { InfSelector } from "@kleiolab/lib-queries";
import { BehaviorSubject } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from "@kleiolab/lib-redux";

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  inf$: InfSelector;
  constructor(ngRedux: NgRedux<IAppState>) {

    this.inf$ = new InfSelector(ngRedux, new BehaviorSubject('repo'))

  }
}
