import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { InfPersistentItemApi } from '../shared/sdk/services/custom/InfPersistentItem';
import { EntityAddModalService , EntityAddModalState } from '../shared/services/entity-add-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';

@Component({
  selector: 'gv-entity-add-search-existing',
  templateUrl: './entity-add-search-existing.component.html',
  styleUrls: ['./entity-add-search-existing.component.scss']
})
export class EntityAddSearchExistingComponent implements OnInit, OnChanges {


  /**
  * Inputs
  */
  @Input() hidden:boolean;

  /**
  * Properties
  */
  //Feedback
  loading: boolean = false;
  errorMessages: any;

  //Search
  searchString:string = '';
  minSearchStringLength = 2;
  searchFormControl = new FormControl();

  //Hits
  persistentItems: InfPersistentItem[] = [];

  //Pagination
  collectionSize:number; // number of search results
  limit:number = 3; // max number of results on a page
  page:number = 1; // current page

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    public modalService:EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {

    this.searchFormControl.valueChanges
    .debounceTime(400)
    .subscribe(newValue => {
      this.searchString = newValue;
      this.modalService.searchString = newValue;
      if(newValue.length >= this.minSearchStringLength){
        this.page = 1;
        this.searchPeIts();
      }
      else{
        this.persistentItems = [];
        this.collectionSize = 0;
      }
    });
  }

  ngOnChanges(){
    if(this.modalService.selectedClass){
      this.modalService.modalTitle = 'Add a ' + this.modalService.selectedClass.dfh_standard_label;
    }

    if(this.hidden ===false && !this.modalService.selectRoleRange){
      this.modalService.previousState = EntityAddModalState[0];
    }
  }

  searchPeIts() {
    this.startLoading();
    this.persistentItems = [];
    this.errorMessages = {};
    this.persistentItemApi.searchInRepo(this.searchString, this.limit, this.page)
    .subscribe(
      (response) => {
        this.completeLoading();
        this.persistentItems = response.data;
        this.collectionSize = parseInt(response.totalCount);
      },
      error => {
        this.resetLoading();
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
      }
    );
  }

  pageChange(){
    this.searchPeIts();
  }

  hitsFrom(){
    return (this.limit * (this.page-1))+1;
  }
  hitsTo(){
    const upper = (this.limit * (this.page-1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  setEntityModalState(newState:string){
    this.modalService.state = newState;
  }

  add(pkEntity:number){
    this.modalService.pkEntity = pkEntity;
    this.modalService.state = 'add-existing'
  }
  
  open(pkEntity:number){
    this.modalService.onOpen.emit(pkEntity);
    this.activeModal.dismiss('Open persistent item ' + pkEntity)
  }

  select(pkEntity:number){
    this.modalService.onSelect.emit(pkEntity);
    this.activeModal.close(pkEntity)
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
    this.loading = false;
    this.slimLoadingBarService.complete();
  }

  resetLoading() {
    this.loading = false;
    this.slimLoadingBarService.reset();
  }
}
