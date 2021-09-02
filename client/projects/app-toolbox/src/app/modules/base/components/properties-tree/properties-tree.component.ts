import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ConfigurationPipesService, SectionName } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable, Subject } from 'rxjs';
import { PropertiesTreeService } from './properties-tree.service';

@Component({
  selector: 'gv-properties-tree',
  templateUrl: './properties-tree.component.html',
  styleUrls: ['./properties-tree.component.scss'],
  providers: [
    PropertiesTreeService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesTreeComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() scope: GvFieldPageScope;
  @Input() readonly$: Observable<boolean>;

  basic = SectionName.basic;
  metadata = SectionName.metadata;
  specific = SectionName.specific;

  constructor(
    public t: PropertiesTreeService,
    public c: ConfigurationPipesService,
    public p: ActiveProjectService
  ) { }

  ngOnInit() {
    const errors: string[] = []

    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

  }
}
