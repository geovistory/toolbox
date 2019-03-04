import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, AfterViewInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { ActiveProjectService, ComConfig, PropertyField } from 'app/core';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { first, map, takeUntil, filter } from 'rxjs/operators';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { PropertyOption } from '../property-select/property-select.component';
import { uniq } from 'ramda';

@Component({
  selector: 'gv-operator-select',
  templateUrl: './operator-select.component.html',
  styleUrls: ['./operator-select.component.scss']
})
export class OperatorSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  destroy$ = new Subject<void>();

  @Input() qtree: FilterTree;
  @Input() parentData$: Observable<FilterTreeData>;

  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();

  pkProperties: number[];

  propertyOptions$: Observable<PropertyOption[]>;

  pkClasses$ = new BehaviorSubject<number[]>(undefined);

  selectedOperator;
  selectedProperties;

  valid: boolean;

  get showAddSubwqueryBtn(): boolean {
    return this.valid;
  }
  constructor(public p: ActiveProjectService) { }

  ngOnInit() {

    if (this.qtree && this.qtree.data && this.qtree.data.operator) {
      this.selectedOperator = this.qtree.data.operator;
    }

    // get the options for the property select
    this.propertyOptions$ = combineLatest(this.parentData$, this.p.crm$).pipe(
      filter(([p, crm]) => (p.classes && p.classes.length && !!crm)),
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

  ngAfterViewInit() {
    this.setValid();
  }


  addChild() {
    this.qtree.children.push(new FilterTree({
      subgroup: 'classAndType'
    }));
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

  // selection of the operator changed
  operatorSelectionChange(e: MatSelectChange) {
    const val = e.value;
    this.qtree.data = {
      ...this.qtree.data,
      operator: val
    }
  }

  // selection of the properties changed
  propertySelectionChange(selection: PropertyOption[]) {
    this.selectedProperties = selection;
    this.nextPkClasses();
    this.setValid();
  }

  nextPkClasses() {
    this.p.crm$.pipe(first(crm => !!crm), takeUntil(this.destroy$))
      .subscribe((crm) => {
        this.pkClasses$.next(uniq((this.selectedProperties.map(propOption => (crm.fieldList[propOption.propertyFieldKey] as PropertyField).targetClassPk))))
      })
  }

  setValid() {
    this.valid = [
      ...(this.qtree.data.outgoingProperties || []),
      ...(this.qtree.data.ingoingProperties || [])
    ].length > 0;
    this.validChanged.emit(this.valid)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
