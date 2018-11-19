import { WithSubStore, ObservableStore, NgRedux } from '@angular-redux/store';
import { Component, forwardRef, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { existenceTimeReducer } from '../existence-time.reducer';
import { InfRole, IAppState } from 'app/core';
import { ExistenceTimeDetail, PropertyFieldList } from 'app/core/state/models';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeReducer
})
@Component({
  selector: 'gv-existence-time-add-ctrl',
  templateUrl: './existence-time-add-ctrl.component.html',
  styleUrls: ['./existence-time-add-ctrl.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExistenceTimeAddCtrlComponent),
      multi: true
    }
  ]
})
export class ExistenceTimeAddCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {


  @Input() basePath: string[]

  @Output() touched: EventEmitter<void> = new EventEmitter();
  
  localStore: ObservableStore<ExistenceTimeDetail>
  _fields: PropertyFieldList;


  subs: Subscription[] = [];

  constructor(protected ngRedux: NgRedux<IAppState>) { }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer);

    this.subs.push(this.localStore.select<ExistenceTimeDetail>('').subscribe(d => {
      if (d) {
        this._fields = d._fields;
      }
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  /****************************************
*  ControlValueAccessor implementation *
****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(roles: InfRole[]): void {

  }


  /**
   * Allows Angular to register a function to call when the model changes.
   * Save the function as a property to call later here.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;

  }

  /**
   * gets replaced by angular on registerOnChange
   * This function helps to type the onChange function for the use in this class.
   */
  onChange = (roles: InfRole[] | null) => {
    console.error('called before registerOnChange')
  };

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * gets replaced by angular on registerOnTouched
   * Call this function when the form has been touched.
   */
  onTouched = () => {
  };


  markAsTouched() {
    this.onTouched()
    this.touched.emit()
  }

}
