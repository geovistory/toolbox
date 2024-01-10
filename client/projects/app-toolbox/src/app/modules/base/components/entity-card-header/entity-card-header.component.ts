import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { CommunityVisibilityOptions, InfResource, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { VisibilityDialogComponent, VisibilityDialogData } from 'projects/app-toolbox/src/app/shared/components/visibility-dialog/visibility-dialog.component';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { ClassConfigDialogComponent, ClassConfigDialogData } from '../../../class-config/components/class-config-dialog/class-config-dialog.component';
import { EditModeService } from '../../services/edit-mode.service';
import { READ_ONLY } from '../../tokens/READ_ONLY';

@Component({
  selector: 'gv-entity-card-header',
  templateUrl: './entity-card-header.component.html',
  styleUrls: ['./entity-card-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityCardHeaderComponent implements OnInit {

  @Input() showOntoInfo$: BehaviorSubject<boolean>;
  @Input() fkClass$: Observable<number>;
  @Input() pkEntity: number;
  @Input() pkProject: number;


  @Output() removed = new EventEmitter<void>();

  preview$: Observable<WarEntityPreview>;
  classLabel$: Observable<string>;
  communityVisibility$: Observable<CommunityVisibilityOptions>;
  showVisibility$ = new BehaviorSubject(false)

  constructor(
    public editMode: EditModeService,
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
    private s: SchemaSelectorsService,
    private dialog: MatDialog,
    private truncatePipe: TruncatePipe,
    @Optional() @Inject(READ_ONLY) public readonly: boolean
  ) {

  }

  ngOnInit(): void {
    const errors: string[] = []
    if (!this.fkClass$) errors.push('@Input() fkClass$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.preview$ = this.ap.streamEntityPreview(this.pkEntity, true, this.pkProject)

    this.classLabel$ = this.fkClass$.pipe(switchMap(fkClass => this.c.pipeClassLabel(fkClass)))

    this.communityVisibility$ = this.s.inf$.resource$.by_pk_entity_key$(this.pkEntity)
      .pipe(map((r: InfResource) => r?.community_visibility))
  }

  openClassConfig() {
    combineLatest([this.p.pkProject$, this.fkClass$]).pipe(
      first(([pro, kla]) => !!pro && !!kla),
    ).subscribe(
      ([pro, kla]) => {
        const data: ClassConfigDialogData = {
          fkAppContext: 45,
          fkClass: kla,
          fkProject: pro
        }
        this.dialog.open(ClassConfigDialogComponent, {
          data,
          height: 'calc(100% - 30px)',
          width: '850px',
          maxWidth: '100%',
          // maxHeight: '100%'
        })
      })
  }
  toggleOntoInfo() {
    this.showOntoInfo$.next(!this.showOntoInfo$.value)
  }
  async openRemoveDialog() {
    const preview = await this.preview$.pipe(first()).toPromise()
    const classLabel = await this.classLabel$.pipe(first()).toPromise()
    const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
    const tabTitle = [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ')
    const confirmed = await this.p.openRemoveEntityDialog(tabTitle, this.pkEntity)
    if (confirmed) this.removed.emit()
  }

  async openVisibilityDialog() {
    this.dialog.open<VisibilityDialogComponent, VisibilityDialogData>(VisibilityDialogComponent)
  }
}
