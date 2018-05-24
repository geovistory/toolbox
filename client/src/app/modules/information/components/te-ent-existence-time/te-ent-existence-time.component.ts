import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { TeEntService } from '../../shared/te-ent.service';
import { Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IExistenceTimeState } from './te-ent-existence-time.model';
import { NgRedux, ObservableStore, WithSubStore, select } from '@angular-redux/store';
import { existenceTimeReducer } from './te-ent-existence-time.reducer';
import { ExistenceTimeActions } from './te-ent-existence-time.actions';
import { StateCreatorService } from '../../shared/state-creator.service';
import { slideInOut } from '../../shared/animations';
import { EntityEditorService } from 'app/core';


export const TeEntExistenceTimeSubStore = {
  basePathMethodName: 'getBasePath',
  localReducer: existenceTimeReducer
}

@WithSubStore(TeEntExistenceTimeSubStore)
@Component({
  selector: 'gv-te-ent-existence-time',
  templateUrl: './te-ent-existence-time.component.html',
  styleUrls: ['./te-ent-existence-time.component.scss'],
  animations: [slideInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeEntExistenceTimeComponent),
      multi: true
    }
  ]
})
export class TeEntExistenceTimeComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'existenceTimeState']
  basePath: string[];

  @select() toggle$;
  @select() state$;

  /**
   * Output
   */
  @Output() touched: EventEmitter<void> = new EventEmitter();

  /**
   * Properties
   */
  parentTeEntStatePath: string[];
  localStore: ObservableStore<IExistenceTimeState>;
  existenceTimeState: IExistenceTimeState;
  subs: Subscription[] = [];

  constructor(
    public entityEditor: EntityEditorService,
    protected teEntService: TeEntService,
    protected ngRedux: NgRedux<IExistenceTimeState>,
    protected actions: ExistenceTimeActions,
    protected stateCreator: StateCreatorService,
  ) { }



  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit() {
    this.basePath = this.getBasePath();

    this.parentTeEntStatePath = this.parentPath;

    this.localStore = this.ngRedux.configureSubStore(this.basePath, existenceTimeReducer)

    this.subs.push(this.ngRedux.select<IExistenceTimeState>(this.basePath).subscribe(d => {
      if (d) {

        this.existenceTimeState = d;

        this.initTeEntExistenceTimeChildren();

      }
    }))

  }

  /** 
 * hook for child classes to get called on init
 * never add logic to this method here, since may be overridden by child class.
*/
  initTeEntExistenceTimeChildren() { };

  

  /**
   * called, when user clicks the edit button of the existence time
   */
  startEditing() {
    this.localStore.dispatch(this.actions.startEditing());
  }


  /**
* toggleCardBody - toggles the state of the card in order to collapse or
* expand the card in the UI
*/
  toggleCardBody() {
    this.localStore.dispatch(this.actions.toggle())
  }


  /****************************************
 *  ControlValueAccessor implementation *
 ****************************************/

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(any): void {


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
  onChange = (any: any | null) => {
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
