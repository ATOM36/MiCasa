import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @Input() displayModal!: boolean;

  @Input() userType!: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userType = '';
  }
}
