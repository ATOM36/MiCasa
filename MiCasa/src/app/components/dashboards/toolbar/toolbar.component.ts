import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Administrateur } from '@models/api/administrator';
import { Agence } from '@models/api/agency';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isToggled!: boolean;
  location!: string;
  @Input() agency: Agence | undefined;
  @Input() admin: Administrateur | undefined;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation = () =>
    this._activatedRoute.data.subscribe(
      (res) => (this.location = res['origin'])
    );

  /**
   * @summary See that the EventEmitter has some problems with booleans, isToggled value is assigned with brute force
   * @param answer Emitted by the SidebarComponent
   * @returns
   */
  listenToClosing = (answer: boolean) => (this.isToggled = false);
}
