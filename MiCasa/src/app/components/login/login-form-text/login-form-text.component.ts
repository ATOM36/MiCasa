import { AfterViewInit, Component, OnInit } from '@angular/core';
import { expandAnimation } from '@animations/expand';
@Component({
  selector: 'app-login-form-text',
  templateUrl: './login-form-text.component.html',
  styleUrls: ['./login-form-text.component.scss'],
  animations: [expandAnimation],
})
export class LoginFormTextComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
