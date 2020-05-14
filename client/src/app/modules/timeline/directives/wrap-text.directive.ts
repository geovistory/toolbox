import { Directive, Input, ElementRef } from '@angular/core';
import { D3Service } from '../shared/d3.service';

@Directive({
  selector: '[wrapText]'
})
export class WrapTextDirective {

  @Input() wrapText: {text:string, width:number, padding:number};

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyWrapText(this._element.nativeElement, this.wrapText.text, this.wrapText.width, this.wrapText.padding);
  }
}
