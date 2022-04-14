import { Component, Input, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';

@Component({
  selector: 'app-agency-template',
  templateUrl: './agency-template.component.html',
  styleUrls: ['./agency-template.component.scss'],
})
export class AgencyTemplateComponent implements OnInit {
  @Input() agency!: Agence;

  constructor() {}

  ngOnInit(): void {}
}
