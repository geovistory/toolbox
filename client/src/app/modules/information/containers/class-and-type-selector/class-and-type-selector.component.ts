import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActiveProjectService, EntityPreview, IAppState, SubstoreComponent } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { DropdownTreeviewComponent, TreeviewConfig, TreeviewI18n, TreeviewItem } from 'ngx-treeview';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { ClassAndTypeSelectorAPIActions } from './api/class-and-type-selector.actions';
import { ClassAndTypeSelectorAPIEpics } from './api/class-and-type-selector.epics';
import { ClassAndTypePk, ClassAndTypeSelector } from './api/class-and-type-selector.models';
import { classAndTypeSelectorReducer } from './api/class-and-type-selector.reducer';
import { ClassAndTypeSelectorI18n } from './class-and-type-selector-i18n';
import { groupBy, indexBy } from 'ramda';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: classAndTypeSelectorReducer
})
@Component({
  selector: 'gv-class-and-type-selector',
  templateUrl: './class-and-type-selector.component.html',
  styleUrls: ['./class-and-type-selector.component.css'],
  providers: [
    { provide: TreeviewI18n, useClass: ClassAndTypeSelectorI18n }
  ]
})
export class ClassAndTypeSelectorComponent extends ClassAndTypeSelectorAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<ClassAndTypeSelector>;

  // path to the substore
  @Input() basePath: string[];

  // classes for which types should be loaded and that are selectable
  @Input() pkClasses: number[];

  // project of which types should be loaded
  @Input() pkProject: number;

  // text
  @Input() buttonText = 'Select';

  // text
  @Input() buttonClass = 'btn-link no-caret mr-0';

  // placement
  @Input() placement: 'right' | 'left' = 'left';

  // has filter
  @Input() hasFilter = false;

  // On user select class or type
  @Output() select = new EventEmitter<ClassAndTypePk>();

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<TreeviewItem[]>;
  tree$: Observable<TreeviewItem[]>;
  typePreviews$: Observable<EntityPreview[]>;


  selectedItem: TreeviewItem;

  config: TreeviewConfig;
  @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
  private dropdownTreeviewSelectI18n: ClassAndTypeSelectorI18n;

  constructor(
    protected rootEpics: RootEpics,
    private epics: ClassAndTypeSelectorAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public i18n: TreeviewI18n,
    public p: ActiveProjectService
  ) {
    super();


  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, classAndTypeSelectorReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    this.load(this.pkClasses, this.pkProject)

    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: this.hasFilter,
      maxHeight: 500
    });

    this.dropdownTreeviewSelectI18n = this.i18n as ClassAndTypeSelectorI18n;

    this.dropdownTreeviewSelectI18n.text = this.buttonText;

    this.typePreviews$ = this.items$.pipe(
      mergeMap(items => {
        const previews: Observable<EntityPreview>[] = [];
        // get labels for types preview
        const observePreview = (itm: TreeviewItem[]): TreeviewItem[] => {
          itm.map((item) => { if (item.children) observePreview(item.children) })

          itm.forEach(item => {
            if (item.value.pkType) {
              previews.push(this.p.streamEntityPreview(item.value.pkType))
            }
          })
          return itm;
        }
        observePreview(items)

        return combineLatest(previews);
      }),
      filter(previews => {
        return previews.find(pre => !pre.pk_entity) ? false : true;
      })
    )

    this.tree$ = combineLatest(this.items$, this.typePreviews$)
      .pipe(
        map(([treeviewItems, typePreviews]) => {

          const typesByPk = indexBy((e) => e.pk_entity.toString(), typePreviews)

          // Add labels from previews to each of the type items
          const addText = (itms: TreeviewItem[]): TreeviewItem[] => {
            itms.map((item) => { if (item.children) addText(item.children) })

            itms.forEach(item => {
              if (item.value.pkType) {
                item.text = typesByPk[item.value.pkType].entity_label
              }
            })

            return itms;
          }
          addText(treeviewItems)

          // sort
          const sortItems = (itms: TreeviewItem[]): TreeviewItem[] => {
            itms.map((item) => { if (item.children) sortItems(item.children) })
            return itms.sort((a, b) => {
              const textA = a.text.toUpperCase(); // ignore upper and lowercase
              const textB = b.text.toUpperCase(); // ignore upper and lowercase
              if (textA < textB) {
                return -1;
              }
              if (textA > textB) {
                return 1;
              }
              // names are equal
              return 0;
            })
          }

          sortItems(treeviewItems)

          return treeviewItems;
        })
      )



  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }




  onSelectClick(item: TreeviewItem) {
    this.dropdownTreeviewComponent.dropdownDirective.close();
    // if (this.selectedItem !== item) {
    this.selectedItem = item;
    this.select.emit({ pkClass: item.value.pkClass, pkType: item.value.pkType });
    // }
  }

}
