const url = 'http://localhost:4400';
window['env'] = {
  ...window['env'],
  apiUrl: url,
  assetsUrl: url,
  apiVersion: 'lb3-api'
}
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, EnvironmentInjector, NgModule, ProviderToken, importProvidersFrom, inject, runInInjectionContext } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { Preview, applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class MatIconRegistryModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(url + '/assets/mdi/mdi.svg'));
    matIconRegistry.addSvgIconSetInNamespace('gv', domSanitizer.bypassSecurityTrustResourceUrl(url + '/assets/gv-icons.svg'));
  }
}
@Component({
  selector: 'gv-injector',
  template: `<ng-content></ng-content>`,
  standalone: false,
})
export class InjectorComponent {
  constructor(el: ElementRef) {
    const environmentInjector = inject(EnvironmentInjector);
    // expose inject() via native element
    el.nativeElement.inject = <S>(injectionToken: ProviderToken<S>) => {
      return new Promise<S>((res) => {
        runInInjectionContext(environmentInjector, () => {
          const injectedInstance = inject(injectionToken);
          res(injectedInstance);
        });
      });
    }
  }
}


const preview: Preview = {
  decorators: [
    applicationConfig({ providers: [importProvidersFrom(MatIconRegistryModule)] }),
    moduleMetadata({
      declarations: [InjectorComponent],
    }),
    componentWrapperDecorator(
      (story) => `<gv-injector>${story}</gv-injector>`
    ),
  ],

};

export default preview;
