import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MiCasa';

  constructor(private router: Router) {}
  ngOnInit(): void {
    AOS.init();

    this.router.navigate(['/loading']).then(() =>
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2100)
    );
  }
}
