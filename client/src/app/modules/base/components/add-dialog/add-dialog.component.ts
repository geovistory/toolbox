import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SysConfig } from 'app/core';
import { AddOrCreateEntityModalComponent, AddOrCreateEntityModalData } from 'app/modules/base/components/add-or-create-entity-modal/add-or-create-entity-modal.component';
import { CreateOrAddEntityEvent } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.component';
import { BehaviorSubject } from 'rxjs';
import { ListDefinition } from '../properties-tree/properties-tree.models';

type ActiveElement = 'add-list' | 'create-form' | 'create-or-add'

export interface AddDialogData {
  listDefinition: ListDefinition;

  // primary key of the source entity
  pkEntity: number;
}

@Component({
  selector: 'gv-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  activeElement$ = new BehaviorSubject<ActiveElement>('add-list')
  showOntoInfo$ = new BehaviorSubject(false)
  readonly$ = new BehaviorSubject(false)
  isLeafItemList: boolean;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
  ) {
    this.isLeafItemList = ['appellation', 'language', 'place', 'text-property', 'lang-string', 'entity-preview']
      .includes(data.listDefinition.listType);
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close()
  }
  onNext() {

    if (this.data.listDefinition.identityDefiningForTarget) {
      this.activeElement$.next('create-form')
    }
    else {

      this.dialog.open<AddOrCreateEntityModalComponent,
        AddOrCreateEntityModalData,
        CreateOrAddEntityEvent>(AddOrCreateEntityModalComponent, {

          // minWidth: '800px',
          height: 'calc(100% - 30px)',
          width: '980px',
          maxWidth: '100%',
          data: {

            alreadyInProjectBtnText: 'Select',
            notInProjectClickBehavior: 'selectOnly',
            notInProjectBtnText: 'Select',
            classAndTypePk: {
              pkClass: this.data.listDefinition.targetClass,
              pkType: undefined
            }

            ,
            pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
          }
        }

        )
    }

  }

  openDialogForIdentityDefining() {

  }
}
