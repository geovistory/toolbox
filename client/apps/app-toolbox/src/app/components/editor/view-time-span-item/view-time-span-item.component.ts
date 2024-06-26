import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewTimeSpanItemEditBtnComponent } from '../view-time-span-item-edit-btn/view-time-span-item-edit-btn.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ViewTimeSpanItemPreviewComponent } from '../view-time-span-item-preview/view-time-span-item-preview.component';

@Component({
    selector: 'gv-view-time-span-item',
    templateUrl: './view-time-span-item.component.html',
    styleUrls: ['./view-time-span-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ViewTimeSpanItemPreviewComponent, NgIf, ViewTimeSpanItemEditBtnComponent, MatButtonModule, MatIconModule, AsyncPipe]
})
export class ViewTimeSpanItemComponent implements OnInit {
  @Input() section: ViewSectionBodyComponent

  constructor() { }

  ngOnInit(): void {
  }
  toggleBody() {
    this.section.showBody$.next(!this.section.showBody$.value)
  }
}
