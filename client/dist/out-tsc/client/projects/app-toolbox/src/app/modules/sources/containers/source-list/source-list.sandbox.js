import { RouterModule } from '@angular/router';
import { sandboxOf } from 'angular-playground';
import { QuillModule } from 'projects/app-toolbox/src/app/modules/quill';
import { KeysPipe } from 'projects/app-toolbox/src/app/shared/pipes/keys.pipe';
import { SourceListComponent } from './source-list.component';
export default sandboxOf(SourceListComponent, {
    imports: [
        RouterModule.forRoot([]),
        QuillModule,
    ],
    declarations: [
        KeysPipe
    ],
    providers: [
        KeysPipe,
    ]
})
    .add('Source-List | Source List', {
    context: {
        path: '',
        initState: {
            list: {
                '_source_1': {
                    id: 1,
                    version: 1,
                    label: 'Acta Muriensis'
                },
                '_source_2': {
                    id: 1,
                    version: 1,
                    label: 'Quelle B'
                }
            }
        }
    },
    template: `
    <div class="container-fluid">
      <gv-source-list [path]="path" [initState]="initState"></gv-source-list>
    </div>
   `
})
    .add('Source-List | Create Source', {
    context: {
        path: '',
        initState: {
            // should not be visible
            list: {
                '_source_1': {
                    id: 1,
                    version: 1,
                    label: 'Acta Muriensis'
                }
            },
            create: true
        }
    },
    template: `
    <div class="container-fluid">
      <gv-source-list [path]="path" [initState]="initState"></gv-source-list>
    </div>
   `
})
    // .add('Source-List | Edit Source', {
    //   context: {
    //     path: '',
    //     initState: {
    //       // should not be visible
    //       list: {
    //         '_source_1': {
    //           id: 1,
    //           version: 1,
    //           label: 'Acta Muriensis'
    //         }
    //       },
    //       edit: {
    //         view: {
    //           quill_doc: textBüchel,
    //           notes: 'Emmanuel Büchel',
    //         } as DatDigital
    //       }
    //     } as ISourceListState
    //   },
    //   template: `
    //   <div class="container-fluid d-flex flex-column" style="height:600px">
    //     <gv-source-list [path]="path" [initState]="initState" class="gv-grow-1 d-flex flex-column"></gv-source-list>
    //   </div>
    //  `
    // })
    // .add('Source-List | Edit Source see Annotations', {
    //   context: {
    //     path: '',
    //     initState: {
    //       // should not be visible
    //       list: {
    //         '_source_1': {
    //           id: 1,
    //           version: 1,
    //           label: 'Acta Muriensis'
    //         }
    //       },
    //       edit: {
    //         view: {
    //           quill_doc: textBüchel,
    //           notes: 'Emmanuel Büchel'
    //         } as DatDigital,
    //       }
    //     } as ISourceListState
    //   },
    //   template: `
    //   <div class="container-fluid d-flex flex-column" style="height:600px">
    //     <gv-source-list [path]="path" [initState]="initState" class="gv-grow-1 d-flex flex-column"></gv-source-list>
    //   </div>
    //  `
    // })
    .add('Source-List | Remove Source', {
    context: {
        path: '',
        initState: {
            // should not be visible
            list: {
                '_source_1': {
                    id: 1,
                    version: 1,
                    label: 'Acta Muriensis'
                }
            },
            remove: {
                id: 1,
                version: 1,
                label: 'Acta Muriensis'
            }
        }
    },
    template: `
    <div class="container-fluid d-flex flex-column" style="height:600px">
      <gv-source-list [path]="path" [initState]="initState" class="gv-grow-1 d-flex flex-column"></gv-source-list>
    </div>
   `
});
//# sourceMappingURL=source-list.sandbox.js.map