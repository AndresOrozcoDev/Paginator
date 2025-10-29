import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { LocationsService } from '../../services/locations.service';
import { provideHttpClient } from '@angular/common/http';
import { CitiesResponse, City, Pagination, State, StatesResponse } from '../../types/location';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersComponent } from '../../components/filters/filters.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../../core/services/theme.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockLocationsService: jasmine.SpyObj<LocationsService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  const dummyStates: State[] = [
    { id: '1', state: 'State 1' },
    { id: '2', state: 'State 2' }
  ];

  const dummyCities: City[] = [
    { id: '1', city: 'Medellín', city_dane_code: '05001', state_dane_code: '05', state: 'Antioquia' },
    { id: '2', city: 'Envigado', city_dane_code: '05266', state_dane_code: '05', state: 'Antioquia' }
  ];

  const dummyPagination: Pagination = {
    total: 2,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10
  };

  beforeEach(async () => {
  mockLocationsService = jasmine.createSpyObj('LocationsService', ['getCities', 'getStates']);
  mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  mockThemeService = jasmine.createSpyObj('ThemeService', ['initializeTheme']);

  await TestBed.configureTestingModule({
    declarations: [HomeComponent, HeaderComponent, TableComponent, FiltersComponent, PaginationComponent],
    imports: [ReactiveFormsModule],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: LocationsService, useValue: mockLocationsService },
      { provide: Router, useValue: mockRouter }, // ✅ FALTABA ESTO
      { provide: ThemeService, useValue: mockThemeService },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { queryParams: {} },
          queryParams: of({})
        }
      }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(HomeComponent);
  component = fixture.componentInstance;

  mockLocationsService.getStates.and.returnValue(of({
    success: true,
    message: 'OK',
    status: 200,
    data: []
  }));
  mockLocationsService.getCities.and.returnValue(of({
    success: true,
    message: 'OK',
    status: 200,
    totalRecords: 0,
    data: [],
    pagination: { total: 0, totalPages: 0, currentPage: 1, pageSize: 10 }
  }));

  component.filtersComponent = jasmine.createSpyObj('FiltersComponent', ['initFromQueryParams']);
  fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load states on getStates()', () => {
    mockLocationsService.getStates.and.returnValue(of({
      success: true,
      message: 'OK',
      status: 200,
      data: dummyStates
    }));

    (component as any).getStates();

    expect(mockLocationsService.getStates).toHaveBeenCalled();
    expect(component.states).toEqual(dummyStates);
  });

  it('should load cities on getCities()', () => {
    mockLocationsService.getCities.and.returnValue(of({
      success: true,
      message: 'OK',
      status: 200,
      totalRecords: 2,
      data: dummyCities,
      pagination: dummyPagination
    }));

    (component as any).getCities({ state: '05', page: 1, pageSize: 10 });

    expect(mockLocationsService.getCities).toHaveBeenCalledWith({ state: '05', page: 1, pageSize: 10 });
    expect(component.cities).toEqual(dummyCities);
    expect(component.pagination).toEqual(dummyPagination);
  });

  it('should handle error in getCities()', () => {
    spyOn(console, 'error');
    mockLocationsService.getCities.and.returnValue(throwError(() => ({ status: 404 })));

    (component as any).getCities({ state: '05' });

    expect(console.error).toHaveBeenCalledWith('Error obteniendo ciudades', { status: 404 });
  });

  it('should navigate with state param on onStateChanged()', () => {
    component['route'].snapshot.queryParams = { pageSize: 10 };
    component.onStateChanged('05');
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { pageSize: 10, state: '05', page: 1 },
      queryParamsHandling: 'merge'
    });
  });

  it('should navigate with pageSize param on onPageSizeChanged()', () => {
    component['route'].snapshot.queryParams = { state: '05', page: 2 };
    component.onPageSizeChanged(20);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { state: '05', page: 1, pageSize: 20 },
      queryParamsHandling: 'merge'
    });
  });

  it('should navigate with page param on onPageChanged()', () => {
    component['route'].snapshot.queryParams = { state: '05', pageSize: 10 };
    component.onPageChanged(3);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { state: '05', pageSize: 10, page: 3 },
      queryParamsHandling: 'merge'
    });
  });

  it('should react to query param changes by reloading cities', () => {
    const route = TestBed.inject(ActivatedRoute);
    const newParams = { state: '11', pageSize: 5, page: 2 };
    (route as any).queryParams = of(newParams);

    mockLocationsService.getCities.and.returnValue(of({
      success: true,
      message: 'OK',
      status: 200,
      totalRecords: 2,
      data: dummyCities,
      pagination: dummyPagination
    }));

    (component as any).watchQueryParams();

    expect(mockLocationsService.getCities).toHaveBeenCalledWith({ state: '11', pageSize: 5, page: 2 });
  });

});
