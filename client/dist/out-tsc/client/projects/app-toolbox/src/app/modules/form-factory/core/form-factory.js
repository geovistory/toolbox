export class FormFactory {
    constructor(formGroup, formGroupFactory) {
        this.formGroup = formGroup;
        this.formGroupFactory = formGroupFactory;
    }
    markAllAsTouched() {
        this.formGroupFactory.markAllAsTouched();
    }
}
//# sourceMappingURL=form-factory.js.map