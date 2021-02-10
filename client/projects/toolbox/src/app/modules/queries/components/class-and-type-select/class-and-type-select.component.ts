import { Component, Input, OnInit, Optional, Self, Directive } from '@angular/core';
import { NgControl, AbstractControl, ValidatorFn, Validator, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AbstractChecklistControl } from 'projects/toolbox/src/app/shared/components/checklist-control/classes/abstract-checklist-control';
import { NestedNode, ChecklistControlService } from 'projects/toolbox/src/app/shared/components/checklist-control/services/checklist-control.service';
import { distinct, switchMap, map, distinctUntilChanged } from 'rxjs/operators';
import { InformationPipesService } from 'projects/toolbox/src/app/core/redux-queries/services/information-pipes.service';
import { ClassAndTypeNode } from 'projects/toolbox/src/app/modules/base/components/classes-and-types-select/classes-and-types-select.component';
import { equals } from 'ramda';

export interface ClassAndTypeSelectModel {
  classes?: number[]
  types?: number[]
}

export interface NodeData {
  label: string;
  pkClass?: number;
  pkType?: number;
}
export type ControlModel = ClassAndTypeSelectModel;

@Component({
  selector: 'gv-class-and-type-select',
  templateUrl: './class-and-type-select.component.html',
  styleUrls: ['./class-and-type-select.component.scss'],
  providers: [
    ChecklistControlService,
    { provide: MatFormFieldControl, useExisting: ClassAndTypeSelectComponent }
  ]
})
export class ClassAndTypeSelectComponent
  extends AbstractChecklistControl<NodeData, ControlModel>
  implements OnInit {
  /** Inputs the tree without information about selection and expansion */
  @Input() pkClasses$: Observable<number[]>;
  selectedText$ = new BehaviorSubject<string>('');

  constructor(
    public s: ChecklistControlService<NodeData>,
    @Optional() @Self() public ngControl: NgControl,
    private i: InformationPipesService
  ) {
    super(s, ngControl);

    s.getNodeId = (data: NodeData) => {
      return data.pkClass + '_' + data.pkType;
    };
  }
  ngOnInit() {
    if (!this.pkClasses$) throw new Error('You must provide nestedTree$ input');

    this.nestedTree$ = this.pkClasses$.pipe(
      distinctUntilChanged<number[]>(equals),
      switchMap(pkClasses => (!pkClasses || !pkClasses.length) ? of([] as ClassAndTypeNode[]) : this.i.pipeClassesAndTypesOfClasses(pkClasses)),
      map(nodes => nodes.map(node => {
        const children: NestedNode<NodeData>[] = node.children.map(typeNode => ({
          data: {
            label: typeNode.label,
            pkType: typeNode.data.pkType
          },
          children: []
        }))
        const t: NestedNode<NodeData> = {
          data: {
            label: node.label,
            pkClass: node.data.pkClass
          },
          children
        }
        return t
      })
      )
    )


    this.s.dataSource.data = [];
    this.nestedTree$.subscribe(tree => {
      this.s.dataSource.data = tree;
    });
  }

  /**
   * input for write value
   */
  controlModelToDataArray(m: ControlModel): NodeData[] {
    let selectedClasses: NodeData[] = [];
    let selectedTypes: NodeData[] = [];
    if (m && m.classes) {
      selectedClasses = m.classes.map(pkClass => ({ pkClass, label: '' }));
    }
    if (m && m.types) {
      selectedTypes = m.types.map(pkType => ({ pkType, label: '' }));
    }
    const treeNodeDatas: NodeData[] = [...selectedClasses, ...selectedTypes];
    return treeNodeDatas;
  }

  /**
   * output on value change
   */
  dataArrayToControlModel(ds: NodeData[]): ControlModel {
    const classes: number[] = [],
      types: number[] = [];
    ds.forEach(d => {
      if (d.pkClass) classes.push(d.pkClass);
      else if (d.pkType) types.push(d.pkType);
    });

    this.selectedText$.next(ds.map(d => d.label).join(', '))

    return { classes, types };
  }



  onOpen() {
    this.focused = true;
    //this.focus.emit();
  }
  onClose() {
    this.focused = false;
    this.onTouch();
    //this.blur.emit();
  }
}


export function classOrTypeRequiredCondition(model: ClassAndTypeSelectModel) {
  return (!model || !model ||
    [...(model.classes || []), ...(model.types || [])].length === 0);
}

/** At least one class or type must be selected */
export function classOrTypeRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const model: ClassAndTypeSelectModel = control.value;
    return classOrTypeRequiredCondition(model) ? { 'classOrTypeRequired': { value: control.value } } : null;
  };
}

@Directive({
  selector: '[gvClassOrTypeRequired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ClassOrTypeRequiredValidatorDirective, multi: true }]
})
export class ClassOrTypeRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return classOrTypeRequiredValidator()(control);
  }
}
