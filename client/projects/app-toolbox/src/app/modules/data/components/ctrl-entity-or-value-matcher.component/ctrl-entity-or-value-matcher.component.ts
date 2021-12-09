import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SysSelector } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { SysConfigValue, SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from '../../../base/components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityModel } from '../../../base/components/ctrl-entity/ctrl-entity.component';
import { CtrlValueDialogComponent, CtrlValueDialogData, CtrlValueDialogResult } from '../../../base/components/ctrl-value/ctrl-value-dialog.component';

@Component({
  selector: 'gv-default-value-entity',
  templateUrl: './ctrl-entity-or-value-matcher.component.html',
  styleUrls: ['./ctrl-entity-or-value-matcher.component.scss']
})
export class CtrlEntityOrValueMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkProject: number;
  @Input() pkClass: number
  @Output() onChange = new EventEmitter<number>();

  isEntity$: Observable<boolean>
  config: SysConfigValue;

  constructor(
    private sys: SysSelector,
    private dialog: MatDialog,
    private p: ActiveProjectService,
    private dataService: ReduxMainService,
  ) { }

  ngOnInit(): void {
    this.isEntity$ = this.sys.config$.main$.pipe(
      map(config => {
        this.config = config;
        const configOfClass = config.classes[this.pkClass]
        return !(configOfClass && configOfClass.valueObjectType)
      }),
      startWith(true)
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDialog(isEntity: boolean) {
    if (isEntity) this.openEntityDialog();
    else this.openValueDialog();
  }

  openEntityDialog() {
    this.dialog.open<CtrlEntityDialogComponent,
      CtrlEntityDialogData,
      CtrlEntityModel>(CtrlEntityDialogComponent, {
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: {
          initVal$: new BehaviorSubject(undefined),
          showAddList: true,
          hiddenProperty: undefined,
          disableIfHasStatement: undefined,
          pkClass: this.pkClass,
          defaultSearch: ''
        }
      })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result && result.pkEntity) this.onChange.emit(result.pkEntity);
      });
  }

  openValueDialog() {
    this.dialog.open<CtrlValueDialogComponent,
      CtrlValueDialogData, CtrlValueDialogResult>(CtrlValueDialogComponent, {
        maxWidth: '100%',
        data: {
          initVal$: undefined,
          pkClass: this.pkClass,
          pkProject: this.pkProject,
          vot: this.getVOT(this.pkClass),
        }
      })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
        // apicall to create the value?
      });
  }


  getVOT(fkClass: number): SysConfigValueObjectType | undefined {
    if (Object.keys(this.config.classes).some(k => k === fkClass + '')) return this.config.classes[fkClass].valueObjectType
    return undefined;
  }

}
