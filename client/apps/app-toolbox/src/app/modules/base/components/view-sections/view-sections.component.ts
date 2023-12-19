import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfigurationPipesService, SectionName } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { EditModeService } from '../../services/edit-mode.service';
import { ViewSectionComponent } from '../view-section/view-section.component';
import { ViewTimeSpanSectionComponent } from '../view-time-span-section/view-time-span-section.component';

@Component({
  selector: 'gv-view-sections',
  templateUrl: './view-sections.component.html',
  styleUrls: ['./view-sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ViewTimeSpanSectionComponent, ViewSectionComponent, MatDialogModule]
})
export class ViewSectionsComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() scope: GvFieldPageScope;
  readmode$: Observable<boolean>;

  basic = SectionName.basic;
  metadata = SectionName.metadata;
  specific = SectionName.specific;
  timeSpan = SectionName.timeSpan;

  constructor(
    public c: ConfigurationPipesService,
    public p: ActiveProjectService,
    public editMode: EditModeService
  ) {
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
  }

  ngOnInit() {
    const errors: string[] = []

    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readmode$) errors.push('readmode$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

  }
}
