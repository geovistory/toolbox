import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnDestroy, Optional, Output, Self, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { ActiveProjectService, ComQuery, latestEntityVersions, ValidationService } from 'app/core';
import { ColDef, QueryPathSegment } from 'app/modules/queries/components/col-def-editor/col-def-editor.component';
import { QueryService } from 'app/modules/queries/services/query.service';
import { equals, keys, omit, pathOr } from 'ramda';
import { combineLatest, merge, Observable, Subject, pipe, OperatorFunction } from 'rxjs';
import { filter, map, takeUntil, tap, switchMap, first } from 'rxjs/operators';
import { FilterTree, FilterTreeData } from 'app/modules/queries/containers/query-detail/query-detail.component';
import { ClassAndTypeSelectModel } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';



export interface QueryPkOption {
  value: number
  label: string
}

export interface ColOption {
  isGeo: boolean
  isTemporal: boolean
  value: string // key of colum in query.columns
  label: string // label of column
}

export interface MapQueryLayerSettings {
  queryPk?: number
  queryVersion?: number
  geoCol?: string // column containing Geo Entities, used to create a geometry on the map
  temporalCol?: string // column containing Temporal Entities, used to define existence per Geo Entity
  entityPreviewCol?: string;
  color?: string // RGB string like #FFFFFF
}

