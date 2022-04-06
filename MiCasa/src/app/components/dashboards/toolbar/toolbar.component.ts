import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { Agence } from '@models/api/agency';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() location!: string;
  @Input() agency: Agence | undefined;
  @Input() admin: Administrateur | undefined;
  @Input() sidenav!: MatSidenav;

  constructor() {}

  ngOnInit(): void {}
}
