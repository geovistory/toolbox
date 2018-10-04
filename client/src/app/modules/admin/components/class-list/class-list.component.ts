import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClassListAPIActions } from './api/class-list.actions';
import { WithSubStore, NgRedux, ObservableStore, select } from '@angular-redux/store';
import { classListReducer } from './api/class-list.reducer';
import { IAppState } from 'app/core';
import { addMiddleware, removeMiddleware } from 'redux-dynamic-middlewares'
import { ClassListAPIEpics } from './api/class-list.epics';
import { ClassList } from '../../admin.models';
import { Observable, Subject } from 'rxjs';
import { RootEpics } from 'app/core/store/epics';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classListReducer
})
@Component({
  selector: 'gv-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent extends ClassListAPIActions implements OnInit, OnDestroy {

  localStore: ObservableStore<ClassList>

  destroy$: Subject<boolean> = new Subject<boolean>();

  @select() items$: Observable<any>;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return item.key;
  }

  constructor(
    private rootEpics: RootEpics,
    private epics: ClassListAPIEpics,
    private ngRedux: NgRedux<IAppState>
  ) {
    super()

    this.localStore = this.ngRedux.configureSubStore(this.getBasePath(), classListReducer)

    this.rootEpics.addEpic(this.epics.createEpic(this.localStore, this.destroy$));

    this.loadClasses()
  }

  getBasePath = () => ['admin', 'classList'];

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
