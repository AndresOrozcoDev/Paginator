import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CitiesResponse, State, StatesResponse } from '../types/location';

export interface CityFilters {
  state?: string;
  pageSize?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})

export class LocationsService {

  // private baseUrl = 'http://localhost:3000/api/v2/location';
  private baseUrl = 'https://api-lab-murex.vercel.app/api/v2/location';

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http
      .get<StatesResponse>(`${this.baseUrl}/states`)
      .pipe(map(response => response.data));
  }

  getCities(filters: CityFilters = {}): Observable<CitiesResponse> {
    const params = this.buildParams(filters);
    return this.http.get<CitiesResponse>(`${this.baseUrl}/cities`, { params });
  }

  getCitiesByState(stateId: string, filters: Omit<CityFilters, 'state'> = {}): Observable<CitiesResponse> {
    const params = this.buildParams(filters);
    return this.http.get<CitiesResponse>(`${this.baseUrl}/states/${stateId}`, { params });
  }

  private buildParams(filters: CityFilters): HttpParams {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }

}
