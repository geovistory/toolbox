import { Component, OnInit, Input } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WithSubStore, dispatch, select } from '@angular-redux/store';
import { sourceListReducer } from './source-list.reducer';
import { ISourceListState, ISourceSearchHitState, ISourceDetailState } from '../..';
import { SourceListActions } from './source-list.actions';
import { Observable } from 'rxjs';
import { textBüchel } from '../../../quill/quill-edit/quill-edit.sandbox.mock';

/**
 * Container to manage the sources (digital objects): Search, create, show, edit, remove
 * - interacts with store on the level of ISourcesState
 * - interacts with api
 *   - search for sources and update 'list' var of substore
 *   
 * 
 * Template
 * - If nor 'create' nor 'edit' nor 'remove' vars of substore are truthy, 
 *      show a create source button
 *      show a SourceSearchHitComponent for each entry in 'list' with open and remove buttons
 *      passing SourceSearchHitState via Input
 *
 * - If 'create' is truthy, show a form with SourceCreateFormComponent
 *   listening to submit and cancel Outputs 
 * 
 * - If 'edit' is truthy, show a SourceDetailComponent 
 *   passing store path to 'edit' via Input
 *   listening to onChange Output to update the 'list'
 * 
 * - If 'remove' is truthy, show a SourceSearchHitComponent with 'are you sure', cancel and remove buttons
 *   passing store path to 'remove' via Input 
 * 
 * Note: there must never be more than one of 'create', 'edit' and 'remove' vars of substore truthy at the same time
 * 
*/
@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: sourceListReducer
})
@Component({
  selector: 'gv-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss']
})
export class SourceListComponent implements OnInit {

  // path to the substore
  @Input() path: string[] | string;
  getBasePath() { return this.path }

  // if provided, initialState will be dispatched onInit replacing the lastState of substore 
  @Input() initState: ISourceListState;

  @select() edit$: Observable<ISourceDetailState>;
  @select() remove$: Observable<ISourceSearchHitState>;
  @select() create$: Observable<boolean>;
  @select() list$: Observable<{ [key: string]: ISourceSearchHitState }>;


  editPath: string[] | string;

  constructor(
    private actions: SourceListActions
  ) { }

  ngOnInit() {
    // initial state is useful for sandboxing the component
    if (this.initState) this.updateState(this.initState)

    this.editPath = this.path === '' ? ['edit'] :
    typeof this.path === 'string' ? [...[this.path], 'edit'] :
      [...this.path, 'edit'];
  }

  /**
   * Updates the state of substore
   */
  @dispatch() updateState(payload: ISourceListState) {
    return this.actions.stateUpdated(payload)
  }


  /**
   * Querys the database for sources filtered by 'filter' and on success
   * - update store: 'list'
   */
  getList() {
    //TODO
  }

  /**
   * Opens a source for viewing and editing
   * - creates a SourceDetailState
   * - update store: 'edit'
   */
  @dispatch() open(searchHit: ISourceSearchHitState) {
    const pk = searchHit.id;

    //TODO query db for source
    const editState = {
      view: textBüchel,
      editDigitalObject: false,
      showAnnotatedSegments: false
    } as ISourceDetailState

    return this.actions.open(editState)
  }

  /**
   * Closes a source
   * - update store: delete 'edit' 
   */
  @dispatch() close() {
    return this.actions.close()
  }

  /**
   * Save the changes made on Digital Object
   * - calls api to persist the changes in db and on success
   *    - updates store: updates 'digitalObject', sets 'editDigitalObject' false
   *    - emits onChange Output
   */
  save() {
    // TODO
  }

  /**
   * listen to changes of the source being edited and updates 'list'
   * in order to apply the changes to the list
   */
  onSourceChange() {
    this.getList()
  }

  /**
   * Leads to the 'are you sure?' question
   * - update store: set 'remove' = add a clone of entry
   */
  @dispatch() startRemove(entry: ISourceSearchHitState) {
    return this.actions.startRemove(entry);
  }

  /**
   * Back to list
   * - update store: delete 'remove' 
   */
  @dispatch() cancelRemove() {
    return this.actions.cancelRemove()
  }

  /**
   * Call api to remove the digital object from project, on success
   * - update store: delete 'remove'
   * - getList() 
   */
  remove(entry: ISourceSearchHitState) {
    // TODO
  }

  /**
   * Shows create form
   * - updates store: set 'create' true 
   */
  @dispatch() startCreate() {
    return this.actions.startCreate()
  }

  /**
   * Hides create form
   * - updates store: set 'create' false 
   */
  @dispatch() cancelCreate() {
    return this.actions.cancelCreate()

  }

  /**
   * Calls api to persists a new digital object in database, on success
   * Create SourceDetailState
   * - update store: set edit: new SourceDetailState 
   */
  submitCreate() {
    // TODO
  }

}