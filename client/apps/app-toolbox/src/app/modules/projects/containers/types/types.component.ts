import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DfhConfig, SysConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, DisplayType, Field, InformationBasicPipesService, InformationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty, sortAbc } from '@kleiolab/lib-utils';
import { BehaviorSubject, Observable, Subject, combineLatest, of } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { ViewSectionsDialogComponent, ViewSectionsDialogData } from '../../../../modules/base/components/view-sections-dialog/view-sections-dialog.component';
import { PaginationService } from '../../../../modules/base/services/pagination.service';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { DetailContentComponent } from '../../../../shared/components/detail-content/detail-content.component';
import { DetailTopBarComponent } from '../../../../shared/components/detail-top-bar/detail-top-bar.component';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { TabLayoutService } from '../../../../shared/components/tab-layout/tab-layout.service';
import { fieldToFieldPage, fieldToGvFieldTargets } from '../../../base/base.helpers';
import { openAddEntityDialog } from '../../../base/lib/openAddEntityDialog';
import { TabLayoutComponentInterface } from '../../directives/on-activate-tab.directive';

interface TypeItem {
  pkEntity: number
  label: string,
  labelLanguage: string,
  definition?: string
}

// @WithSubStore({
//   basePathMethodName: 'getBasePath',
//   localReducer: typesReducer
// })
@Component({
  selector: 'gv-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css'],
  standalone: true,
  imports: [
    DetailTopBarComponent,
    DetailContentComponent,
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatListModule,
    MatDividerModule,
    NgFor,
    MatLineModule,
    AsyncPipe,
  ],
})
export class TypesComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  // localStore: ObservableStore<Types>;

  // path to the substore
  @Input() basePath;

  // has type property
  @Input() pkClass: number;

  typeClassLabel$: Observable<string>;

  // types
  items$: Observable<TypeItem[]>;
  typePks$: Observable<number[]>;

  t: TabLayout;

  constructor(
    public p: ActiveProjectService,
    public ap: ActiveProjectPipesService,
    public dialog: MatDialog,
    public ref: ChangeDetectorRef,
    public c: ConfigurationPipesService,
    public b: InformationBasicPipesService,
    public i: InformationPipesService,
    private pag: PaginationService,
    public tabLayout: TabLayoutService,
    private state: StateFacade
  ) {
  }

  getBasePath = () => this.basePath;
  getTypePk(_, item: TypeItem) {
    return item.pkEntity;
  }

  ngOnInit() {

    this.t = this.tabLayout.t;

    this.typeClassLabel$ = this.c.pipeClassLabel(this.pkClass)

    this.typeClassLabel$.pipe(takeUntil(this.destroy$)).subscribe((label) => {
      this.t.setTabTitle(label + ' – Controlled Vocabulary')
    })

    this.typePks$ = this.b.pipePersistentItemPksByClass(this.pkClass)

    const appeAndDefFields$ = this.c.pipeAllSections(this.pkClass, DisplayType.view).pipe(
      map(fieldDefinitions => {
        let appeField: Field, definitionField: Field;
        fieldDefinitions.forEach(f => {
          // take only appellation for language, or ...
          if (f.property.fkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF) {
            appeField = f;
          }
          // ... entit definition
          else if (f.property.fkProperty === DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION) {
            definitionField = f;
          }
        })
        return { appeField, definitionField }
      })
    )



    // const appeAndLangFields$ = appeAndDefFields$.pipe(
    //   switchMap(appeAndDefFields =>
    //     this.c.pipeBasicAndSpecificFields(appeAndDefFields.appeField.listDefinitions[0].targetClass).pipe(
    //       map(fieldDefs => fieldDefs.filter(f => f.listDefinitions[0].listType.language || f.listDefinitions[0].listType.appellation))
    //     )
    //   )
    // )


    this.items$ = combineLatest(this.state.pkProject$, appeAndDefFields$, this.typePks$).pipe(
      switchMap(([pkProject, appeAndDefFields, typePks]) => combineLatestOrEmpty(
        typePks.map(pkEntity => {
          const scope: GvFieldPageScope = { inProject: pkProject };
          const source: GvFieldSourceEntity = { fkInfo: pkEntity }

          this.pag.addPageLoaderFromField(
            pkProject,
            appeAndDefFields.definitionField,
            source,
            1,
            0,
            this.destroy$,
            scope
          )

          // pipe the properties of the naming
          const entityLabel$ = this.ap.streamEntityPreview(pkEntity).pipe(
            map((e) => e.entity_label)
          )

          const definition$ = this.i.pipeFieldPage(
            fieldToFieldPage(appeAndDefFields.definitionField, source, scope, 1, 0),
            fieldToGvFieldTargets(appeAndDefFields.definitionField),
            false
          )

          return combineLatest(entityLabel$, definition$).pipe(
            map(([entityLabel, definition]) => {

              const item: TypeItem = {
                label: entityLabel,
                labelLanguage: '',
                pkEntity,
                definition: definition.statements.map(s => s.targetLabel).join('')
              }

              return item;
            })
          )
        }
        )
      )),
      sortAbc(n => n.label),
    )



  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * called when user clicks on edit
   */
  onEdit(type: TypeItem) {
    this.edit(type.pkEntity)
  }

  /**
   * called when user clicks on remove
   */
  onRemove(type: TypeItem) {
    this.p.openRemoveEntityDialog(type.label, type.pkEntity)
  }

  /**
   * called when user clicks on add
  */
  onAddOrCreate() {

    openAddEntityDialog(
      this.dialog,
      { pkClass: this.pkClass }
    ).subscribe(result => {
      if (result.action === 'added' || result.action === 'created') {
        this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
          // this.s.store(this.s.api.typeOfProject(pkProject, result.pkEntity), pkProject)
          this.state.data.loadInfResource(result.pkEntity, pkProject)
        })
      } else if (result.action === 'alreadyInProjectClicked') {
        this.edit(result.pkEntity)
      }
    })
  }



  /**
   * Opens dialog for editing type
   * @param pkEntity
   */
  edit(pkEntity: number) {
    this.state.pkProject$.pipe(first()).subscribe(pkProject => {

      const data: ViewSectionsDialogData = {
        scope: { inProject: pkProject },
        appContext: SysConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE,
        pkClass$: of(this.pkClass),
        source: { fkInfo: pkEntity },
        readonly: false,
        showOntoInfo$: new BehaviorSubject(false),
        showOpenInNewTabButton: true
      }
      const dialogRef = this.dialog.open(ViewSectionsDialogComponent, {
        height: '90%',
        width: '90%',
        data
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    })

  }


}
