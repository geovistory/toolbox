import { Directive, Input, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';

@Directive({
  selector: '[gvPanelBody]'
})
export class PanelBodyDirective extends CdkPortalOutlet {
  @Input() gvPanelId: number;

  constructor(public eleRef: ElementRef,
    _componentFactoryResolver: ComponentFactoryResolver,
    _viewContainerRef: ViewContainerRef
  ) { super(_componentFactoryResolver, _viewContainerRef) }

}
