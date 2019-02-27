import { sandboxOf } from 'angular-playground';
import { TreeNodeData } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { BehaviorSubject } from 'rxjs';
import { TreeChecklistSelectComponent } from './tree-checklist-select.component';
import { TreeChecklistModule } from '../tree-checklist.module';
import { TreeNode } from '../tree-checklist.component';





export default sandboxOf(TreeChecklistSelectComponent, {
    imports: [
        TreeChecklistModule
    ],
    declareComponent: false
})
    .add('Checklist Select', {
        context: {
            selectOptionsTree$: new BehaviorSubject([
                new TreeNode({ id: 1, label: 'Option' }),
                new TreeNode({ id: 8, label: 'Option C' }, [
                    new TreeNode({ id: 9, label: 'Option CA' }),
                ])            ]),
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
            ])],
            trackByFn: (index, item: TreeNode<TreeNodeData>) => {
                return item.data.id;
            },
            log: (e) => {
                console.log(e)
            }
        },
        template: `

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <mat-form-field>
                        <mat-label>Options</mat-label>
                        <gv-tree-checklist-select (selectionChange)="selected = $event; log($event)">
                            <gv-tree-checklist [treeData$]="selectOptionsTree$"></gv-tree-checklist>
                        </gv-tree-checklist-select>
                        <mat-hint>Hint</mat-hint>
                    </mat-form-field>
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
