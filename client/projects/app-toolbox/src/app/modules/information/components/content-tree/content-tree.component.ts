import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { ByPk } from '@kleiolab/lib-redux';
import { DatDigital, GvFieldPageReq, ImportTableResponse, InfStatement } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { BaseModalsService } from 'projects/app-toolbox/src/app/modules/base/services/base-modals.service';
import { ImporterComponent, ImporterDialogData } from 'projects/app-toolbox/src/app/modules/data/components/importer/importer.component';
import { ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { PaginationService } from '../../../base/services/pagination.service';
import { DfhConfig } from '../../shared/dfh-config';
import { ContentTreeClickEvent } from '../content-tree-node-options/content-tree-node-options.component';
import { NgContentTreeService } from './content-tree.service';

// interface PrimeNgNodeData {
//   // the statement
//   statement: InfStatement;

//   // the name of the node, being tha favorite appellation of Expression Portion or some symbol for Digitals
//   // name: string;

//   // Wheter or not this node is a Digital and thus a leaf or a Expression Portion and thus not a leaf
//   isDigital: boolean;

//   pkEntity: number;

//   digitalType?: number;

//   pkDigital?: number
//   datDigital?: DatDigital;
// }

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
export interface StatementNode {

  // the statement
  statement: InfStatement;

  // the name of the node, being tha favorite appellation of Expression Portion or some symbol for Digitals
  // name: string;

  // Wheter or not this node is a Digital and thus a leaf or a Expression Portion and thus not a leaf
  isDigital: boolean;

  pkEntity: number;

  digitalType?: number;

  datDigital?: DatDigital;
  // The label of the type, being the Expression Portion Type or the Digital Type (text, table, image)
  // typeLabel: string;

  // children of the node
  children?: StatementNode[];
}

export interface ContentTreeNode {
  statement: InfStatement;
  expandable: boolean;
  // name: string;
  isDigital: boolean;
  pkEntity: number;
  datDigital?: DatDigital
  // typeLabel: string;
  level: number;
}





export type DrageNodeOverArea = 'above' | 'center';

@Component({
  selector: 'gv-content-tree',
  templateUrl: './content-tree.component.html',
  styleUrls: ['./content-tree.component.scss'],
  providers: [NgContentTreeService]
})
export class ContentTreeComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  // pkEntity and fkClass of the source, being an instance of
  // Manifestation Product Type, Manifestation Singleton, Item or Web request
  @Input() pkEntity$: Observable<number>;
  @Input() fkClass$: Observable<number>;

  fkPropertyFromSource: number;
  sourceIsDomain: boolean;
  pkExpression$: Observable<number>;
  pkRoot$: Observable<number>
  pkRoot: number;
  rootIsF2Expression: boolean;
  contentTree$: Observable<StatementNode[]>;

  temp$: Observable<any>;

  /****
 * TREE
 * inspiration:
 * https://stackblitz.com/edit/angular-draggable-mat-tree
 */
  expandedNodeIds: ByPk<number>;
  /* Drag and drop */
  dragNode: ContentTreeNode;
  dragNodeExpandOverWaitTimeMs = 300;
  dragNodeExpandOverNode: any;
  dragNodeExpandOverTime: number;
  dragNodeExpandOverArea: DrageNodeOverArea;
  @ViewChild('emptyItem', { static: true }) emptyItem: ElementRef;



  treeControl = new FlatTreeControl<ContentTreeNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    (node: StatementNode, level: number): ContentTreeNode => {
      const { children, ...rest } = node;
      return {
        ...rest,
        expandable: !!node.children && node.children.length > 0,
        level: level,
      };
    }, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  loading = false;

  isAdmin = false;

  digitals: { [key: number]: BehaviorSubject<{ id: number, advancement: number, infos: string }> } = {};

  // primeNgTree$: Observable<TreeNode[]>

  constructor(
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private m: BaseModalsService,
    private service: NgContentTreeService,
    private p: SchemaSelectorsService,
    private pag: PaginationService,
    private c: ConfigurationPipesService
  ) { }

  trackByFn(index: number, item: ContentTreeNode) {
    return item.pkEntity + '_' + item.statement.pk_entity
  }
  ngOnInit() {
    this.loading = true;

    // wait for pkEntity and fkClass of the source
    combineLatest([this.pkEntity$, this.fkClass$, this.service.pkProject$]).pipe(
      first(d => !d.includes(undefined)),
      takeUntil(this.destroy$)
    ).subscribe(([pkEntity, fkClass, pkProject]) => {
      this.loadRootEntity(pkEntity, fkClass, pkProject)
    })

  }

  /**
   * Loads the entity that is the root of the content tree
   */
  loadRootEntity(pkEntity: number, fkClass: number, pkProject: number) {

    // if we start from a source like class
    // load the statement that associates source --> expression
    if (fkClass !== DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
      this.rootIsF2Expression = true;
      this.fkPropertyFromSource = this.getFkPropertyFromSource(fkClass);
      this.sourceIsDomain = this.isSourceDomain(fkClass);
      this.loadStatementToExpression(
        pkProject,
        pkEntity,
        this.fkPropertyFromSource,
        this.sourceIsDomain,
        this.destroy$
      )
      this.pkExpression$ = this.pipeExpression(pkEntity, this.fkPropertyFromSource, this.sourceIsDomain)

      this.pkRoot$ = this.pkExpression$;
    }
    else {
      this.rootIsF2Expression = false;
      this.pkRoot$ = of(pkEntity)
    }



    this.pkRoot$.pipe(first()).subscribe(pkRoot => {

      this.pkRoot = pkRoot;
      // load data recursive is part of / is reproduction of
      this.service.loadContentTree(pkProject, pkRoot)
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe(() => {
          this.contentTree$ = this.pipeChildren(pkRoot)
          // this.primeNgTree$ = this.pipePrimeNgTree(pkRoot)

          this.contentTree$.pipe(distinctUntilChanged<StatementNode[]>(equals), takeUntil(this.destroy$))
            .subscribe((x) => {
              this.loading = false
              // store ids of expanded nodes
              this.storeIdsOfExpandedNodes()
              // update data source
              this.dataSource.data = x;
              // expand nodes with stored ids
              this.expandNodesWithStoredId()

              this.ref.detectChanges()
            })
        })


    })
  }



  private getFkPropertyFromSource(fkClass: number) {
    switch (fkClass) {
      case 219: return 979;
      case 220: return 1016;
      case 221: return 1316;
      case 502: return 1305;
    }
  }


  private isSourceDomain(fkClass: number) {
    switch (fkClass) {
      case 219: return false;
      case 220: return true;
      case 221: return false;
      case 502: return false;
    }
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }




  hasChild = (_: number, node: ContentTreeNode) => node.expandable;


  // DRAG AND DROP behavior
  handleDragStart(event, node) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    event.dataTransfer.setData('foo', 'bar');
    // event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    const x = event.offsetX || 0;
    const y = event.offsetY || 0;
    event.dataTransfer.setDragImage(event.target, x, y);
    this.dragNode = node;
    this.treeControl.collapse(node);
  }

  handleDragOver(event, node: ContentTreeNode) {
    event.preventDefault();

    if (node.isDigital) return;

    // Handle node expand
    if (node === this.dragNodeExpandOverNode) {
      if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
        if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
          this.treeControl.expand(node);
        }
      }
    } else {
      this.dragNodeExpandOverNode = node;
      this.dragNodeExpandOverTime = new Date().getTime();
    }

    // Handle drag area
    const percentageX = event.offsetX / event.target.clientWidth;
    const percentageY = event.offsetY / event.target.clientHeight;
    if (percentageY < 0.25) {
      this.dragNodeExpandOverArea = 'above';
    }
    // else if (percentageY > 0.75) {
    //   this.dragNodeExpandOverArea = 'below';
    // }
    else {
      this.dragNodeExpandOverArea = 'center';
    }
  }

  parentOfDraggedChanged = (parent: ContentTreeNode, dragged: ContentTreeNode): boolean => {
    if (this.dragNodeExpandOverArea === 'above') {
      return dragged.statement.fk_object_info !== parent.statement.fk_object_info;
    }
    else {
      return dragged.statement.fk_object_info !== parent.statement.fk_subject_info;
    }
  }


  handleDrop(event, dropNode: ContentTreeNode) {
    if (dropNode.isDigital) return;

    combineLatest([this.service.pkProject$, this.pkExpression$])
      .pipe(first((x) => !x.includes(undefined)), takeUntil(this.destroy$)).subscribe(([pkProject, pkExpression]) => {

        event.preventDefault();

        if (dropNode !== this.dragNode) {
          // let newItem: ContentTreeNode;
          // Q: Does the parent of the dragged node change?
          if (this.parentOfDraggedChanged(dropNode, this.dragNode)) {
            // A: Yes. different parent. change the parent (and the order)

            // replace the current statement with new statement
            const pkOldStatement = this.dragNode.statement.pk_entity
            const newStatement = this.prepareNewStatement(dropNode, this.dragNode)
            this.service.replaceStatement(pkProject, pkOldStatement, newStatement);

          }

        }
        this.dragNode = null;
        this.dragNodeExpandOverNode = null;
        this.dragNodeExpandOverTime = 0;
      })
  }

  private prepareNewStatement(dropNode: ContentTreeNode, draggedNode: ContentTreeNode): InfStatement {

    let fk_object_info: number; // parent pk

    if (this.dragNodeExpandOverArea === 'above') {
      // take the parent of the target node as new parent of the dragged node
      fk_object_info = dropNode.statement.fk_object_info;
    }
    else {
      // take the target node as new parent of the dragged node
      fk_object_info = dropNode.statement.fk_subject_info;
    }

    return {
      fk_object_info,
      fk_subject_info: draggedNode.statement.fk_subject_info,
      fk_subject_data: draggedNode.statement.fk_subject_data,
      fk_property: draggedNode.statement.fk_property
    } as InfStatement;
  }
  handleDragEnd(event) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }


  /**
   * returns the fk_property for 'is part of' depending on
   * wheter the range is an F2 Expression or geovC5 Expression Portion
   */
  private isPartOfProp() {
    return 1317;
  }

  /**
   * returns the fkProperty for 'is reproduction of' depending on
   * whether the range is an F2 Expression or geovC5 Expression Portion
   */
  private isReproProp() {
    return 1216;
  }

  /**
   * When user adds a new text digital to the content tree
   */
  addText(pkParent: number, parentIsF2Expression = false) {
    combineLatest([this.service.pkProject$, this.service.datNamespaces$]).pipe(
      first(d => !d.includes(undefined)),
      takeUntil(this.destroy$)
    ).subscribe(([pkProject, namespaces]) => {

      const pkNamespace = namespaces.find(n => n.fk_root_namespace == null).pk_entity;

      const datDigital: DatDigital = {
        string: '',
        fk_system_type: SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT,
        entity_version: undefined,
        fk_namespace: undefined,
        pk_entity: undefined,
        pk_text: undefined,
        quill_doc: undefined
      }
      this.service.upsertText(datDigital, pkNamespace, pkProject, pkParent, parentIsF2Expression);
    })
  }



  /**
   * When user adds a new Expression Portion to the content tree
   */
  addExpressionPortion(pkParent: number, parentIsF2Expression = false) {
    const pkClass = parentIsF2Expression ? 218 : 503;

    this.c.pipeFields(pkClass).pipe(
      map(fields => fields.find(f => f.property.fkProperty == 1317 && !f.isOutgoing)),
      first(f => !!f),
      takeUntil(this.destroy$)).subscribe(field => {
        this.m.openAddStatementDialog({
          field,
          showAddList: true,
          targetClass: DfhConfig.CLASS_PK_EXPRESSION_PORTION,
          source: { fkInfo: pkParent },
          hiddenProperty: {}
        })
      })
  }

  addTable(pkParent: number) {
    this.service.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      const apiCall = (response: ImportTableResponse) => {
        const a$ = this.service.upsertInfStatementsWithRelations(
          pkProject,
          [{
            fk_subject_data: response.fk_digital,
            fk_object_info: pkParent,
            fk_property: this.isReproProp()
          }]
        ).pipe(map(r => r ? response : undefined));

        const b$ = this.service.loadDigital(response.fk_digital);

        return combineLatest([a$, b$]).pipe(map((vals) => vals[0]))
      }

      this.dialog.open<ImporterComponent, ImporterDialogData>(ImporterComponent, {
        height: 'calc(100% - 30px)',
        width: '90%',
        maxHeight: '100%',
        data: { apiCall }
      });
    })
  }

  // remove(node: ContentTreeNode) {
  //   if (node.isDigital) this.removeDigital(node);
  //   else this.removeExpressionPortion(node);
  // }

  // private removeDigital(node: ContentTreeNode) {



  // }

  removeStatement(node: ContentTreeNode) {
    if (this.treeControl.getDescendants(node).length) {
      this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn>(ConfirmDialogComponent, {
        data: {
          title: 'Section can\'t be removed',
          paragraphs: [
            'This section contains other elements.',
            'Move these elements to another place in this panel (drag & drop) or remove them, if you don\'t need them anymore.',
          ],
          yesBtnColor: 'primary',
          yesBtnText: 'Aknowledge',
          noBtnText: '',
          hideNoButton: true
        }
      })
    }
    else {
      this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn>(ConfirmDialogComponent, {
        data: {
          title: 'Remove ' + (node.isDigital ? 'Text' : 'Section'),
          paragraphs: [
            'Are you sure?',
            '(This can\'t be undone)',
          ],
          yesBtnColor: 'warn',
          yesBtnText: 'Remove',
          noBtnText: 'Cancel'
        }
      })
        .afterClosed()
        .subscribe(confirmed => {
          if (confirmed) {
            this.service.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

              // remove the current statement from project
              this.service.removeInfEntitiesFromProject([node.statement.pk_entity], pkProject)

            })
          }
        })

    }

  }


  open(node: ContentTreeNode) {
    if (node.datDigital && node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TEXT) {
      this.openText(node);
    }
    else if (node.datDigital && node.datDigital.fk_system_type == SysConfig.PK_SYSTEM_TYPE__DIGITAL_TABLE) {
      this.openTable(node);
    }
    else this.openExpressionPortion(node);
  }

  openText(node: ContentTreeNode) {
    this.service.openText(node)
  }

  openTable(node: ContentTreeNode) {
    this.service.openTable(node)
  }

  openExpressionPortion(node: ContentTreeNode) {
    this.service.openExpressionPortion(node)
  }


  // store ids of expanded nodes
  storeIdsOfExpandedNodes() {
    this.expandedNodeIds = {}
    this.treeControl.expansionModel.selected.forEach(node => {
      this.expandedNodeIds[node.statement.pk_entity] = node.statement.pk_entity
    })
  }


  // expand nodes with stored ids
  expandNodesWithStoredId() {
    this.treeControl.dataNodes.forEach(node => {
      if (this.expandedNodeIds[node.statement.pk_entity]) {
        this.treeControl.expand(node);
      }
    })
    // this.dataSource._flattenedData.pipe(first()).subscribe(nodes => {
    //   nodes.forEach(node => {
    //   })
    // })
  }

  handleClick_nodeOptions(data: ContentTreeClickEvent) {
    if (data.openNode) this.open(data.openNode);
    if (data.addExpressionPortion) {
      this.addExpressionPortion(
        data.addExpressionPortion.pkParent, data.addExpressionPortion.parentIsF2Expression
      );
    }
    if (data.addText) this.addText(data.addText.pkParent);
    if (data.addTable) this.addTable(data.addTable.pkParent);
    if (data.removeStatement) this.removeStatement(data.removeStatement);
  }


  /**
   *
   * @param pkSource the source entity = expression portion / source (manifestation singleton etc.)
   * @param fkProperty the fkProperty connecting source entity and expression
   * @param isOutgoing the direction of the property (true if source entity is subject)
   */
  pipeExpression(pkSource: number, fkProperty: number, isOutgoing: boolean): Observable<number> {

    // TODO: instead of this custom implementation, we could use InformationPipeService.pipePage() ??
    let selector$: Observable<InfStatement[]>;
    let mapper: (x: InfStatement[]) => number;
    if (isOutgoing) {
      selector$ = this.p.inf$.statement$.by_subject_and_property$(
        { fk_subject_info: pkSource, fk_property: fkProperty }, false);
      mapper = (x) => x[0].fk_object_info
    } else {
      selector$ = this.p.inf$.statement$.by_object_and_property$(
        { fk_object_info: pkSource, fk_property: fkProperty }, false);
      mapper = (x) => x[0].fk_subject_info
    }

    return selector$.pipe(
      tap((xs) => {
        if (xs.length !== 1) console.warn('number of expressions must be one');
      }),
      filter((xs) => xs.length > 0),
      map(mapper)
    );
  }

  pipeChildren(pkObject): Observable<StatementNode[]> {
    if (!pkObject) return new BehaviorSubject([])
    return combineLatest([
      this.p.inf$.statement$.by_object_and_property$({
        fk_property: 1317,  // is part of
        fk_object_info: pkObject
      }),
      // .pipe(startWith([])),
      this.p.inf$.statement$.by_object_and_property$({
        fk_property: 1216,  // is reproduction of
        fk_object_info: pkObject
      })
      // .pipe(startWith([])),
    ])
      .pipe(
        switchMap(([isPartOfStatements, isReproOfStatements]) => {

          // Observe the children of this node
          const sections$ = combineLatestOrEmpty(isPartOfStatements.map(statement => {
            const node$: Observable<StatementNode> =
              this.pipeChildren(statement.fk_subject_info)
                .pipe(
                  map((children) => ({
                    statement,
                    isDigital: false,
                    pkEntity: statement.fk_subject_info,
                    pkDigital: undefined,
                    children
                  }))
                );

            return node$
          }))

          // Observe the leafs of this node
          const digitals$ = combineLatestOrEmpty(isReproOfStatements.map(statement => {
            const node$: Observable<StatementNode> = this.p.dat$.digital$.latestVersion(statement.fk_subject_data).pipe(
              filter(x => !!x),
              map(datDigital => ({
                statement,
                isDigital: true,
                pkEntity: undefined,
                pkDigital: statement.fk_subject_data,
                datDigital,
                children: []
              }))
            );

            return node$
          }))

          return combineLatest([sections$, digitals$]).pipe(
            map(([sections, digitals]) => [...sections, ...digitals])
          )
        }),
      )
  }


  // pipePrimeNgTree(pkObject: number): Observable<TreeNode<PrimeNgNodeData>[]> {
  //   if (!pkObject) return new BehaviorSubject([])
  //   return combineLatest([
  //     this.p.inf$.statement$.by_object_and_property$({
  //       fk_property: 1317,  // is part of
  //       fk_object_info: pkObject
  //     }).pipe(startWith([] as InfStatement[])),
  //     this.p.inf$.statement$.by_object_and_property$({
  //       fk_property: 1216,  // is reproduction of
  //       fk_object_info: pkObject
  //     }).pipe(startWith([] as InfStatement[])),
  //   ])
  //     .pipe(
  //       switchMap(([isPartOfStatements, isReproOfStatements]) => {
  //         // Observe the children of this node
  //         const sections$ = combineLatestOrEmpty(isPartOfStatements.map(statement => {

  //           const node$: Observable<TreeNode<PrimeNgNodeData>> =
  //             this.pipePrimeNgTree(statement.fk_subject_info)
  //               .pipe(
  //                 map((children) => {
  //                   const n: TreeNode<PrimeNgNodeData> = {
  //                     key: statement.pk_entity.toString(),
  //                     data: {
  //                       statement,
  //                       isDigital: false,
  //                       pkEntity: statement.fk_subject_info,
  //                       pkDigital: undefined,
  //                     },
  //                     children
  //                   }
  //                   return n
  //                 })
  //               );

  //           return node$
  //         }))

  //         // Observe the leafs of this node
  //         const digitals$ = combineLatestOrEmpty(isReproOfStatements.map(statement => {
  //           const node$: Observable<TreeNode<PrimeNgNodeData>> = this.p.dat$.digital$.latestVersion(statement.fk_subject_data).pipe(
  //             filter(x => !!x),
  //             map(datDigital => {
  //               const n: TreeNode<PrimeNgNodeData> = {
  //                 key: statement.pk_entity.toString(),
  //                 data: {
  //                   statement,
  //                   isDigital: true,
  //                   pkEntity: undefined,
  //                   pkDigital: statement.fk_subject_data,
  //                   datDigital
  //                 },
  //                 children: []
  //               }
  //               return n
  //             })
  //           );

  //           return node$
  //         }))

  //         return combineLatest([sections$, digitals$]).pipe(
  //           map(([sections, digitals]) => [...sections, ...digitals])
  //         )
  //       }),
  //     )
  // }


  loadStatementToExpression(
    pkProject: number,
    pkEntity: number,
    fkProperty: number,
    isOutgoing: boolean,
    destroy$: Observable<boolean>
  ) {
    const fieldPage: GvFieldPageReq = {
      pkProject,
      page: {
        isOutgoing,
        property: { fkProperty },
        scope: { inProject: pkProject },
        source: { fkInfo: pkEntity },
        limit: 1,
        offset: 0
      },
      targets: { [DfhConfig.CLASS_PK_EXPRESSION]: { entityPreview: 'true' } }
    }
    this.pag.addPageLoader(fieldPage, destroy$);
  }
}
