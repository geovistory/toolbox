
import {takeUntil} from 'rxjs/operators';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItemApi, InfPersistentItem, IAppState } from 'app/core';

import { PeItDetail } from 'app/core/state/models';
import { NgForm } from '@angular/forms';
import { NgRedux } from '../../../../../../../node_modules/@angular-redux/store';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'gv-leaf-pe-it-view-modal',
  templateUrl: './leaf-pe-it-view-modal.component.html',
  styleUrls: ['./leaf-pe-it-view-modal.component.scss']
})
export class LeafPeItViewModalComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;
  isInProject: boolean;
  peItModal$: Observable<PeItDetail>;
  peItState: PeItDetail;

  loading$: Observable<boolean>

  addButtonDisabled: boolean;
  peItToAdd: InfPersistentItem;

  constructor(
    public modal: NgbActiveModal,
    private peItApi: InfPersistentItemApi,
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit() {
    this.peItModal$ = this.ngRedux.select(['activeProject', 'peItModals', this.pkEntity]);
    this.loading$ = this.ngRedux.select(['activeProject', 'peItModals', this.pkEntity, 'loading']);

    this.peItModal$.pipe(takeUntil(this.destroy$)).subscribe(p => {
      this.peItState = p;
      if (
        this.peItState && this.peItState.peIt &&
        this.peItState.peIt.entity_version_project_rels &&
        this.peItState.peIt.entity_version_project_rels.length
      ) {
        this.isInProject = true;
      } else this.isInProject = false;
    })
  }

  formChange(form: NgForm) {
    this.addButtonDisabled = form.invalid;
    this.peItToAdd = form.value.peIt;
  }

  addAndOpen() {

    return this.peItApi.addToProject(
      this.ngRedux.getState().activeProject.pk_project,
      this.peItState.peIt.pk_entity
    ).subscribe(peIts => {
      this.modal.close();
    })


  }

  open() {
    this.modal.close()
  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
