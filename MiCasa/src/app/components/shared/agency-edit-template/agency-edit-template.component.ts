import { Component, Input, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';

@Component({
  selector: 'app-agency-edit-template',
  templateUrl: './agency-edit-template.component.html',
  styleUrls: ['./agency-edit-template.component.scss'],
})
export class AgencyEditTemplateComponent implements OnInit {
  @Input() agency!: Agence;

  @Input() agencyCopy: Agence | undefined;
  constructor() {}

  ngOnInit(): void {}
}
