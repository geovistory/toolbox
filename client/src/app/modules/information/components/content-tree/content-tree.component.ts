import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SysConfig } from 'app/core';
import { ActiveProjectService } from "app/core/active-project";
import { ActiveAccountService } from "app/core/active-account";
import { InfStatement } from "app/core/sdk";
import { DatDigital } from "app/core/sdk";
import { InfActions } from 'app/core/inf/inf.actions';
import { ByPk } from 'app/core/redux-store/model';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';
import { RepoService } from 'app/core/repo/repo.service';
import { ImportTableResponse } from 'app/core/sdk-lb4/model/importTableResponse';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { InformationPipesService } from 'app/modules/base/services/information-pipes.service';
import { ImporterComponent, ImporterDialogData } from 'app/modules/data/components/importer/importer.component';
import { ConfirmDialogComponent, ConfirmDialogData, ConfirmDialogReturn } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DatSelector } from 'app/core/dat/dat.service';
import { DfhConfig } from '../../shared/dfh-config';
import { ContentTreeClickEvent } from '../content-tree-node-options/content-tree-node-options.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface StatementNode {

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





@Component({
  selector: 'gv-content-tree',
  templateUrl: './content-tree.component.html',
  styleUrls: ['./content-tree.component.scss']
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
  dragNodeExpandOverArea: string;
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

  constructor(
    public p: ActiveProjectService,
    public a: ActiveAccountService,
    private s: SchemaObjectService,
    private r: RepoService,
    private inf: InfActions,
    private dat: DatSelector,
    private ref: ChangeDetectorRef,
    private i: InformationPipesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loading = true;

    // wait for pkEntity and fkClass of the source
    combineLatest(this.pkEntity$, this.fkClass$, this.p.pkProject$).pipe(
      first(d => !d.includes(undefined)),
      takeUntil(this.destroy$)
    ).subscribe(([pkEntity, fkClass, pkProject]) => {
      this.loadRootEntity(pkEntity, fkClass, pkProject)
    })

    // check if is admin ? (display importer or not)
    this.a.isSystemAdmin()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  /**
   * Loads the entity that is the root of the content tree
   */
  loadRootEntity(pkEntity: number, fkClass: number, pkProject) {

    // if we start from a source like class
    // load the statement that associates source --> expression
    if (fkClass !== DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
      this.rootIsF2Expression = true;
      this.fkPropertyFromSource = this.getFkPropertyFromSource(fkClass);
      this.sourceIsDomain = this.isSourceDomain(fkClass);

      if (this.sourceIsDomain) {
        this.pkExpression$ = this.getExpressionWhereSourceIsDomain(pkEntity);
      }
      else {
        this.pkExpression$ = this.getExpressionWhereSourceIsRange(pkEntity);
      }
      this.pkRoot$ = this.pkExpression$;
    }
    else {
      this.rootIsF2Expression = false;
      this.pkRoot$ = of(pkEntity)
    }



    this.pkRoot$.pipe(first()).subscribe(pkRoot => {

      this.pkRoot = pkRoot;
      // load data recursive is part of / is reproduction of
      this.s.store(this.s.api.contentTree(pkProject, pkRoot), pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(() => {
          this.contentTree$ = this.observeChildren(pkRoot)

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






  /**
   * returns an observable string emitting the appellation of an expression portion
   */
  private labelOfEntity(pkExpressionPortion: number): Observable<string> {
    return this.p.streamEntityPreview(pkExpressionPortion).pipe(
      map(p => p.entity_label)
    );
  }



  private typeLabelOfExprPortion(pkExpressionPortion: number) {

    const hasTypeStatement$ = this.i.pipeTypeOfEntity(
      pkExpressionPortion,
      DfhConfig.PROPERTY_PK_HAS_EXPRESSION_PORTION_TYPE,
      false
    )

    const pkType$ = hasTypeStatement$.pipe(
      map(e => e ? e.fk_object_info : undefined)
    )
    const typeLabel$ = pkType$.pipe(
      switchMap(pkType => this.labelOfEntity(pkType)),
      startWith('[No Type]')
    )

    return typeLabel$;

  }

  observeChildren(pkRange): Observable<StatementNode[]> {
    if (!pkRange) return new BehaviorSubject([])
    return combineLatest(
      this.p.inf$.statement$.by_object_and_property$({
        fk_property: 1317,  // is part of
        fk_object_info: pkRange
      }),
      this.p.inf$.statement$.by_object_and_property$({
        fk_property: 1216,  // is reproduction of
        fk_object_info: pkRange
      })
    )
      .pipe(
        switchMap(([isPartOfStatements, isReproOfStatements]) => {

          // Observe the children of this node
          const sections$ = combineLatestOrEmpty(isPartOfStatements.map(statement => {
            const node$: Observable<StatementNode> = combineLatest(
              this.observeChildren(statement.fk_subject_info)
            ).pipe(
              map(([children]) => ({
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


  /**
   * Returns an observable number with the
   */
  private getExpressionWhereSourceIsRange(pkEntity: number): Observable<number> {
    this.inf.statement.findByParams(false, null, null, pkEntity, null, this.fkPropertyFromSource);
    return this.r.inf$.statement$
      .by_object_and_property$(
        {
          fk_object_info: pkEntity,
          fk_property: this.fkPropertyFromSource
        },
        false
      )
      .pipe(
        tap((xs) => {
          if (xs.length !== 1) console.warn('number of expressions must be one');
        }),
        filter((xs) => xs.length > 0),
        map((x) => x[0].fk_subject_info)
      );
  }

  private getExpressionWhereSourceIsDomain(pkEntity: number): Observable<number> {
    this.inf.statement.findByParams(false, null, null, null, pkEntity, this.fkPropertyFromSource);
    return this.r.inf$.statement$
      .by_subject_and_property$(
        {
          fk_subject_info: pkEntity,
          fk_property: this.fkPropertyFromSource
        },
        false
      )
      .pipe(
        tap((xs) => {
          // if (xs.length !== 1) console.warn('number of expressions must be one');
        }),
        filter((xs) => xs.length > 0),
        map((x) => x[0].fk_object_info)
      );
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

    combineLatest(this.p.pkProject$, this.pkExpression$)
      .pipe(first((x) => !x.includes(undefined)), takeUntil(this.destroy$)).subscribe(([pkProject, pkExpression]) => {

        event.preventDefault();

        if (dropNode !== this.dragNode) {
          // let newItem: ContentTreeNode;
          // Q: Does the parent of the dragged node change?
          if (this.parentOfDraggedChanged(dropNode, this.dragNode)) {
            // A: Yes. different parent. change the parent (and the order)

            // remove the current statement from project
            this.inf.statement.remove([this.dragNode.statement], pkProject)

            // find or create a new statement bewteen the dragged and the new parent
            this.inf.statement.upsert([this.prepareNewEntityAssociatoin(dropNode, this.dragNode, pkExpression)], pkProject)

          }

          // this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
          // this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
        }
        this.dragNode = null;
        this.dragNodeExpandOverNode = null;
        this.dragNodeExpandOverTime = 0;
      })
  }

  handleDragEnd(event) {
    this.dragNode = null;
    this.dragNodeExpandOverNode = null;
    this.dragNodeExpandOverTime = 0;
  }

  prepareNewEntityAssociatoin(dropNode: ContentTreeNode, draggedNode: ContentTreeNode, pkExpression: number): InfStatement {

    let fk_object_info: number; // parent pk
    let parentIsF2Expression: boolean;
    let fk_property;

    if (this.dragNodeExpandOverArea === 'above') {
      // take the parent of the target node as new parent of the dragged node
      fk_object_info = dropNode.statement.fk_object_info;
      parentIsF2Expression = (pkExpression == fk_object_info);
    }
    //  else if (this.dragNodeExpandOverArea === 'below') {
    // }
    else {
      // take the target node as new parent of the dragged node
      fk_object_info = dropNode.statement.fk_subject_info;
    }


    if (draggedNode.isDigital) {
      fk_property = this.isReproProp(parentIsF2Expression);
    } else {
      fk_property = this.isPartOfProp(parentIsF2Expression);
    }

    return {
      fk_object_info,
      fk_subject_info: draggedNode.statement.fk_subject_info,
      fk_subject_data: draggedNode.statement.fk_subject_data,
      fk_property
    } as InfStatement;
  }

  /**
   * returns the fk_property for 'is part of' depending on
   * wheter the range is an F2 Expression or geovC5 Expression Portion
   */
  private isPartOfProp(parentIsF2Expression: boolean) {
    return 1317;

    // if (parentIsF2Expression) {
    //   // geovC5 Expression portion -->geovP6 is part of -->	F2 Expression
    //   return 1317;
    // }
    // else {
    //   // geovC5 Expression portion -->geovP6 is part of --> geovC5 Expression portion
    //   return 1328;
    // }
  }

  /**
   * returns the fkProperty for 'is reproduction of' depending on
   * whether the range is an F2 Expression or geovC5 Expression Portion
   */
  private isReproProp(parentIsF2Expression: boolean) {
    return 1216;
    // if (parentIsF2Expression) {
    //   // geovC1 Digital	-->	geovP1 is reproduction of -->	F2 Expression
    // return 1216;
    // }
    // else {
    //   // geovC1 Digital	-->	geovP1 is reproduction of --> geovC5 Expression portion
    //   return 1329;
    // }
  }

  /**
   * When user adds a new text digital to the content tree
   */
  addText(pkParent: number, parentIsF2Expression = false) {
    combineLatest(this.p.pkProject$, this.p.datNamespaces$).pipe(
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
      this.dat.digital.upsert([datDigital], pkNamespace)
        .resolved$.pipe(takeUntil(this.destroy$)).subscribe(resolved => {

          if (resolved) {
            // resolved.items[0].pk_entity

            this.inf.statement.upsert([{
              fk_subject_data: resolved.items[0].pk_entity,
              fk_object_info: pkParent,
              fk_property: this.isReproProp(parentIsF2Expression)
            } as InfStatement], pkProject)

          }
        })
    })
  }

  /**
   * When user adds a new Expression Portion to the content tree
   */
  addExpressionPortion(pkParent: number, parentIsF2Expression = false) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      this.p.openModalCreateOrAddEntity({
        notInProjectClickBehavior: 'addToProject',
        alreadyInProjectBtnText: 'Select',
        notInProjectBtnText: 'Add',
        classAndTypePk: {
          pkClass: DfhConfig.CLASS_PK_EXPRESSION_PORTION,
          pkType: undefined
        },
        pkUiContext: SysConfig.PK_UI_CONTEXT_SOURCES_CREATE,
      }).subscribe((result) => {

        // TODO: Integrate this in the create or add entity component
        this.inf.persistent_item.loadMinimal(pkProject, result.pkEntity)

        this.inf.statement.upsert([{
          fk_subject_info: result.pkEntity,
          fk_object_info: pkParent,
          fk_property: this.isPartOfProp(parentIsF2Expression)
        } as InfStatement], pkProject)

      })
    })
  }

  addTable(pkParent: number, parentIsF2Expression = false) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      const apiCall = (response: ImportTableResponse) => {
        const a$ = this.inf.statement.upsert([{
          fk_subject_data: response.fk_digital,
          fk_object_info: pkParent,
          fk_property: this.isReproProp(parentIsF2Expression)
        } as InfStatement], pkProject).resolved$.pipe(map(r => r ? response : undefined));

        const b$ = this.dat.digital.loadVersion(response.fk_digital).resolved$;

        return combineLatest(a$, b$).pipe(map((vals) => vals[0]))
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
            this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

              // remove the current statement from project
              this.inf.statement.remove([node.statement], pkProject)

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
    this.p.addTextTab(node.statement.fk_subject_data)
  }

  openTable(node: ContentTreeNode) {
    this.p.addTableTab(node.statement.fk_subject_data)
  }

  openExpressionPortion(node: ContentTreeNode) {
    this.p.addEntityTab(
      node.statement.fk_subject_info,
      DfhConfig.CLASS_PK_EXPRESSION_PORTION,
    )
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
    this.dataSource._flattenedData.pipe(first()).subscribe(nodes => {
      nodes.forEach(node => {
        if (this.expandedNodeIds[node.statement.pk_entity]) {
          this.treeControl.expand(node);
        }
      })
    })
  }

  handleClick_nodeOptions(data: ContentTreeClickEvent) {
    if (data.openNode) this.open(data.openNode);
    if (data.addExpressionPortion) this.addExpressionPortion(data.addExpressionPortion.pkParent, data.addExpressionPortion.parentIsF2Expression);
    if (data.addText) this.addText(data.addText.pkParent, data.addText.parentIsF2Expression);
    if (data.addTable) this.addTable(data.addTable.pkParent, data.addTable.parentIsF2Expression);
    if (data.removeStatement) this.removeStatement(data.removeStatement);
  }

}
