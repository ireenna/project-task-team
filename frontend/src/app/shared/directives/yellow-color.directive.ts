import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appYellowColor]'
})

export class YellowColorDirective {
  constructor(private el: ElementRef) {
      this.el.nativeElement.style.color = 'yellow';
}

}
