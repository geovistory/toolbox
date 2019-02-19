import { sandboxOf } from 'angular-playground';
import { of, BehaviorSubject } from 'rxjs';
import { TreeChecklistComponent, TreeNode } from './tree-checklist.component';
import { TreeChecklistModule } from './tree-checklist.module';
import { TreeNodeData } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { CommonModule } from '@angular/common';




export default sandboxOf(TreeChecklistComponent, {
    imports: [
        TreeChecklistModule
    ],
    declareComponent: false
})
    .add('Checklist ', {
        context: {
            selectOptionsTree$: new BehaviorSubject([
                new TreeNode({ id: 1, label: 'Option' }),
                new TreeNode({ id: 8, label: 'Option C' })
            ]),
            optionsA: [
                new TreeNode({ id: 2, label: 'Option A' }, [
                    new TreeNode({ id: 3, label: 'Option AA' }),
                    new TreeNode({ id: 4, label: 'Option AB' }),
                    new TreeNode({ id: 5, label: 'Option AC' }, [
                        new TreeNode({ id: 6, label: 'Option ACA' }),
                    ]),
                ]),
                new TreeNode({ id: 7, label: 'Option B' }),
                new TreeNode({ id: 8, label: 'Option C' }),

            ],
            optionsB: [new TreeNode({ id: 7, label: 'Option B' }, [
                new TreeNode({ id: 3, label: 'Option AA renamed' }),
                new TreeNode({ id: 8, label: 'Option C' }),
            ])]
        },
        template: `

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <mat-select gvTreeChecklistSelect multiple (selectionChange)="selected = $event.value" (optionsChange)="options = $event">
                        <gv-tree-checklist [treeData$]="selectOptionsTree$"></gv-tree-checklist>
                        <mat-option *ngFor="let item of options" [value]="item">{{item?.data?.label}}</mat-option>
                    </mat-select>
                </div>
                <div>
                    <button (click)="selectOptionsTree$.next(optionsA)">A</button>
                    <button (click)="selectOptionsTree$.next(optionsB)">B</button>
                    <p>Options: <span *ngFor="let o of options">{{o.data.label}} | </span></p>
                    <p>Selected: <span *ngFor="let s of selected">{{s.data.label}} |</span></p>

                </div>
            </div>
        `
    })
