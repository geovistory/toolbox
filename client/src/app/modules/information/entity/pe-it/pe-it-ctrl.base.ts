import { dispatch, NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder } from '@angular/forms';
import { InfPersistentItem } from 'app/core';
import { PeItDetail } from 'app/core/state/models';
import { Observable } from 'rxjs';
import { EntityBase } from '../entity.base';
import { PeItActions } from './pe-it.actions';
import { peItReducer } from './pe-it.reducer';
import { RootEpics } from 'app/core/store/epics';
import { EntityAPIEpics } from '../entity.epics';




/**
 * hooks in on the level of
 * PeItDetail
 *
 * Abstract class for components that
 * - act as a form control for its parent
 * - have a reactive form as child
 */
@WithSubStore({
    localReducer: peItReducer,
    basePathMethodName: 'getBasePath'
})
export abstract class PeItCtrlBase extends EntityBase implements ControlValueAccessor, OnInit {


    @Input() basePath: string[];

    // if provided, initialState will be dispatched onInit replacing the lastState of substore
    @Input() initState: PeItDetail;
    peItState: PeItDetail;

    @Output() touched: EventEmitter<void> = new EventEmitter();

    @select() peIt$: Observable<InfPersistentItem>

    localStore: ObservableStore<PeItDetail>;


    constructor(
        protected ngRedux: NgRedux<any>,
        protected actions: PeItActions,
        protected fb: FormBuilder,
        protected rootEpics: RootEpics,
        protected entityEpics: EntityAPIEpics
    ) {
        super(ngRedux, fb, rootEpics, entityEpics);
        this.initForm()
    }


    getBasePath = (): string[] => this.basePath;


    init() {
        // initial state is useful for sandboxing the component
        if (this.initState) this.updateState(this.initState)

        this.onInitPeItBaseChild()
    }


    // gets called by base class onInit
    initStore() {
        this.localStore = this.ngRedux.configureSubStore(this.basePath, peItReducer);
        this.localStore.select<PeItDetail>('').takeUntil(this.destroy$).subscribe(d => {
            this.peItState = d
        })
    }

    /**
     * Updates the state of substore
     */
    @dispatch() updateState(payload: PeItDetail) {
        return this.actions.stateUpdated(payload)
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
    private onTouched = () => { };

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


    /***************************
     *  Hooks for child class
    ****************************/
    abstract onInitPeItBaseChild(): void;

    markAsTouched() {
        this.onTouched()
        this.touched.emit()
    }

}