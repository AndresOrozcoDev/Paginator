import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CitiesResponse, CityFilters, StatesResponse, State } from '../types/location';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStates(): Observable<StatesResponse> {
    return this.http.get<StatesResponse>(`${this.baseUrl}/states`);
  }

  getCities(filters: CityFilters): Observable<CitiesResponse> {
    let params = new HttpParams();

    if (filters.state) {
      params = params.set('state', filters.state);
    }

    if (filters.pageSize) {
      params = params.set('pageSize', filters.pageSize.toString());
    }

    if (filters.page) {
      params = params.set('page', filters.page.toString());
    }

    return this.http.get<CitiesResponse>(`${this.baseUrl}/cities`, { params });
  }

}
