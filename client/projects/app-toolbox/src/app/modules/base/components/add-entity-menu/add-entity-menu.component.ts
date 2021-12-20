import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ClassAndTypePk, InformationPipesService } from '@kleiolab/lib-queries';
import { AddMenuClassOrTypeItem } from '@kleiolab/lib-queries/lib/queries/models/AddMenuClassOrTypeItem';
import { InfResourceWithRelations, SysConfigClassCategoryBelonging } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseModalsService } from '../../services/base-modals.service';


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  label: string;
  data: ClassAndTypePk
  level: number;
}

@Component({
  selector: 'gv-add-entity-menu',
  templateUrl: './add-entity-menu.component.html',
  styleUrls: ['./add-entity-menu.component.scss']
})
export class AddEntityMenuComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  // On user select class or type
  @Input() enabledIn: keyof SysConfigClassCategoryBelonging;
  @Output() select = new EventEmitter<ClassAndTypePk>();

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "ArrowUp") this.expandAll$.next(false)
    if (event.key === "ArrowDown") this.expandAll$.next(true)
  }

  expandAll$ = new BehaviorSubject(false)
  filter$ = new BehaviorSubject('')
  data$: Observable<AddMenuClassOrTypeItem[]>

  constructor(
    private i: InformationPipesService,
    public p: ActiveProjectService,
    private m: BaseModalsService,

  ) { }

  // private _transformer =

  ngOnInit() {
    if (!this.enabledIn) throw new Error('You must provide enabledIn input');

    this.data$ = combineLatest([this.i.pipeClassesAndTypesOfAddMenu(this.enabledIn), this.filter$])
      .pipe(map(([items, filter]) => {
        const filterExpression = (i: AddMenuClassOrTypeItem, f: string) => i.label.toLowerCase().includes(f.toLowerCase())
        const filterItems = (i: AddMenuClassOrTypeItem[], f: string) => i.filter(option => filterExpression(option, f))

        const classesWithFilteredChildren = items.map(item => {
          const children = filterItems(item.children, filter)
          return {
            ...item,
            children
          }
        })

        return classesWithFilteredChildren.filter(classItem => classItem.children.length || filterExpression(classItem, filter))
      }))

  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onFilter(e: KeyboardEvent) {
    this.filter$.next((<HTMLInputElement>e.target).value)
  }
  onSelect(d: ClassAndTypePk) {
    this.select.emit(d)

    this.p.setListType('')

    const initVal: InfResourceWithRelations = {
      fk_class: d.pkClass
    }
    if (d.pkType) {
      initVal.outgoing_statements = [{
        fk_property: d.pkHasTypeProperty,
        fk_object_info: d.pkType
      }]
    }
    this.m.openAddEntityDialog({
      pkClass: d.pkClass,
      initVal
    }).subscribe(result => {
      this.p.addEntityTab(result.pkEntity, result.pkClass)
    })

  }

  openBrowserWindow(url: string) {
    window.open(url, '_blank').focus()
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
