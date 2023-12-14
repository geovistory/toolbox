import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { Subject } from 'rxjs';
import { EntityLabelConfigDialogComponent, EntityLabelConfigDialogData } from '../entity-label-config-dialog/entity-label-config-dialog.component';

@Component({
    selector: 'gv-entity-label-config-open-btn',
    templateUrl: './entity-label-config-open-btn.component.html',
    styleUrls: ['./entity-label-config-open-btn.component.scss'],
    standalone: true
})
export class EntityLabelConfigOpenBtnComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() fkClass: number
  constructor(private dialog: MatDialog,
    private state: StateFacade,
  ) { }

  ngOnInit() {
    if (!this.fkClass) console.error('You must provide a fkClass.')
  }
  open() {

    const dialogData: EntityLabelConfigDialogData = {
      fkProject: this.state.pkProject,
      fkClass: this.fkClass
    }
    const d = this.dialog.open<EntityLabelConfigDialogComponent, EntityLabelConfigDialogData>(
      EntityLabelConfigDialogComponent,
      {
        data: dialogData,
        height: 'calc(100% - 30px)',
        width: '850px',
        maxWidth: '100%',
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
