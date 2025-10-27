import { Component, OnInit } from '@angular/core';
import { City, CityFilters, Pagination, State } from '../../types/location';
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

  private watchQueryParams(): void { }

  private getCities(): void { }

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

}
