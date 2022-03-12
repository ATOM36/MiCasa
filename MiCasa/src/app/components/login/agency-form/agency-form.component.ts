import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AgencyService } from '@services/api/agency/agency.service';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
})
export class AgencyFormComponent implements OnInit {
  generalInfo!: FormGroup;
  coordinatesControl!: FormGroup;
  securityControl!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AgencyService
  ) {}

  ngOnInit(): void {
    this.createControls();
  }

  /**
   * @summary Uses the injected FormBuilder to build FormGroups with given Validators
   */
  createControls() {
    this.generalInfo = this._formBuilder.group({
      Nom: [
        '',
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(3),
      ],

      Mail: [
        '',
        Validators.required,
        Validators.email,
        Validators.maxLength(45),
      ],

      NumeroTelephone: [
        '',
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(13),
      ],

      Adresse: [
        '',
        Validators.required,
        Validators.maxLength(45),
        Validators.minLength(10),
      ],
    });

    this.coordinatesControl = this._formBuilder.group({
      longitude: ['', Validators.pattern('[0-9]+\\.[0-9]+')],
      latitude: ['', Validators.pattern('[0-9]+\\.[0-9]+')],
    });

    this.securityControl = this._formBuilder.group({
      username: [
        '',
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ],

      password: [
        '',
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8),
      ],

      confirmPassword: [
        '',
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(8),
      ],
    });
  }
}
