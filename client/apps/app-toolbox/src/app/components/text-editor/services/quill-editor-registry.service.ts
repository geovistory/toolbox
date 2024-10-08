import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import type { QuillEditorService } from './quill-editor.service';

@Injectable({
  providedIn: 'root'
})
export class QuillEditorRegistryService {

  private registry = new Map<Element, QuillEditorService>()
  registerService(scrollDomElement: Element, service: QuillEditorService, destroy$: Observable<boolean>) {
    this.registry.set(scrollDomElement, service)
    destroy$.pipe(first(x => x == true)).subscribe(() => {
      this.unregisterService(scrollDomElement)
    })
  }
  unregisterService(scrollDomElement: Element) {
    this.registry.delete(scrollDomElement)
  }
  getService(scrollDomElement: Element) {
    return this.registry.get(scrollDomElement)
  }

}
