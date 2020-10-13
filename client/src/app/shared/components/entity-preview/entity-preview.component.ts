import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActiveProjectService, EntityPreview, SysConfig } from 'app/core';
import { CtrlEntityDialogComponent, CtrlEntityDialogData } from 'app/modules/base/components/ctrl-entity/ctrl-entity-dialog/ctrl-entity-dialog.component';
import { CtrlEntityComponent, CtrlEntityModel } from 'app/modules/base/components/ctrl-entity/ctrl-entity.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-entity-preview',
  templateUrl: './entity-preview.component.html',
  styleUrls: ['./entity-preview.component.scss']
})
export class EntityPreviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() preview: EntityPreview
  @Input() pkEntity: number
  @Input() dragEnabled = true;
  @Input() openTabOnClick = false;
  @Input() showId = false;
  @Input() editAllowed = false;

  constructor(
    private p: ActiveProjectService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    // lazy load the preview, if only pkEntity given
    if (this.pkEntity && !this.preview) {
      this.p.streamEntityPreview(this.pkEntity)
        .pipe(takeUntil(this.destroy$))
        .subscribe(preview => this.preview = preview)
    }

  }

  openInNewTab() {
    this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class, this.preview.entity_type)
  }
  addAndOpenInNewTab() {
    this.p.addEntityToProject(this.preview.pk_entity, () => {
      this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class, this.preview.entity_type)
    })
  }

  editEntity() {
    this.dialog.open<CtrlEntityDialogComponent,
      CtrlEntityDialogData,
      CtrlEntityModel>(CtrlEntityDialogComponent, {

        // minWidth: '800px',
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
        data: {
          initVal$: new Subject(),
          showAddList: true,
          hiddenProperty: { pkProperty: DfhConfig.PROPERTY_PK_GEOVP11_REFERS_TO },
          alreadyInProjectBtnText: 'Select',
          notInProjectClickBehavior: 'selectOnly',
          notInProjectBtnText: 'Select',
          disableIfHasStatement: undefined,
          classAndTypePk: { pkClass: this.preview.fk_class, pkType: undefined },
          pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
        }
      }
      )
    // .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
    //   if (!!result) this.value = result
    //   this.onBlur()
    // });


  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
