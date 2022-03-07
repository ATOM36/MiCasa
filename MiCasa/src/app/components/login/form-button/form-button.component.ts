import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss'],
})
export class FormButtonComponent implements OnInit {
  @Output() modalController = new EventEmitter<boolean>();
  displayModal = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  browseContent = () => this.router.navigate(['/home']);

  displayRegistrationModal() {
    this.modalController.emit(true);
    console.log('Button emitted');
  }
}
