import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StateFacade } from '@kleiolab/lib-redux';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { EntityPreviewComponent } from '../../../../shared/components/entity-preview/entity-preview.component';
import { InfValueObject, ValuePreviewComponent } from '../../../../shared/components/value-preview/value-preview.component';
import { ActiveProjectService } from '../../../../shared/services/active-project.service';
import { AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent } from '../../../base/components/add-entity-or-value-dialog/add-entity-or-value-dialog.component';

@Component({
  selector: 'gv-ctrl-entity-or-value-matcher',
  templateUrl: './ctrl-entity-or-value-matcher.component.html',
  styleUrls: ['./ctrl-entity-or-value-matcher.component.scss'],
  standalone: true,
  imports: [NgIf, MatFormFieldModule, MatInputModule, EntityPreviewComponent, ValuePreviewComponent, AsyncPipe]
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
    private state: StateFacade,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isEntity$ = combineLatest([
      this.state.data.sys.config.sysConfig$,
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
                this.state.data.inf.langString.getLangString.byPkEntity$(result.pkEntity),
                this.state.data.inf.appellation.getAppellation.byPkEntity$(result.pkEntity),
                this.state.data.inf.timePrimitive.getTimePrimitive.byPkEntity$(result.pkEntity),
                this.state.data.inf.place.getPlace.byPkEntity$(result.pkEntity),
                this.state.data.inf.language.getLanguage.byPkEntity$(result.pkEntity),
                this.state.data.inf.dimension.getDimension.byPkEntity$(result.pkEntity)
              ]).pipe(takeUntil(this.destroy$)).subscribe(([langString, appellation, timePrimitive, place, language, dimension]) => {
                this.value$.next({ langString, appellation, timePrimitive, place, language, dimension })
              })
          }
        });
  }

}
