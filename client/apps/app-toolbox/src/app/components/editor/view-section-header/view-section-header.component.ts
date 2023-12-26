import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';

@Component({
    selector: 'gv-view-section-header',
    templateUrl: './view-section-header.component.html',
    styleUrls: ['./view-section-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class ViewSectionHeaderComponent implements OnInit {

  @Input() section: ViewSectionBodyComponent

  ngOnInit(): void {

  }

  toggleEmptyFields(event: MatSlideToggleChange) {
    this.section.showEmptyFields$.next(event.checked)
  }
  toggleBody() {
    this.section.showBody$.next(!this.section.showBody$.value)
  }

}
