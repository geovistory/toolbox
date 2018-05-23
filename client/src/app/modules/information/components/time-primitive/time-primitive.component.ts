import { Component, OnInit, ChangeDetectionStrategy, forwardRef, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InfTimePrimitive, TimePrimitive } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { ITimePrimitiveState } from './time-primitive.model';
import { EditorStates } from '../../information.models';
import { ConfigService } from '../../shared/config.service';

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

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<ITimePrimitiveState>,
    private configService: ConfigService
  ) {
    this.formCtrl = new FormControl(
      null,
      [
        Validators.required
      ]
    );

    // create the formGroup used to create/edit a timePrimitive
    this.formGroup = this.fb.group({})

    // subscribe to form changes here
    this.subs.push(this.formGroup.valueChanges.subscribe((formVal) => {

      const val: TimePrimitive = formVal.timePrimitiveCtrl;

      if (this.formGroup.valid && val) {

        // from TimePrimitive to InfTimePrimitve
        let infTp = new InfTimePrimitive({
          duration: val.duration,
          julian_day: val.julianDay,
          fk_class: this.configService.CLASS_PK_TIME_PRIMITIVE
        });

        // send the tp the parent form
        this.onChange(infTp)

      }
      else {
        this.onChange(null)
      }
    }));
  }

  ngOnInit() {
    this.basePath = this.getBasePath();
    this.subs.push(this.ngRedux.select<ITimePrimitiveState>(this.basePath).subscribe(d => {
      if (d) {
        this.timePrimitiveState = d;
        this.state = d.state;


        // from InfTimePrimitve to TimePrimitive 
        const infTp: InfTimePrimitive = this.timePrimitiveState.timePrimitive;
        let tp: TimePrimitive = null;
        let obj: any = {}
        
        if (
          infTp.duration && infTp.julian_day &&
          infTp.entity_version_project_rels &&
          infTp.entity_version_project_rels[0].calendar
        ) {
          // add duration
          obj.duration = infTp.duration

          // add calendar
          obj.calendar = infTp.calendar

          // add julian day
          obj.julianDay = infTp.julian_day;

          tp = new TimePrimitive({ ...obj })
        }


        this.formGroup.addControl('timePrimitiveCtrl', new FormControl(
          tp,
          [
            Validators.required
          ]
        ))
      }
    }));
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
  writeValue(tp: InfTimePrimitive): void {


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
  onChange = (tp: InfTimePrimitive | null) => {
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
