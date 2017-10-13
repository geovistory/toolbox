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

@Component({
  selector: 'gv-project-entities',
  templateUrl: './project-entities.component.html',
  styleUrls: ['./project-entities.component.scss']
})
export class ProjectEntitiesComponent implements OnInit {

  persistentItems: PersistentItem[] = [];
  projectId: number;
  loading: boolean = false;
  errorMessages: any;
  onAddNewPeIt: EventEmitter<any> = new EventEmitter();

  entityModalOptions: NgbModalOptions = {
      size: 'lg'
  }

  //Language search
  public language: any
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  peItToAdd: PersistentItem;

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
    this.listProjectPeIts();
    this.onAddNewPeIt.subscribe(success => {
      this.listProjectPeIts();
    })
  }



  listProjectPeIts() {
    this.loading = true;
    this.errorMessages = {};
    this.projectApi.listPersistentItems(this.projectId)
    .subscribe(
      (persistentItems: Array<PersistentItem>) => {
        this.persistentItems = persistentItems;
        this.loading = false

      },
      error => {
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.loading = false;
      }
    );
  }

  addPeItToProject(){
    this.projectApi.addEntity(this.projectId, this.peItToAdd.semkey_peit)
    .subscribe(
      data => {
        this.listProjectPeIts();
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


  searchPeIt = (text$: Observable<string>) =>
  text$
  .debounceTime(300)
  .distinctUntilChanged()
  .do(() => this.searching = true)
  .switchMap(term =>
    this.persistentItemApi.find({"where":{"notes": {"like":term}}})
    .do(() => this.searchFailed = false)
    .catch(() => {
      this.searchFailed = true;
      return Observable.of([]);
    }))
    .do(() => {
      this.searching = false;
    })
    .merge(this.hideSearchingWhenUnsubscribed);

    formatter = (x) => x.notes;




}
