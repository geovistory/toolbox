import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

import { IAppState } from '../../../../core';
import { teEntReducer } from '../../data-unit/te-ent/te-ent.reducer';
import { ExistenceTimeDetail, ExTimeModalMode, RoleSetList, TeEntDetail } from '../../information.models';
import { slideInOut } from '../../shared/animations';
import { ExistenceTimeModalComponent } from '../existence-time-modal/existence-time-modal.component';
import { ExistenceTimeActions } from '../existence-time.actions';
import { existenceTimeReducer } from '../existence-time.reducer';
import { dropLast } from 'ramda';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeReducer
})
@Component({
  selector: 'gv-existence-time-editable',
  templateUrl: './existence-time-editable.component.html',
  styleUrls: ['./existence-time-editable.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExistenceTimeEditableComponent implements OnInit {

  @Input() basePath: string[]
  getBasePath = () => this.basePath;

  @Output() startEditing: EventEmitter<void> = new EventEmitter();
  @Output() stopEditing: EventEmitter<ExistenceTimeDetail> = new EventEmitter();
  @Output() onRemovePropSet: EventEmitter<void> = new EventEmitter();

  localStore: ObservableStore<ExistenceTimeDetail>
  parentTeEntStore: ObservableStore<TeEntDetail>;
  
  @select() ontoInfoVisible$: Observable<boolean>
  @select() toggle$: Observable<boolean>
  _children: RoleSetList;

  // true, if there is no termporal information
  isEmpty: boolean = true;

  subs: Subscription[] = [];

  constructor(
    protected ngRedux: NgRedux<IAppState>,
    protected actions: ExistenceTimeActions,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer);
    this.parentTeEntStore = this.ngRedux.configureSubStore(dropLast(2, this.basePath), teEntReducer)

    this.subs.push(this.localStore.select<ExistenceTimeDetail>('').subscribe(d => {
      if (d) {
        this._children = d._children;

        // if there is temporal information, set isEmpty to false
        if (this._children && Object.keys(this._children).length > 0) {
          this.isEmpty = false;
        }
        else{
          this.isEmpty = true;
        }

      }
    }))
  }

  openModal(mode: ExTimeModalMode) {

    if (!mode) {
      // if only "at some time within" is given, open in "one-date" mode
      if (Object.keys(this._children).length === 1 && this._children._72_outgoing) {
        mode = 'one-date';
      }
      // else if only "begin" and "end" is given, open in "begin-end" mode
      else if (
        Object.keys(this._children).length === 2 &&
        this._children._150_outgoing &&
        this._children._151_outgoing
      ) {
        mode = 'begin-end';
      }
      else {
        mode = "advanced";
      }

    }

    this.startEditingExistenceTime(mode);

    const modalRef = this.modalService.open(ExistenceTimeModalComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.basePath = this.basePath.concat('_existenceTime_edit');

    modalRef.result
      .then((data) => {
        this.localStore.dispatch(this.actions.existenceTimeUpdated(data))
      })
      .catch(() => {
        this.localStore.dispatch(this.actions.stopEditingExTime())
      })
  }



  startEditingExistenceTime(mode) {
    this.localStore.dispatch(this.actions.startEditingExTime(mode))
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  doRemovePropSet(){
    this.onRemovePropSet.emit()
  }


  /**
  * toggleCardBody - toggles the state of the card in order to collapse or
  * expand the card in the UI
  */
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }
}