@Component({
  selector: 'gv-map-query-layer-settings',
  templateUrl: './map-query-layer-settings.component.html',
  styleUrls: ['./map-query-layer-settings.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: MapQueryLayerSettingsComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class MapQueryLayerSettingsComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<MapQueryLayerSettings> {
  static nextId = 0;
  compareFn = equals;

  model: MapQueryLayerSettings;

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  queryOptions$: Observable<QueryPkOption[]>;
  queryVersions$: Observable<number[]>;
  isOldVersion$: Observable<boolean>;
  comQuery$: Observable<ComQuery>;
  colOptions$: Observable<ColOption[]>;
  geoColOptions$: Observable<ColOption[]>;
  temporalColOptions$: Observable<ColOption[]>;

  entityPreviewCol: string;

  autofilled?: boolean;
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  writeValue$ = new Subject<void>();
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'map-query-layer-settings';
  id = `map-query-layer-settings-${MapQueryLayerSettingsComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };


  get empty() {
    return this.model ? false : true;
  }

  get shouldLabelFloat() { return this.focused || !this.empty; }

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // TODO implement some disable state
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MapQueryLayerSettings | null {
    return this.model;
  }
  set value(value: MapQueryLayerSettings | null) {
    this.model = value;
    this.onChange(this.model)
  }

  get queryPk(): number {
    return this.queryPkCtrl.value
  }

  get queryVersion(): number {
    return this.queryVersionCtrl.value
  }

  get color() {
    return this.colorCtrl.value
  }

  get geoCol() {
    return this.geoColCtrl.value
  }

  get temporalCol() {
    return this.temporalColCtrl.value
  }


  get formVal(): MapQueryLayerSettings {
    const mapQueryLayerSettings: MapQueryLayerSettings = {
      queryPk: this.queryPk,
      queryVersion: this.queryVersion,
      color: this.color,
      entityPreviewCol: this.entityPreviewCol,
      geoCol: this.geoCol,
      temporalCol: this.temporalCol
    }
    return mapQueryLayerSettings;
  }

  formGroup: FormGroup;
  queryPkCtrl: FormControl;
  queryVersionCtrl: FormControl;
  geoColCtrl: FormControl;
  temporalColCtrl: FormControl;
  colorCtrl: FormControl;
  defaultColor = '#EE1690'


  constructor(
    @Optional() @Self() public ngControl: NgControl,
    fb: FormBuilder,
    public p: ActiveProjectService,
    public q: QueryService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.queryPkCtrl = new FormControl(null, Validators.required)
    this.queryVersionCtrl = new FormControl(null, Validators.required)
    this.geoColCtrl = new FormControl(null, Validators.required)
    this.temporalColCtrl = new FormControl(null)
    this.colorCtrl = new FormControl(null, ValidationService.hexColorValidator())


    this.formGroup = fb.group({
      queryPkCtrl: this.queryPkCtrl,
      queryVersionCtrl: this.queryVersionCtrl,
      geoColCtrl: this.geoColCtrl,
      temporalColCtrl: this.temporalColCtrl,
      colorCtrl: this.colorCtrl
    })

    this.formGroup.valueChanges.subscribe(controls => {
      this.updateVal()
    })

    p.loadQueries();

    this.queryOptions$ = p.comQueryVersionsByPk$.pipe(
      tap(y => {
        console.log(y)
      }),
      latestEntityVersions(),
      map(queries => queries.map(q => ({
        value: q.pk_entity,
        label: q.name
      })))
    )

    // this is triggered on manual value changes as well as on write value
    this.queryVersions$ = combineLatest(
      merge(this.queryPkCtrl.valueChanges, this.writeValue$),
      p.comQueryVersionsByPk$
    ).pipe(
      tap(t => {
        const x = t
      }),
      filter(([queryPk, comQueries]) => (this.queryPk !== null && !!comQueries)),
      map(([queryPk, comQueries]) => {
        const versions = keys(omit(['_latestVersion'], comQueries[this.queryPk]))
          .map(key => parseInt(key.toString(), 10))
          .sort((a, b) => (a > b ? -1 : 1));
        return versions
      })
    )

    this.queryVersions$.subscribe()

    // this is triggered on manual value changes
    this.queryPkCtrl.valueChanges.pipe(
      filter((pk) => !!pk),
      takeUntil(this.destroy$)
    ).subscribe((pk) => {
      // on manual change of pkQuery take the latest version automatically
      p.comQueryVersionsByPk$.pipe(first(q => !!q), takeUntil(this.destroy$)).subscribe(comQs => {
        this.queryVersionCtrl.setValue(comQs[pk]._latestVersion)
      })

    })

    this.queryPkCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // deselect the selected Georeference Column
      this.geoColCtrl.setValue(null);
      this.temporalColCtrl.setValue(null);
    })

    // this.queryVersionCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
    //   // deselect the selected Georeference Column if is not Presence 
    //   if (!this.isE93(this.geoCol)) {
    //     this.geoColCtrl.setValue(null);
    //   }
    // })

    this.isOldVersion$ = combineLatest(this.queryVersions$, this.queryVersionCtrl.valueChanges).pipe(
      map(([vs, v]) => (vs[0] > v))
    )

    this.comQuery$ = combineLatest(
      merge(this.queryPkCtrl.valueChanges, this.writeValue$),
      merge(this.queryVersionCtrl.valueChanges, this.writeValue$),
      p.comQueryVersionsByPk$)
      .pipe(
        filter(([pk, v, comQueries]) => (!!this.queryPk && !!this.queryVersion && !!comQueries)),
        map(([pk, v, comQueries]) => {
          const versions = comQueries[this.queryPk];
          if (versions) {
            const version = versions[this.queryVersion]
            if (version.query) {
              return version
            } else {
              this.p.loadQueryVersion(this.queryPk, this.queryVersion);
              return null;
            }
          } else return null
        })
      )

    this.comQuery$.pipe(takeUntil(this.destroy$)).subscribe((queryDef) => {
      if (queryDef && queryDef.query && queryDef.query.columns) {
        const col: ColDef = queryDef.query.columns.find((c: ColDef) => c.defaultType === 'entity_preview')
        this.entityPreviewCol = col.label;
      } else {
        this.entityPreviewCol = undefined;
      }
      this.updateVal()
    })

    const rootClasses$: Observable<ClassAndTypeSelectModel> = this.comQuery$.pipe(
      tap((s) => {
        'a'
      }),
      map(comQ => pathOr(false, ['query', 'filter', 'data'], comQ)),
      filter(c => c !== false),
      map((d: FilterTreeData) => {
        return {
          classes: d.classes,
          types: d.types
        }
      })
    )

    this.p.reloadTypesForClassesInProject();

    const rootIsGeo$ = rootClasses$.pipe(
      this.q.classesFromClassesAndTypes(),
      this.q.classesAreGeo()
    )
    const rootIsTemporal$ = rootClasses$.pipe(
      this.q.classesFromClassesAndTypes(),
      this.q.classesAreTemporal()
    )
    const cols$: Observable<ColDef[]> = this.comQuery$.pipe(
      filter(comQ => pathOr(false, ['query', 'columns'], comQ) !== false),
      map(comQ => comQ.query.columns)
    )
    this.colOptions$ = combineLatest(cols$, rootIsGeo$, rootIsTemporal$, this.p.crm$)
      .pipe(
        filter((arr) => !arr.includes(undefined)),
        map(([colDefs, rootIsGeo, rootIsTemporal, crm]) => {
          const colOptions: ColOption[] = [];

          colDefs.forEach(colDef => {
            if (colDef.defaultType === 'entity_preview') {
              colOptions.push({
                isGeo: rootIsGeo,
                isTemporal: rootIsTemporal,
                value: colDef.label,
                label: colDef.label
              })
            } else {

              colOptions.push({
                isGeo: this.q.pathSegmentIsGeo(this.getLastSegment(colDef)),
                isTemporal: this.q.pathSegmentIsTemporal(this.getLastSegment(colDef), crm),
                value: colDef.label,
                label: colDef.label
              })

            }
          });

          return colOptions;
        })
      )

    // this.geoColOptions$ = this.colOptions$.map(cols => cols.sort((a, b) => a.isGeo ? -1 : 1))
    // this.temporalColOptions$ = this.colOptions$.map(cols => cols.sort((a, b) => a.isTemporal ? -1 : 1))
    this.geoColOptions$ = this.colOptions$.map(cols => cols.filter(a => a.isGeo))
    this.temporalColOptions$ = this.colOptions$.map(cols => cols.filter(a => a.isTemporal))
  }

  ngAfterViewInit() {
    this.writeValue$.next();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getLastSegment(c: ColDef): QueryPathSegment {
    if (c && c.queryPath && c.queryPath.length) {
      return c.queryPath[c.queryPath.length - 1]

    }
    return;
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }


  onContainerClick(event: MouseEvent) {
    // TODO: implement this

  }

  updateVal() {
    const newVal = this.formVal;
    if (!equals(newVal, this.model)) {
      this.value = newVal;
    }
  }

  writeValue(value: MapQueryLayerSettings | null): void {
    value = value ? value : {};
    this.queryPkCtrl.setValue(value.queryPk || null, { emitEvent: false })
    this.queryVersionCtrl.setValue(value.queryVersion || null, { emitEvent: false })
    this.geoColCtrl.setValue(value.geoCol || null)
    this.temporalColCtrl.setValue(value.temporalCol || null)
    this.colorCtrl.setValue(value.color || this.defaultColor)
    this.writeValue$.next();
    this.value = this.formVal;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur() {
    this.onTouched();
    this.blur.emit()
    this.focused = false;
  }

  onFocus() {
    this.focus.emit()
    this.focused = true;
  }

}
