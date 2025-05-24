import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenweatherService {
  private httpClient = inject(HttpClient);
  BASE_URL = '';
  apiKey = '767005277f5dcb868a850e47c5e776ab';
  exampleUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=40.7128&lon=74.0060&appid=767005277f5dcb868a850e47c5e776ab`;
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


  getLosAngelesWeather(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric'); 
    const url = `${this.apiUrl}?q=Los Angeles,us&appid=${this.apiKey}&units=metric`;
    return this.httpClient.get(url, {params});
  }
}
