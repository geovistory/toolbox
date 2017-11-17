import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gv-entity-add-search-existing',
  templateUrl: './entity-add-search-existing.component.html',
  styleUrls: ['./entity-add-search-existing.component.scss']
})
export class EntityAddSearchExistingComponent implements OnInit {

  //Feedback
  loading: boolean = false;
  errorMessages: any;

  //Search
  searchString:string = '';
  searchFormControl = new FormControl();

  //Hits
  persistentItems: PersistentItem[] = [];

  //Pagination
  collectionSize:number; // number of search results
  limit:number = 3; // max number of results on a page
  page:number = 1; // current page

  constructor(
    private persistentItemApi: PersistentItemApi,
    public modalService:EntityAddModalService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if(this.modalService.selectedClass){
      this.modalService.modalTitle = 'Add a ' + this.modalService.selectedClass.label;
    }

    this.searchFormControl.valueChanges
      .debounceTime(400)
      .subscribe(newValue => {
        this.searchString = newValue;
        if(newValue.length > 1){
          this.page = 1;
          this.searchPeIts();
        }
        else{
        this.persistentItems = [];
        this.collectionSize = 0;
        }
      });
  }

  searchPeIts() {
    this.loading = true;
    this.persistentItems = [];
    this.errorMessages = {};
    this.persistentItemApi.searchInRepo(this.searchString, this.limit, this.page)
    .subscribe(
      (response) => {
        this.persistentItems = response.data;
        this.collectionSize = parseInt(response.totalCount);
        this.loading = false
      },
      error => {
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.loading = false;
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

  add(pkPersistentItem:number){
    this.modalService.pkPersistentItem = pkPersistentItem;
    this.modalService.state = 'add-existing'
  }
  open(pkPersistentItem:number){
    this.modalService.onOpen.emit(pkPersistentItem);
    this.activeModal.dismiss('Open persistent item ' + pkPersistentItem)

  }

}
