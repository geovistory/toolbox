import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SysSelector } from '@kleiolab/lib-queries';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { InfValueObject } from 'projects/app-toolbox/src/app/shared/components/value-preview/value-preview.component';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent } from '../../../base/components/add-entity-or-value-dialog/add-entity-or-value-dialog.component';

@Component({
  selector: 'gv-ctrl-entity-or-value-matcher',
  templateUrl: './ctrl-entity-or-value-matcher.component.html',
  styleUrls: ['./ctrl-entity-or-value-matcher.component.scss']
})
export class CtrlEntityOrValueMatcherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number; // initial value
  @Input() value: InfValueObject; // in case it is a value

  @Input() pkProject: number;
  @Input() klass$: Observable<number>;
  @Input() disabled: boolean;
  @Output() newPkEntity = new EventEmitter<number>();

  isEntity$: Observable<boolean>
  isEntity = true;
  config: SysConfigValue;
  klass: number
  value$ = new BehaviorSubject<InfValueObject>({});

  constructor(
    public p: ActiveProjectService,
    private sys: SysSelector,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isEntity$ = combineLatest([
      this.sys.config$.main$,
      this.klass$
    ]).pipe(
      map(([config, klass]) => {
        if (klass == -1) return this.isEntity
        this.config = config;
        this.klass = klass;
        const configOfClass = config.classes[klass]
        this.isEntity = !(configOfClass && configOfClass.valueObjectType)
        return this.isEntity
      }),
      startWith(true)
    )

    this.value$.next(this.value)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openEntityOrValueDialog() {
    if (!this.disabled)
      this.dialog.open<AddEntityOrValueDialogComponent,
        AddEntityOrValueDialogData,
        CreateEntityEvent>(AddEntityOrValueDialogComponent, {
          height: this.isEntity ? 'calc(100% - 30px)' : '260px',
          width: this.isEntity ? '980px' : '400px',
          maxWidth: '100%',
          panelClass: 'gv-no-padding',
          data: {
            pkClass: this.klass,
            selectMode: true
          }
        })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
          if (result && result.pkEntity) {
            this.newPkEntity.emit(result.pkEntity);

            if (!this.isEntity)  // if it is a value, we fetch the value from the store
              combineLatest([
                this.p.inf$.lang_string$.by_pk_entity$.key(result.pkEntity),
                this.p.inf$.appellation$.by_pk_entity$.key(result.pkEntity),
                this.p.inf$.time_primitive$.by_pk_entity$.key(result.pkEntity),
                this.p.inf$.place$.by_pk_entity$.key(result.pkEntity),
                this.p.inf$.language$.by_pk_entity$.key(result.pkEntity),
                this.p.inf$.dimension$.by_pk_entity$.key(result.pkEntity)
              ]).pipe(takeUntil(this.destroy$)).subscribe(([langString, appellation, timePrimitive, place, language, dimension]) => {
                this.value$.next({ langString, appellation, timePrimitive, place, language, dimension })
              })
          }
        });
  }

}
