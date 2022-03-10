import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  items!: MenuItem[];
  isToggled: boolean = false;
  @Output() drawerToggler = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggleDrawer = () => this.drawerToggler.emit(!this.isToggled);
}
