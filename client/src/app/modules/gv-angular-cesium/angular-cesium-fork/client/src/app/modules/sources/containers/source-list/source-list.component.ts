import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { WithSubStore, dispatch, select, NgRedux } from '@angular-redux/store';
import { sourceListReducer } from './source-list.reducer';
import { ISourceListState, ISourceSearchHitState, ISourceDetailState } from '../..';
import { SourceListActions } from './source-list.actions';
import { Observable, Subscription } from 'rxjs';
import { textBüchel } from '../../../quill/quill-edit/quill-edit.sandbox.mock';
import { ActivatedRoute } from '@angular/router';
import { Project, InfDigitalObjectApi, InfDigitalObject } from 'app/core';
import { QuillDoc } from '../../../quill';

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
export class SourceListComponent implements OnInit, OnDestroy {


  // path to the substore
  @Input() path: string[] | string;
  getBasePath() { return this.path }

  // if provided, initialState will be dispatched onInit replacing the lastState of substore 
  @Input() initState: ISourceListState;

  @select() edit$: Observable<ISourceDetailState>;
  @select() remove$: Observable<ISourceSearchHitState>;
  @select() create$: Observable<boolean>;
  @select() list$: Observable<{ [key: string]: ISourceSearchHitState }>;
  project$: Observable<Project>;

  editPath: string[] | string;

  hitToRemove: ISourceSearchHitState;

  subs: Subscription[] = [];

  constructor(
    private actions: SourceListActions,
    private activatedRoute: ActivatedRoute,
    private ngRedux: NgRedux<Project>,
    private digitObjApi: InfDigitalObjectApi
  ) {
    // if component is activated by ng-router, take base path here
    this.subs.push(activatedRoute.data.subscribe(d => {
      this.path = d.reduxPath;
    }))

    // observe the active project 
    this.project$ = ngRedux.select<Project>('activeProject');

    // observe and store the remove hit
    this.subs.push(this.remove$.subscribe(r => {
      this.hitToRemove = r;
    }))

  }

  ngOnInit() {
    // initial state is useful for sandboxing the component
    if (this.initState) this.updateState(this.initState)

    this.editPath = this.path === '' ? ['edit'] :
      typeof this.path === 'string' ? [...[this.path], 'edit'] :
        [...this.path, 'edit'];

    // Init the sources list 
    this.search();

  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
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
  search() {
    // TODO apply make a better filter with searchstring, limit, offset, and search only for sources in project
    this.subs.push(this.project$.subscribe(p => {
      if (p)
        this.subs.push(this.digitObjApi.find({ order: 'pk_entity DESC' }).subscribe((res: InfDigitalObject[]) => {
          const list: { [key: string]: ISourceSearchHitState } = {}

          let i = 0;
          res.forEach(digitObj => {
            list['_source_' + i] = {
              id: digitObj.pk_entity,
              label: digitObj.notes
            } as ISourceSearchHitState;
            ++i;
          })

          this.searchHitsUpdated(list)

        }))
    }))
  }

  /**
   * Updates the list of search hits in store
   */
  @dispatch() searchHitsUpdated(list: { [key: string]: ISourceSearchHitState }) {
    return this.actions.searchHitsUpdated(list);
  }

  openSearchHit(searchHit: ISourceSearchHitState) {
    const pk = searchHit.id;

    //TODO query db for source related to project
    this.digitObjApi.find({ where: { 'pk_entity': pk } }).subscribe((digiObjs: InfDigitalObject[]) => {
      const editState: ISourceDetailState = {
        view: digiObjs[0]
      }
      this.open(editState);
    })



  }

  /**
   * Opens a source for viewing and editing
   * - creates a SourceDetailState
   * - update store: 'edit'
   */
  @dispatch() open(editState: ISourceDetailState) {
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
   *    - updates store: updates 'edit', 'view', sets 'edit', 'edit' false
   *    - emits onChange Output
   */
  save(digitalObject: InfDigitalObject) {

    // TODO make saving with epr and versioning

    this.digitObjApi.replaceOrCreate(digitalObject).subscribe((result: InfDigitalObject) => {
      this.sourceUpdated(result);
    })

  }

  /**
   *  Updates store: updates 'edit', 'view', sets 'edit', 'edit' false
   */
  @dispatch() sourceUpdated(digitalObject: InfDigitalObject) {
    return this.actions.sourceUpdated(digitalObject);
  }

  /**
   * listen to changes of the source being edited and updates 'list'
   * in order to apply the changes to the list
   */
  onSourceChange() {
    this.search()
  }

  /**
   * Leads to the 'are you sure?' question
   * - update store: set 'remove' = add a clone of entry
   */
  @dispatch() startRemove(hit: ISourceSearchHitState) {
    return this.actions.startRemove(hit);
  }

  /**
   * Back to list
   * - update store: delete 'remove' 
   */
  @dispatch() cancelRemove() {
    return this.actions.cancelRemove()
  }

  /**
   * Back to list
   * - update store: delete 'remove' 
   */
  @dispatch() removed() {
    return this.actions.removed()
  }

  /**
   * Call api to remove the digital object from project, on success
   * - update store: delete 'remove'
   * - getList() 
   */
  remove() {

    // TODO make removing from project with epr

    this.subs.push(this.digitObjApi.deleteById(this.hitToRemove.id).subscribe((deleted) => {
      this.removed();
      this.search();
    }))



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
  submitCreate(dObj: InfDigitalObject) {

    // TODO make saving with epr and versioning

    this.subs.push(this.digitObjApi.replaceOrCreate(dObj).subscribe((digitalObject: InfDigitalObject) => {
      const editState: ISourceDetailState = {
        edit: digitalObject,
      }
      this.open(editState);
      this.cancelCreate()
    }))
  }

}