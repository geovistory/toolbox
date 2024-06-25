import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigurationPipesService, DisplayType, SectionName } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { EditModeService } from '../../../services/edit-mode.service';
import { ViewSectionBodyComponent } from '../view-section-body/view-section-body.component';
import { ViewTimeSpanItemComponent } from '../view-time-span-item/view-time-span-item.component';
import { ViewTimeSpanSectionBodyComponent } from '../view-time-span-section-body/view-time-span-section-body.component';
import { ViewTimeSpanSectionHeaderComponent } from '../view-time-span-section-header/view-time-span-section-header.component';

@Component({
  selector: 'gv-view-time-span-section',
  templateUrl: './view-time-span-section.component.html',
  styleUrls: ['./view-time-span-section.component.scss'],
  standalone: true,
  imports: [NgIf, ViewTimeSpanSectionHeaderComponent, MatDividerModule, forwardRef(() => ViewTimeSpanSectionBodyComponent), ViewTimeSpanItemComponent, forwardRef(() => ViewSectionBodyComponent), AsyncPipe]
})
export class ViewTimeSpanSectionComponent implements OnInit {
  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  readmode$: Observable<boolean>;
  @Input() scope: GvFieldPageScope;
  sectionName = SectionName.timeSpan;
  showSection$: Observable<boolean>
  constructor(
    public c: ConfigurationPipesService,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit(): void {
    this.showSection$ = this.pkClass$.pipe(
      first(x => !!x),
      switchMap(pkClass => this.c.pipeSection(pkClass, DisplayType.view, this.sectionName)),
      map(fields => fields?.length > 0)
    )
  }

}
