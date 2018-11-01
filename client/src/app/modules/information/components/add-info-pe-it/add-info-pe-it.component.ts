import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ClassConfig, IAppState, U, UiElement, ComConfig } from 'app/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { AddOption, FieldList, PropertyFieldList, PropertyField } from 'app/core/state/models';
import { roleSetKeyFromParams, similarRoleSet } from 'app/core/state/services/state-creator';

interface PeItAddOption extends AddOption {
  label: string; // concatenation of all strings, used for search
  level1propLabel: string; // label of the property connecting peIt with class
  classLabel: string; // label of the class (mostly teEnts)
  level2propsLabels: string[]; // label of the props of the class
  uiElement: UiElement
}

@Component({
  selector: 'gv-add-info-pe-it',
  templateUrl: './add-info-pe-it.component.html',
  styleUrls: ['./add-info-pe-it.component.scss']
})
export class AddInfoPeItComponent implements OnInit, OnDestroy {

  @Input() uiElements: UiElement[];
  @Input() classConfig: ClassConfig;
  @Input() excludeRoleSet: PropertyFieldList;
  @Input() addedChildren$: Observable<FieldList>;

  @Output() addOptionSelected = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  term: string;

  typeaheadWitdh: number;
  addOptions: PeItAddOption[];

  subs: Subscription[] = [];

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {

    const crm = this.ngRedux.getState().activeProject.crm;

    this.subs.push(this.addedChildren$.subscribe(children => {

      this.addOptions = this.uiElements.map(el => {
        if (
          children && el.fk_property
          // && !children[el.roleSetKey]
          && !similarRoleSet(this.classConfig.roleSets[el.roleSetKey], this.excludeRoleSet)
        ) {

          const level1RoleSet = this.classConfig.roleSets[roleSetKeyFromParams(el.fk_property, el.property_is_outgoing)]
          const level1propLabel = level1RoleSet.label.default;
          const cla = crm.classes[level1RoleSet.targetClassPk];
          const classLabel = cla.label;
          const level2propsLabels = cla.uiContexts[ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE].uiElements.map(uiEle => {
            if (uiEle.roleSetKey) {
              const rs = crm.roleSets[uiEle.roleSetKey];
              if (!similarRoleSet(level1RoleSet, rs)) return rs.label.default
            } else if (uiEle.propSetKey) {
              return uiEle.class_field.label;
            }
          }).filter(l => l);

          const option: PeItAddOption = {
            label: [level1propLabel, classLabel, ...level2propsLabels].join(''),
            level1propLabel,
            classLabel,
            level2propsLabels,
            added: children[el.roleSetKey] ? true : false,
            uiElement: el
          }

          return option;
        }
      }).filter(o => (o))
    }))

  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  /**
  * Typeahead.
  */


  search = (text$: Observable<string>) => {

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    // filter options not yet added
    const options = this.addOptions;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => {
        this.term = term;
        return (term === '' ? options : options
          .filter(o => (
            o.label.toLowerCase().indexOf(term.toLowerCase()) > -1  // where search term matches
          ))
        ).slice(0, 10)
      })
    )
  }

}
