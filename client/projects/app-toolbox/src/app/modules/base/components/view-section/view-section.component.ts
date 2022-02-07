import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';
import { ViewFieldItemCountSumService } from '../../services/view-field-item-count-sum.service';

@Component({
  selector: 'gv-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ViewFieldItemCountSumService
  ]
})
export class ViewSectionComponent implements OnInit {

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() readmode$: Observable<boolean>;
  @Input() section: SectionName;
  @Input() scope: GvFieldPageScope;

  @Input() hideEmptySectionInReadmode = true;
  @Input() showEmptyFieldsOnInit: boolean;

  constructor(public itemCountService: ViewFieldItemCountSumService,) { }

  ngOnInit(): void {
  }

}
