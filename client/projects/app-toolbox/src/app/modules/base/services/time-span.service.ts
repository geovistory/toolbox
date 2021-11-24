import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DfhConfig } from '@kleiolab/lib-config';
import { CtrlTimeSpanDialogData, CtrlTimeSpanDialogResult, InformationPipesService } from '@kleiolab/lib-queries';
import { InfActions, ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldId, InfStatement, InfStatementWithRelations, StatementWithTarget, TimePrimitiveWithCal, WarEntityPreviewTimeSpan } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { equals } from 'ramda';
import { combineLatest, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CtrlTimeSpanDialogComponent } from '../components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';

export interface TimeSpanFieldPages {
  fieldId: GvFieldId;
  count: number;
  statements: Array<StatementWithTarget>
}
export interface TimeSpanData {
  subfields: TimeSpanFieldPages[],
  preview: WarEntityPreviewTimeSpan
}

@Injectable({
  providedIn: 'root'
})
export class TimeSpanService {

  constructor(
    public p: ActiveProjectService,
    public t: InformationPipesService,
    private dialog: MatDialog,
    private inf: InfActions,
    private dataService: ReduxMainService,
  ) { }

  openModal(item: TimeSpanData, fkTeEn: number) {

    const timePrimitives = this.createDialogData(item)

    const data: CtrlTimeSpanDialogData = {
      timePrimitives,
      beforeCloseCallback: this.onSave(item, fkTeEn)
    }

    this.dialog.open(CtrlTimeSpanDialogComponent, {
      width: '500px',
      data
    });


  }
  onSave = (item: TimeSpanData, fkTeEn: number) => (n: CtrlTimeSpanDialogResult) => {
    return this.p.pkProject$.pipe(
      mergeMap((pkProject) => {
        const o = this.createOldData(item)
        const toUpsert: InfStatement[] = [];
        let toDelete: InfStatement[] = [];

        item.subfields.forEach(s => {

          if (s.statements.length > 1) {
            toDelete = [
              ...toDelete,
              ...s.statements.slice(1, s.statements.length).map(i => i.statement)
            ]
          }
        });

        [72, 152, 153, 71, 150, 151].forEach(key => {
          // if in both not, skip
          if (!o[key] && !n[key]) { }
          // if only in new, upsert
          else if (!o[key] && n[key]) {
            toUpsert.push(this.convertToStatement(key, n[key], fkTeEn))
          }
          // if only in old, delete
          else if (o[key] && !n[key]) {
            toDelete.push(o[key].r)
          }
          // if in both and different, delete old, upsert new
          else if (o[key] && n[key] && !equals(o[key].tp, n[key])) {
            toDelete.push(o[key].r)
            toUpsert.push(this.convertToStatement(key, n[key], fkTeEn))
          }
        })

        return combineLatest(
          toUpsert.length > 0 ? this.dataService.upsertInfStatementsWithRelations(pkProject, toUpsert) : of(true),
          toDelete.length > 0 ? this.dataService.removeInfEntitiesFromProject(toDelete.map(i => i.pk_entity), pkProject) : of(true)
        )

      }),
      map((ok) => true)
    )
  }

  convertToStatement(key, t: TimePrimitiveWithCal, fkTeEn: number): InfStatementWithRelations {
    const statement: InfStatementWithRelations = {
      fk_subject_info: fkTeEn,
      fk_property: parseInt(key),
      entity_version_project_rels: [{
        calendar: t.calendar
      }],
      object_time_primitive: {
        duration: t.duration,
        julian_day: t.julianDay,
        fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
      },
      ...{} as any
    }
    return statement
  }

  createDialogData(item: TimeSpanData): CtrlTimeSpanDialogResult {

    if (!item) return {};

    const timePrimitives: CtrlTimeSpanDialogResult = {}

    for (const key in item.preview) {
      if (Object.prototype.hasOwnProperty.call(item.preview, key)) {
        const pkProperty = DfhConfig.existenceTimeToFk[key];
        const i = item.preview[key]
        const t: TimePrimitiveWithCal = {
          calendar: i.calendar,
          duration: i.duration,
          julianDay: i.julianDay
        }
        timePrimitives[pkProperty] = t
      }
    }

    return timePrimitives
  }
  createOldData(item: TimeSpanData) {
    const old: {
      [key: string]: {
        tp: TimePrimitiveWithCal,
        r: InfStatement,
      }
    } = {}
    item.subfields.forEach((s) => {
      const p = s.fieldId.property.fkProperty
      if (s.statements.length > 0) {
        const r = s.statements[0].statement
        const i = s.statements[0].target.timePrimitive.timePrimitive;
        old[p] = {
          tp: {
            calendar: i.calendar,
            duration: i.duration,
            julianDay: i.julianDay
          },
          r
        }
      }

    })
    return old
  }

}
