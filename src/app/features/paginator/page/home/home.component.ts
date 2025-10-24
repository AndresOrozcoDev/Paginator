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
    this.watchQueryParams();
  }

  private watchQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const newFilters = {
        state: params['state'] || '',
        pageSize: params['pageSize'] ? +params['pageSize'] : 10,
        page: params['page'] ? +params['page'] : 1
      };

      if (JSON.stringify(newFilters) !== JSON.stringify(this.filters)) {
        this.filters = newFilters;
        this.getCities();

        if (this.filtersComponent) {
          this.filtersComponent.formFilters.patchValue(
            { state: this.filters.state, pageSize: this.filters.pageSize },
            { emitEvent: false }
          );
        }
      }
    });
  }

  private getCities(): void {
    const { state, pageSize, page } = this.filters;
    this.locationService.getCities({ state, pageSize, page }).subscribe({
      next: (res: CitiesResponse) => {
        this.cities = [...res.data];
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

  onFilterChange(filters: { state: string; pageSize: number }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        state: filters.state || '',
        pageSize: filters.pageSize || 10,
      },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    }).then(() => {
      this.filters = { ...this.filters, page };
    });
  }
}
