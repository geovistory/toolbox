import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { environment } from '../../environments/environment';
import { LoopBackConfig } from '../shared/sdk/lb.config';
import { ProjectApi } from '../shared/sdk/services/custom/Project';
import { EntityCreateModalComponent } from '../entity-create-modal/entity-create-modal.component';
import { Project } from '../shared/sdk/models/Project';

@Component({
  selector: 'gv-project-entities',
  templateUrl: './project-entities.component.html',
  styleUrls: ['./project-entities.component.scss']
})
export class ProjectEntitiesComponent implements OnInit {

  persistentItems: PersistentItem[] = [];
  projectId: number;

  //Pagination
  collectionSize:number; // number of search results
  limit:number = 10; // max number of results on a page
  page:number = 1; // current page

  //Search
  searchString:string;
  loading: boolean = false;
  errorMessages: any;

  //Add Entity Modal
  onAddNewPeIt: EventEmitter<any> = new EventEmitter();
  entityModalOptions: NgbModalOptions = {
    size: 'lg'
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private persistentItemApi: PersistentItemApi,
    private projectApi: ProjectApi,
    private modalService: NgbModal
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
    this.projectId = activatedRoute.snapshot.parent.params['id'];
  }

  ngOnInit() {
    this.searchProjectPeIts();
    this.onAddNewPeIt.subscribe(success => {
      this.searchProjectPeIts();
    })
  }

  searchProjectPeIts() {
    this.loading = true;
    this.persistentItems = [];
    this.errorMessages = {};
    this.projectApi.searchPersistentItems(this.projectId, this.searchString, this.page)
    .subscribe(
      (response) => {
        this.persistentItems = response.data;
        this.collectionSize = response.totalCount;
        this.loading = false
      },
      error => {
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.loading = false;
      }
    );
  }

  openEntityModal(){
    const modalRef = this.modalService.open(EntityCreateModalComponent, this.entityModalOptions);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.onAddNewPeIt = this.onAddNewPeIt;
  }

  hitsFrom(){
    return (this.limit * (this.page-1))+1;
  }
  hitsTo(){
    const upper = (this.limit * (this.page-1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }


}
