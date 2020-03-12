import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SysConfig } from 'app/core';
import { TabLayoutService } from 'app/shared/components/tab-layout/tab-layout.service';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapAndTimeContInput, MapAndTimeContOutput } from '../../../../../../../src/common/interfaces';
import { AnalysisService } from '../../services/analysis.service';
import { MapAndTimeContFormComponent } from '../map-and-time-cont-form/map-and-time-cont-form.component';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';


@Component({
  selector: 'gv-map-and-time-cont-edit',
  templateUrl: './map-and-time-cont-edit.component.html',
  styleUrls: ['./map-and-time-cont-edit.component.scss']
})
export class MapAndTimeContEditComponent implements OnInit, OnDestroy {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  destroy$ = new Subject<boolean>();

  @ViewChild('c') formComponent: MapAndTimeContFormComponent

  initVal$: Observable<MapAndTimeContInput>

  constructor(
    p: ActiveProjectService,
    public a: AnalysisService<MapAndTimeContInput, MapAndTimeContOutput>,
    private ts: TabLayoutService
  ) {

    if (this.a.pkEntity) {
      this.initVal$ = p.pro$.analysis$.by_pk_entity$.key(this.a.pkEntity.toString()).pipe(
        map(i => i.analysis_definition),
      )
    }

    this.a.registerRunAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callRunApi(q)
        this.ts.t.setShowRightArea(true);
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    }, SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT)

    this.a.registerCreateAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        return this.a.callCreateApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        return of()
      }
    })

    this.a.registerSaveAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callSaveApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
      }
    })

    this.a.registerCopyAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        return this.a.callCopyApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        return of()
      }
    })

    this.a.registerRenameAnalysis(() => {
      if (this.formComponent.formFactory.formGroup.valid) {
        const q = this.formComponent.formFactory.formGroupFactory.valueChanges$.value;
        this.a.callRenameApi(q)
      } else {
        this.formComponent.formFactory.markAllAsTouched()
        of()
      }
    })
  }


  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
