import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { MentionedEntity } from '../../annotation.models';
import { ControlValueAccessor, FormGroup, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { U } from 'app/core';
import { select, dispatch, WithSubStore, ObservableStore, NgRedux } from '@angular-redux/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { mentionedEntityCtrlReducer } from './mentioned-entities-ctrl.reducer';
import { MentionedEntityCtrlActions } from './mentioned-entities-ctrl.actions';


/**
 * A Container to manage the MentionedEntities of a Annotation
 * - Input: path
 * - behaves as a formControl writing and emitting { [key: string]: MentionedEntity } 
 * 
 * For each entity in mentionedEntities add a MentionedEntityViewComponent passing in the mE and show a button with (click)="remove()""
 */
@AutoUnsubscribe()
@WithSubStore({
    basePathMethodName: 'getBasePath',
    localReducer: mentionedEntityCtrlReducer
})
@Component({
    selector: 'gv-mentioned-entities-ctrl',
    templateUrl: './mentioned-entities-ctrl.component.html',
    styleUrls: ['./mentioned-entities-ctrl.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MentionedEntitiesCtrlComponent),
            multi: true
        }
    ]
})
export class MentionedEntitiesCtrlComponent implements OnInit, ControlValueAccessor {

    @Input() path: string[];
    getBasePath() { return this.path }

    mentionedEntities: { [key: string]: MentionedEntity };

    toRemove: MentionedEntity[]


    constructor(
        private actions: MentionedEntityCtrlActions,
        private ngRedux: NgRedux<any>
    ) {

    }


    ngOnInit() {

        this.ngRedux.select<{ [key: string]: MentionedEntity }>(this.path).subscribe(me => {
            if (this.mentionedEntities !== me)
                this.onChange(me)
        })
        // onChange(entities)
    }

    /**
     * removes a mentioned entity
     * - removes it from substore (the subscription to entities$ will trigger onChange())
     * - if the mentionedEntity is_in_project, changes is_in_project=false and adds it to this.toRemove   
     */
    @dispatch() remove(key) {
        this.onTouched();
        return this.actions.removeMentionedEntity(key)
    }

    /**
     * Transforms the InfEntityAssociation[] to MentionedEntity[]
     */
    onWriteValue(mentionedEntities: MentionedEntity[]) {


    }


    /**********************************************
    * ControlValueAccessor implementation
    **********************************************/

    writeValue(mentionedEntities: { [key: string]: MentionedEntity }): void {

        this.mentionedEntities = mentionedEntities;

        // /**
        //  * Add a formControl for each of the entities
        //  */
        // U.obj2KeyValueArr(this.mentionedEntities).forEach((e) => {
        //     this.formGroup.addControl(e.key, new FormControl(e.value))
        // })

    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onChange(mentionedEntities: { [key: string]: MentionedEntity }) { }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    onTouched() { };

    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }


}
