import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { UiElement, ClassConfig, IAppState, U, UiContext, ComConfig } from 'app/core';
import { RoleSetList, DataUnitChildList, AddOption } from '../../information.models';
import { roleSetKeyFromParams, similarRoleSet } from '../../information.helpers';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { DfhConfig } from '../../shared/dfh-config';

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
  @Input() excludeRoleSet: RoleSetList;
  @Input() addedChildren$: Observable<DataUnitChildList>;

  @Output() addOptionSelected = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

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

          const level2propsLabels = cla.uiContexts[ComConfig.PK_UI_CONTEXT_EDITABLE].uiElements.map(el => {
            if (el.property_set) {
              return el.property_set.label;
            }
            else (!similarRoleSet(level1RoleSet, crm.roleSets[el.roleSetKey]))
            return crm.roleSets[el.roleSetKey].label.default
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
  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  term: string;

  typeaheadWitdh: number;

  search = (text$: Observable<string>) => {

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    // filter options not yet added
    const options = this.addOptions;

    return Observable.merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).map((term) => {
      this.term = term;
      return (term === '' ? options : options
        .filter(o => (
          o.label.toLowerCase().indexOf(term.toLowerCase()) > -1  // where search term matches
        ))
      ).slice(0, 10)
    })
  }

}
