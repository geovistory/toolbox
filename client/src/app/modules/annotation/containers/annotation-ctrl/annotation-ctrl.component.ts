import { Component, OnInit, forwardRef, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, Validators } from '@angular/forms';
import { AnnotationState } from '../../annotation.models';
import { WithSubStore, dispatch } from '@angular-redux/store';
import { AnnotationCtrlActions } from './annotation-ctrl.actions';
import { annotationCtrlReducer } from './annotation-ctrl.reducer';
import { U } from 'app/core';
import { Subscription } from 'rxjs';


/**
 * A FormControl Component to edit the Annotation
 * - interacts with store
 * - Input: Path  
 * 
 * In Template:
 * if (selectingSegment) show "Selecting Text" and ChunkViewComponent passing in the Chunk
 * if (chunk && selectingSegment) show next button (click)="next()"
 * if (!selectingSegment) show MentionedEntitiesCtrlComponent passing the MentionedEntity[] as formVal and the Path
 */
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: annotationCtrlReducer
})
@Component({
    selector: 'gv-annotation-ctrl',
    templateUrl: './annotation-ctrl.component.html',
    styleUrls: ['./annotation-ctrl.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AnnotationCtrlComponent),
            multi: true
        }
    ]
})
export class AnnotationCtrlComponent implements OnInit, OnDestroy, ControlValueAccessor {

    @Input() path: string[];
    getBasePath() { return this.path }

    formGroup: FormGroup;

    mentionedEntitiesCtrl: FormControl;
    mentionedEntitiesCtrlPath: string[];

    annotationState: AnnotationState;

    subs: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private actions: AnnotationCtrlActions
    ) {

        this.mentionedEntitiesCtrl = new FormControl(null, this.noItemValidator)
        this.formGroup = this.fb.group({ 'mentionedEntitiesCtrl': this.mentionedEntitiesCtrl })

    }


    /**
     * called, when chunkCtrl is valid, to proceed to see entitiesCtrl
     * set selectingSegment=false in substore
     */
    @dispatch() next() {
        return this.actions.next()
    }

    /**
     * subscribe to chunk
     * subscribe to entities
     * subscribe to selectingSegment
     */
    ngOnInit() {
        this.mentionedEntitiesCtrlPath = [...this.path, 'mentionedEntities'];
        // chunk$.subscribe =>
    }

    /**
     * Unsubscribe all subscriptions
    */
    ngOnDestroy() {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    /**
     * emit the Annotation or null via onChange()
     */
    onFormValueChange() {

    }

    noItemValidator(c: FormControl) {

        const hasItem = (obj) => {

            let hasItem = false

            U.obj2Arr(obj).forEach(item => { if (item) hasItem = true; });

            return hasItem;

        }

        // if no lang or just a string
        if (!c.value || !hasItem(c.value)) {

            // return error
            return {
                noItem: {
                    valid: false
                }
            }
        }
        // else there is no error
        else {
            return null;
        }

    }



    /**********************************************
     * ControlValueAccessor implementation
     **********************************************/

    writeValue(annotationState: AnnotationState): void {

        this.annotationState = annotationState;

        if (this.annotationState)
            // pass the annotationState.entities as value to mentionedEntitiesCtrl
            this.mentionedEntitiesCtrl.setValue(this.annotationState.mentionedEntities)

    }
    registerOnChange(fn: any): void {
        this.onChange = fn;

        if (this.formGroup.valid) {
            this.onChange(this.annotationState)
        } else {
            this.onChange(null)
        }
        
        /**
         * If the form is valid, send its value via onChange()
         * else send null via onChange() 
         */
        this.subs.push(this.formGroup.valueChanges.subscribe(val => {
            if (this.formGroup.valid) {
                this.onChange(this.annotationState)
            } else {
                this.onChange(null)
            }
        }))

    }
    onChange(annotationState: AnnotationState) { }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    onTouched() { };

    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }


}
