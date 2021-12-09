import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SysSelector } from '@kleiolab/lib-queries';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent } from '../../../base/components/add-entity-or-value-dialog/add-entity-or-value-dialog.component';

@Component({
  selector: 'gv-ctrl-entity-or-value-matcher',
  templateUrl: './ctrl-entity-or-value-matcher.component.html',
  styleUrls: ['./ctrl-entity-or-value-matcher.component.scss']
})
export class CtrlEntityOrValueMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkProject: number;
  @Input() pkClass: number
  @Output() onChange = new EventEmitter<number>();

  isEntity$: Observable<boolean>
  isEntity: boolean
  config: SysConfigValue;

  constructor(
    private sys: SysSelector,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isEntity$ = this.sys.config$.main$.pipe(
      map(config => {
        this.config = config;
        const configOfClass = config.classes[this.pkClass]
        this.isEntity = !(configOfClass && configOfClass.valueObjectType)
        return this.isEntity
      }),
      startWith(true)
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openEntityOrValueDialog() {
    this.dialog.open<AddEntityOrValueDialogComponent,
      AddEntityOrValueDialogData,
      CreateEntityEvent>(AddEntityOrValueDialogComponent, {
        height: this.isEntity ? 'calc(100% - 30px)' : '260px',
        width: this.isEntity ? '980px' : '400px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: {
          pkClass: this.pkClass
        }
      })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
        if (result && result.pkEntity) this.onChange.emit(result.pkEntity);
      });
  }
}
