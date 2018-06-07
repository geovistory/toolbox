import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';

import { NgRedux, ObservableStore, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem, InfPersistentItemApi, LoopBackConfig } from 'app/core';
import { MentionedEntity } from 'app/modules/annotation';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import {
  MentionedEntityCtrlActions,
} from '../../../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
import {
  mentionedEntityCtrlReducer,
} from '../../../annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.reducer';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';
import { projectEntitiesReducer } from './project-entities.reducers';
import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';

// import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: projectEntitiesReducer,
})
@Component({
  selector: 'gv-project-entities',
  templateUrl: './project-entities.component.html',
  styleUrls: ['./project-entities.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEntitiesComponent implements OnInit, OnDestroy {

  // path to the substore
  @Input() path: string[] | string;
  getBasePath() { return this.path }

  persistentItems: InfPersistentItem[] = [];
  projectId: number;

  selectingEntities$: Observable<boolean>;
  mentionedEntitiesCrtlStore: ObservableStore<{ [key: string]: MentionedEntity }>

  //Pagination
  collectionSize: number; // number of search results
  limit: number = 10; // max number of results on a page
  page: number = 1; // current page

  //Search
  searchString: string;
  loading: boolean = false;
  errorMessages: any;


  entityModalOptions: NgbModalOptions = {
    size: 'lg'
  }

  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private persistentItemApi: InfPersistentItemApi,
    private modalService: NgbModal,
    private entityAddModalService: EntityAddModalService,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<any>,
    private mEntitiesActions: MentionedEntityCtrlActions,

  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
    this.projectId = activatedRoute.snapshot.parent.params['id'];

    // if component is activated by ng-router, take base path here
    this.subs.push(activatedRoute.data.subscribe(d => {
      this.path = d.reduxPath;
    }))

    // listen to selecting entities for annotation
    this.selectingEntities$ = ngRedux.select<boolean>(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities'])
    this.mentionedEntitiesCrtlStore = ngRedux.configureSubStore(['sources', 'edit', 'annotationPanel', 'edit', 'mentionedEntities'], mentionedEntityCtrlReducer)

  }

  ngOnInit() {

    // init the search
    this.searchProjectPeIts();

    this.entityAddModalService.onAdd.subscribe(success => {
      this.searchProjectPeIts();
    })
    this.entityAddModalService.onOpen.subscribe(pkInfPersistentItem => {
      this.openEntity(pkInfPersistentItem);
    })
  }


  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  searchProjectPeIts() {
    this.startLoading();
    this.persistentItems = [];
    this.errorMessages = {};
    this.persistentItemApi.searchInProject(this.projectId, this.searchString, this.limit, this.page)
      .subscribe(
        (response) => {
          this.completeLoading();

          this.persistentItems = response.data;
          this.collectionSize = response.totalCount;
        },
        error => {
          this.resetLoading();

          // TODO: Alert
          this.errorMessages = error.error.details.messages;
        }
      );
  }

  openEntityModal() {
    const modalRef = this.modalService.open(EntityAddModalComponent, this.entityModalOptions);
    modalRef.componentInstance.projectId = this.projectId;
    this.entityAddModalService.state = 'choose-class';

  }

  openEntity(pkInfPersistentItem) {
    this.router.navigate(['../entity', pkInfPersistentItem], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
    // routerLink="../entity/{{persistentItem.pk_persistent_item}}" queryParamsHandling="merge"
  }

  selectMentionedEntity(entity: MentionedEntity) {
    this.mentionedEntitiesCrtlStore.dispatch(this.mEntitiesActions.addMentionedEntity(entity))
  }

  get hitsFrom() {
    return (this.limit * (this.page - 1)) + 1;
  }
  get hitsTo() {
    const upper = (this.limit * (this.page - 1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  pageChange() {
    this.searchProjectPeIts();
  }

  searchStringChange() {
    this.page = 1;
    this.searchProjectPeIts();
  }

  /**
  * Loading Bar Logic
  */

  startLoading() {
    this.loading = true;
    this.slimLoadingBarService.progress = 20;
    this.slimLoadingBarService.start(() => {
    });
  }

  stopLoading() {
    this.slimLoadingBarService.stop();
  }

  completeLoading() {
    this.loading = false
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.loading = false
    this.slimLoadingBarService.reset();
  }




}
