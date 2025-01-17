import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgControl, Validator, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { ClassAndTypeNode, ClassAndTypeSelectModel, InformationPipesService } from '@kleiolab/lib-redux';
import { equals } from 'ramda';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { AbstractChecklistControl } from '../../../../lib/classes/abstract-checklist-control';
import { ChecklistControlService, NestedNode } from '../../../../services/checklist-control.service';


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
  ],
  standalone: true,
  imports: [MatMenuModule, NgIf, MatTreeModule, MatButtonModule, MatCheckboxModule, MatIconModule, AsyncPipe]
})
export class ClassAndTypeSelectComponent
  extends AbstractChecklistControl<NodeData, ControlModel>
  implements OnInit {
  /** Inputs the tree without information about selection and expansion */
  @Input() pkClasses$: Observable<number[]>;
  selectedText$ = new BehaviorSubject<string>('');

  constructor(
    public override s: ChecklistControlService<NodeData>,
    @Optional() @Self() public override ngControl: NgControl,
    private i: InformationPipesService
  ) {
    super(s, ngControl);

    s.getNodeId = (data: NodeData) => {
      return data.pkClass + '_' + data.pkType;
    };
  }
  override ngOnInit() {
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
  providers: [{ provide: NG_VALIDATORS, useExisting: ClassOrTypeRequiredValidatorDirective, multi: true }],
  standalone: true
})
export class ClassOrTypeRequiredValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return classOrTypeRequiredValidator()(control);
  }
}
