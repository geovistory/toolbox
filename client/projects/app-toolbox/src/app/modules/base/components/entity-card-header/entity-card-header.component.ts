import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { IconType } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ClassConfigDialogComponent, ClassConfigDialogData } from '../../../class-config/components/class-config-dialog/class-config-dialog.component';

@Component({
  selector: 'gv-entity-card-header',
  templateUrl: './entity-card-header.component.html',
  styleUrls: ['./entity-card-header.component.scss']
})
export class EntityCardHeaderComponent implements OnInit {

  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: BehaviorSubject<boolean>;
  @Input() fkClass$: Observable<number>;
  @Input() pkEntity: number;
  @Input() pkProject: number;

  @Output() removed = new EventEmitter<void>();

  iconType$: Observable<IconType>;
  preview$: Observable<WarEntityPreview>;
  classLabel$: Observable<string>;

  constructor(
    private p: ActiveProjectService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService,
    private ap: ActiveProjectPipesService,

    private dialog: MatDialog,
    private truncatePipe: TruncatePipe,
  ) { }

  ngOnInit(): void {
    this.preview$ = this.ap.streamEntityPreview(this.pkEntity, true, this.pkProject)
    this.classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
    this.iconType$ = this.b.pipeIconType(this.pkEntity)

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
  openRemoveDialog() {
    combineLatest([this.preview$, this.classLabel$]).pipe(
      map(([preview, classLabel]) => {
        const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
        return [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ')
      })
    )
      .pipe(first())
      .subscribe(tabTitle => {
        this.p.openRemoveEntityDialog(tabTitle, this.pkEntity)
          .pipe(first()).subscribe(() => {
            this.removed.emit()
          })
      })
  }
}
