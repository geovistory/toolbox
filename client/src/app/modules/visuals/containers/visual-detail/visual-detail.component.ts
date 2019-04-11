import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActiveProjectService, ComVisual, IAppState, latestEntityVersion, SubstoreComponent, U } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { uniq, values } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil, switchMap, delay } from 'rxjs/operators';
import { MapVisualSettings } from '../../components/map-settings/map-settings.component';
import { VisualDetailAPIActions } from './api/visual-detail.actions';
import { VisualDetailAPIEpics } from './api/visual-detail.epics';
import { VisualDetail } from './api/visual-detail.models';
import { visualDetailReducer } from './api/visual-detail.reducer';


export interface VisualTypeOption {
  value: VisualType,
  label: string
}
export type VisualType = 'map' | 'pieChart'

/**
 * These typings are relevant for persisting of the visual settings in the database
 * Change this only with great caution 
 */

export interface ComVisualI extends ComVisual {
  visual: Visual
}

export interface Visual {
  type: VisualType,
  settings: MapVisualSettings // add different types of settings like '| TimelineVisualSettings | PieChartVisualSettings'
}


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
  @select() deleted$: Observable<boolean>;
  @select() pkEntity$: Observable<number>;
  @select() queryResByVersion$: Observable<{ [key: string]: any[] }>;
  @select() queryResVersionLoading$: Observable<{ [key: string]: boolean }>;
  comVisual$: Observable<ComVisual>;
  loading$: Observable<boolean>;

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

  visualSettings$ = new BehaviorSubject<MapVisualSettings>(null);

  get visualSettings(): MapVisualSettings {
    return this.visualSettingsCtrl.value
  }

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

    this.visualSettingsCtrl.valueChanges.pipe(delay(0), takeUntil(this.destroy$)).subscribe(s => this.visualSettings$.next(s))
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, visualDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    if (this.pkEntity) this.setPkEntity(this.pkEntity);
    if (!this.pkEntity) this.setTabTitle('New Visual*');

    this.loading$ = this.queryResVersionLoading$.pipe(map(d => {
      return U.obj2Arr(d).filter(v => v === true).length ? true : false
    }))

    this.comVisual$ = this.pkEntity$.pipe(
      filter(pkEntity => pkEntity !== undefined),
      switchMap((pkEntity) => this.p.loadVisualVersion(pkEntity).pipe(
        latestEntityVersion(pkEntity)
      )
      ))

    this.comVisual$.pipe(filter(q => !!q), takeUntil(this.destroy$)).subscribe(comVisual => {
      this.visualTypeCtrl.setValue(comVisual.visual.type)
      this.visualSettingsCtrl.setValue(comVisual.visual.settings);
      this.nameCtrl.setValue(comVisual.name);
      this.descriptionCtrl.setValue(comVisual.description);
      this.setTabTitle(comVisual.name);
    })
  }


  onCreatePreview() {
    if (this.firstFormGroup.invalid) {
      return values(this.firstFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    if (this.secondFormGroup.invalid) {
      return values(this.secondFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
    }

    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.showRightArea();
      const layers = uniq(this.visualSettings.queryLayers.map(ql => ({
        queryPk: ql.queryPk, queryVersion: ql.queryVersion
      })))
      layers.forEach(layer => {
        this.loadPreview(pkProject, layer.queryPk, layer.queryVersion);
      })
    })
  }


  onSave() {
    const s = this.localStore.getState();
    let pkEntity;

    if (!s.deleted && s.pkEntity) {
      pkEntity = s.pkEntity
    }

    this.persist(pkEntity);
  }

  onSaveAs() {
    this.persist()
  }


  persist(pkEntity?: number) {

    let valid = true;
    if (this.firstFormGroup.invalid) {
      values(this.firstFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
      valid = false;
    }

    if (this.secondFormGroup.invalid) {
      values(this.secondFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
      valid = false;
    }

    if (this.thirdFormGroup.invalid) {
      values(this.thirdFormGroup.controls).forEach(ctrl => { ctrl.markAsTouched() })
      valid = false;
    }

    if (valid) {
      this.p.pkProject$.subscribe(p => {

        // create the query definition object
        const q = this.composeComVisual(p)

        // call action to save query
        this.save(q, pkEntity);

      }).unsubscribe()
    }

  }


  composeComVisual(fkProject: number): ComVisual {

    const comVisual: ComVisualI = {
      fk_project: fkProject,
      name: this.thirdFormGroup.controls.nameCtrl.value,
      description: this.thirdFormGroup.controls.descriptionCtrl.value,
      visual: {
        type: this.visualTypeCtrl.value,
        settings: this.visualSettingsCtrl.value,
      },
      entity_version: undefined,
      fk_last_modifier: undefined,
      notes: undefined,
      pk_entity: undefined,
      sys_period: undefined,
      tmsp_creation: undefined,
      tmsp_last_modification: undefined
    }
    return comVisual;
  }


  onDelete() {
    const s = this.localStore.getState();
    let pkEntity;

    if (!s.deleted && s.pkEntity) {
      pkEntity = s.pkEntity
      this.delete(pkEntity)
    }
  }


  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
