import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';
import { first } from 'rxjs/operators';
import { EntityPreviewsPaginatedDialogData, EntityPreviewsPaginatedDialogComponent } from '../entity-previews-paginated-dialog/entity-previews-paginated-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class EntityPreviewsPaginatedDialogService {

  constructor(
    private dialog: MatDialog,
    private p: ActiveProjectService
  ) { }

  open(
    ofProjectPreferred: boolean,
    pkEntities: number[],
    title: string,
    paragraphs?: string[]
  ) {
    if (ofProjectPreferred) {
      this.p.pkProject$.pipe(first()).subscribe(pkProject => {
        this._open(pkProject, pkEntities, title, paragraphs)
      })
    }
    else {
      this._open(0, pkEntities, title, paragraphs)
    }
  }

  private _open(
    pkProject: number,
    pkEntities: number[],
    title: string,
    paragraphs?: string[]
  ) {
    const data: EntityPreviewsPaginatedDialogData = {
      title,
      pkEntities,
      pkProject,
      paragraphs
    }

    this.dialog.open(EntityPreviewsPaginatedDialogComponent, { data })
  }

}
