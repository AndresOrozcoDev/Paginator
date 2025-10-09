import { Component, OnInit } from '@angular/core';
import { City, State } from '../../types/location';
import { LocationsService } from '../../services/locations.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {

  states: State[] = [];
  cities: City[] = [];
  filters = { state: '', pageSize: 10 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationsService,
    public themeService: ThemeService) 
    {
      this.themeService.initializeTheme();
  }

  ngOnInit() {
    this.getCities();
    this.getStates();
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        state: params['state'] || '',
        pageSize: params['pageSize'] ? +params['pageSize'] : 10
      };
    });
  }

  getCities() {
    this.locationService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (error) => console.error('Error obteniendo las ciudades', error)
    });
  }

  getStates() {
    this.locationService.getStates().subscribe({
      next: (data) => {
        this.states = data;
      },
      error: (error) => console.error('Error obteniendo los estados', error)
    });
  }

  onFilterChange(filters: { state: string; pageSize: number }) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        state: filters.state || null,
        pageSize: filters.pageSize || 10,
      },
      queryParamsHandling: 'merge',
    });
  }

}
