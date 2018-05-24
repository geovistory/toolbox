import { Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InfTimePrimitive, TimePrimitive, InfRole, InfEntityProjectRel } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { ITimePrimitiveState } from './time-primitive.model';
import { EditorStates } from '../../information.models';
import { CalendarType } from '../../../../core/date-time/time-primitive';
import { IRoleState } from '../role/role.model';
import { pick } from 'ramda';

@Component({
  selector: 'gv-time-primitive',
  templateUrl: './time-primitive.component.html',
  styleUrls: ['./time-primitive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePrimitiveComponent),
      multi: true
    }
  ]
})
export class TimePrimitiveComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() parentPath: string[];

  getBasePath = () => [...this.parentPath, 'timePrimitiveState']
  basePath: string[];

  timePrimitiveState: ITimePrimitiveState;
  state: EditorStates;

  @Output() touched: EventEmitter<void> = new EventEmitter();

  subs: Subscription[] = [];

  tpCtrl: FormControl;

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  //  needed to create a proper appellation value to emit onChange of the form
  fkClass: number;

  // needed for child time primitive view
  timePrimitive:TimePrimitive;
  calendar:CalendarType;

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<ITimePrimitiveState>
  ) {
    this.formCtrl = new FormControl(
      null,
      [
        Validators.required
      ]
    );

    // create the form control
    this.tpCtrl = new FormControl(null, [Validators.required]);

    // create the formGroup used to create/edit an appellation
    this.formGroup = this.fb.group({})
    this.formGroup.addControl('timePrimitiveCtrl', this.tpCtrl)


    // subscribe to form changes here
    this.subs.push(this.tpCtrl.valueChanges.subscribe((tpVal: TimePrimitive) => {

      if (this.formGroup.valid && tpVal) {

        // build the role
        let role = new InfRole(pick(['fk_temporal_entity', 'fk_property'], this.role));

        // from TimePrimitive to InfTimePrimitve
        role.time_primitive = new InfTimePrimitive({
          duration: tpVal.duration,
          julian_day: tpVal.julianDay,
          fk_class: this.fkClass
        });

        // build a epr with the calendar information
        role.entity_version_project_rels = [
          new InfEntityProjectRel({
            calendar: tpVal.calendar as string
          } as InfEntityProjectRel)
        ]

        // send the tp the parent form
        this.onChange(role)

      }
      else {
        this.onChange(null)
      }
    }));
  }

  ngOnInit() {
    this.basePath = this.getBasePath();

    this.subs.push(this.ngRedux.select<IRoleState>(this.parentPath).subscribe(d => {
      if (d) {
        this.role = d.role;
        this.fkClass = (d.timePrimitiveState.timePrimitive && d.timePrimitiveState.timePrimitive.fk_class) ?
          d.timePrimitiveState.timePrimitive.fk_class : d.targetDfhClass.dfh_pk_class;
      }
    }))

    this.subs.push(this.ngRedux.select<ITimePrimitiveState>(this.basePath).subscribe(d => {
      if (d) {
        this.timePrimitiveState = d;
        this.state = d.state;


        // from InfTimePrimitve to TimePrimitive 
        const infTp: InfTimePrimitive = this.timePrimitiveState.timePrimitive;
        let tp: TimePrimitive = null;
        let obj: any = {}

        if (
          infTp && infTp.duration && infTp.julian_day &&
          this.getCalendarFromRole(this.role)
        ) {
          // add duration
          obj.duration = infTp.duration

          // add calendar
          obj.calendar = this.getCalendarFromRole(this.role)

          // add julian day
          obj.julianDay = infTp.julian_day;

          tp = new TimePrimitive({ ...obj })
        }

        // set value of FormControl
        this.tpCtrl.setValue(tp, { onlySelf: true, emitEvent: false })

        // set the value for TimePrimitiveView
        this.timePrimitive = tp;
        this.calendar = this.getCalendarFromRole(this.role)
      }
    }));
  }

  getCalendarFromRole(role: InfRole): CalendarType {
    if (!role) return null;

    const cal = (role.entity_version_project_rels && role.entity_version_project_rels[0].calendar) ?
      role.entity_version_project_rels[0].calendar :
      role.community_favorite_calendar ?
        role.community_favorite_calendar : null;

    return cal as CalendarType;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  /****************************************
   *  ControlValueAccessor implementation *
   ****************************************/
  formGroup: FormGroup;
  formCtrl: FormControl;

  /**
   * Allows Angular to update the model.
   * Update the model and changes needed for the view here.
   */
  writeValue(role: InfRole): void {


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
  onChange = (role: InfRole | null) => {
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
