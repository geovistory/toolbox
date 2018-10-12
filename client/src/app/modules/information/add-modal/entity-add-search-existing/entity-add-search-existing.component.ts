import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem, InfPersistentItemApi } from 'app/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'gv-entity-add-search-existing',
  templateUrl: './entity-add-search-existing.component.html',
  styleUrls: ['./entity-add-search-existing.component.scss']
})
export class EntityAddSearchExistingComponent implements OnInit, OnChanges {


  /**
  * Inputs
  */
  @Input() hidden: boolean;

  /**
  * Properties
  */
  // Feedback
  loading = false;
  errorMessages: any;

  // Search
  searchString = '';
  minSearchStringLength = 2;
  searchFormControl = new FormControl();

  // Hits
  persistentItems: InfPersistentItem[] = [];

  // Pagination
  collectionSize: number; // number of search results
  limit = 3; // max number of results on a page
  page = 1; // current page

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    public modalService: EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {

    this.searchFormControl.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(newValue => {
      this.searchString = newValue;
      this.modalService.searchString = newValue;
      if (newValue.length >= this.minSearchStringLength) {
        this.page = 1;
        this.searchPeIts();
      } else {
        this.persistentItems = [];
        this.collectionSize = 0;
      }
    });
  }

  ngOnChanges() {
    if (this.modalService.selectedClass) {
      this.modalService.modalTitle = 'Add a ' + this.modalService.selectedClass.label;
    }

    if (this.hidden === false && !this.modalService.selectRoleRange) {
      this.modalService.previousState = EntityAddModalState[0];
    }
  }

  searchPeIts() {
    this.startLoading();
    this.persistentItems = [];
    this.errorMessages = {};
    this.persistentItemApi.searchInRepo(this.searchString, this.limit, this.page, this.modalService.selectedClass.dfh_pk_class)
      .subscribe(
        (response) => {
          this.completeLoading();
          this.persistentItems = response.data;
          this.collectionSize = parseInt(response.totalCount, 10);
        },
        error => {
          this.resetLoading();
          // TODO: Alert
          this.errorMessages = error.error.details.messages;
        }
      );
  }

  pageChange() {
    this.searchPeIts();
  }

  hitsFrom() {
    return (this.limit * (this.page - 1)) + 1;
  }
  hitsTo() {
    const upper = (this.limit * (this.page - 1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }

  add(pkEntity: number) {
    this.modalService.pkEntity = pkEntity;
    // this.modalService.state = 'add-existing'

    this.modalService.addToProject().subscribe(success => {
      this.modalService.onOpen.emit(this.modalService.pkEntity);
      this.completeLoading();
      this.activeModal.close('Entity Added')
    })
  }

  open(pkEntity: number) {
    this.modalService.onOpen.emit(pkEntity);
    this.activeModal.dismiss('Open persistent item ' + pkEntity)
  }

  select(pkEntity: number) {
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
