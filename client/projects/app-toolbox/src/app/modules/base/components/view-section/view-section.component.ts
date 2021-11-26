import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewSectionComponent implements OnInit {

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() readonly$: Observable<boolean>;
  @Input() section: SectionName;
  @Input() scope: GvFieldPageScope;

  constructor() { }

  ngOnInit(): void {
  }

}
