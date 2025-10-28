import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { City, CityFilters, Pagination, State } from '../../types/location';
import { LocationsService } from '../../services/locations.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersComponent } from '../../components/filters/filters.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {

  states: State[] = [];
  cities: City[] = [];
  @ViewChild(FiltersComponent) filtersComponent!: FiltersComponent;

  private initialQueryParams: any;
  pagination!: Pagination;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationsService,
    public themeService: ThemeService
  ) {
    this.themeService.initializeTheme();
  }

  ngOnInit(): void {
    this.getStates();
    this.watchQueryParams();

    this.route.queryParams.subscribe(params => {
      this.initialQueryParams = params;
    });
  }

  ngAfterViewInit(): void {
    const state = this.initialQueryParams?.state || null;
    const pageSize = this.initialQueryParams?.pageSize ? +this.initialQueryParams.pageSize : 10;
    const page = this.initialQueryParams?.page ? +this.initialQueryParams.page : 1;

    // Pasamos los query params al filtro
    this.filtersComponent.initFromQueryParams(state, pageSize);

    // Traemos las ciudades
    this.getCities({ state, pageSize, page });
  }

  private watchQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const state = params['state'] || null;
      const pageSize = params['pageSize'] ? +params['pageSize'] : 10;
      const page = params['page'] ? +params['page'] : 1;

      // Actualiza los filtros visuales
      this.filtersComponent?.initFromQueryParams(state, pageSize);

      // Trae las ciudades cada vez que cambia cualquier filtro
      this.getCities({ state, pageSize, page });
    });
  }

  private getCities(filters: CityFilters): void {
    this.locationService.getCities(filters).subscribe({
      next: resp => {
        if (resp.success) {
          this.cities = resp.data;
          this.pagination = resp.pagination;
        } else {
          console.warn('Backend message:', resp.message);
        }
      },
      error: err => console.error('Error obteniendo ciudades', err)
    });
  }

  private getStates(): void {
    this.locationService.getStates().subscribe({
      next: resp => {
        if (resp.success) {
          this.states = resp.data;
        } else {
          console.warn('Backend message:', resp.message);
        }
      },
      error: err => console.error('Error obteniendo estados', err)
    });
  }

  onStateChanged(state: string | null): void {
    const currentQueryParams = { ...this.route.snapshot.queryParams };
    this.router.navigate([], {
      queryParams: {
        ...currentQueryParams,
        state: state || null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  onPageSizeChanged(pageSize: number): void {
    const currentQueryParams = { ...this.route.snapshot.queryParams };
    this.router.navigate([], {
      queryParams: {
        ...currentQueryParams,
        pageSize,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  onPageChanged(page: number): void {
    const currentQueryParams = { ...this.route.snapshot.queryParams };
    this.router.navigate([], {
      queryParams: {
        ...currentQueryParams,
        page
      },
      queryParamsHandling: 'merge'
    });
  }

}
