import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { values } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { VisualDetailAPIActions } from './api/visual-detail.actions';
import { VisualDetailAPIEpics } from './api/visual-detail.epics';
import { VisualDetail } from './api/visual-detail.models';
import { visualDetailReducer } from './api/visual-detail.reducer';

export interface VisualTypeOption {
  value: VisualType,
  label: string
}
export type VisualType = 'map' | 'pieChart'

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: visualDetailReducer
})
@Component({
  selector: 'gv-visual-detail',
  templateUrl: './visual-detail.component.html',
  styleUrls: ['./visual-detail.component.css']
})
export class VisualDetailComponent extends VisualDetailAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<VisualDetail>;

  // path to the substore
  @Input() basePath: string[];
  @Input() pkEntity: number;

  // Layout
  @select() showRightArea$: Observable<boolean>;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;



  firstFormGroup: FormGroup;
  visualTypeCtrl: FormControl;
  visualTypeOptions: VisualTypeOption[] = [
    { value: 'map', label: 'Map' }
  ]

  secondFormGroup: FormGroup;
  visualSettingsCtrl: FormControl;

  thirdFormGroup: FormGroup;
  nameCtrl = new FormControl(null, Validators.required)
  descriptionCtrl = new FormControl(null)

  constructor(
    protected rootEpics: RootEpics,
    private epics: VisualDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    public p: ActiveProjectService
  ) {
    super()


    // Prepare first form group
    this.visualTypeCtrl = new FormControl(null, Validators.required)
    this.firstFormGroup = this.fb.group({
      visualTypeCtrl: this.visualTypeCtrl
    });

    // Prepare second form group
    this.visualSettingsCtrl = new FormControl(null)
    this.secondFormGroup = this.fb.group({
      visualSettingsCtrl: this.visualSettingsCtrl
    });

    // Prepare third form group
    this.thirdFormGroup = this.fb.group({
      nameCtrl: this.nameCtrl,
      descriptionCtrl: this.descriptionCtrl,
    });
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, visualDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (!this.pkEntity) this.setTabTitle('New Visual*');
  }

  onRun() {
    if (this.firstFormGroup.invalid) {
      return values(this.firstFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    if (this.secondFormGroup.invalid) {
      return values(this.secondFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pk => {
      this.showRightArea();

      // this.runInit(pk, {
      //   filter: this.filterQueryCopy,
      //   columns: this.colDefsCopy,
      //   limit: this.limit,
      //   offset: 0
      // });
    })
  }


  onSave() { }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
