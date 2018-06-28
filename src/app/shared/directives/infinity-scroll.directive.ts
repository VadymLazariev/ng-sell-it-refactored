import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfinityScrollDirective {

  @Output() scrolledToBottom = new EventEmitter();

  constructor(private element:ElementRef) { }

  @HostListener('window:scroll')
  public onScroll() {
    if (window.scrollY + window.innerHeight + 50 > this.element.nativeElement.scrollHeight) {
      this.scrolledToBottom.emit();
      console.log('Infinite scroll is working');
    }
  }
}
