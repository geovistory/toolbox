import { Component, OnDestroy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, DfhLabel } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { DfhLabelEdit } from './api/dfh-label-edit.models';
import { DfhLabelEditAPIEpics } from './api/dfh-label-edit.epics';
import { DfhLabelEditAPIActions } from './api/dfh-label-edit.actions';
import { dfhLabelEditReducer } from './api/dfh-label-edit.reducer';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: dfhLabelEditReducer
})
@Component({
  selector: 'gv-dfh-label-edit',
  templateUrl: './dfh-label-edit.component.html',
  styleUrls: ['./dfh-label-edit.component.css']
})
export class DfhLabelEditComponent extends DfhLabelEditAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<DfhLabelEdit>;

  // path to the substore
  @Input() basePath: string[];
  @Output() delete = new EventEmitter<DfhLabel>();

  label: DfhLabel;

  @select() editing$: Observable<boolean>;
  @select() loading$: Observable<boolean>;


  formGroup: FormGroup;
  labelCtrl: FormControl;

  constructor(
    protected rootEpics: RootEpics,
    private epics: DfhLabelEditAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    fb: FormBuilder
  ) {
    super()
    this.labelCtrl = new FormControl()
    this.formGroup = fb.group({ 'labelCtrl': this.labelCtrl })
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, dfhLabelEditReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.localStore.select<DfhLabel>('').takeUntil(this.destroy$).subscribe((d) => {
      this.label = d;
    });
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onStartEditing() {
    this.labelCtrl.setValue(this.label.dfh_label);
    this.startEdit();
  }

  onSubmit() {
    const l = new DfhLabel({
      ...this.label,
      dfh_label: this.labelCtrl.value
    })
    this.save(l)
  }
}
