import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appDropdown]',
})

export class DropdownDirective {
/*  isOpen: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen)
      this.renderer.addClass(this.el.nativeElement, "open");
    else
      this.renderer.removeClass(this.el.nativeElement, "open");
  }*/

  @HostBinding('class.open') isOpen = false;

/*  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }*/

  // что бы можно было закрывать с любой точки
  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
