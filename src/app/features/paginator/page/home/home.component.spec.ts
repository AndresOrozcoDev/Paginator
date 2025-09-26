import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { LocationsService } from '../../services/locations.service';
import { provideHttpClient } from '@angular/common/http';
import { CitiesResponse, City, State, StatesResponse } from '../../types/location';
import { of, throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockLocationsService: jasmine.SpyObj<LocationsService>;

  const dummyStates: State[] = [
    { id: '1', state: 'State 1' },
    { id: '2', state: 'State 2' }
  ];

  const dummyCities: City[] = [
    { id: 1, city: 'City 1', state: 'State 1', state_dane_code: '01', city_dane_code: '001' },
    { id: 2, city: 'City 2', state: 'State 2', state_dane_code: '02', city_dane_code: '002' }
  ];

  beforeEach(async () => {
    mockLocationsService = jasmine.createSpyObj('LocationsService', ['getCities', 'getStates']);

    mockLocationsService.getCities.and.returnValue(of([]));
    mockLocationsService.getStates.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, TableComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: LocationsService, useValue: mockLocationsService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cities and states on ngOnInit', () => {
    mockLocationsService.getCities.and.returnValue(of(dummyCities));
    mockLocationsService.getStates.and.returnValue(of(dummyStates));

    component.ngOnInit();

    expect(component.cities).toEqual(dummyCities);
    expect(component.states).toEqual(dummyStates);
    expect(mockLocationsService.getCities).toHaveBeenCalled();
    expect(mockLocationsService.getStates).toHaveBeenCalled();
  });

  it('should handle error when fetching cities', () => {
    const consoleSpy = spyOn(console, 'error');
    mockLocationsService.getCities.and.returnValue(throwError(() => new Error('Failed')));
    mockLocationsService.getStates.and.returnValue(of(dummyStates));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Error obteniendo las ciudades', jasmine.any(Error));
    expect(component.cities).toEqual([]);
  });

  it('should handle error when fetching states', () => {
    const consoleSpy = spyOn(console, 'error');
    mockLocationsService.getCities.and.returnValue(of(dummyCities));
    mockLocationsService.getStates.and.returnValue(throwError(() => new Error('Failed')));

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith('Error obteniendo los estados', jasmine.any(Error));
    expect(component.states).toEqual([]);
  });

});
