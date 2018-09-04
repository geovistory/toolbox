import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComConfig, IAppState } from 'app/core';
import { Observable, Subject } from 'rxjs';
import { RootEpics } from '../../../../core/store/epics';
import { ClassDetail, Container } from '../../admin.models';
import { ContrVocabAPIActions } from './api/contr-vocab.actions';
import { ContrVocabAPIEpics } from './api/contr-vocab.epics';
import { contrVocabReducer } from './api/contr-vocab.reducer';



@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: contrVocabReducer
})
@Component({
  selector: 'gv-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ContrVocabComponent extends ContrVocabAPIActions implements OnInit, OnDestroy {

  public readonly PK_UI_CONTEXT_EDITABLE = ComConfig.PK_UI_CONTEXT_EDITABLE;
  public readonly PK_UI_CONTEXT_CREATE = ComConfig.PK_UI_CONTEXT_CREATE;


  localStore: ObservableStore<ClassDetail>

  reduxMiddleware;

  @select() class$: Observable<any>;
  @select() containerDisabled$: Observable<Container>;

  // emits when subscriptions to epic should be stopped
  until$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private rootEpics: RootEpics,
    private epics: ContrVocabAPIEpics,
    private ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {
    super()

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), contrVocabReducer)

    this.rootEpics.addEpic(this.epics.createEpic(this.localStore, this.until$))

    const pkClass = this.activatedRoute.snapshot.params['pk_class'];
    this.loadClassDetails(pkClass, ComConfig.PK_UI_CONTEXT_EDITABLE)
  }

  getBasePath = () => ['admin', 'classDetail'];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.until$.next(true)
    this.until$.unsubscribe();
  }
}
