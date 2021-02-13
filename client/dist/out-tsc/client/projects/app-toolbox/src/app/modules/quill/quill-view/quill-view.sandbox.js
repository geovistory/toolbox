import { sandboxOf } from "angular-playground";
import { QuillService } from "../quill.service";
import { QuillViewComponent } from "./quill-view.component";
const contents = {
    "ops": [
        {
            "attributes": {
                "node": "11",
                "bold": true
            },
            "insert": "Emmanuel"
        },
        {
            "attributes": {
                "node": "12"
            },
            "insert": " "
        },
        {
            "attributes": {
                "node": "13"
            },
            "insert": "Büchel"
        },
        {
            "insert": "\n"
        }
    ]
};
export default sandboxOf(QuillViewComponent, {
    imports: [],
    declarations: [],
    providers: [
        QuillService
    ]
})
    .add('Quill-View | Default ', {
    context: {
        contents
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <gv-quill-view [contents]="contents"></gv-quill-view>
                </div>                             
            </div>
        </div>
        `
})
    .add('Quill-View | Format Italic ', {
    context: {
        contents,
        formatItalic: true
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="col-3">
                <gv-quill-view [contents]="contents" [formatItalic]="formatItalic"></gv-quill-view>
            </div>                             
        </div>
    </div>
    `
});
//# sourceMappingURL=quill-view.sandbox.js.map