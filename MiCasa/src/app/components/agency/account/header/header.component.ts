import { Component, Input, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() agency!: Agence;
  displayEditModal: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
