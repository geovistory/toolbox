import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openClose } from '../../../information/shared/animations';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';

import { AsyncPipe, NgIf } from '@angular/common';
import { OpenCloseContainerDirective } from '../../../../directives/open-close/open-close-container.directive';

@Component({
  selector: 'gv-view-time-span-section-body',
  templateUrl: './view-time-span-section-body.component.html',
  styleUrls: ['./view-time-span-section-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openClose],
  standalone: true,
  imports: [
    OpenCloseContainerDirective,
    NgIf,
    AsyncPipe,
  ],
})
export class ViewTimeSpanSectionBodyComponent {
  showBody$ = new BehaviorSubject(true);

  @Input() section: ViewSectionBodyComponent
}
