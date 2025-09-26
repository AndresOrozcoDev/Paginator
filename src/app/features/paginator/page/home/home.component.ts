import { Component, OnInit } from '@angular/core';
import { City, State } from '../../types/location';
import { LocationsService } from '../../services/locations.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {

  states: State[] = [];
  cities: City[] = [];

  constructor(private locationService: LocationsService, public themeService: ThemeService) {
    this.themeService.initializeTheme();
  }

  ngOnInit() {
    this.getCities();
    this.getStates();
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

}
