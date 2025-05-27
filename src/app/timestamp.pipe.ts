import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStamp'
})
export class TimeStampPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';

    return this.convertTimestampToTime(value);
  }

  private convertTimestampToTime(timestamp: number) {
    
    const date = new Date(timestamp * 1000);
  
    const hours = date.getHours();
    const standardHours = hours % 12 === 0 ? 12 : hours % 12;

    const minutes = date.getMinutes();

    const formattedTime = `${standardHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

}

