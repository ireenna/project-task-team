import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGreenColor]'
})
export class GreenColorDirective {
    constructor(private el: ElementRef) {
        this.el.nativeElement.style.color = 'green';
  }

}
