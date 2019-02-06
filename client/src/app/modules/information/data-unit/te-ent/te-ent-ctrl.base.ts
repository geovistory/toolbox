import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder } from '@angular/forms';
import { InfTemporalEntity } from 'app/core';
import { TeEntDetail } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { Observable } from 'rxjs';
import { EntityBase } from '../data-unit.base';
import { EntityAPIEpics } from '../data-unit.epics';
import { TeEntActions } from './te-ent.actions';
import { teEntReducer } from './te-ent.reducer';


/**
 * hooks in on the level of
 * TeEntDetail
 *
 * Abstract class for components that
 * - act as a form control for its parent
 * - have a reactive form as child
 */
@WithSubStore({
    localReducer: teEntReducer,
    basePathMethodName: 'getBasePath'
})
export abstract class TeEntCtrlBase extends EntityBase implements ControlValueAccessor, OnInit {


    @Input() basePath: string[];
    @select() teEnt$: Observable<InfTemporalEntity>
    @select() toggle$: Observable<boolean>

    showOntoInfo$: Observable<boolean>
    showCommunityStats$: Observable<boolean>

    localStore: ObservableStore<TeEntDetail>;

    // if provided, initialState will be dispatched onInit replacing the lastState of substore
    @Input() initState: TeEntDetail;
    teEntState: TeEntDetail;

    @Output() touched: EventEmitter<void> = new EventEmitter();

    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: TeEntActions,
        protected fb: FormBuilder,
        protected rootEpics: RootEpics,
        protected entityEpics: EntityAPIEpics
    ) {
        super(ngRedux, fb, rootEpics, entityEpics);
        this.initForm()
    }

    getBasePath = () => this.basePath;

    init() {

        this.onInitTeEntBaseChild()
    }


    // gets called by base class onInit
    initStore() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, teEntReducer);
        this.localStore.select<TeEntDetail>('').takeUntil(this.destroy$).subscribe(d => {
            this.teEntState = d
        })
    }




    /**
     * Inits the formGroup used in template.
     */
    initForm() {
        //   create the formGroup used to create/edit the propertyField's InfRole[]
        this.formGroup = this.fb.group({});
    }

    /**
     * initializes form contols after the role set component is registered by
     * the parent's form, so that when initialization of the form controls
     * triggers the subscription of the form's valueChanges, the onChange method
     * was allready registered.
     */
    abstract initFormCtrls(): void;

    /**
    * Subscribe to FormValueChanges here
    */
    abstract subscribeFormChanges(): void;


    /**
     * gets replaced by angular on registerOnChange
     * Implement this function helps on a chlid component
     * to type the onChange function for the use in this class.
     */
    abstract onChange(controlValue): void;

    /**
    * gets replaced by angular on registerOnTouched
    * Call this function when the form has been touched.
    */
    protected onTouched = () => { };

    /**
     * gets called on setting the value of the form control
     * @param obj
     */
    abstract writeValue(obj: any): void;

    registerOnChange(fn: any): void {
        this.onChange = fn;

        this.subscribeFormChanges();

        this.initFormCtrls();

    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }


    markAsTouched() {
        this.onTouched()
        this.touched.emit()
    }


    /***************************
     *  Hooks for child class
    ****************************/
    abstract onInitTeEntBaseChild(): void;

}
