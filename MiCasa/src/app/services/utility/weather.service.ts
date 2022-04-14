import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Weather } from '@models/utility/weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<Weather> {
    const options = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', environment.openWeather.apiKey);

    return this.http.get<Weather>(`${environment.openWeather.apiUrl}weather`, {
      params: options,
    });
  }
}
