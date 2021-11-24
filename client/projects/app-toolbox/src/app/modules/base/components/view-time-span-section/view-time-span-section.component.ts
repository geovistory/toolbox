import { Component, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService, DisplayType, SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/public-api';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gv-view-time-span-section',
  templateUrl: './view-time-span-section.component.html',
  styleUrls: ['./view-time-span-section.component.scss']
})
export class ViewTimeSpanSectionComponent implements OnInit {
  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() readonly$: Observable<boolean>;
  @Input() scope: GvFieldPageScope;
  sectionName = SectionName.timeSpan;
  showSection$: Observable<boolean>
  constructor(
    public c: ConfigurationPipesService,
  ) { }

  ngOnInit(): void {
    this.showSection$ = this.pkClass$.pipe(
      first(x => !!x),
      switchMap(pkClass => this.c.pipeSection(pkClass, DisplayType.view, this.sectionName)),
      map(fields => fields?.length > 0)
    )
  }

}
