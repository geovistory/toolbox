import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ActiveProjectService } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { VisualList } from './api/visual-list.models';
import { VisualListAPIEpics } from './api/visual-list.epics';
import { VisualListAPIActions } from './api/visual-list.actions';
import { visualListReducer } from './api/visual-list.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: visualListReducer
})
@Component({
  selector: 'gv-visual-list',
  templateUrl: './visual-list.component.html',
  styleUrls: ['./visual-list.component.css']
})
export class VisualListComponent  extends  VisualListAPIActions  implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<VisualList>;

  // path to the substore
  @Input() basePath: string[];
  
  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: VisualListAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService
  ) {
    super()
   }

  getBasePath = () => this.basePath;


  open(pkEntity?: number) {
    this.p.addTab({
      active: true,
      component: 'visual-detail',
      icon: 'visual',
      pathSegment: 'visualDetails',
      data: { pkEntity }
    })
  }


  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, visualListReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
