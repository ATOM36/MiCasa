import { Component, Input, OnInit } from '@angular/core';
import { Agence } from '@models/api/agency';

@Component({
  selector: 'app-agency-edit-template',
  templateUrl: './agency-edit-template.component.html',
  styleUrls: ['./agency-edit-template.component.scss'],
})
export class AgencyEditTemplateComponent implements OnInit {
  @Input() agency: Agence | undefined = {
    AgenceId: undefined,
    NumeroTelephone: undefined,
    Mail: undefined,
    Nom: undefined,
    Latitude: undefined,
    Longitude: undefined,
    DateInscription: undefined,
    IsBlocked: undefined,
    Adresse: undefined,
    Password: undefined,
    Username: undefined,
    Signalement: undefined,
  };

  @Input() agencyCopy: Agence | undefined;
  constructor() {}

  ngOnInit(): void {}
}
