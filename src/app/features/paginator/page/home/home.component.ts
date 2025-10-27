import { Component, OnInit, ViewChild } from '@angular/core';
import { CitiesResponse, City, State } from '../../types/location';
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
export class HomeComponent implements OnInit {

  states: State[] = [];
  cities: City[] = [];
  filters = { state: '', pageSize: 10, page: 1 };
  pagination = { total: 0, totalPages: 0 };
  @ViewChild(FiltersComponent) filtersComponent!: FiltersComponent;

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
    this.initializeFilters();
  }

  /** Inicializa filtros desde la URL o usa valores por defecto */
  private initializeFilters(): void {
    const params = this.route.snapshot.queryParams;

    this.filters = {
      state: params['state'] || '',
      pageSize: params['pageSize'] ? +params['pageSize'] : 10,
      page: params['page'] ? +params['page'] : 1
    };

    // Si la URL está vacía, la completamos con los valores por defecto
    if (Object.keys(params).length === 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1, pageSize: 10 },
        replaceUrl: true
      });
    }

    // Carga inicial
    this.getCities();

    // Escucha cambios de parámetros
    this.watchQueryParams();
  }

  /** Observa cambios en la URL y actualiza datos */
  private watchQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const newFilters = {
        state: params['state'] || '',
        pageSize: params['pageSize'] ? +params['pageSize'] : 10,
        page: params['page'] ? +params['page'] : 1
      };

      const changed =
        newFilters.state !== this.filters.state ||
        newFilters.pageSize !== this.filters.pageSize ||
        newFilters.page !== this.filters.page;

      if (changed) {
        this.filters = newFilters;
        this.getCities();

        // Sincronizar formulario de filtros
        if (this.filtersComponent) {
          this.filtersComponent.formFilters.patchValue(
            { state: this.filters.state, pageSize: this.filters.pageSize },
            { emitEvent: false }
          );
        }
      }
    });
  }

  /** Obtiene las ciudades según los filtros */
  private getCities(): void {
    const { state, pageSize, page } = this.filters;
    this.locationService.getCities({ state, pageSize, page }).subscribe({
      next: (res: CitiesResponse) => {
        this.cities = res.data;
        if (res.pagination) {
          this.pagination = {
            total: res.pagination.total,
            totalPages: res.pagination.totalPages
          };
        }
      },
      error: err => console.error('Error obteniendo las ciudades', err)
    });
  }

  private getStates(): void {
    this.locationService.getStates().subscribe({
      next: data => this.states = data,
      error: err => console.error('Error obteniendo los estados', err)
    });
  }

  /** Cambio de filtros (state / pageSize) */
  onFilterChange(filters: { state: string; pageSize: number }) {
    const queryParams: any = {};

    if (filters.state !== this.filters.state) queryParams.state = filters.state || null;
    if (filters.pageSize !== this.filters.pageSize) queryParams.pageSize = filters.pageSize || null;

    // Reinicia a página 1 si cambian los filtros
    queryParams.page = 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  /** Cambio de página */
  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
