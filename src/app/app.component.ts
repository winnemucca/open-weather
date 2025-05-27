import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { OpenweatherService } from './openweather.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { DegreePipe } from './degree.pipe';
import { PercentPipe } from '@angular/common';
import { TimeStampPipe } from './timestamp.pipe';
import { Next12, DailySummary } from './weather-models';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    DegreePipe,
    PercentPipe,
    TimeStampPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  dailyForecasts: DailySummary[] = [];
  nextTwelveHours: Next12[] | undefined = [];
  showCitySearch = false;

  private openWeatherService = inject(OpenweatherService);

  ngOnInit() {
    this.findCityWeather('Los Angeles');
    this.findTwelveHours(34.0549, 118.2426)
  }

  showSearch() {
    this.showCitySearch = !this.showCitySearch;
  }
  
  findCityWeather(city: string) {

    this.openWeatherService.getFiveDayForecast(city)
      .subscribe({
        next: (data) => this.dailyForecasts = this.processForecast((data.list)),
        error: (err) => console.error('Weather API error:', err)
      });
  }

  processForecast(list: any): DailySummary[] {
    const dailyMap: { [date: string]: any[] } = {};

    list.forEach((entry: any) => {
      const date = entry.dt_txt.split(' ')[0];
      if (!dailyMap[date]) {
        dailyMap[date] = [];
      }
      dailyMap[date].push(entry);
    });

    const summaries: DailySummary[] = [];

    for (const date in dailyMap) {
      const entries = dailyMap[date];

      const dated = new Date(date);
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      };
  
      const formattedDate = dated.toLocaleDateString('en-US', (options as any));
      const temps = entries.map(e => e.main.temp);
      const minTemps = entries.map(e => e.main.temp_min);
      const maxTemps = entries.map(e => e.main.temp_max);
      const descriptions = entries.map(e => e.weather[0].description);
      const icons = entries.map(e => e.weather[0].icon)
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      const minTemp = Math.round(Math.min(...minTemps));
      const maxTemp = Math.round(Math.max(...maxTemps));

      const description = this.mostFrequent(descriptions);
      const icon = this.mostFrequent(icons);
      summaries.push({ formattedDate, avgTemp, minTemp, maxTemp, description, icon });
    }

    return summaries.slice(1);
  }

  findTwelveHours(lat: number, lon: number) {
    this.openWeatherService.getNext12Hours(lat, lon)
    .subscribe({
      next: data => {
        const hourReturn = data?.hourly?.slice(1,12)
        this.nextTwelveHours = hourReturn?.map(hour => ({
          temp: Math.round(hour.temp),
          time: hour.dt,
          icon: hour.weather[0].icon,
          prec: hour.pop,
        }))
      },
      error: (err) => console.error('Weather API error: (find twelve)', err)
    });
  }

  private mostFrequent(arr: string[]): string {
    const countMap: { [key: string]: number } = {};
    arr.forEach(desc => {
      countMap[desc] = (countMap[desc] || 0) + 1;
    });
    return Object.entries(countMap).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }
}
