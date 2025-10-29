import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { LocationsService } from './locations.service';
import { provideHttpClient } from '@angular/common/http';
import { CitiesResponse } from '../types/location';
import { environment } from '../../../../environments/environment';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting(), LocationsService]
    });
    service = TestBed.inject(LocationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle HTTP errors gracefully in getStates()', () => {
    service.getStates().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/states`);
    expect(req.request.method).toBe('GET');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });

  it('should send correct query parameters in getCities()', () => {
    const filters = { state: '05', pageSize: 10, page: 2 };
    const mockResponse: CitiesResponse = {
      status: 200,
      success: true,
      message: 'OK',
      totalRecords: 100,
      data: [
        { id: '1', city: 'Medellín', city_dane_code: '05001', state_dane_code: '05', state: 'Antioquia' }
      ],
      pagination: { total: 100, totalPages: 10, currentPage: 2, pageSize: 10 }
    };

    service.getCities(filters).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.data[0].city).toBe('Medellín');
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${baseUrl}/cities` &&
        request.params.get('state') === '05' &&
        request.params.get('pageSize') === '10' &&
        request.params.get('page') === '2'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call getCities() without params when no filters are provided', () => {
    const mockResponse: CitiesResponse = {
      status: 200,
      success: true,
      message: 'OK',
      totalRecords: 1,
      data: [
        { id: '1', city: 'Bogotá', city_dane_code: '11001', state_dane_code: '11', state: 'Cundinamarca' }
      ],
      pagination: { total: 1, totalPages: 1, currentPage: 1, pageSize: 10 }
    };

    service.getCities({}).subscribe(response => {
      expect(response.data[0].city).toBe('Bogotá');
    });

    const req = httpMock.expectOne((request) => request.url === `${baseUrl}/cities`);
    expect(req.request.params.keys().length).toBe(0);
    req.flush(mockResponse);
  });

  it('should handle HTTP errors gracefully in getCities()', () => {
    const filters = { state: '05' };

    service.getCities(filters).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`${baseUrl}/cities?state=05`);
    expect(req.request.method).toBe('GET');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

});
