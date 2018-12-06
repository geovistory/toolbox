import { NgRedux } from '@angular-redux/store';
import { EventEmitter, Injectable } from '@angular/core';
import { IAppState, ComConfig, InfChunk } from 'app/core';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';
import { Project } from '../sdk/models/Project';
import { ProjectApi } from '../sdk/services/custom/Project';
import { ActiveProjectActions } from './active-project.action';
import { ActivatedRoute, Router, UrlSegmentGroup, UrlSegment, Params } from '@angular/router';


@Injectable()
export class ActiveProjectService {
  private changeProjectEventEmitter = new EventEmitter<Project>();
  project: Project;

  constructor(
    private projectApi: ProjectApi,
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

  }

  /**
   * Initialize the project in state, if the activeProject is not yet
   * in state or if the pk_project of the activeProject in state
   * is not the one provided
   *
   * @param id pk_project
   */
  initProject(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id) {
      this.ngRedux.dispatch(this.actions.loadProject(id))
    }
  }

  /**
   * Initialize the project crm
   *
   * @param id pk_project
   */
  initProjectCrm(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id || !state.activeProject.crm) {
      this.ngRedux.dispatch(this.actions.activeProjectLoadCrm(id))
    }
  }

  /**
   * Loads a data unit preview, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntity
   * @param forceReload
   */
  loadDataUnitPreview(pkEntity: number, forceReload?: boolean) {
    const state = this.ngRedux.getState();
    if (!(((state || {}).activeProject || {}).dataUnitPreviews || {})[pkEntity] || forceReload) {
      const pkUiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
      this.ngRedux.dispatch(this.actions.loadDataUnitPreview(state.activeProject.pk_project, pkEntity, pkUiContext))
    }
  }


  /**
   * Loads a chunk, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntity
   * @param forceReload
   */
  loadChunk(pkEntity: number, forceReload?: boolean) {
    const state = this.ngRedux.getState();
    if (!(((state || {}).activeProject || {}).chunks || {})[pkEntity] || forceReload) {
      this.ngRedux.dispatch(this.actions.loadChunk(state.activeProject.pk_project, pkEntity))
    }
  }

  /**
   * Loads a DataUnit Detail (PeItDetail or TeEnDetail) in cache for display in Modals
   *
   * @param pkEntity
   * @param forceReload
   */
  loadDataUnitDetailForModal(pkEntity: number, forceReload = true, pkUiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE) {
    const state = this.ngRedux.getState();
    if (!(((state || {}).activeProject || {}).peItModals || {})[pkEntity] || forceReload) {
      this.ngRedux.dispatch(this.actions.loadDataUnitDetailForModal(state.activeProject.pk_project, pkEntity, pkUiContext))
    }
  }

  updateSelectedChunk(c: InfChunk) {
    this.ngRedux.dispatch(this.actions.updateSelectedChunk(c))
  }

  setRefiningChunk(bool: boolean) {
    this.ngRedux.dispatch(this.actions.setRefiningChunk(bool))
  }

  mentioningsFocusedInText(pks: number[]) {
    this.ngRedux.dispatch(this.actions.setMentioningsFocusedInText(pks))
  }

  mentioningsFocusedInTable(pks: number[]) {
    this.ngRedux.dispatch(this.actions.setMentioningsFocusedInTable(pks))
  }

  /**
   * Provide sources or/and information to update this UrlSegmentGroup of the Ng UrlTree
   *
   * @param sources the new UrlSegmentGroup for sources
   * @param information the new UrlSegmentGroup for information
   */
  private createNewUrl(newSources: UrlSegmentGroup | null, newInformation: UrlSegmentGroup | null, newQueryParams: Params): string {
    let urlTree = this.router.parseUrl(this.router.url);

    urlTree = {
      ...urlTree,
      queryParams: {
        ...urlTree.queryParams,
        ...newQueryParams
      },
      root: new UrlSegmentGroup(
        urlTree.root.segments,
        {
          primary: new UrlSegmentGroup(
            [
              new UrlSegment('projects', {}),
              new UrlSegment(this.ngRedux.getState().activeProject.pk_project.toString(), {}),
              new UrlSegment('edit', {})
            ],
            {
              information: (newInformation ? newInformation : urlTree.root.children.primary.children.information),
              sources: (newSources ? newSources : urlTree.root.children.primary.children.sources)// TODO if not available, set it to 'search'
            }
          )
        }
      )
    }
    return this.router.serializeUrl(urlTree)

  }

  navigateToDataUnit(pk: number) {

    const newUrl = this.createNewUrl(
      null,
      new UrlSegmentGroup([new UrlSegment('entity', {}), new UrlSegment(pk.toString(), {})], {}),
      { 'i': 'on' }
    )

    this.router.navigateByUrl(newUrl)
  }

  navigateToSource(pk: number) {

    const newUrl = this.createNewUrl(
      new UrlSegmentGroup([new UrlSegment(pk.toString(), {})], {}),
      null,
      { 's': 'on' }
    )

    this.router.navigateByUrl(newUrl)
  }

  navigateToSection(sourcePk: number, sectionPk: number) {


    const newUrl = this.createNewUrl(
      new UrlSegmentGroup([
        new UrlSegment(sourcePk.toString(), {}),
        new UrlSegment('section', {}),
        new UrlSegment(sectionPk.toString(), {})
      ], {}),
      null,
      { 's': 'on' }
    )

    this.router.navigateByUrl(newUrl)
  }
}
