// import { InfEntityProjectRel, InfChunk } from "app/core";
// import { ControlValueAccessor, FormGroup, FormControl } from "@angular/forms";

// /**
//  * BRAINSTORM DATASTRUCTURE FOR MENTIONING
//  */

// export class InfEntityAssociation {
//     fk_domain_entity: number; // reference to chunk
//     fk_range_entity: number; // reference to named entity
//     fk_property: number; // reference to dfh_pk_property of Dfh Mentioning Property
//     entity_version_project_rels: InfEntityProjectRel[];
//     chunk: InfChunk;
// }


// export class Chunk {
//     quillDelta: object; //TODO -> jsQuill's AbstractDelta Type
//     fkDigitalObject: number;  // reference to source 
// }

// export interface Spot {
//     iiifData: object; //TODO -> IIIF Data type for a spot
//     fkDigitalObject: number;  // reference to source 
// }


/**
 * used by MentionedEntityComponent 
 */
// export interface MentionedEntity {
//     pkEntity: number;
//     label: string;
//     entityAssociation: InfEntityAssociation;
// }


// const sourcesState: ISourcesState = {
//     annotationPanel: {
//         view: {
//             _annot_1: {
//                 chunk: new Chunk(),
//                 entities: {
//                     _entity_123: {
//                         pkEntity: 123,
//                         entityAssociation: new InfEntityAssociation(),
//                         label: 'Bern'
//                     }
//                 }
//             }
//         },
//         edit: {
//             selectingSegment: true,
//             chunk: new Chunk(),
//             entities: {}
//         }
//     }
// }

// export interface ISourcesState {
//     annotationPanel: IAnnotationPanelState;
// }

// export interface IAnnotationPanelState {
//     view: { [key: string]: AnnotationState };
//     edit: AnnotationEditorState;
// }


// /**
//  * State of a Annotation
//  */
// export interface AnnotationState {

//     chunk: Chunk; // reference to the exact place of mentioning within a digital object
//     // spot: Spot; // add other types of references here
//     entities: { [key: string]: MentionedEntity }

// }

// /**
//  * State of a AnnotationEdit
//  */
// export interface AnnotationEditorState extends AnnotationState {
//     // when true, the user can select the segment (chunk of text / spot of image)
//     selectingSegment?: boolean;

//     // when true, the user can select entities
//     selectingEntities?: boolean;
// }




// /**
//  * A (simple) component with a button that leads to the mentioned entity
//  * - no store/api interaction
//  * - Input: MentionedEntity
//  * 
//  */
// export class MentionedEntityViewComponent {
//     //@Input() mE: MentionedEntity;
// }


// /** 
//  * A (simple) component
//  * - no store/api interaction
//  * - Input: MentionedEntity[]
//  * 
//  * For each entity in entities add a MentionedEntityViewComponent passing in the mE and show a button with (click)="remove()""
//  */
// export class MentionedEntitiesViewComponent {
//     //@Input() mE: MentionedEntity;
// }

// /**
//  * A Container to manage the MentionedEntities of a Annotation
//  * - Input: path
//  * - behaves as a formControl writing and emitting MentionedEntity[] 
//  * 
//  * For each entity in entities add a MentionedEntityViewComponent passing in the mE and show a button with (click)="remove()""
//  */
// export class MentionedEntitiesCtrlComponent 
// // implements ControlValueAccessor 
// {

//     //@Input() path
//     //@select() entities$   
//     //@select() selectingEntities$

//     toRemove: MentionedEntity[]


//     ngOnInit() {
//         // entities$.subscribe
//         // onChange(entities)
//     }

//     /**
//      * removes a mentioned entity
//      * - removes it from substore (the subscription to entities$ will trigger onChange())
//      * - if the mentionedEntity is_in_project, changes is_in_project=false and adds it to this.toRemove   
//      */
//     remove(key) {

//     }

//     /**
//      * Transforms the InfEntityAssociation[] to MentionedEntity[]
//      */
//     onWriteValue(mentionedEntities: MentionedEntity[]) {


//     }


// }


// /**
//  * a simple component to display a Chunk
//  * - Input: Chunk
//  */
// export class ChunkViewComponent { }




// /**
//  * A FormControl Component to edit the Annotation
//  * - interacts with store
//  * - Input: Path  
//  * 
//  * In View:
//  * if (selectingSegment) show "Selecting Text" and ChunkViewComponent passing in the Chunk
//  * if (chunk && selectingSegment) show next button (click)="next()"
//  * if (!selectingSegment) show MentionedEntitiesCtrlComponent passing the MentionedEntity[] as formVal and the Path
//  */
// export class AnnotationCtrlComponent
// // implements ControlValueAccessor 
// {


//     formGroup: FormGroup;

//     mentionedEntitiesCtrl: FormControl;

//     selectingText: boolean;

//     constructor() {
//         this.initFormSubscription()
//     }

//     initFormSubscription() {
//         //subscribe => 
//         this.onFormValueChange()


//     }

//     /**
//      * called, when chunkCtrl is valid, to proceed to see entitiesCtrl
//      * set selectingSegment=false in substore
//      */
//     next() { }

//     /**
//      * subscribe to chunk
//      * subscribe to entities
//      * subscribe to selectingSegment
//      */
//     ngOnInit() {
//         // chunk$.subscribe =>
//     }


//     /**
//      * emit the Annotation or null via onChange()
//      */
//     onFormValueChange() {

//     }

//     /**
//      * Init form control
//      */
//     onWriteValue(annotationState: AnnotationState) {
//         // if no chunk is available
//         // set selectingSegment=false in substore

//         // pass the annotationState.entities as value to mentionedEntitiesCtrl
//     }


// }


// /**
//  * Simple component that displays the Annotation
//  * - input: AnnotationState
//  * - output: showEntity(pkEntity)
//  * 
//  * Show the ChunkViewComponent
//  * Show the MentionedEntitiesViewComponent
//  * 
//  */
// export class AnnotationViewComponent {


// }

// /**
//  * Container to manage the Annotations: Create, show, edit, delete
//  * - interacts with store
//  * - interacts with api
//  * 
//  * if (edit$): AnnotationCtrlComponent and pass in the AnnotationState via formControl and the substore path to 'edit'
//  * if (!edit$): for each view.entities show AnnotationViewComponent and pass in the AnnotationState (buttons for edit and remove can be added to panel)
//  */
// export class AnnotationPanelComponent {

//     //@select() edit$
//     //@select() view$

//     /**
//      * subscribe to 'annotationPanel' 
//      */
//     ngOnInit() { }

//     /**
//      * Start new annotation
//      * - builds a new annotationState and adds it to substore path 'edit'
//      */
//     startCreate() { }

//     /**
//      * Start edit annotation
//      * - takes the annotationState from ['view', key] (leaf it there, will not be visible)
//      * - adds a deep copy of the annotationState to ['edit']
//      */
//     startEdit(key) { }

//     /**
//      * Cancels edit annotation
//      * - resets substore path 'edit' to null
//      */
//     cancelEdit() { }

//     /**
//      * Saves annotation 
//      * - gets the data from formControl of AnnotationCtrlComponent 
//      * - calls api to findOrCreate InfChunk with InfEntityAssociation[] with InfEntityProjectRel[]
//      * - on success add annotation to substore path 'view'
//      */
//     save() { }


// }