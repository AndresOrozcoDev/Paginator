import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { LocationsService } from './locations.service';
import { provideHttpClient } from '@angular/common/http';
import { City, State } from '../types/location';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpMock: HttpTestingController;

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

  it('getStates() should return an array of states', () => {
    const mockStates: State[] = [
      { id: '1', state: 'California' },
      { id: '2', state: 'Texas' }
    ];

    service.getStates().subscribe(states => {
      expect(states.length).toBe(2);
      expect(states).toEqual(mockStates);
    });

    const req = httpMock.expectOne('https://api-lab-murex.vercel.app/api/location/states');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockStates });
  });

  it('getCities() should return an array of cities', () => {
    const mockCities: City[] = [
      { id: 1, city: 'Los Angeles', state: 'California', state_dane_code: '06', city_dane_code: '001' },
      { id: 2, city: 'Houston', state: 'Texas', state_dane_code: '48', city_dane_code: '002' }
    ];

    service.getCities().subscribe(cities => {
      expect(cities.length).toBe(2);
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne('https://api-lab-murex.vercel.app/api/location/cities');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockCities });
  });

  it('should handle HTTP errors gracefully in getStates()', () => {
    service.getStates().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne('https://api-lab-murex.vercel.app/api/location/states');
    expect(req.request.method).toBe('GET');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });

  it('should handle HTTP errors gracefully in getCities()', () => {
    service.getCities().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('https://api-lab-murex.vercel.app/api/location/cities');
    expect(req.request.method).toBe('GET');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

});
