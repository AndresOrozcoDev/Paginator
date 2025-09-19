import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CitiesResponse, City, State, StatesResponse } from '../types/location';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {

  private baseUrl = 'https://api-lab-murex.vercel.app/api/location';

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http.get<StatesResponse>(`${this.baseUrl}/states`)
      .pipe(map(response => response.data));
  }

  getCities(): Observable<City[]> {
    return this.http.get<CitiesResponse>(`${this.baseUrl}/cities`)
      .pipe(map(response => response.data));
  }

}
