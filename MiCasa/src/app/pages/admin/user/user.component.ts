import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setLocation } from '@utility/location-handler';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setLocation(this.router.url);
  }
}
