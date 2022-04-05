import { Component, OnInit } from '@angular/core';
import { Weather } from '@models/utility/weather';
import { WeatherService } from '@services/utility/weather.service';
import { isSmallScreen } from '@utility/screen-size';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather!: Weather;
  isSmall = isSmallScreen();
  constructor(private _service: WeatherService) {}

  ngOnInit(): void {
    this._service
      .getWeather('Monastir')
      .subscribe((weather) => (this.weather = weather));
  }
}
