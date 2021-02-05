import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntityLabelConfigDialogData, EntityLabelConfigDialogComponent } from '../entity-label-config-dialog/entity-label-config-dialog.component';
import { ActiveProjectService } from "app/core/active-project";
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-entity-label-config-open-btn',
  templateUrl: './entity-label-config-open-btn.component.html',
  styleUrls: ['./entity-label-config-open-btn.component.scss']
})
export class EntityLabelConfigOpenBtnComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() fkClass: number
  constructor(private dialog: MatDialog,
    private p: ActiveProjectService) { }

  ngOnInit() {
    if (!this.fkClass) console.error('You must provide a fkClass.')
  }
  open() {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      const dialogData: EntityLabelConfigDialogData = {
        fkProject: pkProject,
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
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
