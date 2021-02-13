import { sandboxOf } from 'angular-playground';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { CtrlLangStringComponent } from './ctrl-lang-string.component';
import { BaseModule } from '../../base.module';
export default sandboxOf(CtrlLangStringComponent, {
    declareComponent: false,
    imports: [
        MatFormFieldModule,
        FormsModule,
        BaseModule
    ]
})
    .add('CtrlLangString | New ', {
    context: {
        model: {
            foo: 'Hello World'
        },
        parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-lang-string placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-lang-string>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                    </mat-form-field>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
})
    .add('CtrlLangString | Existing Language and Text ', {
    context: {
        model: {
            fk_concerned_entity: 123,
            fk_class_field: 567,
            quill_doc: {
                "latestId": 2,
                "ops": [
                    {
                        "attributes": {
                            "charid": "2"
                        },
                        "insert": "a"
                    },
                    {
                        "attributes": {
                            "blockid": "1"
                        },
                        "insert": "\n"
                    }
                ]
            },
            language: {
                "fk_class": 54,
                "pk_language": "spo",
                "lang_type": "living",
                "scope": "individual",
                "iso6392b": null,
                "iso6392t": null,
                "iso6391": null,
                "notes": "Spokane",
                "pk_entity": 23053
            }
        },
        parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-lang-string placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-lang-string>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                    </mat-form-field>
                </form>
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
});
//# sourceMappingURL=ctrl-lang-string.sandbox.js.map