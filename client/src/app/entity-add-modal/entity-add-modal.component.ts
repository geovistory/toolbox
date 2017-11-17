import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';



@Component({
  selector: 'gv-entity-add-modal',
  templateUrl: './entity-add-modal.component.html',
  styleUrls: ['./entity-add-modal.component.scss']
})
export class EntityAddModalComponent implements OnInit {
  @Input() projectId;


  state:string;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService:EntityAddModalService
  ) {
    this.modalService.onStateChange.subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    this.modalService.state = 'choose-class';
    this.modalService.pkProject = this.projectId;
  }

  changeState(newState:string){
    this.modalService.state = newState;
  }

  add(){
    this.modalService.addPeItToProject().subscribe(success => {
      this.modalService.onOpen.emit(this.modalService.pkPersistentItem);
      this.activeModal.close('Entity Added');
    });
  }




  /*
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

*/

}
