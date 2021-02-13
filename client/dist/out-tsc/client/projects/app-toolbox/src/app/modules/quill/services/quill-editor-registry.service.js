import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
let QuillEditorRegistryService = class QuillEditorRegistryService {
    constructor() {
        this.registry = new Map();
    }
    registerService(scrollDomElement, service, destroy$) {
        this.registry.set(scrollDomElement, service);
        destroy$.pipe(first(x => x == true)).subscribe(() => {
            this.unregisterService(scrollDomElement);
        });
    }
    unregisterService(scrollDomElement) {
        this.registry.delete(scrollDomElement);
    }
    getService(scrollDomElement) {
        return this.registry.get(scrollDomElement);
    }
};
QuillEditorRegistryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], QuillEditorRegistryService);
export { QuillEditorRegistryService };
//# sourceMappingURL=quill-editor-registry.service.js.map