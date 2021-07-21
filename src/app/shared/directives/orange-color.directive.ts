import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOrangeColor]'
})
export class OrangeColorDirective {
  constructor(private el: ElementRef) {
      this.el.nativeElement.style.color = 'orange';
}
}
