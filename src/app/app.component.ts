import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { OpenweatherService } from './openweather.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  weatherData: any;

  fiveDayWeather = [];
  nextHoursWeather = [
    {
      temperature: 55,
      precipitation: 0,
      dayIcon: '',
      timeOfDay: `3:00pm`
    },
    {
      temperature: 55,
      precipitation: 0,
      dayIcon: '',
      timeOfDay: `4:00pm`
    },
    {
      temperature: 55,
      precipitation: 0,
      dayIcon: '',
      timeOfDay: `5:00pm`
    },
    {
      temperature: 55,
      precipitation: 0,
      dayIcon: '',
      timeOfDay: `6:00pm`
    },
    {
      temperature: 55,
      precipitation: 0,
      dayIcon: '',
      timeOfDay: `7:00pm`
    }
  ];

  private openWeatherService = inject(OpenweatherService);

  ngOnInit() {

    // Example coordinates: London
    this.openWeatherService.getLosAngelesWeather(51.5074, -0.1278).subscribe({
      next: (data) => this.weatherData = data,
      error: (err) => console.error('Weather API error:', err)
    });
  }
}
