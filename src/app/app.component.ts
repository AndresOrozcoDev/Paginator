import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public themeService: ThemeService) {
    this.themeService.initializeTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

}
