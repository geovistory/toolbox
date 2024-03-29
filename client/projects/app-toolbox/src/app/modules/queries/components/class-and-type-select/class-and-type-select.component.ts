import { Component, Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, NgControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ClassAndTypeNode, ClassAndTypeSelectModel, InformationPipesService } from '@kleiolab/lib-queries';
import { AbstractChecklistControl } from 'projects/app-toolbox/src/app/shared/components/checklist-control/classes/abstract-checklist-control';
import { ChecklistControlService, NestedNode } from 'projects/app-toolbox/src/app/shared/components/checklist-control/services/checklist-control.service';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';


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


    this.s.setData([]);
    this.nestedTree$.subscribe(tree => {
      this.s.setData(tree);
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
