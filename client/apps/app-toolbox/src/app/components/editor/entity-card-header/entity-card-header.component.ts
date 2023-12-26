import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActiveProjectPipesService, ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { DndModule } from '@suez/ngx-dnd';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { TruncatePipe } from '../../../pipes/truncate/truncate.pipe';
import { ActiveProjectService } from '../../../services/active-project.service';
import { EditModeService } from '../../../services/edit-mode.service';
import { ClassInfoComponent } from '../../../shared/components/onto-info/class-info/class-info.component';
import { READ_ONLY } from '../../../tokens/READ_ONLY';
import { ClassConfigDialogComponent, ClassConfigDialogData } from '../../configuration/class-config-dialog/class-config-dialog.component';
import { EntityLabelConfigOpenBtnComponent } from '../../configuration/entity-label-config-open-btn/entity-label-config-open-btn.component';

@Component({
  selector: 'gv-entity-card-header',
  templateUrl: './entity-card-header.component.html',
  styleUrls: ['./entity-card-header.component.scss'],
  standalone: true,
  imports: [NgIf, ClassInfoComponent, DndModule, MatTooltipModule, MatButtonToggleModule, MatIconModule, MatButtonModule, MatMenuModule, MatSlideToggleModule, MatDividerModule, EntityLabelConfigOpenBtnComponent, AsyncPipe]
})
export class EntityCardHeaderComponent implements OnInit {

  @Input() showOntoInfo$: BehaviorSubject<boolean>;
  @Input() fkClass$: Observable<number>;
  @Input() pkEntity: number;
  @Input() pkProject: number;


  @Output() removed = new EventEmitter<void>();

  preview$: Observable<WarEntityPreview>;
  classLabel$: Observable<string>;

  constructor(
    public editMode: EditModeService,
    private p: ActiveProjectService,
    private state: StateFacade,
    private ap: ActiveProjectPipesService,
    private c: ConfigurationPipesService,
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
    // if (this.fkClass$)
    // else this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
  }

  openClassConfig() {
    combineLatest([this.state.pkProject$, this.fkClass$]).pipe(
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
}
