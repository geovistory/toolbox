import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateFacade } from '@kleiolab/lib-redux';
import { first } from 'rxjs/operators';
import { EntityPreviewsPaginatedDialogComponent, EntityPreviewsPaginatedDialogData } from '../components/misc/entity-previews-paginated-dialog/entity-previews-paginated-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class EntityPreviewsPaginatedDialogService {

  constructor(
    private dialog: MatDialog,
    private state: StateFacade
  ) { }

  open(
    ofProjectPreferred: boolean,
    pkEntities: number[],
    title: string,
    paragraphs?: string[]
  ) {
    if (ofProjectPreferred) {
      this.state.pkProject$.pipe(first()).subscribe(pkProject => {
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
