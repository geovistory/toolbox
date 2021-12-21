import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SysSelector } from '@kleiolab/lib-queries';
import { SysConfigValue, SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { InfValueObject } from 'projects/app-toolbox/src/app/shared/components/value-preview/value-preview.component';
import { combineLatest, Observable, Subject } from 'rxjs';
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
  @Input() pkClasses: Array<number>;
  @Input() disabled: boolean;
  @Output() newPkEntity = new EventEmitter<number>();

  isEntity$: Observable<boolean>
  isEntity: boolean
  config: SysConfigValue;
  vot = '';

  constructor(
    public p: ActiveProjectService,
    private sys: SysSelector,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isEntity$ = this.sys.config$.main$.pipe(
      map(config => {
        this.config = config;
        //GMU todo
        const configOfClass = config.classes[this.pkClasses[0]]
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
    if (!this.disabled)
      this.dialog.open<AddEntityOrValueDialogComponent,
        AddEntityOrValueDialogData,
        CreateEntityEvent>(AddEntityOrValueDialogComponent, {
          height: this.isEntity ? 'calc(100% - 30px)' : '260px',
          width: this.isEntity ? '980px' : '400px',
          maxWidth: '100%',
          panelClass: 'gv-no-padding',
          data: {
            //gmu todo
            pkClass: this.pkClasses[0],
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
                if (langString) this.value.langString = langString
                else if (appellation) this.value.appellation = appellation
                else if (timePrimitive) this.value.timePrimitive = timePrimitive
                else if (place) this.value.place = place
                else if (language) this.value.language = language
                else if (dimension) this.value.dimension = dimension
              })
          }
        });
  }

  getVOT(): SysConfigValueObjectType {
    console.log(this.vot)
    const toReturn = {};
    toReturn[Object.keys(this.value)[0]] = true;
    return toReturn
  }
}
