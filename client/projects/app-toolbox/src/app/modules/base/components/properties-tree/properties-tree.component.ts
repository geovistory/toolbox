import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { ConfigurationPipesService, SectionName } from '@kleiolab/lib-queries';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
export class PropertiesTreeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  // @Input() appContext: number;
  @Input() readonly$ = new BehaviorSubject(false);

  basic = SectionName.basic;
  metadata = SectionName.metadata;
  specific = SectionName.specific;

  constructor(
    public t: PropertiesTreeService,
    public c: ConfigurationPipesService,
    public p: ActiveProjectService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit() { }
}
