import { Component, Input, OnInit } from '@angular/core';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { TableComponent } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { ViewFieldAnnotationOfCellItemData, ViewFieldAnnotationsOfCellComponent } from '../view-field-annotations-of-cell/view-field-annotations-of-cell.component';

@Component({
  selector: 'gv-view-field-annotations-of-cell-item',
  templateUrl: './view-field-annotations-of-cell-item.component.html',
  styleUrls: ['./view-field-annotations-of-cell-item.component.scss']
})
export class ViewFieldAnnotationsOfCellItemComponent implements OnInit {
  @Input() item: ViewFieldAnnotationOfCellItemData

  constructor(
    public tableComponent: TableComponent,
    private p: ActiveProjectService,
    private cellAnnotationsComponent: ViewFieldAnnotationsOfCellComponent
  ) { }

  ngOnInit(): void {
  }

  async remove() {
    this.cellAnnotationsComponent.loadingTrigger$.next()
    return new Promise<void>((res, rej) => {
      this.p.removeEntityFromProject(this.item.hasAnnotation.target.entity.resource.pk_entity, () => {
        res()
      })
    })
  }
  async edit() {
    const result = await this.cellAnnotationsComponent.chooseEntity()
    this.cellAnnotationsComponent.loadingTrigger$.next()

    if (result) {
      this.remove()
      await this.cellAnnotationsComponent.upsertAnnotation(result)
    }
  }

}
