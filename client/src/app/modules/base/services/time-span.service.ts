import { Injectable } from '@angular/core';
import { equals } from 'ramda';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { combineLatest, of } from '../../../../../node_modules/rxjs';
import { mergeMap, map } from '../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, InfRole } from '../../../core';
import { InfActions } from '../../../core/inf/inf.actions';
import { InfTimePrimitiveWithCalendar } from '../components/ctrl-time-primitive/ctrl-time-primitive.component';
import { CtrlTimeSpanDialogComponent, CtrlTimeSpanDialogData, CtrlTimeSpanDialogResult } from '../components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { TimeSpanItem } from '../components/properties-tree/properties-tree.models';
import { InformationPipesService } from './information-pipes.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';

@Injectable({
  providedIn: 'root'
})
export class TimeSpanService {

  constructor(
    public p: ActiveProjectService,
    public t: InformationPipesService,
    private dialog: MatDialog,
    private inf: InfActions
  ) { }

  openModal(item: TimeSpanItem, fkTeEn: number) {

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
  // : Observable<boolean>
  onSave = (item: TimeSpanItem, fkTeEn: number) => (n: CtrlTimeSpanDialogResult) => {
    return this.p.pkProject$.pipe(
      mergeMap((pkProject) => {
        const o = this.createOldData(item)
        const toUpsert: InfRole[] = [];
        let toDelete: InfRole[] = [];

        item.properties.forEach(prop => {
          if (prop.items.length > 1) {
            toDelete = [...toDelete, ...prop.items.slice(1, prop.items.length).map(i => i.role)]
          }
        });

        [72, 152, 153, 71, 150, 151].forEach(key => {
          // if in both not, skip
          if (!o[key] && !n[key]) { }
          // if only in new, upsert
          else if (!o[key] && n[key]) {
            toUpsert.push(this.convertToRole(key, n[key], fkTeEn))
          }
          // if only in old, delete
          else if (o[key] && !n[key]) {
            toDelete.push(o[key].r)
          }
          // if in both and different, delete old, upsert new
          else if (o[key] && n[key] && !equals(o[key].tp, n[key])) {
            toDelete.push(o[key].r)
            toUpsert.push(this.convertToRole(key, n[key], fkTeEn))
          }
        })

        return combineLatest(
          toUpsert.length > 0 ? this.inf.role.upsert(toUpsert, pkProject).resolved$ : of(true),
          toDelete.length > 0 ? this.inf.role.remove(toDelete, pkProject).resolved$ : of(true)
        )

      }),
      map((ok) => true)
    )
  }

  convertToRole(key, t: InfTimePrimitiveWithCalendar, fkTeEn: number): InfRole {
    const role: InfRole = {
      fk_temporal_entity: fkTeEn,
      fk_property: parseInt(key),
      entity_version_project_rels: [{
        calendar: t.calendar
      }],
      time_primitive: {
        ...t,
        fk_class: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
      },
      ...{} as any
    }
    return role
  }

  createDialogData(item: TimeSpanItem): CtrlTimeSpanDialogResult {

    if (!item) return {};

    const timePrimitives: CtrlTimeSpanDialogResult = {}
    item.properties.forEach((prop) => {
      const p = prop.listDefinition.property.pkProperty
      if (prop.items.length > 0) {
        const i = prop.items[0].timePrimitive;
        timePrimitives[p] = {
          calendar: i.calendar,
          duration: i.duration,
          julian_day: i.julianDay
        } as InfTimePrimitiveWithCalendar
      }
    })
    return timePrimitives
  }
  createOldData(item: TimeSpanItem) {
    const old: {
      [key: string]: {
        tp: InfTimePrimitiveWithCalendar,
        r: InfRole,
      }
    } = {}
    item.properties.forEach((prop) => {
      const p = prop.listDefinition.property.pkProperty
      if (prop.items.length > 0) {
        const i = prop.items[0].timePrimitive;
        old[p] = {
          tp: {
            calendar: i.calendar,
            duration: i.duration,
            julian_day: i.julianDay
          } as InfTimePrimitiveWithCalendar,
          r: prop.items[0].role
        }
      }

    })
    return old
  }

}
