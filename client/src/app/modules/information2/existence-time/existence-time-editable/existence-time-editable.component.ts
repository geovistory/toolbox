import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { slideInOut } from '../../shared/animations';
import { WithSubStore, ObservableStore, NgRedux, select } from '@angular-redux/store';
import { existenceTimeReducer } from '../existence-time.reducer';
import { ExistenceTimeDetail, RoleSetList } from '../../information.models';
import { IAppState } from '../../../../core';
import { ExistenceTimeActions } from '../existence-time.actions';
import { Observable, Subscription } from 'rxjs';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeReducer
})
@Component({
  selector: 'gv-existence-time-editable',
  templateUrl: './existence-time-editable.component.html',
  styleUrls: ['./existence-time-editable.component.scss'],
  animations: [slideInOut]
})
export class ExistenceTimeEditableComponent implements OnInit {

  @Input() basePath: string[]
  getBasePath = () => this.basePath;

  @Output() startEditing: EventEmitter<void> = new EventEmitter();
  @Output() stopEditing: EventEmitter<ExistenceTimeDetail> = new EventEmitter();

  localStore: ObservableStore<ExistenceTimeDetail>

  @select() ontoInfoVisible$:Observable<boolean>
  @select() toggle$: Observable<boolean>
  _roleSet_list: RoleSetList;

  subs: Subscription[] = [];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: ExistenceTimeActions
  ) {

  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer);
    this.subs.push(this.localStore.select<ExistenceTimeDetail>('').subscribe(d => {
      if (d)
        this._roleSet_list = d._roleSet_list;
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }
}
