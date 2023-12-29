import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WarEntityPreviewControllerService } from "@kleiolab/lib-sdk-lb4";

import { NgFor, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";
import { EntityPreviewComponent } from '../../../shared/components/entity-preview/entity-preview.component';

@Component({
  selector: 'gv-entity-previews-paginated',
  templateUrl: './entity-previews-paginated.component.html',
  styleUrls: ['./entity-previews-paginated.component.scss'],
  standalone: true,
  imports: [NgIf, MatPaginatorModule, MatListModule, NgFor, EntityPreviewComponent, MatDividerModule]
})
export class EntityPreviewsPaginatedComponent implements OnInit {

  @Input() pkEntities: number[]
  @Input() pkProject: number

  @Input() limit = 10;
  @Input() offset = 0;

  @Input() dragEnabled = false;
  @Input() openTabOnClick = true;

  loading = false;

  items: WarEntityPreview[]
  constructor(private api: WarEntityPreviewControllerService) { }

  ngOnInit() {
    if (!this.pkEntities) throw new Error('You must provide pkEntities input')
    if (!this.pkProject) throw new Error('You must provide pkProject')

    this.limit = this.limit === undefined ? 10 : this.limit
    this.offset = this.offset === undefined ? 0 : this.offset
    this.dragEnabled = this.dragEnabled === undefined ? false : this.dragEnabled
    this.openTabOnClick = this.openTabOnClick === undefined ? true : this.openTabOnClick

    this.load()
  }

  load() {
    if (this.pkEntities && this.pkEntities.length) {
      this.api.warEntityPreviewControllerPaginatedListByPks({
        pkProject: this.pkProject,
        pkEntities: this.pkEntities,
        limit: this.limit,
        offset: this.offset
      })
        .subscribe(results => {
          this.items = results;
        })
    }
  }

  onPageChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize
    this.load()
  }

}
