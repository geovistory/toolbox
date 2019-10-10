import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ClassConfig, U, UiElement } from 'app/core';
import { AddOption, FieldList, PropertyFieldList, PropertyField } from 'app/core/state/models';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { propSetMap } from '../../entity/entity.base';
import { similarPropertyField, propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';

@Component({
  selector: 'gv-add-info-te-ent',
  templateUrl: './add-info-te-ent.component.html',
  styleUrls: ['./add-info-te-ent.component.scss']
})
export class AddInfoTeEntComponent implements OnInit, OnDestroy {

  // @Input() uiElements: UiElement[];
  // @Input() classConfig: ClassConfig;
  // @Input() excludePropertyField: PropertyFieldList;
  // @Input() addedChildren$: Observable<FieldList>;

  @Output() addOptionSelected = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  typeaheadWitdh: number;
  @Input() addOptions$: Observable<AddOption[]>;
  addOptions: AddOption[];

  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.subs.push(
      this.addOptions$.subscribe(ao => this.addOptions = ao)
    )
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

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === '' ? this.addOptions : this.addOptions
          .filter(o => (
            o.label.toLowerCase().indexOf(term.toLowerCase()) > -1  // where search term matches
          ))
        ).slice(0, 10)
      )
    )
  }

}
