import { Directive, ElementRef, Input } from '@angular/core';
import { D3Service } from '../services/d3.service';

@Directive({
  selector: '[wrapText]',
  standalone: true
})
export class WrapTextDirective {

  @Input() wrapText: { text: string, width: number, padding: number };

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyWrapText(this._element.nativeElement, this.wrapText.text, this.wrapText.width, this.wrapText.padding);
  }
}
