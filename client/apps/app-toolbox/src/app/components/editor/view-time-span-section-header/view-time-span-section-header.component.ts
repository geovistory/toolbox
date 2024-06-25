import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';
import { ViewTimeSpanHelpDialogComponent } from '../view-time-span-help-dialog/view-time-span-help-dialog.component';
import { ViewTimeSpanSectionBodyComponent } from '../view-time-span-section-body/view-time-span-section-body.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, AsyncPipe } from '@angular/common';


@Component({
    selector: 'gv-view-time-span-section-header',
    templateUrl: './view-time-span-section-header.component.html',
    styleUrls: ['./view-time-span-section-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, MatSlideToggleModule, MatTooltipModule, AsyncPipe]
})
export class ViewTimeSpanSectionHeaderComponent implements OnInit {

  @Input() section: ViewSectionBodyComponent
  @Input() body: ViewTimeSpanSectionBodyComponent


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.section.showBody$.next(false)
  }

  toggleEmptyFields(event: MatSlideToggleChange) {
    this.section.showEmptyFields$.next(event.checked)
  }
  toggleBody() {
    this.body.showBody$.next(!this.body.showBody$.value)
  }
  help() {
    this.dialog.open(ViewTimeSpanHelpDialogComponent, { maxWidth: '600px' })
  }
}

