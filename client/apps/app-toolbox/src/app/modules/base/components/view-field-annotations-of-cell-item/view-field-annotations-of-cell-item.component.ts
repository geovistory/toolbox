import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { DateTimeModule } from '@kleiolab/lib-utils';
import { ActiveProjectService } from '../../../../core/active-project/active-project.service';
import { TableComponent } from '../../../../shared/components/digital-table/components/table/table.component';
import { EntityPreviewModule } from '../../../../shared/components/entity-preview/entity-preview.module';
import type { ViewFieldAnnotationOfCellItemData } from '../view-field-annotations-of-cell/view-field-annotations-of-cell.component';
import { ViewFieldAnnotationsOfCellService } from '../view-field-annotations-of-cell/view-field-annotations-of-cell.service';

@Component({
  selector: 'gv-view-field-annotations-of-cell-item',
  templateUrl: './view-field-annotations-of-cell-item.component.html',
  styleUrls: ['./view-field-annotations-of-cell-item.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, EntityPreviewModule, MatTooltipModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule, AsyncPipe, DateTimeModule]
})
export class ViewFieldAnnotationsOfCellItemComponent {
  @Input() item: ViewFieldAnnotationOfCellItemData

  constructor(
    public tableComponent: TableComponent,
    private p: ActiveProjectService,
    private cellAnnotations: ViewFieldAnnotationsOfCellService
  ) { }



  async remove() {
    this.cellAnnotations.component.loadingTrigger$.next()
    return new Promise<void>((res, rej) => {
      this.p.removeEntityFromProject(this.item.hasAnnotation.target.entity.resource.pk_entity, () => {
        res()
      })
    })
  }
  async edit(item: StatementWithTarget) {
    const result = await this.cellAnnotations.component.chooseEntity(item)

    if (result) {
      this.cellAnnotations.component.loadingTrigger$.next()
      await this.remove()
      await this.cellAnnotations.component.upsertAnnotation(result)
    }
  }

}
