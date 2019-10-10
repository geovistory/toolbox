import { sandboxOf } from 'angular-playground';
import { InfTextProperty } from 'app/core/sdk';
import { Information2Module } from '../../information.module';
import { TextPropertyComponent } from './text-property.component';
import { QuillDoc } from '../../../quill';
import { InfLanguage, InfLanguageInterface, SysConfig } from '../../../../core';




export default sandboxOf(TextPropertyComponent, {
    declareComponent: false,
    imports: [
        Information2Module
    ]
})
    .add('Text-Property Ctrl | New ', {
        context: {
            model: {},
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <gv-text-property name="textProperty" [(ngModel)]="model.textProperty" #textProperty="ngModel" required></gv-text-property>
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

            </div>
        </div>`
    })
    .add('Text-Property Ctrl | Edit ', {
        context: {
            model: {
                textProperty: {
                    fk_language: 19703,
                    fk_class_field: SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION,
                    fk_concerned_entity: undefined,
                    quill_doc: {
                        latestId: 3,
                        ops: [
                            {
                                insert: 'Hallo',
                                attributes: {
                                    node: 1
                                }
                            },
                            {
                                insert: ' ',
                                attributes: {
                                    node: 2
                                }
                            },
                            {
                                insert: 'Welt',
                                attributes: {
                                    node: 3
                                }
                            }
                        ]
                    } as QuillDoc,
                    language: {
                        fk_class: 54,
                        pk_language: 'ita',
                        lang_type: 'living',
                        scope: 'individual',
                        iso6392b: 'ita',
                        iso6392t: 'ita',
                        iso6391: 'it ',
                        notes: 'Italian',
                        pk_entity: 19703
                    } as InfLanguageInterface,
                } as InfTextProperty
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <gv-text-property name="textProperty" [(ngModel)]="model.textProperty" #textProperty="ngModel" required></gv-text-property>
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

            </div>
        </div>`
    })
