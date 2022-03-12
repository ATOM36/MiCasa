import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sidebarComponents]',
})
export class SidebarDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
