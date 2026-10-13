import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {ErrorHandlingEnabledBaseType} from '../../shared/infrastructure/error-handling-enabled-base-type';
import {environment} from '../../../environments/environment';

@Service()
export class WeatherService extends ErrorHandlingEnabledBaseType {
  private http = inject(HttpClient);

  getCurrentTemperature(latitude: number, longitude: number): Observable<number | null> {
    const url = `${environment.weatherApiBaseUrl}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    return this.http.get<any>(url).pipe(
      map(response => response?.current?.temperature_2m ?? null),
      catchError(this.handleError('Failed to fetch weather data'))
    );
  }
}
