import { Component, OnInit, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { environment } from '../../environments/environment';
import { LoopBackConfig } from '../shared/sdk/lb.config';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { Project } from '../shared/sdk/models/Project';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { PeItService } from '../shared/services/pe-it.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';

@Component({
  selector: 'gv-project-entities',
  templateUrl: './project-entities.component.html',
  styleUrls: ['./project-entities.component.scss']
})
export class ProjectEntitiesComponent implements OnInit {

  persistentItems: InfPersistentItem[] = [];
  projectId: number;

  //Pagination
  collectionSize:number; // number of search results
  limit:number = 10; // max number of results on a page
  page:number = 1; // current page

  //Search
  searchString:string;
  loading: boolean = false;
  errorMessages: any;


  entityModalOptions: NgbModalOptions = {
    size: 'lg'
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private persistentItemApi: InfPersistentItemApi,
    private modalService: NgbModal,
    private entityAddModalService: EntityAddModalService,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
    this.projectId = activatedRoute.snapshot.parent.params['id'];
  }

  ngOnInit() {
    this.searchProjectPeIts();
    this.entityAddModalService.onAdd.subscribe(success => {
      this.searchProjectPeIts();
    })
    this.entityAddModalService.onOpen.subscribe(pkInfPersistentItem => {
      this.openEntity(pkInfPersistentItem);
    })
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

  openEntityModal(){
    const modalRef = this.modalService.open(EntityAddModalComponent, this.entityModalOptions);
    modalRef.componentInstance.projectId = this.projectId;
    this.entityAddModalService.state = 'choose-class';

  }

  openEntity(pkInfPersistentItem){
    this.router.navigate(['../entity', pkInfPersistentItem], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
    // routerLink="../entity/{{persistentItem.pk_persistent_item}}" queryParamsHandling="merge"
  }

  get hitsFrom(){
    return (this.limit * (this.page-1))+1;
  }
  get hitsTo(){
    const upper = (this.limit * (this.page-1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  pageChange(){
    this.searchProjectPeIts();
  }
  searchStringChange(){
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
