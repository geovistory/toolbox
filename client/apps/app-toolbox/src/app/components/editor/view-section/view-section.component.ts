import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { SectionName } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditModeService } from '../../../services/edit-mode.service';
import { ViewFieldItemCountSumService } from '../../../services/view-field-item-count-sum.service';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';
import { ViewSectionHeaderComponent } from '../view-section-header/view-section-header.component';

@Component({
  selector: 'gv-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ViewFieldItemCountSumService
  ],
  standalone: true,
  imports: [NgIf, ViewSectionHeaderComponent, MatDividerModule, forwardRef(() => ViewSectionBodyComponent), AsyncPipe]
})
export class ViewSectionComponent {

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  readmode$: Observable<boolean>;
  @Input() section: SectionName;
  @Input() scope: GvFieldPageScope;

  // @Input() hideEmptySectionInReadmode = true;
  @Input() showEmptyFieldsOnInit: boolean;

  constructor(public itemCountService: ViewFieldItemCountSumService,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

}
