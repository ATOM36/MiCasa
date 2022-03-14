import { Component, OnInit } from '@angular/core';
import { Administrateur } from '@models/api/administrator';

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.scss'],
})
export class AgenceComponent implements OnInit {
  admin: Administrateur | undefined;
  constructor() {}

  ngOnInit(): void {}
}
