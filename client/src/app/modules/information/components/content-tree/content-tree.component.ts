import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActiveProjectService, DatDigital, InfEntityAssociation, InfPersistentItem, latestVersion, SysConfig, switchMapOr } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { RepoService } from 'app/core/repo/repo.service';
import { ByPk } from 'app/core/store/model';
import { equals, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, filter, first, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DatSelector } from '../../../../core/dat/dat.service';
import { DfhConfig } from '../../shared/dfh-config';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface EntityAssociationNode {

  // the entity association
  entityAssociation: InfEntityAssociation;

  // the name of the node, being tha favorite appellation of Expression Portion or some symbol for Digitals
  name: string;

  // Wheter or not this node is a Digital and thus a leaf or a Expression Portion and thus not a leaf
  isDigital: boolean;

  // The label of the type, being the Expression Portion Type or the Digital Type (text, table, image)
  typeLabel: string;

  // children of the node
  children?: EntityAssociationNode[];
}

interface ContentTreeNode {
  entityAssociation: InfEntityAssociation;
  expandable: boolean;
  name: string;
  isDigital: boolean;
  typeLabel: string;
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
  contentTree$: Observable<EntityAssociationNode[]>;

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
    (node: EntityAssociationNode, level: number): ContentTreeNode => {
      const { children, ...rest } = node;
      return {
        ...rest,
        expandable: !!node.children && node.children.length > 0,
        level: level,
      };
    }, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private p: ActiveProjectService,
    private r: RepoService,
    private inf: InfActions,
    private dat: DatSelector,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // wait for pkEntity and fkClass of the source
    combineLatest(this.pkEntity$, this.fkClass$, this.p.pkProject$).pipe(
      first(d => !d.includes(undefined)),
      takeUntil(this.destroy$)
    ).subscribe(([pkEntity, fkClass, pkProject]) => {
      this.loadRootEntity(pkEntity, fkClass, pkProject)
    })
  }

  /**
   * Loads the entity that is the root of the content tree

   */
  loadRootEntity(pkEntity: number, fkClass: number, pkProject) {

    // if we start from a source like class
    // load the entity association that associates source --> expression
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
      // load ea recursive is part of / is reproduction of
      this.inf.entity_association.contentTree(pkProject, pkRoot)
      this.contentTree$ = this.observeChildren(pkRoot)

      this.contentTree$.pipe(distinctUntilChanged<EntityAssociationNode[]>(equals), takeUntil(this.destroy$))
        .subscribe((x) => {
          // store ids of expanded nodes
          this.storeIdsOfExpandedNodes()
          // update data source
          this.dataSource.data = x;
          // expand nodes with stored ids
          this.expandNodesWithStoredId()

          this.ref.detectChanges()
        })

    })
  }






  /**
   * returns an observable string emitting the appellation of an expression portion
   */
  private labelOfExprPortion(pkExpressionPortion: number) {
    return this.p.inf$.role$.by_fk_property__fk_entity$.key('1327_' + pkExpressionPortion)
      .pipe(filter(rByPk => !!rByPk && Object.keys(rByPk).length > 0),
        map(rByPk => values(rByPk)[0]),
        switchMap(r => this.p.inf$.role$.by_fk_property__fk_temporal_entity$.key('1113_' + r.fk_temporal_entity)),
        filter(rByPk => !!rByPk && Object.keys(rByPk).length > 0),
        map(rByPk => values(rByPk)[0]),
        switchMap(r => this.p.inf$.appellation$.by_pk_entity$.key(r.fk_entity)),
        filter(a => !!a),
        map(a => a.string));
  }



  private typeLabelOfExprPortion(pkExpressionPortion: number) {
    return this.p.inf$.entity_association$.by_fk_property__fk_info_domain$.key('1320_' + pkExpressionPortion)
      .pipe(filter(rByPk => !!rByPk && Object.keys(rByPk).length > 0),
        map(rByPk => values(rByPk)[0]),
        switchMap(ea => this.p.streamEntityPreview(ea.fk_info_range)),
        map(preview => preview.entity_label),
        startWith('[No Type]'));
  }

  observeChildren(pkRange): Observable<EntityAssociationNode[]> {
    if (!pkRange) return new BehaviorSubject([])
    return this.p.inf$.entity_association$.by_fk_info_range$.key(pkRange).pipe(
      map(eas => values(eas).filter(ea => [1317, 1328, 1329, 1216].includes(ea.fk_property))),
      // filter(x => x.length > 0),
      switchMapOr([], (eas) => {

        const obs = eas.map(ea => {
          // Observe the children of this node
          const cildren$ = this.observeChildren(ea.fk_info_domain);

          // Observe the name of this node
          const name$ = this.observeName(ea);

          // Observe the isLeave property of this node
          const isLeaf$ = new BehaviorSubject(ea.fk_data_domain ? true : false)

          const typeLabel$ = this.observeTypeLabel(ea);

          return combineLatest(cildren$, name$, isLeaf$, typeLabel$)
        })

        return combineLatest(obs).pipe(
          map((enrichedEas) => eas.map((entityAssociation, i): EntityAssociationNode => {
            // create the node by merging the props observed above
            const [children, name, isDigital, typeLabel] = enrichedEas[i];
            return { entityAssociation, isDigital, name, children, typeLabel }
          }))
        )
      }),
      // startWith([])
    )
  }


  private observeTypeLabel(ea) {
    if (ea.fk_data_domain) {
      return new BehaviorSubject('Text (transcription)');
    }
    else {
      return this.typeLabelOfExprPortion(ea.fk_info_domain)
    }
  }

  /**
   * Observe the name of the node
   */
  private observeName(ea) {
    // Q: is the node a information and thus an expression portion?
    if (ea.fk_info_domain) {
      // A: Yes it is an expression portion, lets find the favorit appellaiton
      return this.labelOfExprPortion(ea.fk_info_domain)
        .pipe(startWith('No Name'));
    }
    else {
      // A: No it is a digital, lets take the first chars of the text
      return this.p.dat$.digital$.by_pk_entity$.key(ea.fk_data_domain)
        .pipe(
          filter(x => !!x),
          map(versions => latestVersion(versions)),
          map(x => x.string.substring(0, 20) + (x.string.length > 20 ? '…' : '')),
          startWith(''));
    }
  }

  /**
   * Returns an observable number with the
   */
  private getExpressionWhereSourceIsRange(pkEntity: number): Observable<number> {
    this.inf.entity_association.findByParams(false, null, null, pkEntity, null, this.fkPropertyFromSource);
    return this.r.inf$.entity_association$.by_fk_info_range$.key(pkEntity)
      .pipe(filter((xs) => !!xs && !values(xs).find(x => !x)), tap((x) => {
        if (Object.keys(x).length !== 1) console.warn('number of expressions must be one');
      }), map((x) => values(x)[0].fk_info_domain));
  }

  private getExpressionWhereSourceIsDomain(pkEntity: number): Observable<number> {
    this.inf.entity_association.findByParams(false, null, null, null, pkEntity, this.fkPropertyFromSource);
    return this.r.inf$.entity_association$.by_fk_info_domain$.key(pkEntity)
      .pipe(filter((xs) => !!xs && !values(xs).find(x => !x)), tap((x) => {
        if (Object.keys(x).length !== 1) console.warn('number of expressions must be one');
      }), map((x) => values(x)[0].fk_info_range));
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
      return dragged.entityAssociation.fk_info_range !== parent.entityAssociation.fk_info_range;
    }
    else {
      return dragged.entityAssociation.fk_info_range !== parent.entityAssociation.fk_info_domain;
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

            // remove the current entity association from project
            this.inf.entity_association.remove([this.dragNode.entityAssociation], pkProject)

            // find or create a new entity association bewteen the dragged and the new parent
            this.inf.entity_association.upsert([this.prepareNewEntityAssociatoin(dropNode, this.dragNode, pkExpression)], pkProject)

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

  prepareNewEntityAssociatoin(dropNode: ContentTreeNode, draggedNode: ContentTreeNode, pkExpression: number): InfEntityAssociation {

    let fk_info_range: number; // parent pk
    let parentIsF2Expression: boolean;
    let fk_property;

    if (this.dragNodeExpandOverArea === 'above') {
      // take the parent of the target node as new parent of the dragged node
      fk_info_range = dropNode.entityAssociation.fk_info_range;
      parentIsF2Expression = (pkExpression == fk_info_range);
    }
    //  else if (this.dragNodeExpandOverArea === 'below') {
    // }
    else {
      // take the target node as new parent of the dragged node
      fk_info_range = dropNode.entityAssociation.fk_info_domain;
    }


    if (draggedNode.isDigital) {
      fk_property = this.isReproProp(parentIsF2Expression);
    } else {
      fk_property = this.isPartOfProp(parentIsF2Expression);
    }

    return {
      fk_info_range,
      fk_info_domain: draggedNode.entityAssociation.fk_info_domain,
      fk_data_domain: draggedNode.entityAssociation.fk_data_domain,
      fk_property
    } as InfEntityAssociation;
  }

  /**
   * returns the fk_property for 'is part of' depending on
   * wheter the range is an F2 Expression or geovC5 Expression Portion
   */
  private isPartOfProp(parentIsF2Expression: boolean) {
    if (parentIsF2Expression) {
      // geovC5 Expression portion -->geovP6 is part of -->	F2 Expression
      return 1317;
    }
    else {
      // geovC5 Expression portion -->geovP6 is part of --> geovC5 Expression portion
      return 1328;
    }
  }

  /**
   * returns the fkProperty for 'is reproduction of' depending on
   * whether the range is an F2 Expression or geovC5 Expression Portion
   */
  private isReproProp(parentIsF2Expression: boolean) {
    if (parentIsF2Expression) {
      // geovC1 Digital	-->	geovP1 is reproduction of -->	F2 Expression
      return 1216;
    }
    else {
      // geovC1 Digital	-->	geovP1 is reproduction of --> geovC5 Expression portion
      return 1329;
    }
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

      this.dat.digital.upsert([{ string: '' } as DatDigital], pkNamespace)
        .resolved$.pipe(takeUntil(this.destroy$)).subscribe(resolved => {

          if (resolved) {
            // resolved.items[0].pk_entity

            this.inf.entity_association.upsert([{
              fk_data_domain: resolved.items[0].pk_entity,
              fk_info_range: pkParent,
              fk_property: this.isReproProp(parentIsF2Expression)
            } as InfEntityAssociation], pkProject)

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
        this.inf.persistent_item.loadNestedObject(pkProject, result.pkEntity)

        this.inf.entity_association.upsert([{
          fk_info_domain: result.pkEntity,
          fk_info_range: pkParent,
          fk_property: this.isPartOfProp(parentIsF2Expression)
        } as InfEntityAssociation], pkProject)

      })
    })
  }

  remove(node: ContentTreeNode) {
    if (node.isDigital) this.removeDigital(node);
    else this.removeExpressionPortion(node);
  }

  private removeDigital(node: ContentTreeNode) {
    const entityAssociation = node.entityAssociation;
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      // remove the current entity association from project
      this.inf.entity_association.remove([entityAssociation], pkProject)

      // get the digital
      this.dat.digital$.by_pk_entity$.key(entityAssociation.fk_data_domain).pipe(
        map(versions => latestVersion(versions))
      ).subscribe(digital => {
        // remove the digital
        if (digital) this.dat.digital.delete([digital])
      })
    })
  }

  private removeExpressionPortion(node: ContentTreeNode) {
    if (this.treeControl.getDescendants(node).length) return alert('You can not remove a section with content in it.');
    else {

      this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

        // remove the current entity association from project
        this.inf.entity_association.remove([node.entityAssociation], pkProject)

      })
    }

  }


  open(node: ContentTreeNode) {
    if (node.isDigital) this.openText(node);
    else this.openExpressionPortion(node);
  }

  openText(node: ContentTreeNode) {
    this.p.addTextTab(node.entityAssociation.fk_data_domain)
  }

  openExpressionPortion(node: ContentTreeNode) {
    this.p.addSourceExpressionPortionTab(node.entityAssociation.fk_info_domain)
  }


  // store ids of expanded nodes
  storeIdsOfExpandedNodes() {
    this.expandedNodeIds = {}
    this.treeControl.expansionModel.selected.forEach(node => {
      this.expandedNodeIds[node.entityAssociation.pk_entity] = node.entityAssociation.pk_entity
    })
  }


  // expand nodes with stored ids
  expandNodesWithStoredId() {
    this.dataSource._flattenedData.pipe(first()).subscribe(nodes => {
      nodes.forEach(node => {
        if (this.expandedNodeIds[node.entityAssociation.pk_entity]) {
          this.treeControl.expand(node);
        }
      })
    })
  }
}



