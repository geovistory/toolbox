import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { DfhClassProfileView, DfhLabel, SysConfig, SysSystemRelevantClass, U } from 'app/core';
import { DfhService } from 'app/core/dfh/dfh.service';
import { SystemService } from 'app/core/system/system.service';
import { omit, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { DfhActions } from '../../../../core/dfh/dfh.actions';

interface TableRow {
  dfh_pk_class: number,
  dfh_standard_label: string,
  labels: DfhLabel[],
  type: string,
  profiles: DfhClassProfileView[],
  required_by_sources: boolean,
  required_by_basics: boolean,
  required_by_entities: boolean,
  excluded_from_entities: boolean,
  systemRelevantClass: SysSystemRelevantClass,
  pending: { [prop: string]: boolean }
}

@Component({
  selector: 'gv-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent  implements OnInit, OnDestroy {

  @HostBinding('class.gv-flex-fh') flexFh = true;
  @HostBinding('class.gv-scroll-y-auto') scY = true;


  destroy$: Subject<boolean> = new Subject<boolean>();

  items$: Observable<any>;

  tableData$: Observable<TableRow[]>;

  // columns of the table
  displayedColumns: string[] = [
    'dfh_pk_class',
    'dfh_standard_label',
    'labels',
    'type',
    'profiles',
    'required_by_basics',
    'required_by_sources',
    'required_by_entities',
    'excluded_from_entities',    //'expansion'
  ];

  // if required_by_sources is pending, put 'required_by_sources' in the string array of the pk_class
  pendingRows$ = new BehaviorSubject<{ [pk_class: string]: { [prop: string]: boolean } }>({});

  showRemovedClasses$ = new BehaviorSubject<boolean>(false);

  classLabelSysType = SysConfig.PK_SYSTEM_TYPE__LABEL_FOR_DFH_CLASS;
  infFkLanguage = 18889;
  
  constructor(
    private dfhService: DfhService,
    private dfhActions: DfhActions,
    private sysService: SystemService
  ) {

    this.dfhActions.klass.load();
    this.dfhActions.label.load('CLASS_LABELS');

    this.sysService.systemRelevantClass.load();

    this.tableData$ = combineLatest(
      this.dfhService.class$.by_dfh_pk_class$,
      this.dfhService.label$.by_dfh_fk_class$,
      this.sysService.systemRelevantClass$.by_fk_class$,
      this.pendingRows$,
      this.showRemovedClasses$
    ).pipe(
      filter((d) => !d.includes(undefined)),
      map(([classes, lablesByClass, sysRelClasses, pendingRows, showRemovedClasses]) => {

        return U.obj2Arr(classes)
          .filter((c) => {
            if (showRemovedClasses) return true;
            else if (c.class_profile_view.find(cpv => cpv.removed_from_api === false)) return true;
            else return false;
          })
          .map(c => {
            const systemRelevantClass = U.firstItemInIndexedGroup(sysRelClasses, c.dfh_pk_class);
            const row: TableRow = {
              dfh_pk_class: c.dfh_pk_class,
              dfh_standard_label: c.dfh_standard_label,
              profiles: c.class_profile_view,
              labels: values(lablesByClass[c.dfh_pk_class]),
              type: !c.class_profile_view ? '' : c.class_profile_view[0].dfh_type_label,
              required_by_sources: !systemRelevantClass ? false : systemRelevantClass.required_by_sources,
              required_by_basics: !systemRelevantClass ? false : systemRelevantClass.required_by_basics,
              excluded_from_entities: !systemRelevantClass ? false : systemRelevantClass.excluded_from_entities,
              required_by_entities: !systemRelevantClass ? false : systemRelevantClass.required_by_entities,
              systemRelevantClass,
              pending: pendingRows[c.dfh_pk_class]
            }
            return row;
          })

      })
    )
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  toggleRequiredBySources(row: TableRow) {
    const col = 'required_by_sources';
    this.toggleSystemRelevantClassBool(row, col);
  }


  private toggleSystemRelevantClassBool(row: TableRow, col: string) {
    this.sysService.systemRelevantClass.upsert([
      {
        ...row.systemRelevantClass,
        fk_class: row.dfh_pk_class,
        [col]: !row.systemRelevantClass ? true : !row.systemRelevantClass[col]
      }
    ]).pipe(takeUntil(this.destroy$)).subscribe((pending) => {
      this.updatePendingRow(pending, row, col);
    });
  }

  private updatePendingRow(pending: boolean, row: TableRow, col: string) {
    if (pending) {
      const p = this.pendingRows$.value;
      this.pendingRows$.next({
        ...p, [row.dfh_pk_class]: {
          ...p[row.dfh_pk_class],
          [col]: true
        }
      });
    }
    else {
      let p = this.pendingRows$.value;
      p = { ...p, [row.dfh_pk_class]: omit([col], p[row.dfh_pk_class]) };
      if (Object.keys(p[row.dfh_pk_class]).length === 0) {
        p = omit([row.dfh_pk_class.toString()], p);
      }
      this.pendingRows$.next(p);
    }
  }
}
