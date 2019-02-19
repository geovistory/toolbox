import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { ActiveProjectService, ComConfig, PropertyField } from 'app/core';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { first, map, takeUntil, filter } from 'rxjs/operators';
import { QueryTree, QueryTreeData } from '../../containers/query-detail/query-detail.component';
import { PropertyOption } from '../property-select/property-select.component';
import { uniq } from 'ramda';

@Component({
  selector: 'gv-operator-select',
  templateUrl: './operator-select.component.html',
  styleUrls: ['./operator-select.component.scss']
})
export class OperatorSelectComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  @Input() qtree: QueryTree;
  @Input() parentData$: Observable<QueryTreeData>;

  @Output() remove = new EventEmitter<void>();

  pkProperties: number[];

  propertyOptions$: Observable<PropertyOption[]>;

  pkClasses$ = new BehaviorSubject<number[]>([]);

  selected;

  constructor(public p: ActiveProjectService) { }

  ngOnInit() {

    // get the options for the property select
    this.propertyOptions$ = combineLatest(this.parentData$, this.p.crm$).pipe(
      filter(([p, crm]) => (p.classes && !!crm)),
      map(([p, crm]) => {
        const props: PropertyOption[] = []
        p.classes.forEach(pkClass => {
          const classConfig = crm.classes[pkClass];
          const uiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
          if (classConfig.uiContexts && classConfig.uiContexts[uiContext]) {
            (classConfig.uiContexts[uiContext].uiElements || []).forEach(ele => {
              if (ele.propertyFieldKey) {
                props.push({
                  propertyFieldKey: ele.propertyFieldKey,
                  isOutgoing: ele.property_is_outgoing,
                  pk: ele.fk_property,
                  label: classConfig.propertyFields[ele.propertyFieldKey].label.default
                })
              }
            })
          }
        })

        // add sorting here

        return props
      }),
      takeUntil(this.destroy$)
    )

  }

  addChild() {
    this.qtree.children.push(new QueryTree());
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

  // selection of the operator changed
  selectionChange(e: MatSelectChange) {
    const val = e.value;
    this.qtree.data = {
      operator: val
    }
  }


  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }


  propertySelectionChange(selection: PropertyOption[]) {
    this.p.crm$.pipe(first(crm => !!crm), takeUntil(this.destroy$))
      .subscribe((crm) => {
        this.pkClasses$.next(uniq((selection.map(propOption => (crm.fieldList[propOption.propertyFieldKey] as PropertyField).targetClassPk))))
      })
  }
}
