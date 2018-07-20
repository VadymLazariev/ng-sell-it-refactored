import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appScrollTop]',
})

export class ScrollTopDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click')
  public onClick() {
    window.scroll({top: 0, behavior: "smooth"});
  }

  @HostListener("window:scroll", [])
  public onScroll() {
    if (window.pageYOffset > 100) {
      this._displayButton('block');
    } else {
      this._displayButton('none');
    }
  }

  private _displayButton(val: string) {
    this.renderer.setStyle(this.element.nativeElement, "display", val);
  }
}

