import { Component, Input, OnInit } from '@angular/core';
import { Administrateur } from '@models/api/administrator';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() admin!: Administrateur;

  displayEditModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
