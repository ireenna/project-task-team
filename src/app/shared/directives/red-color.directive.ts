import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedColor]'
})
export class RedColorDirective {
  constructor(private el: ElementRef) {
      this.el.nativeElement.style.color = 'red';
}
}
