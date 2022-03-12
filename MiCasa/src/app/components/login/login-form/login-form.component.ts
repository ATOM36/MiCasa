import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService],
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

  loginImage: string = 'assets/img/static/pexels-taryn-elliott-4112234.jpg';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  trial = () => {
    this.messageService.add({
      severity: 'Primary',
      summary: 'Good',
      detail: 'welcome dear user',
    });
  };

  isMobile = (): boolean => window.screen.width <= 896;
}
