import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CityInfo } from './weather-models';
@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {

  private httpClient = inject(HttpClient);
  apiKey = '767005277f5dcb868a850e47c5e776ab';

  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiUrl3 = 'https://api.openweathermap.org/data/3.0/onecall';

  getFiveDayForecast(city: string = 'Los Angeles'): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.httpClient.get(url)
      .pipe();
  }

  getNext12Hours(lat: number, lon: number): Observable<Partial<CityInfo>> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('exclude', 'current,minutely,daily,alerts')
      .set('appid', this.apiKey)
      .set('units', 'imperial');

    return this.httpClient.get(this.apiUrl3, { params })
    .pipe(
    )
  }

}
