import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { isSmallScreen } from '@utility/screen-size';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  authLinks = [
    {
      id: 1,
      label: 'Connexion avec Google',
      icon: 'pi pi-google',
      class: 'p-button-raised p-button-rounded p-button-danger btn-block',
      styleClass: 'google',
    },
    {
      id: 2,
      label: 'Connexion avec Facebook',
      icon: 'pi pi-facebook',
      class: 'p-button-raised p-button-rounded p-button-primary btn-block',
      styleClass: 'facebook',
    },
    {
      id: 3,
      label: 'Connexion avec Twitter',
      icon: 'pi pi-twitter',
      class: 'p-button-raised p-button-rounded p-button-info btn-block',
      styleClass: 'twitter',
    },
  ];

  wantsAuth: boolean = false;

  isSmall = isSmallScreen();
  constructor() {}

  ngOnInit(): void {}

  isMobile = (): boolean => window.screen.width <= 900;
}
