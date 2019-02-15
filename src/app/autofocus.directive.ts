import { Directive, ElementRef, AfterContentInit, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  constructor(private element: ElementRef) { }

  ngAfterContentInit() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 100);
  }
}
