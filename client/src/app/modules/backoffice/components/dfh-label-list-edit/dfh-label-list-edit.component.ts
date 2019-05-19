import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DfhLabel, U } from 'app/core';
import { DfhService } from 'app/core/dfh/dfh.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ByPk } from '../../../../core/store/model';



export interface DfhLabelEdit extends DfhLabel {
  editing: boolean
}

@Component({
  selector: 'gv-dfh-label-list-edit',
  templateUrl: './dfh-label-list-edit.component.html',
  styleUrls: ['./dfh-label-list-edit.component.css']
})
export class DfhLabelListEditComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @Input() dfhFkProperty: number;
  @Input() dfhFkClass: number;
  @Input() infFkLanguage?: number;
  @Input() comFkSystemType?: number;

  creating: boolean;
  loading: boolean;
  items$: Observable<DfhLabelEdit[]>;

  editing$ = new BehaviorSubject<{ [key: string]: boolean }>({});


  constructor(private dfhService: DfhService) { }


  ngOnInit() {
    if (!this.infFkLanguage || !this.comFkSystemType) throw Error('You must provide infFkLanguage and comFkSystemType')

    if (this.dfhFkClass) {

      this.items$ = this.pipeItems(this.dfhService.label$.by_dfh_fk_class$, this.dfhFkClass);

    } else if (this.dfhFkProperty) {

      this.items$ = this.pipeItems(this.dfhService.label$.by_dfh_fk_property$, this.dfhFkProperty);

    }
  }

  private pipeItems(selector: Observable<ByPk<ByPk<DfhLabel>>>, key: number): Observable<DfhLabelEdit[]> {
    return combineLatest(selector, this.editing$).pipe(map(([labelsByClass, editing]) => U.obj2Arr(labelsByClass[key])
      .filter(label => (label.com_fk_system_type === this.comFkSystemType && label.inf_fk_language === this.infFkLanguage))
      .map(label => ({
        ...label, editing: editing[label.pk_entity]
      }))));
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }




  upsert(label: DfhLabel) {
    this.dfhService.label.upsert([label]).pipe(takeUntil(this.destroy$)).subscribe((pending) => {
      if (pending) this.loading = true;
      else this.loading = false
    });
  }

  delete(label: DfhLabel) {
    this.dfhService.label.delete([label]).pipe(takeUntil(this.destroy$)).subscribe((pending) => {
      if (pending) this.loading = true;
      else this.loading = false
    });
  }


  startEditing(pk_entity) {
    this.editing$.next({ ...this.editing$.value, [pk_entity]: true });
  }

  stopEditing(pk_entity) {
    this.editing$.next({ ...this.editing$.value, [pk_entity]: false });
  }

}
