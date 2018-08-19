import { Component, OnInit, Input, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, Subject, merge } from 'rxjs';
import { UiElement, ClassConfig } from 'app/core';
import { RoleSetList, AddOption, DataUnitChildList } from '../../information.models';
import { roleSetKeyFromParams, similarRoleSet } from '../../information.helpers';
import { propSetMap } from '../../data-unit/data-unit.base';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gv-add-info-te-ent',
  templateUrl: './add-info-te-ent.component.html',
  styleUrls: ['./add-info-te-ent.component.scss']
})
export class AddInfoTeEntComponent implements OnInit, OnDestroy {

  @Input() uiElements: UiElement[];
  @Input() classConfig: ClassConfig;
  @Input() excludeRoleSet: RoleSetList;
  @Input() addedChildren$: Observable<DataUnitChildList>;

  @Output() addOptionSelected = new EventEmitter<any>();

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  typeaheadWitdh: number;
  addOptions: AddOption[];

  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {

    this.subs.push(this.addedChildren$.subscribe(children => {

      this.addOptions = this.uiElements.map(el => {
        if (
          children && el.fk_property && !children[el.roleSetKey] &&
          !similarRoleSet(this.classConfig.roleSets[el.roleSetKey], this.excludeRoleSet)
        ) {
          const roleSet = this.classConfig.roleSets[roleSetKeyFromParams(el.fk_property, el.property_is_outgoing)]
          return {
            label: roleSet.label.default,
            uiElement: el,
            added: false
          }
        } else if (children && el.fk_property_set && !children[propSetMap[el.fk_property_set]]) {
          return {
            label: el.property_set.label,
            uiElement: el,
            added: false
          }
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
      map((term) =>
        (term === '' ? options : options
          .filter(o => (
            o.label.toLowerCase().indexOf(term.toLowerCase()) > -1  // where search term matches
          ))
        ).slice(0, 10)
      )
    )
  }

}
